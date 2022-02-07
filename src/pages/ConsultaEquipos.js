import React, { useEffect, useState } from "react";
import "../components/equipos/MaestroEquipos.scss";
import "../index.css";
import { v4 as uuidv4 } from "uuid";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
} from "reactstrap";
import Button from "@material-ui/core/Button";
import Axios from "axios";
import { useForm } from "react-hook-form";
import EditAddServInfo from "./components/EditAddServInfo";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import ServiceInformation from "./components/ServiceInformation";
import EditAddTechInfo from "./components/EditAddTechInfo";
import AddIcon from "@material-ui/icons/Add";
//----------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------

import PageHeader from "../components/PageHeader";
import {
  Paper,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Toolbar,
  InputAdornment,
  Grid,
  TextField,
  TableContainer,
  Table,
} from "@material-ui/core";
import useTable from "../components/useTable";
import Controls from "../components/controls/Controls";
import { Add, Delete, Edit, Search } from "@material-ui/icons";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import IconButton from "@material-ui/core/IconButton";
import SideMenu from "../components/SideMenu";
import Header from "../components/Header";

import planning from "../assets/planning.jpeg";

import { DocPDF } from "./components/DocPDF";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
// import Excel from './components/Excel';

import * as XLSX from "xlsx";
import { Excel, send } from "./components/Excel";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { Pagination } from "@material-ui/lab";

