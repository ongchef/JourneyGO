import express from "express";
import {
    getGroup,
    createGroup,
    createInvitation,
    getGroupOverview,
    getInvitation,
    putInvitation,
} from "../controllers/trip.js"

const router = express.Router();

router.get("/users/:userId/trip-groups", getGroup);
router.post("/users/trip-groups", createGroup);
router.post("/trip-groups/invitations", createInvitation);
router.get("/trip-groups/:groupId/overview", getGroupOverview);
router.get("/users/:userId/invitations", getInvitation);
router.put("/invitations/:invitationId/status", putInvitation);

export default router

