'use client';

import { useState, useContext } from 'react';
import TabPanel from './tabPanel';
import AllSpots from './allSpots';
import { DataContext } from '@/app/components/dataContext';
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

export default function DayPanel(props) {
  const {allGroups, currGroupId} = useContext(DataContext);
  const [days, setDays] = useState(Array.from({length: allGroups?.days}, (_, i) => i));  
  const [value, setValue] = useState(0);

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
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          {days.map((day) => {
            return (
              <Tab label={`Day ${day+1}`} {...tabProps(day)} key={day} sx={{bgcolor: "grey.100", color: "text.primary"}}/>
            );
          })}
        </Tabs>
      </AppBar>
      {days.map((day) => {
        return (
          <TabPanel value={value} index={day} key={day}>
            <AllSpots day={String(day)}/>
          </TabPanel>
        );
      })}
    </Box>
  );
}