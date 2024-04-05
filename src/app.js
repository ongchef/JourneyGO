import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import spotRouter from "./routes/spot.js";

dotenv.config();

export const app = express();
app.use(express.json());
app.use(cors({
  origin: "*",
  credentials: true,
}));


/*=====================  SERVER START  =====================*/ 
app.get("/", (req, res) => {
    res.send("Hello World!");
  });

app.use("api/spot/", spotRouter);

