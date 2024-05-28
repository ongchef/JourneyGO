'use client';

import React, { useState } from 'react';
import {Paper, InputLabel} from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const datepicker = () => {
    const [date, setDate] = useState(new Date());
    
    const handleDateChange = (dates) => {
        setDate(dates);
      }

    return (
    <div>
      <InputLabel htmlFor="trip-time">日期</InputLabel>
      <Paper variant="outlined" sx={{ borderRadius: '5px', padding: '15px' }}>
          <DatePicker
              selected={date}
              onChange={handleDateChange}
              sx={{
                width: '100%',
                border: '1px solid #ccc',
                borderRadius: '5px',
                padding: '5px',
              }}
          />
      </Paper>
      </div>
    )
}
export default datepicker;