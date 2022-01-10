import React, { useState } from 'react'
import PropTypes from 'prop-types';
// import { Button, Input, Label } from 'reactstrap';
import { useForm } from 'react-hook-form';
// import '../../index.css';

// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../equipos/MaestroEquipos.scss';
import { Button, createTheme, CssBaseline, Grid, Link, Paper, TextField, ThemeProvider, Typography } from '@material-ui/core';

import Gead from '../../assets/Gead.jpeg'


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
        console.log(e.password);

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

                    <TextField label="Nombre de usuario" placeholder='Name@example.com' variant="outlined" style={style.TextField} fullWidth required />
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

                </Paper>

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