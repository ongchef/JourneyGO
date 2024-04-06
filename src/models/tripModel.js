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