'use client';
import { createContext, useState, useEffect } from 'react';

export const DataContext = createContext();

export const DataProvider = ({children}) => {
  const [data, setData] = useState([]); 

  // TODO: replace this with real data
  const [allGroups, setAllGroups] = useState({
    "1": {
      groupName: '花東3日遊之太魯閣馬拉松跑起來！',
      startDate: '2022-10-10',
      endDate: '2022-10-13',
      userId: [1, 2, 3],
      days: 10,
    },
    "2": {
      groupName: '浪漫 der 巴黎5日遊',
      startDate: '2022-10-10',
      endDate: '2022-10-13',
      userId: [4, 5, 6],
      days: 5,
    },
  });
  
  useEffect(() => {
    const fetchData = async () => {
      // fetch data from an API
    }
    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{data, setData, allGroups}}>
      {children} 
    </DataContext.Provider>
  )
} 