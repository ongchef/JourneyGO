import React from 'react';
import { Grid, Paper, Button, Box, useTheme, Typography, Chip, Stack, Card, CardContent, CardMedia,CardActions, IconButton, AvatarGroup ,Avatar, avatarColors} from '@mui/material';



function BillPanel(){
    const setDividerStyles = {
        marginTop: `0!important`,
      };


return(
    <main>
        <Box >
            <Grid container spacing={2}>
                <Grid item xs={12}  sx={setDividerStyles}>
                <Box className="flex items-center p-2 m-3">
                    <div className='pr-2'> 
                    {/* <div className='flex gap-2 items-center' style={{ justifyContent: 'flex-start' }}> */}
                        <Avatar  alt="User" src="/path/to/avatar.jpg" />
                    </div>
                    <div className="pr-5">
                        <Typography variant="body1" sx={{ fontSize: '20px'}}>Hi, Belle</Typography>
                    </div>
                        <Button variant="contained" className="w-21" onClick sx={{ bgcolor: '#EB684E' }}>+  新增花費</Button>
                
                </Box>
                </Grid>
            </Grid>
        </Box>
    </main>
)
}
export default BillPanel;


