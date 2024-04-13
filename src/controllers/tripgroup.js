import {
  getTripGroupDetailbyGroupID,
  updateTripGroupDetailbyGroupId,
  getTripGroupMember,
  deleteTripGroupMemberbyIds,
  getOverviewByGroupId,
  createInvitationModel,
} from "../models/tripgroupModel.js";
import {
  getuserIdbyClerkId,
  getInviteeIdByEmail,
} from "../models/userModel.js";

export const createInvitation = async (req, res) => {
  //如果沒有這些人或是群組的話
  const { inviteeEmail, groupId } = req.body;
  const clerkId = req.userID;
  console.log(inviteeEmail, groupId);
  try {
    let inviterId = await getuserIdbyClerkId(clerkId);
    console.log(inviterId);
    inviterId = inviterId[0].user_id;
    let inviteeId = await getInviteeIdByEmail(inviteeEmail);
    inviteeId = inviteeId.user_id

    const newInvitation = await createInvitationModel(
      inviterId,
      inviteeId,
      groupId
    );

    return res.status(201).json(newInvitation);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getGroupOverview = async (req, res) => {
  const { groupId } = req.params;
  try {
    const data = await getOverviewByGroupId(groupId);
    if (data.length === 0) {
      return res
        .status(404)
        .json({ message: "Cannot found overviews by given groupId." });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getTripGroupDetail = async (req, res) => {
  const { groupId } = req.params;
  const verify = req.userID;
  console.log(verify);
  try {
    const data = await getTripGroupDetailbyGroupID(groupId);
    // no tripGroup found
    if (data.length === 0) {
      return res
        .status(404)
        .json({ message: "Cannot found data by given groupId." });
    }
    //console.log(data);
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const updateTripGroupDetail = async (req, res) => {
  const userClerkId = req.userID;
  const { groupId, groupName, start_date, end_date } = req.body;
  try {
    //update 之前先 get get 看
    const data = await getTripGroupDetailbyGroupID(groupId);
    const user = await getTripGroupMember(groupId, userClerkId);
    // no tripGroup found
    if (data.length === 0) {
      console.log("Cannot found group by given groupId.");
      return res.status(404).json({
        message: "Update Failed. Cannot found data by given groupId.",
      });
    }
    // no user found
    if (user.length === 0) {
      console.log(
        "Cannot found user by given userId.",
        "Update Failed. User" + " not in group " + groupId
      );
      return res.status(404).json({
        message: "Update Failed. User" + " not in group " + groupId,
      });
    }
    const resdata = await updateTripGroupDetailbyGroupId(
      groupId,
      groupName,
      start_date,
      end_date
    );

    return res
      .status(200)
      .json({ ...resdata, message: "Update Successfully." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteTripGroupMember = async (req, res) => {
  const userClerkId = req.userID;
  const { groupId } = req.params;
  console.log(userClerkId, groupId);
  try {
    const data = await getTripGroupMember(groupId, userClerkId);
    if (data.length === 0) {
      console.log("user", " not in group", groupId);
      return res.status(404).json({
        message: "Delete Failed. User not in group " + groupId,
      });
    }

    const resdata = await deleteTripGroupMemberbyIds(groupId, data[0].u_id);

    return res.status(200).json({
      ...resdata,
      message:
        "user " + data[0].u_id + " leave group " + groupId + " successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
