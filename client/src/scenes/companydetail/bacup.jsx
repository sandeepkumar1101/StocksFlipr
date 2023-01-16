import React, { useMemo, useEffect, useState } from "react";
import Header from "components/Header";
import { Box, useTheme } from "@mui/material";
import { useParams } from "react-router-dom";
import CustomLine from "components/Graphs/Line";
import { useGetStockChartQuery } from "services/stockApi";
import Loader from "components/Loader";
import NotExist from "components/NotExist";
import { useGetStockDetailQuery } from "services/stockDetailApi";
import { useGetStockNewsQuery } from "services/stockNewsApi";
import { Grid, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import OverViewChart from "components/OverViewChart";
import NewsCard from "components/NewsCard";

const CompanyDetail = () => {
  const { id, name } = useParams();
  const [view, setView] = useState("1d");
  const theme = useTheme();
  const { data, isLoading } = useGetStockChartQuery(id);
  const { data: stockDetailData, isLoading: stockDetailLoading } =
    useGetStockDetailQuery(id);

  // do the call to news api after getting the company name
  const { data: stockNewsData, isLoading: stockNewsLoading } =
    useGetStockNewsQuery({
      newsCategory: name,
      count: 6,
    });
  console.log(stockNewsData);
  // create formated data object
  const [formattedData] = useMemo(() => {
    if (!data) return [];

    const { chartActulaData } = data;
    if (!chartActulaData) return [];
    const stockData = {
      color: theme.palette.primary.main,
      id: id,
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
  console.log(stockDetailData);

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title={name}
        key={id}
        subtitle={stockDetailData ? stockDetailData.data.SC_SUBSEC : ""}
      />
      <FormControl sx={{ mt: "1rem" }}>
        <InputLabel>View</InputLabel>
        <Select
          value={view}
          label="View"
          onChange={(e) => setView(e.target.value)}
        >
          <MenuItem value="1d">1D</MenuItem>
          <MenuItem value="5d">5D</MenuItem>
          <MenuItem value="1m">1M</MenuItem>
          <MenuItem value="3m">3M</MenuItem>
          <MenuItem value="5m">5M</MenuItem>
          <MenuItem value="1y">1Y</MenuItem>
          <MenuItem value="5y">5Y</MenuItem>
        </Select>
      </FormControl>
      {data && formattedData ? (
        <CustomLine formattedData={formattedData} />
      ) : (
        <>
          {data?.chartActulaData === null ? (
            <NotExist />
          ) : (
            <>
              <Loader />.
            </>
          )}{" "}
        </>
      )}
      <Box
        sx={{
          display: "block",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          padding: "2.5rem 2.5rem",
          backgroundColor: theme.palette.background.alt,
        }}
      >
        <Header title="Latest News" subtitle={name}></Header>
        <Grid sx={{ flexGrow: 1, mt: "1rem" }} container spacing={2}>
          <Grid item xs={12}>
            <Grid container justifyContent="flex-start" spacing={2}>
              {stockNewsData?.value.map((news, i) => (
                <Grid key={i} item>
                  <NewsCard key={i} data={news} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default CompanyDetail;
