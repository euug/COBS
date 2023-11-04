import { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Toolbar,
} from "@mui/material";
import { Link } from "react-router-dom";

// Icons
import nav_logo from "../../assets/images/logobtc.png";
import MenuIcon from "@mui/icons-material/Menu";
import LoginIcon from "@mui/icons-material/Login";
import DashboardIcon from "@mui/icons-material/Dashboard";

const drawerWidth = 240; // Width of mobile drawer
const navColor = "#E7E9E2";
const navItems = [
  {
    name: "Learn Tennis",
    link: "/learn",
  },
  {
    name: "Membership",
    link: "/membership",
  },
  {
    name: "About Us",
    link: "/about",
  },
  {
    name: "Court Booking",
    link: "/bookings",
  },
];

function LandingHeader() {
  // states
  const user = null;
  const [mobileOpen, setMobileOpen] = useState(false);

  // Changes the mobile menu state
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Link to="/home">
        <Box component="img" src={nav_logo} width="100%" />
      </Link>
      <Divider />
      <List>
        {navItems.map((item) => (
          <Link key={item.name} to={item.link} className="navLink">
            <ListItem>
              <ListItemButton>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        {user ? (
          <Link to="/home" className="navLink">
            <ListItem>
              <ListItemButton>
                <ListItemText primary="Go to Dashboard" />
              </ListItemButton>
            </ListItem>
          </Link>
        ) : (
          <Link to="/login" className="navLink">
            <ListItem>
              <ListItemButton>
                <ListItemText primary="Login" />
              </ListItemButton>
            </ListItem>
          </Link>
        )}
        {user ? (
          <Link to="/logout" className="navLink">
            <ListItem>
              <ListItemButton>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </Link>
        ) : (
          <Link to="/register" className="navLink">
            <ListItem>
              <ListItemButton>
                <ListItemText primary="Register" />
              </ListItemButton>
            </ListItem>
          </Link>
        )}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar component="nav" sx={{ backgroundColor: navColor }}>
        <Container maxWidth="xl">
          <Toolbar>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              width="100%"
            >
              <IconButton
                color="primary"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { lg: "none" } }}
              >
                <MenuIcon />
              </IconButton>
              <Link to="/">
                <Box
                  component="img"
                  src={nav_logo}
                  height="60px"
                  sx={{ display: { xs: "none", sm: "block" } }}
                />
              </Link>
              <Stack
                direction="row"
                sx={{ display: { xs: "none", lg: "block" } }}
              >
                {navItems.map((item) => (
                  <Link key={item.name} to={item.link}>
                    <Button>{item.name}</Button>
                  </Link>
                ))}
              </Stack>
              <Box>
                {user ? (
                  <Link to="/logout">
                    <Button
                      variant="outlined"
                      sx={{
                        display: { xs: "none", sm: "inline-block" },
                        mr: 3,
                      }}
                    >
                      Logout
                    </Button>
                  </Link>
                ) : (
                  <Link to="/register">
                    <Button
                      variant="outlined"
                      sx={{
                        display: { xs: "none", sm: "inline-block" },
                        mr: 3,
                      }}
                    >
                      Register
                    </Button>
                  </Link>
                )}
                {user ? (
                  <Link to="/home">
                    <Button variant="contained" startIcon={<DashboardIcon />}>
                      Go to Dashboard
                    </Button>
                  </Link>
                ) : (
                  <Link to="/login">
                    <Button variant="contained" startIcon={<LoginIcon />}>
                      Login
                    </Button>
                  </Link>
                )}
              </Box>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", lg: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

export default LandingHeader;
