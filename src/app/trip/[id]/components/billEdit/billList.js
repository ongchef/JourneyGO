import { useState, useContext } from "react";
import dayjs from "dayjs";

import { postWriteOffBill } from "@/services/postWriteOffBill";
import { DataContext } from "@/app/components/dataContext";

import { Button, Box, useTheme, Typography, Card, CardContent, AvatarGroup, Avatar, Dialog, DialogContent, Tooltip } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function BillList({ group_id, transactionResult, reloadTabPanel }) {
    const [writeOffStatusOpen, setWriteOffStatusOpen] = useState(false);
    const theme = useTheme();

    const { Token } = useContext(DataContext);

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

    const handleWriteOffBtnClick = () => {
        setWriteOffStatusOpen(true);
    };

    const handleCreationStatusDialogClose = () => {
        setWriteOffStatusOpen(false);
        reloadTabPanel();
    };

    const handleSubmit = (data) => {
        console.log("submit write off");
        const now = dayjs();
        const date = now.format("YYYY-MM-DD");
        const time = now.format("HH:mm");
        // postWriteOffBill(Token, group_id, date, time, debtor_id, creditor_id, amount);

        let response = postWriteOffBill(Token, group_id, date, time, data.payee_id, data.payer_id, data.amount);
        console.log("postWriteOffBill response:", response);
        reloadTabPanel();
    };

    return (
        transactionResult &&
        transactionResult.map((data, index) => (
            <div key={index} className="flex flex-col h-full items-center">
                <Card sx={cardStyles}>
                    <div>
                        <CardContent sx={cardContentStyles}>
                            <div>
                                <AvatarGroup sx={avatarStyles}>
                                    <Tooltip title={data.payee}>
                                        <Avatar> {data.payee[0].toUpperCase()} </Avatar>
                                    </Tooltip>
                                    <ArrowForwardIcon fontSize="large" style={{ color: "#2EB3D0" }} />
                                    <Tooltip title={data.payer}>
                                        <Avatar> {data.payer[0].toUpperCase()} </Avatar>
                                    </Tooltip>
                                </AvatarGroup>
                            </div>
                            <div>
                                <Typography variant="h6" component="div" style={{ fontWeight: "bold", width: "6vw" }}>
                                    {/* fix the width of the box (6vw) */}$ {data.amount}
                                </Typography>
                            </div>
                            <div>
                                <Button variant="contained" style={{ backgroundColor: "#EB684E" }} onClick={handleWriteOffBtnClick}>
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

                <Dialog open={writeOffStatusOpen} onClose={handleCreationStatusDialogClose} fullWidth maxWidth="sm">
                    <DialogContent sx={dialogContentStyles}>
                        <Box sx={boxStyles}>
                            您確定要核銷嗎？
                            <div>
                                <Button onClick={() => handleSubmit(data)}>確定</Button>
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
