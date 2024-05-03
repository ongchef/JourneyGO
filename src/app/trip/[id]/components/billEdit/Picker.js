import React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { InputLabel } from '@mui/material';
import { WidthFull } from '@mui/icons-material';

const picker = () => {
  
    const [selectedDate, handleDateChange] = React.useState(new Date());

    const datetimepickerStyles = {
        display: 'flex',
        gap: '20px',
        width: '20px',
    }

    return (
    <div>
      <InputLabel htmlFor="trip-time">日期時間</InputLabel>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateTimePicker']}>
        <DateTimePicker sx={datetimepickerStyles}/>
      </DemoContainer>
    </LocalizationProvider>
       

      </div>
    )

}
export default picker;