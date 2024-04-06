import {
  getTripGroupDetailbyGroupID,
  updateTripGroupDetail,
  deleteTripGroupMember,
} from "../models/tripgroupModel.js";

export const getTripGroupDetail = async (req, res) => {
  const { groupId } = req.params;
  try {
    const data = await getTripGroupDetailbyGroupID(groupId);

    // no tripGroup found
    if (data.length === 0) {
      return res
        .status(404)
        .json({ message: "Cannot found data by given groupId." });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const updateTripGroupDetail = async (req, res) => {
  const { groupId } = req.params;
  const { groupName, description, start_date, end_date } = req.body;
  try {
    const data = await updateTripGroupDetail(
      groupId,
      groupName,
      description,
      start_date,
      end_date
    );

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteTripGroupMember = async (req, res) => {
  const { groupId, userId } = req.params;
  try {
    const data = await deleteTripGroupMember(groupId, userId);

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
