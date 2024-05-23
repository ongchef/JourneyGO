'use client';

import { useContext, useEffect, useState } from 'react';
import { DataContext } from '@/app/components/dataContext';
import { postSpots } from '@/services/postSpots';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import Typography from '@mui/material/Typography';
import StarIcon from '@mui/icons-material/Star';
import Button from '@mui/material/Button';
import { getToken } from '@/utils/getToken';

export default function SearchCard({title, location, rating, lng, lat, photo}) {
  const { allSpots, currGroupId, currDay, setRefetch, setNewSpot, currentLang } = useContext(DataContext);
  const router = useRouter();
  const pathname = usePathname();

  const translate = (key) => {
    const translations = {
        add: {
            zh: "新增",
            en: "Add",
        },
    };
    return translations[key][currentLang];
};

  const handleClick = () => {
    async function post(Token) {
      let spotIds;
      if (allSpots?.[currGroupId]?.[currDay]?.length) {
        spotIds = allSpots?.[currGroupId]?.[currDay]?.length;
      } else {
        spotIds = 0;
      }
      const data = {
        spotName: title,
        description: "",
        location: location,
        lon: lng,
        lat: lat,
        sequence: spotIds, 
      }
      try {
        const res = await postSpots(Token, currGroupId, currDay, data);
        // console.log("post data", res);
        const spotData = res?.formattedData;
        const status = res?.status;
        if (status === 201 || status === 200) {
          setNewSpot([...(allSpots?.[currGroupId]?.[currDay] ?? []), spotData]);
          setRefetch((prev) => prev + 1);
        } else {
          router.push(pathname, undefined, { scroll: false });
        }
      } catch (error) {
        console.log("post", error)
      }
    }
    const Token = getToken();
    post(Token);
  };

  return (
    <div className='flex flex-row'>
      <Image src={photo} alt='place_photo' width={100} height={100} className='object-cover aspect-square hidden lg:block'/>
      <div className='flex lg:flex-row shadow-lg w-full justify-between'>
        <div className='flex flex-col p-3'>
          <Typography sx={{fontSize: 18, fontWeight: "bold"}}>{title}</Typography>
          <Typography variant='subtitile'>{location}</Typography>
        </div>
        <div className='p-2 h-full flex items-center gap-2'>
          <div className='flex items-center'>
            <Typography variant='body2'>{rating}/5</Typography>
            <StarIcon />
          </div>
          <Button variant='contained' onClick={handleClick}>{translate('add')}</Button>
        </div>
      </div>
    </div>
  );
}