import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Grid } from "@mui/material";
import { IconButton } from "@mui/material";

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

export default function ConfirmationDialogue(props) {
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
              background: "#222",
              color: "#fff",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">{props.headerText}</Typography>

            {props.icon && <IconButton>{props.icon}</IconButton>}
          </Box>

          <Box
            sx={{
              p: 2,
            }}
          >
            <Grid container spacing={2}>
              <Grid item md={12}>
                <Typography variant="small">
                  {props.confirmationQuestion}
                </Typography>
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
              <Grid item md={6}>
                <Box sx={{ width: "100%" }}>
                  <Button
                    color="primary"
                    variant="outlined"
                    onClick={props.handleCancle}
                  >
                    {props.cancleText}
                  </Button>
                </Box>
              </Grid>
              <Grid item md={6}>
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
                    onClick={props.handleApprove}
                  >
                    {props.approveText}
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
