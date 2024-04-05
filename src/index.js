import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";

import db from './models/db_connection.js';
import {app} from './app.js';

dotenv.config();

export const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

/*=====================  SOCKET  =====================*/ 
io.on("connection", (socket) => {
  // New user has connected
  console.log(`A user connected`);

  socket.on("enter_room", (data) => {
    socket.join(data.groupId);
    console.log(`${data.username} enters ${data.groupId} successfully.`);
  })

  socket.on("client_spot_change", (data) => {
    io.to(data.groupId).emit("server_spot_change", data.payload);
  })
});



/*=====================  SERVER START  =====================*/ 
const port = process.env.PORT || 3001;

server.listen(port, async () => {
  try{
    await db.connect();
    console.log(`Server running on port http://localhost:${port}.`);
    console.log(`PostgreSQL connection established successfully.`);
  }catch(error){
    console.log(error);
  }
})


