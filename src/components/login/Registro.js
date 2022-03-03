import React from 'react'
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

import { Button, createTheme, CssBaseline, Grid, IconButton, Link, Paper, TextField, ThemeProvider, Typography } from '@material-ui/core';
import Gead from '../../assets/Gead.jpeg'
import { globalApi } from '../../types/api.types';
import Axios from "axios";
import ExcelRegistro from './ExcelRegistro';


const Registro = ({ history }) => {

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


    const onSubmit = (e) => {
        // setEditing(false)
        // setPasswordEditing(false)

        console.log(e);
        

        Axios.post(`${globalApi}/register`, {...e, roleId: 1})
        .then( (x) => {
            console.log(x);
        })
        .catch( (x) => {
            console.log(x?.response);
        })

        // history.replace('/consultaEquipos'); 

        // if (e.password === "12345678") {

        // setTimeout(() => {
        //     if (e.user === cuentas.usuario1 || e.user === cuentas.usuario2 || e.user === cuentas.usuario3 || e.user === cuentas.usuario4 || e.user === cuentas.usuario5 || e.user === cuentas.usuario6 || e.user === cuentas.usuario7 || e.user === cuentas.usuario8 || e.user === cuentas.usuario9 || e.user === cuentas.usuario10) {
        //         console.log(e.user)
        //         if (e.password === cuentas.password) {
        //             setUser(e)
        //             setEditing(false)
        //             console.log(e.password)
        //             // history.push('/');      //Redireccion a la url indicada y se puede volver al login.
        //             history.replace('/consultaEquipos');   //Redireccion a la url indicada, No se puede volver al login.

        //         } else {
        //             setPasswordEditing(true)
        //         }

        //     } else {
        //         console.log("No funciona")

        //         setUser(null)
        //         setEditing(true)
        //     }
        // }, 1000);
    }


    //-----------------------------------------    CAMBIOS DEL LOGIN A MATERIAL UI   -------------------------------------
    //--------------------------------------------------------------------------------------------------------------------

    // const paperstyle = { padding: 20 };

    const style = createTheme({
        paper: {
            padding: 40,
            height: '720px',
            width: '384px',
            margin: '130px auto',
            borderRadius: '24px'
        },
        validation: {
            padding: 20,
            height: '60px',
            width: '160px',
            margin: '2rem auto',
            borderRadius: '24px'
        },
        validationPassword: {
            padding: 20,
            height: '60px',
            width: '190px',
            margin: '2rem auto',
            borderRadius: '24px'
        },
        logo: {
            // padding: 10,
            width: '7.2rem',
            // height: '18.32px',
            // left: '576px',
            // top: '305px',
        },
        h4: {
            // fontFamily: 'Roboto',
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontSize: '34px',
            lineHeight: '140%',
            letterSpacing: '0.0025em',
            color: '#14149A',
            marginTop: "0.5rem",
            marginBottom: '0.5rem',
        },
        txt: {
            fontFamily: 'Work Sans',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: 14,
            lineHeight: '140%',
            /* or 18px */
            letterSpacing: '-0.02em',
            marginBottom: '2rem',
        },
        TextField: {
            margin: '0.5rem 0',
        },
        btn: {
            margin: '8px 0',
            background: '#593FCC',
            borderRadius: '8px',
            fontFamily: 'Noto Sans',
            fontSize: 14,
            lineHeight: '200%',
            letterSpacing: '0.0125em',
        },
        link: {
            margin: '15px 10px 0 0',
            fontFamily: 'Noto Sans',
            // fontWeight: 'normal',
            fontSize: 14,
            lineHeight: '140%',
            letterSpacing: '0.004em',
        },
        linkColor: {
            fontColor: '#14149A',
        }
    })


    //fadeInDown
    return (
        <ThemeProvider theme={theme}>

            <Grid>
                <Paper elevation={10} style={style.paper}>
                            {/* <img src={Gead} /> */}
                    <form onSubmit={handleSubmit(onSubmit)}   >
                        <Grid>
                            <img src={Gead} style={style.logo} />
                        </Grid>

                        <Grid > </Grid>
                        <Typography style={style.h4}>¡Bienvenido!</Typography>
                        <Typography style={style.txt}>Inicia sesión con tu cuenta asignada por tu administrador.</Typography>

                        <TextField label="Nombre"
                            name='Name'
                            placeholder='Nombre'
                            variant="outlined"
                            style={style.TextField}
                            fullWidth
                            required
                            {...register("Name", {
                                required: {
                                    value: true,
                                    message: 'Campo requerido'
                                }
                            })}
                        />

                        <TextField label="Apellido"
                            name='LastName'
                            placeholder='Apellido'
                            variant="outlined"
                            style={style.TextField}
                            fullWidth
                            required
                            {...register("LastName", {
                                required: {
                                    value: true,
                                    message: 'Campo requerido'
                                }
                            })}
                        />

                        <TextField label="Correo"
                            name='email'
                            placeholder='Correo'
                            variant="outlined"
                            style={style.TextField}
                            fullWidth
                            required
                            {...register("email", {
                                required: {
                                    value: true,
                                    message: 'Campo requerido'
                                }
                            })}
                        />

                        <TextField label="Contraseña"
                            name='password'
                            placeholder='password'
                            variant="outlined"
                            type='password'
                            style={style.TextField}
                            fullWidth
                            required
                            {...register("password", {
                                required: {
                                    value: true,
                                    message: 'Campo requerido'
                                }
                            })}
                        />

                        <TextField label="Repetir Contraseña"
                            name='password2'
                            placeholder='Contraseña'
                            variant="outlined"
                            type='password'
                            style={style.TextField}
                            fullWidth
                            required
                            {...register("password2", {
                                required: {
                                    value: true,
                                    message: 'Campo requerido'
                                }
                            })}
                        />

                        <Button type='submit'
                            color="primary"
                            variant='contained'
                            fullWidth
                            style={style.btn}
                        >
                            Crear Cuenta
                        </Button>


                        <Typography style={style.link}> Si aún no tienes cuenta,
                            <Link href='#' style={style.linkColor} color="#14149A"> comunícate con tu administrador</Link>  para asistencia.
                        </Typography>

                    </form>
                        {/* <Grid style={style.link}> */}


                    {/* -------------------------------    Agregar Desde Excel    --------------------------------------------- */}
                    
                    {/* <ExcelRegistro /> */}

                    {/* -------------------------------    Agregar Desde Excel    --------------------------------------------- */}






                    {/* {
                        editing ? (
                            <>
                                <Paper elevation={10} style={style.validation} >
                                    <span className="text-danger text-small d-block mb-2">
                                        Usuario incorrecto
                                    </span>
                                </Paper>
                            </>
                        ) : (
                            <>
                            </>
                        )
                    }

                    {
                        passwordEditing ? (
                            <>
                                <Paper elevation={10} style={style.validationPassword} >
                                    <span className="text-danger text-small d-block mb-2">
                                        Contraseña incorrecta
                                    </span>
                                </Paper>
                            </>
                        ) : (
                            <>
                            </>
                        )
                    } */}


                </Paper>
            </Grid>


            <Grid>
            </Grid>

            <CssBaseline />
        </ThemeProvider>

    )
}

Registro.propTypes = {
    valor: PropTypes.string

}
export default Registro
