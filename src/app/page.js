'use client';
import "./globals.css";
import { useContext, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Paper from '@mui/material/Paper';

import AvatarGroup from '@mui/material/AvatarGroup';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonIcon from '@mui/icons-material/Person';
import ScheduleIcon from '@mui/icons-material/Schedule';
import AddIcon from '@mui/icons-material/Add';

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
    name: '浪漫 der 巴黎5日遊',
    place: 'Paris',
    tripStatus: 'Ongoing',
    creator: 'Dss',
    description: 'Experience the romantic city of Paris.',
    duration: '5 days'
  },
  {
    id: 5,
    imageUrl: '/images/hualian.jpg',
    name: '花東3日遊之太魯閣馬拉松跑起來！',
    place: 'Taiwan',
    tripStatus: 'Ongoing',
    creator: 'Abb',
    description: 'An amazing journey through Taiwan!',
    duration: '3 days'
  },
];

export default function Home() {
  const theme = useTheme();
  
  // Determine the square size based on theme or fixed value
  const squareSize = theme.spacing(20); 
  
  const mediaStyles = {
    width: squareSize,
    height: squareSize,
    padding: theme.spacing(2),
    backgroundSize: 'cover',
  };

  // const cardContainerStyles = {
  //   display: 'flex',
  //   flexDirection: 'column',
  //   height: '100%',
  // };

  const cardContentStyles = {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    paddingBottom: `${theme.spacing(2)} !important`,
  };

  const cardActionsStyles = {
    paddingTop: theme.spacing(1),
    paddingBottom: '0 !important',
    paddingLeft: '0 !important', 
    marginLeft: `${theme.spacing(-1)} !important`,
    marginTop: 'auto', // This will push the CardActions to the bottom
  };


  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <main>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            JourneyGo
          </Typography>
          {/* Add menu icons here */}
        </Toolbar>
      </AppBar>
      <Box className="flex m-2">
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>

            <Paper elevation={0} className="p-2 m-3 flex justify-between max-w-[70%]">
              <Typography variant="h4" component="div" className="flex-grow">
                我的旅程
              </Typography>
              <div className="">
                <button startIcon={<AddIcon />} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  新的行程
                </button>
              </div>
            </Paper>
            
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="trip tabs" className="max-w-[70%]">
              <Tab label="All" />
              <Tab label="Ongoing" />
              <Tab label="Finished" />
            </Tabs>

            {/* Mapping over the mock data to create trip cards */}
            {mockData.map((trip) => (
              <Card className="flex justify-start max-w-[70%] m-2 mb-5">
                <div className="flex-grow flex">
                  <CardMedia
                    component="img"
                    sx={mediaStyles}
                    image={trip.imageUrl}
                    alt={trip.name}
                  />
                  <div className="flex flex-col h-full">
                    <CardContent sx={cardContentStyles}>
                      <Stack direction="row" spacing={2}>
                        <Chip label={trip.place} size="small" />
                        <Chip label={trip.tripStatus} size="small" color="primary" />
                      </Stack>
                      <div className="pt-1">
                        <Typography variant="h6" component="div">
                          {trip.name}
                        </Typography>
                      </div>
                      <CardActions sx={cardActionsStyles} disableSpacing>
                        <IconButton aria-label="creator" size="small">
                          <PersonIcon />
                          <span className="ml-1 text-sm">{trip.creator}</span>
                        </IconButton>
                        <IconButton aria-label="duration" size="small">
                          <ScheduleIcon />
                          <span className="ml-1 text-sm">{trip.duration}</span>
                        </IconButton>
                      </CardActions>
                    </CardContent>
                  </div>
                </div>
                <IconButton aria-label="settings" className="self-start p-2">
                  <MoreVertIcon />
                </IconButton>
              </Card>            
            ))}
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ padding: 2, margin: 2 }}>
              {/* Featured destination and details */}
              <AvatarGroup max={4}>
                {/* Avatar icons here */}
              </AvatarGroup>
              {/* Date range for event or trip */}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </main>
  );
}