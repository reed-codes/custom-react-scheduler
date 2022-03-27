import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Grid, IconButton } from "@mui/material";
import TextField from "@mui/material/TextField";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TimePicker from "@mui/lab/TimePicker";

import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  overflow: "hidden",
  cursor: "default",
};

export default function AddProcedureDialogue(props) {
  const [procedure, setProcedure] = useState({
    Procedure: props.procedure.Procedure ? props.procedure.Procedure : "",
    Name: props.procedure.Name ? props.procedure.Name : "",
    Surname: props.procedure.Surname ? props.procedure.Surname : "",
    Branch: props.procedure.Branch ? props.procedure.Branch : "",
  });
  const [startTime, setStartTime] = useState(
    props.procedure.Time ? new Date(props.procedure.Time.FullStart) : null
  );
  const [endTime, setEndTime] = useState(
    props.procedure.Time ? new Date(props.procedure.Time.FullEnd) : null
  );

  const ALL_FIELDS_FILLED_IN =
    !Object.values(procedure).includes("") && startTime && endTime;
  const IS_UPDATE_ACTION = Boolean(props.procedure.Name);

  const handFieldChange = (e) => {
    setProcedure({
      ...procedure,
      [e.target.name]: e.target.value,
    });
  };

  const handleClose = () => {
    setProcedure({
      Procedure: "",
      Name: "",
      Surname: "",
      Branch: "",
    });
    props.handleClose();
  };

  const handCreateProcedure = () => {
    if (String(startTime) === "Invalid Date") {
      alert("Invalid start-time");
    } else if (String(endTime) === "Invalid Date") {
      alert("Invalid end-time");
    } else {
      const startHours = startTime.getHours();
      const endHours = endTime.getHours();
      const startMinutes = startTime.getMinutes();
      const endMinutes = endTime.getMinutes();

      const newProcadure = {
        ...procedure,
        Time: {
          FullStart: startTime,
          FullEnd: endTime,
          StartHours:
            String(startHours).length == 1
              ? "0" + String(startHours)
              : String(startHours),
          StartMinutes:
            String(startMinutes).length == 1
              ? "0" + String(startMinutes)
              : String(startMinutes),
          StartTimeFormat: String(startHours).length == 1 ? "am" : "pm",
          EndHours:
            String(endHours).length == 1
              ? "0" + String(endHours)
              : String(endHours),
          EndMinutes:
            String(endMinutes).length == 1
              ? "0" + String(endMinutes)
              : String(endMinutes),
          EndTimeFormat: String(endHours).length == 1 ? "am" : "pm",
        },
      };

      props.handleUpdateEvents(
        newProcadure,
        IS_UPDATE_ACTION,
        props.procedure.Id
      );
      handleClose();
    }
  };

  const doNothing = () => {};

  return (
    <Box>
      <Modal
        open={props.open}
        onClose={doNothing}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              width: "100%",
              p: 1,
              pl: 2,
              boxShadow: 1,
              background: "red",
              color: "#fff",
            }}
          >
            <Typography variant="h6">Add Procedure</Typography>
          </Box>

          <Box
            sx={{
              p: 2,
            }}
          >
            <Grid container spacing={2}>
              <Grid item sm={12}>
                <Typography variant="small">Fill in all fields</Typography>
              </Grid>

              <Grid item sm={12}>
                <TextField
                  fullWidth
                  name="Procedure"
                  label="Procedure"
                  variant="outlined"
                  onChange={handFieldChange}
                  value={procedure.Procedure}
                />
              </Grid>
              <Grid item sm={6}>
                <TextField
                  fullWidth
                  name="Name"
                  label="Name"
                  variant="outlined"
                  onChange={handFieldChange}
                  value={procedure.Name}
                />
              </Grid>

              <Grid item sm={6}>
                <TextField
                  fullWidth
                  name="Surname"
                  label="Surname"
                  variant="outlined"
                  onChange={handFieldChange}
                  value={procedure.Surname}
                />
              </Grid>

              <Grid item sm={12}>
                <TextField
                  fullWidth
                  name="Branch"
                  label="Branch"
                  variant="outlined"
                  onChange={handFieldChange}
                  value={procedure.Branch}
                />
              </Grid>

              <Grid item sm={12}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <TimePicker
                      value={startTime}
                      onChange={setStartTime}
                      renderInput={(params) => (
                        <TextField {...params} helperText="Start time" />
                      )}
                    />

                    <IconButton
                      sx={{
                        transform: "translateY(-10px)",
                      }}
                    >
                      <ArrowRightAltIcon />
                    </IconButton>

                    <TimePicker
                      value={endTime}
                      onChange={setEndTime}
                      renderInput={(params) => (
                        <TextField {...params} helperText="End time" />
                      )}
                    />
                  </Box>
                </LocalizationProvider>
              </Grid>
            </Grid>
          </Box>

          <Box
            sx={{
              p: 2,
              boxShadow: 1,
            }}
          >
            <Grid container spacing={2}>
              <Grid item sm={6}>
                <Box sx={{ width: "100%" }}>
                  <Button
                    color="primary"
                    variant="outlined"
                    onClick={handleClose}
                  >
                    Cancle
                  </Button>
                </Box>
              </Grid>
              <Grid item sm={6}>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    color="primary"
                    variant="outlined"
                    onClick={handCreateProcedure}
                    disabled={!ALL_FIELDS_FILLED_IN}
                  >
                    {IS_UPDATE_ACTION ? "Update" : "Add"}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
