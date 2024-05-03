import React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { InputLabel } from '@mui/material';

const picker = () => {
  
    return (
    <div>
      <InputLabel htmlFor="trip-time">日期時間</InputLabel>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateTimePicker']}>
        <DateTimePicker/>
      </DemoContainer>
    </LocalizationProvider>
       

      </div>
    )

}
export default picker;