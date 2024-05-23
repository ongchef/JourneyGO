'use client';

import { useState, useContext } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TabPanel from './tabPanel';
import GoogleMap from './googleMap';
import SearchPanel from './searchPanel';
import RecommendPanel from './recommendPanel';
import { DataContext } from '@/app/components/dataContext';

function tabProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function TripSearch() {
  const [value, setValue] = useState(0);

  const { currentLang } = useContext(DataContext);

  const translate = (key) => {
    const translations = {
      map: {
        zh: "地圖",
        en: "Map",
      },
      search: {
        zh: "搜尋",
        en: "Search",
      },
      recommend: {
        zh: "推薦",
        en: "Recommend",
      },
    };
    return translations[key][currentLang];
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className='lg:w-[50vw] lg:mb-0 mb-[1rem]'>
      <Box sx={{ width: '100%' }}>
        <Box>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" sx={{minHeight: '2rem', marginLeft: '1rem'}}>
            <Tab 
              sx={{height: '1rem', minHeight: '1rem'}}
              label={
                <div>
                  <Typography variant='p' sx={{textTransform: 'none'}}>{translate('map')}</Typography>
                </div>
              } 
              {...tabProps(0)}   
            />
            <Tab 
              sx={{height: '1rem', minHeight: '1rem'}}
              label={
                <div>
                  <Typography variant='p' sx={{textTransform: 'none'}}>{translate('search')}</Typography>
                </div>
              }
              {...tabProps(1)} 
            />
            <Tab 
              sx={{height: '1rem', minHeight: '1rem'}}
              label={
                <div>
                  <Typography variant='p' sx={{textTransform: 'none'}}>{translate('recommend')}</Typography>
                </div>
              }
              {...tabProps(2)} 
            />
          </Tabs>
        </Box>
        <Box>
          <TabPanel value={value} index={0}>
            <GoogleMap />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <SearchPanel />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <RecommendPanel />
          </TabPanel>
        </Box>
      </Box>
    </div>
  );
}