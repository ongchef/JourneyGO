'use client';

import update from 'immutability-helper'
import { useCallback, useState, useContext, useEffect, use } from 'react'
import { DndCard } from './dndCard.js'
import { DataContext } from '@/app/components/dataContext.jsx';
import { putSpots } from '@/services/putSpots.js';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function DndContainer({day, spotChange}) {
  const {allSpots, setAllSpots, currGroupId, setCurrDay, Token} = useContext(DataContext);
  const [updateCards, setUpdateCards] = useState([])
  const [cards, setCards] = useState([]);

  useEffect(() => {
    setCurrDay(day);
  }, []);

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

  // update allSpots and put when update cards locally
  useEffect(() => {
    spotChange(day, updateCards); //socket
    setAllSpots(prevState => ({
      ...prevState,
      [currGroupId]: {
        ...prevState[currGroupId] || {},  
        [day]: cards,
      },
    }));
    async function put() {
      const status = await putSpots(Token, currGroupId, day, updateCards);
    }
    put();
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
