import "./scheduler.css";
import { useState } from "react";
import { Box, Container } from "@mui/material";
import SchedulerDatePicker from "./components/date-picker";
import EventsOfDayContainer from "./components/events-of-day-container";
import ConfirmationDialogue from "../confirmation-dialogue";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import randomColor from "randomcolor";
import { v4 as uuidv4 } from "uuid";

const ONE_DAY_IN_MILLISECONDS = 86400000;

const getBranchesWithColors = (events = [], branchesWithColors = []) => {
  //Getting unique list of branches from available schedules
  const branchesList = [...new Set(events.map((event) => event.Branch))];

  //List of branches and their unique color
  const branches = branchesList.map((branch) => {
    const matches = branchesWithColors.filter((brch) => brch.Name === branch); //checking if branch already in 'branchesWithColors' array and has color

    if (matches.length) return matches[0];
    else {
      return {
        Name: branch,
        Color: randomColor({
          format: "rgba",
          alpha: 1,
        }),
      };
    }
  });

  return branches;
};

function Scheduler() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [eventsData, setEventsData] = useState({
    events: [],
    branchesWithColors: [],
  });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [addProcedure, setAddProceure] = useState(false);
  const [openDeleteProcedureConfirmation, setOpenDeleteProcedureConfirmation] =
    useState(false);

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

  const handleUpdateEvents = async (evnt, id) => {
    /*
    ====================================
      make async call [post] to update events endpoint
    ====================================
    */

    try {
      //filtering out any events with the same id so we can insert the updated version
      //happens in case of an update and does not affect addition actions

      const date = `${currentDate.getDate()}-${currentDate.getMonth()}-${currentDate.getFullYear()}`;

      const updateEvent = {
        ...evnt,
        Id: id ? id : uuidv4(),
        Date: date,
      };

      const filteredEvents = eventsData.events.filter(
        (event) => event.Id !== updateEvent.Id
      );

      const updatedEventsList = [...filteredEvents, updateEvent];
      setEventsData({
        events: updatedEventsList,
        branchesWithColors: getBranchesWithColors(
          updatedEventsList,
          eventsData.branchesWithColors
        ),
      });
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
      const updatedEventsList = eventsData.events.filter(
        (event) => event.Id !== selectedEvent.Id
      );
      setEventsData({
        events: updatedEventsList,
        branchesWithColors: getBranchesWithColors(
          updatedEventsList,
          eventsData.branchesWithColors
        ),
      });
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
              events={eventsData.events}
              addProcedure={addProcedure}
              handleSelectProcedure={handleSelectProcedure}
              handleCloseAddProcedureDialogue={handleCloseAddProcedureDialogue}
              handleOpenAddProcedureDialogue={handleOpenAddProcedureDialogue}
              handleUpdateEvents={handleUpdateEvents}
              handleDeleteEvent={handleOpenProcedureDeleteConfirmationDialogue}
              handleEditEvent={handleEditEvent}
              selectedEvent={selectedEvent}
              branches={eventsData.branchesWithColors}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Scheduler;
