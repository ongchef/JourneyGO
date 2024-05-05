import { useState, useContext, useEffect } from "react";

import NewBill from './newBill';
import { DataContext } from "@/app/components/dataContext";
import { getAllTransactions } from "@/services/getAllTransactions";

import { Box, useTheme, Typography, Card, CardContent, AvatarGroup, Avatar, colors, Tooltip } from "@mui/material";
import { MoreVert as MoreVertIcon, DateRange as DateRangeIcon } from "@mui/icons-material";

const { deepOrange, deepPurple, lightBlue, green, cyan } = colors;

function AllTransactionList({ group_id }) {
    const { Token } = useContext(DataContext);

    const [transactionList, setTransactionList] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);

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
        fetchTransactionList();
    }, [Token]);


    async function fetchTransactionList() {
        try {
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

    const cardContentStyles = {
        flex: 1,
        marginLeft: "10px",
    };

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
        <div>
            <div style={{ paddingLeft: "30px" }}>
                <Typography variant="h6" style={{ fontWeight: "bold" }}>
                    Transactions
                </Typography>
            </div>

            <div style={{ paddingLeft: "30px" }}>
                {/* <Card className='flex justify-start my-10 mr-10 hover:bg-gray-200' onClick={handleClick}> */}
                {transactionList &&
                    transactionList.map((data, index) => (
                        <Card key={index} sx={cardStyles} onClick={() => handleDialogOpen(data)} >
                            <div className="flex" style={{ marginLeft: "20px" }}>
                                <Tooltip title={ data.payer_name }>
                                    <Avatar>{ data.payer_name[0].toUpperCase() }</Avatar>
                                </Tooltip>
                            </div>
                            <div>
                                <CardContent sx={cardContentStyles}>
                                    <div style={{ justifyContent: "flex-start" }}>
                                        <Typography variant="h6" component="div" style={{ fontWeight: "bold" }}>
                                            {data.bill_name}
                                        </Typography>
                                        {/* <Stack direction="row" spacing={2}>
                                <Chip label="Eat" size="small" />
                                <Chip label={bill.status} size="small" color="primary" />
                                </Stack> */}

                                        <Typography variant="h11" component="div">
                                            {data.date}, {data.time}
                                        </Typography>

                                        <Typography variant="h8" component="div">
                                            <span style={{ fontWeight: "bold" }}>{data.payer_name}</span> paid for
                                        </Typography>
                                    </div>

                                    {/* <CardActions sx={cardActionsStyles} disableSpacing>
                                    <IconButton aria-label="" size="small">
                                            
                                    </IconButton>
                            </CardActions> */}
                                </CardContent>
                            </div>
                            <div>
                                <CardContent style={{ flexDirection: "row", justifyContent: "flex-end" }}>
                                    <Typography variant="h6" component="div" sx={amountStyles}>
                                        $ {data.amount}
                                    </Typography>

                                    <div>
                                        <AvatarGroup sx={{ avatarStyles }} max={3}>
                                            {data.participants.map((name, index) => (
                                                <Tooltip title={name} key={index}>
                                                    <Avatar sx={{ bgcolor: avatarColors[index % avatarColors.length] }} key={index}>
                                                        {name[0].toUpperCase()}
                                                    </Avatar>
                                                </Tooltip>
                                            ))}
                                        </AvatarGroup>
                                    </div>
                                </CardContent>
                            </div>
                        </Card>
                    ))}
            </div>

            <NewBill open={isDialogOpen} onClose={handleDialogClose} group_id={group_id} editMode={true} transactionData={selectedTransaction}/>

        </div>
    );
}
export default AllTransactionList;
