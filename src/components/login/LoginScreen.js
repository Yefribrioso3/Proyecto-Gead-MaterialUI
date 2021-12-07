import React from 'react'
import PropTypes from 'prop-types';
import { Input, Label } from 'reactstrap';
import '../../index.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../equipos/MaestroEquipos.scss';
import { createTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
//import Button from 'react-bootstrap/Button';
//import Container from 'react-bootstrap/Container';


const LoginScreen = ({ history }) => {

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




    // const user = [
    //     {id: 1, usuario: "admin@admin", password: "admin12345"}
    // ]


    const handleLogin = () => {
        // history.push('/');      //Redireccion a la url indicada y se puede volver al login.
        history.replace('/consultaEquipos');   //Redireccion a la url indicada, No se puede volver al login.
    }

    //fadeInDown
    return (
        <ThemeProvider theme={theme}>

        <form id="formContent">

            <div className="text-center border-bottom p-4 ">
                <h2 className="text-primary "> Inicio de Sesión</h2>
            </div>

            <div className="text-center mt-4">
                <p className="text-secondary ml-5 mr-5">Si no tienes cuenta, comunícate con tu administrador para asistencia.</p>
            </div>

            <div className="px-4">
                <div className="row mb-2">
                    <Label className="col-12" for='text'>Usuario</Label>
                    <div className="col-12">
                        <Input type='text' id='user' className={"SelectBoostrap"} name="usuario" placeholder='name@example.com' />
                        

                    </div>
                </div>

                <div className="row">
                    <Label className="col-12" for='password'>Contraseña</Label>
                    <div className="col-12 mb-3">
                        <Input type='password' id='password' name="password" placeholder='Password'/>
                        
                    </div>
                </div>
            </div>

            <div id="formFooter" className="mt-4">

                <div>
                    <button
                        className="btn btn-primary btn-lg px-5"
                        onClick={ handleLogin }
                    >
                        Iniciar sesión
                    </button>
                </div>
            </div>
        </form>

            <CssBaseline />
        </ThemeProvider>

    )
}

LoginScreen.propTypes = {
    valor: PropTypes.string

}
export default LoginScreen



//type='submit'