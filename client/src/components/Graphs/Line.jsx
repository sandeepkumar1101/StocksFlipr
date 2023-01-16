import React, { useMemo, useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import { useTheme, Box, useMediaQuery } from "@mui/material";
import { useGetStockHistoryQuery } from "services/stockHistoryApi";
import { Grid, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { linearGradientDef } from "@nivo/core";

const historyFormat = (view) => {
  // intial time now
  const now = new Date();
  // get the time before view based on the value of the view
  // view can be view=1y chane it to 1 year before
  const before = new Date(now.getTime() - view * 24 * 60 * 60 * 1000);
  // chnage it to timesstamp and round it to the nearest second
  const beforeTimeStamp = Math.round(before.getTime() / 1000);
  // get the current time and round it to the nearest second
  const nowTimeStamp = Math.round(now.getTime() / 1000);
  if (view === "1825") {
    return { beforeTimeStamp, nowTimeStamp, countback: 1975, resolution: "1D" };
  } else if (view === "366") {
    return { beforeTimeStamp, nowTimeStamp, countback: 365, resolution: "1D" };
  } else if (view === "150") {
    return { beforeTimeStamp, nowTimeStamp, countback: 300, resolution: "1D" };
  } else if (view === "90") {
    return { beforeTimeStamp, nowTimeStamp, countback: 524, resolution: "60" };
  } else if (view === "30") {
    return { beforeTimeStamp, nowTimeStamp, countback: 300, resolution: "60" };
  } else if (view === "5") {
    return { beforeTimeStamp, nowTimeStamp, countback: 350, resolution: "5" };
  } else if (view === "1") {
    return { beforeTimeStamp, nowTimeStamp, countback: 880, resolution: "1" };
  } else {
    return { beforeTimeStamp, nowTimeStamp, countback: 300, resolution: "1" };
  }
  return { beforeTimeStamp, nowTimeStamp, countback: 300, resolution: "1" };
};

const CustomLine = ({ onLoad, id, symbol, isDashBoard = false }) => {
  const [view, setView] = useState(isDashBoard ? "1" : "new");
  const theme = useTheme();
  const handleViewChange = (e) => {
    setView(e);
  };
  const isOnDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  const DATE_FORMAT = "%Y-%m-%d %H:%M:%S";
  // generate a date based on the DATE_FORMAT

  const [formattedData] = useMemo(() => {
    if (!onLoad) return [];

    if (!onLoad) return [];
    const stockData = {
      color: theme.palette.primary.main,
      id: id,
      data: [],
    };

    Object.values(onLoad).forEach(({ time, value }) => {
      const formatedDate = new Date(time * 1000);
      // get the time in the format of 12:00
      const newtime = `${formatedDate.getHours()}:${formatedDate.getMinutes()}`;
      const date = new Date(time * 1000);
      const dateString =
        date.getFullYear() +
        "-" +
        (date.getMonth() + 1).toString().padStart(2, "0") +
        "-" +
        date.getDate().toString().padStart(2, "0") +
        " " +
        date.getHours().toString().padStart(2, "0") +
        ":" +
        date.getMinutes().toString().padStart(2, "0") +
        ":" +
        date.getSeconds().toString().padStart(2, "0");

      stockData.data = [
        ...stockData.data,
        {
          x: dateString,
          y: value,
        },
      ];
    });

    const formattedData = [stockData];

    return [formattedData];
  }, [onLoad]);

  const { beforeTimeStamp, nowTimeStamp, countback, resolution } =
    historyFormat(view);
  const { data: historyData } = useGetStockHistoryQuery({
    symbol: symbol,
    from: beforeTimeStamp,
    to: nowTimeStamp,
    resolution: resolution,
    countback: countback,
  });

  // format the data to the format that the graph needs
  const formattedHistoryData = useMemo(() => {
    if (!historyData) return [];
    const stockData = {
      color: theme.palette.primary.main,
      id: id,
      data: [],
    };
    const { c, t } = historyData;
    if (!c || !t) return [];
    t.forEach((time, index) => {
      const formatedDate = new Date(time * 1000);
      // get the time in the format of 12:00
      const newtime = `${formatedDate.getHours()}:${formatedDate.getMinutes()}`;
      const date = new Date(time * 1000);
      const dateString =
        date.getFullYear() +
        "-" +
        (date.getMonth() + 1).toString().padStart(2, "0") +
        "-" +
        date.getDate().toString().padStart(2, "0") +
        " " +
        date.getHours().toString().padStart(2, "0") +
        ":" +
        date.getMinutes().toString().padStart(2, "0") +
        ":" +
        date.getSeconds().toString().padStart(2, "0");

      stockData.data = [
        ...stockData.data,
        {
          x: dateString,
          y: c[index],
        },
      ];
    });
    const formattedData = [stockData];
    return formattedData;
  }, [historyData]);

  return (
    <Box
      height={isDashBoard ? "50vh" : "90vh"}
      sx={{
        backgroundColor: theme.palette.background.alt,
        padding: "0",
        margin: "0",
        marginTop: "1.5rem",
      }}
    >
      <Box m="1.5rem 0" height={isDashBoard ? "40vh" : "80vh"}>
        <FormControl sx={{ mt: "1rem" }}>
          <Box
            display="flex"
            sx={{
              gap: "1rem",
            }}
          >
            <Box>
              <InputLabel>View</InputLabel>
              <Select
                value={view}
                label="View"
                onChange={(e) => handleViewChange(e.target.value)}
              >
                <MenuItem value="new">Today</MenuItem>
                <MenuItem value="1">1D</MenuItem>
                <MenuItem value="5">5D</MenuItem>
                <MenuItem value="30">1M</MenuItem>
                <MenuItem value="90">3M</MenuItem>
                <MenuItem value="150">6M</MenuItem>
                <MenuItem value="366">1Y</MenuItem>
                <MenuItem value="1825">5Y</MenuItem>
              </Select>
            </Box>
            <Box>{}</Box>
          </Box>
        </FormControl>

        {historyData ? (
          <ResponsiveLine
            data={view === "new" ? formattedData : formattedHistoryData}
            theme={{
              axis: {
                domain: {
                  line: {
                    stroke: theme.palette.secondary[200],
                  },
                },
                legend: {
                  text: {
                    fill: theme.palette.secondary[400],
                  },
                },
                ticks: {
                  line: {
                    stroke: theme.palette.secondary[200],
                    strokeWidth: 1,
                  },
                  text: {
                    fill: theme.palette.secondary[200],
                  },
                },
              },
              legends: {
                text: {
                  fill: theme.palette.secondary[200],
                  fontSize: 12,
                },
              },
              tooltip: {
                container: {
                  color: theme.palette.secondary[200],
                  background: theme.palette.background.alt,
                },
              },
            }}
            colors={{ datum: "color" }}
            margin={{ top: 10, right: 30, bottom: 60, left: 60 }}
            axisTop={null}
            xScale={{
              type: "time",
              format: DATE_FORMAT,
              precision: "minute",

              max: "auto",
              min: "auto",
            }}
            yScale={{
              type: "linear",

              min: "auto",
              max: "auto",
              nice: true,
              stacked: true,
              reverse: false,
            }}
            // change format to hourly
            xFormat="time:%Y-%m-%d %H:%M:%S"
            axisBottom={{
              // format: "%b %d",
              format: view === "new" ? "%H:%M" : "%Y-%m-%d",
              legend: "time",
              orient: "bottom",
              legend: "Time",
              legendOffset: 50,
              legendPosition: "middle",
              tickValues: isOnDesktop ? 5 : 3,
              tickSize: 5,
              tickRotation: isOnDesktop ? 0 : 45,
            }}
            axisLeft={{
              orient: "left",
              tickSize: 10,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Price",
              legendOffset: -50,
              legendPosition: "middle",
              legendSize: 20,
            }}
            curve="monotoneX"
            lineWidth={2}
            enableArea={true}
            enablePoints={false}
            enableGridX={false}
            enableGridY={true}
            useMesh={true}
            isInteractive={true}
          />
        ) : (
          "data not avaible"
        )}
      </Box>
    </Box>
  );
};

export default CustomLine;
