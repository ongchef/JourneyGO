import express from "express";
import { searchNearby, searchPlace } from "../controllers/spot.js";

const router = express.Router();
router.get("/search/:query", searchPlace);
router.get("/search/surroundings/:query/:spotId", searchNearby);

export default router;
