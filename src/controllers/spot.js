import {
  getSpotByGroupIdDay,
  getSpotBySpotId,
  createSpotByGroupId,
  updateSpotBySpotId,
  deleteSpotBySpotId,
  getLocationBySpotId,
} from "../models/spotModel.js";
import { getTransByGroupIdDay, saveTransportation } from "../models/transportationModel.js";
import { getTripGroupMember } from "../models/tripgroupModel.js";
import { findNearby, findPlace, getRoute } from "../services/map.js";

export const getSpots = async (req, res) => {
  const { groupId, day } = req.params;
  const userClerkId = req.userID;
  try {
    // check user in this group or not
    const user = await getTripGroupMember(groupId, userClerkId);
    if (user.length === 0) {
      return res.status(400).json({ message: "User not in group." });
    }

    const spots = await getSpotByGroupIdDay(groupId, day);
    // no spot found
    /* if (spots.length === 0) {
      return res
        .status(404)
        .json({ message: "Cannot found data by given groupId/day." });
    } */
    const routes = await getTransByGroupIdDay(groupId,day)
    const result = {
      spots: spots,
      transportation: routes
    }
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createSpot = async (req, res) => {
  const { day, groupId } = req.params;
  const { spotName, description, location, lat, lon, sequence } = req.body;
  const userClerkId = req.userID;
  try {
    // check user in this group or not
    const user = await getTripGroupMember(groupId, userClerkId);
    if (user.length === 0) {
      return res.status(400).json({ message: "User not in group." });
    }

    // spot already existed.
    const spots = await getSpotByGroupIdDay(groupId, day);
    spots.forEach((element) => {
      if (element.spot_name === spotName) {
        return res.status(400).json({ message: "Spot already add." });
      }
    });

    // create spot
    const newSpot = await createSpotByGroupId(
      spotName,
      description,
      location,
      lon,
      lat,
      day,
      sequence,
      groupId
    );
    return res.status(201).json(newSpot);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateSpot = async (req, res) => {
  const { day, groupId } = req.params;
  const { spotId, sequence } = req.body;
  const userClerkId = req.userID;

  try {
    // check user in this group or not
    const user = await getTripGroupMember(groupId, userClerkId);
    if (user.length === 0) {
      return res.status(400).json({ message: "User not in group." });
    }

    // no such spotId
    const spots = await getSpotBySpotId(spotId);
    if (spots.length === 0) {
      return res
        .status(404)
        .json({ message: "Cannot found data by given groupId/day." });
    }

    // update spot
    const updateSpot = await updateSpotBySpotId(spotId, day, sequence);
    return res.status(200).json(updateSpot);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteSpot = async (req, res) => {
  const { spotId, groupId, day } = req.params;
  const userClerkId = req.userID;

  try {
    // check user in this group or not
    const user = await getTripGroupMember(groupId, userClerkId);
    if (user.length === 0) {
      return res.status(400).json({ message: "User not in group." });
    }

    // no spot found
    const spots = await getSpotBySpotId(spotId);
    if (spots.length === 0) {
      return res
        .status(404)
        .json({ message: "Cannot found data by given groupId/day." });
    }

    // delete spot
    const result = await deleteSpotBySpotId(spotId);
    if (result.rowCount === 0) {
      return res.status(400).json({ message: "Delete failed." });
    }
    return res.status(200).json({ message: "Delete successfully." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const searchNearby = async (req, res) => {
  const { query, spotId } = req.params;

  try {
    const loc = await getLocationBySpotId(spotId)
    if(!loc){
      return res.status(404).json({message: "No nearby"})
    }
    const { lon, lat } = loc
    const spots = await findNearby(query, lon, lat);

    // no spot found
    if (spots.length === 0) {
      return res.status(404).json({ messageS: "Cannot found any spot." });
    }
    return res.status(200).json(spots);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const searchPlace = async (req, res) => {
  const { query } = req.params;

  try {
    const spots = await findPlace(query);
    console.log(spots);
    // no spot found
    if (spots.length === 0) {
      return res.status(404).json({ message: "Cannot found any spot." });
    }
    return res.status(200).json(spots);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};



export const constructRoute = async (req, res) => {
  const { groupId,day,transType } = req.params;
  console.log(groupId)
  try {
    const result = await getRoute(groupId,day,transType);

    if(result === undefined){
      return res.status(400).json({message:"Unable to plan routes."})
    }

    if("available_travel_modes" in result){
      return res.status(205).json({available_travel_modes:result.available_travel_modes})
    }
    await saveTransportation(result)
    console.log(result)
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


