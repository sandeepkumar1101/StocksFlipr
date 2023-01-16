import React, { Component, useState } from "react";
import {
  Box,
  useTheme,
  CardActions,
  Card,
  Typography,
  CardContent,
  Button,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import Header from "components/Header";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import { useGetCompaniesQuery } from "state/api";
import { Link } from "react-router-dom";

const Companies = () => {
  const theme = useTheme();

  // values to be sent to the backend
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");

  const [searchInput, setSearchInput] = useState("");
  const { data, isLoading } = useGetCompaniesQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });

  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "scId",
      headerName: "Symbol",
      flex: 1,
    },
    {
      field: "bseId",
      headerName: "bse",
      flex: 1,
    },
    {
      field: "nseId",
      headerName: "nse",
      flex: 1,
    },
    {
      field: "_id",
      headerName: "Link",
      flex: 1,
      renderCell: (params) => (
        <Link
          style={{
            textDecoration: "none",
          }}
          to={`${params.id}/${params.row.name}`}
        >
          <Button
            sx={{
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.primary.main,
            }}
          >
            View More
          </Button>
        </Link>
      ),
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Company" subtitle="Entire list of Stocks" />
      <Box
        height="80vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: `${theme.palette.secondary[400]}`,
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.secondary[900],
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={(data && data.companies) || []}
          columns={columns}
          rowCount={(data && data.total) || 0}
          rowsPerPageOptions={[20, 50, 100]}
          pagination
          page={page}
          pageSize={pageSize}
          paginationMode="server"
          sortingMode="server"
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onSortModelChange={(newSortModel) => setSort(...newSortModel)}
          components={{ Toolbar: DataGridCustomToolbar }}
          componentsProps={{
            toolbar: { searchInput, setSearchInput, setSearch },
            baseButton: { variant: "text" },
          }}
        />
      </Box>
    </Box>
  );
};

export default Companies;
