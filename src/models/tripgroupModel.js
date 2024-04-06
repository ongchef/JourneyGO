import db from "./connection_db.js";
export const getTripGroupDetailbyGroupID = (groupId) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT tg.group_name, tg.start_date, tg.end_date, ua.user_id, ua.user_name
        FROM trip_group tg
        JOIN group_member gm ON tg.group_id = gm.group_id
        JOIN user_account ua ON gm.user_id = ua.user_id
        WHERE tg.group_id = ?;`,
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
      `UPDATE trip_group
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
