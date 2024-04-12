import db from "./db_connection.js";

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


export const getTripGroupDetailbyGroupID = (groupId) => {
  return db.query(
    `SELECT
        tg.group_id,
        tg.group_name,
        tg.start_date,
        tg.end_date,
        STRING_AGG(ua.user_id || ':' || ua.user_name, ', ') AS users
    FROM
        trip_groups tg
    INNER JOIN
        group_member gm ON tg.group_id = gm.g_id
    INNER JOIN
        user_account ua ON gm.u_id = ua.user_id
    WHERE
        tg.group_id = $1
    GROUP BY
        tg.group_id`,
    [groupId]
  );
};

export const updateTripGroupDetailbyGroupId = (
  groupId,
  groupName,
  start_date,
  end_date
) => {
  return db.query(
    ` UPDATE trip_groups
        SET group_name = $1,
            start_date = $2,
            end_date = $3
        WHERE group_id = $4;
    `,
    [groupName, start_date, end_date, groupId]
  );
};

export const getTripGroupMember = (groupId, userId) => {
  console.log("getTripGroupMember");
  console.log(groupId);
  console.log(userId);
  return db.query(
    `
    SELECT gm.g_id, gm.u_id
FROM group_member AS gm
JOIN user_account AS ua ON gm.u_id = ua.user_id
WHERE ua.clerk_user_id = $2 AND gm.g_id = $1;
    
      `,
    [groupId, userId]
  );
};

export const deleteTripGroupMemberbyIds = (groupId, userId) => {
  return db.query(
    `DELETE FROM group_member
    WHERE g_id = $1 AND u_id = $2;
    `,
    [groupId, userId]
  );
};
