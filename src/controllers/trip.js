import {
    getGroupByUserId,
    createGroup,
} from "../models/tripModel.js";

export const getGroup = async (req, res) => {
    const { userId } = req.params;
    try {
        const data = await getGroupByUserId(userId);

        // no spot found
        if (data.length === 0){
            return res.status(404).json({ message: "Cannot found data by given userId."});
        }
        
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
}

export const createGroup = async (req, res) => {
    const {userId, groupName, startDate, endDate} = req.body;
    try {
        const newGroup = await createGroup(userId, groupName, startDate, endDate);

        return res.status(201).json(newGroup);
    }catch (error) {
        return res.status(500).json({ message: error.message});
    }
}

