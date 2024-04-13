import {
  getSpotByGroupIdDay,
  getSpotBySpotId,
  createSpotByGroupId,
  updateSpotBySpotId,
  deleteSpotBySpotId,
  getLocationBySpotId,
} from "../models/spotModel.js";
import { getTripGroupMember } from "../models/tripgroupModel.js";
import { findNearby, findPlace } from "../services/map.js";

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
    if (spots.length === 0) {
      return res
        .status(404)
        .json({ message: "Cannot found data by given groupId/day." });
    }

    return res.status(200).json(spots);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createSpot = async (req, res) => {
  const { day, groupId } = req.params;
  const { spotName, description, location, lan, lon, sequence } = req.body;
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
      lan,
      lon,
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
    const { lon, lan } = await getLocationBySpotId(spotId);
    console.log(lon, lan);
    const spots = await findNearby(query, lon, lan);

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
