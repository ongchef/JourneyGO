import React, { useState, useContext } from "react";
import { DataContext } from "@/app/components/dataContext";
//import TimePicker from 'react-time-picker';
import { Paper, InputLabel } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

const timepicker = () => {
    const { currentLang } = useContext(DataContext);
    const [selectedTime, setSelectedTime] = useState(new Date());

    const translate = (key) => {
        const translations = {
            time: {
                zh: "時間",
                en: "Time",
            },
        };
        return translations[key][currentLang];
    }

    const handleTimeChange = (time) => {
        setSelectedTime(time.format("HH:mm"));
    };

    return (
        <div>
            <InputLabel htmlFor="trip-time">{translate("time")}</InputLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["TimePicker"]}>
                    <TimePicker label="" />
                </DemoContainer>
            </LocalizationProvider>
        </div>
    );
};
export default timepicker;
