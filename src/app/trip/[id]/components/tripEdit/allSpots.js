'use client';

import { useEffect, useContext, useState } from 'react';
import { DataContext } from '@/app/components/dataContext';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DndContainer from './dndContainer';
import { io } from 'socket.io-client';
import { getToken } from '@/utils/getToken';

export default function AllSpots({day}) {
  const {allSpots, setAllSpots, currGroupId, setRefetch, newSpot} = useContext(DataContext);
  const [newCards, setNewCards] = useState([]); //store spot_sequence from socket
  const [newDay, setNewDay] = useState();       //store day from socket
  const [socket, setSocket] = useState(null)
  

  const spotChange = (_day, updateCards) => {
    const spot_sequence = updateCards?.map(card => card.id);
    console.log(`${socket.id} client_spot_change`);
    // console.log("spotChange", _day, spot_sequence);
    socket.emit("client_spot_change", {
      groupId: currGroupId,
      day: _day,
      spot_sequence: spot_sequence,
    });
  }

  useEffect(()=>{
    const socket = io(process.env.NEXT_PUBLIC_BASE_URL,
      {
        transports:['websocket'],
        reconnection: true,
        reconnectionAttempts: Infinity,
        reconnectionDelay:1000,
        reconnectionDelayMax:6000,
      });
    setSocket(socket)
    socket.on('keep-alive', (data) => {
      console.log('Keep-alive message received at', data.time);
    });
  },[])

  useEffect(()=>{
    function enterRoom(Token) {
      // check if socket is already connected
      if (socket.connected) {
        console.log("socket is already connected");
        return;
      }
      socket.emit("enter_room", {
        groupId: currGroupId,  //int
        jwt: Token,
      });
      // console.log("socket is connected");
    }
    const Token = getToken();
    enterRoom(Token);
  },[])
  
  useEffect(()=>{
    const handleServerSpotChange = data => {
      // setRefetch(prev => prev + 1); // future plan
      const { day, spot_sequence } = data;
      console.log(`${socket.id} server_spot_change`);
      setNewCards(spot_sequence);
      setNewDay(day);
    }
    socket.on("server_spot_change", handleServerSpotChange)

    return () => {
      socket.off("server_spot_change", handleServerSpotChange);
    }
  },[])
  

  // trigger socket when posting new spot
  useEffect(() => {
    if (allSpots?.[currGroupId]?.[day]){
      spotChange(day, newSpot);
    }
  }, [newCards])

  // update allSpots when server_spot_change 
  useEffect(() => {
    try{
      setRefetch(prev => prev + 1);
      // if (newCards?.length !== allSpots?.[currGroupId]?.[newDay]) {
      //   setRefetch(prev => prev + 1);
      //   return;
      // }
      // const prevCards = allSpots?.[currGroupId]?.[newDay];
      // const reorderedCards = prevCards?.sort((a, b) =>
      //   newCards.indexOf(a.id) - newCards.indexOf(b.id)
      // );
      // setAllSpots(prevState => ({
      //   ...prevState,
      //   [currGroupId]: {
      //     ...prevState[currGroupId] || {},  
      //     [newDay]: reorderedCards,
      //   },
      // }));
    }
    catch (e) {
      setRefetch(prev => prev + 1);
      console.log("error", e);
    }
  }, [newCards]);

  return (
    <div className="bg-neutral-200 w-full">
      <DndProvider backend={HTML5Backend}>
        <DndContainer day={day} spotChange={spotChange} />
      </DndProvider>
    </div>
  );
}