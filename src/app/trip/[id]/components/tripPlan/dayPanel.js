'use client';

import { useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabPanel from '../tabPanel';
import AllSpots from './allSpots';

function tabProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function DayPanel(props) {
  const {groupId} = props;
  // TODO: Replace days with actual data
  const days = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  const theme = useTheme();
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
            <AllSpots groupId={groupId} day={day}/>
          </TabPanel>
        );
      })}
    </Box>
  );
}