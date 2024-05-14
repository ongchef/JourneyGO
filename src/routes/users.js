import express from "express";
import multer from "multer";
import bodyParser from "body-parser";
import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";

import getUserInfo from "../middlewares/userInfo.js";
import {
  registerUser,
  getGroup,
  createGroup,
  getInvitation,
  putInvitation,
  updateUserInfo,
  postImage, 
} from "../controllers/users.js";


const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/register",
  bodyParser.raw({ type: "application/json" }),
  registerUser
);
router.post(
  "/updateUserInfo",
  bodyParser.raw({ type: "application/json" }),
  updateUserInfo
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

router.post(
  "/images",
  ClerkExpressWithAuth(),
  getUserInfo,
  express.json(),
  upload.single('photo'),
  postImage
);

export default router;
