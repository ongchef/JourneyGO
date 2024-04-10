'use client';
import "./globals.css";
import { useContext, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {deepOrange, deepPurple, lightBlue, green, cyan} from '@mui/material/colors';

import AvatarGroup from '@mui/material/AvatarGroup';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

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

  const setDividerStyles = {
    marginTop: `3rem !important`,
  };

  const [tabValue, setTabValue] = useState(0);

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
                  <Button variant="contained" size="small" startIcon={<AddIcon />} >
                    新增行程
                  </Button>
            </Box>
              
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="trip tabs" className="">
              <Tab label="All" />
              <Tab label="Ongoing" />
              <Tab label="Finished" />
            </Tabs>

            {/* Mapping over the mock data to create trip cards */}
            {mockData.map((trip) => (
              <Card className="flex justify-start my-10 mr-10" onClick={() => setSelectedCard(trip.id)}>
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

          {selectedCard !== null && (<Grid item xs={12} md={6} className="border-l-2 border-black-500" sx={setDividerStyles}>
            <Box className="m-5 flex items-center">
              <IconButton color="primary" aria-label="get back" onClick={() => setSelectedCard(null)}>
                <ArrowBackIosIcon />
              </IconButton>
              <Typography variant="h4" component="div" className="pl-2 pr-5">
                旅程概覽
              </Typography>
              <Button variant="contained" size="small" >
                查看詳細資訊
              </Button>
              
            </Box>

            <Box className="m-5">
              <Box position="relative" className="w-full h-60 overflow-hidden rounded-xl">
                <CardMedia
                  component="img"
                  image='/images/hualian.jpg'
                  alt="Trip image"
                  className="w-full h-full object-cover rounded-xl"
                />
                <Typography variant="h5" component="div" className="absolute top-1/2 right-0 bg-opacity-50 text-white p-2 transform -translate-y-1/2 whitespace-normal w-2/5 text-right">
                  花東3日遊之太魯閣馬拉松跑起來！
                </Typography>
              </Box>

              <Box className="pt-10">
                <Typography variant="h5" component="div">
                  我的旅伴
                </Typography>
                <Box className="flex items-center mt-2">
                  <AvatarGroup max={5} spacing={-20}>
                    <Avatar sx={{ bgcolor: green[500]}}>H</Avatar>
                    <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>
                    <Avatar sx={{ bgcolor: deepPurple[500] }}>OP</Avatar>
                    <Avatar sx={{ bgcolor: green[700] }}>N</Avatar>
                    <Avatar sx={{ bgcolor: lightBlue[700] }}>OP</Avatar>
                    <Avatar sx={{ bgcolor: lightBlue[700] }}>OP</Avatar>
                    <Avatar sx={{ bgcolor: lightBlue[700] }}>OP</Avatar>
                  </AvatarGroup>
                </Box>
              </Box>

              <Box className="pt-10">
                <Typography variant="h5" component="div">
                  旅程時間
                </Typography>
                <Box className="flex items-center mt-2">
                  <Typography variant="h4" component="div" sx={{ color: cyan[700] }}>
                    3/13 - 3/15
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>)}
        </Grid>
      </Box>
  </main>
  );
}