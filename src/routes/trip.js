import express from "express";
import multer from "multer";
import uploadImage from "../middlewares/imageUpload.js";
import {
    getGroup,
    createGroup,
    createInvitation,
    getGroupOverview,
    getInvitation,
    putInvitation,
} from "../controllers/trip.js"

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });


router.get("/users/trip-groups", getGroup);
router.post("/users/trip-groups", upload.single("image"), uploadImage, createGroup);
router.post("/trip-groups/invitations", createInvitation);
router.get("/trip-groups/:groupId/overview", getGroupOverview);
router.get("/users/invitations", getInvitation);
router.put("/invitations/:invitationId/status", putInvitation);

export default router

