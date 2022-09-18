import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  borderRadius: "8px",
  bgcolor: "background.paper",
  boxShadow:
    "0px 2px 8px 4px #dedcdc, 1px 1px 4px 0px #e9e9e9, -3px 2px 4px 0px #e9e9e9",
  p: 4,
};

export default function ConfirmationModal({ open, handleModalClose }) {
  
  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="subtitle1" component="p">
          Are you sure you want to DELETE this entry?
        </Typography>
        <Box sx={{ textAlign: "end", mt: 2 }}>
          <Button
            onClick={() => handleModalClose(false)}
            sx={{
              "&:hover": {
                backgroundColor: "#1a7fff",
              },
              m: 1,
              backgroundColor: "#1a7fff",
              color: "#fff",
              borderRadius: "5px",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleModalClose(true)}
            sx={{
              "&:hover": {
                backgroundColor: "#B00020",
              },
              m: 1,
              backgroundColor: "#B00020",
              color: "#fff",
              borderRadius: "5px",
            }}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
