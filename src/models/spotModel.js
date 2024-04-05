import db from './connection_db.js';

export const getSpotByGroupDay = (groupId, day) => {
    return new Promise((resolve, reject) => {
        db.query('', (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

export const createSpot = (groupId, description, location, date, sequence) => {
    return new Promise((resolve, reject) => {
        db.query('', (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

export const updateSpot = (groupId, description, location, date, sequence) => {
    return new Promise((resolve, reject) => {
        db.query('', (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

export const deleteSpotBySpotId = (spotId) => {
    return new Promise((resolve, reject) => {
        db.query('', (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}
