import { useState, useEffect } from "react";
import { Box, Container } from "@mui/material";
import "./App.css";
import SchedulerDatePicker from "./components/date-picker";
import EventsOfDayContainer from "./components/events-of-day-container";
import ConfirmationDialogue from "./components/confirmation-dialogue";

import PriorityHighIcon from "@mui/icons-material/PriorityHigh";

import { v4 as uuidv4 } from "uuid";

const ONE_DAY_IN_MILLISECONDS = 86400000;

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [addProcedure, setAddProceure] = useState(false);
  const [openDeleteProcedureConfirmation, setOpenDeleteProcedureConfirmation] =
    useState(false);

  // useEffect(() => {
  //   setEvents(EVENTS);
  // }, []);

  // useEffect(() => {
  //   setEvents(EVENTS);
  // }, [currentDate]);

  const handleSelectProcedure = (evnt) => {
    if (evnt.Id === selectedEvent?.Id) {
      setSelectedEvent(null);
    } else {
      setSelectedEvent(evnt);
    }
  };

  const handleCloseAddProcedureDialogue = () => {
    setAddProceure(false);
    setSelectedEvent(null);
  };

  const handleOpenAddProcedureDialogue = () => {
    setSelectedEvent({});
    setAddProceure(true);
  };

  const handleUpdateEvents = async (evnt, IS_UPDATE_ACTION, id) => {
    let updateEvent = null;
    const date = `${currentDate.getDay()}-${currentDate.getMonth()}-${currentDate.getFullYear()}`;

    if (IS_UPDATE_ACTION) {
      updateEvent = {
        ...evnt,
        Id: id,
        Date: date,
        Timestamp: currentDate.getTime(),
      };
    } else {
      updateEvent = {
        ...evnt,
        Id: uuidv4(),
        Date: date,
        Timestamp: currentDate.getTime(),
      };
    }

    /*
    ====================================
      make async call [post] to update events endpoint
    ====================================
    */

    try {
      //filtering out any events with the same id so we can insert the updated version
      //happens in case of an update and does not affect addition actions
      const filteredEvents = events.filter((event) => event.Id !== evnt.Id);
      setEvents([...filteredEvents, evnt]);
      setSelectedEvent(null);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleDeleteEvent = async () => {
    /*
    ====================================
      make async call [post] to update events endpoint
    ====================================
    */
    try {
      setEvents(events.filter((event) => event.Id !== selectedEvent.Id));
      setSelectedEvent(null);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleEditEvent = (evt) => {
    setSelectedEvent(evt);
    setAddProceure(true);
  };

  const handleDayChange = (action) => {
    const curTimestamp = currentDate.getTime();
    const newDateTimestamp =
      action === "NEXT_DAY"
        ? curTimestamp + ONE_DAY_IN_MILLISECONDS
        : curTimestamp - ONE_DAY_IN_MILLISECONDS;
    setCurrentDate(new Date(newDateTimestamp));
  };

  const handleCurDateChange = (date) => setCurrentDate(date);

  const handleCloseProcedureDeleteConfirmationDialogue = () => {
    setOpenDeleteProcedureConfirmation(false);
  };
  const handleOpenProcedureDeleteConfirmationDialogue = () => {
    setOpenDeleteProcedureConfirmation(true);
  };

  const handleApproveProcedureDeletion = () => {
    handleDeleteEvent();
    handleCloseProcedureDeleteConfirmationDialogue();
  };

  const handleCancleProcedureDeletion = () => {
    handleCloseProcedureDeleteConfirmationDialogue();
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
      }}
    >
      <ConfirmationDialogue
        handleClose={handleCloseProcedureDeleteConfirmationDialogue}
        handleApprove={handleApproveProcedureDeletion}
        handleCancle={handleCancleProcedureDeletion}
        headerText="Delete Procedure"
        cancleText="No, Cancle"
        approveText="Yes, Delete"
        open={openDeleteProcedureConfirmation}
        icon={<PriorityHighIcon sx={{ color: "red" }} />}
        confirmationQuestion={
          "Are you sure you want to delete this procedure ?"
        }
      />

      <Container maxWidth="lg">
        <Box
          sx={{
            width: "100%",
            height: "100vh",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              flex: "1",
              background: "red",
            }}
          >
            <SchedulerDatePicker
              handleCurDateChange={handleCurDateChange}
              currentDate={currentDate}
            />
          </Box>

          <Box
            sx={{
              flex: "1",
            }}
          >
            <EventsOfDayContainer
              handleDayChange={handleDayChange}
              currentDate={currentDate}
              events={events}
              addProcedure={addProcedure}
              handleSelectProcedure={handleSelectProcedure}
              handleCloseAddProcedureDialogue={handleCloseAddProcedureDialogue}
              handleOpenAddProcedureDialogue={handleOpenAddProcedureDialogue}
              handleUpdateEvents={handleUpdateEvents}
              handleDeleteEvent={handleOpenProcedureDeleteConfirmationDialogue}
              handleEditEvent={handleEditEvent}
              selectedEvent={selectedEvent}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default App;
