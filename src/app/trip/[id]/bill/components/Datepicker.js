"use client";

import React, { useState, useContext } from "react";
import { DataContext } from "@/app/components/dataContext";
import { Paper, InputLabel } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const datepicker = () => {
    const { currentLang } = useContext(DataContext);
    const [date, setDate] = useState(new Date());

    const translate = (key) => {
        const translations = {
            date: {
                zh: "日期",
                en: "Date",
            },
        };
        return translations[key][currentLang];
    }

    const handleDateChange = (dates) => {
        setDate(dates);
    };

    return (
        <div>
            <InputLabel htmlFor="trip-time">{translate("date")}</InputLabel>
            <Paper variant="outlined" sx={{ borderRadius: "5px", padding: "15px" }}>
                <DatePicker
                    selected={date}
                    onChange={handleDateChange}
                    sx={{
                        width: "100%",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        padding: "5px",
                    }}
                />
            </Paper>
        </div>
    );
};
export default datepicker;
