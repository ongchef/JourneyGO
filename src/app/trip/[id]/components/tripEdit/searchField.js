'use client';

import {useState, useContext, useEffect} from 'react';
import { getSearch } from '@/services/getSearch';
import { getSurrounding } from '@/services/getSurrounding';
import { DataContext } from '@/app/components/dataContext';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchField({ setSearchRes, checked }) {
  const [searchText, setSearchText] = useState('');
  const { Token, currGroupId, currDay, allSpots } = useContext(DataContext);
  const [lastSpot, setLastSpot] = useState(); //id

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleClick();
    }
  }

  const handleClick = () => {
    async function search() {
      try {
        if (checked==true) {
          if (currGroupId === undefined || currDay === undefined) return;
          const last = allSpots?.[currGroupId]?.[currDay].slice(-1)[0]?.['id'];
          if (last) {
            const res = await getSurrounding(Token, searchText, last);
            setSearchRes(res);
          }
        } else {
          const res = await getSearch(Token, searchText);
          setSearchRes(res);
        }
      } catch (error) {
        console.log("search", error)
      }
    };
    search();
  };

  return (
    <div className='w-full'>
      <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}>
        <IconButton sx={{ p: '10px' }} aria-label="menu">
          <MenuIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="搜尋景點"
          inputProps={{ 'aria-label': 'search google maps' }}
          value={searchText}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleClick}>
          <SearchIcon />
        </IconButton>
      </Paper>
    </div>
  );
}