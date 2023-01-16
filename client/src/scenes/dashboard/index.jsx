import React, { useMemo, useState } from "react";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import { ResponsiveLine } from "@nivo/line";
import {
  DownloadOutlined,
  Email,
  PointOfSale,
  PersonAdd,
  Traffic,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableHead,
  TableRow,
  Grid,
  Paper,
  MenuItem,
  Select,
  InputLabel,
  styled,
  Divider,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import CustomLine from "components/Graphs/Line";
import { useGetMarketIndexQuery } from "state/api";
import { useGetStockNewsQuery } from "services/stockNewsApi";
import LineNews from "components/LineNews";
import DataGridCustomToolbar from "components/DataGridCustomToolbarD";

const Dashboard = () => {
  const theme = useTheme();
  const [view, setView] = useState("9");
  const handleViewChange = (e) => {
    setView(e);
  };
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const { data, isLoading } = useGetMarketIndexQuery();
  const { data: stockNewsData, isLoading: stockNewsLoading } =
    useGetStockNewsQuery({
      newsCategory: "Indian Market",
      count: 2,
    });

  const isOnDashBoard = useMediaQuery(theme.breakpoints.down("lg"));
  const isOnMobile = useMediaQuery(theme.breakpoints.down("sm"));
  // create formated data object

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      <Box sx={{ flexGrow: 1 }}>
        <InputLabel>View</InputLabel>
        <Select
          value={view}
          label="View"
          onChange={(e) => handleViewChange(e.target.value)}
        >
          <MenuItem value="9">NIFTY 50</MenuItem>
          <MenuItem value="4">Sensex</MenuItem>
          <MenuItem value="23">NIFTY Bank</MenuItem>
        </Select>
      </Box>
      <Grid container spacing={2}>
        <Grid width="100%" item lg={8} md={12} sm={12}>
          <CustomLine onLoad={[]} id="1" symbol={view} isDashBoard={true} />
        </Grid>
        <Grid item lg={4} md={12} sm={12}>
          <Box
            mt="1.5rem"
            p="1.5rem"
            height={isOnMobile ? "100%" : "50vh"}
            backgroundColor={theme.palette.background.alt}
          >
            <Typography
              variant="h3"
              padding="0.5rem"
              color={theme.palette.secondary[300]}
            >
              {" "}
              Latest News{" "}
            </Typography>
            {stockNewsData?.value.map((news, i) => (
              <Box mb="0.5rem" key={`stockbox-${i}`}>
                <LineNews key={i} data={news} isDashBoard={true} />
                <Divider
                  key={`divider-${i}`}
                  sx={{
                    backgroundColor: theme.palette.secondary[100],
                  }}
                />
              </Box>
            ))}
          </Box>
        </Grid>

        <Grid lg={12} md={12} sm={12}>
          <Box
            xs={12}
            mt="40px"
            height="60vh"
            backgroundColor={theme.palette.background.alt}
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                width: "inherit",
                height: "inherit",
              },
              "& .MuiDataGrid-cell": {
                color: theme.palette.secondary[100],
                borderBottom: "1px solid #2e2e2e",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: theme.palette.background.alt,
                color: theme.palette.secondary[100],
                // borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme.palette.primary[500],
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: theme.palette.background.alt,
                color: theme.palette.secondary[100],
                borderTop: "none",
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `${theme.palette.secondary[100]} !important`,
              },
            }}
          >
            <Typography
              variant="h3"
              color={theme.palette.secondary[300]}
              padding="0.5rem"
              mt="1.5rem"
            >
              {" "}
              WorldWide Market Index{" "}
            </Typography>

            <DataGrid
              loading={isLoading || !data}
              getRowId={(row) => row.low}
              rows={data?.data || []}
              columns={isOnMobile ? columnSmall : columns}
              pageSize={12}
              components={{ Toolbar: DataGridCustomToolbar }}
            ></DataGrid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const columnSmall = [
  {
    field: "name",
    headerName: "Name",
    flex: 1,
  },
  {
    field: "changepercent",
    headerName: "Change %",
    flex: 1,
    // change color based on value
    renderCell: (params) => {
      return (
        //  check the substring is negative or not

        <Typography
          color={params.value[0] === "+" ? `green` : "red"}
          variant="h3"
        >
          {params.value}
        </Typography>
      );
    },
  },
  {
    field: "change",
    headerName: "Change",
    flex: 1,
    renderCell: (params) => {
      return (
        //  check the substring is negative or not

        <Typography
          color={params.value[0] === "+" ? `green` : "red"}
          variant="h3"
        >
          {params.value}
        </Typography>
      );
    },
  },
  {
    field: "dateoffetch",
    headerName: "Date",
    flex: 1,
  },
];
const columns = [
  {
    field: "name",
    headerName: "Name",
    flex: 1,
  },
  {
    field: "high",
    headerName: "High",
    flex: 1,
  },
  {
    field: "low",
    headerName: "Low",
    flex: 1,
  },
  {
    field: "last",
    headerName: "Last",
    flex: 1,
  },
  {
    field: "changepercent",
    headerName: "Change %",
    flex: 1,
    // change color based on value
    renderCell: (params) => {
      return (
        //  check the substring is negative or not

        <Typography
          color={params.value[0] === "+" ? `green` : "red"}
          variant="h6"
        >
          {params.value}
        </Typography>
      );
    },
  },
  {
    field: "change",
    headerName: "Change",
    flex: 1,
    renderCell: (params) => {
      return (
        //  check the substring is negative or not

        <Typography
          color={params.value[0] === "+" ? `green` : "red"}
          variant="h6"
        >
          {params.value}
        </Typography>
      );
    },
  },
  {
    field: "dateoffetch",
    headerName: "Date",
    flex: 1,
  },
];
