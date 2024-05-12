import express from "express";
import { copyGroup, getShareCode } from "../controllers/sharegroup.js";

const router = express.Router();

router.get("/:group_id",getShareCode)
router.post("/", copyGroup);

export default router;