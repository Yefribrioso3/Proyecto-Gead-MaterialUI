import React, { useState } from 'react';
// , useEffect
import "bootstrap/dist/css/bootstrap.min.css";
// import Axios from 'axios';

// import { v4 as uuidv4 } from 'uuid';
//import { NavBar } from '../ui/NavBar';
// import '../menu/menu.css'
import "../components/menu/menu.css"
import {
    Container,
    // Row,
    // Col,
    // Button,
    // Input
} from 'reactstrap';
import Formulario from './components/Formulario';
// import FormTable from './components/FormTable';
import EditFormulario from './components/EditFormulario';
// import Buscador from './components/Buscador';
// import { dataEquipos } from './components/Data';



const MasterEquipos = ({ props, valor = false }) => {

    const dataEquipos = [
        { id: 1, BU: "4", country: "Mexico", area: "1", planta: "Apan", equipos: "BOMBA DE COMBUSTOLEO TQ-1 (A)", modelnumber: "XC206-2SFP", descripcion: "Managed Switch 6 Copper ports + 2 Fiber Optic LC Port", emplazam: "", OEM: "OEM", weight: "", current: "", equipmentType: "" },
        { id: 2, BU: "MEX", country: "Colombia", area: "General Services", planta: "Impresur", equipos: "TROQUELADORA BOBST", modelnumber: "", descripcion: "Managed Switch 6 Copper ports", emplazam: "", OEM: "", weight: "", current: "", equipmentType: "" },
        { id: 3, BU: "CAC", country: "Colombia", area: "Silos", planta: "Impresur", equipos: "TROQUELADORA BOBST", modelnumber: "", descripcion: "Managed Switch 6 Copper ports ", emplazam: "", OEM: "", weight: "", current: "", equipmentType: "" },
        { id: 4, BU: "PEC", country: "Colombia", area: "Milling", planta: "Impresur", equipos: "TROQUELADORA BOBST", modelnumber: "", descripcion: "Managed Switch 6 Copper ports ", emplazam: "", OEM: "", weight: "", current: "", equipmentType: "" },
        { id: 5, BU: "COL", country: "Colombia", area: "Syrup House", planta: "Impresur", equipos: "TROQUELADORA BOBST", modelnumber: "", descripcion: "Managed Switch 6 Copper ports", emplazam: "", OEM: "", weight: "", current: "", equipmentType: "" },
        { id: 6, BU: "COL", country: "Colombia", area: "Brewhose", planta: "Impresur", equipos: "TROQUELADORA BOBST", modelnumber: "", descripcion: "Managed Switch 6 Copper ports ", emplazam: "", OEM: "", weight: "", current: "", equipmentType: "" },
        { id: 7, BU: "COL", country: "Colombia", area: "Brewhose", planta: "Impresur", equipos: "TROQUELADORA BOBST", modelnumber: "", descripcion: "2 Fiber Optic LC Port", emplazam: "", OEM: "", weight: "", current: "", equipmentType: "" },
        { id: 8, BU: "COL", country: "Colombia", area: "Brewhose", planta: "Impresur", equipos: "TROQUELADORA BOBST", modelnumber: "", descripcion: "Managed Switch 6 Copper ports", emplazam: "", OEM: "", weight: "", current: "", equipmentType: "" },
        { id: 9, BU: "COL", country: "Colombia", area: "Brewhose", planta: "Impresur", equipos: "TROQUELADORA BOBST", modelnumber: "", descripcion: " + 2 Fiber Optic LC Port", emplazam: "", OEM: "", weight: "", current: "", equipmentType: "" },
        { id: 10, BU: "COL", country: "Colombia", area: "Brewhose", planta: "Impresur", equipos: "TROQUELADORA BOBST", modelnumber: "", descripcion: "Managed Switch 6 Copper ports", emplazam: "", OEM: "", weight: "", current: "", equipmentType: "" },
        { id: 11, BU: "COL", country: "Colombia", area: "Brewhose", planta: "Impresur", equipos: "TROQUELADORA BOBST", modelnumber: "", descripcion: "2 Fiber Optic LC Port", emplazam: "", OEM: "", weight: "", current: "", equipmentType: "" },
        { id: 12, BU: "COL", country: "Colombia", area: "Brewhose", planta: "Impresur", equipos: "TROQUELADORA BOBST", modelnumber: "", descripcion: "Managed Switch 6 Copper ports", emplazam: "", OEM: "", weight: "", current: "", equipmentType: "" },
        { id: 13, BU: "COL", country: "Colombia", area: "Brewhose", planta: "Impresur", equipos: "TROQUELADORA BOBST", modelnumber: "", descripcion: "Managed Switch 6 Copper ports", emplazam: "", OEM: "", weight: "", current: "", equipmentType: "" },
        { id: 14, BU: "COL", country: "Colombia", area: "Brewhose", planta: "Impresur", equipos: "TROQUELADORA BOBST", modelnumber: "", descripcion: "2 Fiber Optic LC Port", emplazam: "", OEM: "", weight: "", current: "", equipmentType: "" },
        { id: 15, BU: "COL", country: "Colombia", area: "Brewhose", planta: "Impresur", equipos: "TROQUELADORA BOBST", modelnumber: "", descripcion: "Managed Switch 6 Copper ports", emplazam: "", OEM: "", weight: "", current: "", equipmentType: "" },
        { id: 16, BU: "COL", country: "Colombia", area: "Brewhose", planta: "Impresur", equipos: "TROQUELADORA BOBST", modelnumber: "", descripcion: "Managed Switch 6 Copper ports", emplazam: "", OEM: "", weight: "", current: "", equipmentType: "" },
        { id: 17, BU: "COL", country: "Colombia", area: "Brewhose", planta: "Impresur", equipos: "TROQUELADORA BOBST", modelnumber: "", descripcion: "2 Fiber Optic LC Port", emplazam: "", OEM: "", weight: "", current: "", equipmentType: "" },
        { id: 18, BU: "COL", country: "Colombia", area: "Brewhose", planta: "Impresur", equipos: "TROQUELADORA BOBST", modelnumber: "", descripcion: "Managed Switch 6 Copper ports", emplazam: "", OEM: "", weight: "", current: "", equipmentType: "" },
        { id: 19, BU: "COL", country: "Colombia", area: "Brewhose", planta: "Impresur", equipos: "TROQUELADORA BOBST", modelnumber: "", descripcion: "Managed Switch 6 Copper ports", emplazam: "", OEM: "", weight: "", current: "", equipmentType: "" },
        { id: 20, BU: "COL", country: "Colombia", area: "Brewhose", planta: "Impresur", equipos: "TROQUELADORA BOBST", modelnumber: "", descripcion: "2 Fiber Optic LC Port", emplazam: "", OEM: "", weight: "", current: "", equipmentType: "" },
        { id: 21, BU: "COL", country: "Colombia", area: "Brewhose", planta: "Impresur", equipos: "TROQUELADORA BOBST", modelnumber: "", descripcion: "Managed Switch 6 Copper ports", emplazam: "", OEM: "", weight: "", current: "", equipmentType: "" },
        { id: 22, BU: "COL", country: "Colombia", area: "Brewhose", planta: "Impresur", equipos: "TROQUELADORA BOBST", modelnumber: "", descripcion: "2 Fiber Optic LC Port", emplazam: "", OEM: "", weight: "", current: "", equipmentType: "" },
        { id: 23, BU: "COL", country: "Colombia", area: "Brewhose", planta: "Impresur", equipos: "TROQUELADORA BOBST", modelnumber: "", descripcion: "Managed Switch 6 Copper ports", emplazam: "", OEM: "", weight: "", current: "", equipmentType: "" },
        { id: 24, BU: "COL", country: "Colombia", area: "Brewhose", planta: "Impresur", equipos: "TROQUELADORA BOBST", modelnumber: "", descripcion: "2 Fiber Optic LC Port", emplazam: "", OEM: "", weight: "", current: "", equipmentType: "" },
        { id: 25, BU: "COL", country: "Colombia", area: "Brewhose", planta: "Impresur", equipos: "TROQUELADORA BOBST", modelnumber: "", descripcion: "Managed Switch 6 Copper ports", emplazam: "", OEM: "", weight: "", current: "", equipmentType: "" },
        { id: 26, BU: "COL", country: "Colombia", area: "Brewhose", planta: "Impresur", equipos: "TROQUELADORA BOBST", modelnumber: "", descripcion: "2 Fiber Optic LC Port", emplazam: "", OEM: "", weight: "", current: "", equipmentType: "" },
        { id: 27, BU: "COL", country: "Colombia", area: "Brewhose", planta: "Impresur", equipos: "TROQUELADORA BOBST", modelnumber: "", descripcion: "Managed Switch 6 Copper ports", emplazam: "", OEM: "", weight: "", current: "", equipmentType: "" },
        { id: 28, BU: "COL", country: "Colombia", area: "Brewhose", planta: "Impresur", equipos: "TROQUELADORA BOBST", modelnumber: "", descripcion: "Managed Switch 6 Copper ports", emplazam: "", OEM: "", weight: "", current: "", equipmentType: "" },
        { id: 29, BU: "PEC", country: "Peru", area: "Brewhose", planta: "Impresur", equipos: "Engrapadora", modelnumber: "", descripcion: "Managed Switch 6 Copper ports", emplazam: "", OEM: "", weight: "", current: "", equipmentType: "" },
    ];

    //State
    const [dataInfo, setData] = useState(dataEquipos);

    //Hook para utilizar los datosEquipos

    // const [modalEditar, setModalEditar] = useState(false); //Hook para abrir y cerrar el modalEditar
    // const [modalEliminar, setModalEliminar] = useState(false); //Hook para abrir y cerrar el modal Eliminar
    // const [modalInsertar, setModalInsertar] = useState(false); //Hook para abrir y cerrar el modal Insertar
    // const [modalConsultaAv, setModalConsultaAv] = useState(false); //Hook para abrir y cerrar el modal Consulta Avanzada


    // const [state, setState] = useState(false)   //Modal abrir y cerrar


    // const [equipoSeleccionado, setEquipoSeleccionado] = useState({  //Hook para controlar el equipo seleccionado
    //     id: '',
    //     BU: '',
    //     country: '',
    //     area: '',
    //     planta: '',
    //     equipos: '',
    //     denominacionEquipo: '',
    //     descripcion: '',
    //     emplazam: '',
    // });


    // const seleccionarEquipo = (elemento, caso) => {  //Funcion para editar y eliminar el quipo seleccionado
    //     setEquipoSeleccionado(elemento);
    //     // (caso === 'Editar') ? setModalEditar(true) : setModalEliminar(true) //Funcion para abrir el modal
    // }

    // // Funcion para capturar lo que escriba el usuario
    // const handleChange = e => {
    //     e.preventDefault();

    //     const { name, value } = e.target;
    //     setEquipoSeleccionado((prevState) => ({
    //         ...prevState,
    //         [name]: value
    //     }));

    //     console.log(equipoSeleccionado);
    // }

    // const imprimir = (objeto) => {
    //     console.log(objeto)
    // }


    // Limpiar campos
    // e.target.reset();


    // let abrirModal = () => {       //Cambio el estado para abrir o cerrar el modal
    //     setState({ abierto: !state.abierto });
    // }
    // abrirModal = abrirModal.bind(this);

    // console.log(props.dataEquipoInfo)


    // console.log(sd);
    // const [equipos, setEquipo ] = React.useState('');
    // const [denominacionEquipo, setDenominacionEquipo] = React.useState('');
    // const [area, setArea] = React.useState('');
    // const [country, setcountry] = React.useState('');
    // const [planta, setplanta] = React.useState('');
    // const [BU, setBU] = React.useState('');

    // const [dataInfo, setData] = useState(dataEquipos);

    // const guardarDatos = (e) => {


    //     if (!dataInfo.equipos.trim()) {
    //         console.log('Ingrese un equipo')
    //         return
    //     }
    //     if (!dataInfo.denominacionEquipo.trim()) {
    //         console.log('Ingrese denominacion')
    //         return
    //     }
    //     if (!dataInfo.area.trim()) {
    //         console.log('Ingrese area')
    //         return
    //     }
    //     if (!dataInfo.country.trim()) {
    //         console.log('Ingrese pais')
    //         return
    //     }
    //     if (!dataInfo.planta.trim()) {
    //         console.log('Ingrese planta')
    //         return
    //     }
    //     if (!dataInfo.BU.trim()) {
    //         console.log('Ingrese BU')
    //         return
    //     }

    //     // console.log('procesando datos... '  + equipos)

    //     e.target.reset()
    //     // setFruta('')
    //     // setDescripcion('')
    //     let valorInsertar = equipoSeleccionado; //Variable auxiliar para modificar el equipo seleccionado 
    //     //valorInsertar.id = data[data.length + 1].id + 1; //y agregar el ID auto incrementable.
    //     // valorInsertar.id = dataInfo.length + 1;
    //     valorInsertar.id = dataInfo[dataInfo.length - 1].id + 1;

    //     setData([
    //         ...dataInfo,
    //         valorInsertar
    //     ])

    //     // e.target.reset()
    //     // setEquipo('')
    //     // setDenominacionEquipo('')
    //     // setArea('')
    //     // setcountry('')
    //     // setplanta('')
    //     // setBU('')

    // }


    //========================================================================================
    // Agregar Datos            
    // const addEquipos = (equipment) => {

    //     // equipo.id = dataInfo.length + 1;
    //     // let valorInsertar = equipoSeleccionado; //Variable auxiliar para modificar el equipo seleccionado 
    //     //valorInsertar.id = data[data.length + 1].id + 1; //y agregar el ID auto incrementable.
    //     // valorInsertar.id = dataInfo.length + 1;
    //     // valorInsertar.id = dataInfo[dataInfo.length - 1].id + 1;
    //     equipment.id = dataInfo.length + 1;

    //     setData([
    //         ...dataInfo,
    //         equipment
    //     ])

    //     // imprimir(dataInfo)
    // };


    const [editing, setEditing] = useState(false); // Mostrar uno u otro formulario 

    const [currentEquipo, setCurrentEquipo] = useState({  // Modificar o editar equipos  
        id: null,
        BU: '',
        country: '',
        area: '',
        planta: '',
        equipos: '',
        modelnumber: '',
        descripcion: '',
        emplazam: '',
        OEM: '',
        weight: '',
        current: '',
        equipmentType: ''
    });

    // const editRow = (equipo) => {
    //     setEditing(true);
    //     setCurrentEquipo({
    //         id: equipo.id,
    //         BU: equipo.BU,
    //         country: equipo.country,
    //         area: equipo.area,
    //         planta: equipo.planta,
    //         equipos: equipo.equipos,
    //         modelnumber: equipo.modelnumber,
    //         descripcion: equipo.descripcion,
    //         emplazam: equipo.emplazam,
    //         OEM: equipo.OEM,
    //         weight: equipo.weight,
    //         current: equipo.current,
    //         equipmentType: equipo.equipmentType
    //     })
    // }





    const updateEquipo = (id, updatedEquipo) => {
        setEditing(false);
        setData(dataInfo.map(equipo => (equipo.id === id ? updatedEquipo : equipo))) //Si los id son iguales, mostrara el equipo actualizado, sino seguira mostrando el mismo
    }







    
    //=========================================================================================

    // onSubmit Formulario --- Agregar Equipos ---

    const addEquipos = (equipment) => {
        // equipoSeleccionado.id = dataInfo.length + 1;
        // data.id = dataInfo[dataInfo.length - 1].id + 1;
        // console.log('Equipo: ' + equipoSeleccionado.equipos + ', Planta: ' + equipoSeleccionado.planta)

        equipment.id = dataInfo.length + 1;
        console.log(equipment)

        setData([
            ...dataInfo,
            equipment
        ])
    };

    // ========================================================================================

    // Eliminar Equipos
    // const EliminarEquipo = (id) => {
    //     setData(dataInfo.filter((equipo) => equipo.id !== id))
    // };



//  ========================================================================
    return (
        <div className="bg-colorBody">

            <h1 className="h1Color "><span className="fa fa-hard-hat ml-4 pl-4 pt-4 mr-3"></span>Maestro de equipos</h1>

            <Container className="form-register">
                <div id="d-flex align-items-start flex-column formConentTable bd-highlight mb-3" >
                    <div id="formConentTable " >

                        { // Condicional para mostros un formulaio u otro
                            editing ? (
                                <div>
                                    <EditFormulario
                                        currentEquipo={currentEquipo}
                                        setCurrentEquipo={setCurrentEquipo}
                                        updateEquipo={updateEquipo}
                                    />
                                </div>
                            ) : (
                                <div>
                                    <Formulario
                                        addEquipos={addEquipos}
                                        dataInfo={dataInfo}
                                    />
                                </div>
                            )
                        }
                    </div>
                </div>

            </Container>

            <footer className="footer mt-5 ml-5 p-4">
                <h4>Project GEAD</h4>
            </footer>

        </div>
    )
}

export default MasterEquipos;