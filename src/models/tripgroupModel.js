import db from "./db_connection.js";

export const createInvitationModel = (inviterId, inviteeId, groupId) => {
  console.log("start to create invitation");
  return db.none(
    `INSERT INTO invitation (inviter, invitee, g_id, status)
    VALUES ($1, $2, $3, 'pending')`,
    [inviterId, inviteeId, groupId]
  );
};
//days, groupId
export const getOverviewByGroupId = (groupId) => {
  return db.manyOrNone(
    `SELECT tg.group_id, tg.group_name, tg.start_date, tg.end_date, tg.status, ARRAY_AGG(u.user_name) AS user_names
    , (DATE_PART('day', tg.end_date) - DATE_PART('day', tg.start_date) + 1) AS days
    FROM trip_groups tg
    JOIN group_member gm ON tg.group_id = gm.g_id
    JOIN user_account u ON gm.u_id = u.user_id
    WHERE tg.group_id = $1
    GROUP BY tg.group_id, tg.group_name, tg.start_date, tg.end_date, tg.status;
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
        (tg.end_date - tg.start_date) AS days,
        STRING_AGG( ua.user_name, ', ') AS users
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

export const getTripGroupDays = (groupId) => {
  return db.query(
    `SELECT end_date-start_date as date FROM trip_groups
    WHERE group_id = $1;`,
    [groupId]
  )
}

export const getBillsByGroupId = (groupId) => {
  return db.manyOrNone(
    `SELECT 
      b.description AS bill_name, 
      b.date,
      b.time,
      u2.user_name as payer_name, 
      b.amount, 
      ARRAY_AGG(u.user_name) AS participants
    FROM 
      bill b
    JOIN 
      user_account u2 ON b.payer_id = u2.user_id
    LEFT JOIN 
      share_bill sb ON b.bill_id = sb.b_id
    LEFT JOIN 
      user_account u ON sb.u_id = u.user_id
    WHERE 
      b.g_id = $1 and b.status = 'open'
    GROUP BY
      b.description, b.date, b.time, u2.user_name, b.amount  
    ORDER BY 
      b.date, b.time;
    `,
    [groupId]
  );
};

export const getGroupMemberName = (groupId) => {
  console.log("getTripGroupMemberName");
  console.log(groupId);
  return db.query(
    `
    SELECT 
      ua.user_name
    FROM
      group_member gm
    JOIN 
      user_account ua ON gm.u_id = ua.user_id
    WHERE 
      gm.g_id = $1;
    `,
    [groupId]
  );
};

export const getUndoneBillsByGroupId = (groupId) => {
  return db.manyOrNone(
    `SELECT 
      b.g_id, b.bill_id, u2.user_name as payer_name, u.user_name, sb.amount
    FROM 
      bill b
    JOIN
      user_account u2 ON b.payer_id = u2.user_id
    LEFT JOIN
      share_bill sb ON b.bill_id = sb.b_id
    LEFT JOIN 
      user_account u ON sb.u_id = u.user_id
    WHERE 
      b.g_id = $1 AND sb.status = 'open'
    ORDER BY
      b.g_id, b.bill_id;
    `,
    [groupId]
  );
};

export const createBillModel = (bill_name, groupId, date, time, payer_id, amount, status) => {
  //console.log("start to create bill");
  return db.one(
    `INSERT INTO bill (g_id, payer_id, description, amount, date, time, status)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING bill_id`,
    [groupId, payer_id, bill_name, amount, date, time, status]
  );
};

export const createShareBills = (b_id, u_id, amount) => {
  //console.log("start to create share bill");
  return db.none(
    `INSERT INTO share_bill (b_id, u_id, amount, status)
    VALUES ($1, $2, $3, 'open')`,
    [b_id, u_id, amount]
  );
};

export const updateBillModel = (transactionId, bill_name, date, time, payer_id, amount) => {
  //console.log("start to update bill");
  return db.none(
    `UPDATE bill 
    SET description = $1, date = $2, time = $3, payer_id = $4, amount = $5
    WHERE bill_id = $6`,
    [bill_name, date, time, payer_id, amount, transactionId]
  );
};

export const deleteShareBillModel = (bill_id) => {
  //console.log("start to delete share bill");
  return db.none(
    `DELETE FROM share_bill
    WHERE b_id = $1`,
    [bill_id]
  );
};

export const getBillsByBillId = (billId) => {
  return db.manyOrNone(
    `SELECT 
      b.description AS bill_name, 
      b.date,
      b.time,
      u2.user_name as payer_name, 
      b.amount, 
      ARRAY_AGG(u.user_name) AS participants
    FROM 
      bill b
    JOIN 
      user_account u2 ON b.payer_id = u2.user_id
    LEFT JOIN 
      share_bill sb ON b.bill_id = sb.b_id
    LEFT JOIN 
      user_account u ON sb.u_id = u.user_id
    WHERE 
      b.bill_id = $1
    GROUP BY
      b.description, b.date, b.time, u2.user_name, b.amount  
    ORDER BY 
      b.date, b.time;
    `,
    [billId]
  );
};

