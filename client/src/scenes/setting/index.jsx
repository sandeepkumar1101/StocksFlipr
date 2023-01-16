import React from "react";
import {
  Box,
  Grid,
  useTheme,
  Typography,
  Divider,
  useMediaQuery,
} from "@mui/material";
import Header from "components/Header";

const Paper = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      <Box
        sx={{
          width: "20rem",
          height: "20rem",
          backgroundColor: "red",
          borderRadius: "10rem",
        }}
      ></Box>
    </Box>
  );
};

const Setting = () => {
  const theme = useTheme();
  const isOnMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Setting" subtitle="User Setting" />
      <Box
        sx={{
          backgroundColor: theme.palette.background.alt,
          padding: "1rem",
          height: "53rem",
        }}
      >
        <Grid container>
          <Grid md={12} sm={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box
                component="img"
                alt="profile"
                src={`http://localhost:5001/assets/${localStorage.getItem(
                  "picturePath"
                )}`}
                height="50%"
                width="80%"
                objectFit="cover"
                borderRadius="10%"
                sx={{ objectFit: "cover" }}
              ></Box>
            </Box>
          </Grid>
          <Grid md={12} sm={12}>
            <br />
            <br />
            <br />
            <br />
            <Divider
              sx={{
                mt: "0.5rem",
              }}
            />
            <br />
            <Box
              sx={{
                display: isOnMobile ? "" : "flex",
                gap: "1rem",

                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  display: isOnMobile ? "" : "flex",
                  gap: "1rem",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h4">Name - </Typography>
                <Typography color={theme.palette.secondary[300]} variant="h4">
                  {localStorage.getItem("firstName")}{" "}
                  {localStorage.getItem("lastName")}
                </Typography>
              </Box>
              <Divider
                sx={{
                  mt: "0.5rem",
                  mb: "0.5rem",
                }}
              />
              <Box
                sx={{
                  display: isOnMobile ? "" : "flex",
                  gap: "1rem",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h4">Email - </Typography>
                <Typography color={theme.palette.secondary[300]} variant="h4">
                  {localStorage.getItem("email")}
                </Typography>
              </Box>
              <Divider
                sx={{
                  mt: "0.5rem",
                  mb: "0.5rem",
                }}
              />
              <Box
                sx={{
                  display: isOnMobile ? "" : "flex",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h4">Account Created On :- </Typography>
                <Typography variant="h4" color={theme.palette.secondary[300]}>
                  {localStorage.getItem("created_at").slice(0, 10)}
                </Typography>
              </Box>
              <Divider
                sx={{
                  mt: "0.5rem",
                  mb: "0.5rem",
                }}
              />
              <Box>
                <Typography variant="h4">WatchList</Typography>
                <Typography variant="h5">
                  {localStorage.getItem("watchlist")}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Setting;
