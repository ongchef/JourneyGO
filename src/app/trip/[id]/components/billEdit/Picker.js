import { useState, useContext } from "react";
import dayjs from "dayjs";
import { DataContext } from "@/app/components/dataContext";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { InputLabel } from "@mui/material";
import { WidthFull } from "@mui/icons-material";


function picker ({ billDateTime, billDateTimeError, handleBillDateTimeChange }) {

    const { currentLang } = useContext(DataContext);

    const translate = (key) => {
        const translations = {
            dateTime: {
                zh: "日期時間",
                en: "Date Time",
            },
        }
        return translations[key][currentLang];
    }
    
    const datetimepickerStyles = {
        display: "flex",
        gap: "20px",
        width: "20px",
    };


    return (
        <div>
            <InputLabel htmlFor="trip-time">{translate("dateTime")}</InputLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                    <DateTimePicker
                        sx={datetimepickerStyles}
                        value={billDateTime}
                        onChange={(newValue) => {
                            handleBillDateTimeChange(newValue);
                            // console.log("billDateTime:", newValue);
                        }}
                        error={!!billDateTimeError}
                    />
                </DemoContainer>
            </LocalizationProvider>
        </div>
    );
};
export default picker;
