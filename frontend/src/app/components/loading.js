'use client';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loading = () => {
  return (
    <div>
      <Box className="h-screen w-screen flex justify-center items-center" >
        <CircularProgress />
      </Box>
    </div>
  );
}
export default Loading;