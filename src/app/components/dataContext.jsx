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

  const [allSpots, setAllSpots] = useState({
    "1": [
        [
          {
            id: 1,
            text: '煙波大飯店花蓮館',
            time: '09:00-10:00',
          },
          {
            id: 2,
            text: '炸蛋蔥油餅',
            time: '10:00-10:30',
          },
          {
            id: 3,
            text: '花蓮文化創意產業園區',
            time: '10:30-12:00',
          },
          {
            id: 4,
            text: '島東譯電所',
            time: '12:00-13:00',
          },
          {
            id: 5,
            text: '花本家壽司',
            time: '13:00-14:00',
          },
          {
            id: 6,
            text: '遠東百貨 花蓮店',
            time: '14:00-15:00',
          },
          {
            id: 7,
            text: '米那度海吧餐廳',
            time: '15:00-16:00',
          },
          {
            id: 8,
            text: '東大門夜市',
            time: '16:00-18:00',
          },
          {
            id: 9,
            text: '北濱公園',
            time: '18:00-19:00',
          },
        ],
    ],
  });
  
  useEffect(() => {
    const fetchData = async () => {
      // fetch data from an API
    }
    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{data, setData, allGroups, allSpots}}>
      {children} 
    </DataContext.Provider>
  )
} 