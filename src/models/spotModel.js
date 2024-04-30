import db from "./db_connection.js";

export const getSpotByGroupIdDay = (groupId, day) => {
  return db.any(
    `SELECT Spot.spot_id, Spot.spot_name, Spot.description, Spot.location, Spot.lon, Spot.lat, Spot.date, Spot.sequence
    FROM Spot
    JOIN Trip_groups ON Spot.G_ID = Trip_groups.group_id
    WHERE Trip_groups.group_id = $1 AND Spot.date = $2
    ORDER BY "sequence" asc ;
      `,[groupId, day]);
};

export const getSpotBySpotId = (spotId) => {
  return db.any(
    `SELECT spot.*
    FROM spot
    WHERE spot_id = $1;
      `,[spotId]);
};

export const createSpotByGroupId = (spotName, description, location, lon, lat, day, sequence, groupId) => {
  return db.one(
    `insert into spot (spot_name, description, "location", lon, lat, "date", "sequence", g_id)
    values ($1, $2, $3, $4, $5, $6, $7, $8) 
    RETURNING *;
    `, [spotName, description, location, lon, lat, day, sequence, groupId]);
};

export const updateSpotBySpotId = (spotId, day, sequence) => {
  return db.one(
    `update spot
    set date = $2, sequence = $3
    where spot_id = $1
    RETURNING *;
    `, [spotId, day, sequence]
  );
};

export const deleteSpotBySpotId = (spotId) => {
  return db.result(
    `delete from spot where spot_id = $1;
  `, [spotId]);
};

export const getLocationBySpotId = (spotId) => {
  return db.oneOrNone(
    `SELECT spot.lon, spot.lat
    FROM spot
    WHERE spot_id = $1;
      `,[spotId]);
};

export const getOneDayLonLat = (groupId, day) => {
  return db.manyOrNone(
    `SELECT spot.spot_id ,spot.lon, spot.lat
    FROM spot 
    WHERE g_id = $1 and date = $2
    ORDER by sequence`,
    [groupId,day]
  )
}