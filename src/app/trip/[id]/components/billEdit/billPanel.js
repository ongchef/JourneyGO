"use client";
import React from "react";
import { Grid, Button, Box, Typography, Avatar } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import NewBill from "./newBill";

function BillPanel({ group_id }) {
    const router = useRouter();

    const [openDialog, setOpenDialog] = useState(false);

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
                                    Hello!
                                </Typography>
                            </div>
                            <Button variant="contained" onClick={handleOpenDialog} sx={{ bgcolor: "#EB684E" }}>
                                + 新增花費
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <NewBill open={openDialog} onClose={handleCloseDialog} group_id={group_id} />
        </main>
    );
}
export default BillPanel;
