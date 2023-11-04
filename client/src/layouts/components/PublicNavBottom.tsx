import {
  BottomNavigation,
  BottomNavigationAction,
  Fab,
  Menu,
  MenuItem,
  Paper,
} from "@mui/material";
import * as React from "react";
import { Link } from "react-router-dom";

// Icons
import MoreVertIcon from "@mui/icons-material/MoreVert";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import SportsTennisIcon from "@mui/icons-material/SportsTennis";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import PaymentIcon from "@mui/icons-material/Payment";
import SavingsIcon from "@mui/icons-material/Savings";
import HomeIcon from "@mui/icons-material/Home";

function PublicNavBottom(props: { page: string }) {
  const menuItems = [
    {
      text: "Dashboard",
      icon: <HomeIcon />,
      link: "/pub",
    },
    {
      text: "Bookings",
      icon: <SpaceDashboardIcon />,
      link: "/pub/bookings",
    },
    { text: "Programs", icon: <SportsTennisIcon />, link: "/pub/programs" },
    { text: "Payments", icon: <PaymentIcon />, link: "/pub/payments" },
    { text: "Credit", icon: <SavingsIcon />, link: "/pub/clubcredit" },
  ];

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Fab
        variant="extended"
        component={Link}
        to="/pub/bookings/book"
        color="success"
        sx={{
          display: { md: "none" },
          position: "fixed",
          bottom: 70,
          left: 10,
        }}
      >
        <BookOnlineIcon sx={{ mr: 1 }} />
        Book Court
      </Fab>
      <Paper
        sx={{
          display: { md: "none" },
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1200,
        }}
        elevation={3}
      >
        <BottomNavigation showLabels value={props.page}>
          {menuItems.map((item) => (
            <BottomNavigationAction
              component={Link}
              to={item.link}
              key={item.text}
              label={item.text}
              value={item.text}
              icon={item.icon}
            />
          ))}
          <BottomNavigationAction
            label="More"
            icon={<MoreVertIcon />}
            onClick={handleClick}
          />
        </BottomNavigation>
        <Menu
          id="more-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "more-button",
          }}
        >
          <MenuItem component={Link} to="/pub/bug" onClick={handleClose}>
            Report Bug
          </MenuItem>
          <MenuItem component={Link} to="/logout">
            Logout
          </MenuItem>
        </Menu>
      </Paper>
    </>
  );
}

export default PublicNavBottom;
