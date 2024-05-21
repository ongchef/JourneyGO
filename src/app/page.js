'use client';
import "./globals.css";
import { getTripGroups } from '@/services/getTripGroups';
import { DataContext } from '@/app/components/dataContext';
import { getToken } from '@/utils/getToken';
import SelectedContent from './components/SelectedContent';
import TripList from './components/TripList';
import NewJourneyDialog from './components/newJourney';
import CopyJourneyDialog from "./components/CopyJourneyDialog";

import { useContext, useState, useEffect } from 'react';
import { CircularProgress, Box, Typography, Tabs, Tab, Grid, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import InputIcon from '@mui/icons-material/Input';

function LoadingIndicator() {
  return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', }}>
          <CircularProgress size={50} />
      </Box>
  );
}

export default function Home() {

  const { currentLang, setCurrentLang } = useContext(DataContext);

  const [tabValue, setTabValue] = useState('All');
  const [newJourneyOpenDialog, setNewJourneyOpenDialog] = useState(false); 
  const [copyJourneyOpenDialog, setCopyJourneyOpenDialog] = useState(false);
  const [tripGroups, setTripGroups] = useState([]); // [{group_id, group_name, start_date, end_date, status}
  const [tripOverview, setTripOverview] = useState(null);
  const [loading, setLoading] = useState(true);
  // for resetting the page
  const [key, setKey] = useState(0); 

  const tabValues = {
    incoming: ['incoming', 'Incoming'],
    finished: ['finished', 'Finished'],
  };
  
  const translate = (key) => {
    const translations = {
      myJourney: {
        zh: '我的旅程',
        en: 'My Journeys'
      },
      newJourney: {
        zh: '新增旅程',
        en: 'New Journey'
      },
      copyJourney: {
        zh: ' 匯入旅程',
        en: 'Import Journey'
      },
      all: {
        zh: '全部',
        en: 'All'
      },
      incoming: {
        zh: '即將來臨',
        en: 'Incoming'
      },
      finished: {
        zh: '已完成',
        en: 'Finished'
      },
    };
    return translations[key][currentLang];
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

  useEffect(() => {
    const Token = getToken();
    fetchAllGroups(Token);
    console.log("render homepage")
    
  }, []);

  async function fetchAllGroups(Token) {
    try {
      const data = await getTripGroups(Token);

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

  
  const handleNewJourneyOpenDialog = () => {
    setNewJourneyOpenDialog(true);
  };
  const handleNewJourneyCloseDialog = () => {
    setNewJourneyOpenDialog(false);
  };
  const handleCopyJourneyOpenDialog = () => {
    setCopyJourneyOpenDialog(true);
  }
  const handleCopyJourneyCloseDialog = () => {
    setCopyJourneyOpenDialog(false);
  }
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const setDividerStyles = {
    marginTop: `3rem !important`,
  };


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
                {translate('myJourney')}
              </Typography>
              <Button variant="contained" size="small" sx={{ mr: 1 }} startIcon={<AddIcon />} onClick={handleNewJourneyOpenDialog}>
                {translate('newJourney')}
              </Button>
              <Button variant="outlined" size="small" sx={{ ml: 1 }} startIcon={<InputIcon />} onClick={handleCopyJourneyOpenDialog}>
                {translate('copyJourney')}
              </Button>
            </Box>
              
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="trip tabs" className="">
              <Tab label={translate('all')} value="All"/>
              <Tab label={translate('incoming')} value={tabValues.incoming}/>
              <Tab label={translate('finished')} value={tabValues.finished}/>
            </Tabs>

            <TripList data={tripGroups} tabValue={tabValue} setTripOverview={setTripOverview}/>
          </Grid>

          <SelectedContent data={tripOverview} setTripOverview={setTripOverview} setDividerStyles={setDividerStyles} LoadingIndicator={LoadingIndicator}/>
        </Grid>
      </Box>

      <NewJourneyDialog open={newJourneyOpenDialog} onClose={handleNewJourneyCloseDialog} />
      <CopyJourneyDialog open={copyJourneyOpenDialog} onClose={handleCopyJourneyCloseDialog} />
    
  </main>
);
}