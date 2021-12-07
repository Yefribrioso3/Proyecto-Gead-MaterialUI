import React, { Fragment } from 'react'
// , useState, useEffect
import { Col, Input, Row } from 'reactstrap';
import { useForm } from 'react-hook-form'

const EditFormulario = (props) => {

    console.log(props.currentEquipo);
    // const idValue = props.currentEquipo;


    const { register,  formState: { errors }, setValue } = useForm({
        // handleSubmit,
        defaultValues: props.currentEquipo
  
    });

    // useEffect(() => {
    setValue('id', props.currentEquipo.id);
    setValue('BU', props.currentEquipo.BU);
    setValue('country', props.currentEquipo.country);
    setValue('area', props.currentEquipo.area);
    setValue('planta', props.currentEquipo.planta);
    setValue('equipos', props.currentEquipo.equipos);
    setValue('denominacionEquipo', props.currentEquipo.modelnumber);
    setValue('descripcion', props.currentEquipo.descripcion);
    setValue('emplazam', props.currentEquipo.emplazam);
    setValue('equipmentType', props.currentEquipo.equipmentType);


    
    // });



    // const handleChange = (e) => {  //Funcion para capturar lo que escriba el usuario
    //     const { name, value } = e.target;
    //     console.log(e.target.value)
    //     // props.setCurrentEquipo((prevState) => ({
    //     //     ...prevState,
    //     //     [name]: value
    //     // }));
    // }















    // const onSubmit = (data, e) => {
    //     // console.log(data)

    //     data.id = props.currentEquipo.id

    //     props.updateEquipo(props.currentEquipo.id, data)

    //     //Limpiar campos
    //     e.target.reset()
    // }


    return (
        <Fragment>

            <form >
                <div className="p-3">
                    <p className="h1Color p-0"><h4>El maestro de equipos le permite crear/actualizar equipos de la zona.</h4></p>

                    <section className="pt-3">
                        <div className="botones mb-5">

                        </div>
                        <div className="row mb-4 ">
                            <div className="col-2 mr-5">
                                <label>Id:<b className="text-danger">*</b></label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="id"
                                    readOnly
                                    value={props.currentEquipo.id}
                                // value={equipoSeleccionado && equipoSeleccionado.id}
                                // value={idValue[idValue.length - 1].id + 1}
                                />
                            </div>

                            {/* ================================================================================================== */}

                            <div className="col-4">
                                <label htmlFor="equipos">Equipo <b className="text-danger">*</b></label>
                                <Input
                                    type="text"
                                    name="equipos"
                                    // value={props.currentEquipo && props.currentEquipo.equipos}
                                    // onChange={handleChange}
                                    
                                    {...register("equipos", {
                                        required: {
                                            value: true,
                                            message: 'Campo requerido'
                                        }
                                    })}
                                />
                                <span className="text-danger text-small d-block mb-2">
                                    {/* {errors?.equipos?.message} */}
                                    {errors.equipos && errors.equipos.message}
                                </span>
                            </div>

                            {/* =============================== BOTON SAVE ====================================== */}

                            <div className="col-5">
                                <div className="botonesSave pt-4 mt-3">
                                    <button 
                                        // type="submit"
                                        className="boton_pers mb-0"
                                    >
                                        Edit <i className="far fa-edit ml-1 "></i>
                                    </button>
                                </div>
                            </div>

                            {/* ================================================================================ */}

                        </div>
                        <div className="row mb-4">
                            <div className="col-4">
                                <label htmlFor="denominacionEquipo">Model Number <b className="text-danger">*</b></label>
                                <Input
                                    type="text"
                                    name="modelnumber"
                                    placeholder="Model Number"

                                    {...register("modelnumber", {
                                        required: {
                                            value: true,
                                            message: 'Campo requerido'
                                        }
                                    })}
                                />
                                <span className="text-danger text-small d-block mb-2">
                                    {errors.modelnumber && errors.modelnumber.message}
                                </span>

                            </div>

                            {/* =================================== Area ========================================================================      */}

                            <div className="col-4">
                                <label htmlFor="area">Area <b className="text-danger">*</b></label>
                                <select
                                    className="form-select"
                                    name="area"

                                    {...register("area", {
                                        required: {
                                            value: true,
                                            message: 'Campo requerido'
                                        }
                                    })}
                                >
                                    <option value="">Selecionar Región</option>
                                    <option value="Brewhouse">Brewhouse</option>
                                    <option value="Silos">Silos</option>
                                    <option value="Milling">Milling</option>
                                    <option value="Fermentation">Fermentation</option>
                                    <option value="Maturation">Maturation</option>
                                    <option value="Centrifuge">Centrifuge</option>
                                </select>

                                <span className="text-danger text-small d-block mb-2">
                                    {errors.area && errors.area.message}
                                </span>
                            </div>

                            {/* ========================================== Pais ================================================================= */}

                            <div className="col-4">
                                <label>País <b className="text-danger">*</b></label>

                                <select className="form-select"
                                    name="country"
                                    {...register("country", {
                                        required: {
                                            value: true,
                                            message: 'Campo requerido'
                                        }
                                    })}
                                >
                                    <option value="">Selecionar país</option>
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
                                    <option value="12">Saint Vincent</option>
                                </select>

                                <span className="text-danger text-small d-block mb-2">
                                    {errors.country && errors.country.message}
                                </span>

                            </div>
                        </div>
                        {/* =================================   Emplazam   ====================================== */}
                        <div className="row mb-4">
                            <div className="col-4 ">
                                <label>Ce Emplazam <b className="text-danger">*</b></label>
                                <Input
                                    type="text"
                                    name="emplazam"
                                    placeholder="Ce Emplazam"

                                    {...register("emplazam", {
                                        required: {
                                            value: true,
                                            message: 'Campo requerido'
                                        }
                                    })}
                                />
                                <span className="text-danger text-small d-block mb-2">
                                    {errors.emplazam && errors.emplazam.message}
                                </span>

                            </div>
                            <div className="col-4">
                                <label>Planta <b className="text-danger">*</b></label>
                                <select
                                    className="form-select"
                                    name="planta"

                                    {...register("planta", {
                                        required: {
                                            value: true,
                                            message: 'Campo requerido'
                                        }
                                    })}
                                >
                                    <option value="">Selecionar Planta</option>
                                    <option value="1">Apan</option>
                                    <option value="2">La Constancia Walter</option>
                                    <option value="3">El Salvador CSD</option>
                                </select>

                                <span className="text-danger text-small d-block mb-2">
                                    {errors.planta && errors.planta.message}
                                </span>
                            </div>

                            <div className="col-4">
                                <label>BU <b className="text-danger">*</b></label>
                                <select
                                    className="form-select"
                                    name="BU"

                                    {...register("BU", {
                                        required: {
                                            value: true,
                                            message: 'Campo requerido'
                                        }
                                    })}
                                >
                                    <option value="">Selecionar BU</option>
                                    <option value="1">CAC</option>
                                    <option value="2">COL</option>
                                    <option value="3">PEC</option>
                                    <option value="4">MEX</option>
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
                            Edit <i className="far fa-edit ml-1 "></i>
                        </button>
                    </div>
                </div> */}

                        {/* ================================================================================ */}
                    </section>
                </div>




                <div className="botones mb-5">
                </div>

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

                    <div className="pt-3 pl-3 pr-3 d-flex " >
                        <div className="me-auto p-2 bd-highlight ml-5">

                            <p className="h1Color "><h4>Specificatinos</h4></p>
                        </div>

                        <div className="botones btn-lg mr-5" >

                            <div className="botonesSave">
                                <button
                                    className="boton_pers mb-0"
                                >
                                    Edit <i className="far fa-edit ml-1 "></i>
                                </button>
                            </div>

                        </div>
                    </div>
                    <hr />

                    {/* ==================== OEM ================================================= */}
                    {/* ========================================================================= */}

                    <Row className="p-5 ">
                        <Col xs="4" sm="4">
                            <label> OEM </label>
                            <Input type="text"
                                name="OEM"
                                placeholder="OEM"
                                {...register("OEM", {
                                    required: {
                                        value: true,
                                        message: 'Campo requerido'
                                    }
                                })}
                            />
                            <span className="text-danger text-small d-block mb-2">
                                {errors.OEM && errors.OEM.message}
                            </span>

                        </Col>

                        {/* ============================== weight ========================================================          */}

                        <Col xs="4" sm="4">
                            <label>
                                weight
                            </label>
                            <Input type="text"
                                name="weight"
                                placeholder="weight"

                                {...register("weight", {
                                    required: {
                                        value: true,
                                        message: 'Campo requerido'
                                    }
                                })}
                            />
                            <span className="text-danger text-small d-block mb-2">
                                {errors.weight && errors.weight.message}
                            </span>
                        </Col>

                        {/* ==================================================================================================== */}

                        <Col xs="4" sm="4">
                            <label htmlFor="equipmentType">Equipment type <b className="text-danger">*</b></label>
                            <select
                                className="form-select"
                                name="equipmentType"

                                {...register("equipmentType", {
                                    required: {
                                        value: true,
                                        message: 'Campo requerido'
                                    }
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
                            <label>
                                Equipment description
                            </label>
                            <Input type="text"
                                name="descripcion"
                                placeholder="Descripción"

                                {...register("description", {
                                    required: {
                                        value: true,
                                        message: 'Campo requerido'
                                    }
                                })}
                            />
                            <span className="text-danger text-small d-block mb-2">
                                {errors.description && errors.description.message}
                            </span>
                        </div>

                        {/* ======================================== Current ==============================================================        */}

                        <div className="col-4">
                            <label>
                                Equipment current conditions
                            </label>
                            <select className="form-select"
                                name="current"

                                {...register("current", {
                                    required: {
                                        value: true,
                                        message: 'Campo requerido'
                                    }
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

                    <div className="pt-3 pl-3 pr-3 d-flex">
                        <div className="me-auto p-2 bd-highlight px-4 ml-4">
                            <p className="h1Color "><h4>Specificatinos</h4></p>
                        </div>

                        {/* ======================================= BOTON ========================================== */}

                        <div className="botones btn-lg mr-5" >
                            <div className="botonesSave">
                                <button
                                    className="boton_pers mb-0"
                                >
                                    Edit <i className="far fa-edit ml-1 "></i>

                                </button>
                            </div>
                        </div>
                    </div>
                    <hr />

                    <div className=" row d-flex justify-content-center">
                        <div className="col-4">
                            <label>
                                Date of Installation
                            </label>
                            <Input
                                type="text"
                                name="dateInstallation"
                                placeholder="Date"
                                size="40"
                            />
                        </div>
                        <div className="col-4">
                            <label>
                                Desuse reason
                            </label>
                            <Input
                                type="text"
                                name="desuseReason"
                                placeholder="Desuse reason"
                                size="40"
                            />
                        </div>
                    </div>

                </section>

            </form>
        </Fragment>
    )
}

export default EditFormulario