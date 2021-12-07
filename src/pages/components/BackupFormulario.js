import React, { Fragment, useState } from 'react'
import { Input } from 'reactstrap';
import { useForm } from 'react-hook-form'

const Formulario = ({ data }) => {

    const [dataInfo, setData] = useState(data);
    const {register, errors, handleSubmit} = useForm();

    const [equipoSeleccionado, setEquipoSeleccionado] = useState({  //Hook para controlar el equipo seleccionado
        id: '',
        BU: '',
        country: '',
        area: '',
        planta: '',
        equipos: '',
        denominacionEquipo: '',
        descripcion: '',
        emplazam: '',
    });


    const handleInputChange = (event) => {   // Mostrar cada interaccion en la consola

        equipoSeleccionado.id = dataInfo.length + 1;
        console.log(event.target.value);    // imprime todos los cambios capturados en el formulario

        setEquipoSeleccionado({
            ...equipoSeleccionado,
            [event.target.name]: event.target.value

        });

    }

    const guardarDatos = (event) => {
        event.preventDefault();
        console.log('Equipo: ' + equipoSeleccionado.equipos + ', Planta: ' + equipoSeleccionado.planta)
    }

    return (
        <Fragment>

            {/* onSubmit={guardarDatos} */}

            <form onSubmit={guardarDatos}>
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
                            value={dataInfo[dataInfo.length - 1].id + 1}

                        // type="text text-align=center"
                        />
                    </div>
                    <div className="col-4">
                        <label htmlFor="equipos">Equipo <b className="text-danger">*</b></label>
                        <Input type="text"
                            className="form-control"
                            name="equipos"
                            placeholder="Equipo"
                            onChange={handleInputChange}

                        // value={equipoSeleccionado ? equipoSeleccionado.equipos : ''}
                        // onChange={handleChange}
                        // onChange={ (e) => setEquipo(e.target.value) }
                        />
                    </div>

                    {/* =============================== BOTON SAVE ====================================== */}

                    <div className="col-5">
                        <div className="botonesSave pt-4 mt-3">
                            <button className="boton_pers mb-0"
                                type="submit"
                            >
                                Save <i className="far fa-save ml-1 "></i>
                            </button>
                        </div>
                    </div>

                    {/* ================================================================================ */}



                </div>
                <div className="row mb-4">
                    <div className="col-4">
                        <label htmlFor="denominacionEquipo">Denominacion del equipo <b className="text-danger">*</b></label>
                        <Input
                            type="text"
                            name="denominacionEquipo"
                            placeholder="Denominacion del Equipo"
                            onChange={handleInputChange}

                        // value={equipoSeleccionado && equipoSeleccionado.denominacionEquipo}
                        // onChange={handleChange}
                        // onChange={ (e) => setDenominacionEquipo(e.target.value) }
                        >
                        </Input>

                    </div>

                    <div className="col-4">
                        <label htmlFor="area">Area <b className="text-danger">*</b></label>
                        <select
                            className="form-select"
                            name="area"
                            onChange={handleInputChange} s

                        // value={equipoSeleccionado ? equipoSeleccionado.area : ''}
                        // onChange={handleChange}
                        // onChange={ (e) => setArea(e.target.value) }
                        >

                            <option selected>Selecionar Región</option>
                            <option value="Brewhouse">Brewhouse</option>
                            <option value="Silos">Silos</option>
                            <option value="Milling">Milling</option>
                            <option value="Fermentation">Fermentation</option>
                            <option value="Maturation">Maturation</option>
                            <option value="Centrifuge">Centrifuge</option>
                        </select>
                    </div>
                    <div className="col-4">
                        {/* <label>Frecuencia actualizacion <b className="text-danger">*</b></label> */}
                        <label>País <b className="text-danger">*</b></label>

                        {/* <select className="form-select">
                                                <option selected>Selecionar Frecuencia</option>
                                                <option value="1">Frecuencia 1</option>
                                                <option value="2">Frecuencia 2</option>
                                                <option value="3">Frecuencia 3</option>
                                            </select> */}

                        <select className="form-select"
                            name="country"
                            onChange={handleInputChange}

                        // value={equipoSeleccionado ? equipoSeleccionado.country : ''}
                        // onChange={handleChange}
                        // onChange={(e) => setcountry(e.target.value)}
                        >

                            <option selected>Selecionar país</option>
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
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col-4 ">
                        <label>Ce Emplazam <b className="text-danger">*</b></label>
                        <Input
                            type="text"
                            name="emplazam"
                            placeholder="Ce Emplazam"
                            onChange={handleInputChange}

                        // value={equipoSeleccionado ? equipoSeleccionado.emplazam : ''}
                        // onChange={handleChange}
                        >
                        </Input>
                    </div>
                    <div className="col-4">
                        <label>Planta <b className="text-danger">*</b></label>
                        <select
                            className="form-select"
                            name="planta"
                            onChange={handleInputChange}

                        // value={equipoSeleccionado ? equipoSeleccionado.planta : ''}
                        // onChange={handleChange}
                        // onChange={(e) => setplanta(e.target.value)}
                        >

                            <option selected>Selecionar Planta</option>
                            <option value="1">Apan</option>
                            <option value="2">La Constancia Walter</option>
                            <option value="3">El Salvador CSD</option>
                        </select>
                    </div>
                    <div className="col-4">
                        {/* <label>Responsables <b className="text-danger">*</b></label>
                            
                            <select className="form-select">
                            <option selected>Selecionar Responsable</option>
                            <option value="1">Responsable 1</option>
                            <option value="2">Responsable 2</option>
                            <option value="3">Responsable 3</option>
                        </select> */}

                        <label>BU <b className="text-danger">*</b></label>
                        <select
                            className="form-select"
                            name="BU"
                            onChange={handleInputChange}

                        // value={equipoSeleccionado ? equipoSeleccionado.BU : ''}
                        // onChange={handleChange}
                        // onChange={(e) => setBU(e.target.value)}
                        >
                            <option selected>Selecionar BU</option>
                            <option value="1">CAC</option>
                            <option value="2">COL</option>
                            <option value="3">PEC</option>
                            <option value="4">MEX</option>
                        </select>

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


            </form>
            {/* <h3>{equipoSeleccionado.equipos} - {equipoSeleccionado.planta}</h3> */}

        </Fragment>
    )
}

export default Formulario
