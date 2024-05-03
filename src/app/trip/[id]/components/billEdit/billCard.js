import React from 'react';
import { useState } from 'react';
import { Paper, Button, Box, useTheme, Typography, Chip, Stack, Card, CardContent, CardMedia,CardActions, IconButton, AvatarGroup ,Avatar, avatarColors, Dialog, DialogContent} from '@mui/material';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


function BillCard(){
    const [creationStatusOpen, setCreationStatusOpen] = useState(false);
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
        marginLeft: '40px',
    };

    const dialogContentStyles = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        
    }

    const boxStyles ={
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        fontSize: '20px',
        height: '100%',
        gap: '20px',
    }

    const handleClick = () => {
        setCreationStatusOpen(true);
    }

    const handleCreationStatusDialogClose = () => {
        setCreationStatusOpen(false)
        //window.location.reload();
      }

    return(
        <div className="flex flex-col h-full items-center">
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

            <Dialog open={creationStatusOpen} onClose={handleCreationStatusDialogClose} fullWidth maxWidth="sm">
                <DialogContent sx={dialogContentStyles}>
                    <Box sx={boxStyles}>
                        您確定要核銷嗎？
                        <div>
                        <Button onClick={handleCreationStatusDialogClose}>
                            確定
                        </Button>
                        <Button onClick={handleCreationStatusDialogClose}>
                            取消
                        </Button>
                        </div>

                    </Box>
                </DialogContent>
            </Dialog>
        </div>
    )
}
export default BillCard;