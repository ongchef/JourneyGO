import express from "express";
import { copyGroup } from "../controllers/sharegroup.js";

const router = express.Router();

router.post("/", copyGroup);

export default router;