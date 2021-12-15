import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { Button, Input, Label } from 'reactstrap';
import { useForm } from 'react-hook-form';
import '../../index.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../equipos/MaestroEquipos.scss';
import { createTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
//import Button from 'react-bootstrap/Button';
//import Container from 'react-bootstrap/Container';


const LoginScreen = ({ history }) => {

    const { register, handleSubmit, formState: { errors } } = useForm();

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
       
    }

    const [user, setUser] = useState(null)
    const [editing, setEditing] = useState(false)

    const onSubmit = (e) => {

        setTimeout(() => {
            if (e.password === "12345678") {
                setUser(e)
                setEditing(false)
                console.log(user)

                 // history.push('/');      //Redireccion a la url indicada y se puede volver al login.
                history.replace('/consultaEquipos');   //Redireccion a la url indicada, No se puede volver al login.
            } else {
                setUser(null)
                setEditing(true)
            }
        }, 1000);

    }

    //fadeInDown
    return (
        <ThemeProvider theme={theme}>

            <div className='d-block-line'>
                <form id="formContent" onSubmit={handleSubmit(onSubmit)}>

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
                                <Input type='text' id='user' className={"SelectBoostrap"} name="usuario" placeholder='name@example.com'
                                    {...register("usuario", {
                                        required: {
                                            value: true,
                                            message: 'Campo requerido'
                                        },
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                            message: "El formato no es correcto"
                                        }
                                    })}
                                />
                                <span className="text-danger text-small d-block mb-2">
                                    {errors.usuario && errors.usuario.message}
                                </span>


                            </div>
                        </div>

                        <div className="row">
                            <Label className="col-12" for='password'>Contraseña</Label>
                            <div className="col-12 mb-3">
                                <Input type='password' id='password' name="password"
                                    placeholder='Password'
                                    {...register("password", {
                                        required: {
                                            value: true,
                                            message: 'Campo requerido'
                                        },
                                        minLength: {
                                            value: 8,
                                            message: "La contraseña debe tener al menos 8 caracteres"
                                        }
                                    })}
                                />
                                <span className="text-danger text-small d-block mb-2">
                                    {errors.password && errors.password.message}
                                </span>

                            </div>
                        </div>
                    </div>

                    <div id="formFooter" className="mt-4">

                        <div>
                            <button
                                className="btn btn-primary btn-lg px-5"
                            // onClick={ handleLogin }
                            >
                                Iniciar sesión
                            </button>

                            {/* {!user ? <div> </div> : } */}
                            {editing ? <div className="text-danger mt-2">Contraseña incorrecta</div> : <> </>}

                        </div>
                    </div>
                </form>

                {/* <div id="formFooter">
                    <button className='btn btn-danger'>Contraseña incorrecta</button>

                </div> */}
            </div>


            <CssBaseline />
        </ThemeProvider>

    )
}

LoginScreen.propTypes = {
    valor: PropTypes.string

}
export default LoginScreen



//type='submit'