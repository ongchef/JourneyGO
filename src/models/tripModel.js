import db from './connection_db.js';

export const getGroupByUserId = (userId) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT tg.group_name, tg.start_date, tg.end_date, tg.status, c.country_name
        FROM trip_groups tg
        JOIN group_member gm ON tg.group_id = gm.g_id
        JOIN group_country gc ON tg.group_id = gc.g_id
        JOIN country c ON gc.c_id = c.country_id
        WHERE gm.u_id = ?;`, [userId], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

export const createGroup = (userId, groupName, startDate, endDate) => {
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO trip_groups (group_name, start_date, end_date, status)
                  VALUES (?, ?, ?, 'active')`, [groupName, startDate, endDate], (error, results) => {
            if (error) {
                reject(error);
            } else {
                //user and group relation
                const groupId = results.insertId;
                db.query(`INSERT INTO group_member (u_id, g_id) VALUES (?, ?)`, [userId, groupId], (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(groupId);
                    }
                });
            }
        });
    });
}

//GET get group: how to know who is the group owner
//POST create group: when to add group country