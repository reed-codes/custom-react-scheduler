import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Radio from "@mui/material/Radio";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import EditIcon from "@mui/icons-material/Edit";
import Chip from "@mui/material/Chip";
import { Box, Button, IconButton, Typography } from "@mui/material";


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

  export default EventListItem