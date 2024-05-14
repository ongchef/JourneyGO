"use client";
import "../globals.css";
import { useContext } from "react";
import { getTripGroupOverview } from "@/services/getTripGroupOverview";
import { DataContext } from "@/app/components/dataContext";
import { getToken } from "@/utils/getToken";

import { useTheme, Typography, Chip, Stack, Card, CardContent, CardMedia, CardActions, IconButton } from "@mui/material";
import { MoreVert as MoreVertIcon, DateRange as DateRangeIcon } from "@mui/icons-material";

function TripList({ data, tabValue, setTripOverview }) {
    const { setAllGroups, currentLang } = useContext(DataContext);

    const handleClick = (group_id) => {
        async function fetch() {
            try {
                const Token = getToken();
                const data = await getTripGroupOverview(Token, group_id);
                // console.log('Trip group overview:', data);
                if (data && data.length !== 0) {
                    setTripOverview(data);
                    setAllGroups(data);
                } else {
                    console.error("No trip group overview data found");
                }
            } catch (error) {
                console.error("Error fetching trip group overview:", error);
            }
        }
        fetch();
    };

    const translate = (key) => {
        const translations = {
            days: {
                zh: "天",
                en: "Days",
            },
            incoming: {
                zh: '即將來臨',
                en: 'Incoming'
            },
            finished: {
                zh: '已完成',
                en: 'Finished'
            },
            Notrips: {
                zh: '目前還沒有行程喔！',
                en: 'No Journeys yet!'
            }
        };
        return translations[key][currentLang];
    };

    const theme = useTheme();
    // Determine the square size based on theme or fixed value
    const squareSize = theme.spacing(20);

    const mediaStyles = {
        width: squareSize,
        height: squareSize,
        padding: theme.spacing(2),
        backgroundSize: "cover",
    };

    const cardContentStyles = {
        padding: theme.spacing(2),
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        paddingBottom: `${theme.spacing(2)} !important`,
    };

    const cardActionsStyles = {
        paddingTop: theme.spacing(1),
        paddingBottom: "0 !important",
        paddingLeft: "0 !important",
        marginLeft: `${theme.spacing(-1)} !important`,
        marginTop: "auto", // This will push the CardActions to the bottom
    };

    return (
        // if data is undefined, return empty div
        !data || data.length === 0 ? (
            <Typography variant="h5" component="div" className="p-5">
                {translate("Notrips")}
            </Typography>
        ) : (
            data
                .filter((trip) => tabValue === "All" || tabValue.includes(trip.status))
                .map((trip) => (
                    <Card key={trip.group_id} className="flex justify-start my-10 mr-10 hover:bg-gray-200" onClick={() => handleClick(trip.group_id)}>
                        <div className="flex-grow flex">
                            <CardMedia component="img" sx={mediaStyles} image="/images/hualian.jpg" alt={trip.group_name} />
                            <div className="flex flex-col h-full">
                                <CardContent sx={cardContentStyles}>
                                    <Stack direction="row" spacing={2}>
                                        <Chip label="place" size="small" />
                                        <Chip label={translate(trip.status.toLowerCase())} size="small" color="primary" />
                                    </Stack>
                                    <div className="pt-1">
                                        <Typography variant="h6" component="div">
                                            {trip.group_name}
                                        </Typography>
                                    </div>
                                    <CardActions sx={cardActionsStyles} disableSpacing>
                                        {/* <IconButton aria-label="creator" size="small">
                                <PersonIcon />
                                <span className="ml-1 text-sm">{trip.creator}</span>
                            </IconButton> */}
                                        <IconButton aria-label="duration" size="small">
                                            <DateRangeIcon />
                                            <span className="ml-1 text-sm">{trip.duration} {translate('days')}</span>
                                        </IconButton>
                                    </CardActions>
                                </CardContent>
                            </div>
                        </div>
                        <IconButton aria-label="settings" className="self-start p-2">
                            <MoreVertIcon />
                        </IconButton>
                    </Card>
                ))
        )
    );
}

export default TripList;
