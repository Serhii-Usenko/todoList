import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import React from "react";

const FilterButtons = ({isInProgress, isInProgressComplete, inProgressAll}) => {
  return (
    <Box
      sx={{
        display: "flex",
				mt: '20px',
        alignItems: "center",
        "& > *": {
          m: 1,
        },
      }}
    > <Typography>Filter:</Typography>
      <ButtonGroup variant="contained" aria-label="outlined button group">
        <Button sx={{mr: '10px'}} onClick={isInProgress}>In Progress</Button>
        <Button sx={{mr: '10px'}} onClick={isInProgressComplete}>Complete</Button>
        <Button sx={{mr: '10px'}} onClick={inProgressAll}>All</Button>
      </ButtonGroup>
    </Box>
  );
};

export default FilterButtons;
