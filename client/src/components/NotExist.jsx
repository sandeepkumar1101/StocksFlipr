import React from "react";
import { Box, CircularProgress, Typography, useTheme } from "@mui/material";
import { ResponsiveLine } from "@nivo/line";

const NotExist = () => {
  const theme = useTheme();

  return (
    // box background be like grid background
    <Box
      height="75vh"
      sx={{
        backgroundColor: theme.palette.background.alt,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          paddingTop: "20vh",
        }}
      >
        Graph Not Exist For This Company
      </Typography>
    </Box>
  );
};

export default NotExist;
