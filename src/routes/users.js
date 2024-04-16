import express from "express";
import {
  registerUser,
  getGroup,
  createGroup,
  getInvitation,
  putInvitation,
} from "../controllers/users.js";
import bodyParser from "body-parser";
import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";
import getUserInfo from "../middlewares/userInfo.js";

const router = express.Router();

router.post(
  "/register",
  bodyParser.raw({ type: "application/json" }),
  registerUser
);

router.get("/trip-groups", ClerkExpressWithAuth(), getUserInfo, getGroup);
router.post(
  "/trip-groups",
  ClerkExpressWithAuth(),
  getUserInfo,
  express.json(),
  createGroup
);
router.get("/invitations", ClerkExpressWithAuth(), getUserInfo, getInvitation);
router.put(
  "/invitations/:invitationId/status",
  ClerkExpressWithAuth(),
  getUserInfo,
  express.json(),
  putInvitation
);

export default router;
