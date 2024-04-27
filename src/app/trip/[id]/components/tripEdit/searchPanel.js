'use client';

import { useState } from 'react';
import Typography from '@mui/material/Typography';
import SearchField from './searchField';
import SearchCard from './searchCard';
import Checkbox from '@mui/material/Checkbox';

export default function SearchPanel() {
  const [checked, setChecked] = useState(true);
  const [searchRes, setSearchRes] = useState([]); // [{title, description, imgUrl, lat, lng, rating}]

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  
  return (
    <div className='mx-4 flex flex-col gap-3 lg:overflow-auto lg:h-[calc(70vh_-_3rem)] mt-[1rem]'>
      <div className='flex flex-row justify-between'>
        <Typography variant='h6'>新增景點</Typography>
        <div className='flex items-center'>
          <Checkbox
            checked={checked}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />
          <Typography variant='body'>搜尋鄰近景點</Typography>
        </div>
      </div>
      <SearchField setSearchRes={setSearchRes} checked={checked} />
      <div className='flex flex-col gap-3 p-3'>
        {
          searchRes?.map((spot, index) => (
            <SearchCard 
              key={index} 
              title={spot?.title} 
              location={spot?.location}
              rating={spot?.rating} 
              lng={spot?.lng}
              lat={spot?.lat}
              photo={spot?.photo}
            />
          ))
        }
      </div>
    </div>
  );
}