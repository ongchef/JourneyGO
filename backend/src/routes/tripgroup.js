import express from "express";
import {
  getTripGroupDetail,
  updateTripGroupDetail,
  deleteTripGroupMember,
  createInvitation,
  getGroupOverview,
  getDate,
  getBills,
  getBillResult,
  createBill,
  updateBill,
  getBillDetail,
  writeBill,
  getComments,
  createComment,
  deleteComment,
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

// bill
router.get("/:groupId/transaction", getBills);
router.get("/:groupId/transactionResult", getBillResult);
router.post("/:groupId/transaction", createBill);
router.put("/:groupId/transaction/:transactionId", updateBill);
router.get("/:groupId/transaction/:transactionId", getBillDetail);
router.post("/:groupId/transaction/writeoff", writeBill);

//comment
router.get("/:spotId/comments", getComments);
router.post("/:spotId/comment", createComment);
router.delete("/:spotId/comment/:commentId", deleteComment)
// For test
// router.get("/getDate/:groupId",getDate)
export default router;
