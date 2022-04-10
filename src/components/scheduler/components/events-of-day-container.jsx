import { useState } from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import Moment from "react-moment";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import AddProcedureDialogue from "./add-procedure-dialogue";
import TextField from "@mui/material/TextField";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import Autocomplete from "@mui/material/Autocomplete";
import EventListItem from "./event-item";

const EventsOfDayContainer = (props) => {
  const [branchFilter, setBranchFilter] = useState("");

  const eventsFilteredByBranch = branchFilter
    ? props.events.filter((evt) => evt.Branch === branchFilter)
    : props.events;

  const handleFilterByBranch = (branch) => {
    setBranchFilter(branch);
  };

  return (
    <>
      {props.selectedEvent && props.addProcedure && (
        <AddProcedureDialogue
          open={Boolean(props.addProcedure)}
          handleClose={props.handleCloseAddProcedureDialogue}
          handleUpdateEvents={props.handleUpdateEvents}
          procedure={props.selectedEvent}
        />
      )}

      <Box
        sx={{
          height: "550px",
          width: "100%",
          background: "#fff",
          boxShadow: 3,
          transform: "translate(0,0)",
          display: "flex",
          flexDirection: "column",
          cursor: "default",
        }}
      >
        <Header
          handleDayChange={props.handleDayChange}
          currentDate={props.currentDate}
        />

        <Box
          sx={{
            height: "100%",
            width: "100%",
            overflow: "auto",
            mt: 1,
            position: "relative",
          }}
        >
          <Box
            sx={{
              p: 2,
              width: "100%",
              position: "sticky",
              zIndex: 10,
              boxShadow: 1,
              background: "#fff",
              left: 0,
              right: 0,
              top: 0,
            }}
          >
            <BranchSelect
              branches={props.branches.map((branch) => branch.Name)}
              handleFilterByBranch={handleFilterByBranch}
            />
          </Box>
          <EventsList
            select={props.handleSelectProcedure}
            selectedEvent={props.selectedEvent}
            handleEditEvent={props.handleEditEvent}
            events={eventsFilteredByBranch}
            branches={props.branches}
          />

          <Box sx={{ minHeight: "5px" }} />
        </Box>

        <ToolBar
          selectedEvent={props.selectedEvent}
          handleDeleteEvent={props.handleDeleteEvent}
          handleOpenAddProcedureDialogue={props.handleOpenAddProcedureDialogue}
        />
      </Box>
    </>
  );
};

const Header = (props) => {
  return (
    <Box
      sx={{
        padding: 2,
        width: "100%",
        fontSize: "18px",
        boxShadow: 1,
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <IconButton
          color="primary"
          onClick={() => props.handleDayChange("PREV_DAY")}
        >
          <ArrowBackIosNewIcon />
        </IconButton>

        <Box>
          <Moment
            date={props.currentDate}
            format="dddd [the] Do [of] MMMM YYYY"
          />
        </Box>

        <IconButton
          color="primary"
          onClick={() => props.handleDayChange("NEXT_DAY")}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

const EventsList = (props) => {
  const sortedEvents = props.events.sort(
    (a, b) =>
      new Date(a.Time.FullStart).getTime() -
      new Date(b.Time.FullStart).getTime()
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        margin: 1,
        position: "relative",
        maxHeight: "100%",
      }}
    >
      {sortedEvents.map((evnt, index) => {
        return (
          <EventListItem
            key={"event-" + index}
            event={evnt}
            events={props.events}
            branches={props.branches}
            select={props.select}
            edit={props.handleEditEvent}
            selectedEvent={props.selectedEvent}
          />
        );
      })}

      {!props.events.length && <NoEventsUI />}
    </Box>
  );
};

const ToolBar = (props) => {
  return (
    <Box
      sx={{
        position: "sticky",
        bottom: "0",
        left: "0",
        width: "100%",
        p: 1,
        borderTop: "1px rgba(0,0,0,.2) solid",
        background: "#fff",
        zIndex: 10,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Button
        startIcon={<DeleteOutlinedIcon />}
        size="small"
        sx={{
          p: 1,
          display: "flex",
        }}
        color="primary"
        disabled={Boolean(!props.selectedEvent)}
        variant="outlined"
        onClick={props.handleDeleteEvent}
      >
        Delete Procedure
      </Button>

      <Button
        startIcon={<AddBoxOutlinedIcon />}
        size="small"
        sx={{
          p: 1,
          display: "flex",
        }}
        color="primary"
        onClick={props.handleOpenAddProcedureDialogue}
      >
        Add Procedure
      </Button>
    </Box>
  );
};

const NoEventsUI = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
        height: "300px",
      }}
    >
      <CalendarMonthIcon sx={{ fontSize: 50, mb: 1, color: "#1976d3" }} />
      <Typography variant="b" sx={{ color: "#1976d3" }}>
        No Events to display
      </Typography>
    </Box>
  );
};

const BranchSelect = (props) => {
  return (
    <Autocomplete
      id="branch select"
      options={props.branches}
      onChange={(event, newValue) => props.handleFilterByBranch(newValue)}
      fullWidth
      autoHighlight
      getOptionLabel={(branch) => branch}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{
            "& > img": { mr: 2, flexShrink: 0 },
          }}
          {...props}
        >
          <CorporateFareIcon />
          <Box sx={{ pl: 2, pr: 2 }}>{option}</Box>
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Filter by branch"
          fullWidth
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password", // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
};
export default EventsOfDayContainer;
