'use client';

import {useState, useContext} from 'react';
import { getSearch } from '@/services/getSearch';
import { getSurrounding } from '@/services/getSurrounding';
import { DataContext } from '@/app/components/dataContext';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { getToken } from '@/utils/getToken';

export default function SearchField({ setSearchRes, checked }) {
  const [searchText, setSearchText] = useState('');
  const { currGroupId, currDay, allSpots, currentLang } = useContext(DataContext);

  const translate = (key) => {
    const translations = {
      search: {
        zh: "搜尋景點",
        en: "Search Spots",
      },
    };
    return translations[key][currentLang];
  };

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
    async function search(Token) {
      try {
        if (checked==true) {
          if (currGroupId === undefined || currDay === undefined) return;
          const last = allSpots?.[currGroupId]?.[currDay].slice(-1)[0]?.['id'];
          if (last) {
            const res = await getSurrounding(Token, searchText, last);
            if (res === undefined) {
              // window.location.reload(true);
              setSearchRes([]);
            }
            setSearchRes(res);
          }
        } else {
          const res = await getSearch(Token, searchText);
          if (res === undefined) {
            // window.location.reload(true);
            setSearchRes([]);
          }
          setSearchRes(res);
        }
      } catch (error) {
        console.log("search", error)
      }
    };
    const Token = getToken();
    search(Token);
  };

  return (
    <div className='w-full'>
      <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}>
        <IconButton sx={{ p: '10px' }} aria-label="menu">
          <MenuIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder={translate('search')}
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