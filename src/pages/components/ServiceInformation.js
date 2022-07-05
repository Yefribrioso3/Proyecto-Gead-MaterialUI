import React from "react";
import { FormGroup, ModalBody } from "reactstrap";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { Grid, TextField } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { Responsable } from "./Responsable";

// , { useState } 
// import { useForm } from "react-hook-form";
// import { v4 as uuidv4 } from "uuid";
// Button,
// import Axios from "axios";
// import AddIcon from "@material-ui/icons/Add";
//

const ServiceInformation = ({
  handleChangeServicesInformation,
  handleChangeServicesInfoPlanta,
  handleChangeServicesInfoArea,
  PlantaResponsable,
  AreaResponsable,
  servicesInformation,
  light,
  backForm,
  nextForm,
  handleChangeOperations,
  handleChangeAreas
  // setEditing,
  // setEditingServiceInfo,
  // setEditingTechInfo,
  // casoServInfo,
  // id,
  // editingNewServInfo,
  // setnewservInformation,
  // newservInformation,
  // setModalInsertarServiInfo,
  // ModalInsertarServiInfo,
  // seteditingNewServInfo,
  // update,
  // prueba,
  // setPrueba,
  // allAquipmentRelation,
  // setServicesInformation,
  // equipoSeleccionado,
  // setEquipoSeleccionado,
  // editRow,
  // editingTechInfo,
  // EditAddServInfo,
  // techInfoEditado,
  // updateAddServInfo,
}) => {
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
  // casoServInfo, setCasoServInfo
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm();

  // let { newServicesInformation } = equipoSeleccionado.ServicesInformation;

  // let { ServicesInformation } = equipoSeleccionado;

  // const [filaEditada, setfilaEditada] = useState(false);

  // const onSubmit = (data, e) => {

  //     (casoServInfo === 'Edit') ? onSubmitServInfo(data, e) : AddServInfomation(data, e)
  // };

  // const AddServInfomation = (data, e) => {
  //     console.log("Add")

  //     data.Id_NewServInfo = uuidv4();

  //     const newServicesInfo = {
  //         Id_NewServInfo: data.Id_NewServInfo,
  //         Id_ServicesInformation: null,
  //         Name: data.Name,
  //         Value: data.Value,
  //         SelectNewServicesInfo: {
  //             Id_SelectNewServInfo: uuidv4(),
  //             Id_ServicesInformation: '',
  //             Id_NewServInfo: data.Id_NewServInfo
  //         }
  //     }

  //     let newServicesInformation = equipoSeleccionado.ServicesInformation.newServicesInformation
  //     newServicesInformation.push(newServicesInfo)

  //     setnewservInformation(newServicesInformation);

  //     console.log(newServicesInformation);
  //     console.log(equipoSeleccionado);

  //     e.target.reset()
  // }

  // const onSubmitServInfo = async (data, e) => {
  //     data.Id_NewServInfo = uuidv4();

  //     const newServicesInfo = {
  //         Id_NewServInfo: data.Id_NewServInfo,
  //         Id_ServicesInformation: equipoSeleccionado.ServicesInformation.Id_ServicesInformation,
  //         Name: data.Name,
  //         Value: data.Value,
  //         SelectNewServicesInfo: {
  //             Id_SelectNewServInfo: uuidv4(),
  //             Id_ServicesInformation: equipoSeleccionado.ServicesInformation.Id_ServicesInformation,
  //             Id_NewServInfo: data.Id_NewServInfo
  //         }
  //     }

  //     let newServicesInformation = equipoSeleccionado.ServicesInformation.newServicesInformation
  //     newServicesInformation.unshift(newServicesInfo)

  //     await sendNewServInfo(newServicesInfo);
  //     e.target.reset()
  // };

  // const sendNewServInfo = async (valorInsertar) => {
  //     await Axios.post(`${globalApi}/newServInfo`, {
  //         Id_NewServInfo: valorInsertar.Id_NewServInfo,
  //         Id_ServicesInformation: valorInsertar.Id_ServicesInformation,
  //         Name: valorInsertar.Name,
  //         Value: valorInsertar.Value
  //     })

  //     await Axios.post(`${globalApi}/selectNewServInfo`, {
  //         Id_SelectNewServInfo: valorInsertar.SelectNewServicesInfo.Id_SelectNewServInfo,
  //         Id_ServicesInformation: valorInsertar.Id_ServicesInformation,
  //         Id_NewServInfo: valorInsertar.Id_NewServInfo
  //     })

  // };
  // const editar = (elemento, caso) => {
  //     setfilaEditada(true);

  //     editRow(elemento, caso)
  // }

  // const eliminarAddTechInfo = (id) => {

  //     setnewservInformation(newservInformation.filter((sercivesIn) => sercivesIn.Id_NewServInfo !== id))

  //     let newEquipo = equipoSeleccionado;
  //     newEquipo.ServicesInformation.newServicesInformation = newservInformation;

  //     setEquipoSeleccionado(newEquipo);
  //     console.log(equipoSeleccionado);

  // }

  // const eliminarAddTechInfoApi = (id) => {
  //     setEquipoSeleccionado(equipoSeleccionado.ServicesInformation.newServicesInformation.filter((sercivesIn) => sercivesIn.Id_NewServInfo !== id))
  //     console.log(equipoSeleccionado);
  // }

  //---------------------------------------------------------------------------------------------------

  // const eliminarServInfo = async (id) => {
  //     console.log(id)

  //     let indice = equipoSeleccionado.ServicesInformation.newServicesInformation.findIndex((equipo) => {
  //         return equipo.Id_NewServInfo === id;
  //     })

  //     const ServInfo = equipoSeleccionado.ServicesInformation.newServicesInformation.find(nts => nts.Id_NewServInfo === id)
  //     const idSelectNewServInfo = ServInfo.SelectNewServicesInfo.Id_SelectNewServInfo

  //     let newServicesInformation = equipoSeleccionado.ServicesInformation.newServicesInformation
  //     newServicesInformation.splice(indice, 1)

  //     await deleteNewServInfo(id, idSelectNewServInfo)

  //     seteditingNewServInfo(false);
  //     seteditingNewServInfo(true);
  // }

  // const deleteNewServInfo = async (id, idSelectNewServInfo) => {
  //     await Axios.delete(`${globalApi}/selectNewServInfo/${idSelectNewServInfo}`)
  //     await Axios.delete(`${globalApi}/newServInfo/${id}`)
  //         .then((id) => {
  //             console.log(id)
  //             alert("successfully removed");
  //         });
  // };

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
          Información de Servicios
        </h4>
      </div>

      <ModalBody className="row animate__animated animate__fadeIn">
        <FormGroup className="col-8">
          <div className="row">
            <FormGroup className="col-6">
              {/* <label>Fecha de Instalación:</label>
          <input
            className="form-control"
            type="text text-align=center"
            name="DateOfInstallation"
            value={
              servicesInformation && servicesInformation.DateOfInstallation
            }
            onChange={handleChangeServicesInformation}
          /> */}
              <TextField
                label="Fecha de Instalación"
                className="form-control"
                variant="outlined"
                name="DateOfInstallation"
                // required
                value={
                  servicesInformation && servicesInformation.DateOfInstallation
                }
                onChange={handleChangeServicesInformation}
              />
            </FormGroup>

            <FormGroup className="col-6">
              {/* <label>Fecha de Desinstalación:</label>
          <input
            className="form-control"
            type="text text-align=center"
            name="DateOfDesintallation"
            value={
              servicesInformation && servicesInformation.DateOfDesintallation
            }
            onChange={handleChangeServicesInformation}
          /> */}
              <TextField
                label="Fecha de Desinstalación"
                className="form-control"
                variant="outlined"
                name="DateOfDesintallation"
                // required
                value={
                  servicesInformation && servicesInformation.DateOfDesintallation
                }
                onChange={handleChangeServicesInformation}
              />
            </FormGroup>

            <FormGroup className="col-12">
              {/* <label>Motivo de Desinstalación:</label>
          <input
            className="form-control"
            type="text text-align=center"
            name="DesinstallationReason"
            value={
              servicesInformation && servicesInformation.DesinstallationReason
            }
            onChange={handleChangeServicesInformation}
          /> */}
              <TextField
                label="Motivo de Desinstalación"
                className="form-control"
                variant="outlined"
                multiline
                rows={5}
                name="DesinstallationReason"
                // required
                value={
                  servicesInformation && servicesInformation.DesinstallationReason
                }
                onChange={handleChangeServicesInformation}
              />
            </FormGroup>


          </div>
        </FormGroup>

        <FormGroup className="col-4">
          <FormGroup className="">
            {/* <label>Razón de Desuso:</label>
            <input
            className="form-control"
            type="text text-align=center"
            name="DesuseReason"
            value={servicesInformation && servicesInformation.DesuseReason}
            onChange={handleChangeServicesInformation}
            /> */}
            <TextField
              label="Razón de Desuso"
              className="form-control"
              variant="outlined"
              multiline
              rows={5}
              name="DesuseReason"
              // required
              value={servicesInformation && servicesInformation.DesuseReason}
              onChange={handleChangeServicesInformation}
            />
          </FormGroup>

          <FormGroup className="">
            {/* <label>Orden de adquisición</label>
          <input
            className="form-control"
            type="text text-align=center"
            name="ProcurementOrder"
            value={servicesInformation && servicesInformation.ProcurementOrder}
            onChange={handleChangeServicesInformation}
          /> */}
            <TextField
              label="Orden de adquisición"
              className="form-control"
              variant="outlined"
              name="ProcurementOrder"
              // required
              value={servicesInformation && servicesInformation.ProcurementOrder}
              onChange={handleChangeServicesInformation}
            />
          </FormGroup>
        </FormGroup>



        <hr />
        <Responsable
          light={light}
          servicesInformation={servicesInformation}
          handleChangeServicesInformation={handleChangeServicesInformation}
          handleChangeServicesInfoPlanta={handleChangeServicesInfoPlanta}
          handleChangeServicesInfoArea={handleChangeServicesInfoArea}
          PlantaResponsable={PlantaResponsable}
          AreaResponsable={AreaResponsable}
        />

        {/* -------------------------    BOTONES IZQUIERDA - DERECHA    ------------------------------- */}
        <FormGroup className="row align-items-center justify-content-between">
          <Grid xs={4} className="d-flex justify-content-start">
            <Button
              style={{
                border: "0px",
                // backgroundColor: "transparent",
                color: theme.palette.type === "dark" ? "#ffffff" : "#000000",
              }}
              onClick={() => {
                backForm();
                // setEditing(true);
                // setEditingServiceInfo(false);
                // setEditingTechInfo(false);
              }}
            >
              {" "}
              <ArrowBackIcon />
              Información Técnica
            </Button>
          </Grid>
          <Grid xs={4} className="d-flex justify-content-center">
            {" "}
            <Pagination
              count={4}
              hidePrevButton
              hideNextButton
              defaultPage={3}
              size="small"
              color="primary"
              disabled
            />
          </Grid>

          <Grid
            xs={4}
            className="d-flex justify-content-end"
          >
            <Button
              style={{
                border: "0px",
                // backgroundColor: "transparent",
                color: theme.palette.type === "dark" ? "#ffffff" : "#000000",
              }}
              onClick={() => {
                nextForm();
                // setEditing(true);
                // setEditingServiceInfo(false);
                // setEditingTechInfo(false);
              }}
            >
              INFORMACIÓN FINANCIERA
              <ArrowForwardIcon />
            </Button>
          </Grid>

          {/* <Grid xs={4}>
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
              INFORMACIÓN FINANCIERA
              <ArrowForwardIcon />
            </Button>
          </Grid> */}

          {/* -------------------------    BOTONES IZQUIERDA DERECHA    ------------------------------- */}
        </FormGroup>
      </ModalBody>
    </ThemeProvider>
  );
};

export default ServiceInformation;
