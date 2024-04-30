'use client';

import { useContext, useEffect, useState } from 'react';
import { DataContext } from '@/app/components/dataContext';
import { postSpots } from '@/services/postSpots';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import Typography from '@mui/material/Typography';
import StarIcon from '@mui/icons-material/Star';
import Button from '@mui/material/Button';

export default function SearchCard({title, location, rating, lng, lat, photo}) {
  const { allSpots, currGroupId, currDay, Token, setRefetch } = useContext(DataContext);
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    async function post() {
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
        const status = await postSpots(Token, currGroupId, currDay, data);
        if (status === 201 || status === 200) {
          setRefetch((prev) => prev + 1);
        } else {
          router.push(pathname, undefined, { scroll: false });
        }
      } catch (error) {
        console.log("post", error)
      }
    }
    post();
  };

  return (
    <div className='flex flex-row'>
      <Image src={photo} alt='place_photo' width={100} height={100} className='object-cover aspect-square'/>
      <div className='flex flex-row shadow-lg w-full justify-between'>
        <div className='flex flex-col p-3'>
          <Typography variant='h6'>{title}</Typography>
          <Typography variant='subtitile'>{location}</Typography>
        </div>
        <div className='p-1 h-full flex items-center gap-2'>
          <div className='flex items-center'>
            <Typography variant='body2'>{rating}/5</Typography>
            <StarIcon />
          </div>
          <Button variant='contained' onClick={handleClick}>新增</Button>
        </div>
      </div>
    </div>
  );
}