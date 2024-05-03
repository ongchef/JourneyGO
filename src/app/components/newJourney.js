'use client';

import React, { useState, useContext } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Grid, InputLabel, TextField, Select, MenuItem, Paper, Box } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { DataContext } from '@/app/components/dataContext';

import { createTripGroup } from '@/services/createTripGroup';

const NewJourneyDialog = ({ open, onClose}) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [groupName, setGroupName] = useState('');
  const [country, setCountry] = useState("臺灣");
  const [inviteeEmail, setCompanionEmail] = useState('');
  const { Token } = useContext(DataContext);
  const [creationStatusOpen, setCreationStatusOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  
 // console.log('Token from newJourney:' + Token); 

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const handleGroupNameChange = (event) => {
    setGroupName(event.target.value);
  };

  // const handleCountryChange = (event) => {
  //   setCountry(event.target.value);
  // };

  const handleInviteeEmailChange = (event) => {
    setCompanionEmail(event.target.value);
  };


  const handleCancel = () => {
    setStartDate(null);
    setEndDate(null);
    onClose();
  };

  const handleSave = async () => {
    try {
      // console.log("Group Name: "+groupName);
      // console.log("Start Date: "+startDate);
      // console.log("End Date: "+endDate);
      // console.log("Country: "+country);
      // console.log("Invitee Email: "+inviteeEmail);

      const tripGroupData = await createTripGroup(Token, groupName, startDate, endDate, country, inviteeEmail);
      // console.log('Trip group created:', tripGroupData);

      if (!tripGroupData) {
        setStatusMessage('新增行程失敗!');
        setCreationStatusOpen(true);
        return;
      }
      setStatusMessage('已新增行程');
      setCreationStatusOpen(true);

      // onClose();
      // window.location.reload();
    } catch (error) {
      console.error('Error creating trip group:', error);
      setStatusMessage('新增行程失敗!');
      setCreationStatusOpen(true);
    }
  };

  const handleCreationStatusDialogClose = () => {
    setCreationStatusOpen(false)
    window.location.reload();
  }


  return (
  <div>
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>新增行程</DialogTitle>
      <DialogContent>
        <Grid container spacing={4} alignItems="center">
          <Grid item>
            <InputLabel htmlFor="trip-name">行程名稱</InputLabel>
          </Grid>
          <Grid item xs>
            <TextField label="行程名稱" fullWidth 
              onChange={handleGroupNameChange}
            />
          </Grid>
        </Grid>

        <Grid container spacing={4} alignItems="center">
          <Grid item>
            <InputLabel htmlFor="trip-location">選擇國家</InputLabel>
          </Grid>
          <Grid item xs>
            <TextField fullWidth defaultValue="臺灣"></TextField>
          {/* <Grid item xs>
            <Select id="trip-location" label="選擇國家" fullWidth>
              <MenuItem value="Taiwan">Taiwan</MenuItem>
              <MenuItem value="Paris">Paris</MenuItem>
            </Select>
            
          </Grid> */}
          </Grid>
        </Grid>

        <Grid container spacing={4} alignItems="center">
          <Grid item>
            <InputLabel htmlFor="add-companion">新增旅伴</InputLabel>
          </Grid>
          <Grid item xs>
            <TextField label="email" fullWidth 
              onChange={handleInviteeEmailChange}
            />
          </Grid>
        </Grid>

        <Grid container spacing={4} alignItems="center">
          <Grid item>
            <InputLabel htmlFor="trip-time">旅程時間</InputLabel>
          </Grid>
          <Grid item xs sx={{ minWidth: 200 }}>
            <Paper variant="outlined" sx={{ borderRadius: '5px', padding: '15px' }}>
              <DatePicker
                selected={startDate}
                onChange={handleDateChange}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                sx={{
                  width: '100%',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  padding: '5px',
                }}
              />
            </Paper>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>取消</Button>
        <Button onClick={handleSave} variant="contained" color="primary">儲存</Button>
      </DialogActions>
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

export default NewJourneyDialog;