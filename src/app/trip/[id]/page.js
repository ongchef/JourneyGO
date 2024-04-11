'use client';

import { useState, useContext } from 'react';
import { DataContext } from "@/app/components/dataContext";
import TripPlan from './components/tripEdit/tripPlan';
import TripSearch from './components/tripEdit/tripSearch';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TabPanel from './components/tripEdit/tabPanel';
import RoomIcon from '@mui/icons-material/Room';
import DescriptionIcon from '@mui/icons-material/Description';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function tabProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Trip({params}) {
  const {allGroups} = useContext(DataContext);
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false); 
  const [email, setEmail] = useState(''); 

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab 
            label={
              <div className='flex flex-row items-center gap-3'>
                <RoomIcon className='scale-125'/>
                <Typography variant='p'>景點規劃</Typography>
              </div>
            } 
            {...tabProps(0)}   
          />
          <Tab 
            label={
              <div className='flex flex-row items-center gap-3'>
                <DescriptionIcon className='scale-125'/>
                <Typography variant='p'>分帳</Typography>
              </div>
            }
            {...tabProps(1)} 
          />
        </Tabs>
      </Box>
      <Box>
        <Typography variant='h4' sx={{mx: 2, my: 2}}>{allGroups[params.id]?.groupName}</Typography>
        <TabPanel value={value} index={0} groupId={params.id}>
          <div className='flex flex-row'>
            <TripPlan groupId={params.id} />
            <TripSearch groupId={params.id} />
          </div>
        </TabPanel>
        <TabPanel value={value} index={1} groupId={params.id}>
          分帳
        </TabPanel>
      </Box>
    </Box>

            


  );
}
