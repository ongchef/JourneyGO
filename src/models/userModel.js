import db from "./db_connection.js";
import { checkShareCode } from "./tripgroupModel.js";

// Register a new user
export const addNewUser = ({ userID, userEmail, userName, status }) => {
  console.log("here", userID);
  const query = `
      INSERT INTO user_account (clerk_user_id, status, user_name, email)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
  const values = [userID, status, userName, userEmail];
  console.log(values);
  return db.query(query, values);
};

export const updateUser = ({ userID, userEmail, userName, status }) => {
  const query = `
      UPDATE user_account
      SET status = $1, user_name = $2, email = $3
      WHERE clerk_user_id = $4
      RETURNING *;
    `;
  const values = [status, userName, userEmail, userID];
  return db.query(query, values);
};

export const getuserIdbyClerkId = (clerkId) => {
  return db.query(
    `
    SELECT user_id From user_account WHERE clerk_user_id = $1;
  `,
    [clerkId]
  );
};

export const getuserIdbyName = (name) => {
  return db.query(
    `
    SELECT user_id From user_account WHERE user_name = $1;
  `,
    [name]
  );
};

export const getuserNamebyClerkId = (clerkId) => {
  return db.query(
    `
    SELECT user_name From user_account WHERE clerk_user_id = $1;
  `,
    [clerkId]
  );
};

export const getGroupByUserId = (userId) => {
  return db.query(
    `
    SELECT tg.group_id, tg.group_name, tg.start_date, tg.end_date, tg.status
    FROM trip_groups tg
    JOIN group_member gm ON tg.group_id = gm.g_id
    WHERE gm.u_id = $1;
  `,
    [userId]
  );
};

export const createGroupModel = (
  userId,
  groupName,
  countries,
  startDate,
  endDate
) => {
  return new Promise((resolve, reject) => {
    console.log("endDate", endDate);
    db.tx(async (t) => {
      // var share_code = ''
      // const uid = new ShortUniqueId({length: 16})
      // while(true){
      //   share_code = uid.rnd()
      //   const duplicate = await checkShareCode(share_code)
      //   if(duplicate.length === 0){
      //     break
      //   }
      // }
      // console.log("share code",share_code)
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
        `INSERT INTO trip_groups (group_name, start_date, end_date, status, share_code)VALUES 
        ($1, $2, $3, 'Incoming', gen_random_uuid())
         RETURNING group_id`,
        [groupName, startDate, endDate]
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
        console.log("error", error);
        reject(error);
      });
  });
};

export const getInviteeIdByEmail = (email) => {
  return db.oneOrNone(`SELECT user_id, user_name FROM user_account WHERE email = $1`, [
    email,
  ]);
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
    await t.none(`UPDATE invitation SET status = $1 WHERE invitation_id = $2`, [
      status,
      invitationId,
    ]);

    if (status === "accepted") {
      const invitationInfo = await t.oneOrNone(
        `SELECT g_id, invitee FROM invitation WHERE invitation_id = $1`,
        [invitationId]
      );
      if (invitationInfo) {
        const { g_id: groupId, invitee: invitee } = invitationInfo;

        await t.none(`INSERT INTO group_member (u_id, g_id) VALUES ($1, $2)`, [
          invitee,
          groupId,
        ]);
      }
    }
  });
};