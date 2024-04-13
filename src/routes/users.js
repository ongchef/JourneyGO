import express from "express";
import {
  registerUser,
  getGroup,
  createGroup,
  getInvitation,
  putInvitation,
} from "../controllers/users.js";
import bodyParser from "body-parser";

const router = express.Router();

router.post(
  "/register",
  bodyParser.raw({ type: "application/json" }),
  registerUser
);

router.get("/trip-groups", getGroup);
router.post("/trip-groups", express.json(), createGroup);
router.get("/invitations", getInvitation);
router.put("/invitations/:invitationId/status", express.json(), putInvitation);

export default router;
