import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import axios from "axios";
import swaggerUi from "swagger-ui-express";
import { createRequire } from "module";

import db from "./models/db_connection.js";
import { app } from "./app.js";

dotenv.config();
const require = createRequire(import.meta.url);
const swaggerDocument = require("../swagger0413.json");

export const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

const port = process.env.PORT || 3001;
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/*=====================  SOCKET  =====================*/

io.on("connection", (socket) => {
  // New user has connected
  console.log(`A user connected`);

  socket.on("enter_room", (data) => {
    socket.join(data.groupId);
    console.log(`${data.jwt} enters ${data.groupId} successfully.`);
  });

  // Receive client spot seq change
  socket.on("client_spot_change", async (data) => {
    io.to(data.groupId).emit("server_spot_change", {
      day: data.day,
      spot_sequence: data.spot_sequence,
    });

    // Call API update DB rows
    /* var cnt = 0;
    data.spot_sequence.forEach(async (element) => {
      const response = await axios.post(
        `http://localhost:${port}/api/tripgroup/${data.groupId}/days/${data.day}/spots`,
        {
          spotId: element,
          sequence: cnt,
        }
      );
      cnt += 1;
    }); */
  });
});

/*=====================  SERVER START  =====================*/
server.listen(port, async () => {
  try {
    await db.connect();
    console.log(`Server running on port http://localhost:${port}.`);
    console.log(`PostgreSQL connection established successfully.`);
  } catch (error) {
    console.log(error);
  }
});
