import express from "express";
import {
    getSpot, 
    createSpot,
    updateSpot,
    deleteSpot
} from "../controllers/spot.js"

const router = express.Router();

router.get("/trip-groups/:groupId/days/:day/spots", getSpot);
router.post("/trip-groups/:groupId/days/:day/spots", createSpot);
router.put("/trip-groups/:groupId/days/:day/spots", updateSpot);
router.delete("/trip-groups/:groupId/days/:day/spots/:spotId", deleteSpot)

