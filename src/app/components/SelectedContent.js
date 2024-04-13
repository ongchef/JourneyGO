'use client';
import "../globals.css";
import React from 'react';
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

function SelectedContent({ mockData, selectedCard, setSelectedCard, setDividerStyles }) {
    return (
        selectedCard !== null && (
        <Grid item xs={12} md={6} className="border-l-2 border-black-500" sx={setDividerStyles}>
            <Box className="m-5 flex items-center">
                <IconButton color="primary" aria-label="get back" onClick={() => setSelectedCard(null)}>
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
                    image={mockData[selectedCard - 1].imageUrl}
                    alt="Trip image"
                    className="w-full h-full object-cover rounded-xl"
                />
                <Typography variant="h5" component="div" className="absolute top-1/2 right-0 bg-opacity-50 text-white p-2 transform -translate-y-1/2 whitespace-normal w-2/5 text-right">
                    {mockData[selectedCard - 1].name}
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

                <Box className="flex justify-end items-end">
                <Button variant="text" size="large" endIcon={<ArrowForwardRoundedIcon />} sx={{ fontSize: '1.5rem'}}>
                    查看詳細資訊
                </Button>
                </Box>
            </Box>
        </Grid>
        )
    );
}

export default SelectedContent;