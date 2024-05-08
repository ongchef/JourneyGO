"use client";

import { useState, useContext, useEffect } from "react";
import { DataContext } from "@/app/components/dataContext";
import Loading from "@/app/components/loading";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TabPanel from "./components/tabPanel";
import ProfilePanel from "./components/profilePanel";
import PicturePanel from "./components/picturePanel";

import RoomIcon from '@mui/icons-material/Room';
import DescriptionIcon from '@mui/icons-material/Description';

function tabProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

export default function Profile({}) {
    const [value, setValue] = useState(0);
    const [isLoad, setIsLoad] = useState(true);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <main>
            <Box sx={{ width: "100%" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab
                            label={
                                <div className="flex flex-row items-center gap-3">
                                    <RoomIcon className="scale-125" />
                                    <Typography variant="p">個人帳戶</Typography>
                                </div>
                            }
                            {...tabProps(0)}
                        />
                        <Tab
                            label={
                                <div className="flex flex-row items-center gap-3">
                                    <DescriptionIcon className="scale-125" />
                                    <Typography variant="p">帳戶安全</Typography>
                                </div>
                            }
                            {...tabProps(1)}
                        />
                    </Tabs>
                </Box>
                <Box>
                    <h1 className="lg:text-3xl text-2xl m-[1rem]"></h1>
                    {/* <TabPanel value={value} index={0}>
                        {!isLoad && <Loading />}
                        {isLoad && (
                            <div className="flex lg:flex-row flex-col lg:gap-0 gap-3">
                                <ProfilePanel />
                            </div>
                        )}
                    </TabPanel> */}

                    <TabPanel value={value} index={1}>
                        {!isLoad && <Loading />}
                        {isLoad && (
                            <div className="flex lg:flex-row flex-col lg:gap-0 gap-5">
                                <div className="lg:w-1/2 w-full">{/* 放置帳戶安全 */}</div>
                            </div>
                        )}
                    </TabPanel>
                </Box>
            </Box>

            <PicturePanel />
            <ProfilePanel />
        </main>
    );
}
