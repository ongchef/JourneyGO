'use client';
import "../globals.css";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'

import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {deepOrange, deepPurple, lightBlue, green, cyan} from '@mui/material/colors';

import AvatarGroup from '@mui/material/AvatarGroup';
import Avatar from '@mui/material/Avatar';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';

function SelectedContent({ data, setTripOverview, setDividerStyles }) {
    // console.log('trip overview data:' + JSON.stringify(data));

    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // useEffect(() => {
    //     const handleStart = () => setLoading(true);
    //     const handleComplete = () => setLoading(false);
    
    //     router.events.on('routeChangeStart', handleStart);
    //     router.events.on('routeChangeComplete', handleComplete);
    //     router.events.on('routeChangeError', handleComplete);
    
    //     return () => {
    //         router.events.off('routeChangeStart', handleStart);
    //         router.events.off('routeChangeComplete', handleComplete);
    //         router.events.off('routeChangeError', handleComplete);
    //     };
    // }, [router]);

    const handleClick =  () => {
        router.push(`/trip/${data.group_id}`);
    };

    const avatarColors = [];
    avatarColors.push(green[500]);
    avatarColors.push(deepOrange[500]);
    avatarColors.push(deepPurple[500]);
    avatarColors.push(green[700]);
    avatarColors.push(lightBlue[700]);
    avatarColors.push(lightBlue[700]);
    

    return (
        data !== null && (
            loading ? <CircularProgress /> :
            <Grid item xs={12} md={6} className="border-l-2 border-black-500" sx={setDividerStyles}>
                <Box className="m-5 flex items-center">
                    <IconButton color="primary" aria-label="get back" onClick={() => setTripOverview(null)}>
                    <ArrowBackIosIcon />
                    </IconButton>
                    <Typography variant="h4" component="div" className="pl-2 pr-5">
                    旅程概覽
                    </Typography>
                </Box>

                <Box className="m-5">
                    <Box position="relative" className="w-full h-60 overflow-hidden rounded-xl">
                    <CardMedia
                        component="img"
                        image="/images/hualian.jpg"
                        alt="Trip image"
                        className="w-full h-full object-cover rounded-xl"
                    />
                    <Typography variant="h5" component="div" className="absolute top-1/2 right-0 bg-opacity-50 text-white p-2 transform -translate-y-1/2 whitespace-normal w-2/5 text-right">
                        {data.group_name}
                    </Typography>
                    </Box>

                    <Box className="pt-10">
                        <Typography variant="h5" component="div">
                            我的旅伴
                        </Typography>
                        <Box className="flex items-center mt-2">
                            <AvatarGroup max={5} spacing={-20}>
                                {data.user_names.map((name, index) => (
                                    <Avatar sx={{ bgcolor: avatarColors[index % avatarColors.length] }}>
                                        {name[0].toUpperCase()}
                                    </Avatar>
                                ))}
                            </AvatarGroup>
                        </Box>
                    </Box>

                    <Box className="pt-10">
                    <Typography variant="h5" component="div">
                        旅程時間
                    </Typography>
                    <Box className="flex items-center mt-2">
                        <Typography variant="h4" component="div" sx={{ color: cyan[700] }}>
                        {data.start_date} ~ {data.end_date}
                        </Typography>
                    </Box>
                    </Box>

                    <Box className="flex justify-end items-end">
                        <Button
                            variant="text"
                            size="large"
                            endIcon={<ArrowForwardRoundedIcon />}
                            sx={{ fontSize: '1.5rem'}}
                            onClick={handleClick}>
                            查看詳細資訊
                        </Button>
                    </Box>
                </Box>
            </Grid>
            )
    );
}

export default SelectedContent;