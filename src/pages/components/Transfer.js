import React from "react";
import Gead from "../../assets/Gead.jpeg";
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

export const Transfer = ({ setmostrarMenus }) => {
  const style = createTheme({
    paper: {
      padding: 40,
      height: "40rem",
      width: "70rem",
      margin: "130px auto",
      borderRadius: "24px",
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
      fontWeight: "bold",
      fontSize: "34px",
      lineHeight: "140%",
      letterSpacing: "0.0025em",
      color: "#14149A",
      marginBottom: "0.5rem",
      // marginTop: "0.5rem",
      // fontFamily: 'Roboto',
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
    <>
      <Paper style={style.paper}>
        <Grid>
          <div className="row">
            <div className="col-3">
              <img src={Gead} style={style.logo} alt="" />
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
              type="submit"
              color="primary"
              variant="contained"
              fullWidth
              style={style.btn}
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
              height: 450,
              width: "100%",
              backgroundColor: "white",
              paddingTop: "1rem",
            }}
          >
            <DataGrid
              // rows={filterFn.fn(allUser)}
              localeText={esES.components.MuiDataGrid.defaultProps.localeText}
              columns={columns}
              pageSize={9}
              rowsPerPageOptions={[8]}
              // sx={{ m: 2 }}
              // style={{ color:"blue"}}
            />
          </div>
        </div>
      </Paper>
    </>
  );
};
