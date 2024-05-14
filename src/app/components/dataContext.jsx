'use client';
import { createContext, useState, useEffect } from 'react';
import { getToken } from '@/utils/getToken';

export const DataContext = createContext();
export const DataProvider = ({children}) => {
  const [currGroupId, setCurrGroupId] = useState();
  const [currDay, setCurrDay] = useState();
  const [Token, setToken] = useState(undefined);
  const [isLoad, setIsLoad] = useState(false);


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


  // store all groups
  const [allGroups, setAllGroups] = useState({});

  // store all spots given groupId and day
  const [allSpots, setAllSpots] = useState({}); // {groupId: {day: spots_sequence}}
  const [refetch, setRefetch] = useState(0);

  // store all transportations
  const [allTrans, setAllTrans] = useState({}); // {groupId: {day: [OPTION, [TIME_SEQUENCES]]}}

  // store new spot data
  const [newSpot, setNewSpot] = useState();

  // store current language
  const [currentLang, setCurrentLang] = useState('zh');

  return (
    <DataContext.Provider value={{
        allGroups, 
        setAllGroups, 
        allSpots, 
        setAllSpots, 
        currGroupId, 
        currDay, 
        setCurrGroupId, 
        setCurrDay, 
        Token, 
        setRefetch, 
        refetch, 
        isLoad, 
        setIsLoad, 
        allTrans, 
        setAllTrans, 
        newSpot, 
        setNewSpot,
        currentLang,
        setCurrentLang
      }}>
      {children} 
    </DataContext.Provider>
  )
} 