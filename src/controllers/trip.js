import {
  getuserIdbyClerkId,
  getGroupByUserId,
  createGroupModel,
  getInviteeIdByEmail,
  createInvitationModel,
  getOverviewByGroupId,
  getInvitationByUserId,
  updateInvitation,
} from "../models/tripModel.js";

export const getGroup = async (req, res) => {
  const clerkId = req.userID;
  try {
    const userId = await getuserIdbyClerkId(clerkId);
    console.log(userId);
    const data = await getGroupByUserId(userId);
    console.log(data);
    if (data.length === 0) {
      return res.status(200).json([]);
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//add country
export const createGroup = async (req, res) => {
  const clerkId = req.userID;

  const { groupName, country, invitee, startDate, endDate } = req.body;
  try {
    const userId = await getuserIdbyClerkId(clerkId);
    console.log(userId);
    const newGroup = await createGroupModel(
      userId,
      country,
      groupName,
      startDate,
      endDate
    );

    const inviteeIds = [];
    for (const email of invitee) {
      const inviteeId = await getInviteeIdByEmail(email);
      if (inviteeId) {
        inviteeIds.push(inviteeId);
      } else {
        console.log(`User with email ${email} not found.`);
      }
    }

    // 为每个 invitee 创建邀请
    for (const inviteeId of inviteeIds) {
      const newInvitation = await createInvitationModel(
        userId,
        inviteeId,
        groupId
      );
    }

    return res.status(201).json(newGroup);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createInvitation = async (req, res) => {
  //如果沒有這些人或是群組的話
  const { invitee, groupId } = req.body;
  const clerkId = req.userID;

  try {
    const inviterId = await getuserIdbyClerkId(clerkId);
    console.log(inviterId);
    const inviteeId = await getInviteeIdByEmail(invitee);
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

export const getInvitation = async (req, res) => {
  const clerkId = req.userID;
  try {
    const userId = await getuserIdbyClerkId(clerkId);
    console.log(userId);
    const data = await getInvitationByUserId(userId);

    if (data.length === 0) {
      return res
        .status(404)
        .json({ message: "Cannot found invitations by given userId." });
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const putInvitation = async (req, res) => {
  const { invitationId } = req.params;
  const { status } = req.body;

  try {
    if (
      status !== "accepted" ||
      status !== "pending" ||
      status !== "rejected"
    ) {
      return res
        .status(400)
        .json({ message: "status need to be accepted, pending, or rejected." });
    }
    const updInvitation = await updateInvitation(invitationId, status);

    return res.status(201).json(updInvitation);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
