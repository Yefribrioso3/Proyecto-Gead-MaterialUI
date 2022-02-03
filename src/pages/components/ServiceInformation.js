import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { Button, FormGroup, ModalBody } from "reactstrap";
import Axios from "axios";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { Grid } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
//
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
}) => {
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
    <>
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
        {/* -------------------------------         ADD TECHNICAL INFORMATION           ------------------------------------------ */}

        {
          // Condicional para mostros un formulaio u otro
          editingTechInfo ? (
            <>
              <EditAddServInfo
                techInfoEditado={techInfoEditado}
                updateAddServInfo={updateAddServInfo}
                setEditingTechInfo={setEditingTechInfo}
              />
            </>
          ) : (
            <>
              <section className="pb-4 pt-4">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="animate__animated animate__fadeIn"
                >
                  <label htmlFor="Name">
                    {" "}
                    <h5 className="text-muted">
                      Add Service Information:
                    </h5>{" "}
                  </label>
                  <select
                    className="form-select SelectBoostrap"
                    name="Name"
                    {...register("Name", {
                      required: {
                        value: true,
                        message: "Campo requerido",
                      },
                    })}
                  >
                    <option value="">Select</option>
                    <option value="Available warranty">
                      Available warranty
                    </option>
                  </select>

                  <span className="text-danger text-small d-block mb-2">
                    {errors.Name && errors.Name.message}
                  </span>

                  <label htmlFor="Value">
                    Value <b className="text-danger">*</b>
                  </label>
                  <div className="row ">
                    <div className="col-10">
                      <input
                        type="text text-align=center"
                        className="form-control"
                        name="Value"
                        // onChange={handleChange}
                        // onChange={(e) => e.target.value}
                        {...register("Value", {
                          required: {
                            value: true,
                            message: "Campo requerido",
                          },
                        })}
                      />
                      <span className="text-danger text-small d-block mb-2">
                        {errors.Value && errors.Value.message}
                      </span>
                    </div>

                    {/* -----------------------------    BOtON AGREGAR TECHNICAL INFORMATION    -----------------------  */}
                    <div className="col-2">
                      <button className="btn btn-primary">
                        <span className=" fas fa-save fa-lg"></span>
                      </button>
                    </div>
                  </div>
                  {/* ============== onChange =============== Captura los cambios, lo que el usuario escriba*/}
                </form>
              </section>
            </>
          )
        }

        {/* -----------------------------------             TABLE ADD TECHNICAL INFORMATION           ----------------------------------- */}

        <FormGroup>
          {editingNewServInfo ? (
            <>
              <table className="table display table-hover table-bordered table-striped animate__animated animate__fadeIn">
                <thead>
                  <tr>
                    <th>Others Information</th>
                    <th>Value</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {equipoSeleccionado.ServicesInformation.newServicesInformation
                    .length > 0 ? (
                    equipoSeleccionado.ServicesInformation.newServicesInformation.map(
                      (elemento) => (
                        <tr key={elemento.Id_NewServInfo}>
                          <>
                            {filaEditada ? (
                              <>
                                {id === elemento.Id_NewServInfo ? (
                                  <>
                                    <td className=" animate__animated animate__fadeInDown">
                                      {" "}
                                      {`${elemento.Name}:`}
                                    </td>
                                    <td className=" animate__animated animate__fadeInDown">
                                      {" "}
                                      {elemento.Value}
                                    </td>
                                  </>
                                ) : (
                                  <>
                                    <td> {`${elemento.Name}:`}</td>
                                    <td> {elemento.Value}</td>
                                  </>
                                )}
                              </>
                            ) : (
                              <>
                                <td> {`${elemento.Name}:`}</td>
                                <td> {elemento.Value}</td>
                              </>
                            )}

                            <td>
                              {" "}
                              <Button
                                color="primary"
                                onClick={() => editar(elemento, "Services")}
                              >
                                <i className="far fa-edit button_icon"></i>
                              </Button>{" "}
                              {"  "}
                              <Button
                                color="danger"
                                onClick={() =>
                                  eliminarServInfo(elemento.Id_NewServInfo)
                                }
                              >
                                <i className="fas fa-trash-alt button_icon"></i>{" "}
                              </Button>
                            </td>
                          </>
                        </tr>
                      )
                    )
                  ) : (
                    <tr>
                      <td colSpan={3}>No data recorded</td>
                    </tr>
                  )}

                  {/* =================== Boton Eliminar ====================== */}
                  {/* Editar  */}
                  {/* =================== Boton Editar ========================*/}
                </tbody>
              </table>
            </>
          ) : (
            <>
              <table className="table display table-hover table-bordered table-striped animate__animated animate__fadeIn">
                <thead>
                  <tr>
                    <th>Others Technical Information</th>
                    <th>Value</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    // newservInformation
                    equipoSeleccionado.ServicesInformation
                      .newServicesInformation.length > 0 ? (
                      equipoSeleccionado.ServicesInformation.newServicesInformation.map(
                        (elemento) => (
                          <tr key={elemento.Id_NewServInfo}>
                            <>
                              {filaEditada ? (
                                <>
                                  {id === elemento.Id_NewServInfo ? (
                                    <>
                                      <td className=" animate__animated animate__fadeInDown">
                                        {" "}
                                        {`${elemento.Name}:`}
                                      </td>
                                      <td className=" animate__animated animate__fadeInDown">
                                        {" "}
                                        {elemento.Value}
                                      </td>
                                    </>
                                  ) : (
                                    <>
                                      <td> {`${elemento.Name}:`}</td>
                                      <td> {elemento.Value}</td>
                                    </>
                                  )}
                                </>
                              ) : (
                                <>
                                  <td> {`${elemento.Name}:`}</td>
                                  <td> {elemento.Value}</td>
                                </>
                              )}

                              <td>
                                {" "}
                                <Button
                                  color="primary"
                                  onClick={() => editar(elemento, "Services")}
                                >
                                  <i className="far fa-edit button_icon"></i>
                                </Button>{" "}
                                {"  "}
                                <Button
                                  color="danger"
                                  onClick={() =>
                                    eliminarServInfo(elemento.Id_NewServInfo)
                                  }
                                >
                                  <i className="fas fa-trash-alt button_icon"></i>{" "}
                                </Button>
                              </td>
                            </>
                          </tr>
                        )
                      )
                    ) : (
                      <tr>
                        <td colSpan={3}>No data recorded</td>
                      </tr>
                    )
                  }
                </tbody>
              </table>
            </>
          )}
        </FormGroup>

        {/* -------------------------    BOTONES IZQUIERDA - DERECHA    ------------------------------- */}
        <FormGroup className="row align-items-center justify-content-between">
          <Grid xs={4} className="d-flex justify-content-start">
            <Button
              color="secundary"
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
              className="d-none"
              color="secundary"
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
    </>
  );
};

export default ServiceInformation;
