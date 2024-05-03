import React from 'react';
import { Paper, Button, Box, useTheme, Typography} from '@mui/material';

function MyBill(){

return(
    <div className="flex flex-col h-full items-center">
        <Box sx={{ position: 'sticky', top: 0, zIndex: 1000 }}>
                <div>
                    <Paper elevation={3} sx={{ p: 8, borderRadius: 2 , textAlign:'center', width: '500px', bgcolor: '#2EB3D0', }}>
                        <Typography variant="body1" sx={{ fontSize: '25px', fontWeight: 'bold' }}>Your Balance</Typography>
                        <Typography variant="h6" sx={{ fontSize: '25px', fontWeight: 'bold' }}>+$1000</Typography>
                    </Paper>
                </div>
        </Box>
    </div>
)
}
export default MyBill;