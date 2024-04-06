import express from "express";
import {
  getTripGroupDetail,
  updateTripGroupDetail,
  deleteTripGroupMember,
} from "../controllers/tripgroup.js";

const router = express.Router();

router.get("/trip-groups/:groupId/details", getTripGroupDetail);
router.put("/trip-groups/:groupId/details", updateTripGroupDetail);
router.delete("/trip-groups/:groupId/member/:userId", deleteTripGroupMember);
