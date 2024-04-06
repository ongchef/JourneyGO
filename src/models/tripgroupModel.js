import db from "./connection_db.js";
export const getTripGroupDetailbyGroupID = (groupId) => {
  return new Promise((resolve, reject) => {
    db.query("", (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};
export const updateTripGroupDetail = (
  groupId,
  groupName,
  description,
  start_date,
  end_date
) => {
  return new Promise((resolve, reject) => {
    db.query("", (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

export const deleteTripGroupMember = (groupId, userId) => {
  return new Promise((resolve, reject) => {
    db.query("", (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};
