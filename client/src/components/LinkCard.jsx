import React from "react";
import { Button, Typography, useTheme } from "@mui/material";

const LinkCard = ({ text }) => {
  const theme = useTheme();
  const [copied, setCopied] = React.useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <Typography
      variant="h5"
      color="black"
      sx={{
        backgroundColor: theme.palette.secondary[100],
        borderRadius: "0.55rem",
        overflowWrap: "break-word",
        padding: "0.5rem",
        margin: "0.5rem 0",
        position: "relative",
        "& button": {
          position: "absolute",
          top: "0",
          right: "0",
        },
      }}
    >
      {text}
      <Button
        sx={{
          backgroundColor: theme.palette.background.alt,
          margin: "0.5rem",
          color: theme.palette.secondary[100],
          ":hover": { backgroundColor: "white", color: "black" },
        }}
        onClick={copyLink}
      >
        {copied ? "Copied!" : "Copy"}
      </Button>
    </Typography>
  );
};

export default LinkCard;
