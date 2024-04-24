import React, { useState } from 'react';

const NewBill = () => {
    const handleDateChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
      };


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

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your logic to save the new bill here
        console.log('New bill submitted:', billName, billAmount);
        // Reset the form
        setBillName('');
        setBillAmount('');
    };

    return (
        <div>
            <Grid container spacing={4} alignItems="center">
                <Grid item>
                    <InputLabel htmlFor="trip-time">日期</InputLabel>
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

            <Grid container spacing={4} alignItems="center">
                <Grid item>      
                    <InputLabel htmlFor="bill-name">名稱</InputLabel>
                </Grid>


            </Grid>
        </div>
    );
};

export default NewBill;