import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Grid, InputLabel, TextField, Select, MenuItem, Paper } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const NewJourneyDialog = ({ open, onClose }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  const handleCancel = () => {
    setStartDate(null);
    setEndDate(null);
    onClose();
  };


  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>新增行程</DialogTitle>
      <DialogContent>
        <Grid container spacing={4} alignItems="center">
          <Grid item>
            <InputLabel htmlFor="trip-name">行程名稱</InputLabel>
          </Grid>
          <Grid item xs>
            <TextField label="行程名稱" fullWidth />
          </Grid>
        </Grid>

        <Grid container spacing={4} alignItems="center">
          <Grid item>
            <InputLabel htmlFor="trip-location">選擇國家</InputLabel>
          </Grid>
          <Grid item xs>
            <Select id="trip-location" label="選擇國家" fullWidth>
              <MenuItem value="Taiwan">Taiwan</MenuItem>
              <MenuItem value="Paris">Paris</MenuItem>
            </Select>
          </Grid>
        </Grid>

        <Grid container spacing={4} alignItems="center">
          <Grid item>
            <InputLabel htmlFor="add-companion">新增旅伴</InputLabel>
          </Grid>
          <Grid item xs>
            <TextField label="email" fullWidth />
          </Grid>
        </Grid>

        <Grid container spacing={4} alignItems="center">
          <Grid item>
            <InputLabel htmlFor="trip-time">旅程時間</InputLabel>
          </Grid>
          <Grid item xs sx={{ minWidth: 200 }}>
            <Paper elevation={4} variant="outlined" sx={{ borderRadius: '5px', padding: '15px' }}>
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
        <Button onClick={onClose} variant="contained" color="primary">儲存</Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewJourneyDialog;