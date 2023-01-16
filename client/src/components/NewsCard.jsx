import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, useTheme, CardActionArea, CardActions } from "@mui/material";

const demoImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

const NewsCard = ({ data, isDashBoard = false }) => {
  const theme = useTheme();
  const { name, url } = data;
  return (
    <Card
      sx={{
        maxWidth: isDashBoard ? 345 : 345,
        maxHeight: isDashBoard ? "80vh" : "50vh",
      }}
      style={{
        backgroundColor: theme.palette.secondary[900],
        padding: "1rem",
      }}
    >
      <a
        style={{
          textDecoration: "none",
          color: "inherit",
        }}
        href={url}
        target="_blank"
        rel="noreferrer"
      >
        <CardActionArea
          sx={{
            backgroundColor: theme.palette.background.alt,
            borderRadius: "1rem",
            padding: "1rem",
          }}
        >
          <CardMedia
            component="img"
            height="140"
            image={data.provider[0]?.image?.thumbnail?.contentUrl || demoImage}
            alt={name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {data.description.length > 30
                ? `${data.description.substring(0, 30)}...`
                : data.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
        </CardActions>
      </a>
    </Card>
  );
};

export default NewsCard;
