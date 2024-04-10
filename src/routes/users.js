import express from "express";
import { registerUser } from "../controllers/users.js";
import bodyParser from "body-parser";

const router = express.Router();

router.post(
  "/users/register",
  bodyParser.raw({ type: "application/json" }),
  registerUser
);

export default router;
