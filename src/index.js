import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import swaggerUi from "swagger-ui-express";
import { createRequire } from "module";

import { app } from "./app.js";

import { updateSpotBySpotId } from "./models/spotModel.js";
import pkg from "core-js";

const { setInterval } = pkg;

dotenv.config();
const require = createRequire(import.meta.url);
const swaggerDocument = require("../swagger0413.json");

export const server = createServer(app);
const io = new Server(server, {
  pingInterval: 3000,
  pingTimeout: 5000,
  cors: {
    origin: "*",
    method: ["GET", "POST"],
    credentials: true,
    transports: ['websocket', 'polling']
  },
  allowEIO3: true
});

const port = process.env.PORT || 3001;
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/*=====================  SOCKET  =====================*/

setInterval(() => {
  const time = new Date();
  io.emit('keep-alive', { 
    time: time
  });
}, 15000);

io.on("connection", (socket) => {

  // New user has connected
  console.log(`${socket.id} connected`);


  // User enter room
  socket.on("enter_room", (data) => {
    socket.join(data.groupId);
    console.log(
      `${socket.id} (jwt: ${data.jwt}) enters ${data.groupId} successfully.`
    );
  });

  // Receive client spot seq change
  socket.on("client_spot_change", async (data) => {
    io.to(data.groupId).emit("server_spot_change", {
      day: data.day,
      spot_sequence: data.spot_sequence,
    });

    console.log(`tripgroup(${data.groupId}) spot change`)

    // Call API update DB rows
    var cnt = 0;
    data.spot_sequence?.forEach(async (element) => {
      updateSpotBySpotId(element, Number(data.day) + 1, cnt);
      cnt += 1;
    });
  });
});

/*=====================  SERVER START  =====================*/
server.listen(port, async () => {
  try {
    // await db.connect();
    console.log(`Server running on port http://localhost:${port}.`);
  } catch (error) {
    console.log(error);
  }
});
