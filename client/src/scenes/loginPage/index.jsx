import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form";
const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  return (
    <Box
      sx={{
        backgroundImage:
          "url(https://gist.githubusercontent.com/brettlangdon/85942af486eb79118467/raw/2a7409cd3c26a90b2e82bdc40dc7db18b92b3517/agFJkFJ.jpg)",
        objectFit: "cover",
      }}
    >
      <Box width="100%" height="100vh" p="1rem 6%" textAlign="center">
        <Typography
          fontWeight="bold"
          fontSize="32px"
          color={theme.palette.secondary[300]}
        >
          StocksWorld
        </Typography>
        <Box
          width={isNonMobileScreens ? "50%" : "93%"}
          p="2rem"
          m="2rem auto"
          borderRadius="1.5rem"
          sx={{
            backgroundColor: "#232726ab",
          }}
        >
          <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
            Welcome to StocksWorld
          </Typography>
          <Form />
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
