import React, { useState } from "react";
import { IconButton, TextField } from "@material-ui/core";
import { ArrowDropDown, ArrowDropUp } from "@material-ui/icons";
import { FormGroup } from "reactstrap";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { Autocomplete } from "@mui/material";
import { select } from "./select";

export const Responsable = ({
    handleChangeOptionalInfo,
    light,
    servicesInformation,
    handleChangeServicesInformation,
    handleChangeServicesInfoPlanta,
    handleChangeServicesInfoArea,
    PlantaResponsable,
    AreaResponsable
}) => {

    const [icon, setIcon] = useState(false);

    const [optionalInfoService, setOptionalInfoService] = useState(false);

    const OptionalInfoService = (value) => {
        setOptionalInfoService(value);
        setIcon(value);
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
            <div className="mb-2">
                <a
                    className="btn ml-0 mr-4 col-4"
                    onClick={() => OptionalInfoService(!optionalInfoService)}
                    style={{ display: "inline-flex" }}
                >
                    <h5
                        style={{
                            color:
                                theme.palette.type === "dark"
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
                        Responsable de Equipo *.
                    </h5>
                </a>
            </div>

            {
                optionalInfoService ? (
                    <>
                        <FormGroup className="col-4 animate__animated animate__fadeInDown">
                            <TextField
                                label="Responsable de Equipo"
                                className="form-control"
                                variant="outlined"
                                name="ResponsableEquipo"
                                value={servicesInformation && servicesInformation.ResponsableEquipo}
                                onChange={handleChangeServicesInformation}
                            />
                        </FormGroup>

                        <FormGroup className="col-4 animate__animated animate__fadeInDown">
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={select.Planta}
                                // sx={{ width: 300 }}
                                fullWidth
                                defaultValue={PlantaResponsable && PlantaResponsable.Name}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Seleccionar Planta"
                                        variant="outlined"
                                        required
                                    />
                                )}
                                onChange={(e, newValue) => {
                                    handleChangeServicesInfoPlanta(newValue);
                                }}
                            />
                        </FormGroup>

                        <FormGroup className="col-4 animate__animated animate__fadeInDown">
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={select.Areas}
                                // sx={{ width: 300 }}
                                fullWidth
                                defaultValue={AreaResponsable && AreaResponsable.Name}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Seleccionar Área"
                                        variant="outlined"
                                        required
                                    />
                                )}
                                onChange={(e, newValue) => {
                                    handleChangeServicesInfoArea(newValue);
                                }}
                            />
                        </FormGroup>
                    </>) : (<></>)
            }
        </ThemeProvider>
    )
}
