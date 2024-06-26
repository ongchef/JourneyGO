import { createSpotByGroupId, getSpotByGroupId } from "../models/spotModel.js"
import { getCountriesByGroupId, getGroupByShareCode, getShareCodeByGroupId } from "../models/tripgroupModel.js"
import { createGroupModel, getuserIdbyClerkId } from "../models/userModel.js";

export const copyGroup = async(req, res) => {
    const clerkId = req.userID;
    const { share_code, start_date, end_date, group_name } = req.body
    try{
        let userId = await getuserIdbyClerkId(clerkId);
        userId = userId[0].user_id;
        const { group_id } = await getGroupByShareCode(share_code)
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
        return res.status(500).json({ message: error.message })
    }
    
}

export const getShareCode = async(req, res) => {
    const {group_id} = req.params
    try{
        const {share_code} = await getShareCodeByGroupId(group_id)
        return res.status(200).json({ share_code:share_code })
    }
    catch(error){
        return res.status(500).json({ message: error.message })
    }
}