//----------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(2),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: "75%",
  },
  btnAddNew: {
    width: "13%",
  },
  tololbar: {
    justifyContent: "spacing",
  },
  fecha: {
    color: theme.palette.primary.main,
    fontWeight: "300",
    fontSize: 20,
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const headCells = [
  { id: "Name", label: "Equipment" },
  { id: "bu", label: "BU", disableSorting: true },
  { id: "pais", label: "Country", disableSorting: true },
  { id: "area", label: "Area", disableSorting: true },
  { id: "subarea", label: "Subarea", disableSorting: true },
  { id: "planta", label: "Plant", disableSorting: true },
  { id: "equipmentType", label: "Equipment Type", disableSorting: true },
  { id: "acciones", label: "Actions", disableSorting: true },
];

//----------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------

// const equipoImages = require.context('../assets/equipos/', true);

const ConsultaEquipos = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // <MasterEquipos />
  // const dataEquipos = [
  // ];

  // const [data, setData] = useState(dataEquipos);  //Hook para utilizar los datosEquipos
  const [modalEditar, setModalEditar] = useState(false); //Hook para abrir y cerrar el modalEditar
  const [modalEliminar, setModalEliminar] = useState(false); //Hook para abrir y cerrar el modal Eliminar
  const [modalInsertar, setModalInsertar] = useState(false); //Hook para abrir y cerrar el modal Insertar
  const [modalInsertarExcel, setModalInsertarExcel] = useState(false);

  // const [modalConsultaAv, setModalConsultaAv] = useState(false); //Hook para abrir y cerrar el modal Consulta Avanzada

  // ----------------   Request API consultar   --------------------------

  const [buList, setBuList] = useState([]);

  const [operationsList, setOperationsList] = useState([]);

  const [paisLis, setPaisLis] = useState([]);

  const [areaList, setAreaList] = useState([]);

  const [subareaList, setSubareaList] = useState([]);

  const [lineTypeList, setLineTypeList] = useState([]);

  const [getAllList, setGetAllList] = useState([]);

  // const [readExcel, setReadExcel] = useState([]);

  // const [ExcelGet, setExcelGet] = useState([]);

  // http://localhost:3001

  const allAquipmentRelation = async () => {
    await Axios.get(
      "https://node-gead.herokuapp.com/api/AllequipmentRelation"
    ).then((response) => {
      setGetAllList(response.data.equipment);
    });
  };

  useEffect(() => {
    allAquipmentRelation();
    // getLine();
    // getProcedencia();
    // getEquipment();
    // getServicesInfo();
    // getNewServicesInformation();
    // getTechnicalSpecification();
    // getNewTechnicalSpec();

    // Axios.get('http://localhost:3001/api/AllequipmentRelation').then((response) => {
    //     setGetAllList(response.data.equipment)
    // })
    // Axios.get('http://localhost:3001/api/readExcel')
    //     .then((response) => {
    //         setReadExcel(response.data)
    //     })

    Axios.get("https://node-gead.herokuapp.com/api/bu").then((response) => {
      setBuList(response.data.Bu);
    });

    Axios.get("https://node-gead.herokuapp.com/api/planta").then((response) => {
      setOperationsList(response.data.planta);
    });

    Axios.get("https://node-gead.herokuapp.com/api/countries").then(
      (response) => {
        setPaisLis(response.data.countries);
      }
    );

    Axios.get("https://node-gead.herokuapp.com/api/area").then((response) => {
      setAreaList(response.data.area);
    });

    Axios.get("https://node-gead.herokuapp.com/api/subArea").then(
      (response) => {
        setSubareaList(response.data.subarea);
      }
    );

    Axios.get("https://node-gead.herokuapp.com/api/lineType").then(
      (response) => {
        setLineTypeList(response.data.lineTypes);
      }
    );

    // peticionGet();
  }, []);

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(getAllList, headCells, filterFn);

  // const {
  //     TblContainer,
  //     TblHead,
  //     // TblPagination,
  //     // recordsAfterPagingAndSorting
  // } = useTable(getAllList, headCells );
  // filterFn

  // const [filterBU, setFilterBU] = useState({ fn: items => { return items; } })

  // const filtrarBU = (e, caso) => {
  //     console.log(`El caso es ${caso}`)
  //     let target = e.target;
  //     setFilterBU({
  //         fn: items => {
  //             if (target.value == "")
  //                 return items;
  //             else
  //                 return items.filter(x => x.Procedencia.areas.operations.countries.bu.Name.toLowerCase().includes(target.value.toLowerCase()) )
  //         }
  //     })
  // }

  // x.Name.toLowerCase().indexOf(target.value) > -1 ||
  // x.Procedencia.areas.operations.countries.bu.Name.toLowerCase().indexOf(target.value) > -1

  //----------------------------------------      EXCEL   -------------------------------------------
  // const peticionGet = async () => {
  //     await Axios.get('http://localhost:3001/readExcel')
  //         .then((response) => {
  //             setExcelGet(response.data)
  //         })
  // }
  //----------------------------------------      EXCEL   -------------------------------------------

  // const [equipoSeleccionado, setEquipoSeleccionado] = useState({  //Hook para controlar el equipo seleccionado
  //     Id_Equipment: '',
  //     Name: '',
  //     BU: '',
  //     country: '',
  //     planta: '',
  //     img: '',
  //     area: '',
  //     subarea: '',
  //     emplazam: '',
  //     lineNumber: '',
  //     lineType: '',
  //     technicalInformation: {
  //         EquipmentType: '',
  //         weight: '',
  //         OEM: '',
  //         currentConditions: '',
  //         descripcion: '',
  //         modelNumber: '',
  //         serialNumber: '',
  //         vendor: '',
  //         currentWorking: '',

  //         currentConditionsComments: '',
  //     },
  //     newTechInfo: [],
  //     servicesInformation: {
  //         dateOfInstallation: '',
  //         dateOfDesintallation: '',
  //         desuseReason: '',
  //         desinstallationReason: '',
  //         procurementOrder: '',
  //     },
  //     newservicesInformation: [],
  // });

  const [equipoSeleccionado, setEquipoSeleccionado] = useState({
    Id_Equipment: null,
    Name: "",
    code: "",
    img: "",
    Id_Procedencia: null,
    Estado: "",
    createdAt: "",
    updatedAt: "",
    Procedencia: {
      Id_Procedencia: null,
      Id_Line: null,
      Id_Areas: null,
      areas: {
        Id_Areas: null,
        Name: "",
        Id_Operations: null,
        operations: {
          Id_Operations: null,
          Name: "",
          Id_Countries: null,
          countries: {
            Id_Countries: null,
            Name: "",
            Id_BU: null,
            bu: {
              Id_BU: null,
              Name: "",
            },
          },
        },
        SubArea: {
          Id_SubAreas: null,
          Name: "",
          Id_Areas: null,
        },
      },
      line: {
        Id_Line: null,
        number: "",
        Id_LineTypes: null,
        lineTypes: {
          Id_LineTypes: null,
          Name: "",
        },
      },
    },
    ServicesInformation: {
      Id_ServicesInformation: null,
      DateOfInstallation: "",
      DateOfDesintallation: "",
      DesuseReason: "",
      DesinstallationReason: "",
      ProcurementOrder: "",
      Id_Equipment: null,
      newServicesInformation: [
        {
          Id_NewServInfo: null,
          Id_ServicesInformation: null,
          Name: "",
          Value: "",
          SelectNewServicesInfo: {
            Id_SelectNewServInfo: null,
            Id_ServicesInformation: null,
            Id_NewServInfo: null,
          },
        },
      ],
    },
    TechnicalSpecification: {
      Id_TechnicalSpecification: null,
      EquipmentType: "",
      CurrentConditions: "",
      Weight: "",
      OEM: "",
      Description: "",
      ModelNumber: "",
      SerialNumber: "",
      vendor: "",
      currentWorking: "",
      Id_Equipment: null,
      newTechnicalSpecification: [
        {
          Id_NewTechSpec: "",
          Id_TechnicalSpecification: "",
          Name: "",
          Value: "",
          SelectNewTechSpec: {
            Id_SelectNewTechSpec: "",
            Id_TechnicalSpecification: "",
            Id_NewTechSpec: "",
          },
        },
      ],
    },
  });

  const [servicesInformation, setServicesInformation] = useState({
    Id_ServicesInformation: "",
    DateOfInstallation: "",
    DateOfDesintallation: "",
    DesuseReason: "",
    DesinstallationReason: "",
    ProcurementOrder: "",
    Id_Equipment: "",
    newServicesInformation: [
      {
        Id_NewServInfo: "",
        Id_ServicesInformation: "",
        Name: "",
        Value: "",
        SelectNewServicesInfo: {
          Id_SelectNewServInfo: "",
          Id_ServicesInformation: "",
          Id_NewServInfo: "",
        },
      },
    ],
  });

  const [technicalInformation, setTechnicalInformation] = useState({
    //Para guardar informacion tecnica seleccionada a editar
    Id_TechnicalSpecification: "",
    EquipmentType: "",
    CurrentConditions: "",
    Weight: "",
    OEM: "",
    Description: "",
    ModelNumber: "",
    SerialNumber: "",
    vendor: "",
    currentWorking: "",
    Id_Equipment: "",
    newTechnicalSpecification: [
      {
        Id_NewTechSpec: "",
        Id_TechnicalSpecification: "",
        Name: "",
        Value: "",
        SelectNewTechSpec: {
          Id_SelectNewTechSpec: "",
          Id_TechnicalSpecification: "",
          Id_NewTechSpec: "",
        },
      },
    ],
  });

  const [areas, setareas] = useState({
    Id_Areas: "",
    Name: "",
    Id_Operations: "",
    operations: {
      Id_Operations: null,
      Name: "",
      Id_Countries: null,
      countries: {
        Id_Countries: null,
        Name: "",
        Id_BU: null,
        bu: {
          Id_BU: null,
          Name: "",
        },
      },
    },
  });

  const [operations, setOperations] = useState({
    Id_Operations: "",
    Name: "",
    Id_Countries: "",
    countries: {
      Id_Countries: null,
      Name: "",
      Id_BU: null,
      bu: { Id_BU: null, Name: "" },
    },
  });

  const [countries, setCountries] = useState({
    Id_Countries: "",
    Name: "",
    Id_BU: "",
    bu: { Id_BU: null, Name: "" },
  });

  const [bu, setBu] = useState({
    Id_BU: "",
    Name: "",
  });

  const [SubArea, setSubArea] = useState({
    Id_SubAreas: "",
    Name: "",
    Id_Areas: "",
  });

  const [line, setLine] = useState({
    Id_Line: "",
    number: "",
    Id_LineTypes: "",
  });

  const [lineTypes, setLineTypes] = useState({
    Id_LineTypes: "",
    Name: "",
  });

  // const [newTechInfoSeleccionado, setNewTechInfoSeleccionado] = useState({
  //     id: null,
  //     techincal: '',
  //     value: '',
  // })

  const seleccionarEquipo = (elemento, caso) => {
    //Funcion para editar y eliminar el quipo seleccionado
    // setnewTechicInformation({
    //     Id_NewTechSpec: null,
    //     Id_TechnicalSpecification: null,
    //     Name: '',
    //     Value: '',
    //     SelectNewTechSpec: {
    //         Id_SelectNewTechSpec: null,
    //         Id_TechnicalSpecification: null,
    //         Id_NewTechSpec: null,
    //     }
    // });
    setEditing(false);
    setTechnicalInformation(elemento.TechnicalSpecification);
    setServicesInformation(elemento.ServicesInformation);
    setareas(elemento.Procedencia.areas);

    setSubArea(elemento.Procedencia.areas.SubArea);
    setOperations(elemento.Procedencia.areas.operations);
    setCountries(elemento.Procedencia.areas.operations.countries);
    setBu(elemento.Procedencia.areas.operations.countries.bu);
    setLine(elemento.Procedencia.line);
    setLineTypes(elemento.Procedencia.line.lineTypes);

    console.log(elemento);

    setEquipoSeleccionado(elemento);

    caso === "Editar" ? setModalEditar(true) : setModalEliminar(true); //Funcion para abrir el modal
  };

  // ----------------            HANDLE CHANGE       -------------------

  const handleChange = (e) => {
    //Funcion para capturar lo que escriba el usuario
    const { name, value } = e.target;
    console.log(e.target.value);

    setEquipoSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setTechnicalInformation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangeServicesInformation = (e) => {
    const { name, value } = e.target;
    console.log(e.target.value);

    setServicesInformation((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    console.log(servicesInformation);
  };

  const handleChangeAreas = (e) => {
    const { name, value } = e.target;
    console.log(e.target.value);

    setareas((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    console.log(areas);
  };

  const handleChangeSubArea = (e) => {
    const { name, value } = e.target;
    console.log(e.target.value);

    setSubArea((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(SubArea);
  };

  const handleChangeOperations = (e) => {
    const { name, value } = e.target;
    console.log(e.target.value);

    setOperations((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(operations);
  };

  const handleChangeCountries = (e) => {
    const { name, value } = e.target;
    console.log(e.target.value);

    setCountries((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(countries);
  };

  const handleChangeBu = (e) => {
    const { name, value } = e.target;
    console.log(e.target.value);

    setBu((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(bu);
  };

  const handleChangeLine = (e) => {
    const { name, value } = e.target;
    console.log(e.target.value);

    setLine((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(line);
  };

  const handleChangeLineTypes = (e) => {
    const { name, value } = e.target;
    console.log(e.target.value);

    setLineTypes((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(lineTypes);
  };

  //******************************************************************************************************************* */

  // const [technicalInformation, setTechnicalInformation] = useState({  //Para guardar informacion tecnica seleccionada a editar
  //     EquipmentType: '', currentConditions: '', weight: '', OEM: '', descripcion: '',
  //     modelNumber: '', serialNumber: '', vendor: '', currentWorking: '',
  // });

  // const [technicalInformation, setTechnicalInformation] = useState({  //Para guardar informacion tecnica seleccionada a editar
  //     Id_TechnicalSpecification: '',
  //     Name: '',
  //     EquipmentsTechnicals: {
  //         Id_EquipmentsTechnicals: '',
  //         Id_Equipment: '',
  //         Id_TechnicalSpecification: '',
  //         Value: ''
  //     },
  //     technicalSpecificationValues: [
  //         {
  //             Id_TechnicalSpecificationValues: '',
  //             Value: '',
  //             Id_TechnicalSpecification: '',
  //             TechSespecSValue: {
  //                 Id_TSSV: '',
  //                 Id_TechnicalSpecification: '',
  //                 Id_TechnicalSpecificationValues: '',
  //                 Value: ''
  //             }
  //         }
  //     ]
  // });

  const editar = async (e) => {
    //------------- Editar los datos de la tabla en el Modal Editar -------------
    // let dataNueva = data;
    let NewEquipment = getAllList; // Para actualizar la variable flotante, la lista de equipos en la tabla

    let equipo = equipoSeleccionado; // Variable para actualizar el Api

    equipo.Name = equipoSeleccionado.Name;
    equipo.code = equipoSeleccionado.code;
    equipo.img = equipoSeleccionado.img;
    equipo.Procedencia.areas = areas;
    equipo.Procedencia.areas.SubArea = SubArea;
    equipo.Procedencia.areas.operations = operations;
    equipo.Procedencia.areas.operations.countries = countries;
    equipo.Procedencia.areas.operations.countries.bu = bu;
    equipo.Procedencia.line = line;
    equipo.Procedencia.line.lineTypes = lineTypes;
    equipo.TechnicalSpecification = technicalInformation;
    equipo.TechnicalSpecification.newTechnicalSpecification =
      equipoSeleccionado.TechnicalSpecification.newTechnicalSpecification;
    equipo.ServicesInformation = servicesInformation;
    equipo.ServicesInformation.newServicesInformation =
      equipoSeleccionado.ServicesInformation.newServicesInformation;
    equipo.Procedencia.Id_Areas = areas.Id_Areas;
    equipo.Procedencia.Id_Line = line.Id_Line;

    NewEquipment.map((equipo) => {
      if (equipo.Id_Procedencia === equipoSeleccionado.Id_Procedencia) {
        equipo.Name = equipoSeleccionado.Name;
        equipo.code = equipoSeleccionado.code;
        equipo.img = equipoSeleccionado.img;
        equipo.Procedencia.areas = areas;
        equipo.Procedencia.areas.SubArea = SubArea;
        equipo.Procedencia.areas.operations = operations;
        equipo.Procedencia.areas.operations.countries = countries;
        equipo.Procedencia.areas.operations.countries.bu = bu;
        equipo.Procedencia.line = line;
        equipo.Procedencia.line.lineTypes = lineTypes;

        equipo.TechnicalSpecification = technicalInformation;
        equipo.TechnicalSpecification.newTechnicalSpecification =
          equipoSeleccionado.TechnicalSpecification.newTechnicalSpecification;

        equipo.ServicesInformation = servicesInformation;
        equipo.ServicesInformation.newServicesInformation =
          equipoSeleccionado.ServicesInformation.newServicesInformation;

        equipo.Procedencia.Id_Areas = areas.Id_Areas;
        equipo.Procedencia.Id_Line = line.Id_Line;
      }
    });

    console.log(equipo);
    //  Actualizar datos
    await putEquipment(equipo);

    //  Actualizar todas las inforamciones tecnicas en el DB
    equipo.TechnicalSpecification.newTechnicalSpecification.map(async (NTS) => {
      await updateNewTechSpec(NTS);
    });
    //  Actualizar todas informaciones de servicios en el DB
    equipo.ServicesInformation.newServicesInformation.map(async (NSI) => {
      await updateNewServInfo(NSI);
    });

    setGetAllList(NewEquipment);
    setTechInfoEditado(false);
    setModalEditar(false);
    setEditing(false);
    setEditingTechInfo(false);
    setEditingServiceInfo(false);
  };

  //---------------------------           UPDATE EQUIPMENT - API REST         -----------------------------------
  // ------------------------------------------------------------------------------------------------------------

  const putEquipment = async (Equipo) => {
    await Axios.put(
      `https://node-gead.herokuapp.com/api/bu/${Equipo.Procedencia.areas.operations.countries.bu.Id_BU}`,
      {
        Name: Equipo.Procedencia.areas.operations.countries.bu.Name,
      }
    );

    await Axios.put(
      `https://node-gead.herokuapp.com/api/countries/${Equipo.Procedencia.areas.operations.countries.Id_Countries}`,
      {
        Name: Equipo.Procedencia.areas.operations.countries.Name,
        Id_BU: Equipo.Procedencia.areas.operations.countries.bu.Id_BU,
      }
    );

    await Axios.put(
      `https://node-gead.herokuapp.com/api/planta/${Equipo.Procedencia.areas.operations.Id_Operations}`,
      {
        Name: Equipo.Procedencia.areas.operations.Name,
        Id_Countries:
          Equipo.Procedencia.areas.operations.countries.Id_Countries,
      }
    );

    await Axios.put(
      `https://node-gead.herokuapp.com/api/area/${Equipo.Procedencia.areas.Id_Areas}`,
      {
        Name: Equipo.Procedencia.areas.Name,
        Id_Operations: Equipo.Procedencia.areas.Id_Operations,
      }
    );

    await Axios.put(
      `https://node-gead.herokuapp.com/api/SubArea/${Equipo.Procedencia.areas.SubArea.Id_SubAreas}`,
      {
        Name: Equipo.Procedencia.areas.SubArea.Name,
        Id_Areas: Equipo.Procedencia.areas.Id_Areas,
      }
    );

    await Axios.put(
      `https://node-gead.herokuapp.com/api/lineType/${Equipo.Procedencia.line.lineTypes.Id_LineTypes}`,
      {
        Name: Equipo.Procedencia.line.lineTypes.Name,
      }
    );

    await Axios.put(
      `https://node-gead.herokuapp.com/api/line/${Equipo.Procedencia.line.Id_Line}`,
      {
        number: Equipo.Procedencia.line.number,
        Id_LineTypes: Equipo.Procedencia.line.lineTypes.Id_LineTypes,
      }
    );

    await Axios.put(
      `https://node-gead.herokuapp.com/api/equipment/${Equipo.Id_Equipment}`,
      {
        Name: Equipo.Name,
        code: Equipo.code,
        img: Equipo.img,
        Id_Procedencia: Equipo.Id_Procedencia,
        Estado: Equipo.Estado,
      }
    );

    await Axios.put(
      `https://node-gead.herokuapp.com/api/servicesInformation/${Equipo.ServicesInformation.Id_ServicesInformation}`,
      {
        DateOfInstallation: Equipo.ServicesInformation.DateOfInstallation,
        DateOfDesintallation: Equipo.ServicesInformation.DateOfDesintallation,
        DesuseReason: Equipo.ServicesInformation.DesuseReason,
        DesinstallationReason: Equipo.ServicesInformation.DesinstallationReason,
        ProcurementOrder: Equipo.ServicesInformation.ProcurementOrder,
        Id_Equipment: Equipo.Id_Equipment,
      }
    );

    await Axios.put(
      `https://node-gead.herokuapp.com/api/technicalSpecification/${Equipo.TechnicalSpecification.Id_TechnicalSpecification}`,
      {
        EquipmentType: Equipo.TechnicalSpecification.EquipmentType,
        CurrentConditions: Equipo.TechnicalSpecification.CurrentConditions,
        Weight: Equipo.TechnicalSpecification.Weight,
        OEM: Equipo.TechnicalSpecification.OEM,
        Description: Equipo.TechnicalSpecification.Description,
        ModelNumber: Equipo.TechnicalSpecification.ModelNumber,
        SerialNumber: Equipo.TechnicalSpecification.SerialNumber,
        vendor: Equipo.TechnicalSpecification.vendor,
        currentWorking: Equipo.TechnicalSpecification.currentWorking,
        Id_Equipment: Equipo.Id_Equipment,
      }
    ).then(() => {
      alert("Successful Updated");
    });
  };

  const updateNewServInfo = async (NSI) => {
    Axios.put(
      `https://node-gead.herokuapp.com/api/newServInfo/${NSI.Id_NewServInfo}`,
      {
        Id_ServicesInformation: NSI.Id_ServicesInformation,
        Value: NSI.Value,
        Name: NSI.Name,
      }
    );
  };

  const updateNewTechSpec = async (NTS) => {
    Axios.put(
      `https://node-gead.herokuapp.com/api/NewTechInfo/${NTS.Id_NewTechSpec}`,
      {
        Id_TechnicalSpecification: NTS.Id_TechnicalSpecification,
        Name: NTS.Name,
        Value: NTS.Value,
      }
    );
  };

  //------------------        ELIMINAR EQUIPO     ---------------------------------

  //Filtramos todos los datos que no contengan el Id seleccionado, dejamos fuera el no seleccionado y guardamos los demas
  const eliminar = () => {
    // setData(data.filter((equipo) => equipo.id !== equipoSeleccionado.id));

    const equipo = equipoSeleccionado;
    equipo.Estado = false;

    setGetAllList(
      getAllList.filter(
        (equipo) => equipo.Id_Equipment !== equipoSeleccionado.Id_Equipment
      )
    );

    EliminarEquipment(equipo);
    setModalEliminar(false);
  };

  const EliminarEquipment = async (Equipo) => {
    await Axios.put(
      `https://node-gead.herokuapp.com/api/equipment/${Equipo.Id_Equipment}`,
      {
        Name: Equipo.Name,
        code: Equipo.code,
        img: Equipo.img,
        Id_Procedencia: Equipo.Id_Procedencia,
        Estado: Equipo.Estado,
      }
    );
  };

  const abrirModalInsertar = () => {
    setTechInfoEditado({ id: null, technical: "", value: "" });

    setEquipoSeleccionado({
      //Hook para controlar el equipo seleccionado
      Id_Equipment: null,
      Name: "",
      code: "",
      img: "",
      Id_Procedencia: null,
      Estado: null,
      createdAt: null,
      updatedAt: null,
      Procedencia: {
        Id_Procedencia: null,
        Id_Line: null,
        Id_Areas: null,
        areas: {
          Id_Areas: null,
          Name: "",
          Id_Operations: null,
          operations: {
            Id_Operations: null,
            Name: "",
            Id_Countries: null,
            countries: {
              Id_Countries: null,
              Name: "",
              Id_BU: null,
              bu: { Id_BU: null, Name: "" },
            },
          },
          SubArea: { Id_SubAreas: null, Name: "", Id_Areas: null },
        },
        line: {
          Id_Line: null,
          number: "",
          Id_LineTypes: null,
          lineTypes: { Id_LineTypes: null, Name: "" },
        },
      },
      ServicesInformation: {
        Id_ServicesInformation: null,
        DateOfInstallation: "",
        DateOfDesintallation: "",
        DesuseReason: "",
        DesinstallationReason: "",
        ProcurementOrder: "",
        Id_Equipment: "",
        newServicesInformation: [],
      },
      TechnicalSpecification: {
        Id_TechnicalSpecification: null,
        EquipmentType: "",
        CurrentConditions: "",
        Weight: "",
        OEM: "",
        Description: "",
        ModelNumber: "",
        SerialNumber: "",
        vendor: "",
        currentWorking: "",
        Id_Equipment: null,
        newTechnicalSpecification: [],
      },
    });

    setServicesInformation({
      Id_ServicesInformation: "",
      DateOfInstallation: "",
      DateOfDesintallation: "",
      DesuseReason: "",
      DesinstallationReason: "",
      ProcurementOrder: "",
      Id_Equipment: "",
      newServicesInformation: [
        {
          Id_NewServInfo: "",
          Id_ServicesInformation: "",
          Name: "",
          Value: "",
          SelectNewServicesInfo: {
            Id_SelectNewServInfo: "",
            Id_ServicesInformation: "",
            Id_NewServInfo: "",
          },
        },
      ],
    });

    setTechnicalInformation({
      //Para guardar informacion tecnica seleccionada a editar
      Id_TechnicalSpecification: null,
      EquipmentType: "",
      CurrentConditions: "",
      Weight: "",
      OEM: "",
      Description: "",
      ModelNumber: "",
      SerialNumber: "",
      vendor: "",
      currentWorking: "",
      Id_Equipment: "",
      newTechnicalSpecification: [
        {
          Id_NewTechSpec: "",
          Id_TechnicalSpecification: "",
          Name: "",
          Value: "",
          SelectNewTechSpec: {
            Id_SelectNewTechSpec: "",
            Id_TechnicalSpecification: "",
            Id_NewTechSpec: "",
          },
        },
      ],
    });
    setLine({
      Id_Line: null,
      number: "",
      Id_LineTypes: "",
    });
    setnewTechicInformation({
      Id_NewTechSpec: null,
      Id_TechnicalSpecification: null,
      Name: "",
      Value: "",
      SelectNewTechSpec: {
        Id_SelectNewTechSpec: null,
        Id_TechnicalSpecification: null,
        Id_NewTechSpec: null,
      },
    });

    setnewservInformation({
      Id_NewServInfo: null,
      Id_ServicesInformation: null,
      Name: "",
      Value: "",
      SelectNewServicesInfo: {
        Id_SelectNewServInfo: null,
        Id_ServicesInformation: null,
        Id_NewServInfo: null,
      },
    });
    seteditingNewServInfo(false);
    setModalInsertar(true);
  };

  // const arbirModalConsultaAv = () => {
  //     setModalConsultaAv(true);
  // }

  //  ----------------------------------     insertar    -----------------------------
  const insertar = async () => {
    let valorInsertar = equipoSeleccionado; //Variable auxiliar para modificar el equipo seleccionado

    bu.Id_BU = uuidv4();

    countries.Id_Countries = uuidv4();
    countries.Id_BU = bu.Id_BU;

    operations.Id_Operations = uuidv4();
    operations.Id_Countries = countries.Id_Countries;

    areas.Id_Areas = uuidv4();
    areas.Id_Operations = operations.Id_Operations;

    SubArea.Id_SubAreas = uuidv4();
    SubArea.Id_Areas = areas.Id_Areas;

    lineTypes.Id_LineTypes = uuidv4();

    line.Id_Line = uuidv4();
    line.Id_LineTypes = lineTypes.Id_LineTypes;

    technicalInformation.Id_TechnicalSpecification = uuidv4();

    servicesInformation.Id_ServicesInformation = uuidv4();
    valorInsertar.Procedencia.Id_Procedencia = uuidv4();
    valorInsertar.Procedencia.Id_Line = line.Id_Line;
    valorInsertar.Procedencia.Id_Areas = areas.Id_Areas;

    valorInsertar.Id_Equipment = uuidv4();
    valorInsertar.Id_Procedencia = valorInsertar.Procedencia.Id_Procedencia;

    valorInsertar.Name = equipoSeleccionado.Name;
    valorInsertar.code = equipoSeleccionado.code;
    valorInsertar.img = equipoSeleccionado.img;
    valorInsertar.Estado = true;

    valorInsertar.TechnicalSpecification = technicalInformation;

    let nt = newTechicInformation;

    const newTechicInformationAll =
      nt.Id_NewTechSpec === null
        ? []
        : nt.map((NTS) => {
            return (NTS = {
              Id_NewTechSpec: NTS.Id_NewTechSpec,
              Id_TechnicalSpecification:
                technicalInformation.Id_TechnicalSpecification,
              Name: NTS.Name,
              Value: NTS.Value,
              SelectNewTechSpec: {
                Id_SelectNewTechSpec:
                  NTS.SelectNewTechSpec.Id_SelectNewTechSpec,
                Id_TechnicalSpecification:
                  technicalInformation.Id_TechnicalSpecification,
                Id_NewTechSpec: NTS.SelectNewTechSpec.Id_NewTechSpec,
              },
            });
          });

    valorInsertar.TechnicalSpecification.newTechnicalSpecification =
      newTechicInformationAll;
    valorInsertar.ServicesInformation = servicesInformation;

    let ns = newservInformation;

    const newservInformationAll =
      ns.Id_NewServInfo === null
        ? []
        : ns.map((NSI) => {
            return (NSI = {
              Id_NewServInfo: NSI.Id_NewServInfo,
              Id_ServicesInformation:
                servicesInformation.Id_ServicesInformation,
              Name: NSI.Name,
              Value: NSI.Value,
              SelectNewServicesInfo: {
                Id_SelectNewServInfo:
                  NSI.SelectNewServicesInfo.Id_SelectNewServInfo,
                Id_ServicesInformation:
                  servicesInformation.Id_ServicesInformation,
                Id_NewServInfo: NSI.SelectNewServicesInfo.Id_NewServInfo,
              },
            });
          });

    valorInsertar.ServicesInformation.newServicesInformation =
      newservInformationAll;
    valorInsertar.Procedencia.areas = areas;
    valorInsertar.Procedencia.areas.SubArea = SubArea;
    valorInsertar.Procedencia.areas.operations = operations;
    valorInsertar.Procedencia.areas.operations.countries = countries;
    valorInsertar.Procedencia.areas.operations.countries.bu = bu;
    valorInsertar.Procedencia.line = line;
    valorInsertar.Procedencia.line.lineTypes = lineTypes;

    setGetAllList([...getAllList, valorInsertar]); //Agregamos la dataNueva al estado.

    await sendData(valorInsertar);

    setModalInsertar(false);
    seteditingNewServInfo(true);
    setTechInfoEditado(false);
    setModalEditar(false);
    setEditing(false);
    setEditingTechInfo(false);
    setEditingServiceInfo(false);
  };

  const sendData = async (valorInsertar) => {
    await sendBu(valorInsertar);
    await sendCountry(valorInsertar);
    await sendOperations(valorInsertar);
    await sendAreas(valorInsertar);
    await sendSubArea(valorInsertar);
    await sendlineType(valorInsertar);
    await sendline(valorInsertar);
    await sendProcedencia(valorInsertar);
    await sendEquipment(valorInsertar); // Equipment
    await sendSercivesInformation(valorInsertar); // Services Information
    await sendNewServicesInformation(valorInsertar);
    await sendTechnicalSpecification(valorInsertar); //Technical Specification
    await sendNewTechnicalSpec(valorInsertar);
  };

  // -----------------------------        CREAR / INSERTAR NUEVO EQUIPO      ---------------------------------------------

  const sendBu = async (valorInsertar) => {
    await Axios.post("https://node-gead.herokuapp.com/api/bu", {
      Id_BU: valorInsertar.Procedencia.areas.operations.countries.bu.Id_BU,
      Name: valorInsertar.Procedencia.areas.operations.countries.bu.Name,
    });
    // .then(() => {
    //     alert("Successful insert");
    // });
  };

  const sendCountry = async (valorInsertar) => {
    await Axios.post("https://node-gead.herokuapp.com/api/countries", {
      Id_Countries:
        valorInsertar.Procedencia.areas.operations.countries.Id_Countries,
      Name: valorInsertar.Procedencia.areas.operations.countries.Name,
      Id_BU: valorInsertar.Procedencia.areas.operations.countries.Id_BU,
    });
  };

  const sendOperations = async (valorInsertar) => {
    await Axios.post("https://node-gead.herokuapp.com/api/planta", {
      Id_Operations: valorInsertar.Procedencia.areas.operations.Id_Operations,
      Name: valorInsertar.Procedencia.areas.operations.Name,
      Id_Countries: valorInsertar.Procedencia.areas.operations.Id_Countries,
    });
  };

  const sendAreas = async (valorInsertar) => {
    await Axios.post("https://node-gead.herokuapp.com/api/area", {
      Id_Areas: valorInsertar.Procedencia.areas.Id_Areas,
      Name: valorInsertar.Procedencia.areas.Name,
      Id_Operations: valorInsertar.Procedencia.areas.Id_Operations,
    });
  };

  const sendSubArea = async (valorInsertar) => {
    await Axios.post("https://node-gead.herokuapp.com/api/SubArea", {
      Id_SubAreas: valorInsertar.Procedencia.areas.SubArea.Id_SubAreas,
      Name: valorInsertar.Procedencia.areas.SubArea.Name,
      Id_Areas: valorInsertar.Procedencia.areas.SubArea.Id_Areas,
    });
  };

  const sendline = async (valorInsertar) => {
    await Axios.post("https://node-gead.herokuapp.com/api/line", {
      Id_Line: valorInsertar.Procedencia.line.Id_Line,
      number: valorInsertar.Procedencia.line.number,
      Id_LineTypes: valorInsertar.Procedencia.line.Id_LineTypes,
    });
  };

  const sendlineType = async (valorInsertar) => {
    await Axios.post("https://node-gead.herokuapp.com/api/lineType", {
      Id_LineTypes: valorInsertar.Procedencia.line.lineTypes.Id_LineTypes,
      Name: valorInsertar.Procedencia.line.lineTypes.Name,
    });
  };

  const sendProcedencia = async (valorInsertar) => {
    await Axios.post("https://node-gead.herokuapp.com/api/procedencia", {
      Id_Procedencia: valorInsertar.Id_Procedencia,
      Id_Line: valorInsertar.Procedencia.line.Id_Line,
      Id_Areas: valorInsertar.Procedencia.areas.Id_Areas,
    });
  };

  const sendEquipment = async (valorInsertar) => {
    await Axios.post("https://node-gead.herokuapp.com/api/equipment", {
      Id_Equipment: valorInsertar.Id_Equipment,
      Name: valorInsertar.Name,
      code: valorInsertar.code,
      Id_Procedencia: valorInsertar.Procedencia.Id_Procedencia,
      Estado: valorInsertar.Estado,
      img: valorInsertar.img,
    });
  };

  const sendSercivesInformation = async (valorInsertar) => {
    await Axios.post(
      "https://node-gead.herokuapp.com/api/servicesInformation",
      {
        Id_ServicesInformation:
          valorInsertar.ServicesInformation.Id_ServicesInformation,
        DateOfInstallation:
          valorInsertar.ServicesInformation.DateOfInstallation,
        DateOfDesintallation:
          valorInsertar.ServicesInformation.DateOfDesintallation,
        DesuseReason: valorInsertar.ServicesInformation.DesuseReason,
        DesinstallationReason:
          valorInsertar.ServicesInformation.DesinstallationReason,
        ProcurementOrder: valorInsertar.ServicesInformation.ProcurementOrder,
        Id_Equipment: valorInsertar.Id_Equipment,
      }
    );
  };

  const sendNewServicesInformation = async (valorInsertar) => {
    valorInsertar.ServicesInformation.newServicesInformation.map(
      async (NSI) => {
        await Axios.post("https://node-gead.herokuapp.com/api/newServInfo", {
          Id_NewServInfo: NSI.Id_NewServInfo,
          Id_ServicesInformation:
            valorInsertar.ServicesInformation.Id_ServicesInformation,
          Name: NSI.Name,
          Value: NSI.Value,
        });

        await Axios.post(
          "https://node-gead.herokuapp.com/api/selectNewServInfo",
          {
            Id_SelectNewServInfo:
              NSI.SelectNewServicesInfo.Id_SelectNewServInfo,
            Id_ServicesInformation:
              valorInsertar.ServicesInformation.Id_ServicesInformation,
            Id_NewServInfo: NSI.Id_NewServInfo,
          }
        );
      }
    );
  };

  const sendTechnicalSpecification = async (valorInsertar) => {
    await Axios.post(
      "https://node-gead.herokuapp.com/api/technicalSpecification",
      {
        Id_TechnicalSpecification:
          valorInsertar.TechnicalSpecification.Id_TechnicalSpecification,
        EquipmentType: valorInsertar.TechnicalSpecification.EquipmentType,
        CurrentConditions:
          valorInsertar.TechnicalSpecification.CurrentConditions,
        Weight: valorInsertar.TechnicalSpecification.Weight,
        OEM: valorInsertar.TechnicalSpecification.OEM,
        Description: valorInsertar.TechnicalSpecification.Description,
        ModelNumber: valorInsertar.TechnicalSpecification.ModelNumber,
        SerialNumber: valorInsertar.TechnicalSpecification.SerialNumber,
        vendor: valorInsertar.TechnicalSpecification.vendor,
        currentWorking: valorInsertar.TechnicalSpecification.currentWorking,
        Id_Equipment: valorInsertar.Id_Equipment,
      }
    );
  };

  const sendNewTechnicalSpec = async (valorInsertar) => {
    valorInsertar.TechnicalSpecification.newTechnicalSpecification.map(
      async (NTS) => {
        await Axios.post("https://node-gead.herokuapp.com/api/NewTechInfo", {
          Id_NewTechSpec: NTS.Id_NewTechSpec,
          Id_TechnicalSpecification:
            valorInsertar.TechnicalSpecification.Id_TechnicalSpecification,
          Name: NTS.Name,
          Value: NTS.Value,
        });

        await Axios.post(
          "https://node-gead.herokuapp.com/api/selectNewTechSpec",
          {
            Id_SelectNewTechSpec: NTS.SelectNewTechSpec.Id_SelectNewTechSpec,
            Id_TechnicalSpecification:
              valorInsertar.TechnicalSpecification.Id_TechnicalSpecification,
            Id_NewTechSpec: NTS.Id_NewTechSpec,
          }
        );
      }
    );
  };

  // ------------------------------       ADD NEW TECHINICAL INFORMATION       ---------------------------
  const [newTechicInformation, setnewTechicInformation] = useState([]);
  const [newservInformation, setnewservInformation] = useState([]);

  const onSubmit = (data, e) => {
    data.Id_NewTechSpec = uuidv4();

    const newTechnicalSpec = {
      Id_NewTechSpec: data.Id_NewTechSpec,
      Id_TechnicalSpecification: null,
      Name: data.Name,
      Value: data.Value,
      SelectNewTechSpec: {
        Id_SelectNewTechSpec: uuidv4(),
        Id_TechnicalSpecification: "",
        Id_NewTechSpec: data.Id_NewTechSpec,
      },
    };

    let newTechnicalSpecification =
      equipoSeleccionado.TechnicalSpecification.newTechnicalSpecification;
    newTechnicalSpecification.push(newTechnicalSpec);

    setnewTechicInformation(newTechnicalSpecification);
    e.target.reset();
  };

  // ------------------------------       ADD NEW TECHINICAL INFORMATION EN MODAL EDITAR      ---------------------------

  const onSubmitTechSpech = async (data, e) => {
    data.Id_NewTechSpec = uuidv4();

    const newTechnicalSpec = {
      Id_NewTechSpec: data.Id_NewTechSpec,
      Id_TechnicalSpecification:
        equipoSeleccionado.TechnicalSpecification.Id_TechnicalSpecification,
      Name: data.Name,
      Value: data.Value,
      SelectNewTechSpec: {
        Id_SelectNewTechSpec: uuidv4(),
        Id_TechnicalSpecification:
          equipoSeleccionado.TechnicalSpecification.Id_TechnicalSpecification,
        Id_NewTechSpec: data.Id_NewTechSpec,
      },
    };

    let newTechnicalSpecification =
      equipoSeleccionado.TechnicalSpecification.newTechnicalSpecification;
    newTechnicalSpecification.unshift(newTechnicalSpec);

    console.log(newTechnicalSpec);

    await sendNewTechnicalSpecEDITMODAL(newTechnicalSpec);
    e.target.reset();
  };

  const sendNewTechnicalSpecEDITMODAL = async (valorInsertar) => {
    console.log("valorInsertar NewTech");
    console.log(valorInsertar);

    await Axios.post("https://node-gead.herokuapp.com/api/NewTechInfo", {
      Id_NewTechSpec: valorInsertar.Id_NewTechSpec,
      Id_TechnicalSpecification: valorInsertar.Id_TechnicalSpecification,
      Name: valorInsertar.Name,
      Value: valorInsertar.Value,
    });

    await Axios.post("https://node-gead.herokuapp.com/api/selectNewTechSpec", {
      Id_SelectNewTechSpec:
        valorInsertar.SelectNewTechSpec.Id_SelectNewTechSpec,
      Id_TechnicalSpecification: valorInsertar.Id_TechnicalSpecification,
      Id_NewTechSpec: valorInsertar.Id_NewTechSpec,
    });
  };
  // ------------------------------       ADD NEW TECHINICAL INFORMATION EN MODAL EDITAR      ---------------------------
  // ---------------------------------------------------------------------------------------------------------------------
  // ---------------------------------------------------------------------------------------------------------------------

  //  -------------------------------------------------------     ELIMINAR AD TECHNICAL INFO       --------------------------

  const eliminarAddTechInfo = async (id) => {
    console.log(id);

    let indice =
      equipoSeleccionado.TechnicalSpecification.newTechnicalSpecification.findIndex(
        (equipo) => {
          return equipo.Id_NewTechSpec === id;
        }
      );

    const idSelectNewTechSpec =
      equipoSeleccionado.TechnicalSpecification.newTechnicalSpecification.find(
        (nts) => nts.Id_NewTechSpec === id
      );
    const idSelectNewTech =
      idSelectNewTechSpec.SelectNewTechSpec.Id_SelectNewTechSpec;

    let newTechnicalSpecification =
      equipoSeleccionado.TechnicalSpecification.newTechnicalSpecification;
    newTechnicalSpecification.splice(indice, 1);

    await deleteNewTechnicalSpec(id, idSelectNewTech);

    setEditingTechInfo(false);
    setEditingTechInfo(true);
  };

  const deleteNewTechnicalSpec = async (id, idSelectNewTech) => {
    await Axios.delete(
      `https://node-gead.herokuapp.com/api/selectNewTechSpec/${idSelectNewTech}`
    );
    // .then((id) => {
    //     console.log(idSelectNewTech)
    //     alert("SelectNewTech Deleted");
    // });

    await Axios.delete(
      `https://node-gead.herokuapp.com/api/NewTechInfo/${id}`
    ).then((id) => {
      console.log(id);
      alert("successfully removed");
    });
  };

  const [prueba, setPrueba] = useState(null);

  const update = (equipo) => {
    //  Elimina New Services Information
    setEquipoSeleccionado(equipo);
    setPrueba(1);
  };

  // -------------------------------------------------------------

  const [editing, setEditing] = useState(false);
  const [editingTechInfo, setEditingTechInfo] = useState(false); //Mostrar un formulario u otro
  const [editingServiceInfo, setEditingServiceInfo] = useState(false);

  // -------------------------------------------------------------

  const [techInfoEditado, setTechInfoEditado] = useState({
    //Para guardar informacion tecnica seleccionada a editar
    Id_NewServInfo: null,
    Id_ServicesInformation: null,
    Name: "",
    Value: "",
  });

  const [technicalSpecEditado, setTechnicalSpecEditado] = useState({
    //Para guardar informacion tecnica seleccionada a editar
    Id_NewTechSpec: null,
    Id_TechnicalSpecification: null,
    Name: "",
    Value: "",
  });

  const [filaEditada, setfilaEditada] = useState(false); // Para dar efecto a la fila editada

  const editarTechSpec = (elemento, caso) => {
    setId(null);
    setfilaEditada(true);
    editRow(elemento, caso);
  };

  const editRow = (techInfo, caso) => {
    //Capturar informacion tecnica seleccionada en variable
    setEditingTechInfo(true);

    caso === "technical"
      ? setTechnicalSpecEditado({
          Id_NewTechSpec: techInfo.Id_NewTechSpec,
          Id_TechnicalSpecification: techInfo.Id_TechnicalSpecification,
          Name: techInfo.Name,
          Value: techInfo.Value,
        })
      : setTechInfoEditado({
          Id_NewServInfo: techInfo.Id_NewServInfo,
          Id_ServicesInformation: techInfo.Id_ServicesInformation,
          Name: techInfo.Name,
          Value: techInfo.Value,
        });
  };

  // --------------------        ACTUALIZAR NEW SERVICES INFORMATION     -------------------------

  const [id, setId] = useState(null); //Para seleccionar la fila editada y dar efecto

  const updateAddServInfo = async (id, updatedTechInfo, e) => {
    //Editar o actualizar informacion tecnica seleccionada
    setEditingTechInfo(false);

    let NewEquipment = equipoSeleccionado;

    NewEquipment.ServicesInformation.newServicesInformation.map((NSI) => {
      if (NSI.Id_NewServInfo === id) {
        NSI.Name = updatedTechInfo.Name;
        NSI.Value = updatedTechInfo.Value;
      }
    });

    setEquipoSeleccionado(NewEquipment);
    setId(updatedTechInfo.Id_NewServInfo); //Para seleccionar la fila editada y dar efecto
  };

  // --------------------------       ACTUALIZAR NEW TECHNICAL SPECIFICATION      ----------------------------------

  const updateAddTechInfo = async (id, updatedTechInfo, e) => {
    //Editar o actualizar informacion tecnica seleccionada
    setEditingTechInfo(false);
    let NewEquipment = equipoSeleccionado;

    NewEquipment.TechnicalSpecification.newTechnicalSpecification.map((NSI) => {
      if (NSI.Id_NewTechSpec === id) {
        NSI.Name = updatedTechInfo.Name;
        NSI.Value = updatedTechInfo.Value;
      }
    });

    setEquipoSeleccionado(NewEquipment);
    setId(updatedTechInfo.Id_NewTechSpec); //Para seleccionar la fila editada y dar efecto
  };

  // ------------------          Subir imagen        -----------------------

  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "preset_Gead");
    setLoading(true);
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dikwnsuwc/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();

    let imag = null;
    imag = file.secure_url;

    setImage(file.secure_url);

    let nuevoEquipoSelect = equipoSeleccionado;
    nuevoEquipoSelect.img = imag;

    setEquipoSeleccionado(nuevoEquipoSelect);
    setLoading(false);
  };

  const [editingNewServInfo, seteditingNewServInfo] = useState(true);

  //--------------------------------------------------------------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------------------------

  const classes = useStyles();
  // const [records, setRecords] = useState(getAllList)
  // const [age, setAge] = useState('')

  // const lineTypesSelect = [
  //     { label: 'Brewline' },
  //     { label: 'Bottle' },
  //     { label: 'Can' },
  //     { label: 'Pet' },
  //     { label: 'Keg' },
  //     { label: 'Special Keg' },
  // ];

  const [fecha, setFecha] = useState("");

  useEffect(() => {
    let h = new Date();

    // let dia = h.getDate();
    // let mes = h.getMonth() + 1;

    let diaa = h.getUTCDate();
    let Month = h.getUTCMonth() + 1;
    let agnio = h.getUTCFullYear();

    // let anio = h.getFullYear();

    // dia = ('0' + diaa).slice(-2);
    // dia = ('0' + Month).slice(-2);
    setFecha(`${diaa}/${Month}/${agnio}`);
  }, []);

  const [casoServInfo, setCasoServInfo] = useState("Edit");

  const [List, setList] = useState([]);
  const [contador, setContador] = useState(0);

  const [listAll, setListAll] = useState([]);

  const filtrarBUList = async (bu, n, setCont) => {
    const list = getAllList;

    let counter = 0;

    if (contador === 0) {
      setList(list);
      setGetAllList(
        getAllList.filter(
          (equipo) =>
            equipo.Procedencia.areas.operations.countries.bu.Name === bu
        )
      );
      setContador(++counter);
    } else {
      setGetAllList(
        List.filter(
          (equipo) =>
            equipo.Procedencia.areas.operations.countries.bu.Name === bu
        )
      );
    }

    if (n === "total") {
      setGetAllList(List);
      console.log(getAllList);
      // allAquipmentRelation()
      // setListAll(List.length)
    }
  };

  const [totalEncontrados, setTotalEncontrados] = useState(getAllList.length);

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value === "") return items;
        else
          return items.filter(
            (x) =>
              x.Name.toLowerCase().includes(target.value.toLowerCase()) ||
              x.Procedencia.areas.operations.countries.bu.Name.toLowerCase().includes(
                target.value.toLowerCase()
              ) ||
              x.Procedencia.areas.operations.countries.Name.toLowerCase().includes(
                target.value.toLowerCase()
              ) ||
              x.Procedencia.areas.Name.toLowerCase().includes(
                target.value.toLowerCase()
              ) ||
              x.Procedencia.areas.SubArea.Name.toLowerCase().includes(
                target.value.toLowerCase()
              ) ||
              x.Procedencia.areas.operations.Name.toLowerCase().includes(
                target.value.toLowerCase()
              ) ||
              x.Procedencia.line.lineTypes.Name.toLowerCase().includes(
                target.value.toLowerCase()
              )
          );
      },
    });

    let TotalEncontrado = filterFn.fn(getAllList).length;
    setTotalEncontrados(TotalEncontrado);
    console.log(TotalEncontrado);
    console.log(TotalEncontrado);
  };

  //  ------------------------    PDF     ----------------------------------

  const [descargarPdf, setdescargarPdf] = useState(false);

  //  ------------------------    EXCEL   ----------------------------------

  const [item, setItem] = useState([]);

  const readExcels = (file) => {
    setItem([]);

    const promise =
      file === undefined
        ? "undefined"
        : new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);

            fileReader.onload = (e) => {
              const bufferArray = e.target.result;

              const workbook = XLSX.read(bufferArray, { type: "buffer" });

              const workbookSheetsName = workbook.SheetNames[0];

              const workbookSheet = workbook.Sheets[workbookSheetsName];

              const data = XLSX.utils.sheet_to_json(workbookSheet);

              const jData = [];
              for (let i = 0; i < data.length; i++) {
                const dato = data[i];

                jData.push({
                  ...dato,
                  Date_of_Installation: formatearFechaExcel(
                    dato.Date_of_Installation
                  ),
                  Date_of_Desintallation: formatearFechaExcel(
                    dato.Date_of_Desintallation
                  ),
                });
              }

              resolve(jData);
            };
            fileReader.onerror = (error) => {
              reject(error);
            };
          });

    promise === "undefined"
      ? console.log("undefined")
      : promise.then((d) => {
          setItem(d);
          setModalInsertarExcel(true);
        });

    // const promise = new Promise((resolve, reject) => {

    //         const fileReader = new FileReader();
    //         fileReader.readAsArrayBuffer(file)

    //         fileReader.onload = (e) => {
    //             const bufferArray = e.target.result;

    //             const workbook = XLSX.read(bufferArray, { type: 'buffer' });

    //             const workbookSheetsName = workbook.SheetNames[0];

    //             const workbookSheet = workbook.Sheets[workbookSheetsName];

    //             const data = XLSX.utils.sheet_to_json(workbookSheet);

    //             const jData = [];
    //             for (let i = 0; i < data.length; i++) {
    //                 const dato = data[i];

    //                 jData.push({
    //                     ...dato,
    //                     Date_of_Installation: formatearFechaExcel(dato.Date_of_Installation),
    //                     Date_of_Desintallation: formatearFechaExcel(dato.Date_of_Desintallation)
    //                 });
    //             }

    //             resolve(jData);
    //         };

    //         fileReader.onerror = ((error) => {
    //             reject(error);
    //         });

    //         // setEditTableExcel(true);
    //     });

    // promise.then((d) => {
    //     setItem(d)
    // })
  };

  function formatearFechaExcel(fechaExcel) {
    const diasUTC = Math.floor(fechaExcel - 25569);
    const valorUTC = diasUTC * 86400;
    let infoFecha = new Date(valorUTC * 1000);

    const diaFraccionado = fechaExcel - Math.floor(fechaExcel) + 0.0000001;
    let totalSegundosDia = Math.floor(86400 * diaFraccionado);
    const segundos = totalSegundosDia % 60;
    totalSegundosDia -= segundos;

    const horas = Math.floor(totalSegundosDia / (60 * 60));
    const minutos = Math.floor(totalSegundosDia / 60) % 60;

    // Convertidos a 2 dígitos
    infoFecha.setDate(infoFecha.getDate() + 1);
    const dia = ("0" + infoFecha.getDate()).slice(-2);
    const mes = ("0" + (infoFecha.getMonth() + 1)).slice(-2);
    const anio = infoFecha.getFullYear();

    const fecha = `${dia}/${mes}/${anio}`;

    return fecha;
  }

  const [pruebaExcel, setpruebaExcel] = useState([]);

  const actualizarTabla = (Excel) => {
    Excel.map((Equipo) => {
      setGetAllList([...getAllList, Equipo]);
      // console.log(Equipo)
    });
  };

  return (
    <div>
      {/* <PageHeader
                title="Consulta de Equipos"
                subTitle="Middle America"
            // subTitle="Form design with validation"
            // icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
            /> */}

      <SideMenu
        getAllList={getAllList}
        filtrarBUList={filtrarBUList}
        listAll={listAll}
        setListAll={setListAll}
      />
      <Header />

      <Paper className={classes.pageContent}>
        {/* <EmployeeForm /> */}
        <Toolbar>
          <Controls.txt
            label="Search Equipment"
            id="outlined-basic"
            className={classes.searchInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
          />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Controls.Button
            variant="outlined"
            size={"large"}
            color={"primary"}
            className={classes.btnAddNew}
            startIcon={<Add style={{ fontSize: 34, fontWeight: "800" }} />}
            onClick={() => abrirModalInsertar()}
            style={{ fontSize: 20, fontWeight: "600" }}
            text={"Add New"}
          ></Controls.Button>
          {/* -----------------------  Boton para insertar datos desde Excel   ----------------------------------- */}
          <div id="imagen">
            <input
              id="icon-button-file"
              type="file"
              style={{ display: "none" }}
              onChange={(e) => {
                setItem([]);
                setModalInsertarExcel(false);
                let file = e.target.files[0];

                readExcels(file);
                file = null;
              }}
            />

            <label htmlFor="icon-button-file">
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <Add style={{ fontSize: 34, fontWeight: "800" }} />
              </IconButton>
            </label>
          </div>
        </Toolbar>

        <TableContainer>
          <Table aria-label="simple table">
            <TblHead />
            <TableBody>
              {recordsAfterPagingAndSorting().map((item) => (
                <StyledTableRow key={item.Id_Equipment}>
                  <StyledTableCell style={{ fontWeight: "600" }}>
                    {item.Name}
                  </StyledTableCell>
                  <TableCell>
                    {item.Procedencia.areas.operations.countries.bu.Name}
                  </TableCell>
                  <TableCell>
                    {item.Procedencia.areas.operations.countries.Name}
                  </TableCell>
                  <TableCell>{item.Procedencia.areas.Name}</TableCell>
                  <TableCell>{item.Procedencia.areas.SubArea.Name}</TableCell>
                  <TableCell>
                    {item.Procedencia.areas.operations.Name}
                  </TableCell>
                  <TableCell>
                    {item.TechnicalSpecification.EquipmentType}
                  </TableCell>

                  {/* <TableCell>{item.Procedencia.line.lineTypes.Name}</TableCell>   */}

                  <TableCell>
                    <label htmlFor="icon-button-file">
                      <IconButton
                        color="primary"
                        aria-label="edit"
                        onClick={() => seleccionarEquipo(item, "Editar")}
                        component="span"
                      >
                        <Edit />
                      </IconButton>
                    </label>
                    &nbsp;&nbsp;
                    <label htmlFor="icon-button-file">
                      <IconButton
                        color="secondary"
                        aria-label="edit"
                        onClick={() => seleccionarEquipo(item, "Eliminar")}
                        component="span"
                      >
                        <Delete />
                      </IconButton>
                    </label>
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
          <Toolbar>
            <PageHeader
              contador={`${totalEncontrados} results`}
              style={{ fontSize: 12 }}
            />

            {/* --------------------------      FECHA ACTUAL    --------------------------- */}
            <PageHeader
              subTitle="Date Updated:"
              // title="Consulta de Equipos"
              // subTitle="Form design with validation"
              // icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
            />

            <PageHeader subTitle={fecha} />

            {/* -------------------------------------------------------------------------- */}

            <TblPagination />
          </Toolbar>
        </TableContainer>

        {/* <div className="table-responsive mt-5">
                    <table className="table table-hover align-middle table-sm animate__animated animate__fadeIn " >
                        <thead>

                            <tr>
                                <th className="table-active" scope="col">#</th>
                                <th className="table-active" scope="col">BU</th>
                                <th className="table-active" scope="col">País</th>
                                <th className="table-active" scope="col">Planta</th>
                                <th className="table-active" scope="col">Area</th>
                                <th className="table-active" scope="col">Subarea</th>
                                <th className="table-active" scope="col">Equipo</th>

                                <th className="table-active">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pruebaExcel.map((element) => (
                                <tr key={element.Id_Equipment}>
                                    <td scope="row">{element.Id_Equipment}</td>
                                    <td >{element.Procedencia.areas.operations.countries.bu.Name}</td>
                                    <td>{element.Procedencia.areas.operations.countries.Name}</td>
                                    <td>{element.Procedencia.areas.operations.Name}</td>
                                    <td>{element.Procedencia.areas.Name}</td>
                                    <td>{element.Procedencia.areas.SubArea.Name}</td>
                                    <td>{element.Name}</td>

                                    <td><Button color="primary" onClick={() => seleccionarEquipo(element, 'Editar')} >
                                        <i className="far fa-edit button_icon"></i></Button> {"  "}

                                        <Button color="danger" onClick={() => seleccionarEquipo(element, 'Eliminar')}>
                                            <i className="fas fa-trash-alt button_icon"></i> </Button> </td>
                                </tr>
                            ))
                            }
                        </tbody>
                    </table>
                </div> */}
      </Paper>

      {/* -----------------------------       FOOTER      ---------------------------- */}
      <footer className="footer mt-5 ml-5 p-4">
        <div className="d-flex">
          <div>
            <h4>GEAD</h4>
          </div>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <div>
            <img src={planning} style={{ width: "380px" }} />
          </div>
        </div>
      </footer>
      {/* --------------------------------------------------------------------------- */}

      {/* =================================== Modal Editar ================================= */}
      {/* ================================================================================== */}

      <Modal isOpen={modalEditar} style={{ maxWidth: 800 }}>
        <ModalHeader>
          <div>
            <h1>Editar Registro</h1>
          </div>
        </ModalHeader>

        {
          // Condicional para mostrar un formulaio u otro
          editing ? (
            // ---------------------------------- Modal ---------------------------------
            <div>
              {editingServiceInfo ? (
                <>
                  <ServiceInformation
                    casoServInfo={casoServInfo}
                    techInfoEditado={techInfoEditado}
                    updateAddServInfo={updateAddServInfo}
                    setEditingTechInfo={setEditingTechInfo}
                    editingTechInfo={editingTechInfo}
                    EditAddServInfo={EditAddServInfo}
                    handleSubmit={handleSubmit}
                    onSubmit={onSubmit}
                    equipoSeleccionado={equipoSeleccionado}
                    editRow={editRow}
                    eliminarAddTechInfo={eliminarAddTechInfo}
                    setEditing={setEditing}
                    setEditingServiceInfo={setEditingServiceInfo}
                    servicesInformation={servicesInformation}
                    setEquipoSeleccionado={setEquipoSeleccionado}
                    handleChangeServicesInformation={
                      handleChangeServicesInformation
                    }
                    editingNewServInfo={editingNewServInfo}
                    seteditingNewServInfo={seteditingNewServInfo}
                    allAquipmentRelation={allAquipmentRelation}
                    setServicesInformation={setServicesInformation}
                    setnewservInformation={setnewservInformation}
                    update={update}
                    id={id}
                    setId={setId}
                    prueba={prueba}
                    setPrueba={setPrueba}
                  />
                </>
              ) : (
                // ------------------------     Technical Information   -------------------------------
                <>
                  <div className="p-3">
                    <h4 className="text-muted">Technical Information</h4>
                  </div>

                  <ModalBody className="row animate__animated animate__fadeIn">
                    <FormGroup className="col-4">
                      <label>Equipment:</label>
                      <input
                        className="form-control"
                        type="text text-align=center"
                        name="Name"
                        value={equipoSeleccionado && equipoSeleccionado.Name}
                        onChange={handleChange}
                      />
                    </FormGroup>

                    <FormGroup className="col-4">
                      <label>Current Working:</label>
                      <input
                        className="form-control"
                        type="text text-align=center"
                        name="currentWorking"
                        value={
                          technicalInformation &&
                          technicalInformation.currentWorking
                        }
                        onChange={handleChange}
                      />
                    </FormGroup>

                    <FormGroup className="col-4">
                      <label>Current Condition:</label>
                      <input
                        className="form-control"
                        type="text text-align=center"
                        name="CurrentConditions"
                        value={
                          technicalInformation &&
                          technicalInformation.CurrentConditions
                        }
                        onChange={handleChange}
                      />
                    </FormGroup>

                    <FormGroup className="col-4">
                      <label>Equipment Type:</label>
                      <input
                        className="form-control"
                        type="text text-align=center"
                        name="EquipmentType"
                        value={
                          technicalInformation &&
                          technicalInformation.EquipmentType
                        }
                        onChange={handleChange}
                      />
                    </FormGroup>

                    <FormGroup className="col-4">
                      <label>Serial Number:</label>
                      <input
                        className="form-control"
                        type="text text-align=center"
                        name="SerialNumber"
                        value={
                          technicalInformation &&
                          technicalInformation.SerialNumber
                        }
                        onChange={handleChange}
                      />
                    </FormGroup>

                    <FormGroup className="col-4">
                      <label>Model Number:</label>
                      <input
                        className="form-control"
                        type="text text-align=center"
                        name="ModelNumber"
                        value={
                          technicalInformation &&
                          technicalInformation.ModelNumber
                        }
                        onChange={handleChange}
                      />
                    </FormGroup>

                    <FormGroup className="col-4">
                      <label>weight:</label>
                      <input
                        className="form-control"
                        type="text text-align=center"
                        name="Weight"
                        value={
                          technicalInformation && technicalInformation.Weight
                        }
                        onChange={handleChange}
                      />
                    </FormGroup>

                    <FormGroup className="col-4">
                      <label>OEM:</label>
                      <input
                        className="form-control"
                        type="text text-align=center"
                        name="OEM"
                        value={technicalInformation && technicalInformation.OEM}
                        onChange={handleChange}
                      />
                    </FormGroup>

                    <FormGroup className="col-4">
                      <label>Vendor:</label>
                      <input
                        className="form-control"
                        type="text text-align=center"
                        name="vendor"
                        value={
                          technicalInformation && technicalInformation.vendor
                        }
                        onChange={handleChange}
                      />
                    </FormGroup>

                    <FormGroup className="col-4">
                      <label>Description:</label>
                      <input
                        className="form-control"
                        type="text text-align=center"
                        name="Description"
                        value={
                          technicalInformation &&
                          technicalInformation.Description
                        }
                        onChange={handleChange}
                      />
                    </FormGroup>

                    <hr />
                    {/* -------------------------------         ADD NEW TECHNICAL INFORMATION           ------------------------------------------ */}

                    {
                      // Condicional para mostrar un formulario u otro
                      editingTechInfo ? (
                        <>
                          <EditAddTechInfo
                            technicalSpecEditado={technicalSpecEditado}
                            updateAddTechInfo={updateAddTechInfo}
                          />
                        </>
                      ) : (
                        <>
                          <section className="pb-4 pt-4">
                            <form
                              onSubmit={handleSubmit(onSubmitTechSpech)}
                              className="animate__animated animate__fadeIn"
                            >
                              <h5 className="text-muted">
                                Add Technical Information:
                              </h5>{" "}
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
                                <option value="Year of construction">
                                  Year of construction
                                </option>
                                <option value="Sanitary Grade">
                                  Sanitary Grade
                                </option>
                                <option value="Emplazam">Emplazam</option>
                                <option value="Protection Grade">
                                  Protection Grade
                                </option>
                                <option value="Electrical Consumption">
                                  Electrical Consumption
                                </option>
                                <option value="Measurement variable">
                                  Measurement variable
                                </option>
                                <option value="Plant Technical Information Contact">
                                  Plant Technical Information Contact
                                </option>
                                <option value="Disposal Information">
                                  Disposal Information
                                </option>
                                <option value="Equipment Packing">
                                  Equipment Packing
                                </option>
                                <option value="Equipment current conditions comments">
                                  Equipment current conditions comments
                                </option>
                                <option value="Nominal Capacity">
                                  Nominal Capacity
                                </option>
                                <option value="Assambled / Dissambled">
                                  Assambled / Dissambled
                                </option>
                                <option value="Plant Technical Information Contact">
                                  Plant Technical Information Contact
                                </option>
                                <option value="Plant Financial Information Contact">
                                  Plant Financial Information Contact
                                </option>
                                <option value="Communication protocol">
                                  Communication protocol
                                </option>
                                <option value="Current Conditions Comments">
                                  Current Conditions Comments
                                </option>
                                <option value="Notes about equipment">
                                  Notes about equipment
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
                      <table className="table display table-hover table-bordered table-striped">
                        <thead>
                          <tr>
                            <th>Others Technical Information</th>
                            <th>Value</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {equipoSeleccionado.TechnicalSpecification
                            .newTechnicalSpecification.length > 0 ? (
                            equipoSeleccionado.TechnicalSpecification.newTechnicalSpecification.map(
                              (elemento) => (
                                <tr key={elemento.Id_NewTechSpec}>
                                  <>
                                    {filaEditada ? (
                                      <>
                                        {id == elemento.Id_NewTechSpec ? (
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
                                        onClick={() =>
                                          editarTechSpec(elemento, "technical")
                                        }
                                      >
                                        <i className="far fa-edit button_icon"></i>
                                      </Button>{" "}
                                      {"  "}
                                      <Button
                                        color="danger"
                                        onClick={() =>
                                          eliminarAddTechInfo(
                                            elemento.Id_NewTechSpec
                                          )
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
                        </tbody>
                      </table>
                    </FormGroup>

                    {/* -------------------------    BOTONES IZQUIERDA - DERECHA    ------------------------------- */}

                    <FormGroup className="row align-items-center justify-content-between">
                      <Grid xs={4} className="d-flex justify-content-start ">
                        <Button
                          color="secundary"
                          onClick={() => {
                            setEditing(false);
                            setEditingTechInfo(false);
                            setId(null);
                          }}
                        >
                          <ArrowBackIcon />
                          Consulta Equipos
                        </Button>
                      </Grid>
                      <Grid xs={4} className="d-flex justify-content-center">
                        {" "}
                        <Pagination
                          count={3}
                          hidePrevButton
                          hideNextButton
                          defaultPage={2}
                          size="small"
                          color="primary"
                          disabled
                        />
                      </Grid>
                      <Grid xs={4} className="d-flex justify-content-end ">
                        <Button
                          color="secundary"
                          onClick={() => {
                            setEditing(true);
                            setEditingServiceInfo(true);
                            setCasoServInfo("Edit");
                            setEditingTechInfo(false);
                            setId(null);
                          }}
                        >
                          Services Information
                          <ArrowForwardIcon />
                        </Button>
                      </Grid>
                      {/* -------------------------    BOTONES IZQUIERDA DERECHA    ------------------------------- */}
                    </FormGroup>
                  </ModalBody>
                </>
              )}
            </div>
          ) : (
            <div>
              {/* -----------------------------------------        ** Editar Registros **       ------------------------------------------- */}

              <ModalBody className="row text-align-center  animate__animated animate__fadeIn">
                {/* //-------------------------------------   BOTON DE VISUALIZAR Y Descargar PDF   ------------------------------ */}
                <FormGroup>
                  {/* -------------------------   BOTON PARA VISUALIZAR PDF    ----------------------------- */}
                  <Button
                    color="primary"
                    className="mr-2"
                    onClick={() => {
                      setdescargarPdf(!descargarPdf);
                    }}
                  >
                    {" "}
                    {descargarPdf ? "Ocultar PDF" : "Visualizar PDF"}{" "}
                  </Button>
                  {/* -------------------------------------------------------------------------------------- */}

                  {/* -------------------------   BOTON PARA DESCARGAR PDF    ----------------------------- */}
                  <PDFDownloadLink
                    document={
                      <DocPDF
                        equipoSeleccionado={equipoSeleccionado}
                        line={line}
                        operations={operations}
                        lineTypes={lineTypes}
                        countries={countries}
                        bu={bu}
                        areas={areas}
                        SubArea={SubArea}
                        loading={loading}
                        uploadImage={uploadImage}
                        handleChangeLine={handleChangeLine}
                        handleChangeOperations={handleChangeOperations}
                        handleChangeLineTypes={handleChangeLineTypes}
                        handleChangeCountries={handleChangeCountries}
                        handleChangeBu={handleChangeBu}
                        handleChangeAreas={handleChangeAreas}
                        handleChangeSubArea={handleChangeSubArea}
                        handleChange={handleChange}
                        technicalInformation={technicalInformation}
                        servicesInformation={servicesInformation}
                      />
                    }
                    fileName="GEAD.pdf"
                  >
                    <Button color="primary">Descargar PDF</Button>
                  </PDFDownloadLink>
                  {/* -------------------------------------------------------------------------------------- */}
                </FormGroup>

                {/* //-------------------------------------   Visualizar PDF   ------------------------------ */}
                {descargarPdf ? (
                  <>
                    <ModalBody className="row text-align-center  animate__animated animate__fadeIn">
                      <PDFViewer style={{ width: "100%", height: "90vh" }}>
                        <DocPDF
                          equipoSeleccionado={equipoSeleccionado}
                          line={line}
                          operations={operations}
                          lineTypes={lineTypes}
                          countries={countries}
                          bu={bu}
                          areas={areas}
                          SubArea={SubArea}
                          technicalInformation={technicalInformation}
                          servicesInformation={servicesInformation}
                        />
                      </PDFViewer>
                    </ModalBody>
                  </>
                ) : (
                  // ------------------------------    Editar Registro  -----------------------------------
                  <>
                    <ModalBody className="row text-align-center  animate__animated animate__fadeIn">
                      {/* ---------------------------------------------       Subir Imagen        --------------------------------------------- */}
                      <FormGroup>
                        <div
                          id="imagen"
                          className="card animate__animated animate__fadeInLeft"
                          style={{ maxWidth: 380 }}
                        >
                          {/* ms-5 */}
                          {loading ? (
                            <h3>Loading...</h3>
                          ) : (
                            <>
                              <img
                                src={equipoSeleccionado.img}
                                style={{ width: "380px" }}
                              />
                            </>
                          )}
                        </div>

                        <div
                          id="imagen"
                          className="card mt-2 animate__animated animate__fadeInLeft"
                          style={{ maxWidth: 380 }}
                        >
                          {/* ms-5 */}
                          <input
                            type="file"
                            name="file"
                            placeholder="Upload an image"
                            onChange={uploadImage}
                          />
                        </div>
                      </FormGroup>
                      {/* ----------------------------------------    Ubicacion ----------------------------------------------------------------- */}

                      <FormGroup className="col-6">
                        <label>Id:</label>
                        <input
                          className="form-control"
                          readOnly
                          type="text text-align=center"
                          name="id"
                          value={
                            equipoSeleccionado &&
                            equipoSeleccionado.Id_Equipment
                          }
                        />
                      </FormGroup>
                      {/* -------------------------------------------------------------------------------------------
                                            -------------------------------------------------------------------------------------------
                                         ------------------------------------------------------------------------------------------- */}

                      <FormGroup className="col-6">
                        <label>Line Number:</label>
                        <input
                          className="form-control"
                          type="text text-align=center"
                          name="number"
                          value={line && line.number}
                          onChange={handleChangeLine}
                        />
                      </FormGroup>

                      <FormGroup className="col-6">
                        {/* <label>Planta:</label>
                                                <input
                                                    className="form-control"
                                                    type="text text-align=center"
                                                    name="Name"
                                                    value={operations && operations.Name}
                                                    onChange={handleChangeOperations} /> */}
                        {/* ============== onChange =============== Captura los cambios, lo que el usuario escriba*/}

                        <label>
                          Plant <b className="text-danger">*</b>
                        </label>
                        <select
                          className="form-select SelectBoostrap"
                          name="Name"
                          required
                          value={operations && operations.Name}
                          onChange={handleChangeOperations}
                        >
                          <option value="">Select Plant</option>
                          <option value="Barbados">Barbados</option>
                          <option value="Barranquilla">Barranquilla</option>
                          <option value="Boyaca">Boyaca</option>
                          <option value="Bucaramanga">Bucaramanga</option>
                          <option value="Fabrica de Tapas de Tocancipa">
                            Fabrica de Tapas de Tocancipa
                          </option>
                          <option value="Etiquetas Impresur & Indugral">
                            Etiquetas Impresur & Indugral
                          </option>
                          <option value="Medellín">Medellín</option>
                          <option value="Malteria Tibito">
                            Malteria Tibito
                          </option>
                          <option value="Tocancipa">Tocancipa</option>
                          <option value="Malteria Tropical">
                            Malteria Tropical
                          </option>
                          <option value="Valle">Valle</option>
                          <option value="Holguin">Holguin</option>
                          <option value="Dominicana">Dominicana</option>
                          <option value="Hato Nuevo">Hato Nuevo</option>
                          <option value="Guayaquil">Guayaquil</option>
                          <option value="Quito">Quito</option>
                          <option value="Malteria de Guayaquil">
                            Malteria de Guayaquil
                          </option>
                          <option value="La Constancia Beer">
                            La Constancia Beer
                          </option>
                          <option value="El Salvador CSD">
                            El Salvador CSD
                          </option>
                          <option value="La Constancia Walter">
                            La Constancia Walter
                          </option>
                          <option value="Zacapa">Zacapa</option>
                          <option value="San Pedro Sula Beer">
                            San Pedro Sula Beer
                          </option>
                          <option value="San Pedro Sula CSD">
                            San Pedro Sula CSD
                          </option>
                          <option value="Apan">Apan</option>
                          <option value="Cebadas y Maltas">
                            Cebadas y Maltas
                          </option>
                          <option value="Guadalajara">Guadalajara</option>
                          <option value="Malteria Zacatecas">
                            Malteria Zacatecas
                          </option>
                          <option value="Mazatlán">Mazatlán</option>
                          <option value="Modelo México">Modelo México</option>
                          <option value="Salamanca (Casal)">
                            Salamanca (Casal)
                          </option>
                          <option value="Torreón">Torreón</option>
                          <option value="Tuxtepec">Tuxtepec</option>
                          <option value="Yucatan">Yucatan</option>
                          <option value="Zacatecas">Zacatecas</option>
                          <option value="Cucapá (Craft)">Cucapá (Craft)</option>
                          <option value="Pasadena">Pasadena</option>
                          <option value="Arequipa">Arequipa</option>
                          <option value="Ate">Ate</option>
                          <option value="Cusco">Cusco</option>
                          <option value="Huachipa">Huachipa</option>
                          <option value="Malteria de Lima">
                            Malteria de Lima
                          </option>
                          <option value="Motupe">Motupe</option>
                          <option value="San Juan (Pucallpa)">
                            San Juan (Pucallpa)
                          </option>
                          <option value="San Mateo (Huarochiri)">
                            San Mateo (Huarochiri)
                          </option>
                          <option value="Barbarian (Craft)">
                            Barbarian (Craft)
                          </option>
                          <option value="Saint Vincent">Saint Vincent</option>
                          <option value="Bogotá Brewery Company (Craft)">
                            Bogotá Brewery Company (Craft)
                          </option>
                        </select>
                      </FormGroup>

                      <FormGroup className="col-6">
                        <label htmlFor="lineType">
                          Line Type <b className="text-danger">*</b>
                        </label>
                        <select
                          className="form-select SelectBoostrap"
                          name="Name"
                          value={lineTypes && lineTypes.Name}
                          onChange={handleChangeLineTypes}
                        >
                          <option value="">Select Line Type</option>
                          <option value="Brewline">Brewline</option>
                          <option value="Bottle">Bottle</option>
                          <option value="Can">Can</option>
                          <option value="Pet">Pet</option>
                          <option value="Keg">Keg</option>
                          <option value="Special Keg">Special Keg</option>
                        </select>
                      </FormGroup>

                      <FormGroup className="col-6">
                        <label>
                          Country <b className="text-danger">*</b>
                        </label>
                        <select
                          className="form-select SelectBoostrap"
                          name="Name"
                          value={countries && countries.Name}
                          required
                          onChange={handleChangeCountries}
                        >
                          <option value="">Selec Country</option>
                          <option value="Barbados">Barbados</option>
                          <option value="Colombia">Colombia</option>
                          <option value="Cuba">Cuba</option>
                          <option value="Dominicana">Dominicana</option>
                          <option value="Ecuador">Ecuador</option>
                          <option value="El Salvador">El Salvador</option>
                          <option value="Guatemala">Guatemala</option>
                          <option value="Honduras">Honduras</option>
                          <option value="México">México</option>
                          <option value="Panamá">Panamá</option>
                          <option value="Perú">Perú</option>
                          <option value="Saint Vincent">Saint Vincent</option>
                        </select>
                      </FormGroup>

                      <FormGroup className="col-6">
                        <label>
                          BU <b className="text-danger">*</b>
                        </label>
                        <select
                          className="form-select SelectBoostrap"
                          name="Name"
                          value={bu && bu.Name}
                          onChange={handleChangeBu}
                        >
                          {/* ------------------------------------------------   SELECT DESDE LA BASE DE DATOS   ------------------------------------ */}
                          <option value="">Select BU</option>
                          <option value="CAC">CAC</option>
                          <option value="COL">COL</option>
                          <option value="PEC">PEC</option>
                          <option value="MEX">MEX</option>
                        </select>
                      </FormGroup>

                      <FormGroup className="col-6">
                        <label htmlFor="area">
                          Area <b className="text-danger">*</b>
                        </label>
                        <select
                          className="form-select SelectBoostrap"
                          name="Name"
                          value={areas && areas.Name}
                          onChange={handleChangeAreas}
                        >
                          <option value="">Select Area</option>
                          <option value="General Services">
                            General Services
                          </option>
                          <option value="Silos">Silos</option>
                          <option value="Milling">Milling</option>
                          <option value="Brewhouse">Brewhouse</option>
                          <option value="Fermentation">Fermentation</option>
                          <option value="Maturation">Maturation</option>
                          <option value="Centrifuge">Centrifuge</option>
                          <option value="Filtration">Filtration</option>
                          <option value="Dilution Water">Dilution Water</option>
                          <option value="Bright Beer Tanks">
                            Bright Beer Tanks
                          </option>
                          <option value="Packaging">Packaging</option>
                          <option value="Chemical Island & CIP">
                            Chemical Island & CIP
                          </option>
                          <option value="Syrup House">Syrup House</option>
                          <option value="Logistic Tier 1">
                            Logistic Tier 1
                          </option>
                          <option value="Logistic Tier 2">
                            Logistic Tier 2
                          </option>
                          <option value="CO2 Recovery">CO2 Recovery</option>
                          <option value="Refrigeration">Refrigeration</option>
                          <option value="Wells">Wells</option>
                          <option value="Water Treatment Plant">
                            Water Treatment Plant
                          </option>
                          <option value="Compressed Air">Compressed Air</option>
                          <option value="Electrical Substation (HV)">
                            Electrical Substation (HV)
                          </option>
                          <option value="Electrical Substation (MV)">
                            Electrical Substation (MV)
                          </option>
                          <option value="Electrical Substation (LV)">
                            Electrical Substation (LV)
                          </option>
                          <option value="Steam Generation">
                            Steam Generation
                          </option>
                          <option value="Biological Treatment System">
                            Biological Treatment System
                          </option>
                          <option value="Tertiary System">
                            Tertiary System
                          </option>
                          <option value="Sanitary Plant">Sanitary Plant</option>
                          <option value="Automation & Industrial Network">
                            Automation & Industrial Network
                          </option>
                          <option value="Maintenance">Maintenance</option>
                          <option value="IT">IT</option>
                          <option value="Laboratory">Laboratory</option>
                          <option value="Workshop">Workshop</option>
                          <option value="Offices">Offices</option>
                          <option value="Subproducts">Subproducts</option>
                        </select>
                      </FormGroup>

                      <FormGroup className="col-6">
                        <label htmlFor="Subarea">
                          Subarea <b className="text-danger">*</b>
                        </label>
                        <select
                          className="form-select SelectBoostrap"
                          name="Name"
                          value={SubArea && SubArea.Name}
                          onChange={handleChangeSubArea}
                        >
                          <option value="">Select Subarea</option>
                          <option value="Wort Kettle">Wort Kettle</option>
                          <option value="Torre de Molienda ">
                            Torre de Molienda{" "}
                          </option>
                          <option value="Cocimientos">Cocimientos</option>
                          <option value="BAGAZO/SYE">BAGAZO/SYE</option>
                          <option value="Bloque Frio">Bloque Frio</option>
                          <option value="Bloque Frio">NaN</option>
                        </select>
                      </FormGroup>

                      <FormGroup className="col-12">
                        {/* Para obtener el correo */}
                        <TextField
                          label="Plant Mail"
                          className="form-control"
                          variant="outlined"
                          name="code"
                          value={equipoSeleccionado && equipoSeleccionado.code}
                          onChange={handleChange}
                        />
                      </FormGroup>
                      <br />

                      {/* <FormGroup className="col-6">
                                        <label>Equipo:</label>
                                        <input
                                            className="form-control"
                                            type="text text-align=center"
                                            name="equipos"
                                            value={equipoSeleccionado && equipoSeleccionado.equipos}
                                            onChange={handleChange} />
                                        </FormGroup> */}

                      {/* <FormGroup className="col-6">
                                        <label>Country:</label>
                                        <input
                                            className="form-control"
                                            type="text text-align=center"
                                            name="Name"
                                            value={countries && countries.Name}
                                            onChange={handleChangeCountries} />
                                        </FormGroup>

                                        <FormGroup className="col-6">
                                        <label>BU:</label>
                                        <input
                                            className="form-control"
                                            type="text text-align=center"
                                            name="Name"
                                            value={bu && bu.Name}
                                            onChange={handleChangeBu} />
                                        </FormGroup>

                                        <FormGroup className="col-6">
                                        <label>Area:</label>
                                        <input
                                            className="form-control"
                                            type="text text-align=center"
                                            name="Name"
                                            value={areas && areas.Name}
                                            onChange={handleChangeAreas} />
                                        </FormGroup>


                                        <FormGroup className="col-6">
                                        <label>Subárea:</label>
                                        <input
                                            className="form-control"
                                            type="text text-align=center"
                                            name="Name"
                                            value={SubArea && SubArea.Name}
                                            onChange={handleChangeSubArea} />
                                        </FormGroup>

                                        <FormGroup className="col-6">
                                        <label>Line Type:</label>
                                        <input
                                            className="form-control"
                                            type="text text-align=center"
                                            name="Name"
                                            value={lineTypes && lineTypes.Name}
                                            onChange={handleChangeLineTypes} />
                                        </FormGroup>

                                        <FormGroup className="col-6">
                                        <label>Line Number:</label>
                                        <input
                                            className="form-control"
                                            type="text text-align=center"
                                            name="number"
                                            value={line && line.number}
                                            onChange={handleChangeLine} />
                                        </FormGroup> */}

                      {/* -------------------------    BOTONES IZQUIERDA DERECHA    ------------------------------- */}
                      <FormGroup className="row justify-content-between align-items-center">
                        <Grid xs={4} className="d-flex justify-content-start">
                          <Button
                            color="secundary"
                            className="d-none"
                            onClick={() => setEditing(false)}
                          >
                            Consulta de Equipos
                            <ArrowBackIcon />
                          </Button>
                        </Grid>
                        <Grid xs={4} className="d-flex justify-content-center">
                          {" "}
                          <Pagination
                            count={3}
                            hidePrevButton
                            hideNextButton
                            defaultPage={1}
                            size="small"
                            color="primary"
                            disabled
                          />
                        </Grid>
                        <Grid xs={4} className="d-flex justify-content-end">
                          <Button
                            color="secundary"
                            onClick={() => {
                              setEditing(true);
                              setEditingTechInfo(false);
                            }}
                          >
                            Technical Information
                            <ArrowForwardIcon />
                          </Button>
                        </Grid>

                        {/* -------------------------    BOTONES IZQUIERDA DERECHA    ------------------------------- */}
                      </FormGroup>
                    </ModalBody>
                  </>
                )}
              </ModalBody>
            </div>
          )
        }
        {/* -------------------------    BOTONES ACEPTAR Y CANCELAR    ------------------------------- */}

        <ModalFooter>
          <Button
            color="danger"
            onClick={() => {
              setModalEditar(false);
              setEditing(false);
              setEditingTechInfo(false);
              setEditingServiceInfo(false);
            }}
          >
            Cancelar
          </Button>
          <Button color="primary" onClick={() => editar()}>
            Guardar Registro
          </Button>
        </ModalFooter>
      </Modal>

      {/*============================= Modal Eliminar =========================================*/}

      <Modal isOpen={modalEliminar}>
        <ModalBody className="text-center">
          Estás seguro que deseas eliminar el equipo: <br />
          {equipoSeleccionado && equipoSeleccionado.Name}
        </ModalBody>

        <ModalFooter>
          <Button className="btn btn-danger" onClick={() => eliminar()}>
            Sí
          </Button>
          <Button
            className="btn btn-secondary"
            onClick={() => setModalEliminar(false)}
          >
            No
          </Button>
        </ModalFooter>
      </Modal>

      {/*============================= Modal Insertar por excel =========================================*/}

      <Modal isOpen={modalInsertarExcel}>
        <Excel
          setModalInsertarExcel={setModalInsertarExcel}
          item={item}
          setItem={setItem}
          setpruebaExcel={setpruebaExcel}
          setModalInsertarExcel={setModalInsertarExcel}
          setGetAllList={setGetAllList}
          getAllList={getAllList}
          actualizarTabla={actualizarTabla}
          setListAll={setListAll}
        />
      </Modal>

      {/*======================================================= Modal Insertar =======================================================*/}

      <Modal
        isOpen={modalInsertar}
        style={{ maxWidth: 700 }}
        className="modalForm"
      >
        <ModalHeader>
          <div>
            <h1>Nuevo Registro</h1>
            <h6>Detalles Generales</h6>
          </div>
        </ModalHeader>

        {
          // Condicional para mostros un formulaio u otro
          editing ? (
            // ---------------------------------- Modal ---------------------------------
            <div>
              {editingServiceInfo ? (
                <>
                  <ServiceInformation
                    casoServInfo={casoServInfo}
                    techInfoEditado={techInfoEditado}
                    updateAddServInfo={updateAddServInfo}
                    setEditingTechInfo={setEditingTechInfo}
                    editingTechInfo={editingTechInfo}
                    EditAddServInfo={EditAddServInfo}
                    handleSubmit={handleSubmit}
                    setnewservInformation={setnewservInformation}
                    newservInformation={newservInformation}
                    equipoSeleccionado={equipoSeleccionado}
                    editRow={editRow}
                    eliminarAddTechInfo={eliminarAddTechInfo}
                    setEditing={setEditing}
                    setEditingServiceInfo={setEditingServiceInfo}
                    servicesInformation={servicesInformation}
                    setEquipoSeleccionado={setEquipoSeleccionado}
                    handleChangeServicesInformation={
                      handleChangeServicesInformation
                    }
                    editingNewServInfo={editingNewServInfo}
                    id={id} // Para seleccionar que fila editada tendra el efecto
                  />
                </>
              ) : (
                <>
                  <div className="p-3">
                    <h4 className="text-muted">Technical Information</h4>
                  </div>

                  <ModalBody className="row animate__animated animate__fadeIn">
                    <FormGroup className="col-4">
                      <label htmlFor="url_input">Equipment:</label>
                      <input
                        className="form-control"
                        required
                        type="text text-align=center"
                        name="Name"
                        value={
                          equipoSeleccionado ? equipoSeleccionado.Name : ""
                        }
                        onChange={handleChange}
                      />
                    </FormGroup>

                    <FormGroup className="col-4">
                      <label>Current Working:</label>
                      <input
                        className="form-control"
                        type="text text-align=center"
                        name="currentWorking"
                        value={
                          technicalInformation &&
                          technicalInformation.currentWorking
                        }
                        onChange={handleChange}
                      />
                    </FormGroup>

                    <FormGroup className="col-4">
                      <label>Current Condition:</label>
                      <input
                        className="form-control"
                        type="text text-align=center"
                        name="CurrentConditions"
                        value={
                          technicalInformation &&
                          technicalInformation.CurrentConditions
                        }
                        onChange={handleChange}
                      />
                    </FormGroup>

                    <FormGroup className="col-4">
                      <label>Equipment Type:</label>
                      <input
                        className="form-control"
                        type="text text-align=center"
                        name="EquipmentType"
                        value={
                          technicalInformation &&
                          technicalInformation.EquipmentType
                        }
                        onChange={handleChange}
                      />
                      {/* ============== onChange =============== Captura los cambios, lo que el usuario escriba*/}
                    </FormGroup>

                    <FormGroup className="col-4">
                      <label>Serial Number:</label>
                      <input
                        className="form-control"
                        type="text text-align=center"
                        name="SerialNumber"
                        value={
                          technicalInformation &&
                          technicalInformation.SerialNumber
                        }
                        onChange={handleChange}
                      />
                    </FormGroup>

                    <FormGroup className="col-4">
                      <label>Model Number:</label>
                      <input
                        className="form-control"
                        type="text text-align=center"
                        name="ModelNumber"
                        value={
                          technicalInformation &&
                          technicalInformation.ModelNumber
                        }
                        onChange={handleChange}
                      />
                    </FormGroup>

                    <FormGroup className="col-4">
                      <label>Weight:</label>
                      <input
                        className="form-control"
                        type="text text-align=center"
                        name="Weight"
                        value={
                          technicalInformation && technicalInformation.Weight
                        }
                        onChange={handleChange}
                      />
                    </FormGroup>

                    <FormGroup className="col-4">
                      <label>OEM:</label>
                      <input
                        className="form-control"
                        type="text text-align=center"
                        name="OEM"
                        value={technicalInformation && technicalInformation.OEM}
                        onChange={handleChange}
                      />
                    </FormGroup>

                    <FormGroup className="col-4">
                      <label>Vendor:</label>
                      <input
                        className="form-control"
                        type="text text-align=center"
                        name="vendor"
                        value={
                          technicalInformation && technicalInformation.vendor
                        }
                        onChange={handleChange}
                      />
                    </FormGroup>

                    <FormGroup className="col-4">
                      <label>Description:</label>
                      <input
                        className="form-control"
                        type="text text-align=center"
                        name="Description"
                        value={
                          technicalInformation &&
                          technicalInformation.Description
                        }
                        onChange={handleChange}
                      />
                    </FormGroup>

                    {/* vendor: "", nominalCapacity: "", yearConstruction: "", currentConditionsComments: "", : "" */}

                    <hr />
                    {/* -------------------------------         ADD TECHNICAL INFORMATION           ------------------------------------------ */}

                    {
                      // Condicional para mostros un formulaio u otro
                      editingTechInfo ? (
                        <>
                          <EditAddTechInfo
                            technicalSpecEditado={technicalSpecEditado}
                            updateAddTechInfo={updateAddTechInfo}
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
                                <h5>Add Technical Information:</h5>{" "}
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
                                <option value="Year of construction">
                                  Year of construction
                                </option>
                                <option value="Sanitary Grade">
                                  Sanitary Grade
                                </option>
                                <option value="Protection Grade">
                                  Protection Grade
                                </option>
                                <option value="Electrical Consumption">
                                  Electrical Consumption
                                </option>
                                <option value="Measurement variable">
                                  Measurement variable
                                </option>
                                <option value="Plant Technical Information Contact">
                                  Plant Technical Information Contact
                                </option>
                                <option value="Disposal Information">
                                  Disposal Information
                                </option>
                                <option value="Equipment Packing">
                                  Equipment Packing
                                </option>
                                <option value="Equipment current conditions comments">
                                  Equipment current conditions comments
                                </option>
                                <option value="Nominal Capacity">
                                  Nominal Capacity
                                </option>
                                <option value="Assambled / Dissambled">
                                  Assambled / Dissambled
                                </option>
                                <option value="Plant Technical Information Contact">
                                  Plant Technical Information Contact
                                </option>
                                <option value="Plant Financial Information Contact">
                                  Plant Financial Information Contact
                                </option>
                                <option value="Communication protocol">
                                  Communication protocol
                                </option>
                                <option value="Notes about equipment">
                                  Notes about equipment
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
                                    <AddIcon />{" "}
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
                      <table className="table display table-hover table-bordered table-striped">
                        <thead>
                          <tr>
                            <th>Others Technical Information</th>
                            <th>Value</th>
                            <th>Acciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {newTechicInformation.length > 0 ? (
                            newTechicInformation.map((elemento) => (
                              <tr key={elemento.Id_NewTechSpec}>
                                <>
                                  {filaEditada ? (
                                    <>
                                      {id == elemento.Id_NewTechSpec ? (
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
                                      onClick={() =>
                                        editarTechSpec(elemento, "technical")
                                      }
                                    >
                                      <i className="far fa-edit button_icon"></i>
                                    </Button>{" "}
                                    {"  "}
                                    <Button
                                      color="danger"
                                      onClick={() =>
                                        eliminarAddTechInfo(
                                          elemento.Id_NewTechSpec
                                        )
                                      }
                                    >
                                      <i className="fas fa-trash-alt button_icon"></i>{" "}
                                    </Button>
                                  </td>
                                </>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={3}>No data recorded</td>
                            </tr>
                          )}
                          {/* No hay datos registrados */}
                        </tbody>
                      </table>
                    </FormGroup>

                    {/* -------------------------    BOTONES IZQUIERDA - DERECHA    ------------------------------- */}
                    <FormGroup className="row align-items-center justify-content-between">
                      <Grid
                        xs={4}
                        className="d-flex justify-content-start align-items-center"
                      >
                        <Button
                          color="secundary"
                          onClick={() => setEditing(false)}
                        >
                          <ArrowBackIcon />
                          Consulta Equipos
                        </Button>
                      </Grid>
                      <Grid xs={4} className="d-flex justify-content-center">
                        {" "}
                        <Pagination
                          count={3}
                          hidePrevButton
                          hideNextButton
                          defaultPage={2}
                          size="small"
                          color="primary"
                          disabled
                        />
                      </Grid>
                      <Grid
                        xs={4}
                        className="d-flex justify-content-end align-items-center"
                      >
                        <Button
                          color="secundary"
                          onClick={() => {
                            setEditing(true);
                            setEditingServiceInfo(true);
                            setCasoServInfo("Add");
                          }}
                        >
                          Services Information
                          <ArrowForwardIcon />
                        </Button>
                      </Grid>

                      {/* -------------------------    BOTONES IZQUIERDA DERECHA    ------------------------------- */}
                    </FormGroup>
                  </ModalBody>
                </>
              )}
            </div>
          ) : (
            <div>
              {/* -----------------------------------           Insertar Registros        ------------------------------------------- */}
              <form>
                <ModalBody className="row text-align-center justify-content-center animate__animated animate__fadeIn">
                  <FormGroup>
                    {/* -------------------------       Subir Imagen        ------------------ */}
                    <div
                      id="imagen"
                      className="justify-content-center text-center animate__animated animate__fadeInLeft agregar-imagen"
                      style={{ maxWidth: 380, alignContent: "center" }}
                    >
                      {loading ? (
                        <h3 className="aling-items-center">Loading...</h3>
                      ) : (
                        <>
                          <img
                            src={equipoSeleccionado.img}
                            style={{ width: "380px" }}
                          />
                        </>
                      )}
                    </div>

                    <div
                      id="imagen"
                      className="mt-2 justify-content-center text-center animate__animated animate__fadeInLeft"
                      style={{ alignContent: "center" }}
                    >
                      {/* ms-5 */}

                      <input
                        accept="image/*"
                        id="icon-button-file"
                        type="file"
                        style={{ display: "none" }}
                        onChange={uploadImage}
                      />

                      <label htmlFor="icon-button-file">
                        <Button
                          aria-label="upload picture"
                          variant="outlined"
                          color="primary"
                          size="large"
                          component="span"
                        >
                          <PhotoCamera fontSize="large" /> Agregar imagen
                        </Button>
                      </label>

                      {/* <input
                                                type="file"
                                                name="file"
                                                placeholder="Upload an image"
                                                onChange={uploadImage}
                                            /> */}
                    </div>
                  </FormGroup>

                  <FormGroup className="col-6">
                    <TextField
                      label="ID Number"
                      className="form-control"
                      variant="outlined"
                      name="Id_Equipment"
                      value={
                        equipoSeleccionado && equipoSeleccionado.Id_Equipment
                      }
                    />
                  </FormGroup>

                  <FormGroup className="col-6">
                    <TextField
                      label="Line Number"
                      className="form-control"
                      variant="outlined"
                      name="number"
                      value={line ? line.number : ""}
                      onChange={handleChangeLine}
                    />

                    {/* <TextField
                        label="Line Number"
                        className="form-control"
                        id="outlined-basic"
                        variant="outlined"
                        name="number"
                        value={line ? line.number : ''}
                        onChange={handleChangeLine}
                    /> */}
                  </FormGroup>

                  <FormGroup className="col-6">
                    {/* <div className="dropdown">
                                            <div className="control">
                                                <div className="select-value">Seleccionar Planta...</div>

                                            </div>

                                        </div> */}

                    <label>
                      Plant <b className="text-danger">*</b>
                    </label>
                    <select
                      className="form-select SelectBoostrap"
                      name="Name"
                      required
                      onChange={handleChangeOperations}
                    >
                      <option value="">Select Plant</option>
                      {/* {
                                                operationsList.map((elemento) => (
                                                    <option value={elemento.Id_Operations}>{elemento.Name}</option>
                                                ))
                                            } */}
                      <option value="Barbados">Barbados</option>
                      <option value="Barranquilla">Barranquilla</option>
                      <option value="Boyaca">Boyaca</option>
                      <option value="Bucaramanga">Bucaramanga</option>
                      <option value="Fabrica de Tapas de Tocancipa">
                        Fabrica de Tapas de Tocancipa
                      </option>
                      <option value="Etiquetas Impresur & Indugral">
                        Etiquetas Impresur & Indugral
                      </option>
                      <option value="Medellín">Medellín</option>
                      <option value="Malteria Tibito">Malteria Tibito</option>
                      <option value="Tocancipa">Tocancipa</option>
                      <option value="Malteria Tropical">
                        Malteria Tropical
                      </option>
                      <option value="Valle">Valle</option>
                      <option value="Holguin">Holguin</option>
                      <option value="Dominicana">Dominicana</option>
                      <option value="Hato Nuevo">Hato Nuevo</option>
                      <option value="Guayaquil">Guayaquil</option>
                      <option value="Quito">Quito</option>
                      <option value="Malteria de Guayaquil">
                        Malteria de Guayaquil
                      </option>
                      <option value="La Constancia Beer">
                        La Constancia Beer
                      </option>
                      <option value="El Salvador CSD">El Salvador CSD</option>
                      <option value="La Constancia Walter">
                        La Constancia Walter
                      </option>
                      <option value="Zacapa">Zacapa</option>
                      <option value="San Pedro Sula Beer">
                        San Pedro Sula Beer
                      </option>
                      <option value="San Pedro Sula CSD">
                        San Pedro Sula CSD
                      </option>
                      <option value="Apan">Apan</option>
                      <option value="Cebadas y Maltas">Cebadas y Maltas</option>
                      <option value="Guadalajara">Guadalajara</option>
                      <option value="Malteria Zacatecas">
                        Malteria Zacatecas
                      </option>
                      <option value="Mazatlán">Mazatlán</option>
                      <option value="Modelo México">Modelo México</option>
                      <option value="Salamanca (Casal)">
                        Salamanca (Casal)
                      </option>
                      <option value="Torreón">Torreón</option>
                      <option value="Tuxtepec">Tuxtepec</option>
                      <option value="Yucatan">Yucatan</option>
                      <option value="Zacatecas">Zacatecas</option>
                      <option value="Cucapá (Craft)">Cucapá (Craft)</option>
                      <option value="Pasadena">Pasadena</option>
                      <option value="Arequipa">Arequipa</option>
                      <option value="Ate">Ate</option>
                      <option value="Cusco">Cusco</option>
                      <option value="Huachipa">Huachipa</option>
                      <option value="Malteria de Lima">Malteria de Lima</option>
                      <option value="Motupe">Motupe</option>
                      <option value="San Juan (Pucallpa)">
                        San Juan (Pucallpa)
                      </option>
                      <option value="San Mateo (Huarochiri)">
                        San Mateo (Huarochiri)
                      </option>
                      <option value="Barbarian (Craft)">
                        Barbarian (Craft)
                      </option>
                      <option value="Saint Vincent">Saint Vincent</option>
                      <option value="Bogotá Brewery Company (Craft)">
                        Bogotá Brewery Company (Craft)
                      </option>
                    </select>
                  </FormGroup>

                  <FormGroup className="col-6">
                    {/* <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        name="Name"
                        onChange={handleChangeLineTypes}
                        options={lineTypesSelect}
                        sx={{ width: 370 }}
                        renderInput={(params) => 
                        <TextField {...params} label="Line Type" variant='outlined' />}
                    /> */}

                    <label htmlFor="lineType">
                      Line Type <b className="text-danger">*</b>
                    </label>
                    <select
                      className="form-select SelectBoostrap"
                      name="Name"
                      onChange={handleChangeLineTypes}
                    >
                      <option value="">Select Line Type</option>
                      <option value="Brewline">Brewline</option>
                      <option value="Bottle">Bottle</option>
                      <option value="Can">Can</option>
                      <option value="Pet">Pet</option>
                      <option value="Keg">Keg</option>
                      <option value="Special Keg">Special Keg</option>
                    </select>

                    {/* {lineTypeList.map((elemento) => (
                                                <option value={elemento.Name}>{elemento.Name}</option>
                                            ))
                                            } */}
                  </FormGroup>

                  <FormGroup className="col-6">
                    <label>
                      Country <b className="text-danger">*</b>
                    </label>
                    <select
                      className="form-select SelectBoostrap"
                      name="Name"
                      required
                      onChange={handleChangeCountries}
                    >
                      <option value="">Select Country</option>
                      {/* {paisLis.map((elemento) => (
                                                <option value={elemento.Id_Countries}>{elemento.Name}</option>
                                            ))
                                            } */}

                      <option value="Barbados">Barbados</option>
                      <option value="Colombia">Colombia</option>
                      <option value="Cuba">Cuba</option>
                      <option value="Dominicana">Dominicana</option>
                      <option value="Ecuador">Ecuador</option>
                      <option value="El Salvador">El Salvador</option>
                      <option value="Guatemala">Guatemala</option>
                      <option value="Honduras">Honduras</option>
                      <option value="México">México</option>
                      <option value="Panamá">Panamá</option>
                      <option value="Perú">Perú</option>
                      <option value="Saint Vincent">Saint Vincent</option>
                    </select>
                  </FormGroup>

                  <FormGroup className="col-6">
                    <label>
                      BU <b className="text-danger">*</b>
                    </label>
                    <select
                      className="form-select SelectBoostrap"
                      name="Name"
                      onChange={handleChangeBu}
                    >
                      {/* ------------------------------------------------   SELECT DESDE LA BASE DE DATOS   ------------------------------------ */}
                      <option value="">Select BU</option>
                      {/* {
                                                buList.map((elemento) => (
                                                    <option value={elemento.Id_BU}>{elemento.Name}</option>
                                                ))
                                            } */}

                      <option value="CAC">CAC</option>
                      <option value="COL">COL</option>
                      <option value="PEC">PEC</option>
                      <option value="MEX">MEX</option>
                    </select>
                  </FormGroup>

                  <FormGroup className="col-6">
                    <label htmlFor="area">
                      Area <b className="text-danger">*</b>
                    </label>
                    <select
                      className="form-select SelectBoostrap"
                      name="Name"
                      onChange={handleChangeAreas}
                    >
                      <option value="">Select Area</option>
                      {/* {
                                                areaList.map((elemento) => (
                                                    <option value={elemento.Id_Areas}>{elemento.Name}</option>
                                                ))
                                            } */}

                      <option value="General Services">General Services</option>
                      <option value="Silos">Silos</option>
                      <option value="Milling">Milling</option>
                      <option value="Brewhouse">Brewhouse</option>
                      <option value="Fermentation">Fermentation</option>
                      <option value="Maturation">Maturation</option>
                      <option value="Centrifuge">Centrifuge</option>
                      <option value="Filtration">Filtration</option>
                      <option value="Dilution Water">Dilution Water</option>
                      <option value="Bright Beer Tanks">
                        Bright Beer Tanks
                      </option>
                      <option value="Packaging">Packaging</option>
                      <option value="Chemical Island & CIP">
                        Chemical Island & CIP
                      </option>
                      <option value="Syrup House">Syrup House</option>
                      <option value="Logistic Tier 1">Logistic Tier 1</option>
                      <option value="Logistic Tier 2">Logistic Tier 2</option>
                      <option value="CO2 Recovery">CO2 Recovery</option>
                      <option value="Refrigeration">Refrigeration</option>
                      <option value="Wells">Wells</option>
                      <option value="Water Treatment Plant">
                        Water Treatment Plant
                      </option>
                      <option value="Compressed Air">Compressed Air</option>
                      <option value="Electrical Substation (HV)">
                        Electrical Substation (HV)
                      </option>
                      <option value="Electrical Substation (MV)">
                        Electrical Substation (MV)
                      </option>
                      <option value="Electrical Substation (LV)">
                        Electrical Substation (LV)
                      </option>
                      <option value="Steam Generation">Steam Generation</option>
                      <option value="Biological Treatment System">
                        Biological Treatment System
                      </option>
                      <option value="Tertiary System">Tertiary System</option>
                      <option value="Sanitary Plant">Sanitary Plant</option>
                      <option value="Automation & Industrial Network">
                        Automation & Industrial Network
                      </option>
                      <option value="Maintenance">Maintenance</option>
                      <option value="IT">IT</option>
                      <option value="Laboratory">Laboratory</option>
                      <option value="Workshop">Workshop</option>
                      <option value="Offices">Offices</option>
                      <option value="Subproducts">Subproducts</option>
                    </select>
                  </FormGroup>

                  <FormGroup className="col-6">
                    <label htmlFor="Subarea">
                      Subarea <b className="text-danger">*</b>
                    </label>
                    <select
                      className="form-select SelectBoostrap"
                      name="Name"
                      onChange={handleChangeSubArea}
                    >
                      <option value="">Select Subarea</option>
                      {/* {subareaList.map((elemento) => (
                                                <option value={elemento.Id_SubAreas}>{elemento.Name}</option>
                                            ))
                                            } */}
                      <option value="Wort Kettle">Wort Kettle</option>
                      <option value="Torre de Molienda ">
                        Torre de Molienda{" "}
                      </option>
                      <option value="Cocimientos">Cocimientos</option>
                      <option value="BAGAZO/SYE">BAGAZO/SYE</option>
                      <option value="Bloque Frio">Bloque Frio</option>
                      <option value="Bloque Frio">NaN</option>
                    </select>
                  </FormGroup>

                  {/* <FormGroup className="col-12">
                                        <label>Correo de planta:</label>
                                        <input
                                            className="form-control"
                                            required
                                            type="text text-align=center"
                                            name="correo"
                                            onChange={handleChange}
                                        />
                                    </FormGroup> */}

                  <FormGroup className="col-12">
                    {/* Para obtener el correo */}
                    <TextField
                      label="Plant Mail"
                      className="form-control"
                      variant="outlined"
                      name="code"
                      onChange={handleChange}
                    />
                  </FormGroup>

                  {/* <FormGroup className="col-6">
                                        <label>Subárea:</label>
                                        <input
                                            className="form-control"
                                            type="text text-align=center"
                                            name="subarea"
                                            value={equipoSeleccionado ? equipoSeleccionado.subarea : ''}
                                            onChange={handleChange} />
                                    </FormGroup> */}

                  {/* -------------------------    BOTONES IZQUIERDA DERECHA    ------------------------------- */}
                  <FormGroup className="row align-items-center justify-content-between">
                    <Grid xs={4}>
                      <Button
                        className="d-none"
                        color="secondary"
                        onClick={() => setEditing(false)}
                      >
                        <ArrowBackIcon />
                      </Button>
                    </Grid>
                    <Grid xs={4} className="d-flex justify-content-center">
                      {" "}
                      <Pagination
                        count={3}
                        hidePrevButton
                        hideNextButton
                        defaultPage={1}
                        size="small"
                        color="primary"
                        disabled
                      />
                    </Grid>
                    <Grid
                      xs={4}
                      className="d-flex justify-content-end align-items-center"
                    >
                      <Button
                        color="muted"
                        onClick={() => {
                          setEditing(true);
                          setEditingTechInfo(false);
                        }}
                      >
                        {" "}
                        Technical Information
                        <ArrowForwardIcon />
                      </Button>
                    </Grid>

                    {/* -------------------------    BOTONES IZQUIERDA DERECHA    ------------------------------- */}
                  </FormGroup>

                  {/* <ModalFooter>
                                        <Button type="submit" color='primary' onClick={() => insertar()}>Insertar</Button>
                                        <Button color='danger'
                                            onClick={() => {
                                                setModalInsertar(false)
                                                setModalEditar(false)
                                                setEditing(false)
                                                setEditingTechInfo(false)
                                                setEditingServiceInfo(false)
                                            }}>Cancelar</Button>
                                    </ModalFooter> */}
                </ModalBody>
              </form>
            </div>
          )
        }

        <ModalFooter>
          <Button
            variant="outlined"
            color="danger"
            onClick={() => {
              setModalInsertar(false);
              seteditingNewServInfo(true);
              setModalEditar(false);
              setEditing(false);
              setEditingTechInfo(false);
              setEditingServiceInfo(false);
            }}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={() => insertar()}
          >
            <AddIcon /> Crear Equipo
          </Button>
        </ModalFooter>

        {/*-------------------------------- Modal ----------------------------*/}
      </Modal>

      {/* ------------------------------  modal de Consulta Avanzada -----------------------------------------*/}

      {/* < Modal isOpen={modalConsultaAv} >
                <ModalHeader>
                    <div>
                        <h1>Consulta avanzada</h1>
                    </div>
                </ModalHeader>

                <ModalBody>
                    <p>Especifique los campos por los que desea filtrar</p>
                    <FormGroup>
                        <label>Campos</label> <br />
                        <Button color='success'>Agergar</Button>
                    </FormGroup>
                    <FormGroup>
                        <label>Equipo</label>
                        <input className="form-control" type="text text-align=center" />
                    </FormGroup>

                    <FormGroup>
                        <label>Ubicacion Tecnica</label>
                        <input
                            className="form-control"
                            name="ubicacionTecnica"
                            type="text text-align=center"

                        />
                    </FormGroup>

                    <FormGroup>
                        <label>Descripcion</label>
                        <input
                            className="form-control"
                            name="descripcion"
                            type="text text-align=center"
                        />
                    </FormGroup>

                    <FormGroup>
                        <label>paises:</label>
                        <input
                            className="form-control"
                            name="paises"
                            type="text text-align=center"
                        />
                    </FormGroup>

                </ModalBody>

                <ModalFooter>
                    <Button color='primary' >Buscar</Button>
                    <Button color='secondary' onClick={() => setModalConsultaAv(false)}>Cerrar</Button>
                </ModalFooter>
            </Modal > */}
    </div>
  );
};
export default ConsultaEquipos;
