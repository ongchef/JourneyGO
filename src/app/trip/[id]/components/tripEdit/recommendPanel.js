'use client';

import { useState, useRef, useEffect, useContext } from 'react';
import { getRecommend } from "@/services/getRecommend";
import { getToken } from '@/utils/getToken';
import { DataContext } from '@/app/components/dataContext';
import RecommendCard from './recommendCard';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';


export default function RecommendPanel() {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("restaurant");
  const [recommends, setRecommends] = useState([]);
  const [isLast, setIsLast] = useState(false);
  const { allSpots, currGroupId, currDay, currentLang } = useContext(DataContext);
  const reference = useRef(null);

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
        zh: "戶外",
        en: "Active",
      },
      nightlife: {
        zh: "夜生活",
        en: "Nightlife",
      },
    };
    return translations?.[key]?.[currentLang];
  }

  const fetchData = async (Token, lat, lng) => {
    const data = await getRecommend(Token, lat, lng, category, page);
    const res = data?.res;
    const status = data?.status;
    if (status === 200) {
      if (res?.length === 0) {
        setIsLast(true);
      } else {
        setRecommends((prevRecommends) => [...prevRecommends, ...res]);
      }
    }
  };

  const handleClick = (buttonValue) => {
    setRecommends([]);
    setIsLast(false);
    setPage(1);
    setCategory(buttonValue); 
  };

   // infinite scroll
   useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isLast) {
        setPage((prevPage) => prevPage + 1);
      }
    }, { threshold: 1 });
    if (reference.current && !isLast) {
      observer.observe(reference.current);
    }
    return () => {
      if (reference.current) {
        observer.unobserve(reference.current);
      }
    }
  }, [reference, isLast]);

  useEffect(() => {
    if (allSpots?.[currGroupId]?.[currDay] !== undefined) {
      const Token = getToken();
      // extract last spot's lat and lng
      const lat = allSpots?.[currGroupId]?.[currDay].slice(-1)[0]?.['lat'];
      const lng = allSpots?.[currGroupId]?.[currDay].slice(-1)[0]?.['lng'];
      fetchData(Token, lat, lng);
    }
  }, [page, category, currGroupId, currDay]);

  useEffect(() => {
    setPage(1);
    setRecommends([]);
  }, [currGroupId, currDay]);

  const categories = [
    ["restaurants", translate("restaurants")],
    ["coffee", translate("coffee")],
    ["hotels", translate("hotels")],
    ["arts", translate("arts")],
    ["shopping", translate("shopping")],
    ["active", translate("active")],
    ["nightlife", translate("nightlife")],
  ];

  return (
    <div className='mx-4 flex flex-col gap-3 lg:overflow-y-scroll lg:h-[calc(75vh_-_3rem)] my-[1rem] p-[1rem]'>
      <Box sx={{flexWrap: 'wrap', display: {lg: 'flex', xs: 'grid'}, gridTemplateColumns: 'repeat(4,1fr)', gap: '1rem'}}>
        {categories?.map((category, index) => (
          <Button key={index} variant='outlined' onClick={() => handleClick(category[0])}  sx={{maxWidth: {lg: '7rem', xs: '6rem'}, textTransform: 'none'}}>
            <Typography sx={{fontSize: {lg: 14, xs: 12}}}>{category[1]}</Typography>
          </Button>
        ))}
      </Box>
      <div className='grid grid-cols-2 gap-3 w-full overflow-none'>
        {recommends?.map((recommend, index) => (
          <RecommendCard key={index} recommend={recommend} />
        ))}
      </div>
      <div ref={reference} className="w-full text-center">
        {!isLast && <CircularProgress />}
      </div> 
    </div>
  );
}