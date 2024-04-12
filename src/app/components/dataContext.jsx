'use client';
import { createContext, useState, useEffect } from 'react';
import { getSpots } from '@/services/getSpots';
import { getToken } from '@/utils/getToken';
import { getUserId } from '@/utils/getToken';

export const DataContext = createContext();
export const DataProvider = ({children}) => {
  const [currGroupId, setCurrGroupId] = useState();
  const [currDay, setCurrDay] = useState();
  const [Token, setToken] = useState();
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
  const [allGroups, setAllGroups] = useState({}); // {groupId: {groupId, groupName, startDate, endDate}}


  // store all spots given groupId and day
  const [allSpots, setAllSpots] = useState({}); // {groupId: {day: [spots_sequence]}}
  useEffect(() => {
    const fetchSpots = async () => {
      if (!currGroupId || !currDay) return;     // Do nothing if groupId or day is not set
      try {
        const res = await getSpots(Token, currGroupId, currDay);
        setAllSpots(prevState => ({
          ...prevState,
          [currGroupId]: {
            ...prevState[currGroupId] || {},  // Ensure nested object exists
            [currDay]: res,
          },
        }));
      } catch (e) {
        console.error(e);
      }
    };
    fetchSpots();
  }, [currGroupId, currDay]);   //refetch when groupId or day changes


  return (
    <DataContext.Provider value={{allGroups, allSpots, setCurrGroupId, setCurrDay}}>
      {children} 
    </DataContext.Provider>
  )
} 