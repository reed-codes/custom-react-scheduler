import { Box, Button, IconButton, Typography } from "@mui/material";
import Moment from "react-moment";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Radio from "@mui/material/Radio";

import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import EditIcon from "@mui/icons-material/Edit";

import AddProcedureDialogue from "./add-procedure-dialogue";
import Chip from "@mui/material/Chip";

const EventsOfDayContainer = (props) => {
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
          height: "500px",
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
          }}
        >
          <EventsList
            select={props.handleSelectProcedure}
            selectedEvent={props.selectedEvent}
            handleEditEvent={props.handleEditEvent}
            events={props.events}
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

        <Box className="animate__animated animate__bounce">
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

const EventListItem = (props) => {
  const filteredBranches = props.branches.filter(
    (branch) => branch.Name === props.event.Branch
  );
  const branch = filteredBranches[0];

  return (
    <Accordion
      sx={{ mb: 1, background: "#fff", borderTop: `5px ${branch.Color} solid` }}
      className="clickable"
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            position: "relative",
          }}
        >
          <Chip
            label={props.event.Branch}
            sx={{ mb: 1, borderColor: branch.Color }}
            size="small"
            variant="outlined"
          />

          <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
            <Radio
              onClick={(e) => {
                e.stopPropagation();
                props.select(props.event);
              }}
              checked={props.event.Id === props.selectedEvent?.Id}
              value={props.event.Id}
              control={<Radio />}
              label={props.event.Procedure}
              sx={{ mr: 1 }}
            />
            <Typography>{props.event.Procedure}</Typography>
          </Box>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              gap: 1,
            }}
          >
            <Button
              startIcon={<AccessAlarmsIcon />}
              size="small"
              sx={{
                p: 1,
                display: "flex",
                fontSize: "12px",
                transform: "scale(.9)",
                pointerEvents: "none",
              }}
            >
              <Box>{`${props.event.Time.StartHours}:${props.event.Time.StartMinutes} ${props.event.Time.StartTimeFormat}`}</Box>
              <ArrowRightAltIcon />
              <Box>{`${props.event.Time.EndHours}:${props.event.Time.EndMinutes} ${props.event.Time.EndTimeFormat}`}</Box>
            </Button>

            <Button
              startIcon={<EditIcon />}
              size="small"
              sx={{
                p: 1,
                display: "flex",
                fontSize: "12px",
                transform: "scale(.9)",
              }}
              onClick={() => {
                props.edit(props.event);
              }}
            >
              Edit
            </Button>
          </Box>
        </Box>
      </AccordionSummary>

      <AccordionDetails sx={{ pl: "45px" }}>
        <Box sx={{ display: "flex" }}>
          <Typography sx={{ mr: 1, fontSize: "15px", fontWeight: 700 }}>
            Name :{" "}
          </Typography>
          <Typography sx={{ mr: 1, fontSize: "15px" }}>
            {props.event.Name}
          </Typography>
        </Box>

        <Box sx={{ display: "flex" }}>
          <Typography sx={{ mr: 1, fontSize: "15px", fontWeight: 700 }}>
            Surname :{" "}
          </Typography>
          <Typography sx={{ mr: 1, fontSize: "15px" }}>
            {props.event.Surname}
          </Typography>
        </Box>

        <Box sx={{ display: "flex" }}>
          <Typography sx={{ mr: 1, fontSize: "15px", fontWeight: 700 }}>
            Radiologist :{" "}
          </Typography>
          <Typography sx={{ mr: 1, fontSize: "15px" }}>
            {props.event.Radiologist}
          </Typography>
        </Box>

        <Box sx={{ display: "flex" }}>
          <Typography sx={{ mr: 1, fontSize: "15px", fontWeight: 700 }}>
            Branch :{" "}
          </Typography>
          <Typography sx={{ mr: 1, fontSize: "15px" }}>
            {props.event.Branch}
          </Typography>
        </Box>
      </AccordionDetails>
    </Accordion>
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

export default EventsOfDayContainer;
