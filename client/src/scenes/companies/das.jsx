import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
  Input,
} from "@mui/material";
import { Link } from "react-router-dom";

import Header from "components/Header";
import { Description } from "@mui/icons-material";
import { useGetCompaniesQuery } from "state/api";

const Product = ({ _id, name, scId }) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent
        sx={{
          // assign random background light colors also math.random should geterate a number between 0 and 9
          backgroundColor: theme.palette.secondary[800],
        }}
      >
        <Typography variant="h3" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
          {scId}
        </Typography>
      </CardContent>
      <CardActions>
        <Link
          to={`/company/${scId}/${name}`}
          style={{
            color: "inherit",
            textDecoration: "none",
          }}
        >
          <Button variant="primary" size="small" onClick={() => {}}>
            More Details
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

const Companies = () => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");

  const { data: companiesList, isLoading } = useGetCompaniesQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });
  const isNonMobile = useMediaQuery(theme.breakpoints.up("sm"));
  const [searchTerm, setSearchTerm] = useState("");
  const [companies, setCompanies] = useState();
  const [filteredData, setFilteredData] = useState();

  useEffect(() => {
    setCompanies(companiesList?.companies);

    const filteredData = companiesList?.companies.filter((item) =>
      item.name.toLowerCase().includes(searchTerm)
    );

    setCompanies(filteredData);
  }, [companiesList, searchTerm]);

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Companies" subtitle="All Companies" />
      <Box
        mt="10px"
        sx={{
          backgroundColor: theme.palette.background.alt,
          borderRadius: "0.55rem",
          padding: "0.5rem",
          height: "3rem",
        }}
      >
        <Input
          fullWidth
          placeholder="Search Companies"
          onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
        ></Input>
      </Box>
      {companies || !isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4,minmax(0,1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {companies?.map(({ _id, name, scId }) => (
            <Product key={_id} _id={_id} name={name} scId={scId} />
          ))}
        </Box>
      ) : (
        <>Loading... </>
      )}
    </Box>
  );
};

export default Companies;
