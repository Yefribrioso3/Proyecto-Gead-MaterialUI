import React from "react";
// { useState }
import Axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import { globalApi } from "../../../types/api.types";
import {
  Button,
  createTheme,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
} from "reactstrap";
import { ThemeProvider } from "@material-ui/styles";
export const ModalInsertar = ({
  modalInsertar,
  setModalInsertar,
  user,
  setUser,
  allUser,
  setAllUser,
  light,
  authAxios
}) => {
  const {
    handleSubmit,
    formState: { errors },
  } = useForm();
  // register,

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    console.log(user)
    const NewUser = {
      Name: user.Name,
      LastName: user.LastName,
      email: user.email,
      password: user.password,
      roleId: user.roleId
    }
    authAxios.post(`${globalApi}/register`, NewUser)
      .then((x) => {
        console.log(x);
      })
      .catch((x) => {
        console.log(x?.response);
      });

    let newUser = user;
    newUser.id = uuidv4();

    setAllUser([...allUser, newUser]);

    setModalInsertar(false);

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
        main: "#3F3857",
        light: "#FFFFFF",
        dark: "#3F3857",
      },
      alert: {
        main: "#C60055",
      },
    },
  });
  const style = createTheme({
    validationPassword: {
      padding: 20,
      height: "60px",
      width: "190px",
      margin: "2rem auto",
      borderRadius: "24px",
    },
    h4: {
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "34px",
      lineHeight: "140%",
      letterSpacing: "0.0025em",
      color: "#14149A",
      marginBottom: "0.5rem",
      // marginTop: "0.5rem",
      // fontFamily: 'Roboto',
    },
    txt: {
      fontFamily: "Work Sans",
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: 14,
      lineHeight: "140%",
      letterSpacing: "-0.02em",
      marginBottom: "2rem",
      /* or 18px */
    },
    TextField: {
      margin: "0.5rem 0",
    },
    btn: {
      margin: "8px 0",
      background: "#593FCC",
      borderRadius: "8px",
      fontFamily: "Noto Sans",
      fontSize: 14,
      lineHeight: "200%",
      letterSpacing: "0.0125em",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Modal
        isOpen={modalInsertar}
        className={`modalForm ${theme.palette.type}`}
        style={{
          maxWidth: 500,
          marginTop: "9rem",
        }}
      >
        <ModalHeader>
          <div>
            <h1
              style={{
                color:
                  theme.palette.type === "dark"
                    ? theme.palette.primary.light
                    : theme.palette.secondary,
              }}
            >
              Crear usuario
            </h1>
          </div>
        </ModalHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody className="row animate__animated animate__fadeIn">
            {/* <Typography style={style.txt}>Inicia sesión con tu cuenta asignada por tu administrador.</Typography> */}
            <FormGroup className="col-6">
              <TextField
                name="Name"
                placeholder="Nombre"
                value={user ? user.Name : ""}
                onChange={handleChange}
                required
                label="Nombre"
                variant="outlined"
                fullWidth
                // style={style.TextField}
                // {...register("Name", {
                //   required: {
                //     value: true,
                //     message: 'Campo requerido'
                //   }
                // })}
              />

              {/* -----------------   Prueba  --------------------- */}
              {/* <TextField
                // name='Name'
                // placeholder='Nombre'
                // style={style.TextField}
                // value={user ? user.Name : ''}
                // onChange={handleChange}
                // required
                color="warning"
                helperText={!!errors.Name && 'Name required'}
                autoComplete="off"
                {...register('Name', { required: { value: true } })}
                error={!!errors.Name}
                // message: 'Campo requerido'
                label="Nombre"
                variant="outlined"
                fullWidth
              /> */}
            </FormGroup>

            <FormGroup className="col-6">
              <TextField
                label="Apellido"
                name="LastName"
                placeholder="Apellido"
                variant="outlined"
                value={user ? user.LastName : ""}
                onChange={handleChange}
                fullWidth
                required
                // style={style.TextField}
                // {...register("LastName", {
                //   required: {
                //     value: true,
                //     message: 'Campo requerido'
                //   }
                // })}
              />
            </FormGroup>

            <FormGroup className="col-6">
              <TextField
                label="Correo"
                name="email"
                placeholder="Correo"
                variant="outlined"
                value={user ? user.email : ""}
                onChange={handleChange}
                fullWidth
                required
                // style={style.TextField}
                // {...register("email", {
                //   required: {
                //     value: true,
                //     message: 'Campo requerido'
                //   }
                // })}
              />
            </FormGroup>

            <FormGroup className="col-6">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                  name="roleId"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={user ? user.roleId : ""}
                  label="Role"
                  variant="outlined"
                  required
                  onChange={handleChange}
                >
                  <MenuItem value={1}>ADMIN</MenuItem>
                  <MenuItem value={2}>SUPERVISOR</MenuItem>
                  <MenuItem value={3}>PLANTA</MenuItem>
                  <MenuItem value={4}>GERENTE</MenuItem>
                </Select>
              </FormControl>
            </FormGroup>

            <FormGroup>
              <TextField
                label="Contraseña"
                name="password"
                placeholder="password"
                variant="outlined"
                value={user ? user.password : ""}
                onChange={handleChange}
                fullWidth
                required
                // type='password'
                // obscureText="true"
                // style={style.TextField}
                // {...register("password", {
                //   required: {
                //     value: true,
                //     message: 'Campo requerido'
                //   }
                // })}
              />
            </FormGroup>

            {/* <Button type='submit'
              color="primary"
              variant='contained'
              fullWidth
              style={style.btn}
            >
              Crear Cuenta
            </Button> */}

            {/* <Typography style={style.link}> Si aún no tienes cuenta,
                            <Link href='#' style={style.linkColor} color="#14149A"> comunícate con tu administrador</Link>  para asistencia.
                        </Typography> */}

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
          </ModalBody>

          <ModalFooter>
            {/* onClick={() => editar()} */}
            <Button
              style={{
                color:
                  theme.palette.type == "dark"
                    ? theme.palette.primary.light
                    : theme.palette.secondary.light,
              }}
              variant="outlined"
              onClick={() => {
                setModalInsertar(false);
              }}
            >
              Cancelar
            </Button>
            <Button
              style={{
                color: "#ffffff",
                backgroundColor:
                  theme.palette.type == "dark"
                    ? theme.palette.secondary.light
                    : "#6200EE",
              }}
              type="submit"
              variant="contained"
            >
              Aceptar
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </ThemeProvider>
  );
};
