import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';



const { TextField } = require("@mui/material");

<Dialog open={open} onClose={handleClose}>
    <DialogTitle>新的行程</DialogTitle>
    <DialogContent>
    <DialogContentText>新的行程</DialogContentText>
    <TextField
        autoFocus
        margin="dense"
        label="新的行程"
        type="text"
        fullWidth
        value={tripname}
        onChange={handleInputChange}
    />
    <TextField
            select
            margin="dense"
            label="選擇國家"
            fullWidth
            value={selectedCountry}
            onChange={handleCountryChange}
    />
    <TextField
            select
            margin="dense"
            label="選擇旅伴"
            fullWidth
            value={selectedCountry}
            onChange={handleCountryChange}
    />
    <TextField
            select
            margin="dense"
            label="旅程時間"
            fullWidth
            value={selectedDate}
            onChange={handleDateChange}
    />

    
    
    </DialogContent>
    <DialogActions>
        <Button onClick={handleClose}>取消</Button>
        <Button type="submit">建立行程</Button>
    </DialogActions>

</Dialog>