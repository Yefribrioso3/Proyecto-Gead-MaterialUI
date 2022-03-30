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
import AddIcon from "@material-ui/icons/Add";
import { DataGrid } from "@mui/x-data-grid";
import Axios from "axios";
import { useForm } from "react-hook-form";
import EditAddServInfo from "./components/EditAddServInfo";

import ServiceInformation from "./components/ServiceInformation";
// import EditAddTechInfo from './components/EditAddTechInfo';
import PageHeader from "../components/PageHeader";
import {
  Paper,
  withStyles,
  makeStyles,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
  Grid,
  TextField,
} from "@material-ui/core";
// import useTable from "../components/useTable";
import Controls from "../components/controls/Controls";
import { Add, Delete, Edit, Search, Visibility } from "@material-ui/icons";
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
import { OptionalInfo } from "./components/OptionalInfo";
// import { fontSize } from '@mui/system';
import { globalApi } from "../types/api.types";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { Pagination } from "@material-ui/lab";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { TransferirModal } from "./components/TransferirModal";

//-----------------------------------------------------------------------
const headCells = [
  { id: "Name", label: "Equipo" },
  { id: "bu", label: "BU", disableSorting: true },
  { id: "pais", label: "País", disableSorting: true },
  { id: "area", label: "Area", disableSorting: true },
  { id: "subarea", label: "Subárea", disableSorting: true },
  { id: "planta", label: "Planta", disableSorting: true },
  { id: "equipmentType", label: "Tipo de Equipo", disableSorting: true },
  { id: "acciones", label: "Acciones", disableSorting: true },
];
const StyledTableCell = withStyles((theme) => ({
  head: {
    color:
      theme.palette.type == "dark"
        ? theme.palette.primary.light
        : theme.palette.secondary.light,
  },
  body: {
    fontSize: 14,
    color:
      theme.palette.type == "dark"
        ? theme.palette.primary.light
        : theme.palette.secondary.light,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    color:
      theme.palette.type == "dark"
        ? theme.palette.background.dark
        : theme.palette.background.light,

    backgroundColor: theme.palette.type == "dark" ? "#514A69" : "#FFFFFF",

    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

//---------------------------------------------------------------
let userToken = {};

const ConsultaEquipos = () => {
  const [light, setLight] = useState(false);

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
      alert: {
        main: "#C60055",
      },
    },
  });

  const useStyles = makeStyles((theme) => ({
    pageContent: {
      margin: theme.spacing(2),
      padding: theme.spacing(3),
      borderRadius: "12px",
    },
    searchInput: {
      width: "328px",
      marginRight: "auto",
    },

    toolbar: {
      justifyContent: "spacing",
    },
    button: {
      backgroundColor: theme.palette.secondary,
    },
    fecha: {
      color: theme.palette.primary,
      fontWeight: "300",
      fontSize: 20,
    },

    modalDetail: {
      backgroundColor: theme.palette.type == "dark" ? "#514A69" : "#FFFFFF",
    },
  }));

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

  // ----------------   Request API consultar   --------------------------

  // const [buList, setBuList] = useState([]);

  // const [operationsList, setOperationsList] = useState([])

  // const [paisLis, setPaisLis] = useState([])

  // const [areaList, setAreaList] = useState([])

  // const [subareaList, setSubareaList] = useState([])

  // const [lineTypeList, setLineTypeList] = useState([])

  const [getAllList, setGetAllList] = useState([]);

  const allAquipmentRelation = async () => {
    await Axios.get(`${globalApi}/AllequipmentRelation`).then(
      async (response) => {
        let a = await Promise.all(
          response.data.equipment.map((z) => ({ ...z, id: z.Id_Equipment }))
        );
        setGetAllList(a);
      }
    );
  };
  const [userByToken, setUserByToken] = useState({}); //  -------   Consulta al Api de User
  useEffect(() => {
    allAquipmentRelation();
    const accessToken = localStorage?.token;
    const apiUrl = globalApi;

    const authAxios = Axios.create({
      baseURL: apiUrl,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const getUserByToken = async () => {
      //  -------   Consulta al Api de User
      if (localStorage?.token) {
        await authAxios.get(`/user/user-data`).then((response) => {
          setUserByToken(response.data.data);
        });
      }
    };

    getUserByToken();

    userToken = userByToken;

    // Token( userByToken, setUserByToken );

    // Axios.get('http://localhost:3001/api/readExcel')
    //     .then((response) => {
    //         setReadExcel(response.data)
    //     })

    // Axios.get(`${globalApi}/bu`).then((response) => {
    //     setBuList(response.data.Bu)
    // });

    // Axios.get(`${globalApi}/planta`).then((response) => {
    //     setOperationsList(response.data.planta)
    // });

    // Axios.get(`${globalApi}/countries`).then((response) => {
    //     setPaisLis(response.data.countries)
    // });

    // Axios.get(`${globalApi}/area`).then((response) => {
    //     setAreaList(response.data.area)
    // });

    // Axios.get(`${globalApi}/subArea`).then((response) => {
    //     setSubareaList(response.data.subarea)
    // });

    // Axios.get(`${globalApi}/lineType`).then((response) => {
    //     setLineTypeList(response.data.lineTypes)
    // });

    // peticionGet();
  }, []);

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  // const {
  //     TblContainer,
  //     TblHead,
  //     TblPagination,
  //     recordsAfterPagingAndSorting
  // } = useTable(getAllList, headCells, filterFn);

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
    FinancialInformation: {
      EquipmentValueInUSD: null,
      Activo_fijo: null,
      Soc: null,
      Concatenar: null,
      Clase: null,
      Centro: null,
      CodPM: null,
      Centro_de_costos: null,
      Fecha_de_capitalizacion: null,
      Valor_Adquirido: null,
      Amortizacion_acumulada: null,
      Valor_Contable: null,
      Cantidad: null,
      Moneda: null,
      Tipo: null,
      Screen: null,
      Nom_Clase: null,
      Nom_Ce: null,
      Encontrado_SI_NO: null,
      Estado_del_Activo: null,
      Categoria: null,
      Gerencia: null,
      Codigo_De_Barras: null,
      DI: null,
      SN: null,
      Depreciacion_acumulada_ajustada: null,
      Tasa_Cambio_contra_dolar: null,
      Latitud: null,
      Longitud: null,
      Period_Time: null,
      Id_Equipment: null,
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
      OptionalTechInfo: {
        Id_OptionalTechInfo: "",
        NominalCapacity: "",
        YearOfConstruction: "",
        EquipmentCurrentConditionsComments: "",
        NotesAboutEquipment: "",
        AssambledDissambled: "",
        PlantTechnicalInformationContact: "",
        PlantFinancialInformationContact: "",
        Width: "",
        Height: "",
        Depth: "",
        ConstructionMaterials: "",
        ExternalCoating: "",
        CommunicationProtocol: "",
        MeasurementVariable: "",
        ElectricalConsumption: "",
        ProtectionGrade: "",
        SanitaryGrade: "",
        AvailableWarranty: "",
        RemainingWarrantyYears: "",
        PeripheralDevicesAccesories: "",
        WorkingHours: "",
        LaboratoryEquipment: "",
        Id_TechnicalSpecification: "",
      },
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

  const [optionalTechInfo, setOptionalTechInfo] = useState({
    Id_OptionalTechInfo: null,
    NominalCapacity: "",
    YearOfConstruction: "",
    EquipmentCurrentConditionsComments: "",
    NotesAboutEquipment: "",
    AssambledDissambled: "",
    PlantTechnicalInformationContact: "",
    PlantFinancialInformationContact: "",
    Width: "",
    Height: "",
    Depth: "",
    ConstructionMaterials: "",
    ExternalCoating: "",
    CommunicationProtocol: "",
    MeasurementVariable: "",
    ElectricalConsumption: "",
    ProtectionGrade: "",
    SanitaryGrade: "",
    AvailableWarranty: "",
    RemainingWarrantyYears: "",
    PeripheralDevicesAccesories: "",
    WorkingHours: "",
    LaboratoryEquipment: "",
    Id_TechnicalSpecification: null,
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
    setOptionalTechInfo(elemento.TechnicalSpecification.OptionalTechInfo);
    setServicesInformation(elemento.ServicesInformation);
    setareas(elemento.Procedencia.areas);

    setSubArea(elemento.Procedencia.areas.SubArea);
    setOperations(elemento.Procedencia.areas.operations);
    setCountries(elemento.Procedencia.areas.operations.countries);
    setBu(elemento.Procedencia.areas.operations.countries.bu);
    setLine(elemento.Procedencia.line);
    setLineTypes(elemento.Procedencia.line.lineTypes);

    setEquipoSeleccionado(elemento);

    caso === "Editar" ? setModalEditar(true) : setModalEliminar(true); //Funcion para abrir el modal
  };

  // ----------------            HANDLE CHANGE       -------------------

  const handleChange = (e) => {
    //Funcion para capturar lo que escriba el usuario
    const { name, value } = e.target;

    setEquipoSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setTechnicalInformation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangeOptionalInfo = (e) => {
    const { name, value } = e.target;

    setOptionalTechInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangeServicesInformation = (e) => {
    const { name, value } = e.target;

    setServicesInformation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangeAreas = (e) => {
    const { name, value } = e.target;

    setareas((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangeSubArea = (e) => {
    const { name, value } = e.target;

    setSubArea((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangeOperations = (e) => {
    const { name, value } = e.target;

    setOperations((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangeCountries = (e) => {
    const { name, value } = e.target;

    setCountries((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangeBu = (e) => {
    const { name, value } = e.target;

    setBu((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangeLine = (e) => {
    const { name, value } = e.target;

    setLine((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangeLineTypes = (e) => {
    const { name, value } = e.target;

    setLineTypes((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

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
    // equipo.TechnicalSpecification.newTechnicalSpecification = equipoSeleccionado.TechnicalSpecification.newTechnicalSpecification
    equipo.TechnicalSpecification.OptionalTechInfo = optionalTechInfo;
    equipo.ServicesInformation = servicesInformation;
    // equipo.ServicesInformation.newServicesInformation = equipoSeleccionado.ServicesInformation.newServicesInformation
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
        // equipo.TechnicalSpecification.newTechnicalSpecification = equipoSeleccionado.TechnicalSpecification.newTechnicalSpecification
        equipo.TechnicalSpecification.OptionalTechInfo = optionalTechInfo;

        equipo.ServicesInformation = servicesInformation;
        // equipo.ServicesInformation.newServicesInformation = equipoSeleccionado.ServicesInformation.newServicesInformation

        equipo.Procedencia.Id_Areas = areas.Id_Areas;
        equipo.Procedencia.Id_Line = line.Id_Line;
      }
    });

    //  Actualizar datos
    await putEquipment(equipo);

    // //  Actualizar todas las inforamciones tecnicas en el DB
    // equipo.TechnicalSpecification.newTechnicalSpecification.map(async NTS => {
    //     await updateNewTechSpec(NTS);
    // });
    // //  Actualizar todas informaciones de servicios en el DB
    // equipo.ServicesInformation.newServicesInformation.map(async NSI => {
    //     await updateNewServInfo(NSI);
    // });

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
      `${globalApi}/bu/${Equipo.Procedencia.areas.operations.countries.bu.Id_BU}`,
      {
        Name: Equipo.Procedencia.areas.operations.countries.bu.Name,
      }
    );

    await Axios.put(
      `${globalApi}/countries/${Equipo.Procedencia.areas.operations.countries.Id_Countries}`,
      {
        Name: Equipo.Procedencia.areas.operations.countries.Name,
        Id_BU: Equipo.Procedencia.areas.operations.countries.bu.Id_BU,
      }
    );

    await Axios.put(
      `${globalApi}/planta/${Equipo.Procedencia.areas.operations.Id_Operations}`,
      {
        Name: Equipo.Procedencia.areas.operations.Name,
        Id_Countries:
          Equipo.Procedencia.areas.operations.countries.Id_Countries,
      }
    );

    await Axios.put(`${globalApi}/area/${Equipo.Procedencia.areas.Id_Areas}`, {
      Name: Equipo.Procedencia.areas.Name,
      Id_Operations: Equipo.Procedencia.areas.Id_Operations,
    });

    await Axios.put(
      `${globalApi}/SubArea/${Equipo.Procedencia.areas.SubArea.Id_SubAreas}`,
      {
        Name: Equipo.Procedencia.areas.SubArea.Name,
        Id_Areas: Equipo.Procedencia.areas.Id_Areas,
      }
    );

    await Axios.put(
      `${globalApi}/lineType/${Equipo.Procedencia.line.lineTypes.Id_LineTypes}`,
      {
        Name: Equipo.Procedencia.line.lineTypes.Name,
      }
    );

    await Axios.put(`${globalApi}/line/${Equipo.Procedencia.line.Id_Line}`, {
      number: Equipo.Procedencia.line.number,
      Id_LineTypes: Equipo.Procedencia.line.lineTypes.Id_LineTypes,
    });

    await Axios.put(`${globalApi}/equipment/${Equipo.Id_Equipment}`, {
      Name: Equipo.Name,
      code: Equipo.code,
      img: Equipo.img,
      Id_Procedencia: Equipo.Id_Procedencia,
      Estado: Equipo.Estado,
    });

    await Axios.put(
      `${globalApi}/servicesInformation/${Equipo.ServicesInformation.Id_ServicesInformation}`,
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
      `${globalApi}/technicalSpecification/${Equipo.TechnicalSpecification.Id_TechnicalSpecification}`,
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
    );

    await Axios.put(
      `${globalApi}/optionalTechInfo/${Equipo.TechnicalSpecification.Id_TechnicalSpecification}`,
      {
        NominalCapacity:
          Equipo.TechnicalSpecification.OptionalTechInfo.NominalCapacity,
        YearOfConstruction:
          Equipo.TechnicalSpecification.OptionalTechInfo.YearOfConstruction,
        EquipmentCurrentConditionsComments:
          Equipo.TechnicalSpecification.OptionalTechInfo
            .EquipmentCurrentConditionsComments,
        NotesAboutEquipment:
          Equipo.TechnicalSpecification.OptionalTechInfo.NotesAboutEquipment,
        AssambledDissambled:
          Equipo.TechnicalSpecification.OptionalTechInfo.AssambledDissambled,
        PlantTechnicalInformationContact:
          Equipo.TechnicalSpecification.OptionalTechInfo
            .PlantTechnicalInformationContact,
        PlantFinancialInformationContact:
          Equipo.TechnicalSpecification.OptionalTechInfo
            .PlantFinancialInformationContact,
        Width: Equipo.TechnicalSpecification.OptionalTechInfo.Width,
        Height: Equipo.TechnicalSpecification.OptionalTechInfo.Height,
        Depth: Equipo.TechnicalSpecification.OptionalTechInfo.Depth,
        ConstructionMaterials:
          Equipo.TechnicalSpecification.OptionalTechInfo.ConstructionMaterials,
        ExternalCoating:
          Equipo.TechnicalSpecification.OptionalTechInfo.ExternalCoating,
        CommunicationProtocol:
          Equipo.TechnicalSpecification.OptionalTechInfo.CommunicationProtocol,
        MeasurementVariable:
          Equipo.TechnicalSpecification.OptionalTechInfo.MeasurementVariable,
        ElectricalConsumption:
          Equipo.TechnicalSpecification.OptionalTechInfo.ElectricalConsumption,
        ProtectionGrade:
          Equipo.TechnicalSpecification.OptionalTechInfo.ProtectionGrade,
        SanitaryGrade:
          Equipo.TechnicalSpecification.OptionalTechInfo.SanitaryGrade,
        AvailableWarranty:
          Equipo.TechnicalSpecification.OptionalTechInfo.AvailableWarranty,
        RemainingWarrantyYears:
          Equipo.TechnicalSpecification.OptionalTechInfo.RemainingWarrantyYears,
        PeripheralDevicesAccesories:
          Equipo.TechnicalSpecification.OptionalTechInfo
            .PeripheralDevicesAccesories,
        WorkingHours:
          Equipo.TechnicalSpecification.OptionalTechInfo.WorkingHours,
        LaboratoryEquipment:
          Equipo.TechnicalSpecification.OptionalTechInfo.LaboratoryEquipment,
        Id_TechnicalSpecification:
          Equipo.TechnicalSpecification.Id_TechnicalSpecification,
      }
    ).then(() => {
      alert("Successful Updated");
    });
  };

  // const updateNewServInfo = async (NSI) => {
  //     Axios.put(`${globalApi}/newServInfo/${NSI.Id_NewServInfo}`, {
  //         Id_ServicesInformation: NSI.Id_ServicesInformation,
  //         Value: NSI.Value,
  //         Name: NSI.Name
  //     })
  // };

  // const updateNewTechSpec = async (NTS) => {
  //     Axios.put(`${globalApi}/NewTechInfo/${NTS.Id_NewTechSpec}`, {
  //         Id_TechnicalSpecification: NTS.Id_TechnicalSpecification,
  //         Name: NTS.Name,
  //         Value: NTS.Value
  //     })
  // };

  //------------------        ELIMINAR EQUIPO     ---------------------------------

  //Filtramos todos los datos que no contengan el Id seleccionado, dejamos fuera el no seleccionado y guardamos los demas
  // const updateNewServInfo = async (NSI) => {
  //     Axios.put(`${globalApi}/newServInfo/${NSI.Id_NewServInfo}`, {
  //         Id_ServicesInformation: NSI.Id_ServicesInformation,
  //         Value: NSI.Value,
  //         Name: NSI.Name
  //     })
  // };

  // const updateNewTechSpec = async (NTS) => {
  //     Axios.put(`${globalApi}/NewTechInfo/${NTS.Id_NewTechSpec}`, {
  //         Id_TechnicalSpecification: NTS.Id_TechnicalSpecification,
  //         Name: NTS.Name,
  //         Value: NTS.Value
  //     })
  // };

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
    await Axios.put(`${globalApi}/equipment/${Equipo.Id_Equipment}`, {
      Name: Equipo.Name,
      code: Equipo.code,
      img: Equipo.img,
      Id_Procedencia: Equipo.Id_Procedencia,
      Estado: Equipo.Estado,
    });
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
      FinancialInformation: {
        EquipmentValueInUSD: null,
        Activo_fijo: null,
        Soc: null,
        Concatenar: null,
        Clase: null,
        Centro: null,
        CodPM: null,
        Centro_de_costos: null,
        Fecha_de_capitalizacion: null,
        Valor_Adquirido: null,
        Amortizacion_acumulada: null,
        Valor_Contable: null,
        Cantidad: null,
        Moneda: null,
        Tipo: null,
        Screen: null,
        Nom_Clase: null,
        Nom_Ce: null,
        Encontrado_SI_NO: null,
        Estado_del_Activo: null,
        Categoria: null,
        Gerencia: null,
        Codigo_De_Barras: null,
        DI: null,
        SN: null,
        Depreciacion_acumulada_ajustada: null,
        Tasa_Cambio_contra_dolar: null,
        Latitud: null,
        Longitud: null,
        Period_Time: null,
        Id_Equipment: null,
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
        OptionalTechInfo: {
          Id_OptionalTechInfo: null,
          NominalCapacity: null,
          YearOfConstruction: null,
          EquipmentCurrentConditionsComments: null,
          NotesAboutEquipment: null,
          AssambledDissambled: null,
          PlantTechnicalInformationContact: null,
          PlantFinancialInformationContact: null,
          Width: null,
          Height: null,
          Depth: null,
          ConstructionMaterials: null,
          ExternalCoating: null,
          CommunicationProtocol: null,
          MeasurementVariable: null,
          ElectricalConsumption: null,
          ProtectionGrade: null,
          SanitaryGrade: null,
          AvailableWarranty: null,
          RemainingWarrantyYears: null,
          PeripheralDevicesAccesories: null,
          WorkingHours: null,
          LaboratoryEquipment: null,
          Id_TechnicalSpecification: null,
        },
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
    setOptionalTechInfo({
      Id_OptionalTechInfo: null,
      NominalCapacity: "",
      YearOfConstruction: "",
      EquipmentCurrentConditionsComments: "",
      NotesAboutEquipment: "",
      AssambledDissambled: "",
      PlantTechnicalInformationContact: "",
      PlantFinancialInformationContact: "",
      Width: "",
      Height: "",
      Depth: "",
      ConstructionMaterials: "",
      ExternalCoating: "",
      CommunicationProtocol: "",
      MeasurementVariable: "",
      ElectricalConsumption: "",
      ProtectionGrade: "",
      SanitaryGrade: "",
      AvailableWarranty: "",
      RemainingWarrantyYears: "",
      PeripheralDevicesAccesories: "",
      WorkingHours: "",
      LaboratoryEquipment: "",
      Id_TechnicalSpecification: null,
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

    // valorInsertar.Id_Equipment = getAllList.length + 1;
    valorInsertar.Id_Equipment = uuidv4();

    // bu.Id_BU = uuidv4();
    bu.Id_BU = valorInsertar.Id_Equipment;

    // countries.Id_Countries = uuidv4();
    countries.Id_Countries = valorInsertar.Id_Equipment;
    countries.Id_BU = bu.Id_BU;

    // operations.Id_Operations = uuidv4();
    operations.Id_Operations = valorInsertar.Id_Equipment;
    operations.Id_Countries = countries.Id_Countries;

    // areas.Id_Areas = uuidv4();
    areas.Id_Areas = valorInsertar.Id_Equipment;
    areas.Id_Operations = operations.Id_Operations;

    // SubArea.Id_SubAreas = uuidv4();
    SubArea.Id_SubAreas = valorInsertar.Id_Equipment;
    SubArea.Id_Areas = areas.Id_Areas;

    // lineTypes.Id_LineTypes = uuidv4();
    lineTypes.Id_LineTypes = valorInsertar.Id_Equipment;

    // line.Id_Line = uuidv4();
    line.Id_Line = valorInsertar.Id_Equipment;
    line.Id_LineTypes = lineTypes.Id_LineTypes;

    valorInsertar.id = valorInsertar.Id_Equipment;
    technicalInformation.Id_TechnicalSpecification = valorInsertar.Id_Equipment;
    optionalTechInfo.Id_OptionalTechInfo =
      technicalInformation.Id_TechnicalSpecification;
    optionalTechInfo.Id_TechnicalSpecification =
      technicalInformation.Id_TechnicalSpecification;

    // servicesInformation.Id_ServicesInformation = uuidv4();
    // valorInsertar.Procedencia.Id_Procedencia = uuidv4();

    servicesInformation.Id_ServicesInformation = valorInsertar.Id_Equipment;
    valorInsertar.Procedencia.Id_Procedencia = valorInsertar.Id_Equipment;
    valorInsertar.Procedencia.Id_Line = line.Id_Line;
    valorInsertar.Procedencia.Id_Areas = areas.Id_Areas;

    valorInsertar.Id_Procedencia = valorInsertar.Procedencia.Id_Procedencia;

    valorInsertar.Name = equipoSeleccionado.Name;
    valorInsertar.code = equipoSeleccionado.code;
    valorInsertar.img = equipoSeleccionado.img;
    valorInsertar.Estado = true;

    valorInsertar.TechnicalSpecification = technicalInformation;
    valorInsertar.TechnicalSpecification.OptionalTechInfo = optionalTechInfo;

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
    valorInsertar.FinancialInformation.Id_Equipment =
      valorInsertar.Id_Equipment;

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

    console.log(getAllList);

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
    await sendOptionalTechInfo(valorInsertar);
    await sendNewTechnicalSpec(valorInsertar);
  };

  // -----------------------------        CREAR / INSERTAR NUEVO EQUIPO      ---------------------------------------------

  const sendBu = async (valorInsertar) => {
    await Axios.post(`${globalApi}/bu`, {
      Id_BU: valorInsertar.Procedencia.areas.operations.countries.bu.Id_BU,
      Name: valorInsertar.Procedencia.areas.operations.countries.bu.Name,
    });
    // .then(() => {
    //     alert("Successful insert");
    // });
  };

  const sendCountry = async (valorInsertar) => {
    await Axios.post(`${globalApi}/countries`, {
      Id_Countries:
        valorInsertar.Procedencia.areas.operations.countries.Id_Countries,
      Name: valorInsertar.Procedencia.areas.operations.countries.Name,
      Id_BU: valorInsertar.Procedencia.areas.operations.countries.Id_BU,
    });
  };

  const sendOperations = async (valorInsertar) => {
    await Axios.post(`${globalApi}/planta`, {
      Id_Operations: valorInsertar.Procedencia.areas.operations.Id_Operations,
      Name: valorInsertar.Procedencia.areas.operations.Name,
      Id_Countries: valorInsertar.Procedencia.areas.operations.Id_Countries,
    });
  };

  const sendAreas = async (valorInsertar) => {
    await Axios.post(`${globalApi}/area`, {
      Id_Areas: valorInsertar.Procedencia.areas.Id_Areas,
      Name: valorInsertar.Procedencia.areas.Name,
      Id_Operations: valorInsertar.Procedencia.areas.Id_Operations,
    });
  };

  const sendSubArea = async (valorInsertar) => {
    await Axios.post(`${globalApi}/SubArea`, {
      Id_SubAreas: valorInsertar.Procedencia.areas.SubArea.Id_SubAreas,
      Name: valorInsertar.Procedencia.areas.SubArea.Name,
      Id_Areas: valorInsertar.Procedencia.areas.SubArea.Id_Areas,
    });
  };

  const sendline = async (valorInsertar) => {
    await Axios.post(`${globalApi}/line`, {
      Id_Line: valorInsertar.Procedencia.line.Id_Line,
      number: valorInsertar.Procedencia.line.number,
      Id_LineTypes: valorInsertar.Procedencia.line.Id_LineTypes,
    });
  };

  const sendlineType = async (valorInsertar) => {
    await Axios.post(`${globalApi}/lineType`, {
      Id_LineTypes: valorInsertar.Procedencia.line.lineTypes.Id_LineTypes,
      Name: valorInsertar.Procedencia.line.lineTypes.Name,
    });
  };

  const sendProcedencia = async (valorInsertar) => {
    await Axios.post(`${globalApi}/procedencia`, {
      Id_Procedencia: valorInsertar.Id_Procedencia,
      Id_Line: valorInsertar.Procedencia.line.Id_Line,
      Id_Areas: valorInsertar.Procedencia.areas.Id_Areas,
    });
  };

  const sendEquipment = async (valorInsertar) => {
    await Axios.post(`${globalApi}/equipment`, {
      Id_Equipment: valorInsertar.Id_Equipment,
      Name: valorInsertar.Name,
      code: valorInsertar.code,
      Id_Procedencia: valorInsertar.Procedencia.Id_Procedencia,
      Estado: valorInsertar.Estado,
      img: valorInsertar.img,
    });
  };

  const sendSercivesInformation = async (valorInsertar) => {
    await Axios.post(`${globalApi}/servicesInformation`, {
      Id_ServicesInformation:
        valorInsertar.ServicesInformation.Id_ServicesInformation,
      DateOfInstallation: valorInsertar.ServicesInformation.DateOfInstallation,
      DateOfDesintallation:
        valorInsertar.ServicesInformation.DateOfDesintallation,
      DesuseReason: valorInsertar.ServicesInformation.DesuseReason,
      DesinstallationReason:
        valorInsertar.ServicesInformation.DesinstallationReason,
      ProcurementOrder: valorInsertar.ServicesInformation.ProcurementOrder,
      Id_Equipment: valorInsertar.Id_Equipment,
    });
  };

  const sendNewServicesInformation = async (valorInsertar) => {
    valorInsertar.ServicesInformation.newServicesInformation.map(
      async (NSI) => {
        await Axios.post(`${globalApi}/newServInfo`, {
          Id_NewServInfo: NSI.Id_NewServInfo,
          Id_ServicesInformation:
            valorInsertar.ServicesInformation.Id_ServicesInformation,
          Name: NSI.Name,
          Value: NSI.Value,
        });

        await Axios.post(`${globalApi}/selectNewServInfo`, {
          Id_SelectNewServInfo: NSI.SelectNewServicesInfo.Id_SelectNewServInfo,
          Id_ServicesInformation:
            valorInsertar.ServicesInformation.Id_ServicesInformation,
          Id_NewServInfo: NSI.Id_NewServInfo,
        });
      }
    );
  };

  const sendTechnicalSpecification = async (valorInsertar) => {
    await Axios.post(`${globalApi}/technicalSpecification`, {
      Id_TechnicalSpecification:
        valorInsertar.TechnicalSpecification.Id_TechnicalSpecification,
      EquipmentType: valorInsertar.TechnicalSpecification.EquipmentType,
      CurrentConditions: valorInsertar.TechnicalSpecification.CurrentConditions,
      Weight: valorInsertar.TechnicalSpecification.Weight,
      OEM: valorInsertar.TechnicalSpecification.OEM,
      Description: valorInsertar.TechnicalSpecification.Description,
      ModelNumber: valorInsertar.TechnicalSpecification.ModelNumber,
      SerialNumber: valorInsertar.TechnicalSpecification.SerialNumber,
      vendor: valorInsertar.TechnicalSpecification.vendor,
      currentWorking: valorInsertar.TechnicalSpecification.currentWorking,
      Id_Equipment: valorInsertar.Id_Equipment,
    });
  };

  const sendOptionalTechInfo = async (valorInsertar) => {
    await Axios.post(`${globalApi}/optionalTechInfo`, {
      Id_OptionalTechInfo:
        valorInsertar.TechnicalSpecification.OptionalTechInfo
          .Id_OptionalTechInfo,
      NominalCapacity:
        valorInsertar.TechnicalSpecification.OptionalTechInfo.NominalCapacity,
      YearOfConstruction:
        valorInsertar.TechnicalSpecification.OptionalTechInfo
          .YearOfConstruction,
      EquipmentCurrentConditionsComments:
        valorInsertar.TechnicalSpecification.OptionalTechInfo
          .EquipmentCurrentConditionsComments,
      NotesAboutEquipment:
        valorInsertar.TechnicalSpecification.OptionalTechInfo
          .NotesAboutEquipment,
      AssambledDissambled:
        valorInsertar.TechnicalSpecification.OptionalTechInfo
          .AssambledDissambled,
      PlantTechnicalInformationContact:
        valorInsertar.TechnicalSpecification.OptionalTechInfo
          .PlantTechnicalInformationContact,
      PlantFinancialInformationContact:
        valorInsertar.TechnicalSpecification.OptionalTechInfo
          .PlantFinancialInformationContact,
      Width: valorInsertar.TechnicalSpecification.OptionalTechInfo.Width,
      Height: valorInsertar.TechnicalSpecification.OptionalTechInfo.Height,
      Depth: valorInsertar.TechnicalSpecification.OptionalTechInfo.Depth,
      ConstructionMaterials:
        valorInsertar.TechnicalSpecification.OptionalTechInfo
          .ConstructionMaterials,
      ExternalCoating:
        valorInsertar.TechnicalSpecification.OptionalTechInfo.ExternalCoating,
      CommunicationProtocol:
        valorInsertar.TechnicalSpecification.OptionalTechInfo
          .CommunicationProtocol,
      MeasurementVariable:
        valorInsertar.TechnicalSpecification.OptionalTechInfo
          .MeasurementVariable,
      ElectricalConsumption:
        valorInsertar.TechnicalSpecification.OptionalTechInfo
          .ElectricalConsumption,
      ProtectionGrade:
        valorInsertar.TechnicalSpecification.OptionalTechInfo.ProtectionGrade,
      SanitaryGrade:
        valorInsertar.TechnicalSpecification.OptionalTechInfo.SanitaryGrade,
      AvailableWarranty:
        valorInsertar.TechnicalSpecification.OptionalTechInfo.AvailableWarranty,
      RemainingWarrantyYears:
        valorInsertar.TechnicalSpecification.OptionalTechInfo
          .RemainingWarrantyYears,
      PeripheralDevicesAccesories:
        valorInsertar.TechnicalSpecification.OptionalTechInfo
          .PeripheralDevicesAccesories,
      WorkingHours:
        valorInsertar.TechnicalSpecification.OptionalTechInfo.WorkingHours,
      LaboratoryEquipment:
        valorInsertar.TechnicalSpecification.OptionalTechInfo
          .LaboratoryEquipment,
      Id_TechnicalSpecification:
        valorInsertar.TechnicalSpecification.OptionalTechInfo
          .Id_TechnicalSpecification,
    });
  };

  const sendNewTechnicalSpec = async (valorInsertar) => {
    valorInsertar.TechnicalSpecification.newTechnicalSpecification.map(
      async (NTS) => {
        await Axios.post(`${globalApi}/NewTechInfo`, {
          Id_NewTechSpec: NTS.Id_NewTechSpec,
          Id_TechnicalSpecification:
            valorInsertar.TechnicalSpecification.Id_TechnicalSpecification,
          Name: NTS.Name,
          Value: NTS.Value,
        });

        await Axios.post(`${globalApi}/selectNewTechSpec`, {
          Id_SelectNewTechSpec: NTS.SelectNewTechSpec.Id_SelectNewTechSpec,
          Id_TechnicalSpecification:
            valorInsertar.TechnicalSpecification.Id_TechnicalSpecification,
          Id_NewTechSpec: NTS.Id_NewTechSpec,
        });
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

    await sendNewTechnicalSpecEDITMODAL(newTechnicalSpec);
    e.target.reset();
  };

  const sendNewTechnicalSpecEDITMODAL = async (valorInsertar) => {
    await Axios.post(`${globalApi}/NewTechInfo`, {
      Id_NewTechSpec: valorInsertar.Id_NewTechSpec,
      Id_TechnicalSpecification: valorInsertar.Id_TechnicalSpecification,
      Name: valorInsertar.Name,
      Value: valorInsertar.Value,
    });

    await Axios.post(`${globalApi}/selectNewTechSpec`, {
      Id_SelectNewTechSpec:
        valorInsertar.SelectNewTechSpec.Id_SelectNewTechSpec,
      Id_TechnicalSpecification: valorInsertar.Id_TechnicalSpecification,
      Id_NewTechSpec: valorInsertar.Id_NewTechSpec,
    });
  };

  //  -------------------------------------------------------     ELIMINAR AD TECHNICAL INFO       --------------------------

  const eliminarAddTechInfo = async (id) => {
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
    await Axios.delete(`${globalApi}/selectNewTechSpec/${idSelectNewTech}`);

    await Axios.delete(`${globalApi}/NewTechInfo/${id}`).then((id) => {
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

  //------------------------------------------------------------

  const classes = useStyles();

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
              // x.TechnicalSpecification.OEM.toLowerCase().includes(target.value.toLowerCase()) ||
              x.TechnicalSpecification.SerialNumber.toLowerCase().includes(
                target.value.toLowerCase()
              ) ||
              x.TechnicalSpecification.EquipmentType.toLowerCase().includes(
                target.value.toLowerCase()
              )
          );
      },
    });

    let TotalEncontrado = filterFn.fn(getAllList).length;
    setTotalEncontrados(TotalEncontrado);
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
        setModalInsertarExcel(true);
        setItem(d);
      });
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

  const columns = [
    {
      field: "Name",
      headerName: "Equipo",
      flex: 1,
      width: 400,
      headerClassName: "header",
      fontWeight: 500,
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.primary.dark,
      },

      renderCell: (params) => {
        return (
          <div
            style={{
              borderBottom: "0",
              color:
                theme.palette.type == "dark"
                  ? theme.palette.primary
                  : theme.palette.secondary.light,
              fontWeight: 500,
            }}
          >
            {params.row.Name}
          </div>
        );
      },
    },
    // {
    //     field: "serial",
    //     headerName: "Número de serie",
    //     width: 180,
    //     valueGetter: (params) => {
    //         return params.row.TechnicalSpecification.SerialNumber;
    //     }
    // },
    {
      field: "bu",
      headerName: "BU",
      // flex: 1,
      width: 150,
      valueGetter: (params) => {
        return params.row.Procedencia.areas.operations.countries.bu.Name;
      },
      /* width: 150, */
    },
    {
      field: "country",
      headerName: "País",
      width: 150,
      valueGetter: (params) => {
        return params.row.Procedencia.areas.operations.countries.Name;
      },
    },
    {
      field: "plant",
      headerName: "Planta",

      width: 210,
      valueGetter: (params) => {
        return params.row.Procedencia.areas.operations.Name;
      },
    },
    {
      field: "area",
      headerName: "Área",
      width: 210,
      valueGetter: (params) => {
        return params.row.Procedencia.areas.Name;
      },
    },
    // {
    //     field: "subarea",
    //     headerName: "Subárea",
    //     width: 210,
    //     valueGetter: (params) => {
    //         return params.row.Procedencia.areas.SubArea.Name
    //     },
    // },

    // {
    //     field: "equipType",
    //     headerName: "Tipo de Equipo",
    //     width: 210,
    //     valueGetter: (params) => {
    //         return params.row.TechnicalSpecification.EquipmentType
    //     },
    // },
    {
      field: "actions",
      headerName: "Acciones",
      width: 210,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <div className="d-flex justify-content-between">
          <div
            onClick={() => seleccionarEquipo(params.row, "Editar")}
            component="span"
          >
            <IconButton
              style={{
                color:
                  theme.palette.type == "dark"
                    ? theme.palette.primary.dark
                    : theme.palette.secondary.dark,
                fontWeight: 500,
              }}
              aria-label="edit"
              component="span"
            >
              <Visibility />
            </IconButton>
          </div>

          {userByToken?.roleId === 1 ? (
            <div
              aria-label="delete"
              onClick={() => seleccionarEquipo(params.row, "Eliminar")}
              component="span"
            >
              <IconButton
                style={{
                  fontWeight: 500,
                  color: theme.palette.alert.main,
                }}
                aria-label="delete"
              >
                <Delete />
              </IconButton>
            </div>
          ) : (
            <div aria-label="delete" component="span">
              <IconButton
                style={{
                  fontWeight: 500,
                  color: theme.palette.alert.main,
                }}
                disabled
                aria-label="delete"
              >
                <Delete />
              </IconButton>
            </div>
          )}
        </div>
      ),
    },
  ];

  const [tranferirModal, settranferirModal] = useState(false);

  return (
    <ThemeProvider theme={theme}>
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
          light={light}
        />
        <Header setLight={setLight} light={light} userByToken={userByToken} />

        <Paper
          light={light}
          className={classes.pageContent}
          style={{
            backgroundColor:
              theme.palette.type == "dark" ? "#514A69" : "#FFFFFF",
          }}
        >
          {/* <EmployeeForm /> */}
          <Toolbar className="align-items-center">
            <Controls.txt
              label="Search Equipment"
              id="outlined-basic"
              variant="outlined"
              className={classes.searchInput}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Search edge="end" />
                  </InputAdornment>
                ),
              }}
              onChange={handleSearch}
            />

            {userByToken?.roleId === 1 ? (
              <Controls.Button
                variant="contained"
                size="large"
                color="secondary"
                startIcon={<Add style={{ fontSize: 16, fontWeight: "800" }} />}
                onClick={() => abrirModalInsertar()}
                style={{ fontSize: 16, fontWeight: "600" }}
                text={"Nuevo"}
              ></Controls.Button>
            ) : (
              <Controls.Button
                disabled
                variant="contained"
                size="large"
                color="secondary"
                startIcon={<Add style={{ fontSize: 16, fontWeight: "800" }} />}
                style={{ fontSize: 16, fontWeight: "600" }}
                text={"Nuevo"}
              ></Controls.Button>
            )}

            {/* -----------------------  Boton para insertar datos desde Excel   ----------------------------------- */}
          </Toolbar>

          <div
            style={{
              height: 805,
              width: "100%",
              border: "0",
              color:
                theme.palette.type == "dark"
                  ? theme.palette.background.dark
                  : theme.palette.background.light,
              backgroundColor:
                theme.palette.type == "dark"
                  ? "#514A69"
                  : theme.palette.background.light,
              "&:nth-of-type(odd)": {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
          >
            <DataGrid
              // sx={{ m: 2 }}
              lght={light}
              rows={filterFn.fn(getAllList)}
              // style={{ color:"blue"}}
              columns={columns}
              pageSize={13}
              rowsPerPageOptions={[13]}
              style={{
                border: "0",
                borderBottom: "0",
                color:
                  theme.palette.type == "dark"
                    ? theme.palette.primary.light
                    : theme.palette.primary.dark,
                "&:nth-of-type(odd)": {
                  backgroundColor: theme.palette.primary.dark,
                },
              }}
            />
          </div>
          <Toolbar className={"mt-0"}>
            <PageHeader
              contador={`${totalEncontrados} results`}
              style={{ fontSize: 12 }}
            />
            <Grid item sm></Grid>
            <Grid item sm></Grid>

            <PageHeader subTitle="Date Updated:" />

            <PageHeader subTitle={fecha} />

            <Grid item sm></Grid>
            <Grid item sm></Grid>
            <Grid item sm></Grid>
          </Toolbar>
        </Paper>

        {/* -----------------------------       FOOTER      ---------------------------- */}
        <footer className="footer mt-5 ml-5 p-4">
          <div className="d-flex justify-content-end align-items-center">
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

        <Modal
          isOpen={modalEditar}
          className={`modalForm ${theme.palette.type}`}
          style={{ maxWidth: 800 }}
        >
          <ModalHeader>
            <div>
              <h1
                style={{
                  color:
                    theme.palette.type == "dark"
                      ? theme.palette.primary.light
                      : theme.palette.secondary,
                }}
              >
                Editar Registro
              </h1>
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
                      setEditingTechInfo={setEditingTechInfo}
                      equipoSeleccionado={equipoSeleccionado}
                      editRow={editRow}
                      setEditing={setEditing}
                      setEditingServiceInfo={setEditingServiceInfo}
                      servicesInformation={servicesInformation}
                      handleChangeServicesInformation={
                        handleChangeServicesInformation
                      }
                      seteditingNewServInfo={seteditingNewServInfo}
                      setnewservInformation={setnewservInformation}
                      light={light}
                    />
                  </>
                ) : (
                  // ------------------------     Technical Information   -------------------------------
                  <>
                    <div className="p-3">
                      <h4
                        style={{
                          color:
                            theme.palette.type == "dark"
                              ? theme.palette.primary.light
                              : theme.palette.secondary,
                        }}
                      >
                        Información técnica
                      </h4>
                    </div>

                    <ModalBody className="row animate__animated animate__fadeIn">
                      <FormGroup className="col-4">
                        <label>Equipo:</label>
                        <input
                          className="form-control"
                          type="text text-align=center"
                          name="Name"
                          value={equipoSeleccionado && equipoSeleccionado.Name}
                          onChange={handleChange}
                        />
                      </FormGroup>

                      <FormGroup className="col-4">
                        <label>Trabajo actual:</label>
                        <select
                          className="form-select "
                          style={{ margin: "0px !important" }}
                          name="currentWorking"
                          value={
                            technicalInformation &&
                            technicalInformation.currentWorking
                          }
                          onChange={handleChange}
                        >
                          <option value="">Seleccione Trabajo actual</option>
                          <option value="Installed and is working">
                            Instalado y funcionando
                          </option>
                          <option value="Installed and is not working">
                            Instalado y no funciona
                          </option>
                          <option value="Not Installed and is not working">
                            No esta instalado
                          </option>
                        </select>
                      </FormGroup>

                      <FormGroup className="col-4">
                        <label htmlFor="CurrentConditions">
                          Condición actual:
                        </label>
                        <select
                          className="form-select "
                          name="CurrentConditions"
                          value={
                            technicalInformation &&
                            technicalInformation.CurrentConditions
                          }
                          onChange={handleChange}
                        >
                          <option value="">Seleccione Condición actual</option>
                          <option value="Excellent">Excelente</option>
                          <option value="Good">Bueno</option>
                          <option value="Regular">Regular</option>
                          <option value="Bad">Malo</option>
                          <option value="To be disposed">
                            Para ser desechado
                          </option>
                        </select>
                      </FormGroup>

                      <FormGroup className="col-4">
                        <label>Tipo de equipo:</label>
                        {/* <input
                                                    className="form-control"
                                                    type="text text-align=center"
                                                    name="EquipmentType"
                                                    value={technicalInformation && technicalInformation.EquipmentType}
                                                    onChange={handleChange} /> */}

                        <select
                          className="form-select "
                          name="EquipmentType"
                          value={
                            technicalInformation &&
                            technicalInformation.EquipmentType
                          }
                          onChange={handleChange}
                        >
                          <option value="">Select Equipment Type</option>
                          <option value="Automation / Electronic">
                            Automatización / Electrónico
                          </option>
                          <option value="Electrical">Electrico</option>
                          <option value="Mechanical">Mecánico</option>
                        </select>
                      </FormGroup>

                      <FormGroup className="col-4">
                        <label>Número de serial:</label>
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
                        <label>Número de modelo:</label>
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
                        <label>Peso:</label>
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
                          value={
                            technicalInformation && technicalInformation.OEM
                          }
                          onChange={handleChange}
                        />
                      </FormGroup>

                      <FormGroup className="col-4">
                        <label>Vendedor:</label>
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
                        <label>Descripción:</label>
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
                      {/* -------------------------------       ADD NEW TECHNICAL INFORMATION        ------------------------------------------ */}
                      <OptionalInfo
                        optionalTechInfo={optionalTechInfo}
                        handleChangeOptionalInfo={handleChangeOptionalInfo}
                        light={light}
                      />

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
                    <Button
                      color="primary"
                      className="ml-2"
                      onClick={() => {
                        settranferirModal(!tranferirModal);
                      }}
                    >
                      {tranferirModal ? "Ocultar Transferir" : "Transferir"}
                    </Button>
                  </FormGroup>

                  {tranferirModal ? (
                    <>
                      <TransferirModal
                        equipoSeleccionado={equipoSeleccionado}
                        operations={operations}
                        tranferirModal={tranferirModal}
                        settranferirModal={settranferirModal}
                      />
                    </>
                  ) : (
                    <>
                      {/* //-------------------------------------   Visualizar PDF   ------------------------------ */}
                      {descargarPdf ? (
                        <>
                          <ModalBody className="row text-align-center  animate__animated animate__fadeIn">
                            <PDFViewer
                              style={{ width: "100%", height: "90vh" }}
                            >
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

                              {/* ms-5 */}
                              <div class="input-group my-3 input-group-lg justify-content-center">
                                <input
                                  style={{
                                    color:
                                      theme.palette.type == "dark"
                                        ? theme.palette.primary.dark
                                        : theme.palette.secondary.dark,
                                    backgroundColor: "transparent",
                                    maxWidth: 380,
                                  }}
                                  name="file"
                                  type="file"
                                  class="form-control "
                                  id="inputGroupFile03"
                                  aria-describedby="inputGroupFileAddon03"
                                  aria-label="Upload an image"
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
                              <label>Número de línea:</label>
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
                                Planta:<b className="text-danger">*</b>
                              </label>
                              <select
                                className="form-select SelectBoostrap"
                                name="Name"
                                required
                                value={
                                  operations && operations.Name.toUpperCase()
                                }
                                onChange={handleChangeOperations}
                              >
                                <option value="">Seleccionar Planta</option>
                                <option value="APAN">APAN</option>
                                <option value="BARBADOS">BARBADOS</option>
                                <option value="BARRANQUILLA">
                                  BARRANQUILLA
                                </option>
                                <option value="BOYACA">BOYACA</option>
                                <option value="BUCARAMANGA">BUCARAMANGA</option>
                                <option value="FABRICA DE TAPAS DE TOCANCIPA">
                                  FABRICA DE TAPAS DE TOCANCIPA
                                </option>
                                <option value="ETIQUETAS IMPRESUR & INDUGRAL">
                                  ETIQUETAS IMPRESUR & INDUGRAL
                                </option>
                                <option value="MEDELLIN">MEDELLIN</option>
                                <option value="MALTERIA TIBITO">
                                  MALTERIA TIBITO
                                </option>
                                <option value="TONCACIPA">TONCACIPA</option>
                                <option value="MALTERIA TROPICAL">
                                  MALTERIA TROPICAL
                                </option>
                                <option value="VALLE">VALLE</option>
                                <option value="HOLGUIN">HOLGUIN</option>
                                <option value="DOMINICANA">DOMINICANA</option>
                                <option value="HATO NUEVO">HATO NUEVO</option>
                                <option value="GUAYAQUIL">GUAYAQUIL</option>
                                <option value="QUITO">QUITO</option>
                                <option value="MALTERIA DE GUAYAQUIL">
                                  MALTERIA DE GUAYAQUIL
                                </option>
                                <option value="LA CONSTANCIA BEER">
                                  LA CONSTANCIA BEER
                                </option>
                                <option value="EL SALVADOR CSD">
                                  EL SALVADOR CSD
                                </option>
                                <option value="LA CONSTANCIA WALTER">
                                  LA CONSTANCIA WALTER
                                </option>
                                <option value="ZACAPA">ZACAPA</option>
                                <option value="SAN PEDRO SULA BEER">
                                  SAN PEDRO SULA BEER
                                </option>
                                <option value="SAN PEDRO SULA CSD">
                                  SAN PEDRO SULA CSD
                                </option>
                                <option value="CEBADAS Y MALTAS">
                                  CEBADAS Y MALTAS
                                </option>
                                <option value="GUADALAJARA">GUADALAJARA</option>
                                <option value="MALTERIA ZACATECAS">
                                  MALTERIA ZACATECAS
                                </option>
                                <option value="MAZATLÁN">MAZATLÁN</option>
                                <option value="MODELO MÉXICO">
                                  MODELO MÉXICO
                                </option>
                                <option value="SALAMANCA (CASAL)">
                                  SALAMANCA (CASAL)
                                </option>
                                <option value="TORREÓN">TORREÓN</option>
                                <option value="TUXTEPEC">TUXTEPEC</option>
                                <option value="YUCATAN">YUCATAN</option>
                                <option value="ZACATECAS">ZACATECAS</option>
                                <option value="CUCAPÁ (CRAFT)">
                                  CUCAPÁ (CRAFT)
                                </option>
                                <option value="PASADENA">PASADENA</option>
                                <option value="AREQUIPA">AREQUIPA</option>
                                <option value="ATE">ATE</option>
                                <option value="CUSCO">CUSCO</option>
                                <option value="HUACHIPA">HUACHIPA</option>
                                <option value="MALTERIA DE LIMA">
                                  MALTERIA DE LIMA
                                </option>
                                <option value="MOTUPE">MOTUPE</option>
                                <option value="SAN JUAN (PUCALLPA)">
                                  SAN JUAN (PUCALLPA)
                                </option>
                                <option value="SAN MATEO (HUAROCHIRI)">
                                  SAN MATEO (HUAROCHIRI)
                                </option>
                                <option value="BARBARIAN (CRAFT)">
                                  BARBARIAN (CRAFT)
                                </option>
                                <option value="SAINT VINCENT">
                                  SAINT VINCENTt
                                </option>
                                <option value="BOGOTÁ BREWERY COMPANY (CRAFT)">
                                  BOGOTÁ BREWERY COMPANY (CRAFT)
                                </option>
                              </select>
                            </FormGroup>

                            <FormGroup className="col-6">
                              <label htmlFor="lineType">
                                Tipo de línea:<b className="text-danger">*</b>
                              </label>
                              <select
                                className="form-select SelectBoostrap"
                                name="Name"
                                value={
                                  lineTypes && lineTypes.Name.toUpperCase()
                                }
                                onChange={handleChangeLineTypes}
                              >
                                <option value="">
                                  Seleccionar Tipo de Línea
                                </option>
                                <option value="BREWLINE">BREWLINE</option>
                                <option value="BOTTLE">BOTTLE</option>
                                <option value="CAN">CAN</option>
                                <option value="PET">PET</option>
                                <option value="KEG">KEG</option>
                                <option value="SPECIAL KEG">SPECIAL KEG</option>
                                <option value="OTHER">OTHER</option>
                              </select>
                            </FormGroup>

                            <FormGroup className="col-6">
                              <label>
                                País:<b className="text-danger">*</b>
                              </label>
                              <select
                                className="form-select SelectBoostrap"
                                name="Name"
                                value={
                                  countries && countries.Name.toUpperCase()
                                }
                                required
                                onChange={handleChangeCountries}
                              >
                                <option value="">Seleccionar País</option>
                                <option value="BARBADOS">BARBADOS</option>
                                <option value="COLOMBIA">COLOMBIA</option>
                                <option value="CUBA">CUBA</option>
                                <option value="DOMINICANA">DOMINICANA</option>
                                <option value="ECUADOR">ECUADOR</option>
                                <option value="EL SALVADOR">EL SALVADOR</option>
                                <option value="GUATEMALA">GUATEMALA</option>
                                <option value="HONDURAS">HONDURAS</option>
                                <option value="MÉXICO">MÉXICO</option>
                                <option value="PANAMA">PANAMA</option>
                                <option value="PERÚ">PERÚ</option>
                                <option value="SAINT VINCENT">
                                  SAINT VINCENT
                                </option>
                              </select>
                            </FormGroup>

                            <FormGroup className="col-6">
                              <label>
                                BU:<b className="text-danger">*</b>
                              </label>
                              <select
                                className="form-select SelectBoostrap"
                                name="Name"
                                value={bu && bu.Name.toUpperCase()}
                                onChange={handleChangeBu}
                              >
                                {/* ------------------------------------------------   SELECT DESDE LA BASE DE DATOS   ------------------------------------ */}
                                <option value="">Seleccionar BU</option>
                                <option value="CAC">CAC</option>
                                <option value="COL">COL</option>
                                <option value="PEC">PEC</option>
                                <option value="MEX">MEX</option>
                              </select>
                            </FormGroup>

                            <FormGroup className="col-6">
                              <label htmlFor="area">
                                Área:<b className="text-danger">*</b>
                              </label>
                              <select
                                className="form-select SelectBoostrap"
                                name="Name"
                                value={areas && areas.Name.toUpperCase()}
                                onChange={handleChangeAreas}
                              >
                                <option value="">Seleccionar Área</option>
                                <option value="GENERAL SERVICES">
                                  GENERAL SERVICES
                                </option>
                                <option value="SILOS">SILOS</option>
                                <option value="MILLING">MILLING</option>
                                <option value="BREWHOUSE">BREWHOUSE</option>
                                <option value="BREWING">BREWING</option>
                                <option value="FERMENTATION">
                                  FERMENTATION
                                </option>
                                <option value="MATURATION">MATURATION</option>
                                <option value="CENTRIFUGE">CENTRIFUGE</option>
                                <option value="FILTRATION">FILTRATION</option>
                                <option value="DILUTION WATER">
                                  DILUTION WATER
                                </option>
                                <option value="BRIGHT BEER TANKS">
                                  BRIGHT BEER TANKS
                                </option>
                                <option value="PACKAGING">PACKAGING</option>
                                <option value="CHEMICAL ISLAND & CIP">
                                  CHEMICAL ISLAND & CIP
                                </option>
                                <option value="SYRUP HOUSE">SYRUP HOUSE</option>
                                <option value="LOGISTIC TIER 1">
                                  LOGISTIC TIER 1
                                </option>
                                <option value="LOGISTIC TIER 2">
                                  LOGISTIC TIER 2
                                </option>
                                <option value="CO2 RECOVERY">
                                  CO2 RECOVERY
                                </option>
                                <option value="REFRIGERATION">
                                  REFRIGERATION
                                </option>
                                <option value="WELLS">WELLS</option>
                                <option value="WATER TREATMENT PLANT">
                                  WATER TREATMENT PLANT
                                </option>
                                <option value="COMPRESSED AIR">
                                  COMPRESSED AIR
                                </option>
                                <option value="ELECTRICAL SUBSTATION (HV)">
                                  ELECTRICAL SUBSTATION (HV)
                                </option>
                                <option value="ELECTRICAL SUBSTATION (MV)">
                                  ELECTRICAL SUBSTATION (MV)
                                </option>
                                <option value="ELECTRICAL SUBSTATION (LV)">
                                  ELECTRICAL SUBSTATION (LV)
                                </option>
                                <option value="STEAM GENERATION">
                                  STEAM GENERATION
                                </option>
                                <option value="BIOLOGICAL TREATMENT SYSTEM">
                                  BIOLOGICAL TREATMENT SYSTEM
                                </option>
                                <option value="TERTIARY SYSTEM">
                                  TERTIARY SYSTEM
                                </option>
                                <option value="SANITARY PLANT">
                                  SANITARY PLANT
                                </option>
                                <option
                                  value={["AUTOMATION & INDUSTRIAL NETWORK"]}
                                >
                                  AUTOMATION & INDUSTRIAL NETWORK
                                </option>
                                <option value="MAINTENANCE">MAINTENANCE</option>
                                <option value="IT">IT</option>
                                <option value="LABORATORY">LABORATORY</option>
                                <option value="WORKSHOP">WORKSHOP</option>
                                <option value="OFFICES">OFFICES</option>
                                <option value="SUBPRODUCTS">SUBPRODUCTS</option>
                              </select>
                            </FormGroup>

                            <FormGroup className="col-6">
                              <label htmlFor="Subarea">
                                Subárea <b className="text-danger">*</b>
                              </label>
                              <select
                                className="form-select SelectBoostrap"
                                name="Name"
                                value={SubArea && SubArea.Name.toUpperCase()}
                                onChange={handleChangeSubArea}
                              >
                                <option value="">Seleccionar Subárea</option>
                                <option value="WORT KETTLE">WORT KETTLE</option>
                                <option value="TORRE DE MOLIENDA">
                                  TORRE DE MOLIENDA
                                </option>
                                <option value="CONOCIMIENTOS">
                                  CONOCIMIENTOS
                                </option>
                                <option value="BAGAZO/SYE">BAGAZO/SYE</option>
                                <option value="BLOQUE FRIO">BLOQUE FRIO</option>
                                <option value="GENERAL">GENERAL</option>
                                <option value="NO DATA AVAILABLE">
                                  No data available
                                </option>
                              </select>
                            </FormGroup>

                            <FormGroup className="col-12">
                              {/* Para obtener el correo */}
                              <TextField
                                label="Correo de la Planta"
                                className="form-control"
                                variant="outlined"
                                name="code" //--------- CORREO  --------
                                value={
                                  equipoSeleccionado && equipoSeleccionado.code
                                }
                                onChange={handleChange}
                              />
                            </FormGroup>
                            <br />

                            {/* -------------------------    BOTONES IZQUIERDA DERECHA    ------------------------------- */}
                            <FormGroup className="row justify-content-between align-items-center">
                              <Grid
                                xs={4}
                                className="d-flex justify-content-start"
                              >
                                <Button
                                  color="secondary"
                                  className="d-none"
                                  onClick={() => setEditing(false)}
                                >
                                  Consulta de Equipos
                                  <ArrowBackIcon />
                                </Button>
                              </Grid>
                              <Grid
                                xs={4}
                                className="d-flex justify-content-center"
                              >
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
                                className="d-flex justify-content-end"
                              >
                                <Button
                                  style={{
                                    color:
                                      theme.palette.type == "dark"
                                        ? "#ffffff"
                                        : "#000000",
                                  }}
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
                    </>
                  )}
                </ModalBody>
              </div>
            )
          }
          {/* -------------------------    BOTONES gAR Y CANCELAR    ------------------------------- */}

          <ModalFooter>
            <Button
              style={{
                color:
                  theme.palette.type == "dark"
                    ? theme.palette.primary.light
                    : theme.palette.secondary.light,
              }}
              name="cancelar"
              variant="outlined"
              onClick={() => {
                setModalEditar(false);
                setEditing(false);
                setEditingTechInfo(false);
                setEditingServiceInfo(false);
              }}
            >
              Cancelar
            </Button>
            {tranferirModal ? (
              <>
                <Button
                  style={{
                    color: "#ffffff",
                    backgroundColor:
                      theme.palette.type == "dark"
                        ? theme.palette.secondary.light
                        : "#6200EE",
                  }}
                  variant="contained"
                  type="submit"
                  disabled
                >
                  Guardar Registro
                </Button>
              </>
            ) : (
              <>
                {userByToken?.roleId === 1 ? (
                  <Button
                    style={{
                      color: "#ffffff",
                      backgroundColor:
                        theme.palette.type == "dark"
                          ? theme.palette.secondary.light
                          : "#6200EE",
                    }}
                    variant="contained"
                    type="submit"
                    onClick={() => editar()}
                  >
                    Guardar Registro
                  </Button>
                ) : (
                  <Button
                    style={{
                      color: "#ffffff",
                      backgroundColor:
                        theme.palette.type == "dark"
                          ? theme.palette.secondary.light
                          : "#6200EE",
                    }}
                    variant="contained"
                    type="submit"
                    disabled
                  >
                    Guardar Registro
                  </Button>
                )}
              </>
            )}
          </ModalFooter>
        </Modal>

        {/*============================= Modal Eliminar =========================================*/}

        <Modal isOpen={modalEliminar}>
          <ModalBody
            className="text-center"
            style={{
              fontSize: "1.2rem",
              color:
                theme.palette.type == "dark"
                  ? theme.palette.primary.light
                  : theme.palette.secondary.dark,
              backgroundColor:
                theme.palette.type == "dark" ? "#3F3857" : "#FFFFFF",
            }}
          >
            Estás seguro que deseas eliminar el equipo: <br />
            {equipoSeleccionado && equipoSeleccionado.Name}
          </ModalBody>

          <ModalFooter
            className="justify-content-center"
            style={{
              backgroundColor:
                theme.palette.type == "dark" ? "#3F3857" : "#FFFFFF",
            }}
          >
            <Button
              style={{
                color:
                  theme.palette.type == "dark"
                    ? theme.palette.primary.light
                    : theme.palette.secondary.light,
              }}
              variant="outlined"
              onClick={() => setModalEliminar(false)}
            >
              No quiero eliminar
            </Button>
            <Button
              style={{
                color: "#ffffff",
                backgroundColor:
                  theme.palette.type == "dark"
                    ? theme.palette.secondary.light
                    : "#6200EE",
              }}
              variant="contained"
              onClick={() => eliminar()}
            >
              Sí, eliminar
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
            setGetAllList={setGetAllList}
            getAllList={getAllList}
            actualizarTabla={actualizarTabla}
            setListAll={setListAll}
          />
        </Modal>

        {/*======================================================= Modal Insertar =======================================================*/}

        <Modal
          isOpen={modalInsertar}
          style={{
            maxWidth: 700,
          }}
          className={`modalForm ${theme.palette.type}`}
        >
          <ModalHeader>
            <div>
              <h1
                style={{
                  color:
                    theme.palette.type == "dark"
                      ? theme.palette.primary.light
                      : theme.palette.secondary,
                }}
              >
                Nuevo Registro
              </h1>
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
                      light={light}
                    />
                  </>
                ) : (
                  <>
                    <div className="p-3">
                      <h4
                        style={{
                          color:
                            theme.palette.type == "dark"
                              ? theme.palette.primary.light
                              : theme.palette.secondary,
                        }}
                      >
                        Información técnica
                      </h4>
                    </div>

                    <ModalBody className="row animate__animated animate__fadeIn">
                      <FormGroup className="col-4">
                        <label htmlFor="url_input">Equipo:</label>
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
                        <label>Trabajo actual:</label>
                        <select
                          className="form-select "
                          style={{ margin: "0px !important" }}
                          name="currentWorking"
                          value={
                            technicalInformation &&
                            technicalInformation.currentWorking
                          }
                          onChange={handleChange}
                        >
                          <option value="">Seleccione Trabajo actual</option>
                          <option value="Installed and is working">
                            Instalado y funcionando
                          </option>
                          <option value="Installed and is not working">
                            Instalado y no trabajando
                          </option>
                          <option value="Not Installed and is not working">
                            No instalado
                          </option>
                        </select>
                      </FormGroup>

                      <FormGroup className="col-4">
                        <label htmlFor="CurrentConditions">
                          Condición actual:
                        </label>
                        <select
                          className="form-select "
                          name="CurrentConditions"
                          value={
                            technicalInformation &&
                            technicalInformation.CurrentConditions
                          }
                          onChange={handleChange}
                        >
                          <option value="">Seleccione Condición actual</option>
                          <option value="Excellent">Excelente</option>
                          <option value="Good">Bueno</option>
                          <option value="Regular">Regular</option>
                          <option value="Bad">Malo</option>
                          <option value="To be disposed">
                            Para ser desechado
                          </option>
                        </select>
                      </FormGroup>

                      <FormGroup className="col-4">
                        <label>Tipo de equipo:</label>
                        {/* <input
                                                    className="form-control"
                                                    type="text text-align=center"
                                                    name="EquipmentType"
                                                    value={technicalInformation && technicalInformation.EquipmentType}
                                                    onChange={handleChange} /> */}

                        <select
                          className="form-select "
                          name="EquipmentType"
                          value={
                            technicalInformation &&
                            technicalInformation.EquipmentType
                          }
                          onChange={handleChange}
                        >
                          <option value="">Seleccione Tipo de Equipo</option>
                          <option value="Automation / Electronic">
                            Automation / Electronic
                          </option>
                          <option value="Electrical">Electrical</option>
                          <option value="Mechanical">Mechanical</option>
                        </select>
                      </FormGroup>

                      <FormGroup className="col-4">
                        <label>Número de serial:</label>
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
                        <label>Número de modelo:</label>
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
                        <label>Peso:</label>
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
                          value={
                            technicalInformation && technicalInformation.OEM
                          }
                          onChange={handleChange}
                        />
                      </FormGroup>

                      <FormGroup className="col-4">
                        <label>Vendedor:</label>
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
                        <label>Descripción:</label>
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

                      <hr style={{ width: "97%" }} />
                      {/* -------------------------------         ADD TECHNICAL INFORMATION FORM           ------------------------------------------ */}

                      <OptionalInfo
                        optionalTechInfo={optionalTechInfo}
                        handleChangeOptionalInfo={handleChangeOptionalInfo}
                        light={light}
                      />

                      {/* { // Condicional para mostros un formulaio u otro
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
                                                            <form onSubmit={handleSubmit(onSubmit)} className="animate__animated animate__fadeIn" >
                                                                <label htmlFor="Name" > <h5 className="text-muted">Agregar más información técnica:</h5> </label>
                                                                <select
                                                                    className="form-select SelectBoostrap"
                                                                    name="Name"
                                                                    {...register("Name", {
                                                                        required: {
                                                                            value: true,
                                                                            message: 'Campo requerido'
                                                                        }
                                                                    })}
                                                                >
                                                                    <option value="">Selecione información técnica</option>
                                                                    <option value="Available warranty">Available warranty</option>
                                                                    <option value="Year of construction">Year of construction</option>
                                                                    <option value="Sanitary Grade">Sanitary Grade</option>
                                                                    <option value="Protection Grade">Protection Grade</option>
                                                                    <option value="Electrical Consumption">Electrical Consumption</option>
                                                                    <option value="Measurement variable">Measurement variable</option>
                                                                    <option value="Plant Technical Information Contact">Plant Technical Information Contact</option>
                                                                    <option value="Disposal Information">Disposal Information</option>
                                                                    <option value="Equipment Packing">Equipment Packing</option>
                                                                    <option value="Equipment current conditions comments">Equipment current conditions comments</option>
                                                                    <option value="Nominal Capacity">Nominal Capacity</option>
                                                                    <option value="Assambled / Dissambled">Assambled / Dissambled</option>
                                                                    <option value="Plant Technical Information Contact">Plant Technical Information Contact</option>
                                                                    <option value="Plant Financial Information Contact">Plant Financial Information Contact</option>
                                                                    <option value="Communication protocol">Communication protocol</option>
                                                                    <option value="Notes about equipment">Notes about equipment</option>
                                                                </select>
                                                                <span className="text-danger text-small d-block mb-2">
                                                                    {errors.Name && errors.Name.message}
                                                                </span>
                                                                <label htmlFor="Value">Valor <b className="text-danger">*</b></label>
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
                                                                                    message: 'Campo requerido'
                                                                                }
                                                                            })}
                                                                        />
                                                                        <span className="text-danger text-small d-block mb-2">
                                                                            {errors.Value && errors.Value.message}
                                                                        </span>
                                                                    </div>
                                                                    -----------------------------    BOtON AGREGAR TECHNICAL INFORMATION    ----------------------- 
                                                                    <div className="col-2">
                                                                        <button className="btn btn-primary" ><span className=" fas fa-save fa-lg"></span></button>
                                                                    </div>
                                                                </div>
                                                            </form>
                                                        </section>
                                                    </>
                                                )
                                            }
                                            -----------------------------------             TABLE ADD TECHNICAL INFORMATION           -----------------------------------
                                            <FormGroup>
                                                <table className="table display table-hover table-bordered table-striped">
                                                    <thead>
                                                        <tr>
                                                            <th>Información Técnica</th>
                                                            <th>Valor</th>
                                                            <th>Acciones</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            newTechicInformation.length > 0 ?
                                                                newTechicInformation.map((elemento) => (
                                                                    <tr key={elemento.Id_NewTechSpec}>
                                                                        <>
                                                                            {
                                                                                filaEditada ? (
                                                                                    <>
                                                                                        {
                                                                                            id == elemento.Id_NewTechSpec ? (
                                                                                                <>
                                                                                                    < td className=" animate__animated animate__fadeInDown"> {`${elemento.Name}:`}</td>
                                                                                                    < td className=" animate__animated animate__fadeInDown"> {elemento.Value}</td>
                                                                                                </>
                                                                                            ) : (
                                                                                                <>
                                                                                                    < td > {`${elemento.Name}:`}</td>
                                                                                                    < td > {elemento.Value}</td>
                                                                                                </>
                                                                                            )
                                                                                        }
                                                                                    </>
                                                                                ) : (
                                                                                    <>
                                                                                        < td > {`${elemento.Name}:`}</td>
                                                                                        < td > {elemento.Value}</td>
                                                                                    </>
                                                                                )
                                                                            }
                                                                            <td> <Button color="primary" onClick={() => editarTechSpec(elemento, 'technical')} >
                                                                                <i className="far fa-edit button_icon"></i></Button> {"  "}
                                                                                < Button color="danger" onClick={() => eliminarAddTechInfo(elemento.Id_NewTechSpec)}>
                                                                                    <i className="fas fa-trash-alt button_icon"></i> </Button>
                                                                            </td>
                                                                        </>
                                                                    </tr>
                                                                )) : (
                                                                    <tr>
                                                                        <td colSpan={3}>No data recorded</td>
                                                                    </tr>
                                                                )
                                                        }
                                                    </tbody>
                                                </table>
                                            </FormGroup> */}

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
                <div>
                  <h6
                    style={{
                      color:
                        theme.palette.type == "dark"
                          ? theme.palette.primary.light
                          : theme.palette.secondary,
                    }}
                  >
                    Detalles Generales
                  </h6>
                </div>
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
                      <label>Id:</label>
                      <input
                        className="form-control"
                        readOnly
                        type="text text-align=center"
                        name="Id_Equipment"
                        value={getAllList.length + 1}
                      />
                    </FormGroup>

                    <FormGroup className="col-6">
                      <label>Número de línea:</label>
                      <input
                        className="form-control"
                        type="text text-align=center"
                        name="number"
                        value={line ? line.number : ""}
                        onChange={handleChangeLine}
                      />
                    </FormGroup>

                    <FormGroup className="col-6">
                      {/* <div className="dropdown">
                                            <div className="control">
                                                <div className="select-value">Seleccionar Planta...</div>
                                            </div>
                                        </div> */}

                      <label>
                        Planta <b className="text-danger">*</b>
                      </label>
                      <select
                        className="form-select SelectBoostrap"
                        name="Name"
                        required
                        onChange={handleChangeOperations}
                      >
                        <option value="">Seleccione Planta</option>
                        {/* {
                                                operationsList.map((elemento) => (
                                                    <option value={elemento.Id_Operations}>{elemento.Name}</option>
                                                ))
                                            } */}
                        <option value="APAN">APAN</option>
                        <option value="BARBADOS">BARBADOS</option>
                        <option value="BARRANQUILLA">BARRANQUILLA</option>
                        <option value="BOYACA">BOYACA</option>
                        <option value="BUCARAMANGA">BUCARAMANGA</option>
                        <option value="FABRICA DE TAPAS DE TOCANCIPA">
                          FABRICA DE TAPAS DE TOCANCIPA
                        </option>
                        <option value="ETIQUETAS IMPRESUR & INDUGRAL">
                          ETIQUETAS IMPRESUR & INDUGRAL
                        </option>
                        <option value="MEDELLIN">MEDELLIN</option>
                        <option value="MALTERIA TIBITO">MALTERIA TIBITO</option>
                        <option value="TONCACIPA">TONCACIPA</option>
                        <option value="MALTERIA TROPICAL">
                          MALTERIA TROPICAL
                        </option>
                        <option value="VALLE">VALLE</option>
                        <option value="HOLGUIN">HOLGUIN</option>
                        <option value="DOMINICANA">DOMINICANA</option>
                        <option value="HATO NUEVO">HATO NUEVO</option>
                        <option value="GUAYAQUIL">GUAYAQUIL</option>
                        <option value="QUITO">QUITO</option>
                        <option value="MALTERIA DE GUAYAQUIL">
                          MALTERIA DE GUAYAQUIL
                        </option>
                        <option value="LA CONSTANCIA BEER">
                          LA CONSTANCIA BEER
                        </option>
                        <option value="EL SALVADOR CSD">EL SALVADOR CSD</option>
                        <option value="LA CONSTANCIA WALTER">
                          LA CONSTANCIA WALTER
                        </option>
                        <option value="ZACAPA">ZACAPA</option>
                        <option value="SAN PEDRO SULA BEER">
                          SAN PEDRO SULA BEER
                        </option>
                        <option value="SAN PEDRO SULA CSD">
                          SAN PEDRO SULA CSD
                        </option>
                        <option value="CEBADAS Y MALTAS">
                          CEBADAS Y MALTAS
                        </option>
                        <option value="GUADALAJARA">GUADALAJARA</option>
                        <option value="MALTERIA ZACATECAS">
                          MALTERIA ZACATECAS
                        </option>
                        <option value="MAZATLÁN">MAZATLÁN</option>
                        <option value="MODELO MÉXICO">MODELO MÉXICO</option>
                        <option value="SALAMANCA (CASAL)">
                          SALAMANCA (CASAL)
                        </option>
                        <option value="TORREÓN">TORREÓN</option>
                        <option value="TUXTEPEC">TUXTEPEC</option>
                        <option value="YUCATAN">YUCATAN</option>
                        <option value="ZACATECAS">ZACATECAS</option>
                        <option value="CUCAPÁ (CRAFT)">CUCAPÁ (CRAFT)</option>
                        <option value="PASADENA">PASADENA</option>
                        <option value="AREQUIPA">AREQUIPA</option>
                        <option value="ATE">ATE</option>
                        <option value="CUSCO">CUSCO</option>
                        <option value="HUACHIPA">HUACHIPA</option>
                        <option value="MALTERIA DE LIMA">
                          MALTERIA DE LIMA
                        </option>
                        <option value="MOTUPE">MOTUPE</option>
                        <option value="SAN JUAN (PUCALLPA)">
                          SAN JUAN (PUCALLPA)
                        </option>
                        <option value="SAN MATEO (HUAROCHIRI)">
                          SAN MATEO (HUAROCHIRI)
                        </option>
                        <option value="BARBARIAN (CRAFT)">
                          BARBARIAN (CRAFT)
                        </option>
                        <option value="SAINT VINCENT">SAINT VINCENTt</option>
                        <option value="BOGOTÁ BREWERY COMPANY (CRAFT)">
                          BOGOTÁ BREWERY COMPANY (CRAFT)
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
                        Tipo de línea <b className="text-danger">*</b>
                      </label>
                      <select
                        className="form-select SelectBoostrap"
                        name="Name"
                        onChange={handleChangeLineTypes}
                      >
                        <option value="">Seleccione Tipo de Línea</option>
                        <option value="BREWLINE">BREWLINE</option>
                        <option value="BOTTLE">BOTTLE</option>
                        <option value="CAN">CAN</option>
                        <option value="PET">PET</option>
                        <option value="KEG">KEG</option>
                        <option value="SPECIAL KEG">SPECIAL KEG</option>
                        <option value="OTHER">OTHER</option>
                      </select>

                      {/* {lineTypeList.map((elemento) => (
                                              <option value={elemento.Name}>{elemento.Name}</option>
                                          ))
                                          } */}
                    </FormGroup>

                    <FormGroup className="col-6">
                      <label>
                        País <b className="text-danger">*</b>
                      </label>
                      <select
                        className="form-select SelectBoostrap"
                        name="Name"
                        required
                        onChange={handleChangeCountries}
                      >
                        <option value="">Seleccione País</option>
                        {/* {paisLis.map((elemento) => (
                                                <option value={elemento.Id_Countries}>{elemento.Name}</option>
                                            ))
                                            } */}

                        <option value="BARBADOS">BARBADOS</option>
                        <option value="COLOMBIA">COLOMBIA</option>
                        <option value="CUBA">CUBA</option>
                        <option value="DOMINICANA">DOMINICANA</option>
                        <option value="ECUADOR">ECUADOR</option>
                        <option value="EL SALVADOR">EL SALVADOR</option>
                        <option value="GUATEMALA">GUATEMALA</option>
                        <option value="HONDURAS">HONDURAS</option>
                        <option value="MÉXICO">MÉXICO</option>
                        <option value="PANAMA">PANAMA</option>
                        <option value="PERÚ">PERÚ</option>
                        <option value="SAINT VINCENT">SAINT VINCENT</option>
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
                        <option value="">Seleccione BU</option>
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
                        <option value="">Seleccione Area</option>
                        {/* {
                                                areaList.map((elemento) => (
                                                    <option value={elemento.Id_Areas}>{elemento.Name}</option>
                                                ))
                                            } */}

                        <option value="GENERAL SERVICES">
                          GENERAL SERVICES
                        </option>
                        <option value="SILOS">SILOS</option>
                        <option value="MILLING">MILLING</option>
                        <option value="BREWHOUSE">BREWHOUSE</option>
                        <option value="BREWING">BREWING</option>
                        <option value="FERMENTATION">FERMENTATION</option>
                        <option value="MATURATION">MATURATION</option>
                        <option value="CENTRIFUGE">CENTRIFUGE</option>
                        <option value="FILTRATION">FILTRATION</option>
                        <option value="DILUTION WATER">DILUTION WATER</option>
                        <option value="BRIGHT BEER TANKS">
                          BRIGHT BEER TANKS
                        </option>
                        <option value="PACKAGING">PACKAGING</option>
                        <option value="CHEMICAL ISLAND & CIP">
                          CHEMICAL ISLAND & CIP
                        </option>
                        <option value="SYRUP HOUSE">SYRUP HOUSE</option>
                        <option value="LOGISTIC TIER 1">LOGISTIC TIER 1</option>
                        <option value="LOGISTIC TIER 2">LOGISTIC TIER 2</option>
                        <option value="CO2 RECOVERY">CO2 RECOVERY</option>
                        <option value="REFRIGERATION">REFRIGERATION</option>
                        <option value="WELLS">WELLS</option>
                        <option value="WATER TREATMENT PLANT">
                          WATER TREATMENT PLANT
                        </option>
                        <option value="COMPRESSED AIR">COMPRESSED AIR</option>
                        <option value="ELECTRICAL SUBSTATION (HV)">
                          ELECTRICAL SUBSTATION (HV)
                        </option>
                        <option value="ELECTRICAL SUBSTATION (MV)">
                          ELECTRICAL SUBSTATION (MV)
                        </option>
                        <option value="ELECTRICAL SUBSTATION (LV)">
                          ELECTRICAL SUBSTATION (LV)
                        </option>
                        <option value="STEAM GENERATION">
                          STEAM GENERATION
                        </option>
                        <option value="BIOLOGICAL TREATMENT SYSTEM">
                          BIOLOGICAL TREATMENT SYSTEM
                        </option>
                        <option value="TERTIARY SYSTEM">TERTIARY SYSTEM</option>
                        <option value="SANITARY PLANT">SANITARY PLANT</option>
                        <option value={["AUTOMATION & INDUSTRIAL NETWORK"]}>
                          AUTOMATION & INDUSTRIAL NETWORK
                        </option>
                        <option value="MAINTENANCE">MAINTENANCE</option>
                        <option value="IT">IT</option>
                        <option value="LABORATORY">LABORATORY</option>
                        <option value="WORKSHOP">WORKSHOP</option>
                        <option value="OFFICES">OFFICES</option>
                        <option value="SUBPRODUCTS">SUBPRODUCTS</option>
                      </select>
                    </FormGroup>

                    <FormGroup className="col-6">
                      <label htmlFor="Subarea">
                        Subárea <b className="text-danger">*</b>
                      </label>
                      <select
                        className="form-select SelectBoostrap"
                        name="Name"
                        onChange={handleChangeSubArea}
                      >
                        <option value="">Seleccione Subárea</option>
                        {/* {subareaList.map((elemento) => (
                                                <option value={elemento.Id_SubAreas}>{elemento.Name}</option>
                                            ))
                                            } */}
                        <option value="WORT KETTLE">WORT KETTLE</option>
                        <option value="TORRE DE MOLIENDA">
                          TORRE DE MOLIENDA
                        </option>
                        <option value="CONOCIMIENTOS">CONOCIMIENTOS</option>
                        <option value="BAGAZO/SYE">BAGAZO/SYE</option>
                        <option value="BLOQUE FRIO">BLOQUE FRIO</option>
                        <option value="GENERAL">GENERAL</option>
                        <option value="NO DATA AVAILABLE">
                          No data available
                        </option>
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
                        label="Correo de la planta"
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
                          style={{
                            color:
                              theme.palette.type == "dark"
                                ? "#ffffff"
                                : "#000000",
                          }}
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
              style={{
                color:
                  theme.palette.type == "dark"
                    ? theme.palette.primary.light
                    : theme.palette.secondary.light,
              }}
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
              style={{
                color: "#ffffff",
                backgroundColor:
                  theme.palette.type == "dark"
                    ? theme.palette.secondary.light
                    : "#6200EE",
              }}
              variant="contained"
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
    </ThemeProvider>
  );
};
export const UserToken = userToken;

export default ConsultaEquipos;
