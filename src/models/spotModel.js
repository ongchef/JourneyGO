import db from "./connection_db.js";

export const getSpotByGroupDay = (groupId, day) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT Spot.spot_id, Spot.spot_name, Spot.description, Spot.location, Spot.lon, Spot.lan, Spot.date, Spot.sequence
        FROM Spot
        JOIN Trip_groups ON Spot.G_ID = Trip_groups.group_id
        WHERE Trip_groups.group_id = ? AND Spot.date = ?;
        `,
      [groupId, day],
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

export const createSpot = (groupId, description, location, date, sequence) => {
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

export const updateSpot = (groupId, description, location, date, sequence) => {
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

export const deleteSpotBySpotId = (spotId) => {
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
