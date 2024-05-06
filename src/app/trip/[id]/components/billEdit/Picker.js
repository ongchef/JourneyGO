// import { useState } from "react";
// import dayjs from "dayjs";

// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
// import { InputLabel } from "@mui/material";
// import { WidthFull } from "@mui/icons-material";


// function picker ({ billDateTime, billDateTimeError, handleBillDateTimeChange }) {
    
//     const datetimepickerStyles = {
//         display: "flex",
//         gap: "20px",
//         width: "20px",
//     };


//     return (
//         <div>
//             <InputLabel htmlFor="trip-time">日期時間</InputLabel>
//             <LocalizationProvider dateAdapter={AdapterDayjs}>
//                 <DemoContainer components={["DateTimePicker"]}>
//                     <DateTimePicker
//                         sx={datetimepickerStyles}
//                         value={billDateTime}
//                         onChange={(newValue) => {
//                             handleBillDateTimeChange(newValue);
//                             // console.log("billDateTime:", newValue);
//                         }}
//                         error={!!billDateTimeError}
//                     />
//                 </DemoContainer>
//             </LocalizationProvider>
//         </div>
//     );
// };
// export default picker;
