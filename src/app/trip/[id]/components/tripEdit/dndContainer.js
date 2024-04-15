'use client';

import update from 'immutability-helper'
import { useCallback, useState, useContext, useEffect} from 'react'
import { DndCard } from './dndCard.js'
import { DataContext } from '@/app/components/dataContext.jsx';
import { getSpots } from '@/services/getSpots';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function DndContainer({day, spotChange}) {
  const {allSpots, setAllSpots, currGroupId, currDay, setCurrDay, Token, refetch} = useContext(DataContext);
  const [updateCards, setUpdateCards] = useState([])
  const [cards, setCards] = useState([]);

  useEffect(() => {
    setCurrDay(day);
  }, [day]);


  useEffect(() => {                             //  sequence [{id, title, startTime, endTime, numLikes, comments, imgUrl},]
    const fetchSpots = async () => {
      console.log("fetchSpots", currGroupId, currDay);
      if (currGroupId===undefined || currDay===undefined) return;     // Do nothing if groupId or day is not set
      try {
        const res = await getSpots(Token, currGroupId, currDay);
        console.log("res", res);
        if (res === undefined) return;
        setCards(res);
        setAllSpots((prevState) => {
          const updatedState = {
            ...prevState,
            [currGroupId]: {
              ...(prevState[currGroupId] || {}),
              [currDay]: res,
            },
          };
          return updatedState;
        });
        console.log("allSpots", allSpots);
        console.log("cards", cards);
      } catch (e) {
        console.error(e);
      }
    };
    fetchSpots();
  }, [currGroupId, currDay, refetch]);

  // update cards when allSpots changes
  // useEffect(() => {
  //   try {
  //     if (allSpots && allSpots[currGroupId] && allSpots[currGroupId][day] !== undefined) {
  //       setCards(allSpots?.currGroupId?.day);
  //     }
  //   } catch (error) {
  //     console.log("setCards", error)
  //   }
  // }, [refetch]);

  // update allSpots and put when update cards locally
  useEffect(() => {
    spotChange(day, updateCards); //socket
    setAllSpots(prevState => ({
      ...prevState,
      [currGroupId]: {
        ...prevState[currGroupId] || {}, 
        [day]: updateCards,
      },
    }));
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
            <div key={card?.id}>
              <DndCard
                index={index}
                id={card?.id}
                title={card?.title}
                location={card?.location}
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