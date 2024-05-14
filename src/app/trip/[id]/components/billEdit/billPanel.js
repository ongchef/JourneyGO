"use client";
import React, {useContext} from "react";
import { Grid, Button, Box, Typography, Avatar } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { DataContext } from "@/app/components/dataContext";
import NewBill from "./newBill";

function BillPanel({ group_id, reloadTabPanel }) {

    const { currentLang, setCurrentLang } = useContext(DataContext);
    const router = useRouter();

    const [openDialog, setOpenDialog] = useState(false);

    const translate = (key) => {
        const translations = {
            hello: {
                zh: "你好!",
                en: "Hello!",
            },
            addBill: {
                zh: "+ 新增花費",
                en: "+ Add Bill",
            },
        };
        return translations[key][currentLang];
    }

    const setDividerStyles = {
        marginTop: `0!important`,
    };

    const handleClick = () => {
        setLoading(true);
        //router.push('/bill/page.js');
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <main>
            <Box>
                <Grid container spacing={2}>
                    <Grid item xs={12} sx={setDividerStyles}>
                        <Box className="flex items-center p-2 m-3">
                            <div className="pr-2">
                                {/* <div className='flex gap-2 items-center' style={{ justifyContent: 'flex-start' }}> */}
                                <Avatar alt="User"/>
                            </div>
                            <div className="pr-5">
                                <Typography variant="body1" sx={{ fontSize: "20px" }}>
                                    {translate("hello")}
                                </Typography>
                            </div>
                            <Button variant="contained" onClick={handleOpenDialog} sx={{ bgcolor: "#EB684E" }}>
                                {translate("addBill")}
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <NewBill open={openDialog} onClose={handleCloseDialog} group_id={group_id} reloadTabPanel={reloadTabPanel}  />
        </main>
    );
}
export default BillPanel;
