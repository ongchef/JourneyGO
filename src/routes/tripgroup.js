import express from "express";
import {
  getTripGroupDetail,
  updateTripGroupDetail,
  deleteTripGroupMember,
} from "../controllers/tripgroup.js";

const router = express.Router();

router.get("/:groupId/details", getTripGroupDetail);
router.put("/details", updateTripGroupDetail);
router.delete("/:groupId/member/:userId", deleteTripGroupMember);

export default router;
