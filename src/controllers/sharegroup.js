import { createSpotByGroupId, getSpotByGroupId } from "../models/spotModel.js"
import { getCountriesByGroupId, getGroupByShareCode } from "../models/tripgroupModel.js"
import { createGroupModel, getuserIdbyClerkId } from "../models/userModel.js";

export const copyGroup = async(req, res) => {
    const clerkId = req.userID;
    const { share_code } = req.body
    try{
        let userId = await getuserIdbyClerkId(clerkId);
        userId = userId[0].user_id;
        const { group_id, group_name, start_date, end_date } = await getGroupByShareCode(share_code)
        console.log(group_id)
        var countries = await getCountriesByGroupId(group_id)
        countries = countries.map(({country_name})=>country_name)
        console.log(countries)
        var spots = await getSpotByGroupId(group_id)
        console.log(spots)
        // const newGroupId = 1
        const newGroupId = await createGroupModel(
            userId,
            group_name,
            countries,
            start_date,
            end_date
        )
        spots.map(async(spot)=>await createSpotByGroupId(
            spot.spot_name,
            spot.description,
            spot.location,
            spot.lon,
            spot.lat,
            spot.date,
            spot.sequence,
            newGroupId
        ))
        return res.status(201).json({newGroupId});
    }
    catch(error){
        console.log(error)
    }
    
}