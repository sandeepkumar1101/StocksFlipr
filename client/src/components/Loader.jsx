import React from "react";
import { Box, CircularProgress, useTheme } from "@mui/material";

const Loader = () => {
  const theme = useTheme();
  return (
    <Box
      height="75vh"
      sx={{
        backgroundColor: theme.palette.background.alt,
      }}
      display="relative"
    >
      <CircularProgress
        sx={{
          top: "50%",
          left: "60%",
          position: "absolute",
        }}
      />
    </Box>
  );
};

export default Loader;
