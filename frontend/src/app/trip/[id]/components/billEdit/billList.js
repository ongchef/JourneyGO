import React from 'react';

import { Box, useTheme, Typography, Chip, Stack, Card, CardContent, CardMedia,CardActions, IconButton, AvatarGroup ,Avatar, avatarColors} from '@mui/material';
import { MoreVert as MoreVertIcon, DateRange as DateRangeIcon } from '@mui/icons-material';


function BillList(){

    const cardContentStyles = {
        flex:1,
        marginLeft: '20px',
    };

    const cardStyles ={
        flex:1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '10px',
        margin: '10px',
        borderRadius: '10px',
        boxShadow: '0 0 10px 0 rgba(0,0,0,0.2)',
        cursor: 'pointer',
    };

    const amountStyles = {
        display: 'flex',
        justifyContent: 'flex-end',
        marginRight: '10px',
        fontWeight: 'bold', 
        color: '#EB684E'
    };

    const avatarStyles = { 
        display: 'flex',
        justifyContent: 'flex-end',
        marginRight: '10px',
    };


    const handleClick = () => {
        //console.log('clicked');
    }


    return (
        <div>
            <div style={{ paddingLeft: '30px' }}>
                <Typography variant='h6' style={{ fontWeight: 'bold' }}>Transactions</Typography>
            </div>
            <div style={{ paddingLeft: '30px' }}>
                {/* <Card className='flex justify-start my-10 mr-10 hover:bg-gray-200' onClick={handleClick}> */}
                <Card sx={cardStyles} onClick={handleClick}>
                    <div className='flex' style={{marginLeft: '20px' }}>
                        <Avatar alt="User 1" src="/path/to/avatar1.jpg" />
                    </div>
                    <div>
                        <CardContent sx={cardContentStyles}>
                            <div style={{ justifyContent: 'flex-start' }}>
                                <Typography variant="h6" component="div" style={{ fontWeight: 'bold' }}>
                                    Snack
                                </Typography>
                                {/* <Stack direction="row" spacing={2}>
                                <Chip label="Eat" size="small" />
                                <Chip label={bill.status} size="small" color="primary" />
                                </Stack> */}

                                <Typography variant="h11" component="div">
                                    2024/03/31, 10:00
                                </Typography>

                                <Typography variant="h8" component="div">
                                    <span style={{ fontWeight: 'bold' }}>Worky</span> paid for
                                </Typography>
                            </div>

                            {/* <CardActions sx={cardActionsStyles} disableSpacing>
                                    <IconButton aria-label="" size="small">
                                            
                                    </IconButton>
                            </CardActions> */}
                        </CardContent>
                    </div>
                    <div>
                        <CardContent sx={cardContentStyles}>
                        <Typography variant="h6" component="div" sx={amountStyles} >
                            $100
                        </Typography>

                        <div>
                            <AvatarGroup sx={{ avatarStyles }}>
                                <Avatar alt="User 1" src="/path/to/avatar1.jpg" />
                                <Avatar alt="User 2" src="/path/to/avatar1.jpg" />
                            </AvatarGroup>
                        </div>
                        </CardContent>
                    </div>

                </Card>
            </div>
        </div>
    );
}
export default BillList;