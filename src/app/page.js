'use client';
import "./globals.css";
import { getTripGroups } from '@/services/getTripGroups';
import { DataContext } from '@/app/components/dataContext';
import SelectedContent from './components/SelectedContent';
import TripList from './components/TripList';

import { useContext, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

import NewJourneyDialog from './components/newJourney';
import getInvitation from '@/services/getInvitation';



// Mock data array
const mockData = [
  {
    id: 1,
    imageUrl: '/images/hualian.jpg',
    name: '花東3日遊之太魯閣馬拉松跑起來！',
    place: 'Taiwan',
    tripStatus: 'Ongoing',
    creator: 'Abb',
    description: 'An amazing journey through Taiwan!',
    duration: '3 days'
  }
];

export default function Home() {

  const [tabValue, setTabValue] = useState('All');
  const [openDialog, setOpenDialog] = useState(false); 
  const [tripGroups, setTripGroups] = useState([]); // [{group_id, group_name, start_date, end_date, status}
  const [tripOverview, setTripOverview] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const setDividerStyles = {
    marginTop: `3rem !important`,
  };

  const { Token } = useContext(DataContext);
  // console.log('Token from DataContext:' + Token);

  useEffect(() => {
    fetchAllGroups();
  }, [Token, tripOverview]);

  async function fetchAllGroups() {
    try {
      const data = await getTripGroups(Token);
      // console.log('Trip groups:', data);
      // calculate the duration of each trip group

      data.forEach(trip => {
        const startDate = new Date(trip.start_date);
        const endDate = new Date(trip.end_date);
        const duration = (endDate - startDate) / (1000 * 60 * 60 * 24) + 1;
        trip.duration = duration;
      });
      setTripGroups(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching all groups:', error);
    }
  }
  // console.log("user's trip groups:");
  // console.log(tripGroups);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="m-3">
      <Box className="m-3 flex">
        <Grid container spacing={2}>
          <Grid item xs={12} md={tripOverview !== null ? 6 : 12} sx={setDividerStyles}>

            <Box className="flex items-center p-2 m-3">
                <Typography variant="h4" component="div" className="pr-5">
                  我的旅程
                </Typography>
                <Button variant="contained" size="small" startIcon={<AddIcon />} onClick={handleOpenDialog}>
                  新增行程
                </Button>
            </Box>
              
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="trip tabs" className="">
              <Tab label="All" value="All"/>
              <Tab label="Incoming" value="incoming"/>
              <Tab label="Finished" value="finished"/>
            </Tabs>

            <TripList data={tripGroups} tabValue={tabValue} setTripOverview={setTripOverview}/>
          </Grid>

          <SelectedContent data={tripOverview} setTripOverview={setTripOverview} setDividerStyles={setDividerStyles} />
        </Grid>
      </Box>

      <NewJourneyDialog open={openDialog} onClose={handleCloseDialog} token={Token} />
    
  </main>
);
}