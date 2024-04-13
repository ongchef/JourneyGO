'use client';
import "../globals.css";
import React from 'react';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import ScheduleIcon from '@mui/icons-material/Schedule';

function TripList({ mockData, tabValue, setSelectedCard }) {

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

    return (
    mockData.filter(trip => tabValue === 'All' || trip.tripStatus === tabValue).map((trip) => (
        <Card className="flex justify-start my-10 mr-10 hover:bg-gray-200" onClick={() => setSelectedCard(trip.id)}>
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
                            {/* <IconButton aria-label="creator" size="small">
                                <PersonIcon />
                                <span className="ml-1 text-sm">{trip.creator}</span>
                            </IconButton> */}
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
    ))
    );
}

export default TripList;