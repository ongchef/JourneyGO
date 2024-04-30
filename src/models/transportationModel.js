import db from "./db_connection.js"

export const getTransByGroupIdDay = async(groupId,day) => {
    return db.any(`SELECT trans.* 
        FROM Transportation as trans
        WHERE 
        (trans.dep_id in (SELECT spot.spot_id FROM Spot as spot WHERE spot.g_id = $1 and spot.date = $2)) 
        OR
        (trans.arr_id in (SELECT spot.spot_id FROM Spot as spot WHERE spot.g_id = $1 and spot.date = $2)) `,
        [groupId,day])
}

export const saveTransportation = async(transList) => {
    await db.none(`DELETE FROM transportation where dep_id = ANY($1) or arr_id = ANY($1)`,[transList.spotIdList])
    db.tx(t=>{
        const insert_queries = transList.routes.map((trans)=>{
            return t.none(`INSERT INTO transportation (dep_id,arr_id,trans_type,trans_time) values ($1,$2,$3,$4) `
            ,[trans.dep_id,trans.arr_id,trans.travel_mode,trans.duration])
        })
        t.batch(insert_queries)
    })
}