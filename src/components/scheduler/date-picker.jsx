import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import StaticDatePicker from "@mui/lab/StaticDatePicker";


export default function SchedulerDatePicker(props) {

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StaticDatePicker
        displayStaticWrapperAs="desktop"
        value={props.currentDate}
        onChange={(currentDate) => props.handleCurDateChange(currentDate)}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
