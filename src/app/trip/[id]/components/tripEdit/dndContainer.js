'use client';

import update from 'immutability-helper'
import { useCallback, useState, useContext, useEffect, use } from 'react'
import { DndCard } from './dndCard.js'
import { DataContext } from '@/app/components/dataContext.jsx';
import { io } from 'socket.io-client';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function DndContainer(props) {
  const {allSpots, setAllSpots, currGroupId, setCurrDay, Token} = useContext(DataContext);
  const {day} = props;
  const [updateCards, setUpdateCards] = useState([])
  const [cards, setCards] = useState([]);

  useEffect(() => {
    setCurrDay(day);
  }, []);

  // web socket
  useEffect(() => {
    const socket = io("http://localhost:3000");
    function enterRoom(data) {
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
    function spotChange(data) {
      const spot_sequence = updateCards.map(card => card.id);
      socket.emit("client_spot_change", {
        groupId: currGroupId,
        day: day,
        spot_sequence: spot_sequence,
      });
    }
    // update allSpots when server_spot_change
    socket.on("server_spot_change", data => {
      const { socket_day, spot_sequence } = data;
      if (socket_day !== day) return;
      const reorderedCards = updateCards.sort((a, b) =>
        spot_sequence.indexOf(a.id) - spot_sequence.indexOf(b.id)
      );
      setAllSpots(prevState => ({
        ...prevState,
        [currGroupId]: {
          ...prevState[currGroupId] || {},  
          [day]: reorderedCards,
        },
      }));
    })
    enterRoom();
    spotChange();
  }, [updateCards]);

  // update cards when allSpots changes
  useEffect(() => {
    try {
      if (allSpots && allSpots[currGroupId] && allSpots[currGroupId][day] !== undefined) {
        setCards(allSpots[currGroupId][day]);
      }
    } catch (error) {
      console.log("setCards", error)
    }
  }, [allSpots]);

  // update allSpots and post when update cards locally
  useEffect(() => {
    setAllSpots(prevState => ({
      ...prevState,
      [currGroupId]: {
        ...prevState[currGroupId] || {},  
        [day]: cards,
      },
    }));
    console.log("updateCards", updateCards);
  }, [updateCards]);

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    setCards((prevCards) => {
      const updatedCards = update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]],
        ],
      });
      setUpdateCards(updatedCards);
      return updatedCards;
    });
  }, []);

  return (
    <>
      <div className='flex flex-col gap-2 p-5'>
        {cards?.map((card, index) => {  
          return (
            <div key={card.id}>
              <DndCard
                index={index}
                id={card.id}
                text={card.title}
                address={card.address}
                moveCard={moveCard}
              />
              {index !== cards.length - 1 &&  
                <div className='flex flex-row items-center justify-start gap-2 my-2 ml-5'>
                  <MoreVertIcon className='scale-125 mr-3'/>
                  <DirectionsCarIcon className='text-center'/>
                  <Typography variant='body2' className='text-center'>開車五分鐘</Typography>
                </div>
              }
            </div>
          );
        })}
      </div>
    </>
  )
}
