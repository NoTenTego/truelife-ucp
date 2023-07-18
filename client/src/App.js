import { Routes, Route, Link, useLocation } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Characters from "./pages/characters/Characters";
import PlayersTable from "./pages/players/PlayersTable";
import PremiumShop from "./pages/premium/premiumShop/PremiumShop";
import Darkweb from "./pages/darkweb/Darkweb";
import Premium from "./pages/premium/Premium";
import Helpdesk from "./pages/helpdesk/Helpdesk";
import Ticket from "./pages/helpdesk/Ticket";
import Logs from "./pages/logs/Logs";
import Home from "./pages/home/Home";
import { useState, useContext, useEffect } from "react";
import "./app.css";
import { makeRequest } from "./axios";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import HandymanIcon from "@mui/icons-material/Handyman";
import SupportIcon from "@mui/icons-material/Support";
import PeopleIcon from "@mui/icons-material/People";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { createTheme } from "@mui/material/styles";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AuthContext } from "./context/authContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

const darkTheme = createTheme({
  palette: {
    mode: "dark",

    primary: {
      light: "#42a5f5",
      main: "#1976d2",
      dark: "#1565c0",
      different: "#222222",
      differentLight: "#323232",
      anotherTextColor: "#ffffff",
    },

    secondary: {
      light: "#ff7961",
      main: "#ffba49",
      dark: "#ba000d",
    },
  },
});

const openedMixin = (theme) => ({
  width: 240,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
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
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: 240,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  position: "fixed",
  "z-index": "10000",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const menuItems = [
  { reference: "dashboard", name: "Dashboard", icon: <DashboardIcon /> },
  { reference: "characters", name: "Postacie", icon: <PeopleIcon /> },
  { reference: "helpdesk", name: "Centrum pomocy", icon: <SupportIcon /> },
  { reference: "premium", name: "Premium", icon: <AddShoppingCartIcon /> },
];

const menuAdminItems = [
  { reference: "admin/logs", name: "Logi", icon: <PersonSearchIcon /> },
  { reference: "admin/players", name: "Gracze", icon: <HandymanIcon /> },
];

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const getScrollbarStyles = (theme) => `
    ::-webkit-scrollbar {
      width: 5px;
    }

    ::-webkit-scrollbar-track {
      background: ${theme.palette.primary.different};
    }

    ::-webkit-scrollbar-thumb {
      background: ${theme.palette.primary.main};
      border-radius: 3px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: ${theme.palette.primary.light};
    }
  `;

  const handleLogout = async () => {
    await makeRequest.post("auth/logout");

    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = getScrollbarStyles(darkTheme);
    document.getElementsByTagName("head")[0].appendChild(style);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await makeRequest.post("token/getTokens");

      if (response.data === false && currentUser) {
        handleLogout()
      }
    };
    fetchData();
  }, []);

  if (!currentUser) {
    return (
      <>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Home theme={darkTheme} />
        </ThemeProvider>
      </>
    );
  }

  const queryClient = new QueryClient();

  const handleDrawer = () => {
    setOpen(!open);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Box sx={{ display: "flex" }}>
          <Drawer
            variant='permanent'
            open={open}
          >
            <DrawerHeader
              sx={
                open === true
                  ? { justifyContent: "flex-end" }
                  : { justifyContent: "center" }
              }
            >
              <IconButton
                onClick={handleDrawer}
                aria-label={open === true ? "Close drawer" : "Open drawer"}
              >
                {open === true ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
              {menuItems.map((item, index) => (
                <ListItem
                  key={index}
                  component={Link}
                  style={{ color: "black" }}
                  to={item.reference}
                  disablePadding
                  sx={{ display: "block" }}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                        color:
                          location.pathname === "/" + item.reference
                            ? "primary.main"
                            : null,
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.name}
                      sx={{ opacity: open ? 1 : 0, color: "text.primary" }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Divider />
            {currentUser.admin >= 1 || currentUser.supporter >= 1 ? (
              <List>
                {menuAdminItems.map((item, index) => (
                  <ListItem
                    key={index}
                    component={Link}
                    style={{ color: "black" }}
                    to={item.reference}
                    disablePadding
                    sx={{ display: "block" }}
                  >
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                          color:
                            location.pathname === "/" + item.reference
                              ? "primary.main"
                              : null,
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.name}
                        sx={{ opacity: open ? 1 : 0, color: "text.primary" }}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            ) : null}
            <Divider />
            <List>
              <ListItem
                disablePadding
                sx={{ display: "block" }}
                onClick={handleLogout}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <ExitToAppIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary='Wyloguj się'
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </List>
          </Drawer>
          <Box
            component='main'
            ml={8}
            sx={{ flexGrow: 1, p: 3 }}
          >
            <DrawerHeader />
            <AnimatePresence>
              <Routes>
                <Route
                  path='/'
                  element={<Dashboard theme={darkTheme} />}
                ></Route>
                <Route
                  path='/dashboard'
                  element={<Dashboard theme={darkTheme} />}
                ></Route>
                <Route
                  path='/characters'
                  element={
                    <Characters
                      theme={darkTheme}
                      userId={currentUser.id}
                    />
                  }
                ></Route>
                <Route
                  path='/helpdesk'
                  element={
                    <Helpdesk
                      theme={darkTheme}
                      user={currentUser}
                    />
                  }
                ></Route>
                <Route
                  path='/helpdesk/:id'
                  element={
                    <Ticket
                      theme={darkTheme}
                      user={currentUser}
                    />
                  }
                ></Route>
                <Route
                  path='/premium'
                  element={
                    <Premium
                      theme={darkTheme}
                      user={currentUser}
                    />
                  }
                ></Route>
                <Route
                  path='/premium/shop'
                  element={
                    <PremiumShop
                      theme={darkTheme}
                      user={currentUser}
                    />
                  }
                ></Route>
                <Route
                  path='/darkweb'
                  element={
                    <Darkweb
                      theme={darkTheme}
                      user={currentUser}
                    />
                  }
                ></Route>
                {currentUser.admin >= 1 || currentUser.supporter >= 1 ? (
                  <>
                    <Route
                      path='/admin/logs'
                      element={
                        <Logs
                          theme={darkTheme}
                          user={currentUser}
                        />
                      }
                    ></Route>
                    <Route
                      path='/admin/players'
                      element={
                        <PlayersTable
                          theme={darkTheme}
                          user={currentUser}
                        />
                      }
                    ></Route>
                  </>
                ) : null}
              </Routes>
            </AnimatePresence>
          </Box>
        </Box>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
