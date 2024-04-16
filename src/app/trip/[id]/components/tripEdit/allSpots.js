'use client';

import { useEffect, useContext } from 'react';
import { DataContext } from '@/app/components/dataContext';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DndContainer from './dndContainer';
import { io } from 'socket.io-client';

export default function AllSpots({day}) {
  const {allSpots, setAllSpots, currGroupId, Token} = useContext(DataContext);

  const socket = io("http://localhost:3000");
  const spotChange = (_day, updateCards) => {
    const spot_sequence = updateCards.map(card => card.id);
    socket.emit("client_spot_change", {
      groupId: currGroupId,
      day: _day,
      spot_sequence: spot_sequence,
    });
  }
 
  useEffect(() => {
    function enterRoom() {
      // check if socket is already connected
      if (socket.connected) {
        console.log("socket is already connected");
        return;
      }
      socket.emit("enter_room", {
        groupId: currGroupId,  //int
        jwt: Token,
      });
    }
  
    // update allSpots when server_spot_change
    socket.on("server_spot_change", data => {
      const { socket_day, spot_sequence } = data;
      try {
        const prevCards = allSpots?.currGroupId?.socket_day;
        const reorderedCards = prevCards?.sort((a, b) =>
          spot_sequence.indexOf(a.id) - spot_sequence.indexOf(b.id)
        );
        setAllSpots(prevState => ({
          ...prevState,
          [currGroupId]: {
            ...prevState[currGroupId] || {},  
            [socket_day]: reorderedCards,
          },
        }));
      } catch (error) {
        console.log("server_spot_change", error)
      }
    })
    enterRoom();
  }, []);

  return (
    <div className="bg-neutral-200 w-full">
      <DndProvider backend={HTML5Backend}>
        <DndContainer day={day} spotChange={spotChange} />
      </DndProvider>
    </div>
  );
}