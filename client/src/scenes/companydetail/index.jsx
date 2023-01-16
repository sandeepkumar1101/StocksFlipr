import React, { useMemo, useEffect, useState } from "react";
import Header from "components/Header";
import { Box, Divider, useMediaQuery, useTheme } from "@mui/material";
import { useParams } from "react-router-dom";
import CustomLine from "components/Graphs/Line";
import { useGetStockChartQuery } from "services/stockApi";
import Loader from "components/Loader";
import NotExist from "components/NotExist";
import { useGetStockDetailQuery } from "services/stockDetailApi";
import { useGetStockNewsQuery } from "services/stockNewsApi";
import CsvDownloadButton from "react-json-to-csv";
import {
  Grid,
  FormControl,
  InputLabel,
  Typography,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import OverViewChart from "components/OverViewChart";
import NewsCard from "components/NewsCard";
import { useGetCompanyQuery } from "state/api";
import { useGetStockHistoryQuery } from "services/stockHistoryApi";

const CompanyDetail = () => {
  const { id, name } = useParams();
  // const [view, setView] = useState("1d");
  const theme = useTheme();
  const { data: companyDetail, isLoading: companyLoading } =
    useGetCompanyQuery(id);
  const { data, isLoading } = useGetStockChartQuery(companyDetail?.scId);
  const { data: stockDetail, isLoading: stockDetailLoading } =
    useGetStockDetailQuery(companyDetail?.scId);

  const [dowData, setDowData] = useState([]);
  const isOnMobile = useMediaQuery(theme.breakpoints.up("sm"));
  const stockDetailArray = useMemo(() => {
    if (!stockDetail) return null;
    if (stockDetail.data === null) return null;
    const { data } = stockDetail;
    const stockDetailArray = Object.entries(data).map(([key, value]) => ({
      key,
      value,
    }));
    return stockDetailArray;
  }, [stockDetail]);

  const { data: stockNewsData, isLoading: stockNewsLoading } =
    useGetStockNewsQuery({
      newsCategory: name,
      count: 6,
    });

  const exportToJson = (e, name) => {
    e.preventDefault();
    downloadFile({
      data: JSON.stringify(stockDetail.data),
      fileName: "users.json",
      fileType: "text/json",
    });
  };
  const downloadFile = ({ data, fileName, fileType }) => {
    // Create a blob with the data we want to download as a file
    const blob = new Blob([data], { type: fileType });
    // Create an anchor element and dispatch a click event on it
    // to trigger a download
    const a = document.createElement("a");
    a.download = fileName;
    a.href = window.URL.createObjectURL(blob);
    const clickEvt = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    a.dispatchEvent(clickEvt);
    a.remove();
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header title={name} key={id} />
      <Box
        pb={5}
        sx={{
          backgroundColor: theme.palette.background.alt,
        }}
      >
        {data && data.chartActulaData ? (
          <CustomLine
            onLoad={data.chartActulaData}
            id={id}
            symbol={companyDetail.bseId}
          />
        ) : (
          <>
            {data && data.chartActulaData === null ? (
              <NotExist />
            ) : (
              <>
                <Loader />.
              </>
            )}{" "}
          </>
        )}
      </Box>
      <Divider />
      <Box
        sx={{
          backgroundColor: theme.palette.background.alt,
          padding: "2.5rem 2.5rem",
        }}
        mt="1rem"
      >
        {/* show here the stock info  */}
        <Button
          component="button"
          sx={{
            mb: "2rem",
            backgroundColor: theme.palette.primary.main,
            color: "black",
            "&:hover": {
              backgroundColor: theme.palette.secondary[500],
            },
          }}
          onClick={(e) => exportToJson(e, name)}
        >
          Download Company Detail
        </Button>
        <table
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <tr
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          ></tr>
          <tr
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            {stockDetailArray ? (
              <Grid container spacing={2}>
                {stockDetailArray.map(({ key, value }) => (
                  <Grid lg={4} sm={6} md={4}>
                    <td
                      key={key}
                      style={{
                        display: "flex",
                      }}
                    >
                      {key}- &nbsp;
                      <Typography
                        sx={{
                          fontWeight: "bold",
                        }}
                        variant="h5"
                        color={theme.palette.secondary[500]}
                      >
                        {value}
                      </Typography>
                    </td>
                    <Divider />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <> Loading</>
            )}
          </tr>
        </table>
      </Box>
      <Box
        sx={{
          display: "block",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          padding: "2.5rem 0.5rem",

          backgroundColor: theme.palette.background.alt,
        }}
      >
        <Header title="Latest News" subtitle={name}></Header>
        <Grid sx={{ flexGrow: 1, mt: "1rem" }} container spacing={2}>
          <Grid item xs={12}>
            <Grid
              container
              sx={{
                justifyContent: "flex-start",
              }}
              spacing={2}
            >
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
