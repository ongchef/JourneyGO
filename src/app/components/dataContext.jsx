'use client';
import { createContext, useState, useEffect, useRef, useCallback } from 'react';
import { getSpots } from '@/services/getSpots';
import { getToken } from '@/utils/getToken';
import { getUserId } from '@/utils/getToken';

export const DataContext = createContext();
export const DataProvider = ({children}) => {
  const [currGroupId, setCurrGroupId] = useState();
  const [currDay, setCurrDay] = useState();
  const [Token, setToken] = useState("");
  const [userId, setUserId] = useState();


  // store Token and userId
  useEffect(() => {
    try {
      const token = getToken();
      if (!token) return;
      setToken(token);
    } catch (e) {
      console.error(e);
    }
  }, []);
  useEffect(() => {
    try {
      const user_id = getUserId();
      if (!user_id) return;
      setUserId(user_id);
    } catch (e) {
      console.error(e);
    }
  }, []);


  // store all groups
  const [allGroups, setAllGroups] = useState({});
  /*
  {
    "group_id":13,
    "group_name":"花東四天三夜遊-我好想去綠島玩122",
    "start_date":"2024-06-13",
    "end_date":"2024-06-17",
    "status":"finished",
    "user_names":["jacky","worky","picky","needy","wonuuu"],
    "days":5
  }
  */

  // store all spots given groupId and day
  const [allSpots, setAllSpots] = useState({}); // {groupId: {day: spots_sequence}}
  const [refetch, setRefetch] = useState(0);

  // useEffect(() => {                             //  sequence [{id, title, startTime, endTime, numLikes, comments, imgUrl},]
  //   const fetchSpots = async () => {
  //     if (currGroupId===undefined || currDay===undefined) return;     // Do nothing if groupId or day is not set
  //     try {
  //       const res = await getSpots(Token, currGroupId, currDay);
  //       if (res === undefined) return;
        
  //       setAllSpots((prevState) => {
  //         const updatedState = {
  //           ...prevState,
  //           [currGroupId]: {
  //             ...(prevState[currGroupId] || {}),
  //             [currDay]: res,
  //           },
  //         };
  //         return updatedState;
  //       });
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   };
  //   fetchSpots();
  // }, [currGroupId, currDay, refetch]);   //refetch when groupId or day changes

  return (
    <DataContext.Provider value={{allGroups, setAllGroups, allSpots, setAllSpots, currGroupId, currDay, setCurrGroupId, setCurrDay, Token, setRefetch, refetch}}>
      {children} 
    </DataContext.Provider>
  )
} 