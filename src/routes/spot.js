import express from "express";
import { searchNearby, searchPlace } from "../controllers/spot";

const router = express.Router();
router.get("/spots/search/:query", searchPlace)
router.get("/spots/search/surroundings/:query/:spotId", searchNearby)