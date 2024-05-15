import express from "express";
import multer from "multer";
import bodyParser from "body-parser";

import getUserInfo from "../middlewares/userInfo.js";
import uploadPhoto from "../middlewares/imageUpload.js";
import {
  registerUser,
  getGroup,
  createGroup,
  getInvitation,
  putInvitation,
  updateUserInfo,
  getUserProfile,
} from "../controllers/users.js";
import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/register",
  bodyParser.raw({ type: "application/json" }),
  registerUser
);

router.post(
  "/updateUserInfo",
  ClerkExpressWithAuth(),
  getUserInfo,
  express.json(),
  upload.single("photo"),
  uploadPhoto,
  updateUserInfo
);

router.get("/userProfile", ClerkExpressWithAuth(), getUserInfo, getUserProfile);
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
