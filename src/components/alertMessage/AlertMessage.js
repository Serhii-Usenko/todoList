import { Alert, Snackbar } from "@mui/material";
import React, { useState } from "react";

const AlertMessage = ({alert, onClose}) => {
  const [open, setOpen] = useState(alert);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    onClose({
      open: false
    })
  };

  return (
    <Snackbar open={alert.open} autoHideDuration={4000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={alert.status} sx={{ width: "100%" }}>
        {alert.message}
      </Alert>
    </Snackbar>
  );
};

export default AlertMessage;
