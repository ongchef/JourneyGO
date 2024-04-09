'use client';

import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabPanel from './components/tabPanel';
import RoomIcon from '@mui/icons-material/Room';
import DescriptionIcon from '@mui/icons-material/Description';

function tabProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Trip() {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab 
            label={
              <div className='flex flex-row items-center gap-3'>
                <RoomIcon className='scale-125'/>
                <p className='text-md'>景點規劃</p>
              </div>
            } 
            {...tabProps(0)}   
          />
          <Tab 
            label={
              <div className='flex flex-row items-center gap-3'>
                <DescriptionIcon className='scale-125'/>
                <p className='text-md'>分帳</p>
              </div>
            }
            {...tabProps(1)} 
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0} groupId={0}>
        <p>景點規劃</p>
      </TabPanel>
      <TabPanel value={value} index={1} groupId={0}>
        <p>分帳</p>
      </TabPanel>
    </Box>
  );
}
