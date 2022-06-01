import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { globalApi } from "../../types/api.types";
import {
  Button,
  createTheme,
  CssBaseline,
  Grid,
  Link,
  Paper,
  TextField,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
// import SwitchModeButton from "../controls/SwitchModeButton";
import Gead from "../../assets/logo.png";
import GeadWhite from "../../assets/logo-white.png";
import Switch from "@mui/material/Switch";
import Brightness2Icon from "@material-ui/icons/Brightness2";
import { WbSunny } from "@material-ui/icons";
import { authAxios } from "../../types/headerToken";

const LoginScreen = ({ history }) => {
  const { register, handleSubmit } = useForm();
  // formState: { errors },
  const [light, setLight] = useState(false);

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

  const style = createTheme({
    paper: {
      padding: 40,
      width: "384px",
      margin: "230px auto",
      borderRadius: "24px",
      backgroundColor: theme.palette.type === "dark" ? "#3B364E" : "#FFFFFF",
    },
    validation: {
      padding: 20,
      height: "60px",
      width: "160px",
      margin: "2rem auto",
      borderRadius: "24px",
    },
    validationPassword: {
      padding: 20,
      height: "60px",
      width: "190px",
      margin: "2rem auto",
      borderRadius: "24px",
    },
    logo: {
      // padding: 10,
      width: "7.2rem",
      // height: '18.32px',
      // left: '576px',
      // top: '305px',
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
    TextField: {
      margin: "0.5rem 0",
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

  // const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false); // Para usuario incorrecto
  const [passwordEditing, setPasswordEditing] = useState(false);

  const [leyendaEmail, setLeyendaEmail] = useState("");
  const [leyendaError, setLeyendaError] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);

  const [fecha, setFecha] = useState("");
          // -----------------  Fecha Ingles
  useEffect(() => {
    let h = new Date();

    let dia = h.getDate();
    let Month = h.getMonth() + 1;
    let anio = h.getFullYear();

    const dia1 = ('0' + dia).slice(-2);
    const mes1 = ('0' + Month).slice(-2);
    setFecha(`${anio}/${mes1}/${dia1}`);

    // let diaa = h.getUTCDate();
    // let Month = h.getUTCMonth() + 1;
    // let agnio = h.getUTCFullYear();
    // setFecha(`${diaa}/${Month}/${agnio}`);
  }, []);
          // -----------------  Login
  const onSubmit = (e) => {
    setEditing(false);
    setPasswordEditing(false);
    // console.log(e);
    e.LastLogin = fecha;

    axios
      .post(`${globalApi}/login`, e)
      .then((x) => {
        console.log(x);
        localStorage.setItem("token", x.data.token);
        // lastLogin(x)
        history.replace("/consultaEquipos");
      })
      .catch((x) => {
        // console.log(x?.response);
        if (x?.response.data.msg === "user not found") {
          setErrorEmail(true);
          setLeyendaEmail("Usuario incorrecto")
          setErrorPassword(false);
          setLeyendaError("")
        } else if (x?.response.data.msg === "pass not match") {
          setErrorEmail(false);
          setErrorPassword(true);
          setLeyendaEmail("")
          setLeyendaError("Contraseña incorrecta")
        } else {
          setErrorEmail(false);
          setErrorPassword(false)
          setLeyendaEmail("")
          setLeyendaError("")
        }
        // console.log(x?.response.data.msg)
      });


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
  };

  // const lastLogin = (x) => {
  //   authAxios.put(`${globalApi}/user/${x.data.data.Id_Usuario}`, {
  //     LastLogin: fecha,
  //   })
  //     .then((x) => {
  //       console.log(x);
  //     })
  //     .catch((x) => {
  //       console.log(x?.response);
  //     });
  // }
  //fadeInDown
  return (
    <ThemeProvider theme={theme}>
      <Grid>
        <Paper elevation={10} style={style.paper}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              {/* <img src={Gead} /> */}
              <Grid xs={7}>
                <img
                  src={theme.palette.type === "dark" ? GeadWhite : Gead}
                  style={style.logo}
                  alt=""
                />
              </Grid>
              <Grid xs={5}>
                <Brightness2Icon />
                <Switch
                  checked={light}
                  defaultChecked
                  onChange={() => setLight(!light)}
                />
                <WbSunny />
              </Grid>
            </Grid>

            <Grid> </Grid>
            <Typography style={style.h4}>¡Bienvenido!</Typography>
            <Typography style={style.txt}>
              Inicia sesión con tu cuenta asignada por tu administrador.
            </Typography>

            <TextField
              error={errorEmail}
              helperText={leyendaEmail}
              autoComplete="off"
              label="Nombre de usuario"
              name="email"
              placeholder="Name@example.com"
              variant="outlined"
              style={style.TextField}
              fullWidth
              required
              {...register("email", {
                required: {
                  value: true,
                  message: "Campo requerido",
                },
              })}
            />

            <TextField
              error={errorPassword}
              helperText={leyendaError}
              autoComplete="off"
              label="Contraseña"
              name="password"
              placeholder="password"
              variant="outlined"
              type="password"
              style={style.TextField}
              fullWidth
              required
              {...register("password", {
                required: {
                  value: true,
                  message: "Campo requerido",
                },
              })}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              style={style.btn}
            >
              Iniciar sesión
            </Button>

            {/* <Grid style={style.link}> */}
            <Typography style={style.link}>
              {" "}
              Si aún no tienes cuenta,
              <Link href="#" style={style.linkColor}>
                {" "}
                comunícate con tu administrador
              </Link>{" "}
              para asistencia.
            </Typography>
          </form>

          {editing ? (
            <>
              <Paper elevation={10} style={style.validation}>
                <span className="text-danger text-small d-block mb-2">
                  {/* {errors?.equipos?.message} */}
                  Usuario incorrecto
                </span>
              </Paper>
            </>
          ) : (
            <></>
          )}

          {passwordEditing ? (
            <>
              <Paper elevation={10} style={style.validationPassword}>
                <span className="text-danger text-small d-block mb-2">
                  {/* {errors?.equipos?.message} */}
                  Contraseña incorrecta
                </span>
              </Paper>
            </>
          ) : (
            <></>
          )}
        </Paper>
      </Grid>

      <Grid></Grid>

      <CssBaseline />
    </ThemeProvider>
  );
};

LoginScreen.propTypes = {
  valor: PropTypes.string,
};
export default LoginScreen;

//type='submit'
