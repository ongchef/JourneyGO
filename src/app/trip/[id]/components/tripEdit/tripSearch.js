'use client';

import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TabPanel from './tabPanel';
import GoogleMap from './googleMap';
import SearchPanel from './searchPanel';
import RecommendPanel from './recommendPanel';

function tabProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function TripSearch() {
  const [value, setValue] = useState(0);

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
                  <Typography variant='p'>地圖</Typography>
                </div>
              } 
              {...tabProps(0)}   
            />
            <Tab 
              sx={{height: '1rem', minHeight: '1rem'}}
              label={
                <div>
                  <Typography variant='p'>搜尋</Typography>
                </div>
              }
              {...tabProps(1)} 
            />
            <Tab 
              sx={{height: '1rem', minHeight: '1rem'}}
              label={
                <div>
                  <Typography variant='p'>推薦</Typography>
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