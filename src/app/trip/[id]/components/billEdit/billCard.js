import React from 'react';

import { Paper, Button, Box, useTheme, Typography, Chip, Stack, Card, CardContent, CardMedia,CardActions, IconButton, AvatarGroup ,Avatar, avatarColors, Dialog} from '@mui/material';
import { MoreVert as MoreVertIcon, DateRange as DateRangeIcon } from '@mui/icons-material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


function BillCard(){

    const theme = useTheme();
  
    const cardStyles = { 
        flexDirection: 'column',
        p: 2,
        borderRadius: '10px' ,
        display: 'flex',
        alignItems: 'center',
        width: '500px',
         
    }

    const cardContentStyles = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap:'70px',
        
    };

    const avatarStyles = {
        width: theme.spacing(3),
        height: theme.spacing(4),
        marginLeft: 'auto',
    };

    // const cardActionsStyles = {
    //     paddingTop: theme.spacing(1),
    //     paddingBottom: '0 !important',
    //     paddingLeft: '0 !important', 
    //     marginLeft: `${theme.spacing(-1)} !important`,
    //     marginTop: 'auto', // This will push the CardActions to the bottom
    // };

    const handleClick = () => {
        //console.log('clicked');
    }



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
                            <Button variant="contained" style={{ backgroundColor: '#EB684E' }} onClick={handleClick}>核銷</Button>
                        </div>
                    </CardContent>
                </div>
                 
                   
                    {/* <CardActions sx={cardActionsStyles} disableSpacing>
                        <IconButton aria-label="" size="small">
                            
                        </IconButton>
                    </CardActions> */}
            </Card>

            <Dialog>
                <Paper>
                    <Typography variant="h6" component="div" style={{ fontWeight: 'bold' }}>Details</Typography>
                </Paper>
            </Dialog>
        </div>
    )
}
export default BillCard;