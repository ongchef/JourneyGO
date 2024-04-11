'use client';

import { useState } from 'react';
import Typography from '@mui/material/Typography';
import SearchField from './searchField';
import SearchCard from './searchCard';
import Checkbox from '@mui/material/Checkbox';

export default function TripSearch() {
  const [checked, setChecked] = useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  
  return (
    <div className='w-[100%] px-5 flex flex-col gap-3 overflow-auto h-[70vh]'>
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
      <SearchField />
      <div className='flex flex-col gap-3 p-3'>
        <SearchCard />
        <SearchCard />
        <SearchCard />
        <SearchCard />
        <SearchCard />
        <SearchCard />
        <SearchCard />
        <SearchCard />
        <SearchCard />
        <SearchCard />
      </div>
    </div>
  );
}