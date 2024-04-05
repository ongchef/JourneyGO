import {
    getSpotByGroupDay,
    createSpot,
    updateSpot,
    deleteSpotBySpotId
} from "../models/spotModel.js";

export const getSpot = async (req, res) => {
    const {groupId, day} = req.params;
    try {
        const data = await getSpotByGroupDay(groupId, day);

        // no spot found
        if (data.length === 0){
            return res.status(404).json({ message: "Cannot found data by given groupId/day."});
        }
        
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ message: error.message});
    }
}

export const createSpot = async (req, res) => {
    const {groupId, description, location, day, sequence} = req.body;
    try {
        // spot already existed.
        const data = await getSpotByGroupDay(groupId, day);
        if (data.length !== 0){
            return res.status(400).json({ message: "Spot already add."});
        }

        const newSpot = await createSpot(groupId, description, location, day, sequence);

        return res.status(201).json(newSpot);
    }catch (error) {
        return res.status(500).json({ message: error.message});
    }
}

export const updateSpot = async (req, res) => {
    const {groupId, description, location, date, sequence} = req.body;
    try {
        // no spot found
        const data = await getSpotByGroupDay(groupId, day);
        if (data.length === 0){
            return res.status(400).json({ message: "Cannot found data by given groupId/day."});
        }

        const newSpot = await updateSpot(groupId, description, location, date, sequence);

        return res.status(200).json(newSpot);
    }catch (error) {
        return res.status(500).json({ message: error.message});
    }
}

export const deleteSpot = async (req, res) => {
    const {spotId} = req.params;
    try {
        // no spot found
        const data = await getSpotByGroupDay(groupId, day);
        if (data.length === 0){
            return res.status(400).json({ message: "Cannot found data by given groupId/day."});
        }

        
        const result = await deleteSpotBySpotId(spotId);

        return res.status(200).json(result);
    }catch (error) {
        return res.status(500).json({ message: error.message});
    }
}