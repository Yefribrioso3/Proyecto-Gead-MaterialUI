import React, { useState } from 'react'
import axios from 'axios';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import Gead from '../../assets/Gead.jpeg'
import { globalApi } from '../../types/api.types';
import { Button, createTheme, CssBaseline, Grid, Link, Paper, TextField, ThemeProvider, Typography } from '@material-ui/core';

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
    // "claudio.zastrow@ab-inbev.com"
    // "francisco.lopez-ext@ab-inbev.com"
    // "maria.menab@ab-inbev.com"
    // "carlos.ortiz.rubio@ab-inbev.com"
    // "alejandro.rojo@ab-inbev.com"
    // "roberto.avilam@ab-inbev.com"
    // "martin.pulidoc@ab-inbev.com"
    // "isai.torres@ab-inbev.com"
    // "gabriel.rivero-ext@ab-inbev.com"
    // "carlos.razo-ext@ab-inbev.com"
    // ]


    // const handleLogin = () => {

    // }

    // const [cuentas, setCuentas] = useState(
    //     {
    //         usuario1: "claudio.zastrow@ab-inbev.com",
    //         usuario2: "francisco.lopez-ext@ab-inbev.com",
    //         usuario3: "maria.menab@ab-inbev.com",
    //         usuario4: "carlos.ortiz.rubio@ab-inbev.com",
    //         usuario5: "alejandro.rojo@ab-inbev.com",
    //         usuario6: "roberto.avilam@ab-inbev.com",
    //         usuario7: "martin.pulidoc@ab-inbev.com",
    //         usuario8: "isai.torres@ab-inbev.com",
    //         usuario9: "gabriel.rivero-ext@ab-inbev.com",
    //         usuario10: "carlos.razo-ext@ab-inbev.com",
    //         password: "prueba@12345"
    //     },
    // )


    const [user, setUser] = useState(null)
    const [editing, setEditing] = useState(false) // Para usuario incorrecto 
    const [passwordEditing, setPasswordEditing] = useState(false)

    const onSubmit = (e) => {
        setEditing(false)
        setPasswordEditing(false)

        // console.log(e);

        axios.post(`${globalApi}/login`, e)
        .then( (x) => {
            console.log(x);
            localStorage.setItem("token", x.data.token)
            history.replace('/consultaEquipos');
        })
        .catch( (x) => {
            console.log(x?.response);
        })

        // localStorage.removeItem("token")


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
            height: '496px',
            width: '384px',
            margin: '230px auto',
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
                    <form onSubmit={handleSubmit(onSubmit)}   >
                        <Grid>
                            {/* <img src={Gead} /> */}
                            <img src={Gead} style={style.logo} />
                        </Grid>

                        <Grid > </Grid>
                        <Typography style={style.h4}>¡Bienvenido!</Typography>
                        <Typography style={style.txt}>Inicia sesión con tu cuenta asignada por tu administrador.</Typography>

                        <TextField label="Nombre de usuario"
                            name='email'
                            placeholder='Name@example.com'
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

                            {/* {errors?.equipos?.message} */}
                            
                        <Button type='submit'
                            color="primary"
                            variant='contained'
                            fullWidth
                            style={style.btn}
                        >
                            Iniciar sesión
                        </Button>


                        {/* <Grid style={style.link}> */}
                        <Typography style={style.link}> Si aún no tienes cuenta,
                            <Link href='#' style={style.linkColor} color="#14149A"> comunícate con tu administrador</Link>  para asistencia.
                        </Typography>

                    </form>

                    {
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
                                        {/* {errors?.equipos?.message} */}
                                        Contraseña incorrecta
                                    </span>
                                </Paper>
                            </>
                        ) : (
                            <>
                            </>
                        )
                    }
                </Paper>
            </Grid>


            <Grid>

            </Grid>

            <CssBaseline />
        </ThemeProvider>
    )
}

LoginScreen.propTypes = {
    valor: PropTypes.string

}
export default LoginScreen



//type='submit'