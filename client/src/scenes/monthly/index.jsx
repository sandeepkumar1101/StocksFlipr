import React, { useMemo } from "react";
import { Box, useTheme } from "@mui/material";
import Header from "components/Header";
import { Line, ResponsiveLine } from "@nivo/line";
import { useGetSalesQuery } from "state/api";
import { useGetStockChartQuery } from "services/stockApi";
import { FmdBadTwoTone } from "@mui/icons-material";

const Monthly = () => {
  // const { data } = useGetSalesQuery();
  const theme = useTheme();
  const { data, isLoading } = useGetStockChartQuery("AE01");

  // create formated data object
  const [formattedData] = useMemo(() => {
    if (!data) return [];

    const { chartActulaData } = data;
    const stockData = {
      color: theme.palette.primary.main,
      id: "Stock",
      data: [],
    };

    Object.values(chartActulaData).forEach(({ time, value }) => {
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
  }, [data]);
  const DATE_FORMAT = "%Y-%m-%d %H:%M:%S";

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="MONTHLY SALES" subtitle="Chart of monthlysales" />
      <Box
        height="75vh"
        sx={{
          backgroundColor: theme.palette.background.alt,
        }}
      >
        {data ? (
          <ResponsiveLine
            data={formattedData}
            theme={{
              axis: {
                domain: {
                  line: {
                    stroke: theme.palette.secondary[200],
                  },
                },
                legend: {
                  text: {
                    fill: theme.palette.secondary[200],
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
                },
              },
              tooltip: {
                container: {
                  color: theme.palette.primary.main,
                },
              },
            }}
            colors={{ datum: "color" }}
            margin={{ top: 50, right: 110, bottom: 70, left: 60 }}
            axisTop={null}
            xScale={{
              type: "time",
              format: DATE_FORMAT,
              precision: "minute",
            }}
            // change format to hourly
            xFormat="time:%Y-%m-%d %H:%M:%S"
            axisBottom={{
              format: "%H:%M",
              tickRotation: 0,
              tickValues: "every hour",
              // tickValues: "every month"
            }}
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
            }}
            axisLeft={{
              legend: "count",
              legendOffset: -40,
            }}
            useMesh={true}
            enablePoints={false}
          />
        ) : (
          <>Loading...</>
        )}
      </Box>
    </Box>
  );
};

export default Monthly;
