import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
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

  // If server get socket message called demo 
  socket.on("demo", (data) => {
    // Here to handle your function
    console.log("socket listen message successfully");
  })
});



/*=====================  SERVER START  =====================*/ 
const port = process.env.PORT || 3001;

server.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
})


