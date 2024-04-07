'use client';
import { createContext, useState, useEffect } from 'react';

export const DataContext = createContext();

export const DataProvider = ({children}) => {
  const [data, setData] = useState([]); 
  
  useEffect(() => {
    const fetchData = async () => {
      // fetch data from an API
    }
    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{data, setData}}>
      {children} 
    </DataContext.Provider>
  )
} 