import React, { useState } from "react";
import {
  AppBar,
  Grid,
  makeStyles,
  ThemeProvider,
  createTheme,
} from "@material-ui/core";
import abinbev from "../../assets/abinbev.jpeg";
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
} from "reactstrap";
import PageHeader from "../PageHeader";
import Switch from "@mui/material/Switch";
import Brightness2Icon from "@material-ui/icons/Brightness2";
import { WbSunny } from "@material-ui/icons";
import Gead from "../../assets/logo.png";
import GeadWhite from "../../assets/logo-white.png";

export default function Head({ light, setLight, history }) {
  const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: "transparent",
      boxShadow: "none",
    },

    searchInput: {
      opacity: "0.6",
      padding: `0px ${theme.spacing(1)}px`,
      fontSize: "0.8rem",
      "&:hover": {
        backgroundColor: "#f2f2f2",
      },
      "& .MuiSvgIcon-root": {
        marginRight: theme.spacing(1),
      },
    },
    icons: {
      fill: theme.palette.type === "dark" ? "#B3C8FC" : "rgba(0, 0, 0, 0.38)",
    },
  }));

  const classes = useStyles();

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

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

  const style = createTheme({
    bar: {
      backgroundColor: theme.palette.type === "dark" ? "#514A69" : "#FFFFFF",
      height: "4rem",
      boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.25)",
    },
    logo: {
      width: "7.2rem",
    },
    h4: {
      // fontFamily: 'Roboto',
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "34px",
      lineHeight: "140%",
      letterSpacing: "0.0025em",
      marginTop: "0.5rem",
      marginBottom: "0.5rem",
      color:
        theme.palette.type === "dark"
          ? theme.palette.primary.dark
          : theme.palette.secondary.main,
    },
    txt: {
      fontFamily: "Work Sans",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: 14,
      lineHeight: "140%",
      /* or 18px */
      letterSpacing: "-0.02em",
      marginBottom: "2rem",
    },
    btn: {
      margin: "8px 0",
      borderRadius: "8px",
      fontFamily: "Noto Sans",
      fontSize: 14,
      lineHeight: "200%",
      letterSpacing: "0.0125em",
      background:
        theme.palette.type === "dark"
          ? theme.palette.secondary.light
          : theme.palette.secondary.main,
      color: "#FFFFFF",
    },
    link: {
      margin: "15px 10px 0 0",
      fontFamily: "Noto Sans",
      // fontWeight: 'normal',
      fontSize: 14,
      lineHeight: "140%",
      letterSpacing: "0.004em",
    },
    linkColor: {
      color:
        theme.palette.type === "dark"
          ? theme.palette.primary.main
          : theme.palette.secondary.main,
    },
  });

  const cerrar = () => {
    history.replace("/login");
    localStorage.removeItem("token")
  }

  return (
    <ThemeProvider theme={theme}>
      <AppBar className={classes.root}>
        <Navbar expand="md" style={style.bar}>
          <img
            src={theme.palette.type === "dark" ? GeadWhite : Gead}
            style={style.logo}
            alt=""
          />
          <Grid item sm></Grid>
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          <PageHeader title="Gestor de Activos en Desuso - GEAD" />
          <Grid item sm></Grid>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ms-auto" navbar>
              {/* <div className="">
                            <a href='https://anheuserbuschinbev.sharepoint.com/sites/MAZGEAD/GEAD%20manuales/Forms/AllItems.aspx' className='btn' style={{ color: "blue" }} title='Descargar proyecto'> Manual </a>
                        </div> */}

              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle
                  nav
                  caret
                  style={{
                    color:
                      theme.palette.type === "dark"
                        ? theme.palette.primary.light
                        : theme.palette.secondary.dark,
                  }}
                >
                  Admin@admin
                </DropdownToggle>
                <DropdownMenu
                  right
                  style={{
                    backgroundColor:
                      theme.palette.type === "dark" ? "#514A69" : "#FFFFFF",
                    boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.25)",
                  }}
                >
                  <DropdownItem>
                    <NavLink
                      // href="/login"
                      onClick={()=>{ cerrar() }}
                      className="p-0"
                      style={{
                        color:
                          theme.palette.type === "dark"
                            ? theme.palette.primary.light
                            : theme.palette.secondary.dark,
                      }}
                    >
                      Cerrar sesión
                    </NavLink>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <Grid xs={5}>
                <Brightness2Icon className={classes.icons} />
                <Switch
                  checked={light}
                  color="primary"
                  onChange={() => setLight(!light)}
                />
                <WbSunny className={classes.icons} />
              </Grid>
            </Nav>
          </Collapse>
        </Navbar>
      </AppBar>
    </ThemeProvider>
  );
}
