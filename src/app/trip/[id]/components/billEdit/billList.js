import { useState, useContext, useEffect } from "react";
import dayjs from "dayjs";
import { DataContext } from "@/app/components/dataContext";

import { postWriteOffBill } from "@/services/postWriteOffBill";
import { getTripGroupOverview } from "@/services/getTripGroupOverview";
import { getToken } from "@/utils/getToken";

import { Button, Box, useTheme, Typography, Card, CardContent, AvatarGroup, Avatar, Dialog, DialogContent, Tooltip } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function BillList({ group_id, transactionResult, reloadTabPanel }) {

    const { currentLang, imgHost, avatarColors } = useContext(DataContext);
    
    const [writeOffStatusOpen, setWriteOffStatusOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [memberNames, setMemberNames] = useState([]);
    const [memberImages, setMemberImages] = useState([]);
    const theme = useTheme();

    const translate = (key) => {
        const translations = {
            writeOff: {
                zh: "核銷",
                en: "Write Off",
            },
            ask: {
                zh: "您確定要核銷嗎？",
                en: "Are you sure to write off?",
            },
            confirm: {
                zh: "確定",
                en: "Confirm",
            },
            cancel: {
                zh: "取消",
                en: "Cancel",
            },
        }
        return translations[key][currentLang];
    }

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

    const handleWriteOffBtnClick = (index) => {
        setSelectedIndex(index);
        setWriteOffStatusOpen(true);
    };

    const handleCreationStatusDialogClose = () => {
        setWriteOffStatusOpen(false);
        reloadTabPanel();
    };

    const handleSubmit = () => {
        const data = transactionResult[selectedIndex];
        const now = dayjs();
        const date = now.format("YYYY-MM-DD");
        const time = now.format("HH:mm");
        
        // console.log("handleSubmit data:", data);

        const Token = getToken();
        // postWriteOffBill(Token, group_id, date, time, debtor_id, creditor_id, amount);
        let response = postWriteOffBill(Token, group_id, date, time, data.payee_id, data.payer_id, data.amount);
        // console.log("postWriteOffBill response:", response);
        reloadTabPanel();
    };

    useEffect( () => {
        // get group user names and images
        async function fetchGroup() {
            try {
                const Token = getToken();
                const data = await getTripGroupOverview(Token, group_id);
                if (data && data.length !== 0) {
                    setMemberNames(data.user_names);
                    await data.images.forEach((image, index) => {
                        if (image !== null) {
                            data.images[index] = imgHost + image;
                            // console.log("image:", data.images[index]);
                        }
                    });
                    setMemberImages(data.images);
                }
            } catch (error) {
                // console.error("Error fetching group data:", error);
            }
        }
        fetchGroup();
    }, [group_id]);

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
                                        {/* <Avatar> {data.payee[0]} </Avatar> */}
                                        {memberImages[memberNames.indexOf(data.payee)] !== null ? (
                                            <Avatar src={memberImages[memberNames.indexOf(data.payee)]} />
                                        ) : (
                                            <Avatar sx={{ bgcolor: avatarColors[index % avatarColors.length] }}> {data.payee[0]} </Avatar>
                                        )}
                                    </Tooltip>
                                    <ArrowForwardIcon fontSize="large" style={{ color: "#2EB3D0" }} />
                                    <Tooltip title={data.payer}>
                                        {/* <Avatar> {data.payer[0]} </Avatar> */}
                                        {memberImages[memberNames.indexOf(data.payer)] !== null ? (
                                            <Avatar src={memberImages[memberNames.indexOf(data.payer)]} />
                                        ) : (
                                            <Avatar sx={{ bgcolor: avatarColors[index % avatarColors.length] }}> {data.payer[0]} </Avatar>
                                        )}
                                    </Tooltip>
                                </AvatarGroup>
                            </div>
                            <div>
                                <Typography variant="h6" component="div" style={{ fontWeight: "bold"}}>
                                    {/* fix the width of the box (6vw) */}$ {data.amount}
                                </Typography>
                            </div>
                            <div>
                                <Button variant="contained" style={{ backgroundColor: "#EB684E" }}  onClick={() => handleWriteOffBtnClick(index)}>
                                    {translate("writeOff")}
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
                            {translate("ask")}
                            <div>
                                <Button onClick={handleSubmit}>{translate('confirm')}</Button>
                                <Button onClick={handleCreationStatusDialogClose}>{translate('cancel')}</Button>
                            </div>
                        </Box>
                    </DialogContent>
                </Dialog>
            </div>
        ))
    );
}
export default BillList;
