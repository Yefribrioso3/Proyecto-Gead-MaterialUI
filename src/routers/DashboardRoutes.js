import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Home from "../components/equipos/Home";
import { Prueba } from "../components/equipos/Prueba";
import ConsultaEquipos from "../pages/ConsultaEquipos";
import MasterEquipos from "../pages/MasterEquipos";
import "../App.scss";

// import NavbarNav from '../components/NavbarNav';
// import { AsignacionesScreen } from '../components/menu/AsignacionesScreen';
// import { Menu } from '../components/menu/Menu';

// import Sidebar from '../components/Sidebar';

//--------------------------------------------------------------------------------------------------

import SideMenu from "../components/SideMenu";
import { makeStyles, CssBaseline, ThemeProvider } from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";
import Header from "../components/Header";
// import PageHeader from '../components/PageHeader';

// import Employees from "../pages/Employees/Employees";

const theme = createTheme({
  palette: {
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
      default: "#f4f5fd",
    },
  },
  overrides: {
    MuiAppBar: {
      root: {
        transform: "translateZ(0)",
      },
    },
  },
  props: {
    MuiIconButton: {
      disableRipple: true,
    },
  },
});

const useStyles = makeStyles({
  appMain: {
    paddingLeft: "250px",
    width: "100%",
    height: "100%",
  },
});

export const DashboardRoutes = () => {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <div className="d-flex">
        {/* <Sidebar /> */}
        <div className="content">
          {/* <NavbarNav /> */}

          <div className={classes.appMain}>
            <Switch>
              <Route exact path="/prueba" component={Prueba} />
              <Route exact path="/Home" component={Home} />
              <Route
                exact
                path="/consultaEquipos"
                component={ConsultaEquipos}
              />
              <Route exact path="/maestroEquipos" component={MasterEquipos} />

              {/* <Redirect to="/maestroEquipos" /> */}
              <Redirect to="/ConsultaEquipos" />
            </Switch>
          </div>
          <CssBaseline />
        </div>
      </div>
    </ThemeProvider>
  );
};
