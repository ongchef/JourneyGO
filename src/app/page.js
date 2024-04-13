'use client';
import "./globals.css";
import SelectedContent from './components/SelectedContent';
import TripList from './components/TripList';

import { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

import NewJourneyDialog from './components/newJourney';


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
  },
  {
    id: 2,
    imageUrl: '/images/paris.jpeg',
    name: '浪漫 der 巴黎5日遊',
    place: 'Paris',
    tripStatus: 'Ongoing',
    creator: 'Dss',
    description: 'Experience the romantic city of Paris.',
    duration: '5 days'
  },
  {
    id: 3,
    imageUrl: '/images/hualian.jpg',
    name: '花東3日遊之太魯閣馬拉松跑起來！',
    place: 'Taiwan',
    tripStatus: 'Ongoing',
    creator: 'Abb',
    description: 'An amazing journey through Taiwan!',
    duration: '3 days'
  },
  {
    id: 4,
    imageUrl: '/images/paris.jpeg',
    name: '巴黎10日遊',
    place: 'Paris',
    tripStatus: 'Finished',
    creator: 'Dss',
    description: 'Experience the romantic city of Paris.',
    duration: '5 days'
  },
  {
    id: 5,
    imageUrl: '/images/hualian.jpg',
    name: '花東5日遊',
    place: 'Taiwan',
    tripStatus: 'Finished',
    creator: 'Abb',
    description: 'An amazing journey through Taiwan!',
    duration: '3 days'
  },
];

export default function Home() {
  const [openDialog, setOpenDialog] = useState(false); 
  
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const setDividerStyles = {
    marginTop: `3rem !important`,
  };

  const [tabValue, setTabValue] = useState('All');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const [selectedCard, setSelectedCard] = useState(null);

  return (
    <main className="m-3">
      <Box className="m-3 flex">
        <Grid container spacing={2}>
          <Grid item xs={12} md={selectedCard !== null ? 6 : 12} sx={setDividerStyles}>

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
              <Tab label="Ongoing" value="Ongoing"/>
              <Tab label="Finished" value="Finished"/>
            </Tabs>

            <TripList mockData={mockData} tabValue={tabValue} setSelectedCard={setSelectedCard}/>
          </Grid>

          <SelectedContent mockData={mockData} selectedCard={selectedCard} setSelectedCard={setSelectedCard} setDividerStyles={setDividerStyles} />
        </Grid>
      </Box>

      <NewJourneyDialog open={openDialog} onClose={handleCloseDialog} />
    
  </main>
);

}