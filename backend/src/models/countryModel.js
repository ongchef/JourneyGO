import db from "./db_connection.js"

export const getAllCountry = () => {
    return db.any(`SELECT * FROM country`)
}

export const getCountryById = (country_id) => {
    return db.one(`SELECT * FROM country where country_id = $1;`,[country_id])
}