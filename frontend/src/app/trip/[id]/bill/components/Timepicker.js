import React, { useState } from 'react';
//import TimePicker from 'react-time-picker';
import {Paper, InputLabel} from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';


const timepicker = () => {
    const [selectedTime, setSelectedTime] = useState(new Date());

    const handleTimeChange = (time) => {
        setSelectedTime(time.format('HH:mm'));
      }

    return (
    <div>
      <InputLabel htmlFor="trip-time">時間</InputLabel>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['TimePicker']}>
            <TimePicker label="" />
          </DemoContainer>
        </LocalizationProvider>
      </div>
    )
}
export default timepicker;