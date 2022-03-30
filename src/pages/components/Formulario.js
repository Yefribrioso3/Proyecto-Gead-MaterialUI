import React, { Fragment, useState, useEffect } from "react";
import { Col, Input, Row } from "reactstrap";
import { useForm } from "react-hook-form";
import Axios from "axios";
import { globalApi } from "../../types/api.types";

const Formulario = ({ addEquipos, dataInfo }) => {
  // const [dataInfo, setData] = useState(dataInfo);
  // const {register, errors, handleSubmit} = useForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // ----------------   Operations   --------------------------
  // const [bu, setBu] = useState();
  const [buList, setBuList] = useState([]);

  // ----------------   Operations   --------------------------

  const [operationsList, setOperationsList] = useState([]);

  const [paisLis, setPaisLis] = useState([]);

  const [areaList, setAreaList] = useState([]);

  const [lineTypeList, setLineTypeList] = useState([]);

  useEffect(() => {
    Axios.get(`${globalApi}/bu`).then((response) => {
      // console.log(response.data);
      setBuList(response.data);
    });
    Axios.get(`${globalApi}/planta`).then((response) => {
      setOperationsList(response.data);
    });
    Axios.get(`${globalApi}/countries`).then((response) => {
      setPaisLis(response.data);
    });
    Axios.get(`${globalApi}/area`).then((response) => {
      setAreaList(response.data);
    });
    Axios.get(`${globalApi}/lineType`).then((response) => {
      setLineTypeList(response.data);
    });
  }, []);

  const handleChange = (e) => {
    //Funcion para capturar lo que escriba el usuario
    // const { name, value } = e.target;
    console.log(e.target.value);
    // props.setCurrentEquipo((prevState) => ({
    //     ...prevState,
    //     [name]: value
    // }));
  };

  const onSubmit = (data, e) => {
    // equipoSeleccionado.id = dataInfo.length + 1;
    // data.id = dataInfo[dataInfo.length - 1].id + 1;
    // let valorInsertar = data;

    // valorInsertar.id = dataInfo.length + 1;

    // console.log(data)

    addEquipos(data);
    // console.log('Equipo: ' + equipoSeleccionado.equipos + ', Planta: ' + equipoSeleccionado.planta)

    // setData([
    //     ...dataInfo,
    //     valorInsertar
    // ])

    //Limpiar campos
    e.target.reset();
  };

  return (
    <Fragment>
      <form
        className="animate__animated animate__fadeIn"
        onSubmit={handleSubmit(onSubmit)}
      >
        <section className="pt-3">
          <div className="p-3">
            <p className="h1Color p-0">
              <h4>
                El maestro de equipos le permite crear/actualizar equipos de la
                zona.
              </h4>
            </p>
            <div className="botones mb-5"></div>

            {/* =============================== */}
            {/* <div className="card ms-5 mt-2 animate__animated animate__fadeInLeft" style={{ maxWidth: 380 }}>
                            <img id="equipment-foto" />

                            <button type="button" id="btn-foto">Subir foto</button>
                        </div> */}
            {/* className="btn btn-info" */}

            <div className="row mb-4">
              <div className="col-2">
                <label>
                  Id:<b className="text-danger">*</b>
                </label>
                <Input
                  type="text"
                  className="form-control"
                  name="id"
                  readOnly
                  // value={dataInfo[dataInfo.length - 1].id + 1}
                  value={dataInfo.length + 1}

                  // {...register("id", {
                  //     required: {
                  //         value: true,
                  //         message: 'Campo requerido'
                  //     }
                  // })}

                  // type="text text-align=center"
                />
              </div>

              {/* ================================================================================================== */}

              <div className="col-4">
                <label htmlFor="equipos">
                  Equipo <b className="text-danger">*</b>
                </label>
                <Input
                  // type="text"
                  className="form-control"
                  name="equipos"
                  placeholder="Equipo"
                  onChange={handleChange}
                  {...register("equipos", {
                    required: {
                      value: true,
                      message: "Campo requerido",
                    },
                  })}
                />
                <span className="text-danger text-small d-block mb-2">
                  {/* // validar errores del campo indicado y mostrar el mensaje */}
                  {/* {errors.equipos && errors.equipos.message} */}
                  {errors?.equipos?.message}
                </span>

                {/* // value={equipoSeleccionado ? equipoSeleccionado.equipos : ''}
                        // onChange={handleChange}
                        // onChange={ (e) => setEquipo(e.target.value) }
                        // onChange={handleInputChange} */}
              </div>

              <div className="col-3">
                <label htmlFor="denominacionEquipo">
                  Model Number <b className="text-danger">*</b>
                </label>
                <Input
                  type="text"
                  name="modelnumber"
                  placeholder="Model Number"
                  {...register("denominacionEquipo", {
                    required: {
                      value: true,
                      message: "Campo requerido",
                    },
                  })}

                  // value={equipoSeleccionado && equipoSeleccionado.denominacionEquipo}
                  // onChange={handleChange}
                  // onChange={ (e) => setDenominacionEquipo(e.target.value) }
                />
                <span className="text-danger text-small d-block mb-2">
                  {errors.denominacionEquipo &&
                    errors.denominacionEquipo.message}
                </span>
              </div>

              {/* =============================== BOTON SAVE ====================================== */}

              {/* <div className="col-3">
                                <div className="botonesSave pt-4 mt-3">
                                    <button className="boton_pers mb-0"
                                    // type="submit"
                                    >
                                        Save <i className="far fa-save ml-1 "></i>
                                    </button>
                                </div>
                            </div> */}

              {/* ================================================================================ */}
            </div>
            <div className="row mb-4">
              <div className="col-4">
                <label htmlFor="linetype">
                  Line Type <b className="text-danger">*</b>
                </label>
                <select
                  className="form-select"
                  name="linetype"
                  // onChange={handleInputChange}

                  {...register("linetype", {
                    required: {
                      value: true,
                      message: "Campo requerido",
                    },
                  })}

                  // value={equipoSeleccionado ? equipoSeleccionado.area : ''}
                  // onChange={handleChange}
                  // onChange={ (e) => setArea(e.target.value) }
                >
                  <option value="">Selecionar Región</option>
                  {lineTypeList.map((elemento) => (
                    <option value={elemento.Id_LineTypes}>
                      {elemento.Name}
                    </option>
                  ))}

                  {/* <option value="">Selecionar tipo de linea</option>
                                    <option value="Brewhouse">Brewline</option>
                                    <option value="Silos">Bottle</option>
                                    <option value="Milling">Can</option>
                                    <option value="Fermentation">Pet</option>
                                    <option value="Maturation">Keg</option>
                                    <option value="Centrifuge">Special Keg</option> */}
                </select>

                <span className="text-danger text-small d-block mb-2">
                  {errors.linetype && errors.linetype.message}
                </span>
              </div>

              {/* =================================== Area ========================================================================      */}

              <div className="col-4">
                <label htmlFor="area">
                  Area <b className="text-danger">*</b>
                </label>
                <select
                  className="form-select"
                  name="area"
                  // onChange={handleInputChange}

                  {...register("area", {
                    required: {
                      value: true,
                      message: "Campo requerido",
                    },
                  })}

                  // value={equipoSeleccionado ? equipoSeleccionado.area : ''}
                  // onChange={handleChange}
                  // onChange={ (e) => setArea(e.target.value) }
                >
                  <option value="">Selecionar Región</option>
                  {areaList.map((elemento) => (
                    <option value={elemento.Id_Areas}>{elemento.Name}</option>
                  ))}

                  {/* <option value="">Selecionar Región</option>
                                    <option value="Brewhouse">Brewhouse</option>
                                    <option value="Silos">Silos</option>
                                    <option value="Milling">Milling</option>
                                    <option value="Fermentation">Fermentation</option>
                                    <option value="Maturation">Maturation</option>
                                    <option value="Centrifuge">Centrifuge</option> */}
                </select>

                <span className="text-danger text-small d-block mb-2">
                  {errors.area && errors.area.message}
                </span>
              </div>

              {/* ========================================== Pais ================================================================= */}

              <div className="col-4">
                {/* <label>Frecuencia actualizacion <b className="text-danger">*</b></label> */}
                <label>
                  País <b className="text-danger">*</b>
                </label>

                {/* <select className="form-select">
                                                <option selected>Selecionar Frecuencia</option>
                                                <option value="1">Frecuencia 1</option>
                                                <option value="2">Frecuencia 2</option>
                                                <option value="3">Frecuencia 3</option>
                                            </select> */}
                <select
                  className="form-select"
                  name="country"
                  // onChange={handleInputChange}
                  {...register("country", {
                    required: {
                      value: true,
                      message: "Campo requerido",
                    },
                  })}

                  // value={equipoSeleccionado ? equipoSeleccionado.country : ''}
                  // onChange={handleChange}
                  // onChange={(e) => setcountry(e.target.value)}
                >
                  <option value="">Selecionar país</option>
                  {paisLis.map((elemento) => (
                    <option value={elemento.Id_Countries}>
                      {elemento.Name}
                    </option>
                  ))}

                  {/* <option value="">Selecionar país</option>
                                    <option value="1">Barbados</option>
                                    <option value="2">Colombia</option>
                                    <option value="3">Cuba</option>
                                    <option value="4">Dominicana</option>
                                    <option value="5">Ecuador</option>
                                    <option value="6">El Salvador</option>
                                    <option value="7">Guatemala</option>
                                    <option value="8">Honduras</option>
                                    <option value="9">México</option>
                                    <option value="10">Panamá</option>
                                    <option value="11">Perú</option>
                                    <option value="12">Saint Vincent</option> */}
                </select>

                <span className="text-danger text-small d-block mb-2">
                  {errors.country && errors.country.message}
                </span>
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-4 ">
                <label>
                  Ce Emplazam <b className="text-danger">*</b>
                </label>
                <Input
                  type="text"
                  name="emplazam"
                  placeholder="Ce Emplazam"
                  // onChange={handleInputChange}

                  {...register("emplazam", {
                    required: {
                      value: true,
                      message: "Campo requerido",
                    },
                  })}

                  // value={equipoSeleccionado ? equipoSeleccionado.emplazam : ''}
                  // onChange={handleChange}
                />
                <span className="text-danger text-small d-block mb-2">
                  {errors.emplazam && errors.emplazam.message}
                </span>
              </div>
              <div className="col-4">
                <label>
                  Planta <b className="text-danger">*</b>
                </label>
                <select
                  className="form-select"
                  name="planta"
                  // onChange={handleInputChange}

                  {...register("planta", {
                    required: {
                      value: true,
                      message: "Campo requerido",
                    },
                  })}
                >
                  <option value="">Selecionar Planta</option>
                  {operationsList.map((elemento) => (
                    <option value={elemento.Id_Operations}>
                      {elemento.Name}
                    </option>
                  ))}

                  {/* <option value="">Selecionar Planta</option>
                                    <option value="1">Apan</option>
                                    <option value="2">La Constancia Walter</option>
                                    <option value="3">El Salvador CSD</option> */}
                </select>

                <span className="text-danger text-small d-block mb-2">
                  {errors.planta && errors.planta.message}
                </span>
              </div>
              <div className="col-4">
                {/* <label>Responsables <b className="text-danger">*</b></label>
                            
                            <select className="form-select">
                            <option selected>Selecionar Responsable</option>
                            <option value="1">Responsable 1</option>
                            <option value="2">Responsable 2</option>
                            <option value="3">Responsable 3</option>
                        </select> */}

                <label>
                  BU <b className="text-danger">*</b>
                </label>
                <select
                  className="form-select"
                  name="BU"
                  // onChange={handleInputChange}

                  {...register("BU", {
                    required: {
                      value: true,
                      message: "Campo requerido",
                    },
                  })}

                  // value={equipoSeleccionado ? equipoSeleccionado.BU : ''}
                  // onChange={handleChange}
                  // onChange={(e) => setBU(e.target.value)}
                >
                  {/* ------------------------------------------------   SELECT DESDE LA BASE DE DATOS   ------------------------------------ */}
                  <option value="">Selecionar BU</option>
                  {buList.map((elemento) => (
                    <option value={elemento.Id_BU}>{elemento.Name}</option>
                  ))}

                  {/* <option value="">Selecionar BU</option>
                                    <option value="1">CAC</option>
                                    <option value="2">COL</option>
                                    <option value="3">PEC</option>
                                    <option value="4">MEX</option> */}
                </select>
                <span className="text-danger text-small d-block mb-2">
                  {errors.BU && errors.BU.message}
                </span>
              </div>
            </div>

            {/* =============================== BOTON SAVE En el medio ====================================== */}

            {/* <div className="col-md-7">
                    <div className="botonesSave pt-4 mt-3">
                        <button className="boton_pers mb-0"
                            type="submit"
                        >
                            Save <i className="far fa-save ml-1 "></i>
                        </button>
                    </div>
                </div> */}

            {/* ================================================================================ */}

            {/* <FormTechnicalInfo /> */}
          </div>
        </section>

        <div className="botones mb-5"></div>

        {/* ================================   TECHNICAL INFORMATION   =============================================== */}

        {/* ========================================================================================================== */}

        <section className=" mt-5 pt-5">
          <header>
            <div className="p-1  sectionBorder">
              <h1 className="text-center h1Color ">TECHNICAL INFORMATION</h1>
            </div>
          </header>
          <br />
          <br />
          <br />

          <div className="pt-3 pl-3 pr-3 d-flex ">
            <div className="me-auto p-2 bd-highlight ml-5">
              <p className="h1Color ">
                <h4>Specifications</h4>
              </p>
            </div>

            {/* <div className="botones btn-lg mr-5" >

                            <div className="botonesSave">
                                <button className="boton_pers mb-0"
                                    type="submit">
                                    Save <i className="far fa-save ml-1 "></i> </button>
                            </div>

                        </div> */}
          </div>
          <hr />

          {/* ==================== OEM ================================================= */}
          {/* ========================================================================= */}

          {/* <Container className="techInfor"> */}
          <Row className="p-5 ">
            <Col xs="4" sm="4">
              <label>OEM</label>
              <Input
                type="text"
                name="OEM"
                placeholder="OEM"
                {...register("OEM", {
                  required: {
                    value: true,
                    message: "Campo requerido",
                  },
                })}
              />
              <span className="text-danger text-small d-block mb-2">
                {errors.OEM && errors.OEM.message}
              </span>
            </Col>

            {/* ============================== weight ========================================================          */}

            <Col xs="4" sm="4">
              <label>weight</label>
              <Input
                type="text"
                name="weight"
                placeholder="weight"
                {...register("weight", {
                  required: {
                    value: true,
                    message: "Campo requerido",
                  },
                })}
              />
              <span className="text-danger text-small d-block mb-2">
                {errors.weight && errors.weight.message}
              </span>
            </Col>

            {/* ==================================================================================================== */}

            <Col xs="4" sm="4">
              <label>Equipment type</label>
              <select
                className="form-select"
                name="equipmentType"
                {...register("equipmentType", {
                  required: {
                    value: true,
                    message: "Campo requerido",
                  },
                })}
              >
                <option value="">Select Equipment type</option>
                <option value="1">Automation/ Electronic</option>
                <option value="2">Electrical</option>
                <option value="3">Mechanical</option>
              </select>

              <span className="text-danger text-small d-block mb-2">
                {errors.equipmentType && errors.equipmentType.message}
              </span>
            </Col>
          </Row>

          {/* =========================== Description ==========================================================================    */}

          <div className=" row d-flex justify-content-center">
            <div className="col-4">
              <label>Equipment description</label>
              <Input
                type="text"
                name="descripcion"
                placeholder="Descripción"
                {...register("descripcion", {
                  required: {
                    value: true,
                    message: "Campo requerido",
                  },
                })}
              />
              <span className="text-danger text-small d-block mb-2">
                {errors.descripcion && errors.descripcion.message}
              </span>
            </div>

            {/* ======================================== Current ==============================================================        */}

            <div className="col-4">
              <label>Equipment current conditions</label>
              <select
                className="form-select"
                name="current"
                {...register("current", {
                  required: {
                    value: true,
                    message: "Campo requerido",
                  },
                })}
              >
                <option value="">Seleccionar condicion del equipo</option>
                <option value="1">Excellent</option>
                <option value="2">Very Good</option>
                <option value="3">Good</option>
                <option value="3">Regular</option>
                <option value="3">Bad</option>
                <option value="3">Very Bad</option>
              </select>
              <span className="text-danger text-small d-block mb-2">
                {errors.current && errors.current.message}
              </span>
            </div>
          </div>
        </section>

        {/* ============================================   SERVICES INFORMATION   ======================================================================== */}

        {/* ==================================================================================================================== */}

        <br />
        <br />
        <br />

        <section className="pt-5 mt-5">
          <header>
            <div className="p-1  sectionBorder">
              <h1 className="text-center h1Color ">SERVICES INFORMATION</h1>
            </div>
          </header>
          <br />
          <br />
          <br />

          {/* <h1 className="text-center">SERVICES INFORMATION</h1> */}

          <div className="pt-3 pl-3 pr-3 d-flex">
            <div className="me-auto p-2 bd-highlight px-4 ml-4">
              <p className="h1Color ">
                <h4>Specifications</h4>
              </p>
            </div>

            {/* ======================================= BOTON ========================================== */}

            {/* <div className="botones btn-lg mr-5" >
                            <div className="botonesSave">
                                <button className="boton_pers mb-0"
                                >
                                    Save <i className="far fa-save ml-1 "></i>

                                </button>
                            </div>
                        </div> */}
          </div>
          <hr />

          {/* <div className=""> */}
          <div className=" row d-flex justify-content-center">
            <div className="col-4">
              <label>Date of Installation</label>
              <Input
                type="text"
                id="dateInstallation"
                placeholder="Date"
                size="40"
              ></Input>
            </div>
            <div className="col-4">
              <label>Desuse reason</label>
              <Input
                type="text"
                id="desuseReason"
                placeholder="Desuse reason"
                size="40"
              ></Input>
            </div>
          </div>
          {/* </div> */}
        </section>

        {/* ---------------------       Boton flotante      ------------------------- */}
        <section>
          <div className="contenedor-botones ">
            <div className="redes">
              {/* <div className="botonesSave pt-4 mt-3"> */}
              <button className="botonF1 boton_pers">
                Save <i className="far fa-save ml-1 "></i>
              </button>
            </div>
          </div>
        </section>

        {/* boton_pers border mb-0 */}

        {/* <div class="contenedor ">
                    
                    <button class="botonF1">
                        <span><i className="far fa-save ml-1 "></i></span>
                    </button>
                    <button class="btn botonF2">
                        <span>+</span>
                    </button>
                    <button class="btn botonF3">
                        <span>+</span>
                    </button>
                    <button class="btn botonF4">
                        <span>+</span>
                    </button>
                    <button class="btn botonF5">
                        <span>+</span>
                    </button>
                </div> */}
      </form>
      {/* <h3>{equipoSeleccionado.equipos} - {equipoSeleccionado.planta}</h3> */}
    </Fragment>
  );
};

export default Formulario;
