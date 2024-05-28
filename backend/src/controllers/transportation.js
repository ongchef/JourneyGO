import { getTransByGroupIdDay } from "../models/transportationModel.js";

export const getTransportation = async(req, res) =>{
    const { groupId,day } = req.params;
    try {
        const result = await getTransByGroupIdDay(groupId,day);
        console.log(result)
        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}