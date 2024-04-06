import express from "express";
import {
    getGroup,
    createGroup,

} from "../controllers/trip.js"

const router = express.Router();

router.get("/users/:userId/trip-groups", getGroup);
router.post("/users/trip-groups", createGroup);