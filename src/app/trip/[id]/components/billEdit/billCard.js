import React from 'react';

import { Paper, Button, Box, useTheme, Typography, Chip, Stack, Card, CardContent, CardMedia,CardActions, IconButton, AvatarGroup ,Avatar, avatarColors} from '@mui/material';
import { MoreVert as MoreVertIcon, DateRange as DateRangeIcon } from '@mui/icons-material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


function BillCard(){

    const theme = useTheme();
    // Determine the square size based on theme or fixed value
    const squareSize = theme.spacing(20); 
    
    const mediaStyles = {
        width: squareSize,
        height: squareSize,
        padding: theme.spacing(2),
        backgroundSize: 'cover',
    };

    const cardStyles = {
        
        flexDirection: 'column',
        p: 3,
        borderRadius: '10px' ,
        display: 'flex',
        alignItems: 'center',
        width: '500px', 
    }

    const cardContentStyles = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap:'50px',
        paddingBottom: `${theme.spacing(1)} !important`,
        paddingTop: `${theme.spacing(1)} !important`,
    };

    const avatarStyles = {
        width: theme.spacing(4),
        height: theme.spacing(4),
        marginLeft: 'auto',
    };

    const cardActionsStyles = {
        paddingTop: theme.spacing(1),
        paddingBottom: '0 !important',
        paddingLeft: '0 !important', 
        marginLeft: `${theme.spacing(-1)} !important`,
        marginTop: 'auto', // This will push the CardActions to the bottom
    };



    return(
        <div className="flex flex-col h-full items-center">
            {/* <Card className="flex justify-start my-10 mr-10 hover:bg-gray-200"></Card> */}
            <Card sx={cardStyles}>
                <div >
                    <CardContent sx={cardContentStyles}>
                        <div>
                                <AvatarGroup sx={avatarStyles}>
                                    <Avatar alt="User 1" src="/path/to/avatar1.jpg" />
                                    <ArrowForwardIcon fontSize="large" style={{ color: '#2EB3D0' }}/>
                                    <Avatar alt="User 2" src="/path/to/avatar1.jpg" />
                                </AvatarGroup>
                        </div>
                        <div >
                            <Typography variant="h6" component="div" style={{ fontWeight: 'bold' }}>$600</Typography>
                        </div>
                        <div >
                            <Button variant="contained" style={{ backgroundColor: '#EB684E' }}>核銷</Button>
                        </div>
                    </CardContent>
                </div>
                 
                   
                    {/* <CardActions sx={cardActionsStyles} disableSpacing>
                        <IconButton aria-label="" size="small">
                            
                        </IconButton>
                    </CardActions> */}
            </Card>
        </div>
    )
}
export default BillCard;