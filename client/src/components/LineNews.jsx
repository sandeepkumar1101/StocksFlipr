import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Button,
  useTheme,
  CardActionArea,
  CardActions,
  Box,
  useMediaQuery,
} from "@mui/material";

const demoImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

const LineNews = ({ data, isDashBoard = false }) => {
  const theme = useTheme();
  const isFullScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const { name, url } = data;
  return (
    <Card
      sx={{ display: "flex" }}
      style={{
        backgroundColor: theme.palette.secondary[900],
        padding: "1rem",
        height: "20vh",
      }}
    >
      <a
        href={url}
        target="_blank"
        style={{
          textDecoration: "none",
          display: "inherit",
          color: "inherit",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h6">
              {isFullScreen ? name.slice(0, 100) : name.slice(0, 60)}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            ></Typography>
          </CardContent>
          <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
            <CardActions>
              <Button
                size="small"
                color="primary"
                sx={{
                  backgroundColor: theme.palette.background.alt,
                }}
              >
                Read More
              </Button>
            </CardActions>
          </Box>
        </Box>
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image={data.provider[0]?.image?.thumbnail?.contentUrl || demoImage}
          alt="Live from space album cover"
        />
      </a>
    </Card>
  );
};

export default LineNews;
