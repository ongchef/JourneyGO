import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import tripgroupRouter from "./routes/tripgroup.js";
import tripRouter from "./routes/trip.js";
import usersRouter from "./routes/users.js";
import spotRouter from "./routes/spot.js";
dotenv.config();

export const app = express();
// webhook api need to comment this out
app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

/*=====================  SERVER START  =====================*/
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/tripgroup/", tripgroupRouter);

app.use("/api/users/", usersRouter);
app.use("/api/trip/", tripRouter);
app.use("/api/spots/", spotRouter);
