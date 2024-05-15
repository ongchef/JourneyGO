'use client';

import { useState, useRef, useEffect, useContext } from 'react';
import { getRecommend } from "@/services/getRecommend";
import { getToken } from '@/utils/getToken';
import { DataContext } from '@/app/components/dataContext';
import RecommendCard from './recommendCard';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


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
      nightlife: {
        zh: "夜生活",
        en: "Nightlife",
      },
      dessert: {
        zh: "甜點",
        en: "Dessert",
      },
    };
    return translations?.[key]?.[currentLang];
  }

  const fetchData = async (Token, lat, lng) => {
    setRecommends([]);
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
    ["dessert", translate("dessert")],
    ["coffee", translate("coffee")],
    ["hotels", translate("hotels")],
    ["arts", translate("arts")],
    ["shopping", translate("shopping")],
    ["active", translate("active")],
    ["nightlife", translate("nightlife")],
  ];

  return (
    <div className='mx-4 flex flex-col gap-3 lg:overflow-y-scroll lg:h-[calc(70vh_-_3rem)] my-[1rem] p-[1rem]'>
      <Box sx={{flexWrap: 'wrap', display: 'flex', gap: '1rem'}}>
        {categories?.map((category, index) => (
          <Button key={index} variant='outlined' fullWidth onClick={() => handleClick(category[0])}  sx={{maxWidth: {lg: '7rem', xs: '6rem'}}}>
            <Typography sx={{fontSize: {lg: 14, xs: 12}}}>{category[1]}</Typography>
          </Button>
        ))}
      </Box>
      <div className='grid grid-cols-2 gap-3 w-full overflow-none'>
        {recommends?.map((recommend, index) => (
          <RecommendCard key={index} recommend={recommend} />
        ))}
      </div>
    </div>
  );
}