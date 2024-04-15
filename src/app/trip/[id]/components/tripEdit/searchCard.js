'use client';

import { useContext } from 'react';
import { DataContext } from '@/app/components/dataContext';
import { postSpots } from '@/services/postSpots';
import Image from 'next/image';
import Typography from '@mui/material/Typography';
import StarIcon from '@mui/icons-material/Star';
import Button from '@mui/material/Button';

// const imageLoader = ({ src, width, quality }) => {
//   return `https://random.splash.com/${src}?w=${width}&q=${quality || 75}`
// }

export default function SearchCard({title, location, rating, lng, lat}) {
  const { allSpots, currGroupId, currDay, Token, refetch } = useContext(DataContext);

  const handleClick = () => {
    const spots = allSpots[currGroupId][currDay];
    const spotIds = spots?.map(spot => spot.id);
    async function post() {
      const data = {
        spotName: title,
        description: "",
        location: location,
        lon: lng,
        lan: lat,
      }
      try {
        const status = await postSpots(Token, currGroupId, currDay, data);
        if (status === 201 || status === 200) {
          refetch();
        }
      } catch (error) {
        console.log("post", error)
      }
    }
    post();
  };

  return (
    <div className='flex flex-row'>
      <Image src='/images/hualian.jpg' alt='random' width={100} height={100} />
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