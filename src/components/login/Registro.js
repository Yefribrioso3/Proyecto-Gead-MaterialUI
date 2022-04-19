/* eslint-disable react/jsx-pascal-case */
// import { useForm } from 'react-hook-form';
// import ExcelRegistro from './ExcelRegistro';
import React, { useEffect, useState } from "react";
// import Axios from "axios";
import Head from "./Head";
import PropTypes from "prop-types";
import { DataGrid, esES } from "@mui/x-data-grid";
import Controls from "../controls/Controls";
// import { globalApi } from '../../types/api.types';
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
import { UserToken } from "../../pages/ConsultaEquipos";
import Gead from "../../assets/logo.png";
import GeadWhite from "../../assets/logo-white.png";
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
      backgroundColor: theme.palette.type == "dark" ? "#514A69" : "#FFFFFF",
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
        theme.palette.type == "dark"
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
        })
        .catch((x) => {
          console.log(x?.response);
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
  });

  const [userSeleccionado, setUserSeleccionado] = useState({
    id: "",
    Id_Usuario: "",
    Name: "",
    LastName: "",
    email: "",
    password: "",
    roleId: "",
  });

  const seleccionarUser = (elemento, caso) => {
    //Funcion para editar o eliminar el usuario seleccionado
    setUserSeleccionado(elemento);

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
    });
    // console.log(UserToken);
    setModalInsertar(true);
  };

  // Tabla menu

  const columns = [
    {
      field: "Name",
      headerName: "Usuario",
      flex: 1,
      width: 400,
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

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const handleSearch = (e) => {
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

  return (
    <ThemeProvider theme={theme}>
      <Head setLight={setLight} light={light} history={history}/>

      <Paper style={style.paper} light={light}>
        {/* elevation={10} */}
        {/* <img src={Gead} /> */}
        <Grid>
          <div className="row">
            <div className="col-3">
              <img
                src={theme.palette.type == "dark" ? GeadWhite : Gead}
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
                theme.palette.type == "dark"
                  ? theme.palette.background.dark
                  : theme.palette.background.light,
              backgroundColor:
                theme.palette.type == "dark" ? "#514A69" : "#FFFFFF",
              paddingTop: "1rem",
            }}
          >
            <DataGrid
              localeText={esES.components.MuiDataGrid.defaultProps.localeText}
              style={{
                border: "0",
                borderBottom: "0",
                color:
                  theme.palette.type == "dark"
                    ? theme.palette.primary.light
                    : theme.palette.primary.dark,
                "&:nth-of-type(odd)": {
                  backgroundColor: theme.palette.primary.dark,
                },
              }}
              // sx={{ m: 2 }}
              rows={filterFn.fn(allUser)}
              // style={{ color:"blue"}}
              columns={columns}
              pageSize={9}
              rowsPerPageOptions={[8]}
            />
          </div>
        </div>
      </Paper>
      {/* </Grid> */}

      <ModalInsertar
        modalInsertar={modalInsertar}
        setModalInsertar={setModalInsertar}
        user={user}
        setUser={setUser}
        allUser={allUser}
        setAllUser={setAllUser}
        light={light}
      />

      <ModalEditar
        authAxios={authAxios}
        modalEditar={modalEditar}
        setModalEditar={setModalEditar}
        userSeleccionado={userSeleccionado}
        setUserSeleccionado={setUserSeleccionado}
        allUser={allUser}
        light={light}
      />

      <CssBaseline />
    </ThemeProvider>
  );
};

Registro.propTypes = {
  valor: PropTypes.string,
};
export default Registro;
