'use client';

import { useState, useEffect } from 'react';
import TabPanel from './tabPanel';
import AllSpots from './allSpots';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

function tabProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function DayPanel({days}) {
  const [numDays, setNumDays] = useState([]);  
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (days !== undefined) {
      const tempDays = Array.from({length: days}, (_, i) => i);
      setNumDays(tempDays);
    }
  }, [days]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Box sx={{ bgcolor: 'background.paper' }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="full width tabs example"
          sx={{ color: "text.primary"}}
          className="MuiTabScrollButton-root bg-blue-200"
        >
          {numDays?.map((day) => {
            return (
              <Tab label={`Day ${day+1}`} {...tabProps(day)} key={day} sx={{color: "text.primary"}}/>
            );
          })}
        </Tabs>
      </AppBar>
      {numDays?.map((day) => {
        return (
          <TabPanel value={value} index={day} key={day}>
            <AllSpots day={String(day)}/>
          </TabPanel>
        );
      })}
    </Box>
  );
}