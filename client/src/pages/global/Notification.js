import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function CustomizedSnackbars({ text, open, setOpen }) {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Snackbar
      open={open}
      onClose={handleClose}
      sx={{ width: "100%", marginLeft: "63px" }}
      variant='filled'
      message={text}
      action={action}
    ></Snackbar>
  );
}
