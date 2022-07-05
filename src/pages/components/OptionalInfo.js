import { IconButton, TextField } from "@material-ui/core";
import { ArrowDropDown, ArrowDropUp } from "@material-ui/icons";
import React, { useState } from "react";
import { FormGroup } from "reactstrap";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
// , ModalBody


export const OptionalInfo = ({
  optionalTechInfo,
  handleChangeOptionalInfo,
  light,
}) => {
  const [icon, setIcon] = useState(false);

  const [optionalInfoService, setOptionalInfoService] = useState(false);
  const [moreOptionalIndo, setMoreOptionalIndo] = useState(false);

  const OptionalInfoService = (value, more) => {
    setOptionalInfoService(value);
    setMoreOptionalIndo(more);
    setIcon(value);
  };

  const MoreOptionalInfo = (value) => {
    setMoreOptionalIndo(value);
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
            Información Técnica Detallada.
          </h5>
        </a>
      </div>

      {/* <a className='btn' ><label htmlFor="Name" > <h5 className="text-muted">Agregar más información de servicio:</h5> </label></a> */}

      {optionalInfoService ? (
        <>
          {/* <FormGroup className="col-12 mt-3 animate__animated animate__fadeInDown">
            <TextField
              label="Motivo de Baja"
              className="form-control"
              variant="outlined"
              name="MotivodeBaja"
              value={optionalTechInfo && optionalTechInfo.MotivodeBaja}
              onChange={handleChangeOptionalInfo}
            />
          </FormGroup> */}

          <FormGroup className="col-6 mt-2 animate__animated animate__fadeInDown">
            <TextField
              label="Capacidad Nominal"
              className="form-control"
              variant="outlined"
              name="NominalCapacity"
              value={optionalTechInfo && optionalTechInfo.NominalCapacity}
              onChange={handleChangeOptionalInfo}
            />
          </FormGroup>

          <FormGroup className="col-6 mt-2 animate__animated animate__fadeInDown">
            <TextField
              label="Año de Construcción"
              className="form-control"
              variant="outlined"
              name="YearOfConstruction"
              value={optionalTechInfo && optionalTechInfo.YearOfConstruction}
              onChange={handleChangeOptionalInfo}
            />
          </FormGroup>

          <FormGroup className="col-6 mt-3 animate__animated animate__fadeInDown">
            <TextField
              label="Montado / Desmontado"
              className="form-control"
              variant="outlined"
              name="AssambledDissambled"
              value={optionalTechInfo && optionalTechInfo.AssambledDissambled}
              onChange={handleChangeOptionalInfo}
            />
          </FormGroup>

          <FormGroup className="col-6 mt-3 animate__animated animate__fadeInDown">
            <TextField
              label="Comentarios de las Condiciones Actuales"
              className="form-control"
              variant="outlined"
              name="EquipmentCurrentConditionsComments"
              value={
                optionalTechInfo &&
                optionalTechInfo.EquipmentCurrentConditionsComments
              }
              onChange={handleChangeOptionalInfo}
            />
          </FormGroup>

          <FormGroup className="col-12 mt-3 animate__animated animate__fadeInDown">
            <TextField
              label="Notas Sobre el Equipo"
              className="form-control"
              variant="outlined"
              name="NotesAboutEquipment"
              value={optionalTechInfo && optionalTechInfo.NotesAboutEquipment}
              onChange={handleChangeOptionalInfo}
            />
          </FormGroup>

          <FormGroup className="col-6 mt-3 animate__animated animate__fadeInDown">
            <TextField
              label="Ancho"
              className="form-control"
              variant="outlined"
              name="Width"
              value={optionalTechInfo && optionalTechInfo.Width}
              onChange={handleChangeOptionalInfo}
            />
          </FormGroup>

          <FormGroup className="col-6 mt-3 animate__animated animate__fadeInDown">
            <TextField
              label="Altura"
              className="form-control"
              variant="outlined"
              name="Height"
              value={optionalTechInfo && optionalTechInfo.Height}
              onChange={handleChangeOptionalInfo}
            />
          </FormGroup>

          <FormGroup className="col-6 mt-3 animate__animated animate__fadeInDown">
            <TextField
              label="Profundidad"
              className="form-control"
              variant="outlined"
              name="Depth"
              value={optionalTechInfo && optionalTechInfo.Depth}
              onChange={handleChangeOptionalInfo}
            />
          </FormGroup>

          <FormGroup className="col-6 mt-3 animate__animated animate__fadeInDown">
            <TextField
              label="Protocolo de Comunicación"
              className="form-control"
              variant="outlined"
              name="CommunicationProtocol"
              value={optionalTechInfo && optionalTechInfo.CommunicationProtocol}
              onChange={handleChangeOptionalInfo}
            />
          </FormGroup>

          <FormGroup className="col-6 mt-3 animate__animated animate__fadeInDown">
            <TextField
              label="Contacto de Información Técnica de la Planta"
              className="form-control"
              variant="outlined"
              name="PlantTechnicalInformationContact"
              value={
                optionalTechInfo &&
                optionalTechInfo.PlantTechnicalInformationContact
              }
              onChange={handleChangeOptionalInfo}
            />
          </FormGroup>

          <FormGroup className="col-6 mt-3 animate__animated animate__fadeInDown">
            <TextField
              label="Contacto de Información Financiera de la Planta"
              className="form-control"
              variant="outlined"
              name="PlantFinancialInformationContact"
              value={
                optionalTechInfo &&
                optionalTechInfo.PlantFinancialInformationContact
              }
              onChange={handleChangeOptionalInfo}
            />
          </FormGroup>

          {moreOptionalIndo ? (
            <>
              <FormGroup className="col-6 mt-3 animate__animated animate__fadeInDown">
                <TextField
                  label="Materiales de Construcción"
                  className="form-control"
                  variant="outlined"
                  name="ConstructionMaterials"
                  value={
                    optionalTechInfo && optionalTechInfo.ConstructionMaterials
                  }
                  onChange={handleChangeOptionalInfo}
                />
              </FormGroup>

              <FormGroup className="col-6 mt-3 animate__animated animate__fadeInDown">
                <TextField
                  label="Revestimiento Externo"
                  className="form-control"
                  variant="outlined"
                  name="ExternalCoating"
                  value={optionalTechInfo && optionalTechInfo.ExternalCoating}
                  onChange={handleChangeOptionalInfo}
                />
              </FormGroup>

              <FormGroup className="col-6 mt-3 animate__animated animate__fadeInDown">
                <TextField
                  label="Variable de Medida"
                  className="form-control"
                  variant="outlined"
                  name="MeasurementVariable"
                  value={
                    optionalTechInfo && optionalTechInfo.MeasurementVariable
                  }
                  onChange={handleChangeOptionalInfo}
                />
              </FormGroup>

              <FormGroup className="col-6 mt-3 animate__animated animate__fadeInDown">
                <TextField
                  label="Consumo Eléctrico"
                  className="form-control"
                  variant="outlined"
                  name="ElectricalConsumption"
                  value={
                    optionalTechInfo && optionalTechInfo.ElectricalConsumption
                  }
                  onChange={handleChangeOptionalInfo}
                />
              </FormGroup>

              <FormGroup className="col-6 mt-3 animate__animated animate__fadeInDown">
                <TextField
                  label="Grado de Protección"
                  className="form-control"
                  variant="outlined"
                  name="ProtectionGrade"
                  value={optionalTechInfo && optionalTechInfo.ProtectionGrade}
                  onChange={handleChangeOptionalInfo}
                />
              </FormGroup>

              <FormGroup className="col-6 mt-3 animate__animated animate__fadeInDown">
                <TextField
                  label="Grado Sanitario"
                  className="form-control"
                  variant="outlined"
                  name="SanitaryGrade"
                  value={optionalTechInfo && optionalTechInfo.SanitaryGrade}
                  onChange={handleChangeOptionalInfo}
                />
              </FormGroup>

              <FormGroup className="col-6 mt-3 animate__animated animate__fadeInDown">
                <TextField
                  label="Garantía Disponible"
                  className="form-control"
                  variant="outlined"
                  name="AvailableWarranty"
                  value={optionalTechInfo && optionalTechInfo.AvailableWarranty}
                  onChange={handleChangeOptionalInfo}
                />
              </FormGroup>

              <FormGroup className="col-6 mt-3 animate__animated animate__fadeInDown">
                <TextField
                  label="Años de garantía restantes"
                  className="form-control"
                  variant="outlined"
                  name="RemainingWarrantyYears"
                  value={
                    optionalTechInfo && optionalTechInfo.RemainingWarrantyYears
                  }
                  onChange={handleChangeOptionalInfo}
                />
              </FormGroup>

              <FormGroup className="col-12 mt-3 animate__animated animate__fadeInDown">
                <TextField
                  label="Accesorios de Dispositivos Periféricos"
                  className="form-control"
                  variant="outlined"
                  name="PeripheralDevicesAccesories"
                  value={
                    optionalTechInfo &&
                    optionalTechInfo.PeripheralDevicesAccesories
                  }
                  onChange={handleChangeOptionalInfo}
                />
              </FormGroup>

              <FormGroup className="col-6 mt-3 animate__animated animate__fadeInDown">
                <TextField
                  label="Horas de trabajo"
                  className="form-control"
                  variant="outlined"
                  name="WorkingHours"
                  value={optionalTechInfo && optionalTechInfo.WorkingHours}
                  onChange={handleChangeOptionalInfo}
                />
              </FormGroup>

              <FormGroup className="col-6 mt-3 animate__animated animate__fadeInDown">
                <TextField
                  label="Equipo de laboratorio"
                  className="form-control"
                  variant="outlined"
                  name="LaboratoryEquipment"
                  value={
                    optionalTechInfo && optionalTechInfo.LaboratoryEquipment
                  }
                  onChange={handleChangeOptionalInfo}
                />
              </FormGroup>
            </>
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
      {/* ------------------- BOTONES PARA MOSTRAR MAS Y MENOS DATOS ------------------------ */}
      {optionalInfoService ? (
        <>
          <div className="d-flex justify-content-between mb-2 animate__animated animate__fadeInDown">
            <a
              className="btn ml-0 mr-4 mt-2 col-4"
              style={{ display: "inline-flex" }}
              onClick={() => MoreOptionalInfo(!moreOptionalIndo)}
            >
              {moreOptionalIndo ? (
                <h6
                  style={{
                    color:
                      theme.palette.type === "dark"
                        ? theme.palette.primary.light
                        : theme.palette.secondary,
                  }}
                >
                  <ArrowDropUp /> Mostrar menos...
                </h6>
              ) : (
                <h6
                  style={{
                    color:
                      theme.palette.type === "dark"
                        ? theme.palette.primary.light
                        : theme.palette.secondary,
                  }}
                >
                  <ArrowDropDown /> Mostrar más...
                </h6>
              )}
            </a>

            <a
              className="btn ml-0 mr-4 mt-2 col-4"
              onClick={() => OptionalInfoService(false, false)}
              style={{ display: "inline-flex" }}
            >
              {moreOptionalIndo ? (
                <h6
                  style={{
                    color:
                      theme.palette.type === "dark"
                        ? theme.palette.primary.light
                        : theme.palette.secondary,
                  }}
                >
                  <ArrowDropUp /> Ocultar
                </h6>
              ) : (
                <h6
                  style={{
                    color:
                      theme.palette.type === "dark"
                        ? theme.palette.primary.light
                        : theme.palette.secondary,
                  }}
                >
                  <ArrowDropUp /> Mostrar menos...
                </h6>
              )}
            </a>
          </div>
        </>
      ) : (
        <></>
      )}
    </ThemeProvider>
  );
};
