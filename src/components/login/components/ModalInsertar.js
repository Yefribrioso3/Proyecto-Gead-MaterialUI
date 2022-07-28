import React, { useEffect, useState } from "react";
// { useState }
// import Axios from "axios";
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
import ExcelRegistro from "../ExcelRegistro";

export const ModalInsertar = ({
  modalInsertar,
  setModalInsertar,
  user,
  getUser,
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
    // console.log(user)
    const NewUser = {
      Name: user.Name,
      LastName: user.LastName,
      email: user.email,
      password: user.password,
      roleId: user.roleId,
      Estado: true,
      LastLogin: null,
      Id_Location: user.Id_Location,
      Area: user.Area
    }
    // console.log(NewUser)

    authAxios.post(`${globalApi}/register`, NewUser)
      .then((x) => {
        console.log(x);
      })
      .catch((x) => {
        console.log(x?.response);
      });

    // let newUser = user;
    // newUser.id = uuidv4();

    // let newUserAdd = allUser;
    // NewUser.id = uuidv4();
    // NewUser.Id_Location = NewUser.id;

    // newUserAdd.add(NewUser);

    // setAllUser([...allUser, newUser]);

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
                  <MenuItem value={2}>Maintenance Director</MenuItem>
                  <MenuItem value={3}>SPOC Maintenance BU</MenuItem>
                  <MenuItem value={4}>Maintenance Manager</MenuItem>
                  <MenuItem value={5}>Maintenance Coordinator Area</MenuItem>
                  <MenuItem value={6}>Viewer</MenuItem>
                  <MenuItem value={7}>Maintenance Manager Elaboration</MenuItem>
                </Select>
              </FormControl>
            </FormGroup>

            <FormGroup className="col-6">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Planta</InputLabel>
                <Select
                  name="Id_Location"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={user && user.Id_Location}
                  label="Planta"
                  variant="outlined"
                  required
                  onChange={handleChange}
                >
                  <MenuItem value={1}>DOMINICANA</MenuItem>
                  <MenuItem value={2}>APAN</MenuItem>
                  {/* //  ---- BARBADOS NO TIENE BU */}
                  {/*   ------ FABRICA DE TAPAS DE TOCANCIPA */}
                  {/*   ------ ETIQUETAS IMPRESUR & INDUGRAL */}
                  {/*   ------ MALTERIA TIBITO */}
                  {/*   ------ MALTERIA TROPICAL */}
                  {/*   ------ HOLGUIN */}
                  {/*   ------ MALTERIA DE GUAYAQUIL */}
                  {/*   ------ LA CONSTANCIA BEER */}
                  {/*   ------ LA CONSTANCIA WALTER */}
                  {/*   ------ ZACAPA */}
                  {/* CEBADAS Y MALTAS */}
                  {/* MALTERIA ZACATECAS - CONFIRMAR SI ES UNA PLANTA */}
                  {/* SALAMANCA (CASAL) */}
                  {/* CUCAPÁ (CRAFT) */}
                  {/* HUACHIPA */}
                  {/* SAN JUAN (PUCALLPA) */}
                  {/* BARBARIAN (CRAFT) */}
                  {/* BOGOTÁ BREWERY COMPANY (CRAFT) */}
                  <MenuItem value={3}>BARBADOS</MenuItem>
                  <MenuItem value={4}>BARRANQUILLA</MenuItem>
                  <MenuItem value={5}>BOYACA</MenuItem>
                  <MenuItem value={6}>BUCARAMANGA</MenuItem>
                  <MenuItem value={7}>FABRICA DE TAPAS DE TOCANCIPA</MenuItem>
                  <MenuItem value={8}>ETIQUETAS IMPRESUR & INDUGRAL</MenuItem>
                  <MenuItem value={9}>MEDELLIN</MenuItem>
                  <MenuItem value={10}>MALTERIA TIBITO</MenuItem>
                  <MenuItem value={11}>TONCACIPA</MenuItem>
                  <MenuItem value={12}>MALTERIA TROPICAL</MenuItem>
                  <MenuItem value={13}>VALLE</MenuItem>
                  <MenuItem value={14}>HOLGUIN</MenuItem>
                  <MenuItem value={15}>HATO NUEVO</MenuItem>
                  <MenuItem value={16}>GUAYAQUIL</MenuItem>
                  <MenuItem value={17}>QUITO</MenuItem>
                  <MenuItem value={18}>MALTERIA DE GUAYAQUIL</MenuItem>
                  <MenuItem value={19}>LA CONSTANCIA BEER</MenuItem>
                  <MenuItem value={20}>EL SALVADOR CSD</MenuItem>
                  <MenuItem value={21}>LA CONSTANCIA WALTER</MenuItem>
                  <MenuItem value={22}>ZACAPA</MenuItem>
                  <MenuItem value={23}>SAN PEDRO SULA BEER</MenuItem>
                  <MenuItem value={24}>SAN PEDRO SULA CSD</MenuItem>
                  <MenuItem value={25}>CEBADAS Y MALTAS</MenuItem>
                  <MenuItem value={26}>GUADALAJARA</MenuItem>
                  <MenuItem value={27}>MALTERIA ZACATECAS</MenuItem>
                  <MenuItem value={28}>MAZATLAN</MenuItem>
                  <MenuItem value={29}>MEXICO CITY</MenuItem>
                  <MenuItem value={30}>SALAMANCA (CASAL)</MenuItem>
                  <MenuItem value={31}>TORREÓN</MenuItem>
                  <MenuItem value={32}>TUXTEPEC</MenuItem>
                  <MenuItem value={33}>YUCATAN</MenuItem>
                  <MenuItem value={34}>ZACATECAS</MenuItem>
                  <MenuItem value={35}>CUCAPÁ (CRAFT)</MenuItem>
                  <MenuItem value={36}>PASADENA</MenuItem>
                  <MenuItem value={37}>AREQUIPA</MenuItem>
                  <MenuItem value={38}>ATE</MenuItem>
                  <MenuItem value={39}>CUSCO</MenuItem>
                  <MenuItem value={40}>HUACHIPA</MenuItem>
                  <MenuItem value={41}>MALTERIA DE LIMA</MenuItem>
                  <MenuItem value={42}>MOTUPE</MenuItem>
                  <MenuItem value={43}>SAN JUAN (PUCALLPA)</MenuItem>
                  <MenuItem value={44}>SAN MATEO (HUAROCHIRI)</MenuItem>
                  <MenuItem value={45}>BARBARIAN (CRAFT)</MenuItem>
                  <MenuItem value={46}>SAINT VINCENT</MenuItem>
                  <MenuItem value={47}>BOGOTÁ BREWERY COMPANY (CRAFT)</MenuItem>
                  <MenuItem value={48}>ENVASES Y TAPAS</MenuItem>
                  <MenuItem value={49}>VIDRIERA POTOSÍ</MenuItem>
                  <MenuItem value={51}>MERIDA</MenuItem>
                </Select>
              </FormControl>
            </FormGroup>

            <FormGroup className="col-6">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Area</InputLabel>
                <Select
                  name="Area"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={user && user.Area}
                  label="Area"
                  variant="outlined"
                  // required
                  onChange={handleChange}
                >
                  <MenuItem value={"GENERAL SERVICES"}>GENERAL SERVICES</MenuItem>
                  <MenuItem value={"SILOS"}>SILOS</MenuItem>
                  <MenuItem value={"MILLING"}>MILLING</MenuItem>
                  <MenuItem value={"BREWHOUSE"}>BREWHOUSE</MenuItem>
                  <MenuItem value={"BREWING"}>BREWING</MenuItem>
                  <MenuItem value={"FERMENTATION"}>FERMENTATION</MenuItem>
                  <MenuItem value={"MATURATION"}>MATURATION</MenuItem>
                  <MenuItem value={"CENTRIFUGE"}>CENTRIFUGE</MenuItem>
                  <MenuItem value={"FILTRATION"}>FILTRATION</MenuItem>
                  <MenuItem value={"DILUTION WATER"}>DILUTION WATER</MenuItem>
                  <MenuItem value={"BRIGHT BEER TANKS"}>BRIGHT BEER TANKS</MenuItem>
                  <MenuItem value={"PACKAGING"}>PACKAGING</MenuItem>
                  <MenuItem value={"CHEMICAL ISLAND & CIP"}>CHEMICAL ISLAND & CIP</MenuItem>
                  <MenuItem value={"SYRUP HOUSE"}>SYRUP HOUSE</MenuItem>
                  <MenuItem value={"LOGISTIC TIER 1"}>LOGISTIC TIER 1</MenuItem>
                  <MenuItem value={"LOGISTIC TIER 2"}>LOGISTIC TIER 2</MenuItem>
                  <MenuItem value={"CO2 RECOVERY"}>CO2 RECOVERY</MenuItem>
                  <MenuItem value={"REFRIGERATION"}>REFRIGERATION</MenuItem>
                  <MenuItem value={"WELLS"}>WELLS</MenuItem>
                  <MenuItem value={"WATER TREATMENT PLANT"}>WATER TREATMENT PLANT</MenuItem>
                  <MenuItem value={"ELECTRICAL SUBSTATION (HV)"}>ELECTRICAL SUBSTATION (HV)</MenuItem>
                  <MenuItem value={"ELECTRICAL SUBSTATION (MV)"}>ELECTRICAL SUBSTATION (MV)</MenuItem>
                  <MenuItem value={"ELECTRICAL SUBSTATION (LV)"}>ELECTRICAL SUBSTATION (LV)</MenuItem>
                  <MenuItem value={"STEAM GENERATION"}>STEAM GENERATION</MenuItem>
                  <MenuItem value={"BIOLOGICAL TREATMENT SYSTEM"}>BIOLOGICAL TREATMENT SYSTEM</MenuItem>
                  <MenuItem value={"TERTIARY SYSTEM"}>TERTIARY SYSTEM</MenuItem>
                  <MenuItem value={"SANITARY PLANT"}>SANITARY PLANT</MenuItem>
                  <MenuItem value={"AUTOMATION & INDUSTRIAL NETWORK"}>AUTOMATION & INDUSTRIAL NETWORK</MenuItem>
                  <MenuItem value={"MAINTENANCE"}>MAINTENANCE</MenuItem>
                  <MenuItem value={"IT"}>IT</MenuItem>
                  <MenuItem value={"IMPRESIÓN"}>IMPRESIÓN</MenuItem>
                  <MenuItem value={"LABORATORY"}>LABORATORY</MenuItem>
                  <MenuItem value={"WORKSHOP"}>WORKSHOP</MenuItem>
                  <MenuItem value={"OFFICES"}>OFFICES</MenuItem>
                  <MenuItem value={"PRODUCCION"}>PRODUCCION</MenuItem>
                  <MenuItem value={"SUBPRODUCTS"}>SUBPRODUCTS</MenuItem>
                  <MenuItem value={"UTILITIES"}>UTILITIES</MenuItem>
                  <MenuItem value={"PTA"}>PTA</MenuItem>
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
                        {/* --- Este --- */}
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
                            <Paper elevation={10} style={style.stylePass} >
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
                  theme.palette.type === "dark"
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
                  theme.palette.type === "dark"
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
