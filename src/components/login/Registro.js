import React, { useEffect, useState } from "react";
import Head from "./Head";
import PropTypes from "prop-types";
import { DataGrid, esES, GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import Controls from "../controls/Controls";
import { ModalEditar } from "./components/ModalEditar";
import { ModalInsertar } from "./components/ModalInsertar";
import { Delete, Search, Visibility } from "@material-ui/icons";
import {
  Button,
  createTheme,
  CssBaseline,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import { authAxios } from "../../types/headerToken";
import Gead from "../../assets/logo.png";
import GeadWhite from "../../assets/logo-white.png";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { globalApi } from "../../types/api.types";
/* eslint-disable react/jsx-pascal-case */
// import { useForm } from 'react-hook-form';
// import ExcelRegistro from './ExcelRegistro';
// import Axios from "axios";
// import { globalApi } from '../../types/api.types';
// import { UserToken } from "../../pages/ConsultaEquipos";
// makeStyles, TextField,

const Registro = ({ history }) => {
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
  });

  function CustomToolbar() { // Para descargar Users en excel
    return (
      <GridToolbarContainer>
        <GridToolbarExport style={{
          color:
            theme.palette.type === "dark"
              ? theme.palette.primary.light
              : theme.palette.primary.dark,
          "&:MuiDataGridMenuList": {
            // &:MuiDataGrid-menuList
            backgroundColor: theme.palette.primary.dark,
          },
        }}
          printOptions={{ disableToolbarButton: true }}
        />
        {/* <GridColumnsToolbarButton />
        <GridFilterToolbarButton /> */}
      </GridToolbarContainer>
    );
  }

  // const { register, handleSubmit, formState: { errors } } = useForm();

  // --------------------     Estilos     --------------------
  // useEffect(() => {
  //     getUser();
  // }, []);

  const style = createTheme({
    paper: {
      padding: 40,
      height: "50rem",
      width: "70rem",
      margin: "130px auto",
      borderRadius: "24px",
      backgroundColor: theme.palette.type === "dark" ? "#514A69" : "#FFFFFF",
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
      width: "9rem",
    },
    h4: {
      fontStyle: "normal",
      fontWeight: "medium",
      fontSize: "34px",
      lineHeight: "140%",
      letterSpacing: "0.0025em",
      color:
        theme.palette.type === "dark"
          ? theme.palette.primary.dark
          : theme.palette.secondary.main,
      marginBottom: "0.5rem",
    },
    center: {
      alignItems: "center",
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
    link: {
      margin: "15px 10px 0 0",
      fontFamily: "Noto Sans",
      fontSize: 14,
      lineHeight: "140%",
      letterSpacing: "0.004em",
      // fontWeight: 'normal',
    },
    linkColor: {
      fontColor: "#14149A",
    },
    searchInput: {
      width: "100%",
    },
  });

  const [allUser, setAllUser] = useState([]); //  -------   Consulta al Api de User

  // const [userByToken, setUserByToken] = useState({}) //  -------   Consulta al Api de User

  const getUser = async () => {
    //  -------   Consulta al Api de User
    await authAxios.get(`/user`)
      .then(async (response) => {
        let a = await Promise.all(
          response.data.data.map((z) => ({ ...z, id: z.Id_Usuario }))
        );

        setAllUser(a);
      });
  };

  const [userByToken, setUserByToken] = useState({}); //  -------   Consulta al Api de User

  const getUserByToken = async () => {
    //  -------   Consulta al Api de User
    if (localStorage?.token) {
      await authAxios.get(`/user/user-data`)
        .then((response) => {
          setUserByToken(response.data.data);
          console.log(response);
          // if (response.data.data.Roles?.Name !== "ADMIN") {
          //   history.replace("/ConsultaEquipos");
          // }
        })
        .catch((x) => {
          // console.log(x?.response);
          if (x?.response.data.error.message === "jwt expired") {
            // console.log("hola");
            history.replace('/login');
          }
          // console.log(x?.response.data.msg)
        });
      // console.log(x?.response);
      // console.log(userByToken);
    } else {
      history.replace('/login');
    }
  };

  useEffect(() => {
    getUserByToken();
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const [modalEditar, setModalEditar] = useState(false); //Hook para abrir y cerrar el modalEditar
  const [modalEliminar, setModalEliminar] = useState(false); //Hook para abrir y cerrar el modal Eliminar
  const [modalInsertar, setModalInsertar] = useState(false); //Hook para abrir y cerrar el modal Insertar

  const [user, setUser] = useState({
    Name: "",
    LastName: "",
    email: "",
    roleId: "",
    password: "",
    Estado: true,
    LastLogin: "",
    Id_Location: "",
    Area: "",
  });

  const [userSeleccionado, setUserSeleccionado] = useState({
    id: "",
    Id_Usuario: "",
    Name: "",
    LastName: "",
    email: "",
    password: "",
    roleId: "",
    LastLogin: "",
    Id_Location: "",
    Area: "",
  });

  const seleccionarUser = (elemento, caso) => {
    //Funcion para editar o eliminar el usuario seleccionado
    setUserSeleccionado(elemento);
    console.log(elemento);
    caso === "Editar" ? setModalEditar(true) : setModalEliminar(true);
  };

  const abrirModalInsertar = () => {
    //Funcion para limpiar los valores y abrir el modal insertar
    setUser({
      Name: "",
      LastName: "",
      email: "",
      roleId: "",
      password: "",
      Estado: "",
      Area: "",
    });
    // console.log(UserToken);
    // console.log(allUser);

    setModalInsertar(true);
  };

  // Tabla menu

  const columns = [
    {
      field: "Name",
      headerName: "Usuario",
      flex: 1,
      width: 400,
      // editable: true,
      headerClassName: "header",
      renderCell: (params) => {
        return (
          <div
            style={{
              fontWeight: 600,
              // color: "blue",
              // width: "100%",
              // textAlign: "center"
            }}
          >
            {params.row.Name}
          </div>
        );
      },
    },
    {
      field: "LastName",
      headerName: "Apellido",
      flex: 1,
      width: 150,
      valueGetter: (params) => {
        return params.row.LastName;
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 210,
      flex: 1,
      valueGetter: (params) => {
        return params.row.email;
      },
    },
    {
      field: "actions",
      headerName: "Acciones",
      width: 210,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <div className="d-flex justify-content-between">
          <div
            onClick={() => seleccionarUser(params.row, "Editar")}
            component="span"
          >
            <IconButton color="primary" aria-label="edit" component="span">
              <Visibility />
            </IconButton>
          </div>

          <div
            color="secondary"
            aria-label="delete"
            onClick={() => seleccionarUser(params.row, "Eliminar")}
            component="span"
          >
            <IconButton color="secondary" aria-label="delete">
              <Delete />
            </IconButton>
          </div>
        </div>
      ),
    },
    /* {
          field: "a",
          headerName: "Actions",
          width: 100,
          sortable: false,
          align: "center",
          disableColumnMenu: true,
          renderCell: (params) => (
            <div onClick={(e) => deleteGts(e, params.id)}>
              <Tooltip title="Delete">
                <IconButton>
                  <Delete />
                </IconButton>
              </Tooltip>
            </div>
          ),
        }, */
  ];

  const [filterFn, setFilterFn] = useState({    //  ---------- Filtro
    fn: (items) => {
      return items;
    },
  });

  const handleSearch = (e) => {   // --------- Filtro
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value === "") return items;
        else
          return items.filter(
            (x) =>
              x.Name.toLowerCase().includes(target.value.toLowerCase()) ||
              x.LastName.toLowerCase().includes(target.value.toLowerCase()) ||
              x.email.toLowerCase().includes(target.value.toLowerCase())
          );
      },
    });
  };

  const eliminar = () => {

    const equipo = userSeleccionado;
    equipo.Estado = false;

    setAllUser(
      allUser.filter(
        (equipo) => equipo.Id_Usuario !== userSeleccionado.Id_Usuario
      )
    );

    EliminarUser(equipo);
    setModalEliminar(false);
  };

  const EliminarUser = async (Equipo) => {
    await authAxios.put(`${globalApi}/user/${Equipo.Id_Usuario}`, {
      Name: Equipo.Name,
      LastName: Equipo.LastName,
      email: Equipo.email,
      roleId: Equipo.roleId,
      Estado: Equipo.Estado,
    });
  };
  //        ---------------------------   Fecha --------

  return (
    <ThemeProvider theme={theme}>
      <Head setLight={setLight} light={light} history={history} />

      <Paper style={style.paper} light={light}>
        {/* elevation={10} */}
        {/* <img src={Gead} /> */}
        <Grid>
          <div className="row">
            <div className="col-3">
              <img
                src={theme.palette.type === "dark" ? GeadWhite : Gead}
                style={style.logo}
                alt=""
              />
            </div>
            <div className="col-9">
              <Typography style={style.h4}>
                {" "}
                &nbsp; &nbsp; &nbsp;Registro de usuarios
              </Typography>
            </div>
          </div>
        </Grid>

        {/* // ------------------ Serch Input  ------------------------------- */}
        <div className="row">
          <div className="col-8">
            <Controls.txt
              label="Buscar Usuario"
              id="outlined-basic"
              className={style.searchInput}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              onChange={handleSearch}
            />
          </div>
          {/* -----------------       Boton Nuevo Usuario     ------------------ */}
          <div className="col-4">
            <Button
              variant="contained"
              size="large"
              color="secondary"
              type="submit"
              style={{ fontSize: 16, fontWeight: "600" }}
              fullWidth
              onClick={() => {
                abrirModalInsertar();
              }}
            >
              {" "}
              NUEVO USUARIO{" "}
            </Button>
          </div>
        </div>
        {/* ------------------  Tabla   -------------------- */}
        <div>
          <div
            style={{
              height: 600,
              width: "100%",
              color:
                theme.palette.type === "dark"
                  ? theme.palette.background.dark
                  : theme.palette.background.light,
              backgroundColor:
                theme.palette.type === "dark" ? "#514A69" : "#FFFFFF",
              paddingTop: "1rem",
            }}
          >
            <DataGrid
              localeText={esES.components.MuiDataGrid.defaultProps.localeText}
              rows={filterFn.fn(allUser)}
              loading={allUser.length === 0}
              disableSelectionOnClick
              columns={columns}
              pageSize={9}
              rowsPerPageOptions={[8]}
              components={{
                Toolbar: CustomToolbar,
              }}
              style={{
                border: "0",
                borderBottom: "0",
                color:
                  theme.palette.type === "dark"
                    ? theme.palette.primary.light
                    : theme.palette.primary.dark,
                "&:nth-of-type(odd)": {
                  backgroundColor: theme.palette.primary.dark,
                },
              }}
            // sx={{ m: 2 }}
            // style={{ color:"blue"}}
            />
          </div>
        </div>
      </Paper>
      {/* </Grid> */}

      <ModalInsertar
        authAxios={authAxios}
        modalInsertar={modalInsertar}
        setModalInsertar={setModalInsertar}
        user={user}
        getUser={getUser}
        setUser={setUser}
        allUser={allUser}
        setAllUser={setAllUser}
        light={light}
      />

      <ModalEditar
        setAllUser={setAllUser}
        authAxios={authAxios}
        modalEditar={modalEditar}
        setModalEditar={setModalEditar}
        userSeleccionado={userSeleccionado}
        setUserSeleccionado={setUserSeleccionado}
        allUser={allUser}
        light={light}
      />



      {/*============================= Modal Eliminar =========================================*/}

      <Modal isOpen={modalEliminar}
        className={`text-center modalForm ${theme.palette.type}`}
        style={{
          marginTop: "9rem",
          fontSize: "1.2rem",
          color:
            theme.palette.type === "dark"
              ? theme.palette.primary.light
              : theme.palette.secondary.dark,
          backgroundColor:
            theme.palette.type === "dark" ? "#3F3857" : "#FFFFFF",
        }}
      >
        {/* <ModalHeader
          style={{
            color:
              theme.palette.type === "dark"
                ? theme.palette.primary.light
                : theme.palette.secondary,
          }}>

        </ModalHeader> */}

        <ModalBody>
          Estás seguro que deseas eliminar el usuario: <br />
          {userSeleccionado && userSeleccionado.email}
        </ModalBody>

        <ModalFooter
          className="justify-content-center"
          style={{
            backgroundColor:
              theme.palette.type === "dark" ? "#3F3857" : "#FFFFFF",
          }}
        >
          <Button
            style={{
              color:
                theme.palette.type === "dark"
                  ? theme.palette.primary.light
                  : theme.palette.secondary.light,
            }}
            variant="outlined"
            onClick={() => setModalEliminar(false)}
          >
            No quiero eliminar
          </Button>
          <Button
            style={{
              color: "#ffffff",
              backgroundColor:
                theme.palette.type === "dark"
                  ? theme.palette.secondary.light
                  : "#6200EE",
            }}
            variant="contained"
            onClick={() => eliminar()}
          >
            Sí, eliminar
          </Button>
        </ModalFooter>
      </Modal>

      <CssBaseline />
    </ThemeProvider>
  );
};

Registro.propTypes = {
  valor: PropTypes.string,
};
export default Registro;
