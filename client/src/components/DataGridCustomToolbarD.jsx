import React from "react";
import { Search } from "@mui/icons-material";
import {
  IconButton,
  TextField,
  InputAdornment,
  useMediaQuery,
} from "@mui/material";
import {
  GridToolbarDensitySelector,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton,
} from "@mui/x-data-grid";
import FlexBetween from "./FlexBetween";

const DataGridCustomToolbar = ({ searchInput, setSearchInput, setSearch }) => {
  const isOnMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <GridToolbarContainer
      sx={{
        mt: "1rem",
      }}
    >
      <FlexBetween
        width="100%"
        sx={isOnMobile ? { flexDirection: "column" } : { flexDirection: "row" }}
      >
        <FlexBetween>
          <GridToolbarColumnsButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport />
        </FlexBetween>
      </FlexBetween>
    </GridToolbarContainer>
  );
};

export default DataGridCustomToolbar;
