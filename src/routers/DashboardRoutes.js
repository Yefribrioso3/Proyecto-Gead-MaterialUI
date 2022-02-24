import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Home from '../components/equipos/Home';
import { Prueba } from '../components/equipos/Prueba';
import ConsultaEquipos from '../pages/ConsultaEquipos';
import MasterEquipos from '../pages/MasterEquipos';
import "../App.scss";

// import NavbarNav from '../components/NavbarNav';
// import { AsignacionesScreen } from '../components/menu/AsignacionesScreen';
// import { Menu } from '../components/menu/Menu';

// import Sidebar from '../components/Sidebar';

//--------------------------------------------------------------------------------------------------

import SideMenu from "../components/SideMenu";
import { makeStyles, CssBaseline, ThemeProvider } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';
import Header from "../components/Header";
import Registro from '../components/login/Registro';
// import PageHeader from '../components/PageHeader';

// import Employees from "../pages/Employees/Employees";

const theme = createTheme({
    palette: {
        primary: {
            main: "#333996",
            light: '#3c44b126'
        },
        secondary: {
            main: "#f83245",
            light: '#f8324526'
        },
        background: {
            default: "#f4f5fd"
        },
    },
    overrides: {
        MuiAppBar: {
            root: {
                transform: 'translateZ(0)'
            }
        }
    },
    props: {
        MuiIconButton: {
            disableRipple: true
        }
    }
})

const useStyles = makeStyles({
    appMain: {
        paddingLeft: '12.5rem',
        width: '100%'
    }
})

export const DashboardRoutes = () => {
    const classes = useStyles();
    return (
        <div className="d-flex">
            {/* <Sidebar /> */}
            <div className="content">
                {/* <NavbarNav /> */}
                
                <ThemeProvider theme={theme}>
                
                    <div className={classes.appMain}>

                        <Switch>
                        
                            <Route exact path="/prueba" component={Prueba} />
                            <Route exact path="/Home" component={Home} />
                            <Route exact path="/consultaEquipos" component={ConsultaEquipos} />
                            <Route exact path="/registro" component={Registro} />
                            
                            {/* <Redirect to="/maestroEquipos" /> */}
                            <Redirect to="/ConsultaEquipos" />
                        </Switch>

                    </div>
                    <CssBaseline />
                </ThemeProvider>

            </div>
        </div>
    );
};
