import express from "express";
import { copyGroup, getShareCode } from "../controllers/sharegroup.js";

const router = express.Router();

router.post("/", copyGroup);
router.get("/:group_id",getShareCode)

export default router;