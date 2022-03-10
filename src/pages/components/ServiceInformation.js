import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { Button, FormGroup, ModalBody } from "reactstrap";
import Axios from "axios";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { Grid } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import AddIcon from "@material-ui/icons/Add";
//
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const ServiceInformation = ({
  casoServInfo,
  id,
  editingNewServInfo,
  setnewservInformation,
  newservInformation,
  setModalInsertarServiInfo,
  ModalInsertarServiInfo,
  seteditingNewServInfo,
  update,
  prueba,
  setPrueba,
  allAquipmentRelation,
  handleChangeServicesInformation,
  servicesInformation,
  setServicesInformation,
  equipoSeleccionado,
  setEquipoSeleccionado,
  editRow,
  setEditing,
  setEditingServiceInfo,
  editingTechInfo,
  EditAddServInfo,
  setEditingTechInfo,
  techInfoEditado,
  updateAddServInfo,
  light,
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // let { newServicesInformation } = equipoSeleccionado.ServicesInformation;

  // let { ServicesInformation } = equipoSeleccionado;

  const [filaEditada, setfilaEditada] = useState(false);

  const onSubmit = (data, e) => {
    casoServInfo === "Edit"
      ? onSubmitServInfo(data, e)
      : AddServInfomation(data, e);
  };

  const AddServInfomation = (data, e) => {
    console.log("Add");

    data.Id_NewServInfo = uuidv4();

    const newServicesInfo = {
      Id_NewServInfo: data.Id_NewServInfo,
      Id_ServicesInformation: null,
      Name: data.Name,
      Value: data.Value,
      SelectNewServicesInfo: {
        Id_SelectNewServInfo: uuidv4(),
        Id_ServicesInformation: "",
        Id_NewServInfo: data.Id_NewServInfo,
      },
    };

    let newServicesInformation =
      equipoSeleccionado.ServicesInformation.newServicesInformation;
    newServicesInformation.push(newServicesInfo);

    setnewservInformation(newServicesInformation);

    console.log(newServicesInformation);
    console.log(equipoSeleccionado);

    e.target.reset();
  };

  const onSubmitServInfo = async (data, e) => {
    data.Id_NewServInfo = uuidv4();

    const newServicesInfo = {
      Id_NewServInfo: data.Id_NewServInfo,
      Id_ServicesInformation:
        equipoSeleccionado.ServicesInformation.Id_ServicesInformation,
      Name: data.Name,
      Value: data.Value,
      SelectNewServicesInfo: {
        Id_SelectNewServInfo: uuidv4(),
        Id_ServicesInformation:
          equipoSeleccionado.ServicesInformation.Id_ServicesInformation,
        Id_NewServInfo: data.Id_NewServInfo,
      },
    };

    let newServicesInformation =
      equipoSeleccionado.ServicesInformation.newServicesInformation;
    newServicesInformation.unshift(newServicesInfo);

    await sendNewServInfo(newServicesInfo);
    e.target.reset();
  };

  const sendNewServInfo = async (valorInsertar) => {
    await Axios.post("https://node-gead.herokuapp.com/api/newServInfo", {
      Id_NewServInfo: valorInsertar.Id_NewServInfo,
      Id_ServicesInformation: valorInsertar.Id_ServicesInformation,
      Name: valorInsertar.Name,
      Value: valorInsertar.Value,
    });

    await Axios.post("https://node-gead.herokuapp.com/api/selectNewServInfo", {
      Id_SelectNewServInfo:
        valorInsertar.SelectNewServicesInfo.Id_SelectNewServInfo,
      Id_ServicesInformation: valorInsertar.Id_ServicesInformation,
      Id_NewServInfo: valorInsertar.Id_NewServInfo,
    });
  };

  const editar = (elemento, caso) => {
    setfilaEditada(true);

    editRow(elemento, caso);
  };

  const eliminarServInfo = async (id) => {
    console.log(id);

    let indice =
      equipoSeleccionado.ServicesInformation.newServicesInformation.findIndex(
        (equipo) => {
          return equipo.Id_NewServInfo === id;
        }
      );

    const ServInfo =
      equipoSeleccionado.ServicesInformation.newServicesInformation.find(
        (nts) => nts.Id_NewServInfo === id
      );
    const idSelectNewServInfo =
      ServInfo.SelectNewServicesInfo.Id_SelectNewServInfo;

    let newServicesInformation =
      equipoSeleccionado.ServicesInformation.newServicesInformation;
    newServicesInformation.splice(indice, 1);

    await deleteNewServInfo(id, idSelectNewServInfo);

    seteditingNewServInfo(false);
    seteditingNewServInfo(true);
  };

  const deleteNewServInfo = async (id, idSelectNewServInfo) => {
    await Axios.delete(
      `https://node-gead.herokuapp.com/api/selectNewServInfo/${idSelectNewServInfo}`
    );
    await Axios.delete(
      `https://node-gead.herokuapp.com/api/newServInfo/${id}`
    ).then((id) => {
      console.log(id);
      alert("successfully removed");
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="p-3">
        <h4 className="text-muted">Services Information</h4>
      </div>

      <ModalBody className="row animate__animated animate__fadeIn">
        <FormGroup className="col-4">
          <label>Date Of Installation:</label>
          <input
            className="form-control"
            type="text text-align=center"
            name="DateOfInstallation"
            value={
              servicesInformation && servicesInformation.DateOfInstallation
            }
            onChange={handleChangeServicesInformation}
          />
        </FormGroup>

        <FormGroup className="col-4">
          <label>Date Of Desinstallation:</label>
          <input
            className="form-control"
            type="text text-align=center"
            name="DateOfDesintallation"
            value={
              servicesInformation && servicesInformation.DateOfDesintallation
            }
            onChange={handleChangeServicesInformation}
          />
        </FormGroup>

        <FormGroup className="col-4">
          <label>Desuse Reason:</label>
          <input
            className="form-control"
            type="text text-align=center"
            name="DesuseReason"
            value={servicesInformation && servicesInformation.DesuseReason}
            onChange={handleChangeServicesInformation}
          />
          {/* ============== onChange =============== Captura los cambios, lo que el usuario escriba*/}
        </FormGroup>

        <FormGroup className="col-4">
          <label>Desinstallation Reason:</label>
          <input
            className="form-control"
            type="text text-align=center"
            name="DesinstallationReason"
            value={
              servicesInformation && servicesInformation.DesinstallationReason
            }
            onChange={handleChangeServicesInformation}
          />
        </FormGroup>

        <FormGroup className="col-4">
          <label>Procurement Order:</label>
          <input
            className="form-control"
            type="text text-align=center"
            name="ProcurementOrder"
            value={servicesInformation && servicesInformation.ProcurementOrder}
            onChange={handleChangeServicesInformation}
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
                color: theme.palette.type == "dark" ? "#ffffff" : "#000000",
              }}
              onClick={() => {
                setEditing(true);
                setEditingServiceInfo(false);
                setEditingTechInfo(false);
              }}
            >
              {" "}
              <ArrowBackIcon />
              Technical Information
            </Button>
          </Grid>
          <Grid xs={4} className="d-flex justify-content-center">
            {" "}
            <Pagination
              count={3}
              hidePrevButton
              hideNextButton
              defaultPage={3}
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
  );
};

export default ServiceInformation;
