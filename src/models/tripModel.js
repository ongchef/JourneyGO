import db from "./db_connection.js";

export const getGroupByUserId = (userId) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT tg.group_name, tg.start_date, tg.end_date, tg.status, c.country_name
        FROM trip_groups tg
        JOIN group_member gm ON tg.group_id = gm.g_id
        JOIN group_country gc ON tg.group_id = gc.g_id
        JOIN country c ON gc.c_id = c.country_id
        WHERE gm.u_id = ?;`,
      [userId],
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

export const createGroup = (userId, groupName, startDate, endDate) => {
  return new Promise((resolve, reject) => {
    db.beginTransaction((err) => {
      if (err) {
        reject(err);
      }
      db.query(
        `INSERT INTO trip_groups (group_name, start_date, end_date, status)
                      VALUES (?, ?, ?, 'active')`,
        [groupName, startDate, endDate],
        (error, results) => {
          if (error) {
            return db.rollback(() => {
              reject(error);
            });
          }
          const groupId = results.insertId;
          db.query(
            `INSERT INTO group_member (u_id, g_id) VALUES (?, ?)`,
            [userId, groupId],
            (error, results) => {
              if (error) {
                return db.rollback(() => {
                  reject(error);
                });
              }
              db.commit((err) => {
                if (err) {
                  return db.rollback(() => {
                    reject(err);
                  });
                }
                resolve(groupId);
              });
            }
          );
        }
      );
    });
  });
};

//to-do (status: #)
export const createInvitation = (inviterId, inviteeId, groupId) => {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO invitaion (inviter, invitee, group_id, status)
            VALUES (?, ?, ?, #)`,
      [inviterId, inviteeId, groupId],
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

export const getOverviewByGroupId = (groupId) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT tg.group_name, tg.start_date, tg.end_date, tg.status, u.user_name
                  FROM trip_groups tg
                  JOIN group_member gm ON tg.group_id = gm.g_id
                  JOIN user_account u ON gm.u_id = u.user_id
                  WHERE tg.group_id = ?`,
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

export const getInvitationByUserId = (userId) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT u.user_name AS inviter_name, tg.group_name AS group_name, i.status
            FROM invitation i
            JOIN user_account u ON i.inviter = u.user_id
            JOIN trip_groups tg ON i.group_id = tg.group_id
            WHERE i.invitee = ?`,
      [userId],
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

export const updateInvitation = (invitationId, status) => {
  return new Promise((resolve, reject) => {
    db.beginTransaction((err) => {
      if (err) {
        reject(err);
      }
      db.query(
        `UPDATE invitation SET status = ? WHERE invitation_id = ?`,
        [status, invitationId],
        (error, results) => {
          if (error) {
            db.rollback(() => {
              reject(error);
            });
          } else {
            if (status === "Y") {
              db.query(
                `SELECT group_id, invitee_id FROM invitation WHERE invitation_id = ?`,
                [invitationId],
                (error, results) => {
                  if (error) {
                    db.rollback(() => {
                      reject(error);
                    });
                  } else {
                    const groupId = results[0].group_id;
                    const inviteeId = results[0].invitee_id;
                    db.query(
                      `INSERT INTO group_member (u_id, g_id) VALUES (?, ?)`,
                      [inviteeId, groupId],
                      (error, results) => {
                        if (error) {
                          db.rollback(() => {
                            reject(error);
                          });
                        } else {
                          db.commit((err) => {
                            if (err) {
                              db.rollback(() => {
                                reject(err);
                              });
                            }
                            resolve();
                          });
                        }
                      }
                    );
                  }
                }
              );
            } else {
              db.commit((err) => {
                if (err) {
                  db.rollback(() => {
                    reject(err);
                  });
                }
                resolve();
              });
            }
          }
        }
      );
    });
  });
};
