'use client';
import { io } from 'socket.io-client';
import { useEffect, useState, useContext } from "react";
import { DataContext } from '../components/dataContext';

export default function Test(props) {
  const { Id } = props;
  const [socketData, setSocketData] = useState(null);

  useEffect(() => {
    const socket = io("https://backend-rd2rxwzuga-de.a.run.app");
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
      console.log("spotchange", day, spot_sequence);
    })
    enterRoom();
    spotChange();
  }, []);

  return (
    <div>
      {socketData}
    </div>);
}