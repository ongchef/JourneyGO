"use client";

import { postTransaction } from "@/services/postTransaction";
import { putTransaction } from "@/services/putTransaction";
import { DataContext } from "@/app/components/dataContext";
import { getTripGroupOverview } from "@/services/getTripGroupOverview";
import Picker from "./Picker";

import { useState, useContext, useEffect, use } from "react";
import dayjs from "dayjs";
import { Dialog, DialogContent, Typography, DialogTitle, Button, Grid, InputLabel, TextField, Select, Box, FormControl, MenuItem } from "@mui/material";

const NewBill = ({ open, onClose, group_id, editMode = false, transactionData = null }) => {
    const { Token } = useContext(DataContext);

    const [groupMembers, setGroupMembers] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    // using in edit mode
    const [initialState, setInitialState] = useState({}); 

    const [billName, setBillName] = useState("");
    const [billNameError, setBillNameError] = useState("");

    const [billDateTime, setBillDateTime] = useState(dayjs());
    const [billDateTimeError, setBillDateTimeError] = useState("");
    const [billDate, setBillDate] = useState(dayjs(billDateTime).format("YYYY-MM-DD"));
    const [billTime, setBillTime] = useState(dayjs(billDateTime).format("HH:mm"));

    const [payer, setPayer] = useState("");
    const [payerError, setPayerError] = useState("");

    const [participants, setParticipants] = useState([]);
    const [participantsError, setParticipantsError] = useState("");

    const [amount, setAmount] = useState("");
    const [amountError, setAmountError] = useState("");

    const [creationStatusOpen, setCreationStatusOpen] = useState(false);
    const [statusMessage, setStatusMessage] = useState("");

    useEffect(() => {
        async function fetch() {
            try {
                const data = await getTripGroupOverview(Token, group_id);
                if (data && data.length !== 0) {
                    setGroupMembers(data.user_names);
                } else {
                    console.error("No group members found");
                }
            } catch (error) {
                console.error("Error fetching group members:", error);
            }
        }
        fetch();
    }, [Token]);

    // use in edit mode, set the initial transaction data
    useEffect(() => {
        if (editMode && transactionData !== null) {
            setBillName(transactionData.bill_name);
            setAmount(transactionData.amount);
            setPayer(transactionData.payer_name);
            setParticipants(transactionData.participants);
            setBillDateTime(dayjs(`${transactionData.date} ${transactionData.time}`));
            setBillDate(dayjs(`${transactionData.date} ${transactionData.time}`).format("YYYY-MM-DD"));
            setBillTime(dayjs(`${transactionData.date} ${transactionData.time}`).format("HH:mm"));
    
            // Store the initial state
            setInitialState({
                billName: transactionData.bill_name,
                amount: transactionData.amount,
                payer: transactionData.payer_name,
                participants: transactionData.participants,
                billDate: dayjs(`${transactionData.date} ${transactionData.time}`).format("YYYY-MM-DD"),
                billTime: dayjs(`${transactionData.date} ${transactionData.time}`).format("HH:mm"),
            });
        }
    }, [editMode, transactionData]);

    // post transaction
    const postTransactionData = async () => {
        try {
            console.log("postTransactionData participants:", participants);
            let data = await postTransaction(Token, group_id, billName, amount, payer, participants, billDate, billTime);

            if (data && data.length !== 0) {
                setStatusMessage("新增成功");
                setCreationStatusOpen(true);
            } else {
                setStatusMessage("新增失敗");
                setCreationStatusOpen(true);
            }
        } catch (error) {
            console.error("Error posting transaction:", error);
            setStatusMessage("新增失敗");
            setCreationStatusOpen(true);
        }
    };

    // put transaction
    const putTransactionData = async () => {
        try {
            let dataToSend = {
                bill_name: billName !== initialState.billName ? billName : undefined,
                amount: amount !== initialState.amount ? amount : undefined,
                payer_id: payer !== initialState.payer ? payer : undefined,
                participants: participants !== initialState.participants ? participants : undefined,
                date: billDate !== initialState.billDate ? billDate : undefined,
                time: billTime !== initialState.billTime ? billTime : undefined,
            };
    
            // Remove undefined fields
            dataToSend = Object.fromEntries(Object.entries(dataToSend).filter(([_, v]) => v !== undefined));
    
            console.log("putTransactionData dataToSend:", dataToSend);
            let data = await putTransaction(Token, group_id, dataToSend);
    
            if (data && data.length !== 0) {
                setStatusMessage("修改成功");
                setCreationStatusOpen(true);
            } else {
                setStatusMessage("修改失敗");
                setCreationStatusOpen(true);
            }
        } catch (error) {
            console.error("Error putting transaction:", error);
            setStatusMessage("修改失敗");
            setCreationStatusOpen(true);
        }
    };

    const handleChange = (setter, errorSetter, value, errorMessage) => {
        setter(value);
        if (value === "" || (errorSetter === setAmountError && isNaN(value))) {
            errorSetter(errorMessage);
        } else {
            errorSetter("");
        }
    };

    const handleBillDateTimeChange = (date) => {
        setBillDateTime(date);
        setBillDate(dayjs(billDateTime).format("YYYY-MM-DD"));
        setBillTime(dayjs(billDateTime).format("HH:mm"));

        if (date === null) {
            setBillDateTimeError("請選擇日期");
        } else {
            setBillDateTimeError("");
        }
    };

    const handleBillNameChange = (e) => {
        handleChange(setBillName, setBillNameError, e.target.value, "請輸入品項名稱");
    };

    const handleBillAmountChange = (e) => {
        handleChange(setAmount, setAmountError, e.target.value, "請輸入正確金額");
    };

    const handlePayerChange = (e) => {
        handleChange(setPayer, setPayerError, e.target.value, "請選擇付款人");
    };

    const handleParticipantsChange = (e) => {
        const selectedMembers = Array.isArray(e.target.value) ? e.target.value : [e.target.value];
        setParticipants(selectedMembers);
        if (selectedMembers.length === 0) {
            setParticipantsError("請選擇參與者");
        } else {
            setParticipantsError("");
        }
    };

    const validateForm = () => {
        let isValid = true;
    
        if (billName === "") {
            console.log('billName is empty');
            setBillNameError("請輸入品項名稱");
            isValid = false;
        }
        if (payer === "") {
            console.log('payer is empty');
            setPayerError("請選擇付款人");
            isValid = false;
        }
        if (participants.length === 0) {
            console.log('participants is empty');
            setParticipantsError("請選擇參與者");
            isValid = false;
        }
        if (amount === "" || isNaN(amount)) {
            console.log('amount is empty or not a number');
            setAmountError("請輸入正確金額");
            isValid = false;
        }
        if (billDate === "" || billTime === "") {
            console.log('billDate or billTime is empty');
            setBillDateTimeError("請選擇日期");
            isValid = false;
        }
    
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();
    
        if (!isSubmitting) {
            setIsSubmitting(true);
    
            try {
                if (editMode) {
                    console.log('edit mode');
                    await putTransactionData();
                } else {
                    console.log('add mode');
                    await postTransactionData();
                }
            } catch (error) {
                console.error(error);
            } finally {
                setIsSubmitting(false);
            }
        }
    };
    const handleCancel = () => {
        setBillDateTime(dayjs());
        setBillName("");
        setPayer("");
        setParticipants([]);
        setAmount("");
        onClose();
    };

    const handleCreationStatusDialogClose = () => {
        setCreationStatusOpen(false);
        window.location.reload();
    };

    const DialogStyles = {
        fullwidth: true,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    };

    return (
        <div>
            <Dialog open={open} onClose={onClose} sx={DialogStyles} maxWidth="md" fullWidth>
                <DialogTitle>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <img src="/money.png" alt="money" style={{ width: 55, height: 55 }} />
                        <Typography variant="h5">{editMode ? "編輯花費" : "新增花費"}</Typography>
                    </div>
                </DialogTitle>

                <DialogContent style={{ gap: 10 }}>
                    <Grid container spacing={0} style={{ justifyContent: "center", gap: 100 }}>
                        {/* Left */}
                        <Grid item xs={8} md={4}>
                            <Picker billDateTime={billDateTime} billDateTimeError={billDateTimeError} handleBillDateTimeChange={handleBillDateTimeChange} />
                        </Grid>

                        {/* Right */}
                        <Grid item xs={12} md={4} style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
                            <Grid container spacing={2} direction="column">
                                <Grid item>
                                    <InputLabel htmlFor="add-products">品項</InputLabel>
                                    <TextField label="" fullWidth onChange={handleBillNameChange} style={{ marginTop: 6 }} error={!!billNameError} helperText={billNameError} value={billName} />
                                </Grid>
                                <Grid item>
                                    <InputLabel htmlFor="amount">金額</InputLabel>
                                    <Grid container spacing={0} alignItems="center" style={{ marginTop: 6 }}>
                                        {/* <Grid item>
                                            <FormControl fullWidth>
                                                <Select
                                                    value={currency}
                                                    onChange={handleCurrencyChange}
                                                    inputProps={{
                                                        name: "currency",
                                                        id: "currency-selector",
                                                    }}>
                                                    <MenuItem value="USD">$</MenuItem>
                                                    <MenuItem value="EUR">EUR</MenuItem>
                                                    <MenuItem value="JPY">JPY</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid> */}
                                        <Grid item xs>
                                            <TextField label="" fullWidth onChange={handleBillAmountChange} error={!!amountError} helperText={amountError} value={amount} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <InputLabel htmlFor="paid-by-who">誰付錢</InputLabel>
                                    <FormControl fullWidth style={{ marginTop: 6 }}>
                                        <Select
                                            value={payer}
                                            onChange={handlePayerChange}
                                            inputProps={{
                                                name: "member",
                                                id: "member-payer-select",
                                            }}
                                            error={!!payerError}>
                                            {groupMembers.map((member) => (
                                                <MenuItem key={member} value={member}>
                                                    {member}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item>
                                    <InputLabel htmlFor="paid-for-who">參與者</InputLabel>
                                    <FormControl fullWidth style={{ marginTop: 6 }}>
                                        <Select
                                            multiple
                                            value={participants}
                                            onChange={handleParticipantsChange}
                                            inputProps={{
                                                name: "member",
                                                id: "member-paid-select",
                                            }}
                                            error={!!participantsError}>
                                            {groupMembers.map((member) => (
                                                <MenuItem key={member} value={member}>
                                                    {member}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <div style={{ textAlign: "center", marginTop: 20 }}>
                        <Button onClick={handleSubmit} variant="contained" color="primary" style={{ marginRight: 10 }}>
                            新增
                        </Button>
                        <Button onClick={handleCancel} variant="contained" color="primary">
                            取消
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog open={creationStatusOpen} onClose={handleCreationStatusDialogClose} fullWidth maxWidth="sm">
                <DialogContent>
                    {statusMessage}
                    <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end", height: "100%" }}>
                        <Button onClick={handleCreationStatusDialogClose}>確定</Button>
                    </Box>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default NewBill;
