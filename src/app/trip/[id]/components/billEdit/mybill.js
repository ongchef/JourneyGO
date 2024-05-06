import React from "react";
import { Paper, Button, Box, useTheme, Typography } from "@mui/material";

function MyBill({userBalance}) {
    return (
        <div className="flex flex-col h-full items-center">
            <Box>
                <div>
                    <Paper
                        elevation={3}
                        sx={{ p: 8, borderRadius: 2, textAlign: "center", width: "500px", bgcolor: "#2EB3D0" }}>
                        <Typography variant="body1" sx={{ fontSize: "25px", fontWeight: "bold" }}>
                            我的餘額
                        </Typography>
                        <Typography variant="h6" sx={{ fontSize: "25px", fontWeight: "bold" }}>
                            ${userBalance}
                        </Typography>
                    </Paper>
                </div>
            </Box>
        </div>
    );
}
export default MyBill;
