import React from "react";
import Header from "components/Header";
import {
  Box,
  Card,
  CardActions,
  Button,
  Typography,
  CardContent,
  useTheme,
  Divider,
  Grid,
} from "@mui/material";
import { useGetTrendingStocksQuery } from "state/api";
import { TrendingUp, TrendingDown } from "@mui/icons-material";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    -
  </Box>
);

const Trending = () => {
  const { data, isLoading } = useGetTrendingStocksQuery();
  const theme = useTheme();

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Trending Stocks" />
      <Box sx={{ minWidth: 275 }}>
        <Grid container xs={12}>
          {data?.data.map((item) => (
            <Grid item md={4} sm={12}>
              <Card
                sx={{
                  m: "0.5rem",
                }}
                variant="outlined"
              >
                <CardContent>
                  <Typography color={theme} gutterBottom variant="h4">
                    {item.name}
                  </Typography>
                  {item.change[0] === "+" ? (
                    <Box display="flex" gap="0.5rem">
                      <TrendingUp
                        sx={{
                          color: "green",
                        }}
                      />
                      <Typography variant="h4" sx={{ color: "green" }}>
                        {item.change}
                        {bull}
                        {/* substring */}
                        {item.changepercent.substring(1, 100)}
                      </Typography>
                    </Box>
                  ) : (
                    <Box display="flex">
                      <TrendingDown
                        sx={{
                          color: "red",
                        }}
                      />
                      <Typography variant="h4" sx={{ color: "red" }}>
                        {item.change}
                        {bull}
                        {/* substring */}
                        {item.changepercent.substring(1, 100)}
                      </Typography>
                    </Box>
                  )}
                  <Divider
                    sx={{
                      mt: "0.5rem",
                    }}
                  />
                  <br />
                  <Box
                    sx={{
                      display: "flex",
                      gap: "1rem",
                    }}
                  >
                    <Typography variant="body1">High - {item.high}</Typography>
                    <Typography variant="body1">Low - {item.low}</Typography>
                  </Box>
                  <Divider
                    sx={{
                      mt: "0.5rem",
                      mb: "0.5rem",
                    }}
                  />
                  <Typography variant="body1">Last - {item.last}</Typography>
                  <Divider
                    sx={{
                      mt: "0.5rem",
                      mb: "0.5rem",
                    }}
                  />
                  <Typography variant="body1">
                    Date - {item.dateoffetch}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Trending;
