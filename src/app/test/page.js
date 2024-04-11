'use client';
import { io } from 'socket.io-client';
import { use, useEffect, useState } from "react";

export default function Test(props) {
  const { Id } = props;
  const [socketData, setSocketData] = useState(null);

  useEffect(() => {
    const socket = io("http://localhost:4000");

    function enterRoom(data) {
      socket.emit("enter_room", {
        groupId: 1,  //int
        jwt: "test",
      });
    }
    
    function spotChange(data) {
      socket.emit("client_spot_change", {
        groupId: 1,
        day: 1,
        spot_sequence: [1, 2, 3],
      });
    }

    socket.on("server_spot_change", data => {
      const day = data.day
      const spot_sequence = data.spot_sequence    
    })

  }, []);

  // useEffect(() => {
  //   const ws = new WebSocket(`ws://${Id}`);

  //   const handleSocketMessage = (event) => {
  //     const message = JSON.parse(event.data);
  //     setSocketData(message);
  //   };

  //   ws.onopen = () => {
  //     // send data to socket periodically
  //     setInterval(() => {
  //       ws.send(JSON.stringify({ message: "Hello" }));
  //     }, 1000);
  //     console.log("WS open");
  //   }
  //   ws.onerror = (error) => {
  //     console.log("WS error: ", error)
  //   }
  //   ws.onclose = (event) => {
  //     console.log("WS close: ", event);
  //   }
  //   ws.onmessage = handleSocketMessage;

  //   return () => {
  //     ws.close();
  //   };
  // }, [Id]);

  return (
    <div>
      {socketData}
    </div>);
}