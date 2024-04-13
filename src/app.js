import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import getUserInfo from "./middlewares/userInfo.js";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

import tripgroupRouter from "./routes/tripgroup.js";
import tripRouter from "./routes/trip.js";
import usersRouter from "./routes/users.js";
import spotRouter from "./routes/spot.js";
import countryRounter from "./routes/country.js";
dotenv.config();

export const app = express();

app.use("/api/users/", ClerkExpressRequireAuth(), getUserInfo, usersRouter);
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
  console.log();
  res.send("Hello World!");
});

// authenticate user

// get user info

app.use(
  "/api/tripgroup/",
  ClerkExpressRequireAuth(),
  getUserInfo,
  tripgroupRouter
);

// app.use("/api/trip/", ClerkExpressRequireAuth(), getUserInfo, tripRouter);
app.use("/api/spots/", ClerkExpressRequireAuth(), getUserInfo, spotRouter);
app.use(
  "/api/countries/",
  ClerkExpressRequireAuth(),
  getUserInfo,
  countryRounter
);
