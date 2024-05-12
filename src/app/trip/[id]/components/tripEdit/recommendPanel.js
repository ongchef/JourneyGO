'use client';

import { Image } from 'next/image';
import { useState, useRef, useEffect, useContext } from 'react';
import { getRecommend } from "@/services/getRecommend";
import { getToken } from '@/utils/getToken';
import { DataContext } from '@/app/components/dataContext';
import RecommendCard from './recommendCard';


export default function RecommendPanel() {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("restaurant");
  const [recommends, setRecommends] = useState([]);
  const { allSpots, currGroupId, currDay } = useContext(DataContext);

  const fetchData = async (Token, lat, lng) => {
    const data = await getRecommend(Token, lat, lng, category, page);
    console.log("RecommendPanel data", data);
    setRecommends(data);
  };

  useEffect(() => {
    if (allSpots?.[currGroupId]?.[currDay] !== undefined) {
      const Token = getToken();

      // extract last spot's lat and lng
      const lat = allSpots?.[currGroupId]?.[currDay].slice(-1)[0]?.['lat'];
      const lng = allSpots?.[currGroupId]?.[currDay].slice(-1)[0]?.['lng'];
      fetchData(Token, lat, lng);
    }
  }, []);

  return (
    <div className='mx-4 flex flex-col gap-3 lg:overflow-auto lg:h-[calc(70vh_-_3rem)] mt-[1rem] p-[1rem]'>
      <div className='grid grid-cols-2 gap-3'>
        {recommends?.map((recommend, index) => (
          <RecommendCard key={index} recommend={recommend} />
        ))}
      </div>
    </div>
  );
}