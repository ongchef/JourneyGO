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

import NewMemberDialog from '/src/app/components/newMember';
// import { getNewMember } from './getNewMember';


function tabProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Trip({params}) {
  const {allGroups} = useContext(DataContext);
  const [value, setValue] = useState(0);
  // const [openDialog, setOpenDialog] = useState(false);
  


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  // const handleOpenDialog = () => {
  //   setOpenDialog(true);
  // };

  // const handleCloseDialog = () => {
  //   setOpenDialog(false);
  // };

  // const handleSaveNewMember = (email) => {
  //   console.log("Saving new member with email :", email);
  // }


  return (
    <main>
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
          <div className='flex lg:flex-row flex-col lg:gap-0 gap-5'>
            <TripPlan params={params} groupId={params.id}/>
            {/* <TripPlan params={params} groupId={params.id} openDialog={openDialog} setOpenDialog={setOpenDialog}/> */}
            <TripSearch groupId={params.id} />
          </div>
        </TabPanel>
        <TabPanel value={value} index={1} groupId={params.id}>
          分帳
        </TabPanel>
      </Box>
    </Box>
    
    {/* <NewMemberDialog open={openDialog} onClose={handleCloseDialog} onSave={handleSaveNewMember} /> */}
    </main>


  );
}
