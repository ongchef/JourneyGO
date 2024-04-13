import express from "express";
import {
  getTripGroupDetail,
  updateTripGroupDetail,
  deleteTripGroupMember,
  createInvitation,
  getGroupOverview,
} from "../controllers/tripgroup.js";
import {
  getSpots,
  createSpot,
  updateSpot,
  deleteSpot,
} from "../controllers/spot.js";

const router = express.Router();

router.post("/invitations", createInvitation);
router.get("/:groupId/overview", getGroupOverview);

router.get("/:groupId/details", getTripGroupDetail);
router.put("/details", updateTripGroupDetail);
router.delete("/:groupId/member", deleteTripGroupMember);

router.get("/:groupId/days/:day/spots", getSpots);
router.post("/:groupId/days/:day/spots", createSpot);
router.put("/:groupId/days/:day/spots", updateSpot);
router.delete("/:groupId/days/:day/spots/:spotId", deleteSpot);

export default router;
