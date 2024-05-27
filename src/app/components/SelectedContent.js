"use client";
import "../globals.css";
import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { DataContext } from '@/app/components/dataContext';

import { Grid, Box, Typography, AvatarGroup, Avatar, CardMedia, Button, IconButton, colors, Tooltip } from "@mui/material";
import { ArrowBackIos as ArrowBackIosIcon, ArrowForwardRounded as ArrowForwardRoundedIcon } from "@mui/icons-material";

const { deepOrange, deepPurple, lightBlue, green, cyan } = colors;

function SelectedContent({ data, setTripOverview, setDividerStyles, LoadingIndicator }) {
    // console.log('trip overview data:');
    // console.log(data);

    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { currentLang, avatarColors, imgHost } = useContext(DataContext);

    const handleClick = () => {
        setLoading(true);
        router.push(`/trip/${data?.group_id}`);
        // setLoading(false);
    };

    const translate = (key) => {
        const translations = {
            overview: {
                zh: "旅程概覽",
                en: "Journey Overview",
            },
            myPartners: {
                zh: '我的旅伴',
                en: 'My Partners'
            },
            duration: {
                zh: '旅程時間',
                en: 'Duration'
            },
            viewDetails: {
                zh: '查看詳細資訊',
                en: 'View Details'
            }
        };
        return translations[key][currentLang];
    };

    // const avatarColors = [];
    // avatarColors.push(green[500]);
    // avatarColors.push(deepOrange[500]);
    // avatarColors.push(deepPurple[500]);
    // avatarColors.push(green[700]);
    // avatarColors.push(lightBlue[700]);
    // avatarColors.push(lightBlue[700]);

    return (
        data !== null &&
        (loading ? (
            <LoadingIndicator />
        ) : (
            <Grid item xs={12} md={6} className="border-l-2 border-black-500" sx={setDividerStyles}>
                <Box className="m-5 flex items-center">
                    <IconButton color="primary" aria-label="get back" onClick={() => setTripOverview(null)}>
                        <ArrowBackIosIcon />
                    </IconButton>
                    <Typography variant="h4" component="div" className="pl-2 pr-5">
                        {translate('overview')}
                    </Typography>
                </Box>

                <Box className="m-5" style={{ position: "sticky", right: 0, top: 0 }}>
                    <Box position="relative" className="w-full h-60 overflow-hidden rounded-xl">
                        <CardMedia component="img" image={data?.image} alt="Trip image" className="w-full h-full object-cover rounded-xl" />
                        <Typography variant="h5" component="div" className="absolute top-1/2 right-0 bg-opacity-50 text-white p-2 transform -translate-y-1/2 whitespace-normal w-2/5 text-right">
                            {data?.group_name}
                        </Typography>
                    </Box>

                    <Box className="pt-10">
                        <Typography variant="h5" component="div">
                            {translate('myPartners')}
                        </Typography>
                        <Box className="flex items-center mt-2">
                            <AvatarGroup max={5} spacing={-20}>
                                {data?.user_names.map((name, index) => (
                                    data?.images[index] !== null ? (
                                    <Tooltip title={name} key={index}>
                                        <Avatar sx={{ bgcolor: avatarColors[index % avatarColors.length] }} src={imgHost + data.images[index]}>
                                        {name[0]}
                                        </Avatar>
                                    </Tooltip>
                                    ) : (
                                    <Tooltip title={name} key={index}>
                                        <Avatar sx={{ bgcolor: avatarColors[index % avatarColors.length] }}>
                                        {name[0]}
                                        </Avatar>
                                    </Tooltip>
                                    )
                                ))}
                                </AvatarGroup>
                        </Box>
                    </Box>

                    <Box className="pt-10">
                        <Typography variant="h5" component="div">
                            {translate('duration')}
                        </Typography>
                        <Box className="flex items-center mt-2">
                            <Typography variant="h4" component="div" sx={{ color: cyan[700] }}>
                                {data?.start_date} ~ {data?.end_date}
                            </Typography>
                        </Box>
                    </Box>

                    <Box className="flex justify-end items-end">
                        <Button variant="text" size="large" endIcon={<ArrowForwardRoundedIcon />} sx={{ fontSize: "1.5rem", textTransform: 'none' }} onClick={handleClick}>
                            {translate('viewDetails')}
                        </Button>
                    </Box>
                </Box>
            </Grid>
        ))
    );
}

export default SelectedContent;
