import { Link } from "react-router-dom";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import {
  Fab,
  Stack,
  Box,
  List,
  Typography,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

// Redux
import { openMenu, closeMenu } from "../../sliceApp";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";

// Icons
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import AppShortcutIcon from "@mui/icons-material/AppShortcut";
import SportsTennisIcon from "@mui/icons-material/SportsTennis";
import PaymentsIcon from "@mui/icons-material/Payments";
import SavingsIcon from "@mui/icons-material/Savings";
import BugReportIcon from "@mui/icons-material/BugReport";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import EventIcon from "@mui/icons-material/Event";

const drawerWidth = 240;

// Colours
const primary: string = "#006B32";
const secondary: string = "#5052B4";
const tertiary: string = "#C4AA31";
const red: string = "#BB1B1B";
const purple: string = "#DEC5FF";

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

function PublicDrawer(props: { page: string }) {
  const selector = useAppSelector((state) => state.application);
  const dispatch = useAppDispatch();

  const handleDrawerOpen = () => {
    dispatch(openMenu());
  };

  const handleDrawerClose = () => {
    dispatch(closeMenu());
  };

  const menuItems = [
    {
      text: "Dashboard",
      icon: <HomeIcon />,
      link: "/pub",
      color: primary,
    },
    {
      text: "My Bookings",
      icon: <SportsTennisIcon />,
      link: "/pub/bookings",
      color: secondary,
    },
    {
      text: "Programs",
      icon: <EventIcon />,
      link: "/pub/programs",
      color: tertiary,
    },
    {
      text: "Payments",
      icon: <PaymentsIcon />,
      link: "/pub/payments",
      color: red,
    },
    {
      text: "Club Credit",
      icon: <SavingsIcon />,
      link: "/pub/clubcredit",
      color: purple,
    },
  ];

  const bottomItems = [
    { text: "Report Bug", icon: <BugReportIcon />, link: "/pub/bug" },
    { text: "Logout", icon: <LogoutIcon />, link: "/logout" },
  ];

  return (
    <Drawer
      variant="permanent"
      open={selector.menuOpen}
      sx={{ display: { xs: "none", md: "block" } }}
    >
      <DrawerHeader sx={{ justifyContent: "center", width: "100%" }}>
        {selector.menuOpen ? (
          <Stack
            direction="row"
            justifyContent="space-between"
            width="100%"
            paddingLeft="10px"
          >
            <Typography>Menu</Typography>
            <IconButton onClick={handleDrawerClose}>
              <CloseIcon />
            </IconButton>
          </Stack>
        ) : (
          <IconButton aria-label="open drawer" onClick={handleDrawerOpen}>
            <MenuIcon />
          </IconButton>
        )}
      </DrawerHeader>
      <List>
        <Box
          display="flex"
          justifyContent={selector.menuOpen ? "start" : "center"}
        >
          <Fab
            color="success"
            component={Link}
            to="/pub/bookings/book"
            variant={selector.menuOpen ? "extended" : "circular"}
            sx={{
              mx: selector.menuOpen ? 2 : 0,
              mb: 1,
              px: selector.menuOpen ? 5 : 0,
            }}
          >
            <AppShortcutIcon sx={{ mr: selector.menuOpen ? 1 : 0 }} />
            {selector.menuOpen ? "Book Court" : ""}
          </Fab>
        </Box>
        {menuItems.map((item) => (
          <ListItem
            key={item.text}
            disablePadding
            component={Link}
            to={item.link}
            sx={{ display: "block", color: "inherit" }}
          >
            <ListItemButton
              selected={item.text === props.page}
              sx={{
                minHeight: 48,
                justifyContent: selector.menuOpen ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: selector.menuOpen ? 3 : "auto",
                  justifyContent: "center",
                  borderBottom: item.text === props.page ? "solid" : "none",
                  borderColor: item.color,
                  "&:hover": {
                    color: item.color,
                  },
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{ opacity: selector.menuOpen ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {bottomItems.map((item) => (
          <ListItem
            component={Link}
            to={item.link}
            key={item.text}
            disablePadding
            sx={{ display: "block", color: "inherit" }}
          >
            <ListItemButton
              selected={item.text === props.page}
              sx={{
                minHeight: 48,
                justifyContent: selector.menuOpen ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: selector.menuOpen ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{ opacity: selector.menuOpen ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default PublicDrawer;
