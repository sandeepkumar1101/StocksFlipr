import React from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,
} from "@mui/icons-material";
import FlexBetween from "./FlexBetween";
import { useDispatch } from "react-redux";
import { setMode, setLogout } from "state";
import profileImage from "assets/profile.jpeg";
import {
  AppBar,
  IconButton,
  InputBase,
  Toolbar,
  useTheme,
  Button,
  Menu,
  MenuItem,
  Typography,
  Box,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ user, isSidebarOpen, setIsSidebarOpen }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* left side making */}
        <FlexBetween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
          <FlexBetween
            backgroundColor={theme.palette.background.alt}
            borderRadius="9px"
            gap="3rem"
            // top-bottom left-right
            p="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search ..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        </FlexBetween>
        {/* right side making */}
        <FlexBetween gap="1.5rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "light" ? (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            ) : (
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            )}
          </IconButton>
          <Link to="settings">
            {" "}
            <SettingsOutlined
              sx={{
                color: theme.palette.secondary[300],
                fontSize: "25px ",
              }}
            />
          </Link>
          {/* user info */}
          <FlexBetween>
            <Button
              onClick={handleClick}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textTransform: "none",
                gap: "1rem",
              }}
            >
              <Box
                component="img"
                alt="profile"
                src={`http://localhost:5001/assets/${localStorage.getItem(
                  "picturePath"
                )}`}
                width="32px"
                height="32px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography
                  fontSize="0.85rem"
                  sx={{ color: theme.palette.secondary[100] }}
                  fontWeight="bold"
                >
                  {user.name}
                </Typography>
                <Typography
                  fontSize="0.75rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {user.occupation}
                </Typography>
              </Box>
              <ArrowDropDownOutlined
                sx={{
                  color: theme.palette.secondary[300],
                  fontSize: "25px",
                }}
              />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <MenuItem onClick={handleClose}>
                {localStorage.getItem("firstName")}
              </MenuItem>
              <Link
                style={{
                  textDecoration: "none",
                  color: "inherit",
                }}
                to="/login"
              >
                <MenuItem>Log Out</MenuItem>
              </Link>
            </Menu>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
