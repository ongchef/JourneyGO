import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import {
  ClerkExpressWithAuth,
  ClerkExpressRequireAuth,
} from "@clerk/clerk-sdk-node";

import getUserInfo from "./middlewares/userInfo.js";

import tripgroupRouter from "./routes/tripgroup.js";
import tripRouter from "./routes/trip.js";
import usersRouter from "./routes/users.js";
import spotRouter from "./routes/spot.js";
import countryRounter from "./routes/country.js";
import transportationRouter from './routes/transportation.js'
import shareGroupRouter from './routes/sharegroup.js'

import db from "./models/db_connection.js";

dotenv.config();

export const app = express();

db.connect()
  .then(() => {
    console.log("PostgreSQL connection established successfully.");
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/api/users/", usersRouter);
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
})

app.use("/api/tripgroup/", ClerkExpressWithAuth(), getUserInfo, tripgroupRouter);
app.use("/api/spots/", ClerkExpressWithAuth(), getUserInfo, spotRouter);
app.use("/api/countries/", ClerkExpressWithAuth(), getUserInfo, countryRounter);
app.use("/api/transportation/",ClerkExpressRequireAuth(),getUserInfo, transportationRouter)
app.use("/api/share/",ClerkExpressRequireAuth(),getUserInfo, shareGroupRouter)