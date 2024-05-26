"use client";

import { postTransaction } from "@/services/postTransaction";
import { putTransaction } from "@/services/putTransaction";
import { DataContext } from "@/app/components/dataContext";
import { getToken } from '@/utils/getToken';
import { getTripGroupOverview } from "@/services/getTripGroupOverview";
import Picker from "./Picker";

import { useState, useContext, useEffect } from "react";
import dayjs from "dayjs";
import { Dialog, DialogContent, Typography, DialogTitle, Button, Grid, InputLabel, TextField, Select, Box, FormControl, MenuItem } from "@mui/material";

const NewBill = ({ open, onClose, group_id, reloadTabPanel, editMode = false, transactionData = null }) => {

    const { currentLang } = useContext(DataContext);

    const [groupMembers, setGroupMembers] = useState([]);
    const [groupMembersId, setGroupMembersId] = useState([]);
    // const [participantsGroupMembers, setParticipantsGroupMembers] = useState([]);
    // const [participantsGroupMembersId, setParticipantsGroupMembersId] = useState([]);

    const [billId, setBillId] = useState("");

    const [billName, setBillName] = useState("");
    const [billNameError, setBillNameError] = useState("");

    const [billDateTime, setBillDateTime] = useState(dayjs());
    const [billDateTimeError, setBillDateTimeError] = useState("");
    const [billDate, setBillDate] = useState(dayjs(billDateTime).format("YYYY-MM-DD"));
    const [billTime, setBillTime] = useState(dayjs(billDateTime).format("HH:mm"));

    const [payer, setPayer] = useState("");
    const [payerId, setPayerId] = useState("");
    const [payerError, setPayerError] = useState("");

    const [participants, setParticipants] = useState([]);
    const [participantsId, setParticipantsId] = useState([]);
    const [participantsError, setParticipantsError] = useState("");

    const [amount, setAmount] = useState("");
    const [amountError, setAmountError] = useState("");

    const [creationStatusOpen, setCreationStatusOpen] = useState(false);
    const [statusMessage, setStatusMessage] = useState("");
    
    const translate = (key) => {
        const translations = {
            newBill: {
                zh: "新增花費",
                en: "New Bill",
            },
            editBill: {
                zh: "編輯花費",
                en: "Edit Bill",
            },
            item: {
                zh: "品項",
                en: "Item",
            },
            amount: {
                zh: "金額",
                en: "Amount",
            },
            payer: {
                zh: "付款人",
                en: "Payer",
            },
            participants: {
                zh: "參與者",
                en: "Participants",
            },
            time: {
                zh: "時間",
                en: "Time",
            },
            edit: {
                zh: "修改",
                en: "Edit",
            },
            submit: {
                zh: "新增",
                en: "Submit",
            },
            cancel: {
                zh: "取消",
                en: "Cancel",
            },
            addSuccess: {
                zh: "新增成功",
                en: "Success",
            },
            addFail: {
                zh: "新增失敗",
                en: "Fail",
            },
            editSucess: {
                zh: "修改成功",
                en: "Success",
            },
            editFail: {
                zh: "修改失敗",
                en: "Fail",
            },
            fillItemName: {
                zh: "請輸入品項名稱",
                en: "Please fill in the item name",
            },
            fillAmount: {
                zh: "請輸入正確金額",
                en: "Please fill in the correct amount",
            },
            selectPayer: {
                zh: "請選擇付款人",
                en: "Please select a payer",
            },
            selectParticipants: {
                zh: "請選擇參與者",
                en: "Please select at least one participant",
            },
            selectDate: {
                zh: "請選擇日期",
                en: "Please select a date",
            },
        };
        return translations[key][currentLang];
    };

    useEffect(() => {
        // console.log("render newBill");
        async function fetch() {
            try {
                const Token = getToken();
                const data = await getTripGroupOverview(Token, group_id);
                if (data && data.length !== 0) {
                    setGroupMembers(data.user_names);
                    setGroupMembersId(data.user_ids);
                    // setParticipantsGroupMembers(data.user_names);
                    // setParticipantsGroupMembersId(data.user_ids);
                } else {
                    // console.error("No group members found");
                }
            } catch (error) {
                // console.error("Error fetching group members:", error);
            }
        }
        fetch();
    }, []);

    // use in edit mode, set the initial transaction data
    useEffect(() => {
        if (editMode && transactionData !== null) {
            // transactionData: {bill_id, bill_name, date, time, payer_name, amount, participants}
            setBillId(transactionData.bill_id);
            setBillName(transactionData.bill_name);
            setAmount(transactionData.amount);

            setPayer(transactionData.payer_name);
            setPayerId(groupMembersId[groupMembers.indexOf(transactionData.payer_name)]);
            // setParticipantsGroupMembers(groupMembers.filter((member) => member !== transactionData.payer_name));
            // setParticipantsGroupMembersId(groupMembersId.filter((memberId) => memberId !== groupMembersId[groupMembers.indexOf(transactionData.payer_name)]));

            // setParticipants(transactionData.participants.filter((participant) => participant !== transactionData.payer_name));
            // setParticipantsId(transactionData.participants.map((participant) => participantsGroupMembersId[participantsGroupMembers.indexOf(participant)]));
            setParticipants(transactionData.participants);
            setParticipantsId(transactionData.participants.map((participant) => groupMembersId[groupMembers.indexOf(participant)]));

            setBillDateTime(dayjs(`${transactionData.date} ${transactionData.time}`));
            setBillDate(dayjs(`${transactionData.date} ${transactionData.time}`).format("YYYY-MM-DD"));
            setBillTime(dayjs(`${transactionData.date} ${transactionData.time}`).format("HH:mm"));
        }
    }, [editMode, transactionData]);

    // post transaction
    const postTransactionData = async () => {
        try {
            const Token = getToken();
            let data = await postTransaction(Token, group_id, billName, amount, payerId, participantsId, billDate, billTime);

            if (data && data.length !== 0) {
                setStatusMessage(translate("addSuccess"));
                setCreationStatusOpen(true);
            } else {
                setStatusMessage(translate("addFail"));
                setCreationStatusOpen(true);
            }
        } catch (error) {
            // console.error("Error posting transaction:", error);
            setStatusMessage(translate("addFail"));
            setCreationStatusOpen(true);
        }
    };

    // put transaction
    const putTransactionData = async () => {
        try {
            let dataToSend = {
                bill_name: billName,
                amount: Number(amount),
                payer_id: payerId,
                participant: participantsId,
                date: billDate,
                time: billTime,
            };

            // console.log("putTransactionData dataToSend:", dataToSend);
            const Token = getToken();
            let data = await putTransaction(Token, group_id, billId, dataToSend);

            if (data && data.length !== 0) {
                setStatusMessage(translate("editSucess"));
                setCreationStatusOpen(true);
            } else {
                setStatusMessage(translate("editFail"));
                setCreationStatusOpen(true);
            }
        } catch (error) {
            // console.error("Error putting transaction:", error);
            setStatusMessage(translate("editFail"));
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
            setBillDateTimeError(translate("selectDate"));
        } else {
            setBillDateTimeError("");
        }
    };

    const handleBillNameChange = (e) => {
        handleChange(setBillName, setBillNameError, e.target.value, translate("fillItemName"));
    };

    const handleBillAmountChange = (e) => {
        handleChange(setAmount, setAmountError, e.target.value, translate("fillAmount"));
    };

    const handlePayerChange = (e) => {
        setPayerId(groupMembersId[groupMembers.indexOf(e.target.value)]);
        handleChange(setPayer, setPayerError, e.target.value, translate("selectPayer"));
        
        // if (participantsGroupMembers.includes(e.target.value)) {
        //     const selectedMembers = groupMembers.filter((member) => member !== e.target.value);
        //     const selectedMembersId = groupMembersId.filter((memberId) => memberId !== groupMembersId[groupMembers.indexOf(e.target.value)]);
        //     setParticipantsGroupMembers(selectedMembers);
        //     setParticipantsGroupMembersId(selectedMembersId);            
        // }
    };

    const handleParticipantsChange = (e) => {
        const selectedMembers = Array.isArray(e.target.value) ? e.target.value : [e.target.value];

        if (selectedMembers.length === 0) {
            setParticipantsError(translate("selectParticipants"));
        } else {
            setParticipantsError("");
            setParticipants(selectedMembers);
        }
        // setParticipants(selectedMembers);
        // setParticipantsId(selectedMembers.map((member) => participantsGroupMembersId[participantsGroupMembers.indexOf(member)]));
        // console.log("[handleParticipantsChange] selectedMembers:", selectedMembers);
        // console.log("[handleParticipantsChange] participantsId:", participantsId);
        setParticipants(selectedMembers);
        setParticipantsId(selectedMembers.map((member) => groupMembersId[groupMembers.indexOf(member)]));

    };

    const validateForm = () => {
        let isValid = true;

        if (billName === "") {
            // console.log("billName is empty");
            setBillNameError(translate("fillItemName"));
            isValid = false;
        }
        if (payer === "") {
            // console.log("payer is empty");
            setPayerError(translate("selectPayer"));
            isValid = false;
        }
        if (participants.length === 0) {
            // console.log("participants is empty");
            setParticipantsError(translate("selectParticipants"));
            isValid = false;
        }
        if (amount === "" || isNaN(amount)) {
            // console.log("amount is empty or not a number");
            setAmountError(translate("fillAmount"));
            isValid = false;
        }
        if (billDate === "" || billTime === "") {
            // console.log("billDate or billTime is empty");
            setBillDateTimeError(translate("selectDate"));
            isValid = false;
        }

        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (validateForm()) {
            if (editMode) {
                await putTransactionData();
            } else {
                await postTransactionData();
            }
        } else {
            // console.log("Form validation failed");
        }
    };
    const handleCancel = () => {
        setBillDateTime(dayjs());
        setBillName("");
        setPayer("");
        setParticipants([]);
        setParticipantsId([]);
        // setParticipantsGroupMembers(groupMembers);
        // setParticipantsGroupMembersId(groupMembersId);
        setAmount("");
        onClose();
    };

    const handleCreationStatusDialogClose = () => {
        setCreationStatusOpen(false);
        reloadTabPanel();
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
                        <Typography variant="h5">{editMode ? translate('editBill') : translate('newBill')}</Typography>
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
                                    <InputLabel htmlFor="add-products">{translate("item")}</InputLabel>
                                    <TextField label="" fullWidth onChange={handleBillNameChange} style={{ marginTop: 6 }} error={!!billNameError} helperText={billNameError} value={billName} />
                                </Grid>
                                <Grid item>
                                    <InputLabel htmlFor="amount">{translate("amount")}</InputLabel>
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
                                    <InputLabel htmlFor="paid-by-who">{translate("payer")}</InputLabel>
                                    <FormControl fullWidth style={{ marginTop: 6 }}>
                                        <Select
                                            value={payer}
                                            onChange={handlePayerChange}
                                            inputProps={{
                                                name: "member",
                                                id: "member-payer-select",
                                            }}
                                            error={!!payerError}>
                                            {groupMembers.map((member, index) => (
                                                <MenuItem key={index} value={member}>
                                                    {member}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item>
                                    <InputLabel htmlFor="paid-for-who">{translate("participants")}</InputLabel>
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
                                            {/* {participantsGroupMembers.map((member, index) => (
                                                <MenuItem key={index} value={member}>
                                                    {member}
                                                </MenuItem>
                                            ))} */}
                                            {groupMembers.map((member, index) => (
                                                <MenuItem key={index} value={member}>
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
                            {editMode ? translate("edit") : translate("submit")}
                        </Button>
                        <Button onClick={handleCancel} variant="contained" color="primary">
                            {translate("cancel")}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog open={creationStatusOpen} onClose={handleCreationStatusDialogClose} fullWidth maxWidth="sm">
                <DialogContent>
                    {statusMessage}
                    <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end", height: "100%" }}>
                        <Button onClick={handleCreationStatusDialogClose}>{translate("cancel")}</Button>
                    </Box>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default NewBill;