'use client';

import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, Typography,DialogTitle, Button, Grid, InputLabel, TextField, Select, MenuItem, Paper, Box ,FormControl} from '@mui/material';
import Picker from './Picker';


const NewBill = ({ open, onClose}) => {

    const [billName, setBillName] = useState(null);
    const [payer, setPayer] = useState(null);
    const [involve, setInvolved] = useState([]);
    const [currency, setCurrency] = useState(null);
    const [amount, setBillAmount] = useState(null);

    const [creationStatusOpen, setCreationStatusOpen] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');

    const DialogStyles = {
        fullWidth: true,
        justifyContent: 'center',
        alignItems: 'center',
        width:'100%',
    };

    const handleBillNameChange = (e) => {
        setBillName(e.target.value);
    };

    const handleBillAmountChange = (e) => {
        setBillAmount(e.target.value);
    };

    const handleBillPaidByChange = (e) => {
        setPayer(e.target.value);
    }

    const handleBillPaidForChange = (e) => {
        const selectedMembers = Array.isArray(e.target.value) ? e.target.value : [e.target.value];
        setInvolved(selectedMembers);
    }

    const handleCurrencyChange =(e) => {
        setCurrency(e.target.value);
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        onClose();
     
    };

    const handleCancel = () => {
        setBillName(null);
        setPayer(null);
        setInvolved([]);
        setCurrency(null);
        setBillAmount(null);
        onClose();
    }

    const handleCreationStatusDialogClose = () => {
        setCreationStatusOpen(false)
        window.location.reload();
    }


    return (
        <div>
            <Dialog open={open} onClose={onClose} sx={DialogStyles} maxWidth="md" fullWidth>
                <DialogTitle>
                    <div style={{ display: 'flex', alignItems: 'center'}}>
                    <img src="/money.png" alt="money" style={{ width: 55, height: 55, cursor: 'pointer' }} />
                    <Typography variant="h5" >
                        新增花費
                    </Typography>
                    </div>
                </DialogTitle>

                <DialogContent style={{gap: 10}}>
                <Grid container spacing={0} fullWidth style={{justifyContent: 'center', gap:100}}>
                    {/* Left */}
                    <Grid item xs={8} md={4}>
                        <Picker/>
                    </Grid>

                    {/* Right */}
                    <Grid item xs={12} md={4} style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start'}}>
                        <Grid container spacing={2} direction="column">
                            <Grid item>
                                <InputLabel htmlFor="add-products">品項</InputLabel>
                                <TextField label="" fullWidth onChange={handleBillNameChange} style={{marginTop: 6}} />
                            </Grid>
                    <Grid item>
                        <InputLabel htmlFor="amount">金額</InputLabel>
                        <Grid container spacing={0} alignItems="center" style={{marginTop: 6}}>
                            <Grid item>
                                <FormControl fullWidth>
                                    <Select
                                        value={currency}
                                        onChange={handleCurrencyChange}
                                        inputProps={{
                                            name: 'currency',
                                            id: 'currency-selector',
                                        }}
                                    >
                                        <MenuItem value="USD">$</MenuItem>
                                        <MenuItem value="EUR">EUR</MenuItem>
                                        <MenuItem value="JPY">JPY</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs>
                                <TextField label="" fullWidth onChange={handleBillAmountChange} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <InputLabel htmlFor="paid-by-who">誰付錢</InputLabel>
                        <FormControl fullWidth style={{marginTop: 6}}>
                            <Select
                                value={payer} // 使用状态管理选定的成员
                                onChange={handleBillPaidByChange}
                                inputProps={{
                                    name: 'member',
                                    id: 'member-payer-select',
                                }}
                            >
                                {/* {members.map((member) => (
                                    <MenuItem key={member.id} value={member.id}>{member.name}</MenuItem>
                                ))} */}
                                <MenuItem value="You">你</MenuItem>
                                <MenuItem value="Eric">Eric</MenuItem>
                                <MenuItem value="Michelle">Michelle</MenuItem>
                            </Select>
                        </FormControl>
                
                    </Grid>
                    <Grid item>
                        <InputLabel htmlFor="paid-for-who">參與者</InputLabel>
                        <FormControl fullWidth style={{marginTop: 6}}>
                            <Select multiple
                                value={involve} 
                                onChange={handleBillPaidForChange} 
                                inputProps={{
                                    name: 'member',
                                    id: 'member-paid-select',
                                }}
                            >
                                {/* {members.map((member) => (
                                    <MenuItem key={member.id} value={member.id}>{member.name}</MenuItem>
                                ))} */}
                                <MenuItem value="You">你</MenuItem>
                                <MenuItem value="Eric">Eric</MenuItem>
                                <MenuItem value="Michelle">Michelle</MenuItem>
                                <MenuItem value="Michael">Michael</MenuItem>
                                <MenuItem value="Joseph">Joseph</MenuItem>
                                
                            </Select>
                        </FormControl>
                    
                    </Grid>
                </Grid>
            </Grid>

                    </Grid>

            <div style={{ textAlign: 'center', marginTop: 20 }}>
                <Button onClick={handleSubmit} variant="contained" color="primary" style={{ marginRight: 10 }}>新增</Button>
                <Button onClick={handleCancel} variant="contained" color="primary">取消</Button>
            </div>
            </DialogContent>
        </Dialog>

        <Dialog open={creationStatusOpen} onClose={handleCreationStatusDialogClose} fullWidth maxWidth="sm">
            <DialogContent>
                {statusMessage}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', height: '100%'}}>
                <Button onClick={handleCreationStatusDialogClose}>
                    確定
                </Button>
                </Box>
            </DialogContent>
        </Dialog>
        </div>
    );
};

export default NewBill;