'use client';
import "./globals.css";
import { getTripGroups } from '@/services/getTripGroups';
import { DataContext } from '@/app/components/dataContext';
import SelectedContent from './components/SelectedContent';
import TripList from './components/TripList';
import NewJourneyDialog from './components/newJourney';

import { useContext, useState, useEffect } from 'react';
import { CircularProgress, Box, Typography, Tabs, Tab, Grid, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';


function LoadingIndicator() {
  return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', }}>
          <CircularProgress size={50} />
      </Box>
  );
}

export default function Home() {

  const [tabValue, setTabValue] = useState('All');
  const [openDialog, setOpenDialog] = useState(false); 
  const [tripGroups, setTripGroups] = useState([]); // [{group_id, group_name, start_date, end_date, status}
  const [tripOverview, setTripOverview] = useState(null);
  const [loading, setLoading] = useState(true);
  // for resetting the page
  const [key, setKey] = useState(0); 

  const tabValues = {
    incoming: ['incoming', 'Incoming'],
    finished: ['finished', 'Finished'],
  };
  

  useEffect(() => {
    return () => {
      setKey(prevKey => prevKey + 1);
    };
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      window.location.reload();
    };
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

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
  }, [Token, tripOverview, key]);

  async function fetchAllGroups() {
    try {
      const data = await getTripGroups(Token);
      // console.log('Trip groups:', data);
      // calculate the duration of each trip group
      // console.log("data after getTripGroups:");
      // console.log(data);

      if (Array.isArray(data)) {
        data.forEach(trip => {
          const startDate = new Date(trip.start_date);
          const endDate = new Date(trip.end_date);
          const duration = (endDate - startDate) / (1000 * 60 * 60 * 24) + 1;
          trip.duration = duration;
        });
      }
      setTripGroups(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching all groups:', error);
    }
  }
  // console.log("user's trip groups:");
  // console.log(tripGroups);

  if (loading) {
    return <LoadingIndicator />;
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
              <Tab label="Incoming" value={tabValues.incoming}/>
              <Tab label="Finished" value={tabValues.finished}/>
            </Tabs>

            <TripList data={tripGroups} tabValue={tabValue} setTripOverview={setTripOverview}/>
          </Grid>

          <SelectedContent data={tripOverview} setTripOverview={setTripOverview} setDividerStyles={setDividerStyles} LoadingIndicator={LoadingIndicator}/>
        </Grid>
      </Box>

      <NewJourneyDialog open={openDialog} onClose={handleCloseDialog} token={Token} />
    
  </main>
);
}