import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Grid,
  InputBase,
  IconButton,
  Badge,
  ThemeProvider,
  makeStyles,
  createTheme,
} from "@material-ui/core";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import SearchIcon from "@material-ui/icons/Search";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import abinbev from "../assets/abinbev.jpeg";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,

  // NavbarText
} from "reactstrap";
import PageHeader from "./PageHeader";
import { ArrowDownward } from "@material-ui/icons";
import Switch from "@mui/material/Switch";
import Brightness2Icon from "@material-ui/icons/Brightness2";
import { WbSunny } from "@material-ui/icons";

import Gead from "../../src/assets/logo.png";
import GeadWhite from "../../src/assets/logo-white.png";
// import { LinkContainer } from 'react-router-bootstrap';
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    backgroundColor: "transparent",
    boxShadow: "none",
  },
  bar: {
    backgroundColor: theme.palette.type == "dark" ? "#514A69" : "#FFFFFF",
    paddingTop: theme.spacing(5),
    borderRadius: "12px",
    boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.25)",
  },
  searchInput: {
    opacity: "0.6",
    padding: `0px ${theme.spacing(1)}px`,
    backgroundColor: "transparent",
    fontSize: "0.8rem",

    "& .MuiSvgIcon-root": {
      marginRight: theme.spacing(1),
    },
  },
  logo: {
    // padding: 10,
    width: "7.2rem",
    // height: '18.32px',
    // left: '576px',
    // top: '305px',
  },
  icons: {
    fill: theme.palette.type == "dark" ? "#B3C8FC" : "rgba(0, 0, 0, 0.38)",
  },
}));
export default function Header({ isOpen, setIsOpen, light, setLight }) {
  const classes = useStyles();
  const toggle = () => setIsOpen(!isOpen);
  const local = () => {
    //Eliminar datos del localStorage y redireccionar al login
    localStorage.removeItem("token");
    console.log(localStorage);

    // history.replace('/login');
    // console.log(history)
  };
  const theme = createTheme({
    palette: {
      type: light ? "light" : "dark",

      primary: {
        main: "#B3C8FC",
        light: "#E6FBFF",
        dark: "#8297C9",
      },
      secondary: {
        main: "#6200EE",
        light: "#8F6CFF",
        dark: "#14149A",
      },
      background: {
        main: "#f4f5fd",
        light: "#8F6CFF",
        dark: "#14149A",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" className={classes.root}>
        <Navbar className={classes.bar} expand="md">
          <img
            src={theme.palette.type == "dark" ? GeadWhite : Gead}
            className={classes.logo}
          />

          <PageHeader
            title="Gestor de Activos en Desuso - GEAD"
            // title="Consulta de Equipos"
            // subTitle="Middle America"
            // subTitle="Form design with validation"
            // icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
            setLight={setLight}
          />

          <Grid item sm></Grid>
          <NavbarToggler onClick={toggle} />

          <Collapse isOpen={isOpen} navbar>
            <Nav className="ms-auto" navbar>
              {/* userByToken */}

              {userByToken.roleId === 1 ? (
                <div className="">
                  {/* <a href='../assets/Manual.pdf' className='btn' style={{color: "blue"}} download="Manual.pdf" title='Descargar proyecto'> Manual <ArrowDownward /></a> */}
                  <a
                    href="/registro"
                    className="btn"
                    style={{ color: "blue" }}
                    title="Crear Nuevo Usuario"
                  >
                    {" "}
                    New User{" "}
                  </a>
                  {/* src/assets/Manual.pdf */}
                </div>
              ) : null}
              <div className="">
                <a
                  href="https://anheuserbuschinbev.sharepoint.com/sites/MAZGEAD/GEAD%20manuales/Forms/AllItems.aspx"
                  className="btn"
                  style={{
                    color:
                      theme.palette.type == "dark"
                        ? theme.palette.primary.light
                        : theme.palette.secondary.dark,
                  }}
                  download="Manual.pdf"
                  title="Descargar proyecto"
                >
                  Manual <ArrowDownward />
                </a>
              </div>

              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle
                  nav
                  caret
                  style={{
                    color:
                      theme.palette.type == "dark"
                        ? theme.palette.primary.light
                        : theme.palette.secondary.dark,
                  }}
                >
                  {
                    // userByToken?.roleId === 1 ? `${userByToken.Name} (ADMIN)` : `${userByToken.Name} (PLANTA)`
                    userByToken?.roleId === 1
                      ? `${userByToken.Name} (ADMIN)`
                      : userByToken?.roleId === 2
                      ? `${userByToken.Name} (SUPERVISOR)`
                      : userByToken?.roleId === 3
                      ? `${userByToken.Name} (PLANTA)`
                      : null
                  }
                </DropdownToggle>
                <DropdownMenu
                  right
                  style={{
                    backgroundColor:
                      theme.palette.type == "dark" ? "#514A69" : "#FFFFFF",
                    boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.25)",
                  }}
                >
                  <DropdownItem>
                    <NavLink
                      href="/login"
                      className="p-0"
                      style={{
                        color:
                          theme.palette.type == "dark"
                            ? theme.palette.primary.light
                            : theme.palette.secondary.dark,
                      }}
                    >
                      Cerrar sesión <ExitToAppIcon />
                    </NavLink>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>

              <div className="align-items-center">
                <Brightness2Icon className={classes.icons} />
                <Switch
                  checked={light}
                  onChange={() => setLight(!light)}
                  color="primary"
                />
                <WbSunny className={classes.icons} />
              </div>
            </Nav>
          </Collapse>
        </Navbar>
      </AppBar>
    </ThemeProvider>
  );
}
