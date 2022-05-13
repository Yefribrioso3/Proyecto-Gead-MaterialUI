import React, { useState } from "react";
import Gead from "../../assets/logo.png";
import GeadWhite from "../../assets/logo-white.png";
import { DataGrid, esES } from "@mui/x-data-grid";
import Controls from "../../components/controls/Controls";
import { Delete, Search, Visibility } from "@material-ui/icons";
import {
  Button,
  createTheme,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Typography,
} from "@material-ui/core";

import { ThemeProvider } from "@material-ui/styles";

export const Transfer = ({ setmostrarMenus, light }) => {
  const theme = createTheme(
    {
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
    },
    esES
  );
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
      // padding: 10,
      // top: '305px',
      // left: '576px',
      // height: '18.32px',
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
      fontSize: 12,
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

  const columns = [
    {
      field: "Name",
      headerName: "Equipo",
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
      field: "fecha",
      headerName: "Fecha",
      flex: 1,
      width: 150,
      valueGetter: (params) => {
        return params.row.LastName;
      },
    },
    {
      field: "plantaOrigen",
      headerName: "Planta origen",
      width: 210,
      flex: 1,
      valueGetter: (params) => {
        return params.row.email;
      },
    },
    {
      field: "plantaDestino",
      headerName: "Planta destino",
      width: 210,
      flex: 1,
      valueGetter: (params) => {
        return params.row.email;
      },
    },
    {
      field: "estado",
      headerName: "Estado",
      width: 210,
      flex: 1,
      valueGetter: (params) => {
        return params.row.email;
      },
    },
    {
      field: "actions",
      headerName: "Acciones",
      width: 200,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <div className="d-flex justify-content-between">
          <div
            // onClick={() => seleccionarUser(params.row, 'Editar')}
            component="span"
          >
            <IconButton color="primary" aria-label="edit" component="span">
              <Visibility />
            </IconButton>
          </div>

          <div
            color="secondary"
            aria-label="delete"
            // onClick={() => seleccionarUser(params.row, 'Eliminar')}
            component="span"
          >
            <IconButton color="secondary" aria-label="delete">
              <Delete />
            </IconButton>
          </div>
        </div>
      ),
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Paper style={style.paper} light={light}>
        <Grid>
          <div className="row">
            <div className="col-3">
              <img
                src={theme.palette.type == "dark" ? GeadWhite : Gead}
                style={style.logo}
                alt="GEAD"
              />
            </div>
            <div className="col-9">
              <Typography style={style.h4}>
                {" "}
                &nbsp;Transferencias entre plantas
              </Typography>
            </div>
          </div>
        </Grid>

        {/* // ------------------ Serch Input  ------------------------------- */}
        <div className="row">
          <div className="col-8">
            <Controls.txt
              label="Search Equipment"
              id="outlined-basic"
              className={style.searchInput}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              // onChange={handleSearch}
            />
          </div>
          {/* -----------------       Boton Nuevo Usuario     ------------------ */}
          <div className="col-4">
            <Button
              variant="contained"
              size="large"
              color="secondary"
              type="submit"
              style={{ fontSize: 12, fontWeight: "600" }}
              fullWidth
              onClick={() => {
                setmostrarMenus(false);
              }}
            >
              {" "}
              Nueva transferencia entre plantas{" "}
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
              // rows={filterFn.fn(allUser)}
              localeText={esES.components.MuiDataGrid.defaultProps.localeText}
              columns={columns}
              pageSize={9}
              rowsPerPageOptions={[8]}
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
              // style={{ color:"blue"}}
            />
          </div>
        </div>
      </Paper>
    </ThemeProvider>
  );
};
