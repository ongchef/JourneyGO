'use client';
import React, { useState } from 'react';
import { jsx, css } from '@emotion/react';
import { Grid, Paper, Button, InputLabel, TextField, Typography, FormControl, Select, MenuItem} from '@mui/material';

import Picker from '../components/billEdit/Picker';



const NewBill = () => {

    const [billName, setBillName] = useState(null);
    const [payer, setPayer] = useState(null);
    const [paid, setPaid] = useState(null);
    const [currency, setCurrency] = useState(null);
    const [amount, setBillAmount] = useState(null);


    const handleBillNameChange = (e) => {
        setBillName(e.target.value);
    };

    const handleBillAmountChange = (e) => {
        setBillAmount(e.target.value);
    };

    const handleBillPaidByChange = (e) => {
        setBillPaidBy(e.target.value);
    }

    const handleBillPaidForChange = (e) => {
        setBillPaidFor(e.target.value);
    }

    const handleCurrencyChange =(e) => {
        setCurrency(e.target.value);
    }

    const handleCancel = () => {
        // setLoading(true);
        // router.push(`/trip/${data?.group_id}`);
        
    };

    const handleSubmit = (e) => {
        e.preventDefault();
     
    };
    
    return (
        <main>
        <div>
            <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0 0 10px' }}>
            <img src="/money.png" alt="money" style={{ width: 55, height: 55, cursor: 'pointer' }} />
            <Typography variant="h5" >
                新增花費
            </Typography>
        </div>

    <Grid container spacing={4} style={{ marginTop: 9, marginLeft: 8, marginRight: 8 }}>
        {/* Left */}
        <Grid item xs={6}>
            <Picker />
        </Grid>

        {/* Right */}
        
        <Grid item xs={6}>
            <Grid container spacing={4} direction="column">
                <Grid item>
                    <InputLabel htmlFor="add-products">品項</InputLabel>
                    <TextField label="" fullWidth onChange={handleBillNameChange} />
                </Grid>
        <Grid item>
            <InputLabel htmlFor="amount">金額</InputLabel>
            <Grid container spacing={0} alignItems="center">
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
                            {/* 其他货币选项 */}
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
            <FormControl fullWidth>
                <Select
                    value={payer} // 使用状态管理选定的成员
                    onChange={handleBillPaidByChange}
                    inputProps={{
                        name: 'member',
                        id: 'member-select',
                    }}
                >
                    {/* {members.map((member) => (
                        <MenuItem key={member.id} value={member.id}>{member.name}</MenuItem>
                    ))} */}
                </Select>
            </FormControl>
      
        </Grid>
        <Grid item>
            <InputLabel htmlFor="paid-for-who">參與者</InputLabel>
            <FormControl fullWidth>
                <Select
                    value={paid} 
                    onChange={handleBillPaidForChange} 
                    inputProps={{
                        name: 'member',
                        id: 'member-select',
                    }}
                >
                    {/* {members.map((member) => (
                        <MenuItem key={member.id} value={member.id}>{member.name}</MenuItem>
                    ))} */}
                </Select>
            </FormControl>
         
        </Grid>
    </Grid>
</Grid>

        </Grid>

        <div style={{ textAlign: 'center', marginTop: 20 }}>
            <Button onClick={handleSubmit} variant="contained" color="primary" style={{ marginRight: 10 }}>新增</Button>
            <Button onClick={handleCancel} variant="contained" color="primary">返回</Button>
        </div>
    </div>
    </main>
    );
};

export default NewBill;