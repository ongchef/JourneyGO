// controllers/userController.js
import {
  addNewUser,
  getuserIdbyClerkId,
  getGroupByUserId,
  createGroupModel,
  getInviteeIdByEmail,
  getInvitationByUserId,
  updateInvitation,
} from "../models/userModel.js";
import { createInvitationModel } from "../models/tripgroupModel.js";

import { Webhook } from "svix";
import bodyParser from "body-parser";

export const registerUser = async function (req, res) {
  // Check if the 'Signing Secret' from the Clerk Dashboard was correctly provided
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET_ADD;
  console.log(WEBHOOK_SECRET);
  if (!WEBHOOK_SECRET) {
    throw new Error("You need a WEBHOOK_SECRET in your .env");
  }

  // Grab the headers and body
  const headers = req.headers;
  const payload = req.body;
  console.log(payload);
  console.log(headers);
  // Get the Svix headers for verification
  const svix_id = headers["svix-id"];
  const svix_timestamp = headers["svix-timestamp"];
  const svix_signature = headers["svix-signature"];

  // If there are missing Svix headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Initiate Svix
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt;

  // Attempt to verify the incoming webhook
  // If successful, the payload will be available from 'evt'
  // If the verification fails, error out and  return error code
  try {
    evt = wh.verify(payload, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    // Console log and return error
    console.log("Webhook failed to verify. Error:", err.message);
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  // Grab the ID and TYPE of the Webhook
  const { id } = evt.data;
  const eventType = evt.type;

  console.log(`Webhook with an ID of ${id} and type of ${eventType}`);
  // Console log the full payload to view
  console.log("Webhook body:", evt.data);

  const email = evt.data.email_addresses[0].email_address;
  const username = evt.data.username;
  const userid = evt.data.id;
  try {
    addNewUser({
      userID: userid,
      userEmail: email,
      userName: username,
      status: "Active",
    });
    res.status(201).json({
      success: true,
      message: "User successfully registered",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getGroup = async (req, res) => {
  const clerkId = req.userID;
  try {
    let userId = await getuserIdbyClerkId(clerkId);
    console.log(userId);
    userId = userId[0].user_id;
    console.log(userId);
    const data = await getGroupByUserId(userId);
    if (data.length === 0) {
      return res.status(200).json([]);
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// export const createGroup = async (req, res) => {
//   const clerkId = req.userID;

//   const { groupName, country, invitee, startDate, endDate } = req.body;
//   try {
//       let userId = await getuserIdbyClerkId(clerkId)
//       userId = userId.user_id
//       const newGroup = await createGroupModel(userId, country, groupName, startDate, endDate);

//       const inviteeId = await getInviteeIdByEmail(email);

//       const newInvitation = await createInvitationModel(userId, inviteeId, groupId);

//       return res.status(201).json(newGroup);
//   }catch (error) {
//       return res.status(500).json({ message: error.message});
//   }
// }

export const createGroup = async (req, res) => {
  const clerkId = req.userID;
  console.log(req.body);
  const { groupName, countries, inviteeEmail, startDate, endDate } = req.body;
  try {
    let userId = await getuserIdbyClerkId(clerkId);
    userId = userId[0].user_id;
    console.log(userId, groupName, countries, inviteeEmail, startDate, endDate);
    const newGroup = await createGroupModel(
      userId,
      groupName,
      ["臺灣"],
      startDate,
      endDate
    );
    console.log("newGroup", newGroup);
    console.log("?");
    let inviteeId = await getInviteeIdByEmail(inviteeEmail);
    inviteeId = inviteeId.user_id;
    console.log("inviteeeee", inviteeId);
    const newInvitation = await createInvitationModel(
      userId,
      inviteeId,
      newGroup
    );

    return res.status(201).json(newGroup);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getInvitation = async (req, res) => {
  const clerkId = req.userID;
  try {
    let userId = await getuserIdbyClerkId(clerkId);
    userId = userId[0].user_id;
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
  console.log(req.body);
  const { status } = req.body;

  try {
    if (
      status !== "accepted" &&
      status !== "pending" &&
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
