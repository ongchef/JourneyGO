import db from "./db_connection.js";

export const getuserIdbyClerkId = (clerkId) => {
  return db.query(`
    SELECT user_id From user_account WHERE clerk_user_id = $1;
  `, [clerkId]);
};

export const getGroupByUserId = (userId) => {
  return db.query(`
    SELECT tg.group_name, tg.start_date, tg.end_date, tg.status
    FROM trip_groups tg
    JOIN group_member gm ON tg.group_id = gm.g_id
    JOIN group_country gc ON tg.group_id = gc.g_id
    JOIN country c ON gc.c_id = c.country_id
    WHERE gm.u_id = $1;
  `, [userId]);
};


export const createGroupModel = (userId, groupName, countries, startDate, endDate, filename) => {
  return new Promise((resolve, reject) => {
    db.tx(async (t) => {
      const groupCountries = [];

      // Step 1: Get country_ids for each country_name
      for (const countryName of countries) {
        const countryId = await t.oneOrNone(
          `SELECT country_id FROM country WHERE country_name = $1`,
          [countryName]
        );
        if (countryId) {
          groupCountries.push({ country_id: countryId.country_id });
        } else {
          reject(`Country ${countryName} not found in the database.`);
        }
      }

      // Step 2: Insert group into trip_groups table
      const { group_id: groupId } = await t.one(
        `INSERT INTO trip_groups (group_name, start_date, end_date, status, image)
         VALUES ($1, $2, $3, 'Incoming', $4)
         RETURNING group_id`,
        [groupName, startDate, endDate, filename]
      );

      // Step 3: Insert into group_country table for each country_id
      for (const groupCountry of groupCountries) {
        await t.none(
          `INSERT INTO group_country (g_id, c_id)
           VALUES ($1, $2)`,
          [groupId, groupCountry.country_id]
        );
      }

      // Step 4: Insert into group_member table
      await t.none(
        `INSERT INTO group_member (u_id, g_id)
         VALUES ($1, $2)`,
        [userId, groupId]
      );

      return groupId;
    })
      .then((groupId) => {
        resolve(groupId);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getInviteeIdByEmail = (email) => {
  return db.oneOrNone(
    `SELECT user_id FROM user_account WHERE email = $1`,
    [email]
  );
};


export const createInvitationModel = (inviterId, inviteeId, groupId) => {
  return db.none(
    `INSERT INTO invitation (inviter, invitee, g_id, status)
    VALUES ($1, $2, $3, 'pending')`,
    [inviterId, inviteeId, groupId]
  );
};

export const getOverviewByGroupId = (groupId) => {
  return db.manyOrNone(
    `SELECT tg.group_name, tg.start_date, tg.end_date, tg.status, ARRAY_AGG(u.user_name) AS user_names
    FROM trip_groups tg
    JOIN group_member gm ON tg.group_id = gm.g_id
    JOIN user_account u ON gm.u_id = u.user_id
    WHERE tg.group_id = $1
    GROUP BY tg.group_name, tg.start_date, tg.end_date, tg.status;
    `,
    [groupId]
  );
};


export const getInvitationByUserId = (userId) => {
  return db.manyOrNone(
    `SELECT u.user_name AS inviter_name, tg.group_name AS group_name, i.invitation_id, i.status
    FROM invitation i
    JOIN user_account u ON i.inviter = u.user_id
    JOIN trip_groups tg ON i.g_id = tg.group_id
    WHERE i.invitee = $1`,
    [userId]
  );
};


export const updateInvitation = (invitationId, status) => {
  return db.tx(async (t) => {
    await t.none(
      `UPDATE invitation SET status = $1 WHERE invitation_id = $2`,
      [status, invitationId]
    );

    if (status === "Y") {
      const invitationInfo = await t.oneOrNone(
        `SELECT group_id, invitee_id FROM invitation WHERE invitation_id = $1`,
        [invitationId]
      );

      if (invitationInfo) {
        const { group_id: groupId, invitee_id: inviteeId } = invitationInfo;
        await t.none(
          `INSERT INTO group_member (u_id, g_id) VALUES ($1, $2)`,
          [inviteeId, groupId]
        );
      }
    }
  });
};
