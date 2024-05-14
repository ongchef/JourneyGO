'use client';

import update from 'immutability-helper'
import { useCallback, useState, useContext, useEffect} from 'react'
import { DndCard } from './dndCard.js'
import { DataContext } from '@/app/components/dataContext.jsx';
import { getSpots } from '@/services/getSpots';
import SelectTransport from './selectTransport.js';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TrainIcon from '@mui/icons-material/Train';
import { getToken } from '@/utils/getToken';

export default function DndContainer({day, spotChange}) {
  const {allSpots, setAllSpots, currGroupId, currDay, setCurrDay, refetch, allTrans, setAllTrans, currentLang} = useContext(DataContext);
  const [updateCards, setUpdateCards] = useState([])
  const [cards, setCards] = useState([]);

  const translate = (key) => {
    const translations = {
        public: {
            zh: "大眾運輸",
            en: "Public Transport",
        },
        drive: {
            zh: "汽車",
            en: "Drive",
        },
        accept: {
            zh: "確認",
            en: "Accept",
        },
        cancel: {
            zh: "取消",
            en: "Cancel",
        },
        分鐘: {
            zh: "分鐘",
            en: "minutes",
        },
        小時: {
            zh: "小時",
            en: "hour",
        },
        無: {
            zh: "(無)",
            en: "(None)",
        },
    };

    // Check if the key is a time string
    if (/\d/.test(key)) {
        const parts = key.split(" ");
        const translatedParts = parts.map((part) => {
            // If the part is numeric, return it as is
            if (/\d/.test(part)) {
                return part;
            }
            // Otherwise, translate it
            return translations[part][currentLang];
        });
        return translatedParts.join(" ");
    }
    return translations[key][currentLang];
};

  useEffect(() => {
    setCurrDay(day);
  }, [day]);

  // fetch spots
  useEffect(() => {                             
    async function fetchSpots(Token) {
      if (currGroupId===undefined || currDay===undefined) return;  
      try {
        console.log("fetch");
        const {res, durations, status, option} = await getSpots(Token, currGroupId, currDay);
        if (status !== 200) { return; }
        if (res !== undefined && res.length !== 0 ) {
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
        } 
        // update transportation
        if (durations !== undefined && durations.length > 0){
          let newValue = "";
          if(option === "TRANSIT") {
            newValue = "大眾運輸";
          } else if (option === "DRIVING") {
            newValue = "汽車";
          }
          const updatedDay = [newValue, durations];  
          setAllTrans((prev) => {
            return {
              ...prev,
              [currGroupId]: {
                ...prev[currGroupId] || {},
                [currDay]: updatedDay,
              },
            };
          });
        }
      } catch (e) {
        console.error(e);
      }
    };
    const Token = getToken();
    fetchSpots(Token);
  }, [currGroupId, currDay, refetch]);

  // update current cards
  useEffect(() => {
    const cards_data = allSpots?.[currGroupId]?.[day];
      setCards(cards_data);
      setUpdateCards(cards_data);
  }, [allSpots]);

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    const prevCards = allSpots?.[currGroupId]?.[currDay];
    const updatedCards = update(prevCards, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, prevCards[dragIndex]],
      ],
    });
    setAllSpots(prevState => ({
      ...prevState,
      [currGroupId]: {
        ...prevState[currGroupId] || {}, 
        [day]: updatedCards,
      },
    }));
    spotChange(day, updatedCards); //socket
  });

  return (
    <>
      <div className='flex flex-col gap-2 lg:p-5 p-3'>
        <SelectTransport spotChange={spotChange} />
        {cards?.map((card, index) => {  
          return (
            <div key={card?.id}>
              <DndCard
                index={index}
                id={card?.id}
                title={card?.title}
                location={card?.location}
                moveCard={moveCard}
                spotChange={spotChange}
              />
              {index !== cards.length - 1 &&  // not the last card
                <div className='flex flex-row items-center justify-start gap-2 my-2 ml-5'>
                  <MoreVertIcon className='scale-125 mr-3'/>
                  {(allTrans?.[currGroupId]?.[currDay]?.[0] === '汽車') &&
                    <DirectionsCarIcon className='text-center'/> 
                  }
                  {(allTrans?.[currGroupId]?.[currDay]?.[0] === '大眾運輸') &&
                    <TrainIcon className='text-center'/> 
                  }
                  <Typography variant='body2' className='text-center'>
                    {/* {allTrans?.[currGroupId]?.[currDay]?.[0]} {allTrans?.[currGroupId]?.[currDay]?.[1]?.[index] || "(無)"} */}
                    {allTrans?.[currGroupId]?.[currDay]?.[0] === '汽車'? translate('drive'):translate('public')} {translate(allTrans?.[currGroupId]?.[currDay]?.[1]?.[index] || "無")}
                  </Typography>
                </div>
              }
            </div>
          );
        })}
      </div>
    </>
  )
}