import { getSpotByGroupId } from "../models/spotModel.js"
import { getCountriesByGroupId, getGroupByShareCode } from "../models/tripgroupModel.js"

export const copyGroup = async(req, res) => {
    const clerkId = req.userID;
    const { share_code } = req.body
    const { group_id, group_name, start_date, end_date } = await getGroupByShareCode(share_code)
    console.log(group_id)
    var countries = await getCountriesByGroupId(group_id)
    countries = countries.map(({c_id})=>c_id)
    console.log(countries)
    const spots = await getSpotByGroupId(group_id)
    console.log(spots)
}