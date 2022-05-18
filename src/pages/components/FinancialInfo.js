import React from 'react'
import { Button, FormGroup, ModalBody } from "reactstrap";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { Grid, TextField } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const FinancialInfo = ({ light, setEditing, setEditingServiceInfo, handleChangeFinancialInfo, financialInformation, backForm, fecha }) => {

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
            <div className="p-3">
                <h4
                    style={{
                        color:
                            theme.palette.type === "dark"
                                ? theme.palette.primary.light
                                : theme.palette.secondary,
                    }}
                >
                    Información Financiera
                </h4>
            </div>

            <ModalBody className="row animate__animated animate__fadeIn">
                <FormGroup className="col-4">
                    <TextField
                        label="Valor en Libros"
                        className="form-control"
                        inputProps={{ min: 0 }}
                        variant="outlined"
                        type="number"
                        name="Valor_Contable"
                        value={financialInformation && financialInformation.Valor_Contable}
                        onChange={handleChangeFinancialInfo}
                    />

                    {/* <label>Valor en Libros:</label>
                    <input
                        className="form-control"
                        type="text text-align=center"
                        name="ValorLibros"
                    // value={ servicesInformation && servicesInformation.DateOfInstallation  }
                    // onChange={handleChangeServicesInformation}
                    /> */}

                </FormGroup>

                <FormGroup className="col-4">
                    <TextField
                        label="Moneda"
                        className="form-control"
                        variant="outlined"
                        name="Moneda"
                        value={financialInformation && financialInformation.Moneda}
                        onChange={handleChangeFinancialInfo}
                    />
                </FormGroup>

                <FormGroup className="col-4">
                    <TextField
                        readOnly
                        label="Activo fijo"
                        inputProps={{ min: 0 }}
                        className="form-control"
                        type="number"
                        variant="outlined"
                        name="Activo_fijo"
                        value={financialInformation && financialInformation.Activo_fijo}
                        onChange={handleChangeFinancialInfo}
                    />
                </FormGroup>

                <FormGroup className="col-4">
                    <TextField
                        readOnly
                        label="Valor Adquirido"
                        inputProps={{ min: 0 }}
                        className="form-control"
                        type="number"
                        variant="outlined"
                        name="Valor_Adquirido"
                        value={financialInformation && financialInformation.Valor_Adquirido}
                        onChange={handleChangeFinancialInfo}
                    />
                </FormGroup>

                <FormGroup className="col-4">
                    <TextField
                        readOnly
                        label="Amortizacion acumulada"
                        className="form-control"
                        type="number"
                        variant="outlined"
                        name="Amortizacion_acumulada"
                        value={financialInformation && financialInformation.Amortizacion_acumulada}
                        onChange={handleChangeFinancialInfo}
                    />
                </FormGroup>

                <FormGroup className="col-4">
                    <TextField
                        readOnly
                        label="Cantidad"
                        inputProps={{ min: 0 }}
                        className="form-control"
                        type="number"
                        variant="outlined"
                        name="Cantidad"
                        value={financialInformation && financialInformation.Cantidad}
                        onChange={handleChangeFinancialInfo}
                    />
                </FormGroup>

                <FormGroup className="col-4">
                    <TextField
                        // readOnly
                        disabled
                        autoComplete="off"
                        label="Fecha de Actualizacion"
                        className="form-control"
                        variant="outlined"
                        name="FechaActualizacion"
                        value={financialInformation && financialInformation.FechaActualizacion}
                    // onChange={handleChangeFinancialInfo}
                    />
                </FormGroup>

                <FormGroup className="col-4">
                    <TextField
                        // readOnly
                        disabled
                        label="Encargado de Actualizacion"
                        className="form-control"
                        variant="outlined"
                        name="EncargadoActualizacion"
                        value={financialInformation && financialInformation.EncargadoActualizacion}
                    // onChange={handleChangeFinancialInfo}
                    />
                </FormGroup>


                <hr />

                {/* -------------------------    BOTONES IZQUIERDA - DERECHA    ------------------------------- */}
                <FormGroup className="row align-items-center justify-content-between">
                    <Grid xs={4} className="d-flex justify-content-start">
                        <Button
                            style={{
                                border: "0px",
                                backgroundColor: "transparent",
                                color: theme.palette.type === "dark" ? "#ffffff" : "#000000",
                            }}
                            onClick={() => {
                                backForm();
                            }}
                        >
                            {" "}
                            <ArrowBackIcon />
                            Información de Servicios
                        </Button>
                    </Grid>
                    <Grid xs={4} className="d-flex justify-content-center">
                        {" "}
                        <Pagination
                            count={4}
                            hidePrevButton
                            hideNextButton
                            defaultPage={4}
                            size="small"
                            color="primary"
                            disabled
                        />
                    </Grid>
                    <Grid xs={4}>
                        <Button
                            style={{
                                backgroundColor: "transparent",
                            }}
                            className="d-none"
                            onClick={() => {
                                setEditing(true);
                                setEditingServiceInfo(true);
                            }}
                        >
                            <ArrowForwardIcon />
                        </Button>
                    </Grid>

                    {/* -------------------------    BOTONES IZQUIERDA DERECHA    ------------------------------- */}
                </FormGroup>
            </ModalBody>
        </ThemeProvider>
    )
}

export default FinancialInfo