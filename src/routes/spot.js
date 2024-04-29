import express from "express";
import { constructRoute, searchNearby, searchPlace } from "../controllers/spot.js";

const router = express.Router();
router.get("/search/:query", searchPlace);
router.get("/search/surroundings/:query/:spotId", searchNearby);

// For test
router.get("/route/:groupId/:day/:transType",constructRoute)

export default router;
