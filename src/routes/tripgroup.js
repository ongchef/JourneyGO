import express from "express";
import {
  getTripGroupDetail,
  updateTripGroupDetail,
  deleteTripGroupMember,
} from "../controllers/tripgroup.js";
import {
  getSpots, 
  createSpot,
  updateSpot,
  deleteSpot
} from "../controllers/spot.js"

const router = express.Router();

router.get("/:groupId/details", getTripGroupDetail);
router.put("/details", updateTripGroupDetail);
router.delete("/:groupId/member/:userId", deleteTripGroupMember);

router.get("/:groupId/days/:day/spots", getSpots);
router.post("/:groupId/days/:day/spots", createSpot);
router.put("/:groupId/days/:day/spots", updateSpot);
router.delete("/:groupId/days/:day/spots/:spotId", deleteSpot)

export default router;
