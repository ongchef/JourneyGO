import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';

export default function SearchField() {
  const [searchText, setSearchText] = React.useState('');

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleClick = () => {
    console.log('Searched for:', searchText);
    // Add your logic to send the search text here
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
        />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleClick}>
          <SearchIcon />
        </IconButton>
      </Paper>
    </div>
  );
}