import db from "./connection_db.js";
export const getTripGroupDetailbyGroupID = (groupId) => {
  return new Promise((resolve, reject) => {
    db.query(
      ` SELECT
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
            tg.group_id = ?
        GROUP BY
            tg.group_id
  `,
      [groupId],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });
};
export const updateTripGroupDetail = (
  groupId,
  groupName,
  start_date,
  end_date
) => {
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE trip_groups
    SET group_name = ?,
        start_date = ?,
        end_date = ?
    WHERE group_id = ?;
    `,
      [groupName, start_date, end_date, groupId],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });
};

export const getTripGroupMember = (groupId, userId) => {
  return new Promise((resolve, reject) => {
    db.query(
      `
        SELECT *
        FROM group_member
        WHERE group_id = ? AND user_id = ?;
      `,
      [groupId, userId],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });
};

export const deleteTripGroupMember = (groupId, userId) => {
  return new Promise((resolve, reject) => {
    db.query(
      `DELETE FROM group_member
    WHERE group_id = ? AND user_id = ?;
    `,
      [groupId, userId],
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      }
    );
  });
};
