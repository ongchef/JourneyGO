'use client';

import { useState, useContext } from 'react';
import Typography from '@mui/material/Typography';
import SearchField from './searchField';
import SearchCard from './searchCard';
import Checkbox from '@mui/material/Checkbox';
import { DataContext } from '@/app/components/dataContext';

export default function SearchPanel() {

  const { currentLang } = useContext(DataContext);

  const [checked, setChecked] = useState(false);
  const [searchRes, setSearchRes] = useState([]); // [{title, description, imgUrl, lat, lng, rating}]

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const translate = (key) => {
    const translations = {
      addSpot: {
        zh: "新增景點",
        en: "Add Spots",
      },
      searchNearby: {
        zh: "搜尋鄰近景點",
        en: "Search Nearby",
      }
    };
    return translations[key][currentLang];
  }
  
  return (
    <div className='mx-4 flex flex-col gap-3 lg:overflow-auto lg:h-[calc(70vh_-_3rem)] mt-[1rem]'>
      <div className='flex flex-row justify-between'>
        <Typography variant='h6'>{translate('addSpot')}</Typography>
        <div className='flex items-center'>
          <Checkbox
            checked={checked}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />
          <Typography variant='body'>{translate('searchNearby')}</Typography>
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