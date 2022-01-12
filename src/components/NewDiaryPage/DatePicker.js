import React, { useEffect } from 'react';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { TextField } from '@mui/material';


const DatePicker = (props) => {
    const [value, setValue] = React.useState(new Date());
    const handleDateChange = (newValue) => {
        // console.log(newValue);
        props.onChangeDate(newValue);
        setValue(newValue);
    };
    useEffect(() => { 
        if(props.date) {
            setValue(props.date);
            // console.log("in DatePicker"+props.date);
        }
    }, [props.date]);
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
                label="Date"
                inputFormat="MM/dd/yyyy"
                value={value}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
    )
}

export default DatePicker;