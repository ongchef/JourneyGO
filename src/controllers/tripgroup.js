import {
  getTripGroupDetailbyGroupID,
  updateTripGroupDetailbyGroupId,
  getTripGroupMember,
  deleteTripGroupMemberbyIds,
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
  const { groupId, groupName, start_date, end_date } = req.body;
  try {
    //update 之前先 get get 看
    const data = await getTripGroupDetailbyGroupID(groupId);
    // no tripGroup found
    if (data.length === 0) {
      return res.status(404).json({
        message: "Update Failed. Cannot found data by given groupId.",
      });
    }
    data = await updateTripGroupDetailbyGroupId(
      groupId,
      groupName,
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
    const data = await getTripGroupMember(groupId, userId);
    if (data.length === 0) {
      return res.status(404).json({
        message: "Delete Failed. Cannot found data by given groupId.",
      });
    }
    data = await deleteTripGroupMemberbyIds(groupId, userId);

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
