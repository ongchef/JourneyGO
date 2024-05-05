import React from "react";
import { useState } from "react";
import { Button, Box, useTheme, Typography, Card, CardContent, AvatarGroup, Avatar, Dialog, DialogContent, Tooltip } from "@mui/material";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function BillList({ transactionResult }) {
    const [creationStatusOpen, setCreationStatusOpen] = useState(false);
    const theme = useTheme();

    const cardStyles = {
        flexDirection: "column",
        p: 2,
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        width: "500px",
    };

    const cardContentStyles = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        gap: "70px",
    };

    const avatarStyles = {
        width: theme.spacing(3),
        height: theme.spacing(4),
        marginLeft: "40px",
    };

    const dialogContentStyles = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    };

    const boxStyles = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        fontSize: "20px",
        height: "100%",
        gap: "20px",
    };

    const handleClick = () => {
        setCreationStatusOpen(true);
    };

    const handleCreationStatusDialogClose = () => {
        setCreationStatusOpen(false);
        //window.location.reload();
    };

    return (
        transactionResult && transactionResult.map((data, index) => (
        <div key={index} className="flex flex-col h-full items-center">
            <Card sx={cardStyles}>
                <div>
                    <CardContent sx={cardContentStyles}>
                        <div>
                            <AvatarGroup sx={avatarStyles}>
                                <Tooltip title={data.payer}>
                                    <Avatar> {data.payer[0].toUpperCase()} </Avatar>
                                </Tooltip>
                                <ArrowForwardIcon fontSize="large" style={{ color: "#2EB3D0" }} />
                                <Tooltip title={data.payee}>
                                    <Avatar> {data.payee[0].toUpperCase()} </Avatar>
                                </Tooltip>
                            </AvatarGroup>
                        </div>
                        <div>
                            <Typography variant="h6" component="div" style={{ fontWeight: "bold", width: "6vw" }}>
                                {/* fix the width of the box (6vw) */}
                                $ {data.amount}
                            </Typography>
                        </div>
                        <div>
                            <Button variant="contained" style={{ backgroundColor: "#EB684E" }} onClick={handleClick}>
                                核銷
                            </Button>
                        </div>
                    </CardContent>
                </div>
                {/* <CardActions sx={cardActionsStyles} disableSpacing>
                        <IconButton aria-label="" size="small">
                            
                        </IconButton>
                    </CardActions> */}
            </Card>

            <Dialog open={creationStatusOpen} onClose={handleCreationStatusDialogClose} fullWidth maxWidth="sm">
                <DialogContent sx={dialogContentStyles}>
                    <Box sx={boxStyles}>
                        您確定要核銷嗎？
                        <div>
                            <Button onClick={handleCreationStatusDialogClose}>確定</Button>
                            <Button onClick={handleCreationStatusDialogClose}>取消</Button>
                        </div>
                    </Box>
                </DialogContent>
            </Dialog>
        </div>
        ))
    );

}
export default BillList;
