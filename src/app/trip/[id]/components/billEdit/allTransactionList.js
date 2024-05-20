import { useState, useContext, useEffect } from "react";

import NewBill from "./newBill";
import { DataContext } from "@/app/components/dataContext";
import { getToken } from "@/utils/getToken";
import { getAllTransactions } from "@/services/getAllTransactions";

import { Box, Typography, Card, CardContent, AvatarGroup, Avatar, colors, Tooltip } from "@mui/material";
import { MoreVert as MoreVertIcon, DateRange as DateRangeIcon } from "@mui/icons-material";
import { styled } from "@mui/system";

const { deepOrange, deepPurple, lightBlue, green, cyan } = colors;

const AllTransactionList = ({ group_id, reloadTabPanel }) => {

    const { currentLang, setCurrentLang } = useContext(DataContext);

    const [transactionList, setTransactionList] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);

    const translate = (key) => {
        const translations = {
            records: {
                zh: "花費紀錄",
                en: "Transaction Records",
            },
            noData: {
                zh: "尚無交易記錄",
                en: "No transaction data found in this group",
            },
            paidFor: {
                zh: "支付",
                en: "paid for",
            },
        }
        return translations[key][currentLang];
    };

    const handleDialogOpen = (data) => {
        // wrap up the data and pass it to the dialog
        setSelectedTransaction(data);
        console.log("selected transaction:", data);
        setIsDialogOpen(true);
    };
    const handleDialogClose = () => {
        setIsDialogOpen(false);
    };

    useEffect(() => {
        console.log("render allTransactionList");
        fetchTransactionList();
    }, []);

    async function fetchTransactionList() {
        try {
            const Token = getToken();
            const data = await getAllTransactions(Token, group_id);
            console.log("all transaction result:", data);
            if (data && data.length !== 0) {
                // change the format of the date and time
                data.forEach((element) => {
                    const date = new Date(element.date);
                    element.date = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
                    element.time = element.time.slice(0, 5);
                });
                setTransactionList(data);
            } else {
                console.error("No transaction data found in this group");
            }
        } catch (error) {
            console.error("Error fetching all transaction list result:", error);
        }
    }

    const StyledCard = styled(Card)(({ theme }) => ({
        display: "flex",
        width: "80%",
        height: "8.75rem",
        flexDirection: "row",
        alignItems: "center",
        margin: "1.25rem",
        marginTop: "1.875rem",
        borderRadius: "0.625rem",
        gap: "1.8rem",
        boxShadow: "0 0 0.625rem 0 rgba(0,0,0,0.2)",
        cursor: "pointer",
        [theme.breakpoints.down("md")]: {
            flexDirection: "column",
            height: "auto",
        },
    }));

    const cardStyles = {
        flex: 1,
        display: "flex",
        width: "500px",
        height: "140px",
        flexDirection: "row",
        alignItems: "center",
        padding: "20px",
        margin: "20px",
        marginTop: "30px",
        borderRadius: "10px",
        gap: "30px",
        boxShadow: "0 0 10px 0 rgba(0,0,0,0.2)",
        cursor: "pointer",
    };

    const amountStyles = {
        display: "flex",
        //marginRight: '10px',
        fontWeight: "bold",
        justifyContent: "flex-end",
        color: "#EB684E",
    };

    const avatarStyles = {
        display: "flex",
        //justifyContent: 'flex-end',
        //marginRight: '10px',
    };

    const avatarColors = [];
    avatarColors.push(green[500]);
    avatarColors.push(deepOrange[500]);
    avatarColors.push(deepPurple[500]);
    avatarColors.push(green[700]);
    avatarColors.push(lightBlue[700]);
    avatarColors.push(lightBlue[700]);

    return (
        <div className="px-8">
            <Typography variant="h6" className="font-bold">
                {translate("records")}
            </Typography>

            {transactionList.length === 0 ? (
                <Typography variant="h6">{translate('noData')}</Typography>
            ) : (
                transactionList.map((data, index) => (
                    <StyledCard key={index} onClick={() => handleDialogOpen(data)}>
                        <Box className="flex ml-5 p-5">
                            <Tooltip title={data.payer_name}>
                                <Avatar>{data.payer_name[0]}</Avatar>
                            </Tooltip>
                        </Box>
                        <CardContent className="flex overflow-hidden whitespace-nowrap flex-shrink" style={{ maxWidth: "12rem" }}>
                            <Box className="justify-start">
                                <Typography variant="h6" component="div" className="font-bold">
                                    {data.bill_name}
                                </Typography>

                                <Typography variant="h11" component="div">
                                    {data.date}, {data.time}
                                </Typography>

                                <Typography variant="h8" component="div">
                                    <span className="font-bold">{data.payer_name}</span> {translate("paidFor")}
                                </Typography>
                            </Box>
                        </CardContent>
                        <Box className="flex flex-row justify-end p-5 overflow-hidden" sx={{ marginLeft: "auto" }}>
                            <CardContent>
                                <Typography variant="h6" component="div" sx={{ fontWeight: "bold", textAlign: "right", color: "#EB684E" }}>
                                    $ {data.amount}
                                </Typography>

                                <AvatarGroup max={3}>
                                    {data &&
                                        data.participants.map((name, index) => (
                                            <Tooltip title={name} key={index}>
                                                <Avatar sx={{ bgcolor: avatarColors[index % avatarColors.length] }} key={index}>
                                                    {name[0]}
                                                </Avatar>
                                            </Tooltip>
                                        ))}
                                </AvatarGroup>
                            </CardContent>
                        </Box>
                    </StyledCard>
                ))
            )}

            <NewBill open={isDialogOpen} onClose={handleDialogClose} group_id={group_id} editMode={true} transactionData={selectedTransaction} reloadTabPanel={reloadTabPanel} />
        </div>
    );
};
export default AllTransactionList;
