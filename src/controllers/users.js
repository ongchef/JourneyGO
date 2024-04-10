// controllers/userController.js
import { addNewUser } from "../models/userModel.js";
import { Webhook } from "svix";
import bodyParser from "body-parser";

export const registerUser = async function (req, res) {
  bodyParser.raw({ type: "application/json" });

  // Check if the 'Signing Secret' from the Clerk Dashboard was correctly provided
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET_ADD;
  console.log(WEBHOOK_SECRET);
  if (!WEBHOOK_SECRET) {
    throw new Error("You need a WEBHOOK_SECRET in your .env");
  }

  // Grab the headers and body
  const headers = req.headers;
  const payload = req.body;

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
      status: "active",
    });
    res.status(201).json({
      success: true,
      message: "User successfully registered",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
