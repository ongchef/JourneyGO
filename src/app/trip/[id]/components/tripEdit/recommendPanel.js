'use client';

import { useState, useRef, useEffect, useContext } from 'react';
import { getRecommend } from "@/services/getRecommend";
import { getToken } from '@/utils/getToken';
import { DataContext } from '@/app/components/dataContext';
import RecommendCard from './recommendCard';
import Button from '@mui/material/Button';


export default function RecommendPanel() {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("restaurant");
  const [recommends, setRecommends] = useState([]);
  const { allSpots, currGroupId, currDay, currentLang } = useContext(DataContext);

  const translate = (key) => {
    const translations = {
      restaurants: {
        zh: "餐廳",
        en: "Restaurants",
      },
      hotels: {
        zh: "旅館",
        en: "Hotels",
      },
      arts: {
        zh: "藝文",
        en: "Arts",
      },
      shopping: {
        zh: "購物",
        en: "Shopping",
      },
      coffee: {
        zh: "咖啡店",
        en: "Coffee",
      },
      active: {
        zh: "戶外活動",
        en: "Active",
      },
    };
    return translations[key][currentLang];
  }

  const fetchData = async (Token, lat, lng) => {
    const {res, status} = await getRecommend(Token, lat, lng, category, page);
    setRecommends(res);
  };

  useEffect(() => {
    if (allSpots?.[currGroupId]?.[currDay] !== undefined) {
      const Token = getToken();

      // extract last spot's lat and lng
      const lat = allSpots?.[currGroupId]?.[currDay].slice(-1)[0]?.['lat'];
      const lng = allSpots?.[currGroupId]?.[currDay].slice(-1)[0]?.['lng'];
      fetchData(Token, lat, lng);
    }
  }, [page, category, currGroupId, currDay]);

  const handleClick = (buttonValue) => {
    setCategory(buttonValue);
  };

  const categories = [
    ["restaurants", translate("restaurants")],
    ["hotels", translate("hotels")],
    ["arts", translate("arts")],
    ["shopping", translate("shopping")],
    ["coffee", translate("coffee")],
    ["active", translate("active")],
  ];

  return (
    <div className='mx-4 flex flex-col gap-3 lg:overflow-y-scroll lg:h-[calc(70vh_-_3rem)] my-[1rem] p-[1rem]'>
      <div className='flex flex-row gap-3 text-nowrap overflow-x-scoll w-full'>
        {categories?.map((category, index) => (
          <Button key={index} variant='outlined' onClick={() => handleClick(category[0])}>{category[1]}</Button>
        ))}
      </div>
      <div className='grid grid-cols-2 gap-3 w-full overflow-none'>
        {recommends?.map((recommend, index) => (
          <RecommendCard key={index} recommend={recommend} />
        ))}
      </div>
    </div>
  );
}