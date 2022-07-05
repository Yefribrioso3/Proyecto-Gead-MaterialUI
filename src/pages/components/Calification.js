import { IconButton, Grid, Typography } from "@material-ui/core";
// TextField
import { ArrowDropDown, ArrowDropUp } from "@material-ui/icons";
import React, { useState } from "react";

import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";

// , ModalBody

export function OneStar() {
  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Grid item xs={3} style={{ color: "orange" }}>
        <StarIcon />
        <StarBorderIcon />
        <StarBorderIcon />
        <StarBorderIcon />
        <StarBorderIcon />
      </Grid>
      <Grid item xs={9}>
        <Typography variant="body2">
          Equipo viejo u obsoleto, sin partes o accesorios utilizables, tiempo
          de vida superado y con valor financiero muy bajo. Este equipo que ya no
          da un valor ABInBev MAZ y no puede tener una segunda vida útil.
        </Typography>
      </Grid>
    </Grid>
  );
}
export function TwoStar() {
  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Grid item xs={3} style={{ color: "orange" }}>
        <StarIcon />
        <StarIcon />
        <StarBorderIcon />
        <StarBorderIcon />
        <StarBorderIcon />
      </Grid>
      <Grid item xs={9}>
        <Typography variant="body2">
          Equipo con un periodo de vida mas elevado pero con partes y accesorios
          que pueden ser reutilizados nuevamente en algún proceso similar dentro
          de la zona con ciertas precauciones.
        </Typography>
      </Grid>
    </Grid>
  );
}
export function ThreeStar() {
  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Grid item xs={3} style={{ color: "orange" }}>
        <StarIcon />
        <StarIcon />
        <StarIcon />
        <StarBorderIcon />
        <StarBorderIcon />
      </Grid>
      <Grid item xs={9}>
        <Typography variant="body2">
          Equipo con mas de 5 años, trabajando en la línea o desmontado, pero en
          buenas condiciones y con un periodo de vida útil suficiente como para
          poder ser reubicado en alguna cervecería de ABInBev MAZ
        </Typography>
      </Grid>
    </Grid>
  );
}
export function FourStar() {
  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Grid item xs={3} style={{ color: "orange" }}>
        <StarIcon />
        <StarIcon />
        <StarIcon />
        <StarIcon />
        <StarBorderIcon />
      </Grid>
      <Grid item xs={9}>
        <Typography variant="body2">
          Equipo nuevo instalado o desinstalado, que esta en buenas condiciones
          y de fácil implementación en una nueva ubicación de ABInBev MAZ.
        </Typography>
      </Grid>
    </Grid>
  );
}
export function FiveStar() {
  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Grid item xs={3} style={{ color: "orange" }}>
        <StarIcon />
        <StarIcon />
        <StarIcon />
        <StarIcon />
        <StarIcon />
      </Grid>
      <Grid item xs={9}>
        <Typography variant="body2">
          Equipo en la caja original del proveedor, en buenas condiciones y
          listo para agregar valor a nuestros procesos y cervecerías de ABInBev
          MAZ.
        </Typography>
      </Grid>
    </Grid>
  );
}
export const Calification = ({ light, technicalInformation, setTechnicalInformation,
  errorCurrendConditions, leyendaCurrendConditions, setErrorCurrendConditions, setLeyendaCurrendConditions }) => {

  const [icon, setIcon] = useState(false);

  const [calificationInfo, setCalificationInfo] = useState(false);

  const CalificationInfo = (value, more) => {
    setCalificationInfo(value);

    setIcon(value);
  };

  const [state, setState] = React.useState({
    checkedA: technicalInformation.CurrentConditions === "To be disposed" ? true : false,
    checkedB: technicalInformation.CurrentConditions === "Bad" ? true : false,
    checkedC: technicalInformation.CurrentConditions === "Regular" ? true : false,
    checkedD: technicalInformation.CurrentConditions === "Good" ? true : false,
    checkedE: technicalInformation.CurrentConditions === "Excellent" ? true : false,
  });
  const handleChange = (event) => {
    if (event.target.value !== "false") {
      setErrorCurrendConditions(false);
      setLeyendaCurrendConditions("");
    }
    let equipo = technicalInformation;
    if (event.target.name === "checkedA") {
      setState({
        checkedA: event.target.checked,
        checkedB: false,
        checkedC: false,
        checkedD: false,
        checkedE: false,
      });
      equipo.CurrentConditions = state.checkedA !== true ? "To be disposed" : "NO DATA AVAILABLE";
      setTechnicalInformation(equipo)

    } else if (event.target.name === "checkedB") {
      setState({
        checkedA: false,
        checkedB: event.target.checked,
        checkedC: false,
        checkedD: false,
        checkedE: false,
      });
      equipo.CurrentConditions = state.checkedB !== true ? "Bad" : "NO DATA AVAILABLE";
      setTechnicalInformation(equipo)

    } else if (event.target.name === "checkedC") {
      setState({
        checkedA: false,
        checkedB: false,
        checkedC: event.target.checked,
        checkedD: false,
        checkedE: false,
      });
      equipo.CurrentConditions = state.checkedC !== true ? "Regular" : "NO DATA AVAILABLE";
      setTechnicalInformation(equipo)

    } else if (event.target.name === "checkedD") {
      setState({
        checkedA: false,
        checkedB: false,
        checkedC: false,
        checkedD: event.target.checked,
        checkedE: false,
      });
      equipo.CurrentConditions = state.checkedD !== true ? "Good" : "NO DATA AVAILABLE";
      setTechnicalInformation(equipo)

    } else if (event.target.name === "checkedE") {
      setState({
        checkedA: false,
        checkedB: false,
        checkedC: false,
        checkedD: false,
        checkedE: event.target.checked,
      });
      equipo.CurrentConditions = state.checkedE !== true ? "Excellent" : "NO DATA AVAILABLE";
      // console.log(state.checkedE)
      setTechnicalInformation(equipo)
    }
    // console.log(equipo, "1");
    // console.log(technicalInformation, "2");
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
    },
  });

  return (
    <ThemeProvider theme={theme}>
      {/* -------------------------------         ADD TECHNICAL INFORMATION           ------------------------------------------ */}

      <div className="mb-2">
        <a
          className="btn ml-0 mr-4 col-4"
          onClick={() => CalificationInfo(!calificationInfo)}
          style={{ display: "inline-flex" }}
        >
          <h5
            style={{
              color:
                errorCurrendConditions
                  ? "red"
                  : theme.palette.type === "dark"
                    ? theme.palette.primary.light
                    : theme.palette.secondary,
            }}
          >
            {icon ? (
              <IconButton color="primary" aria-label="edit" component="span">
                <ArrowDropUp />
              </IconButton>
            ) : (
              <IconButton color="primary" aria-label="edit" component="span">
                <ArrowDropDown />
              </IconButton>
            )}
            Condición actual del equipo: * <br />
            {leyendaCurrendConditions ? <span style={{ color: "#d32f2f", fontSize: "14px" }} >Campo Requerido</span> : null}
          </h5>
          {/* <h6 className="ml-2 mt-3 mr-4 col-4">

          </h6> */}
        </a>
      </div>


      {calificationInfo ? (
        <>
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.checkedA}
                  onChange={handleChange}
                  name="checkedA"
                  color="primary"
                />
              }
              label={<OneStar />}
            />
          </FormGroup>
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.checkedB}
                  onChange={handleChange}
                  name="checkedB"
                  color="primary"
                />
              }
              label={<TwoStar />}
            />
          </FormGroup>
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.checkedC}
                  onChange={handleChange}
                  name="checkedC"
                  color="primary"
                />
              }
              label={<ThreeStar />}
            />
          </FormGroup>
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.checkedD}
                  onChange={handleChange}
                  name="checkedD"
                  color="primary"
                // TechnicalSpecification
                // CurrentConditions
                />
              }
              label={<FourStar />}
            />
          </FormGroup>
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.checkedE}
                  onChange={handleChange}
                  name="checkedE"
                  color="primary"
                />
              }
              label={<FiveStar />}
            />
          </FormGroup>
        </>
      ) : (
        <> </>
      )}
    </ThemeProvider>
  );
};
