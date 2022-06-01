import React from "react";
import { useForm } from "react-hook-form";
import { globalApi } from "../../../types/api.types";
import { ModalHeader, ModalBody, ModalFooter, FormGroup } from "reactstrap";
import {
  Button,
  createTheme,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { Modal } from "@mui/material";
import Box from "@mui/material/Box";
import { ThemeProvider } from "@material-ui/styles";

// { useState }
// import Axios from "axios";
// Modal,

export const ModalEditar = ({
  modalEditar,
  setModalEditar,
  userSeleccionado,
  setUserSeleccionado,
  allUser,
  setAllUser,
  light,
  authAxios
}) => {
  const { handleSubmit } = useForm();

  const handleChange = (e) => {
    //  ---- Capturar valores
    // console.log(e.target.value);

    const { name, value } = e.target;

    setUserSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
      // fontFamily: 'Roboto',
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "34px",
      lineHeight: "140%",
      letterSpacing: "0.0025em",
      color: "#14149A",
      // marginTop: "0.5rem",
      marginBottom: "0.5rem",
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
      background: "#593FCC",
      borderRadius: "8px",
      fontFamily: "Noto Sans",
      fontSize: 14,
      lineHeight: "200%",
      letterSpacing: "0.0125em",
    },
  });

  const onSubmit = (e) => {
    // -------- Peticion al Api para actualizar usuario
    // let Users = allUser;
    // console.log(userSeleccionado)

    authAxios.put(`${globalApi}/user/${userSeleccionado.Id_Usuario}`, {
      Name: userSeleccionado.Name,
      LastName: userSeleccionado.LastName,
      email: userSeleccionado.email,
      roleId: userSeleccionado.roleId,
      Estado: userSeleccionado.Estado,
      Id_Location: userSeleccionado.Id_Location,
    })
      .then((x) => {
        console.log(x);
        alert("Successful Updated");
      })
      .catch((x) => {
        console.log(x?.response);
      });

    // Users.map((equipo) => {
    //   if (equipo.Id_Usuario === userSeleccionado.Id_Usuario) {
    //     equipo.Name = userSeleccionado.Name;
    //     equipo.LastName = userSeleccionado.LastName;
    //     equipo.email = userSeleccionado.email;
    //     equipo.roleId = userSeleccionado.roleId;
    //     equipo.Estado = userSeleccionado.Estado;
    //   }
    // });

    setModalEditar(false);
  };

  const styl = {
    //    ----    Estilos del modal MUI -------
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    // bgcolor: "background.paper",
    border: "1px solid #000",
    borderRadius: "25px",
    boxShadow: 24,
    p: 2,
  };

  const handleClose = () => setModalEditar(false); //  ---------   Cerrar el Modal   ------------

  // const actualizar = async () => {
  //   const UsersAdmin = allUser.filter((u) => u.roleId === 1);

  //   console.log(UsersAdmin);

  //   const user = UsersAdmin.map((u) => {
  //     return u.email === "yefribrioso3@gmail.com" ? u = {
  //       Id_Usuario: u.Id_Usuario,
  //       Name: u.Name,
  //       LastName: u.LastName,
  //       email: u.email,
  //       roleId: u.roleId,
  //       Estado: u.Estado,
  //     } :
  //       u = {
  //         Id_Usuario: u.Id_Usuario,
  //         Name: u.Name,
  //         LastName: u.LastName,
  //         email: u.email,
  //         roleId: 4,
  //         Estado: u.Estado,
  //       }
  //   })
  //   console.log(user);

  //   await actualizarRol(user);
  // };

  // const actualizarRol = async (user) => {
  //   user.map(async (u) => {
  //     await authAxios.put(`${globalApi}/user/${u.Id_Usuario}`, u);
  //   }).then((x) => {
  //     console.log(x);
  //     alert("Successful Updated");
  //   })
  //     .catch((x) => {
  //       console.log(x?.response);
  //     });
  // };

  // < Modal isOpen={modalEditar} style={{ maxWidth: 500, paddingTop: '9rem' }}>
  return (
    <ThemeProvider theme={theme}>
      <Modal
        open={modalEditar}
        onClose={handleClose}

      >
        <Box sx={styl}
          className={`modalForm ${theme.palette.type}`}
          style={{
            maxWidth: 500,
            // marginTop: "9rem",
          }}
        >
          <ModalHeader>
            <div>
              <h1 style={{
                color:
                  theme.palette.type === "dark"
                    ? theme.palette.primary.light
                    : theme.palette.secondary,
              }}
              >
                Editar usuario</h1>
            </div>
          </ModalHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody className="row animate__animated animate__fadeIn">

              {/* <div>
                <Button onClick={() => actualizar()}>
                  Actualizar Rol
                </Button>
              </div> */}
              
              <FormGroup className="col-6">
                <TextField
                  name="Name"
                  placeholder="Nombre"
                  value={userSeleccionado && userSeleccionado.Name}
                  onChange={handleChange}
                  required
                  label="Nombre"
                  variant="outlined"
                  fullWidth
                />
              </FormGroup>

              <FormGroup className="col-6">
                <TextField
                  label="Apellido"
                  name="LastName"
                  placeholder="Apellido"
                  variant="outlined"
                  value={userSeleccionado && userSeleccionado.LastName}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </FormGroup>

              <FormGroup className="col-6">
                <TextField
                  label="Correo"
                  name="email"
                  placeholder="Correo"
                  variant="outlined"
                  value={userSeleccionado && userSeleccionado.email}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </FormGroup>

              <FormGroup className="col-6">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Role</InputLabel>
                  <Select
                    name="roleId"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={userSeleccionado && userSeleccionado.roleId}
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


              <FormGroup className="col-6">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Planta</InputLabel>
                  <Select
                    name="Id_Location"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={userSeleccionado && userSeleccionado.Id_Location}
                    label="Planta"
                    variant="outlined"
                    required
                    onChange={handleChange}
                  >
                    <MenuItem value={1}>DOMINICANA</MenuItem>
                    <MenuItem value={2}>APAN</MenuItem>
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
                    <MenuItem value={28}>MAZATLÁN</MenuItem>
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
                    <MenuItem value={50}>MAZATLAN</MenuItem>
                  </Select>
                </FormControl>
              </FormGroup>

              {/* DOMINICANA */}

              <FormGroup className="col-6">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Estado</InputLabel>
                  <Select
                    name="Estado"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={userSeleccionado && userSeleccionado.Estado}
                    label="Estado"
                    variant="outlined"
                    required
                    onChange={handleChange}
                  >
                    <MenuItem value={true}>Activo</MenuItem>
                    <MenuItem value={false}>Inactivo</MenuItem>
                  </Select>
                </FormControl>
              </FormGroup>





              {/* <FormGroup>
              <TextField label="Contraseña"
                name='password'
                placeholder='password'
                variant="outlined"
                value={userSeleccionado && userSeleccionado.password}
                onChange={handleChange}
                fullWidth
                required
              />
            </FormGroup> */}
            </ModalBody>

            {/* ----------------  Botones de Aceptar - Cancelar   ----------------------- */}
            <ModalFooter>
              {/* --------------------  CANCELAR -------------------- */}
              <Button
                style={{
                  color:
                    theme.palette.type === "dark"
                      ? theme.palette.primary.light
                      : theme.palette.secondary.light,
                }}
                variant="outlined"
                onClick={() => {
                  setModalEditar(false);
                }}
              >
                Cancelar
              </Button>

              {/* --------------------  ACEPTAR -------------------- */}
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
        </Box>
      </Modal>
    </ThemeProvider>
  );
};
