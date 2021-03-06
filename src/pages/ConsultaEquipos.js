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
import { DataGrid, esES, GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";
import Axios from "axios";
import { useForm } from "react-hook-form";
import ServiceInformation from "./components/ServiceInformation";
import PageHeader from "../components/PageHeader";
import {
  Paper,
  makeStyles,
  Toolbar,
  InputAdornment,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SvgIcon,
  // withStyles,
  // TableRow,
  // TableCell,
  // FormHelperText,
} from "@material-ui/core";
import Controls from "../components/controls/Controls";
import { Add, CloudDownload, Delete, ImportExport, LockSharp, Search, Visibility } from "@material-ui/icons";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import IconButton from "@material-ui/core/IconButton";
import SideMenu from "../components/SideMenu";
import Header from "../components/Header";
import planning from "../assets/planning.jpeg";
import * as XLSX from "xlsx";
import { Excel } from "./components/Excel";
import { OptionalInfo } from "./components/OptionalInfo";
import { globalApi } from "../types/api.types";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { Pagination } from "@material-ui/lab";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { TransferirModal } from "./components/TransferirModal";
import { Autocomplete } from "@mui/material";
import { select } from "./components/select";
import FinancialInfo from "./components/FinancialInfo";
import { Calification } from "./components/Calification";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { BtnEliminar } from "./components/BtnEliminar";
import { CustomNoRowsOverlay } from "./components/NoRows";
import PriorityChip from "./components/PriorityChip";
// import EditAddServInfo from "./components/EditAddServInfo";
// import EditAddTechInfo from './components/EditAddTechInfo';
// import useTable from "../components/useTable";
// Edit,
// import { DocPDF } from "./components/DocPDF";
// import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
// import Excel from './components/Excel';
// send
// import { fontSize } from '@mui/system';

//-----------------------------------------------------------------------
// const headCells = [
//   { id: "Name", label: "Equipo" },
//   { id: "bu", label: "BU", disableSorting: true },
//   { id: "pais", label: "Pa??s", disableSorting: true },
//   { id: "area", label: "Area", disableSorting: true },
//   { id: "subarea", label: "Sub??rea", disableSorting: true },
//   { id: "planta", label: "Planta", disableSorting: true },
//   { id: "equipmentType", label: "Tipo de Equipo", disableSorting: true },
//   { id: "acciones", label: "Acciones", disableSorting: true },
// ];

//---------------------------------------------------------------
let userToken = {};

const ConsultaEquipos = ({ history }) => {
  const [light, setLight] = useState(false);

  const theme = createTheme(
    {
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
    },
    esES
  );



  function CustomToolbar() {  //---- Boton para exportar tabla
    return (
      <GridToolbarContainer>
        {/* <GridToolbarExport
          onClick={() => downloadExcel(filterFn.fn(getAllList))}
          style={{
            color:
              theme.palette.type === "dark"
                ? theme.palette.primary.light
                : theme.palette.primary.dark,
            "&:MuiDataGridMenuList": {
              // &:MuiDataGrid-menuList
              backgroundColor: theme.palette.primary.dark,
            },
          }}
          printOptions={{ disableToolbarButton: true }}
          
          // csvOptions={{ disableToolbarButton: true }}
        /> */}
        <Controls.Button
          variant="contained"
          size="large"
          color="secondary"
          startIcon={<CloudDownload style={{ fontSize: 16, fontWeight: "800" }} />}
          onClick={() => downloadExcel(filterFn.fn(getAllList))}
          style={{ fontSize: 12, fontWeight: "600" }}
          text={"Exportar a Excel"}
        // disabled={Roles}
        ></Controls.Button>
      </GridToolbarContainer>
    );
  }

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
      backgroundColor: theme.palette.type === "dark" ? "#514A69" : "#FFFFFF",
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      color:
        theme.palette.type === "dark"
          ? theme.palette.primary.light
          : theme.palette.secondary,
    },
  }));

  const {
    // register,
    handleSubmit,
    // formState: { errors },
  } = useForm();

  // <MasterEquipos />
  // const dataEquipos = [
  // ];

  // const [data, setData] = useState(dataEquipos);  //Hook para utilizar los datosEquipos
  const [modalEditar, setModalEditar] = useState(false); //Hook para abrir y cerrar el modalEditar
  const [modalEliminar, setModalEliminar] = useState(false); //Hook para abrir y cerrar el modal Eliminar
  const [modalInsertar, setModalInsertar] = useState(false); //Hook para abrir y cerrar el modal Insertar
  const [modalInsertarExcel, setModalInsertarExcel] = useState(false);
  const [formStep, setFormStep] = useState(0);
  const [formStepInsertar, setFormStepInsertar] = useState(0);

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
        await authAxios
          .get(`/user/user-data`)
          .then((response) => {
            setUserByToken(response.data.data);
            // console.log(response.data.data);
          })
          .catch((x) => {
            // console.log(x?.response);
            if (x?.response.data.error.message === "jwt expired") {
              // console.log("hola");
              history.replace("/login");
            } else if (x?.response.statusText === "Unauthorized") {
              history.replace("/login");
            }
            // console.log(x?.response.data.msg)
          });
        // console.log(x?.response);
        // console.log(userByToken);
      } else {
        history.replace("/login");
      }
    };

    getUserByToken();

    userToken = userByToken;
    // console.log(userByToken);

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
      Moneda: null,
      Cantidad: null,
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
      EncargadoActualizacion: null,
      FechaActualizacion: null,
    },
    ServicesInformation: {
      Id_ServicesInformation: null,
      DateOfInstallation: "",
      DateOfDesintallation: "",
      DesuseReason: "",
      DesinstallationReason: "",
      ProcurementOrder: "",
      Id_Equipment: null,
      ResponsableEquipo: "",
      PlantaResponsable: "",
      AreaResponsable: "",
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
        MotivodeBaja: "",
        MotivodeBajaOtro: ""
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
    ResponsableEquipo: "",
    PlantaResponsable: "",
    AreaResponsable: "",
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
    MotivodeBaja: "",
    MotivodeBajaOtro: ""
  });

  const [financialInformation, setFinancialInformation] = useState({
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
    Moneda: null,
    Cantidad: null,
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
    EncargadoActualizacion: null,
    FechaActualizacion: null,
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

  const [PlantaResponsable, setPlantaResponsable] = useState({
    Name: "",
  });

  const [AreaResponsable, setAreaResponsable] = useState({
    Name: "",
  });

  //   ResponsableEquipo
  // PlantaResponsable
  // AreaResponsable

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

  const seleccionarEquipo = (elemento, caso) => {
    setTechnicalInformation(elemento.TechnicalSpecification);
    setOptionalTechInfo(elemento.TechnicalSpecification.OptionalTechInfo);
    setFinancialInformation(elemento.FinancialInformation);
    setServicesInformation(elemento.ServicesInformation);
    setPlantaResponsable((prevState) => ({
      ...prevState,
      Name: elemento.ServicesInformation.PlantaResponsable,
    }));
    setAreaResponsable((prevState) => ({
      ...prevState,
      Name: elemento.ServicesInformation.AreaResponsable,
    }));
    setareas(elemento.Procedencia.areas);
    setSubArea(elemento.Procedencia.areas.SubArea);
    setOperations(elemento.Procedencia.areas.operations);
    setCountries(elemento.Procedencia.areas.operations.countries);
    setBu(elemento.Procedencia.areas.operations.countries.bu);
    setLine(elemento.Procedencia.line);
    setLineTypes(elemento.Procedencia.line.lineTypes);
    setEquipoSeleccionado(elemento);
    camposVacios(elemento);

    // ADMIN Sin Restricciones.
    // Maintenance Director Sin acceso al Menu de Users.
    if (["ADMIN", "Maintenance Director"].includes(userByToken.Roles?.Name)) {
      caso === "Editar" ? setModalEditar(true) : setModalEliminar(true); //Funcion para abrir el modal

    } else if (userByToken.Roles?.Name === "SPOC Maintenance BU") { // Edita en su BU.
      userByToken.Location?.ShortName === elemento.Procedencia.areas.operations.countries.bu.Name
        ? (<> {setGuardarPorPlanta(false)} {setDisabled(false)} </>) : (<>{setGuardarPorPlanta(true)} {setDisabled(true)}</>)

      caso === "Editar" ? setModalEditar(true) : setModalEliminar(true); //Funcion para abrir el modal
      // Maintenance Manager Elaboration
    } else if (["Maintenance Manager", "Maintenance Manager Elaboration"].includes(userByToken.Roles?.Name)) { // Edita en su Planta.
      userByToken.Location?.ShortName === elemento.Procedencia.areas.operations.countries.bu.Name
        ? userByToken.Location?.Name === elemento.Procedencia.areas.operations.Name ? (<>{setGuardarPorPlanta(false)} {setDisabled(false)}</>)
          : (<>{setGuardarPorPlanta(true)} {setDisabled(true)}</>) : (<>{setGuardarPorPlanta(true)} {setDisabled(true)}</>)
      // userByToken.Location.Name === elemento.Procedencia.areas.operations.Name ? setGuardarPorPlanta(false) : setGuardarPorPlanta(true)
      caso === "Editar" ? setModalEditar(true) : setModalEliminar(true); //Funcion para abrir el modal

    } else if (userByToken.Roles?.Name === "Maintenance Coordinator Area") { // Edita en su Area.
      userByToken.Location?.ShortName === elemento.Procedencia.areas.operations.countries.bu.Name
        ? userByToken.Location?.Name === elemento.Procedencia.areas.operations.Name
          ? userByToken.Area === elemento.Procedencia.areas.Name ? (<>{setGuardarPorPlanta(false)} {setDisabled(false)}</>)
            : (<>{setGuardarPorPlanta(true)} {setDisabled(true)}</>) : (<>{setGuardarPorPlanta(true)} {setDisabled(true)}</>) : (<>{setGuardarPorPlanta(true)} {setDisabled(true)}</>)

      caso === "Editar" ? setModalEditar(true) : setModalEliminar(true); //Funcion para abrir el modal

    } else if (userByToken.Roles?.Name === "Viewer") { // Edita en su Area.
      (<>{setGuardarPorPlanta(true)} {setDisabled(true)}</>);
      caso === "Editar" ? setModalEditar(true) : setModalEliminar(true); //Funcion para abrir el modal

    } else {
      (<>{setGuardarPorPlanta(true)} {setDisabled(true)}</>);
      caso === "Editar" ? setModalEditar(true) : setModalEliminar(true); //Funcion para abrir el modal
    }

  };

  const [errorCurrentWorking, setErrorCurrentWorking] = useState(false);
  const [leyendaCurrentWorking, setLeyendaCurrentWorking] = useState("")
  const [errorDescription, setErrorDescription] = useState(false);
  const [leyendaDescription, setLeyendaDescription] = useState("")
  const [errorEquipmentType, setErrorEquipmentType] = useState(false);
  const [leyendaEquipmentType, setLeyendaEquipmentType] = useState("")
  const [errorName, setErrorName] = useState(false);
  const [leyendaName, setLeyendaName] = useState("")
  const [errorActivoFijo, setErrorActivoFijo] = useState(false);
  const [leyendaActivoFijo, setLeyendaActivoFijo] = useState("")
  const [errorValorContable, setErrorValorContable] = useState(false);
  const [leyendaValorContable, setLeyendaValorContable] = useState("")
  const [errorMoneda, setErrorMoneda] = useState(false);
  const [leyendaMoneda, setLeyendaMoneda] = useState("")
  const [errorCurrendConditions, setErrorCurrendConditions] = useState(false);
  const [leyendaCurrendConditions, setLeyendaCurrendConditions] = useState("")

  const [errorResponsable, setErrorResponsable] = useState(false);
  const [leyendaResponsable, setLeyendaResponsable] = useState("")

  const [errorPlantaResponsable, setErrorPlantaResponsable] = useState(false);
  const [leyendaPlantaResponsable, setLeyendaPlantaResponsable] = useState("")

  const [errorAreaResponsable, setErrorAreaResponsable] = useState(false);
  const [leyendaAreaResponsable, setLeyendaAreaResponsable] = useState("")




  const camposVacios = (elemento) => {    // Avisar cuales campos vacios siguen requeridos
    if ([null, "NO DATA AVAILABLE", ""].includes(elemento.Name)) {
      setErrorName(true)
      setLeyendaName("Campo Requerido")
    }
    if ([null, "NO DATA AVAILABLE", ""].includes(elemento.TechnicalSpecification.EquipmentType)) {
      setErrorEquipmentType(true)
      setLeyendaEquipmentType("Campo Requerido")
    }
    if ([null, "NO DATA AVAILABLE", ""].includes(elemento.TechnicalSpecification.currentWorking)) {
      setErrorCurrentWorking(true)
      setLeyendaCurrentWorking("Selecciona Trabajo Actual")
    }
    if ([null, "NO DATA AVAILABLE", ""].includes(elemento.TechnicalSpecification.Description)) {
      setErrorDescription(true)
      setLeyendaDescription("Campo Requerido")
    }
    if ([null, "NO DATA AVAILABLE", ""].includes(elemento.FinancialInformation.Activo_fijo)) {
      setErrorActivoFijo(true)
      setLeyendaActivoFijo("Campo Requerido")
    }
    if ([null, "NO DATA AVAILABLE", ""].includes(elemento.FinancialInformation.Valor_Contable)) {
      setErrorValorContable(true)
      setLeyendaValorContable("Campo Requerido")
    }
    if ([null, "NO DATA AVAILABLE", ""].includes(elemento.FinancialInformation.Moneda)) {
      setErrorMoneda(true)
      setLeyendaMoneda("Campo Requerido")
    }
    if ([null, "NO DATA AVAILABLE", ""].includes(elemento.Procedencia.areas.operations.countries.bu.Name)) {
      setErrorBU(true)
      setLeyendaErrorBU("Campo Requerido")
    }
    if ([null, "NO DATA AVAILABLE", ""].includes(elemento.Procedencia.areas.operations.countries.Name)) {
      setErrorCountries(true)
      setLeyendaErrorCountries("Campo Requerido")
    }
    if ([null, "NO DATA AVAILABLE", ""].includes(elemento.Procedencia.areas.operations.Name)) {
      setErrorPlanta(true)
      setLeyendaErrorPlanta("Campo Requerido")
    }
    if ([null, "NO DATA AVAILABLE", ""].includes(elemento.Procedencia.areas.Name)) {
      setErrorAreas(true)
      setLeyendaErrorAreas("Campo Requerido")
    }
    if ([null, "NO DATA AVAILABLE", ""].includes(elemento.Procedencia.areas.SubArea.Name)) {
      setErrorSubArea(true)
      setLeyendaErrorSubArea("Campo Requerido")
    }
    if ([null, "NO DATA AVAILABLE", "", undefined].includes(elemento.TechnicalSpecification.CurrentConditions)) {
      setErrorCurrendConditions(true)
      setLeyendaCurrendConditions("Campo Requerido")
    }

    if ([null, "NO DATA AVAILABLE", "", undefined].includes(elemento.ServicesInformation.ResponsableEquipo)) {
      setErrorResponsable(true)
      setLeyendaResponsable("Campo Requerido")
    }
    if ([null, "NO DATA AVAILABLE", "", undefined].includes(elemento.ServicesInformation.PlantaResponsable)) {
      setErrorPlantaResponsable(true)
      setLeyendaPlantaResponsable("Campo Requerido")
    }
    if ([null, "NO DATA AVAILABLE", "", undefined].includes(elemento.ServicesInformation.AreaResponsable)) {
      setErrorAreaResponsable(true)
      setLeyendaAreaResponsable("Campo Requerido")
    }
  }

  const desetCamposVacios = () => {
    setErrorName(false)
    setLeyendaName("")
    setErrorEquipmentType(false)
    setLeyendaEquipmentType("")
    setErrorCurrentWorking(false)
    setLeyendaCurrentWorking("")
    setErrorDescription(false)
    setLeyendaDescription("")
    setErrorActivoFijo(false)
    setLeyendaActivoFijo("")
    setErrorValorContable(false)
    setLeyendaValorContable("")
    setErrorMoneda(false)
    setLeyendaMoneda("")
    setErrorBU(false)
    setLeyendaErrorBU("")
    setErrorCountries(false)
    setLeyendaErrorCountries("")
    setErrorPlanta(false)
    setLeyendaErrorPlanta("")
    setErrorAreas(false)
    setLeyendaErrorAreas("")
    setErrorSubArea(false)
    setLeyendaErrorSubArea("")
    setErrorCurrendConditions(false)
    setLeyendaCurrendConditions("")
    setErrorResponsable(false)
    setLeyendaResponsable("")
    setErrorPlantaResponsable(false)
    setLeyendaPlantaResponsable("")
    setErrorAreaResponsable(false)
    setLeyendaAreaResponsable("")
  }

  // ----------------            HANDLE CHANGE       -------------------

  const handleChange = (e) => {
    //Funcion para capturar lo que escriba el usuario
    const { name, value } = e.target;
    if (value !== "null") {
      setErrorNombre(false);
      setLeyendaErrorNombre("");
    }

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
    // const { label } = e;
    setOptionalTechInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleChangeFinancialInfo = (e) => {
    const { name, value } = e.target;
    // const { label } = e;
    setFinancialInformation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangeServicesInformation = (e) => {
    const { name, value } = e.target;
    // const { label } = e;

    setServicesInformation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangeServicesInfoPlanta = (e) => {
    const { label } = e ? e : (e = { label: "null" });
    if (label !== "null") {
      setErrorPlantaResponsable(false);
      setLeyendaPlantaResponsable("");
    }

    setPlantaResponsable((prevState) => ({
      ...prevState,
      Name: label,
    }));
  };
  const handleChangeServicesInfoArea = (e) => {
    const { label } = e ? e : (e = { label: "null" });
    if (label !== "null") {
      setErrorAreaResponsable(false);
      setLeyendaAreaResponsable("");
    }

    setAreaResponsable((prevState) => ({
      ...prevState,
      Name: label,
    }));
  };

  const handleChangeAreas = (e) => {
    // const { name, value } = e.target;
    const { label } = e ? e : (e = { label: "null" });
    if (label !== "null") {
      setErrorAreas(false);
      setLeyendaErrorAreas("");
    }

    setareas((prevState) => ({
      ...prevState,
      Name: label,
    }));
    // console.log(areas)
  };

  const handleChangeSubArea = (e) => {
    // const { name, value } = e.target;
    // console.log(e.target.value)
    // setSubArea((prevState) => ({
    //   ...prevState,
    //   [name]: value,
    // }));
    const { label } = e ? e : (e = { label: "null" });
    if (label !== "null") {
      setErrorSubArea(false);
      setLeyendaErrorSubArea("");
    }

    setSubArea((prevState) => ({
      ...prevState,
      Name: label,
    }));
    // console.log(SubArea)
  };

  const handleChangeOperations = (e) => {
    const { label } = e ? e : (e = { label: "null" });
    if (label !== "null") {
      setErrorPlanta(false);
      setLeyendaErrorPlanta("");
    }

    setOperations((prevState) => ({
      ...prevState,
      Name: label,
    }));
    // console.log(operations)
  };

  const handleChangeCountries = (e) => {
    // const { name, value } = e.target;
    const { label } = e ? e : (e = { label: "null" });
    if (label !== "null") {
      setErrorCountries(false);
      setLeyendaErrorCountries("");
    }

    setCountries((prevState) => ({
      ...prevState,
      Name: label,
    }));
  };

  const handleChangeBu = (e) => {
    // const { name, value } = e.target;
    const { label } = e ? e : (e = { label: "null" });
    if (label !== "null") {
      setErrorBU(false);
      setLeyendaErrorBU("");
    }

    setBu((prevState) => ({
      ...prevState,
      Name: label,
    }));
    // console.log(bu)
  };

  const handleChangeLine = (e) => {
    const { name, value } = e.target;
    // const { label } = e ? e : e = { label: 'null' };
    if (value !== "null") {
      setErrorLineNumber(false);
      setLeyendaErrorLineNumber("");
    }

    setLine((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangeLineTypes = (e) => {
    // const { name, value } = e.target;
    // console.log(e.target.value)
    const { label } = e ? e : (e = { label: "null" });
    if (label !== "null") {
      setErrorLineTypes(false);
      setLeyendaLineTypes("");
    }

    setLineTypes((prevState) => ({
      ...prevState,
      Name: label,
    }));
  };

  //------------- Editar los datos de la tabla en el Modal Editar -------------
  const editar = async (e) => {
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
    equipo.ServicesInformation.PlantaResponsable = PlantaResponsable.Name;
    equipo.ServicesInformation.AreaResponsable = AreaResponsable.Name;

    equipo.FinancialInformation = financialInformation;
    equipo.FinancialInformation.FechaActualizacion = fecha;
    equipo.FinancialInformation.EncargadoActualizacion = `${userByToken.Name} ${userByToken.LastName}`;

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
    // console.log(equipo);
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
    setFormStep(0);
    desetCamposVacios();
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
        ResponsableEquipo: Equipo.ServicesInformation.ResponsableEquipo,
        PlantaResponsable: Equipo.ServicesInformation.PlantaResponsable,
        AreaResponsable: Equipo.ServicesInformation.AreaResponsable,
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
      `${globalApi}/financialInformation/${Equipo.FinancialInformation.Id_FinancialInformation}`,
      {
        EquipmentValueInUSD: Equipo.FinancialInformation.EquipmentValueInUSD,
        Activo_fijo: Equipo.FinancialInformation.Activo_fijo,
        Soc: Equipo.FinancialInformation.Soc,
        Concatenar: Equipo.FinancialInformation.Concatenar,
        Clase: Equipo.FinancialInformation.Clase,
        Centro: Equipo.FinancialInformation.Centro,
        CodPM: Equipo.FinancialInformation.CodPM,
        Centro_de_costos: Equipo.FinancialInformation.Centro_de_costos,
        Fecha_de_capitalizacion:
          Equipo.FinancialInformation.Fecha_de_capitalizacion,
        Valor_Adquirido: Equipo.FinancialInformation.Valor_Adquirido,
        Amortizacion_acumulada:
          Equipo.FinancialInformation.Amortizacion_acumulada,
        Valor_Contable: Equipo.FinancialInformation.Valor_Contable,
        Moneda: Equipo.FinancialInformation.Moneda,
        Cantidad: Equipo.FinancialInformation.Cantidad,
        Tipo: Equipo.FinancialInformation.Tipo,
        Screen: Equipo.FinancialInformation.Screen,
        Nom_Clase: Equipo.FinancialInformation.Nom_Clase,
        Nom_Ce: Equipo.FinancialInformation.Nom_Ce,
        Encontrado_SI_NO: Equipo.FinancialInformation.Encontrado_SI_NO,
        Estado_del_Activo: Equipo.FinancialInformation.Estado_del_Activo,
        Categoria: Equipo.FinancialInformation.Categoria,
        Gerencia: Equipo.FinancialInformation.Gerencia,
        Codigo_De_Barras: Equipo.FinancialInformation.Codigo_De_Barras,
        DI: Equipo.FinancialInformation.DI,
        SN: Equipo.FinancialInformation.SN,
        Depreciacion_acumulada_ajustada:
          Equipo.FinancialInformation.Depreciacion_acumulada_ajustada,
        Tasa_Cambio_contra_dolar:
          Equipo.FinancialInformation.Tasa_Cambio_contra_dolar,
        Latitud: Equipo.FinancialInformation.Latitud,
        Longitud: Equipo.FinancialInformation.Longitud,
        Period_Time: Equipo.FinancialInformation.Period_Time,
        Id_Equipment: Equipo.Id_Equipment,
        EncargadoActualizacion: Equipo.FinancialInformation.EncargadoActualizacion,
        FechaActualizacion: Equipo.FinancialInformation.FechaActualizacion,
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
        MotivodeBaja: Equipo.TechnicalSpecification.OptionalTechInfo.MotivodeBaja,
        MotivodeBajaOtro: Equipo.TechnicalSpecification.OptionalTechInfo.MotivodeBajaOtro,
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

    if (optionalTechInfo.MotivodeBaja === null) {
      setErrorMotivoBaja(true);
      setLeyendaErrorMotivoBaja("Campo Requerido");
    } else if (optionalTechInfo.MotivodeBaja === "Otro") {
      if (optionalTechInfo.MotivodeBajaOtro === null) {
        setErrorMotivoBajaOtro(true);
        setLeyendaErrorMotivoBajaOtro("Campo Requerido");
      } else {
        const equipo = equipoSeleccionado;
        equipo.Estado = false;
        equipo.TechnicalSpecification.OptionalTechInfo = optionalTechInfo;

        setGetAllList(
          getAllList.filter(
            (equipo) => equipo.Id_Equipment !== equipoSeleccionado.Id_Equipment
          )
        );
        EliminarEquipment(equipo);
        setModalEliminar(false);
      }
    } else {
      const equipo = equipoSeleccionado;
      equipo.Estado = false;
      equipo.TechnicalSpecification.OptionalTechInfo = optionalTechInfo;
      equipo.TechnicalSpecification.OptionalTechInfo.MotivodeBajaOtro = null;

      setGetAllList(
        getAllList.filter(
          (equipo) => equipo.Id_Equipment !== equipoSeleccionado.Id_Equipment
        )
      );
      EliminarEquipment(equipo);
      setModalEliminar(false);
    }
  };

  const EliminarEquipment = async (Equipo) => {
    await Axios.put(`${globalApi}/equipment/${Equipo.Id_Equipment}`, {
      Name: Equipo.Name,
      code: Equipo.code,
      img: Equipo.img,
      Id_Procedencia: Equipo.Id_Procedencia,
      Estado: Equipo.Estado,
    });
    await Axios.put(
      `${globalApi}/optionalTechInfo/${Equipo.TechnicalSpecification.Id_TechnicalSpecification}`,
      {
        MotivodeBaja: Equipo.TechnicalSpecification.OptionalTechInfo.MotivodeBaja,
        MotivodeBajaOtro: Equipo.TechnicalSpecification.OptionalTechInfo.MotivodeBajaOtro,
      }
    ).then(() => {
      alert("Successful Remove");
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
          MotivodeBaja: "",
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
      ResponsableEquipo: "",
      PlantaResponsable: "",
      AreaResponsable: "",
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
    setFinancialInformation({
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
      EncargadoActualizacion: null,
      FechaActualizacion: null,
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
      MotivodeBaja: "",
      MotivodeBajaOtro: "",
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
    setareas({
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
          bu: { Id_BU: null, Name: "" },
        },
      },
    });
    setOperations({
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
    setCountries({
      Id_Countries: "",
      Name: "",
      Id_BU: "",
      bu: { Id_BU: null, Name: "" },
    });
    setBu({
      Id_BU: "",
      Name: "",
    });
    setSubArea({
      Id_SubAreas: "",
      Name: "",
      Id_Areas: "",
    });
    setLineTypes({
      Id_LineTypes: "",
      Name: "",
    });
    setAreaResponsable({
      Name: "",
    })
    setPlantaResponsable({
      Name: "",
    })

    seteditingNewServInfo(false);
    setModalInsertar(true);
    setFormStepInsertar(1);
  };

  // const arbirModalConsultaAv = () => {
  //     setModalConsultaAv(true);
  // }

  //  ----------------------------------     insertar    ------------------------------------------------------

  const [leyendaErrorPlanta, setLeyendaErrorPlanta] = useState(""); //--------- Manejo de campos vacios -----------
  const [leyendaErrorLineTypes, setLeyendaLineTypes] = useState("");
  const [leyendaErrorCountries, setLeyendaErrorCountries] = useState("");
  const [leyendaErrorBU, setLeyendaErrorBU] = useState("");
  const [leyendaErrorAreas, setLeyendaErrorAreas] = useState("");
  const [leyendaErrorSubArea, setLeyendaErrorSubArea] = useState("");
  const [leyendaErrorLineNumber, setLeyendaErrorLineNumber] = useState("");
  const [leyendaErrorNombre, setLeyendaErrorNombre] = useState("");
  const [errorPlanta, setErrorPlanta] = useState(false);
  const [errorLineTypes, setErrorLineTypes] = useState(false);
  const [errorCountries, setErrorCountries] = useState(false);
  const [errorBU, setErrorBU] = useState(false);
  const [errorAreas, setErrorAreas] = useState(false);
  const [errorSubArea, setErrorSubArea] = useState(false);
  const [errorLineNumber, setErrorLineNumber] = useState(false); //--------- Manejo de campos vacios -----------
  const [errorNombre, setErrorNombre] = useState(false);

  const insertar = async () => {
    if (line?.number === "") {
      setLeyendaErrorLineNumber("Campo requerido");
      setErrorLineNumber(true);
    } else if (operations?.Name === "") {
      setErrorLineNumber(false);
      setLeyendaErrorLineNumber("");
      setLeyendaErrorPlanta("Campo requerido");
      setErrorPlanta(true);
    } else if (lineTypes?.Name === "") {
      setErrorPlanta(false);
      setLeyendaErrorPlanta("");
      setLeyendaLineTypes("Campo requerido");
      setErrorLineTypes(true);
    } else if (countries?.Name === "") {
      setErrorLineTypes(false);
      setLeyendaLineTypes("");
      setLeyendaErrorCountries("Campo requerido");
      setErrorCountries(true);
    } else if (bu?.Name === "") {
      setErrorCountries(false);
      setLeyendaErrorCountries("");
      setLeyendaErrorBU("Campo requerido");
      setErrorBU(true);
    } else if (areas?.Name === "") {
      setErrorBU(false);
      setLeyendaErrorBU("");
      setLeyendaErrorAreas("Campo requerido");
      setErrorAreas(true);
    } else if (SubArea?.Name === "") {
      setErrorAreas(false);
      setLeyendaErrorAreas("");
      setLeyendaErrorSubArea("Campo requerido");
      setErrorSubArea(true);
    } else if (equipoSeleccionado.Name === "") {
      setErrorAreas(false);
      setLeyendaErrorAreas("");
      setEditing(true);
      setEditingServiceInfo(false);
      // technicalInformation
      // editingServiceInfo
      setErrorNombre(true);
      setLeyendaErrorNombre("Campo requerido");
    } else if (technicalInformation.currentWorking === "") {
      setErrorCurrentWorking(true);
      setLeyendaCurrentWorking("Campo requerido");
    } else if (technicalInformation.EquipmentType === "") {
      setErrorEquipmentType(true);
      setLeyendaEquipmentType("Campo requerido");
    } else if (technicalInformation.Description === "") {
      setErrorDescription(true);
      setLeyendaDescription("Campo requerido");
    } else {
      setLeyendaErrorLineNumber("");
      setLeyendaErrorPlanta("");
      setLeyendaLineTypes("");
      setLeyendaErrorCountries("");
      setLeyendaErrorBU("");
      setLeyendaErrorAreas("");
      setLeyendaErrorSubArea("");
      setErrorLineNumber(false);
      setErrorPlanta(false);
      setErrorLineTypes(false);
      setErrorCountries(false);
      setErrorBU(false);
      setErrorAreas(false);
      setErrorSubArea(false);


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
      technicalInformation.Id_TechnicalSpecification =
        valorInsertar.Id_Equipment;
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
      // valorInsertar.TechnicalSpecification.OptionalTechInfo.Id_OptionalTechInfo = valorInsertar.TechnicalSpecification.Id_TechnicalSpecification

      // NO DATA AVAILABLE
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
      valorInsertar.ServicesInformation.PlantaResponsable = PlantaResponsable.Name;
      valorInsertar.ServicesInformation.AreaResponsable = AreaResponsable.Name;

      valorInsertar.FinancialInformation = financialInformation;
      valorInsertar.FinancialInformation.FechaActualizacion = fecha;
      valorInsertar.FinancialInformation.EncargadoActualizacion = `${userByToken.Name} ${userByToken.LastName}`;
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

      // console.log(getAllList);

      // await sendData(valorInsertar);
      // console.log(valorInsertar);

      await insertAll(valorInsertar);

      setModalInsertar(false);
      seteditingNewServInfo(true);
      setTechInfoEditado(false);
      setModalEditar(false);
      setEditing(false);
      setEditingTechInfo(false);
      setEditingServiceInfo(false);
      setFormStepInsertar(0);
      desetCamposVacios();
    }
  };

  const insertAll = async (Equipment) => {
    await Axios.post(`${globalApi}/createEquipos`, Equipment);
  }
  //  -------------------------------------------------------------------------------------------------
  //  -------------------------------------------------------------------------------------------------
  // const sendData = async (valorInsertar) => {
  //   await sendBu(valorInsertar);
  //   await sendCountry(valorInsertar);
  //   await sendOperations(valorInsertar);
  //   await sendAreas(valorInsertar);
  //   await sendSubArea(valorInsertar);
  //   await sendlineType(valorInsertar);
  //   await sendline(valorInsertar);
  //   await sendProcedencia(valorInsertar);
  //   await sendEquipment(valorInsertar); // Equipment
  //   await sendFinancialInformation(valorInsertar);
  //   await sendSercivesInformation(valorInsertar); // Services Information
  //   await sendNewServicesInformation(valorInsertar);
  //   await sendTechnicalSpecification(valorInsertar); //Technical Specification
  //   await sendOptionalTechInfo(valorInsertar);
  //   await sendNewTechnicalSpec(valorInsertar);
  // };

  // -----------------------------        CREAR / INSERTAR NUEVO EQUIPO      ---------------------------------------------

  // const sendBu = async (valorInsertar) => {
  //   await Axios.post(`${globalApi}/bu`, {
  //     Id_BU: valorInsertar.Procedencia.areas.operations.countries.bu.Id_BU,
  //     Name: valorInsertar.Procedencia.areas.operations.countries.bu.Name,
  //   });
  //   // .then(() => {
  //   //     alert("Successful insert");
  //   // });
  // };

  // const sendCountry = async (valorInsertar) => {
  //   await Axios.post(`${globalApi}/countries`, {
  //     Id_Countries:
  //       valorInsertar.Procedencia.areas.operations.countries.Id_Countries,
  //     Name: valorInsertar.Procedencia.areas.operations.countries.Name,
  //     Id_BU: valorInsertar.Procedencia.areas.operations.countries.Id_BU,
  //   });
  // };

  // const sendOperations = async (valorInsertar) => {
  //   await Axios.post(`${globalApi}/planta`, {
  //     Id_Operations: valorInsertar.Procedencia.areas.operations.Id_Operations,
  //     Name: valorInsertar.Procedencia.areas.operations.Name,
  //     Id_Countries: valorInsertar.Procedencia.areas.operations.Id_Countries,
  //   });
  // };

  // const sendAreas = async (valorInsertar) => {
  //   await Axios.post(`${globalApi}/area`, {
  //     Id_Areas: valorInsertar.Procedencia.areas.Id_Areas,
  //     Name: valorInsertar.Procedencia.areas.Name,
  //     Id_Operations: valorInsertar.Procedencia.areas.Id_Operations,
  //   });
  // };

  // const sendSubArea = async (valorInsertar) => {
  //   await Axios.post(`${globalApi}/SubArea`, {
  //     Id_SubAreas: valorInsertar.Procedencia.areas.SubArea.Id_SubAreas,
  //     Name: valorInsertar.Procedencia.areas.SubArea.Name,
  //     Id_Areas: valorInsertar.Procedencia.areas.SubArea.Id_Areas,
  //   });
  // };

  // const sendline = async (valorInsertar) => {
  //   await Axios.post(`${globalApi}/line`, {
  //     Id_Line: valorInsertar.Procedencia.line.Id_Line,
  //     number: valorInsertar.Procedencia.line.number,
  //     Id_LineTypes: valorInsertar.Procedencia.line.Id_LineTypes,
  //   });
  // };

  // const sendlineType = async (valorInsertar) => {
  //   await Axios.post(`${globalApi}/lineType`, {
  //     Id_LineTypes: valorInsertar.Procedencia.line.lineTypes.Id_LineTypes,
  //     Name: valorInsertar.Procedencia.line.lineTypes.Name,
  //   });
  // };

  // const sendProcedencia = async (valorInsertar) => {
  //   await Axios.post(`${globalApi}/procedencia`, {
  //     Id_Procedencia: valorInsertar.Id_Procedencia,
  //     Id_Line: valorInsertar.Procedencia.line.Id_Line,
  //     Id_Areas: valorInsertar.Procedencia.areas.Id_Areas,
  //   });
  // };

  // const sendEquipment = async (valorInsertar) => {
  //   await Axios.post(`${globalApi}/equipment`, {
  //     Id_Equipment: valorInsertar.Id_Equipment,
  //     Name: valorInsertar.Name,
  //     code: valorInsertar.code,
  //     Id_Procedencia: valorInsertar.Procedencia.Id_Procedencia,
  //     Estado: valorInsertar.Estado,
  //     img: valorInsertar.img,
  //   });
  // };

  // const sendFinancialInformation = async (valorInsertar) => {
  //   await Axios.post(`${globalApi}/financialInformation`, {
  //     EquipmentValueInUSD:
  //       valorInsertar.FinancialInformation.EquipmentValueInUSD,
  //     Activo_fijo: valorInsertar.FinancialInformation.Activo_fijo,
  //     Soc: valorInsertar.FinancialInformation.Soc,
  //     Concatenar: valorInsertar.FinancialInformation.Concatenar,
  //     Clase: valorInsertar.FinancialInformation.Clase,
  //     Centro: valorInsertar.FinancialInformation.Centro,
  //     CodPM: valorInsertar.FinancialInformation.CodPM,
  //     Centro_de_costos: valorInsertar.FinancialInformation.Centro_de_costos,
  //     Fecha_de_capitalizacion:
  //       valorInsertar.FinancialInformation.Fecha_de_capitalizacion,
  //     Valor_Adquirido: valorInsertar.FinancialInformation.Valor_Adquirido,
  //     Amortizacion_acumulada:
  //       valorInsertar.FinancialInformation.Amortizacion_acumulada,
  //     Valor_Contable: valorInsertar.FinancialInformation.Valor_Contable,
  //     Cantidad: valorInsertar.FinancialInformation.Cantidad,
  //     Moneda: valorInsertar.FinancialInformation.Moneda,
  //     Tipo: valorInsertar.FinancialInformation.Tipo,
  //     Screen: valorInsertar.FinancialInformation.Screen,
  //     Nom_Clase: valorInsertar.FinancialInformation.Nom_Clase,
  //     Nom_Ce: valorInsertar.FinancialInformation.Nom_Ce,
  //     Encontrado_SI_NO: valorInsertar.FinancialInformation.Encontrado_SI_NO,
  //     Estado_del_Activo: valorInsertar.FinancialInformation.Estado_del_Activo,
  //     Categoria: valorInsertar.FinancialInformation.Categoria,
  //     Gerencia: valorInsertar.FinancialInformation.Gerencia,
  //     Codigo_De_Barras: valorInsertar.FinancialInformation.Codigo_De_Barras,
  //     DI: valorInsertar.FinancialInformation.DI,
  //     SN: valorInsertar.FinancialInformation.SN,
  //     Depreciacion_acumulada_ajustada:
  //       valorInsertar.FinancialInformation.Depreciacion_acumulada_ajustada,
  //     Tasa_Cambio_contra_dolar:
  //       valorInsertar.FinancialInformation.Tasa_Cambio_contra_dolar,
  //     Latitud: valorInsertar.FinancialInformation.Latitud,
  //     Longitud: valorInsertar.FinancialInformation.Longitud,
  //     Period_Time: valorInsertar.FinancialInformation.Period_Time,
  //     FechaActualizacion: valorInsertar.FinancialInformation.FechaActualizacion,
  //     EncargadoActualizacion:
  //       valorInsertar.FinancialInformation.EncargadoActualizacion,
  //     Id_Equipment: valorInsertar.Id_Equipment,
  //   });
  // };

  // const sendSercivesInformation = async (valorInsertar) => {
  //   await Axios.post(`${globalApi}/servicesInformation`, {
  //     Id_ServicesInformation:
  //       valorInsertar.ServicesInformation.Id_ServicesInformation,
  //     DateOfInstallation: valorInsertar.ServicesInformation.DateOfInstallation,
  //     DateOfDesintallation:
  //       valorInsertar.ServicesInformation.DateOfDesintallation,
  //     DesuseReason: valorInsertar.ServicesInformation.DesuseReason,
  //     DesinstallationReason:
  //       valorInsertar.ServicesInformation.DesinstallationReason,
  //     ProcurementOrder: valorInsertar.ServicesInformation.ProcurementOrder,
  //     Id_Equipment: valorInsertar.Id_Equipment,
  //   });
  // };

  // const sendNewServicesInformation = async (valorInsertar) => {
  //   valorInsertar.ServicesInformation.newServicesInformation.map(
  //     async (NSI) => {
  //       await Axios.post(`${globalApi}/newServInfo`, {
  //         Id_NewServInfo: NSI.Id_NewServInfo,
  //         Id_ServicesInformation:
  //           valorInsertar.ServicesInformation.Id_ServicesInformation,
  //         Name: NSI.Name,
  //         Value: NSI.Value,
  //       });

  //       await Axios.post(`${globalApi}/selectNewServInfo`, {
  //         Id_SelectNewServInfo: NSI.SelectNewServicesInfo.Id_SelectNewServInfo,
  //         Id_ServicesInformation:
  //           valorInsertar.ServicesInformation.Id_ServicesInformation,
  //         Id_NewServInfo: NSI.Id_NewServInfo,
  //       });
  //     }
  //   );
  // };

  // const sendTechnicalSpecification = async (valorInsertar) => {
  //   await Axios.post(`${globalApi}/technicalSpecification`, {
  //     Id_TechnicalSpecification:
  //       valorInsertar.TechnicalSpecification.Id_TechnicalSpecification,
  //     EquipmentType: valorInsertar.TechnicalSpecification.EquipmentType,
  //     CurrentConditions: valorInsertar.TechnicalSpecification.CurrentConditions,
  //     Weight: valorInsertar.TechnicalSpecification.Weight,
  //     OEM: valorInsertar.TechnicalSpecification.OEM,
  //     Description: valorInsertar.TechnicalSpecification.Description,
  //     ModelNumber: valorInsertar.TechnicalSpecification.ModelNumber,
  //     SerialNumber: valorInsertar.TechnicalSpecification.SerialNumber,
  //     vendor: valorInsertar.TechnicalSpecification.vendor,
  //     currentWorking: valorInsertar.TechnicalSpecification.currentWorking,
  //     Id_Equipment: valorInsertar.Id_Equipment,
  //   });
  // };

  // const sendOptionalTechInfo = async (valorInsertar) => {
  //   await Axios.post(`${globalApi}/optionalTechInfo`, {
  //     Id_OptionalTechInfo:
  //       valorInsertar.TechnicalSpecification.OptionalTechInfo
  //         .Id_OptionalTechInfo,
  //     NominalCapacity:
  //       valorInsertar.TechnicalSpecification.OptionalTechInfo.NominalCapacity,
  //     YearOfConstruction:
  //       valorInsertar.TechnicalSpecification.OptionalTechInfo
  //         .YearOfConstruction,
  //     EquipmentCurrentConditionsComments:
  //       valorInsertar.TechnicalSpecification.OptionalTechInfo
  //         .EquipmentCurrentConditionsComments,
  //     NotesAboutEquipment:
  //       valorInsertar.TechnicalSpecification.OptionalTechInfo
  //         .NotesAboutEquipment,
  //     AssambledDissambled:
  //       valorInsertar.TechnicalSpecification.OptionalTechInfo
  //         .AssambledDissambled,
  //     PlantTechnicalInformationContact:
  //       valorInsertar.TechnicalSpecification.OptionalTechInfo
  //         .PlantTechnicalInformationContact,
  //     PlantFinancialInformationContact:
  //       valorInsertar.TechnicalSpecification.OptionalTechInfo
  //         .PlantFinancialInformationContact,
  //     Width: valorInsertar.TechnicalSpecification.OptionalTechInfo.Width,
  //     Height: valorInsertar.TechnicalSpecification.OptionalTechInfo.Height,
  //     Depth: valorInsertar.TechnicalSpecification.OptionalTechInfo.Depth,
  //     ConstructionMaterials:
  //       valorInsertar.TechnicalSpecification.OptionalTechInfo
  //         .ConstructionMaterials,
  //     ExternalCoating:
  //       valorInsertar.TechnicalSpecification.OptionalTechInfo.ExternalCoating,
  //     CommunicationProtocol:
  //       valorInsertar.TechnicalSpecification.OptionalTechInfo
  //         .CommunicationProtocol,
  //     MeasurementVariable:
  //       valorInsertar.TechnicalSpecification.OptionalTechInfo
  //         .MeasurementVariable,
  //     ElectricalConsumption:
  //       valorInsertar.TechnicalSpecification.OptionalTechInfo
  //         .ElectricalConsumption,
  //     ProtectionGrade:
  //       valorInsertar.TechnicalSpecification.OptionalTechInfo.ProtectionGrade,
  //     SanitaryGrade:
  //       valorInsertar.TechnicalSpecification.OptionalTechInfo.SanitaryGrade,
  //     AvailableWarranty:
  //       valorInsertar.TechnicalSpecification.OptionalTechInfo.AvailableWarranty,
  //     RemainingWarrantyYears:
  //       valorInsertar.TechnicalSpecification.OptionalTechInfo
  //         .RemainingWarrantyYears,
  //     PeripheralDevicesAccesories:
  //       valorInsertar.TechnicalSpecification.OptionalTechInfo
  //         .PeripheralDevicesAccesories,
  //     WorkingHours:
  //       valorInsertar.TechnicalSpecification.OptionalTechInfo.WorkingHours,
  //     LaboratoryEquipment:
  //       valorInsertar.TechnicalSpecification.OptionalTechInfo
  //         .LaboratoryEquipment,
  //     Id_TechnicalSpecification:
  //       valorInsertar.TechnicalSpecification.OptionalTechInfo
  //         .Id_TechnicalSpecification,
  //     MotivodeBaja: valorInsertar.TechnicalSpecification.OptionalTechInfo.MotivodeBaja,
  //   });
  // };

  // const sendNewTechnicalSpec = async (valorInsertar) => {
  //   valorInsertar.TechnicalSpecification.newTechnicalSpecification.map(
  //     async (NTS) => {
  //       await Axios.post(`${globalApi}/NewTechInfo`, {
  //         Id_NewTechSpec: NTS.Id_NewTechSpec,
  //         Id_TechnicalSpecification:
  //           valorInsertar.TechnicalSpecification.Id_TechnicalSpecification,
  //         Name: NTS.Name,
  //         Value: NTS.Value,
  //       });

  //       await Axios.post(`${globalApi}/selectNewTechSpec`, {
  //         Id_SelectNewTechSpec: NTS.SelectNewTechSpec.Id_SelectNewTechSpec,
  //         Id_TechnicalSpecification:
  //           valorInsertar.TechnicalSpecification.Id_TechnicalSpecification,
  //         Id_NewTechSpec: NTS.Id_NewTechSpec,
  //       });
  //     }
  //   );
  // };

  //  -----------------------------------------------------------------------------------------------------------
  //  -----------------------------------------------------------------------------------------------------------

  // ------------------------------       ADD NEW TECHINICAL INFORMATION       ---------------------------
  const [newTechicInformation, setnewTechicInformation] = useState([]);
  const [newservInformation, setnewservInformation] = useState([]);

  // const onSubmit = (data, e) => {
  //   data.Id_NewTechSpec = uuidv4();

  //   const newTechnicalSpec = {
  //     Id_NewTechSpec: data.Id_NewTechSpec,
  //     Id_TechnicalSpecification: null,
  //     Name: data.Name,
  //     Value: data.Value,
  //     SelectNewTechSpec: {
  //       Id_SelectNewTechSpec: uuidv4(),
  //       Id_TechnicalSpecification: "",
  //       Id_NewTechSpec: data.Id_NewTechSpec,
  //     },
  //   };

  //   let newTechnicalSpecification =
  //     equipoSeleccionado.TechnicalSpecification.newTechnicalSpecification;
  //   newTechnicalSpecification.push(newTechnicalSpec);

  //   setnewTechicInformation(newTechnicalSpecification);
  //   e.target.reset();
  // };

  // ------------------------------       ADD NEW TECHINICAL INFORMATION EN MODAL EDITAR      ---------------------------

  // const onSubmitTechSpech = async (data, e) => {
  //   data.Id_NewTechSpec = uuidv4();

  //   const newTechnicalSpec = {
  //     Id_NewTechSpec: data.Id_NewTechSpec,
  //     Id_TechnicalSpecification:
  //       equipoSeleccionado.TechnicalSpecification.Id_TechnicalSpecification,
  //     Name: data.Name,
  //     Value: data.Value,
  //     SelectNewTechSpec: {
  //       Id_SelectNewTechSpec: uuidv4(),
  //       Id_TechnicalSpecification:
  //         equipoSeleccionado.TechnicalSpecification.Id_TechnicalSpecification,
  //       Id_NewTechSpec: data.Id_NewTechSpec,
  //     },
  //   };

  //   let newTechnicalSpecification =
  //     equipoSeleccionado.TechnicalSpecification.newTechnicalSpecification;
  //   newTechnicalSpecification.unshift(newTechnicalSpec);

  //   await sendNewTechnicalSpecEDITMODAL(newTechnicalSpec);
  //   e.target.reset();
  // };

  // const sendNewTechnicalSpecEDITMODAL = async (valorInsertar) => {
  //   await Axios.post(`${globalApi}/NewTechInfo`, {
  //     Id_NewTechSpec: valorInsertar.Id_NewTechSpec,
  //     Id_TechnicalSpecification: valorInsertar.Id_TechnicalSpecification,
  //     Name: valorInsertar.Name,
  //     Value: valorInsertar.Value,
  //   });

  //   await Axios.post(`${globalApi}/selectNewTechSpec`, {
  //     Id_SelectNewTechSpec:
  //       valorInsertar.SelectNewTechSpec.Id_SelectNewTechSpec,
  //     Id_TechnicalSpecification: valorInsertar.Id_TechnicalSpecification,
  //     Id_NewTechSpec: valorInsertar.Id_NewTechSpec,
  //   });
  // };

  //  -------------------------------------------------------     ELIMINAR AD TECHNICAL INFO       --------------------------

  // const eliminarAddTechInfo = async (id) => {
  //   let indice =
  //     equipoSeleccionado.TechnicalSpecification.newTechnicalSpecification.findIndex(
  //       (equipo) => {
  //         return equipo.Id_NewTechSpec === id;
  //       }
  //     );

  //   const idSelectNewTechSpec =
  //     equipoSeleccionado.TechnicalSpecification.newTechnicalSpecification.find(
  //       (nts) => nts.Id_NewTechSpec === id
  //     );
  //   const idSelectNewTech =
  //     idSelectNewTechSpec.SelectNewTechSpec.Id_SelectNewTechSpec;

  //   let newTechnicalSpecification =
  //     equipoSeleccionado.TechnicalSpecification.newTechnicalSpecification;
  //   newTechnicalSpecification.splice(indice, 1);

  //   await deleteNewTechnicalSpec(id, idSelectNewTech);

  //   setEditingTechInfo(false);
  //   setEditingTechInfo(true);
  // };

  // const deleteNewTechnicalSpec = async (id, idSelectNewTech) => {
  //   await Axios.delete(`${globalApi}/selectNewTechSpec/${idSelectNewTech}`);

  //   await Axios.delete(`${globalApi}/NewTechInfo/${id}`).then((id) => {
  //     alert("successfully removed");
  //   });
  // };

  // const [prueba, setPrueba] = useState(null);

  // const update = (equipo) => {
  //   //  Elimina New Services Information
  //   setEquipoSeleccionado(equipo);
  //   setPrueba(1);
  // };

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

  // const [filaEditada, setfilaEditada] = useState(false); // Para dar efecto a la fila editada

  // const editarTechSpec = (elemento, caso) => {
  //   setId(null);
  //   setfilaEditada(true);
  //   editRow(elemento, caso);
  // };

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

  // const updateAddTechInfo = async (id, updatedTechInfo, e) => {
  //   //Editar o actualizar informacion tecnica seleccionada
  //   setEditingTechInfo(false);
  //   let NewEquipment = equipoSeleccionado;

  //   NewEquipment.TechnicalSpecification.newTechnicalSpecification.map((NSI) => {
  //     if (NSI.Id_NewTechSpec === id) {
  //       NSI.Name = updatedTechInfo.Name;
  //       NSI.Value = updatedTechInfo.Value;
  //     }
  //   });

  //   setEquipoSeleccionado(NewEquipment);
  //   setId(updatedTechInfo.Id_NewTechSpec); //Para seleccionar la fila editada y dar efecto
  // };

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

  // --------------------------  FILTRAR POR BU EN SIDEMENU ------------------

  const filtrarBUList = async (bu, n) => {
    const list = getAllList;

    let counter = 0;

    if (contador === 0) {
      setList(list);
      if (bu === "total") {
        return null;
      } else {
        setGetAllList(
          filterPlantaFn.fn(
            getAllList.filter(
              (equipo) =>
                equipo.Procedencia.areas.operations.countries.bu.Name === bu
            )
          )
        );
      }
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
  const [filterPlantaFn, setFilterPlantaFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const handleSearchPlanta = (e) => {
    // -------------- Filtrar por planta en el menu desplegable
    // let target = e.target;
    setFilterPlantaFn({
      fn: (items) => {
        if (e === "None") return items;
        else
          return items.filter((x) =>
            x.Procedencia.areas.operations.Name.toLowerCase().includes(
              e.toLowerCase()
            )
          );
      },
    });
  };

  useEffect(() => {
    setGetAllList(filterPlantaFn.fn(getAllList));
    // filtrarBUList()
  }, [filterPlantaFn]);

  const [totalEncontrados, setTotalEncontrados] = useState(getAllList.length);

  const handleSearch = (e, filtro) => {
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
              x.TechnicalSpecification.SerialNumber.toLowerCase().includes(
                target.value.toLowerCase()
              ) ||
              x.TechnicalSpecification.EquipmentType.toLowerCase().includes(
                target.value.toLowerCase()
              )
            // ||
            // x.Id_Equipment.toLowerCase().includes(target.value.toLowerCase())
            // x.FinancialInformation.Activo_fijo === null ? "null".toLowerCase().includes(target.value.toLowerCase()) : x.FinancialInformation.Activo_fijo.toLowerCase().includes(target.value.toLowerCase())
          );
        // 152030006085
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

    // Convertidos a 2 d??gitos
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

  const [Disabled, setDisabled] = useState(false);

  const columns = [
    {
      field: "Id_Equipment",
      headerName: "ID Equipo",
      hide: true,
      width: 90,
      valueGetter: (params) => {
        return params.row.Id_Equipment
      },
    },
    {
      field: "Name",
      headerName: "Equipo",
      flex: 1,
      width: 400,
      headerClassName: "header",
      fontWeight: 500,
      "&:nthOfType(odd)": {
        backgroundColor: theme.palette.primary.dark,
      },

      renderCell: (params) => {
        return (
          <div
            style={{
              borderBottom: "0",
              color:
                theme.palette.type === "dark"
                  ? theme.palette.primary.light
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
    //     headerName: "N??mero de serie",
    //     width: 180,
    //     valueGetter: (params) => {
    //         return params.row.TechnicalSpecification.SerialNumber;
    //     }
    // },
    {
      field: "bu",
      headerName: "BU",
      // flex: 1,
      width: 85,
      valueGetter: (params) => {
        return params.row.Procedencia.areas.operations.countries.bu.Name;
      },
      /* width: 150, */
    },
    {
      field: "country",
      headerName: "Pa??s",
      width: 150,
      valueGetter: (params) => {
        return params.row.Procedencia.areas.operations.countries.Name;
      },
    },
    {
      field: "plant",
      headerName: "Planta",

      width: 180,
      valueGetter: (params) => {
        return params.row.Procedencia.areas.operations.Name;
      },
    },
    {
      field: "area",
      headerName: "??rea",
      width: 210,
      valueGetter: (params) => {
        return params.row.Procedencia.areas.Name;
      },
    },
    {
      field: "FechaActualizacion",
      headerName: "Fecha Actualizacion",
      width: 170,
      valueGetter: (params) => {
        return params.row.FinancialInformation.FechaActualizacion ? params.row.FinancialInformation.FechaActualizacion : "NO DATA AVAILABLE"
      },
    },
    {
      field: "Valor_Contable",
      headerName: "Valor en Libros",
      width: 170,
      valueGetter: (params) => {
        return params.row.FinancialInformation.Valor_Contable || params.row.FinancialInformation.Valor_Contable === 0 ? `${params.row.FinancialInformation.Valor_Contable} - ${params.row.FinancialInformation.Moneda}` : "NO DATA AVAILABLE"
      },
    },
    {
      field: "currendCondition",
      headerName: "Condici??n actual",
      width: 155,
      // sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <div className="d-flex justify-content-between">
          <div
            // onClick={() => seleccionarEquipo(params.row, "Editar")}
            component="span"
          >
            {
              params.row.TechnicalSpecification.CurrentConditions === "Excellent" ? <Grid item xs={3} style={{ color: "orange" }}>
                <StarIcon fontSize="small" /> <StarIcon fontSize="small" /> <StarIcon fontSize="small" />
                <StarIcon fontSize="small" /> <StarIcon fontSize="small" />
              </Grid> :
                params.row.TechnicalSpecification.CurrentConditions === "Good" ? <Grid item xs={3} style={{ color: "orange" }}>
                  <StarIcon fontSize="small" />
                  <StarIcon fontSize="small" />
                  <StarIcon fontSize="small" />
                  <StarIcon fontSize="small" />
                  <StarBorderIcon fontSize="small" />
                </Grid> :
                  params.row.TechnicalSpecification.CurrentConditions === "Regular" ? <Grid item xs={3} style={{ color: "orange" }}>
                    <StarIcon fontSize="small" />
                    <StarIcon fontSize="small" />
                    <StarIcon fontSize="small" />
                    <StarBorderIcon fontSize="small" />
                    <StarBorderIcon fontSize="small" />
                  </Grid> :
                    params.row.TechnicalSpecification.CurrentConditions === "Bad" ? <Grid item xs={3} style={{ color: "orange" }}>
                      <StarIcon fontSize="small" />
                      <StarIcon fontSize="small" />
                      <StarBorderIcon fontSize="small" />
                      <StarBorderIcon fontSize="small" />
                      <StarBorderIcon fontSize="small" />
                    </Grid> :
                      params.row.TechnicalSpecification.CurrentConditions === "To be disposed" ? <Grid item xs={3} style={{ color: "orange" }}>
                        <StarIcon fontSize="small" />
                        <StarBorderIcon fontSize="small" />
                        <StarBorderIcon fontSize="small" />
                        <StarBorderIcon fontSize="small" />
                        <StarBorderIcon fontSize="small" />
                      </Grid> :
                        params.row.TechnicalSpecification.CurrentConditions === "Deshecho" ? <Grid item xs={3} style={{ color: "orange" }}>
                          <StarBorderIcon fontSize="small" />
                          <StarBorderIcon fontSize="small" />
                          <StarBorderIcon fontSize="small" />
                          <StarBorderIcon fontSize="small" />
                          <StarBorderIcon fontSize="small" />
                        </Grid> : "NO DATA AVAILABLE"
            }
          </div>
        </div>
      ),
    },
    {
      field: "Campos",
      headerName: "Campos",
      width: 96,
      headerClassName: "table-title",
      renderCell: (params) => {
        return <PriorityChip params={params} />;
      },
      disableClickEventBubbling: true,
    },
    {
      field: "Activo_fijo",
      headerName: "ID SAP",
      hide: true,
      width: 170,
      valueGetter: (params) => {
        return params.row.FinancialInformation.Activo_fijo
      },
    },

    // {
    //     field: "subarea",
    //     headerName: "Sub??rea",
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
      width: 110,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <div className="d-flex justify-content-between">
          <div
            onClick={() => {
              seleccionarEquipo(params.row, "Editar");
              setFormStep(1);
            }}
            component="span"
          >
            <IconButton
              style={{
                color:
                  theme.palette.type === "dark"
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
          {
            ["ADMIN", "Maintenance Director", "SPOC Maintenance BU", "Maintenance Manager",
              "Maintenance Coordinator Area"].includes(userByToken.Roles?.Name) && (
              <>
                {/* {
                  setDisabled(false)
                } */}
                <BtnEliminar
                  seleccionarEquipo={seleccionarEquipo}
                  params={params}
                // Disabled={Disabled}
                />
              </>
            )
          }

          {
            userByToken.Roles?.Name === "Viewer" && (
              <>
                {
                  setDisabled(true)
                }
                <BtnEliminar
                  seleccionarEquipo={seleccionarEquipo}
                  params={params}
                  Disabled={Disabled}
                />
              </>
            )
          }

        </div>
      ),
    },
  ];

  const [tranferirModal, settranferirModal] = useState(false);

  //--------- Validar Campos Selects  -------------
  const onSubmit = (e) => {
    // console.log(e)
    // setEditing(true);
    // setEditingTechInfo(false);
    setFormStepInsertar((cur) => cur + 1);
  };

  const nextForm = () => {
    setFormStep((cur) => cur + 1);
    setFormStepInsertar((cur) => cur + 1);
  };

  const backForm = () => {
    setFormStep((cur) => cur - 1);
    setFormStepInsertar((cur) => cur - 1);
  };


  // const borrarTechnInfo = () => {
  //   // let tech = technicalInformation;
  //   // tech.CurrentConditions = "";
  //   // setTechnicalInformation(equipoSeleccionado.TechnicalSpecification)
  // } 
  const [Roles, setRoles] = useState(true);
  const [GuardarPorPlanta, setGuardarPorPlanta] = useState(true);

  useEffect(() => {   // Boton Nuevo Equipo
    if (["ADMIN", "Maintenance Director", "SPOC Maintenance BU", "Maintenance Manager",
      "Maintenance Coordinator Area"].includes(userByToken.Roles?.Name)) {
      setRoles(false);
      setGuardarPorPlanta(false);
    } else {
      setRoles(true);
    }
  }, [userByToken.Roles?.Name]);

  //  ----------------- Descargar desde EXCEL -----------
  const downloadExcel = (data) => {
    const datos = filterFn.fn(getAllList);

    const Json = datos.map((d) => {
      return (d = {
        ID: d.Id_Equipment,
        Name: d.Name,
        BU: d.Procedencia.areas.operations.countries.bu.Name,
        Pais: d.Procedencia.areas.operations.countries.Name,
        planta: d.Procedencia.areas.operations.Name,
        area: d.Procedencia.areas.Name,
        SubArea: d.Procedencia.areas.SubArea.Name,
        Description: d.TechnicalSpecification.Description,
        lineNumber: d.Procedencia.line.number,
        lineTypes: d.Procedencia.line.lineTypes.Name,
        DesuseReason: d.ServicesInformation.DesuseReason,
        EquipmentType: d.TechnicalSpecification.EquipmentType,
        currentWorking: d.TechnicalSpecification.currentWorking,
        CurrentConditions: d.TechnicalSpecification.CurrentConditions,
        NotesAboutEquipment: d.TechnicalSpecification.OptionalTechInfo.NotesAboutEquipment,
        Gmail: d.code,
        EquipmentValueInUSD: d.FinancialInformation.EquipmentValueInUSD,
        Activo_fijo: d.FinancialInformation.Activo_fijo,
        Soc: d.FinancialInformation.Soc,
        Concatenar: d.FinancialInformation.Concatenar,
        Clase: d.FinancialInformation.Clase,
        Centro: d.FinancialInformation.Centro,
        CodPM: d.FinancialInformation.CodPM,
        Centro_de_costos: d.FinancialInformation.Centro_de_costos,
        Fecha_de_capitalizacion: d.FinancialInformation.Fecha_de_capitalizacion,
        Valor_Adquirido: d.FinancialInformation.Valor_Adquirido,
        Amortizacion_acumulada: d.FinancialInformation.Amortizacion_acumulada,
        Valor_Contable: d.FinancialInformation.Valor_Contable,
        Moneda: d.FinancialInformation.Moneda,
        Cantidad: d.FinancialInformation.Cantidad,
        Tipo: d.FinancialInformation.Tipo,
        Screen: d.FinancialInformation.Screen,
        Nom_Clase: d.FinancialInformation.Nom_Clase,
        Nom_Ce: d.FinancialInformation.Nom_Ce,
        Encontrado_SI_NO: d.FinancialInformation.Encontrado_SI_NO,
        Estado_del_Activo: d.FinancialInformation.Estado_del_Activo,
        Categoria: d.FinancialInformation.Categoria,
        Gerencia: d.FinancialInformation.Gerencia,
        Codigo_De_Barras: d.FinancialInformation.Codigo_De_Barras,
        DI: d.FinancialInformation.DI,
        SN: d.FinancialInformation.SN,
        Depreciacion_acumulada_ajustada: d.FinancialInformation.Depreciacion_acumulada_ajustada,
        Tasa_Cambio_contra_dolar: d.FinancialInformation.Tasa_Cambio_contra_dolar,
        Latitud: d.FinancialInformation.Latitud,
        Longitud: d.FinancialInformation.Longitud,
        Period_Time: d.FinancialInformation.Period_Time,
        FechaActualizacion: d.FinancialInformation.FechaActualizacion,
        EncargadoActualizacion: d.FinancialInformation.EncargadoActualizacion,
        DateOfInstallation: d.ServicesInformation.DateOfInstallation,
        DateOfDesintallation: d.ServicesInformation.DateOfDesintallation,
        DesinstallationReason: d.ServicesInformation.DesinstallationReason,
        ProcurementOrder: d.ServicesInformation.ProcurementOrder,
        Weight: d.TechnicalSpecification.Weight,
        OEM: d.TechnicalSpecification.OEM,
        ModelNumber: d.TechnicalSpecification.ModelNumber,
        SerialNumber: d.TechnicalSpecification.SerialNumber,
        vendor: d.TechnicalSpecification.vendor,
        NominalCapacity: d.TechnicalSpecification.OptionalTechInfo.NominalCapacity,
        YearOfConstruction: d.TechnicalSpecification.OptionalTechInfo.YearOfConstruction,
        EquipmentCurrentConditionsComments: d.TechnicalSpecification.OptionalTechInfo.EquipmentCurrentConditionsComments,
        AssambledDissambled: d.TechnicalSpecification.OptionalTechInfo.AssambledDissambled,
        PlantTechnicalInformationContact: d.TechnicalSpecification.OptionalTechInfo.PlantTechnicalInformationContact,
        PlantFinancialInformationContact: d.TechnicalSpecification.OptionalTechInfo.PlantFinancialInformationContact,
        Width: d.TechnicalSpecification.OptionalTechInfo.Width,
        Depth: d.TechnicalSpecification.OptionalTechInfo.Depth,
        Height: d.TechnicalSpecification.OptionalTechInfo.Height,
        ConstructionMaterials: d.TechnicalSpecification.OptionalTechInfo.ConstructionMaterials,
        ExternalCoating: d.TechnicalSpecification.OptionalTechInfo.ExternalCoating,
        CommunicationProtocol: d.TechnicalSpecification.OptionalTechInfo.CommunicationProtocol,
        MeasurementVariable: d.TechnicalSpecification.OptionalTechInfo.MeasurementVariable,
        ElectricalConsumption: d.TechnicalSpecification.OptionalTechInfo.ElectricalConsumption,
        ProtectionGrade: d.TechnicalSpecification.OptionalTechInfo.ProtectionGrade,
        SanitaryGrade: d.TechnicalSpecification.OptionalTechInfo.SanitaryGrade,
        AvailableWarranty: d.TechnicalSpecification.OptionalTechInfo.AvailableWarranty,
        RemainingWarrantyYears: d.TechnicalSpecification.OptionalTechInfo.RemainingWarrantyYears,
        PeripheralDevicesAccesories: d.TechnicalSpecification.OptionalTechInfo.PeripheralDevicesAccesories,
        WorkingHours: d.TechnicalSpecification.OptionalTechInfo.WorkingHours,
        LaboratoryEquipment: d.TechnicalSpecification.OptionalTechInfo.LaboratoryEquipment,
      })
    })

    const worksheet = XLSX.utils.json_to_sheet(Json);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    //let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
    //XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workbook, "DataSheet.xlsx");
  };


  // function CustomFooterStatusComponent(props) {
  //   return (
  //     <Box sx={{ padding: '10px', display: 'flex' }}>
  //       <FiberManualRecordIcon
  //         fontSize="small"
  //         sx={{
  //           mr: 2,
  //           color: props.status === 'connected' ? '#4caf50' : '#d9182e',
  //         }}
  //       />
  //       Status {props.status}
  //     </Box>
  //   );
  // }

  // CustomFooterStatusComponent.propTypes = {
  //   status: PropTypes.oneOf(['connected', 'disconnected']).isRequired,
  // };





  const [Otros, setOtros] = useState("");
  const [ErrorMotivoBaja, setErrorMotivoBaja] = useState(false);
  const [LeyendaErrorMotivoBaja, setLeyendaErrorMotivoBaja] = useState("");
  const [ErrorMotivoBajaOtro, setErrorMotivoBajaOtro] = useState(false);
  const [LeyendaErrorMotivoBajaOtro, setLeyendaErrorMotivoBajaOtro] = useState("");

  const [ConteoDescripcion, setConteoDescripcion] = useState(300);
  const RestConteoDescripcion = 300;












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
          handleSearchPlanta={handleSearchPlanta}
        />

        <Header
          setLight={setLight}
          light={light}
          userByToken={userByToken}
          history={history}
        />

        <Paper
          light={light}
          className={classes.pageContent}
          style={{
            backgroundColor:
              theme.palette.type === "dark" ? "#514A69" : "#FFFFFF",
          }}
        >
          {/* <EmployeeForm /> */}
          <Toolbar className="align-items-center">
            <Controls.txt
              label="Buscar equipos"
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
              onChange={(e) => {
                handleSearch(e, "all");
              }}
            />

            <Controls.Button
              disabled={Roles}
              variant="contained"
              size="large"
              color="secondary"
              startIcon={<Add style={{ fontSize: 16, fontWeight: "800" }} />}
              onClick={() => abrirModalInsertar()}
              style={{ fontSize: 16, fontWeight: "600" }}
              text={"Nuevo"}
            ></Controls.Button>

            {/* --------------- Esportar A Excel  ------------ */}
            {/* <button onClick={() => this.downloadExcel(filterFn.fn(getAllList))}>
              Download As Excel
            </button>

            <Controls.Button
              disabled={Roles}
              variant="contained"
              size="large"
              color="secondary"
              startIcon={<Add style={{ fontSize: 16, fontWeight: "800" }} />}
              onClick={() => downloadExcel(filterFn.fn(getAllList))}
              style={{ fontSize: 16, fontWeight: "600" }}
              text={"Descargar Excel"}
            ></Controls.Button> */}

            {/* -----------------------  Boton para insertar datos desde Excel   ----------------------------------- */}
            {/* -----------------------------------  Carga Masiva  ----------------------------------------------------- */}

            {/* <div id="imagen">
              <input
                id="icon-button-file"
                type="file"
                style={{ display: 'none' }}
                onChange={(e) => {
                  setItem([]);
                  setModalInsertarExcel(false);
                  let file = e.target.files[0];

                  readExcels(file);
                  file = null;
                }}
              />

              <label htmlFor="icon-button-file">
                <IconButton color="primary" aria-label="upload picture"
                  component="span">

                  <Add style={{ fontSize: 34, fontWeight: '800' }} />
                </IconButton>
              </label>
            </div> */}
            {/* -----------------------------------  Carga Masiva  ----------------------------------------------------- */}

          </Toolbar>

          <div
            style={{
              height: 805,
              width: "100%",
              border: "0",
              color:
                theme.palette.type === "dark"
                  ? theme.palette.background.dark
                  : theme.palette.background.light,
              backgroundColor:
                theme.palette.type === "dark"
                  ? "#514A69"
                  : theme.palette.background.light,
              "&:nthOfType(odd)": {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
          >
            <DataGrid
              columns={columns}
              rows={filterFn.fn(getAllList)}
              loading={getAllList.length === 0}
              disableSelectionOnClick
              pageSize={13}
              rowsPerPageOptions={[13, 20, 50]}
              // hideFooterPagination={true}
              // hideFooter={true}
              components={{
                Toolbar: CustomToolbar,
                NoRowsOverlay: CustomNoRowsOverlay,
              }}
              // initialState={{
              // }}
              // sx={{ m: 2 }}
              // style={{ color:"blue"}}
              // rowHeight={45}
              // maxColumns={100}
              localeText={esES.components.MuiDataGrid.defaultProps.localeText}
              light={light}
              style={{
                // height: 520,
                border: "0",
                borderBottom: "0",
                color:
                  theme.palette.type === "dark"
                    ? theme.palette.primary.light
                    : theme.palette.primary.dark,
                "&:MuiDataGridMenuList": {
                  // &:MuiDataGrid-menuList
                  backgroundColor: theme.palette.primary.dark,
                },
              }}
            />
          </div>
          <Toolbar className={"mt-0"}>
            <PageHeader
              contador={`${totalEncontrados} resultados`}
              style={{ fontSize: 12 }}
            />
            <Grid item sm></Grid>
            <Grid item sm></Grid>

            <PageHeader subTitle="Fecha actualizada:" />

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
              <img src={planning} style={{ width: "380px" }} alt="" />
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
                    theme.palette.type === "dark"
                      ? theme.palette.primary.light
                      : theme.palette.secondary,
                }}
              >
                Editar Registro
              </h1>
            </div>
          </ModalHeader>


          {formStep === 1 && ( //  ----------- DATOS DE UBICACION --------
            <>
              <ModalBody className="row text-align-center  animate__animated animate__fadeIn">
                {/* //-------------------------------------   BOTON DE VISUALIZAR Y Descargar PDF   ------------------------------ */}
                <FormGroup>
                  {/* -------------------------   BOTON PARA VISUALIZAR PDF    ----------------------------- */}
                  {/* <Button
                    color="primary"
                    className="mr-2"
                    onClick={() => {
                      setdescargarPdf(!descargarPdf);
                    }}
                  >
                    {" "}
                    {descargarPdf ? "Ocultar PDF" : "Visualizar PDF"}{" "}
                  </Button> */}
                  {/* -------------------------------------------------------------------------------------- */}

                  {/* -------------------------   BOTON PARA DESCARGAR PDF    ----------------------------- */}

                  {/* <PDFDownloadLink
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
                  </PDFDownloadLink> */}


                  {/* -----------------------------   BOTON PARA TRANSFERIR EQUIPO  ------------------------ */}
                  {/* <Button
                      color="primary"
                      className="ml-2"
                      onClick={() => {
                        settranferirModal(!tranferirModal);
                      }}
                    >
                      {tranferirModal ? "Ocultar Transferir" : "Transferir"}
                    </Button> */}
                </FormGroup>

                {tranferirModal ? (
                  <>
                    <TransferirModal
                      light={light}
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
                          {/* <PDFViewer style={{ width: "100%", height: "90vh" }}>
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
                          </PDFViewer> */}
                        </ModalBody>
                      </>
                    ) : (
                      // ------------------------------    Editar Registro  -----------------------------------
                      <>
                        <ModalBody className="row text-align-center  animate__animated animate__fadeIn">
                          {/* -----------------------------       Subir Imagen       ----------------------------- */}
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
                                    alt=""
                                  />
                                </>
                              )}
                            </div>

                            {/* ms-5 */}
                            <div className="input-group my-3 input-group-lg justify-content-center">
                              <input
                                style={{
                                  color:
                                    theme.palette.type === "dark"
                                      ? theme.palette.primary.dark
                                      : theme.palette.secondary.dark,
                                  backgroundColor: "transparent",
                                  maxWidth: 380,
                                }}
                                name="file"
                                type="file"
                                className="form-control "
                                id="inputGroupFile03"
                                aria-describedby="inputGroupFileAddon03"
                                aria-label="Upload an image"
                                onChange={uploadImage}
                              />
                            </div>
                          </FormGroup>
                          {/* --------------------------------------    UBICACION  ------------------------------------- */}

                          <FormGroup className="col-6">
                            <TextField
                              readOnly
                              autoComplete="off"
                              label="Id"
                              className="form-control"
                              variant="outlined"
                              name="Id_Equipment"
                              // value={getAllList.length + 1}
                              value={
                                equipoSeleccionado &&
                                equipoSeleccionado.Id_Equipment
                              }
                            />
                          </FormGroup>

                          <FormGroup className="col-6">
                            <TextField
                              label="N??mero de l??nea"
                              className="form-control"
                              variant="outlined"
                              name="number"
                              required
                              // fullWidth
                              value={line && line.number}
                              onChange={handleChangeLine}
                            />
                          </FormGroup>

                          <FormGroup className="col-6">
                            <Autocomplete
                              disablePortal
                              id="combo-box-demo"
                              options={select.Planta}
                              // sx={{ width: 300 }}
                              fullWidth
                              defaultValue={operations && operations.Name}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Seleccionar Planta"
                                  variant="outlined"
                                  required
                                  error={errorPlanta}
                                  helperText={leyendaErrorPlanta}
                                />
                              )}
                              onChange={(e, newValue) => {
                                handleChangeOperations(newValue);
                              }}
                            />
                          </FormGroup>

                          <FormGroup className="col-6">
                            <Autocomplete
                              disablePortal
                              id="combo-box-demo"
                              options={select.TipoLinea}
                              // sx={{ width: 300 }}
                              fullWidth
                              defaultValue={lineTypes && lineTypes.Name}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Seleccionar Tipo de L??nea"
                                  variant="outlined"
                                  required
                                />
                              )}
                              onChange={(e, newValue) => {
                                handleChangeLineTypes(newValue);
                              }}
                            />
                          </FormGroup>

                          <FormGroup className="col-6">
                            <Autocomplete
                              disablePortal
                              id="combo-box-demo"
                              options={select.Pais}
                              // sx={{ width: 300 }}
                              fullWidth
                              defaultValue={countries && countries.Name}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Seleccionar Pa??s"
                                  variant="outlined"
                                  required
                                  error={errorCountries}
                                  helperText={leyendaErrorCountries}
                                />
                              )}
                              onChange={(e, newValue) => {
                                handleChangeCountries(newValue);
                              }}
                            />
                          </FormGroup>

                          <FormGroup className="col-6">
                            <Autocomplete
                              disablePortal
                              id="combo-box-demo"
                              options={select.BU}
                              // sx={{ width: 300 }}
                              fullWidth
                              defaultValue={bu && bu.Name}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Seleccionar BU"
                                  variant="outlined"
                                  required
                                  error={errorBU}
                                  helperText={leyendaErrorBU}
                                />
                              )}
                              onChange={(e, newValue) => {
                                handleChangeBu(newValue);
                              }}
                            />
                          </FormGroup>

                          <FormGroup className="col-6">
                            <Autocomplete
                              disablePortal
                              id="combo-box-demo"
                              options={select.Areas}
                              // sx={{ width: 300 }}
                              fullWidth
                              defaultValue={areas && areas.Name}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Seleccionar ??rea"
                                  variant="outlined"
                                  required
                                  error={errorAreas}
                                  helperText={leyendaErrorAreas}
                                />
                              )}
                              onChange={(e, newValue) => {
                                handleChangeAreas(newValue);
                              }}
                            />
                          </FormGroup>

                          <FormGroup className="col-6">
                            <Autocomplete
                              disablePortal
                              id="combo-box-demo"
                              options={select.SubArea}
                              // sx={{ width: 300 }}
                              fullWidth
                              defaultValue={SubArea && SubArea.Name}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Seleccionar Sub??rea"
                                  variant="outlined"
                                  required
                                  error={errorSubArea}
                                  helperText={leyendaErrorSubArea}
                                />
                              )}
                              onChange={(e, newValue) => {
                                handleChangeSubArea(newValue);
                              }}
                            />
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

                          {/* -------------------------    BOTONES IZQUIERDA - DERECHA    ------------------------------- */}
                          <FormGroup className="row justify-content-between align-items-center">
                            <Grid
                              xs={4}
                              className="d-flex justify-content-start"
                            >
                              <Button
                                color="secondary"
                                className="d-none"
                                onClick={() => backForm()}
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
                                count={4}
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
                                style={{
                                  color:
                                    theme.palette.type === "dark"
                                      ? "#ffffff"
                                      : "#000000",
                                }}
                                onClick={() => {
                                  nextForm()
                                  // console.log(equipoSeleccionado);
                                }}
                              >
                                Informaci??n t??cnica
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
            </>
          )}

          {formStep === 2 && ( // Informacion Tecnica
            <>
              <div className="p-3">
                <h4
                  style={{
                    color:
                      theme.palette.type === "dark"
                        ? theme.palette.primary.light
                        : theme.palette.secondary,
                  }}
                >
                  Informaci??n t??cnica
                </h4>
              </div>

              <ModalBody className="row animate__animated animate__fadeIn">
                <FormGroup className="col-8">
                  {/* <label>Equipo:</label>
                  <input
                    className="form-control"
                    type="text text-align=center"
                    name="Name"
                    value={equipoSeleccionado && equipoSeleccionado.Name}
                    onChange={handleChange}
                  /> */}
                  <TextField
                    label="Equipo"
                    className="form-control"
                    variant="outlined"
                    name="Name"
                    required
                    value={equipoSeleccionado && equipoSeleccionado.Name}
                    error={errorName}
                    helperText={leyendaName}
                    onChange={(e) => {
                      handleChange(e)
                      if (e.target.value !== "null") {
                        setErrorName(false);
                        setLeyendaName("");
                      }
                    }}
                  />
                </FormGroup>

                <FormGroup className="col-4">
                  {/* <label>Trabajo actual:</label>
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
                  </select> */}

                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select">
                      Trabajo actual*
                    </InputLabel>
                    <Select
                      name="currentWorking"
                      error={errorCurrentWorking}
                      labelId="demo-simple-select"
                      value={technicalInformation && technicalInformation.currentWorking}
                      label="Trabajo actual"
                      variant="outlined"
                      required={true}
                      onChange={(e) => {
                        handleChange(e)
                        if (e.target.value !== "null") {
                          setErrorCurrentWorking(false);
                          setLeyendaCurrentWorking("");
                        }
                      }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="Instalado y funcionando">Instalado y funcionando</MenuItem>
                      <MenuItem value="Instalado y no trabajando">Instalado y no trabajando</MenuItem>
                      <MenuItem value="No instalado">No instalado</MenuItem>
                      <MenuItem value="NO DATA AVAILABLE">NO DATA AVAILABLE</MenuItem>
                    </Select>
                    {leyendaCurrentWorking ? <span style={{ color: "#d32f2f", fontSize: "14px" }} >Campo Requerido</span> : null}
                  </FormControl>
                </FormGroup>

                {/* <FormGroup className="col-4">
                    <label htmlFor="CurrentConditions">
                      Condici??n actual:
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
                      <option value="">Seleccione Condici??n actual</option>
                      <option value="Excellent">Excelente</option>
                      <option value="Good">Bueno</option>
                      <option value="Regular">Regular</option>
                      <option value="Bad">Malo</option>
                      <option value="To be disposed"> Para ser desechado </option>
                      <option value="Deshecho"> Deshecho </option>

                    </select>
                  </FormGroup> */}

                <FormGroup className="col-4">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select">
                      Tipo de equipo*
                    </InputLabel>
                    <Select
                      name="EquipmentType"
                      labelId="demo-simple-select"
                      value={technicalInformation && technicalInformation.EquipmentType}
                      error={errorEquipmentType}
                      label="Tipo de equipo *"
                      variant="outlined"
                      required={true}
                      onChange={(e) => {
                        handleChange(e)
                        if (e.target.value !== "null") {
                          setErrorEquipmentType(false);
                          setLeyendaEquipmentType("");
                        }
                      }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="AUTOMATION / ELECTRONIC">Automatizaci??n / Electr??nico</MenuItem>
                      <MenuItem value="ELECTRICAL">Electrico</MenuItem>
                      <MenuItem value="MECHANICAL">Mec??nico</MenuItem>
                      <MenuItem value="NO DATA AVAILABLE">NO DATA AVAILABLE</MenuItem>
                    </Select>
                    {leyendaEquipmentType ? <span style={{ color: "#d32f2f", fontSize: "14px" }} >Campo Requerido</span> : null}
                  </FormControl>

                </FormGroup>

                <FormGroup className="col-4">
                  {/* <label>N??mero de serial:</label>
                  <input
                    className="form-control"
                    type="text text-align=center"
                    name="SerialNumber"
                    value={
                      technicalInformation && technicalInformation.SerialNumber
                    }
                    onChange={handleChange}
                  /> */}
                  <TextField
                    label="N??mero de serial"
                    className="form-control"
                    variant="outlined"
                    name="SerialNumber"
                    // required
                    value={technicalInformation && technicalInformation.SerialNumber}
                    onChange={handleChange}
                  />
                </FormGroup>

                <FormGroup className="col-4">
                  {/* <label>N??mero de modelo:</label>
                  <input
                    className="form-control"
                    type="text text-align=center"
                    name="ModelNumber"
                    value={
                      technicalInformation && technicalInformation.ModelNumber
                    }
                    onChange={handleChange}
                  /> */}
                  <TextField
                    label="N??mero de modelo"
                    className="form-control"
                    variant="outlined"
                    name="ModelNumber"
                    // required
                    value={technicalInformation && technicalInformation.ModelNumber}
                    onChange={handleChange}
                  />
                </FormGroup>

                {/* <FormGroup className="col-4">
                  <TextField
                    label="Peso"
                    className="form-control"
                    variant="outlined"
                    name="Weight"
                    // required
                    value={technicalInformation && technicalInformation.Weight}
                    onChange={handleChange}
                  />
                </FormGroup> */}

                <FormGroup className="col-4">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select">
                      Peso
                    </InputLabel>
                    <Select
                      name="Weight"
                      labelId="demo-simple-select"
                      value={technicalInformation && technicalInformation.Weight}
                      label="Peso"
                      variant="outlined"
                      required
                      onChange={handleChange}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="Pesado">Pesado</MenuItem>
                      <MenuItem value="Mediano">Mediano</MenuItem>
                      <MenuItem value="Ligero">Ligero</MenuItem>
                    </Select>
                  </FormControl>
                </FormGroup>


                {/* <label>Peso:</label>
                    <input
                      className="form-control"
                      type="text text-align=center"
                      name="Weight"
                      value={technicalInformation && technicalInformation.Weight}
                      onChange={handleChange}
                    /> */}

                <FormGroup className="col-4">
                  {/* <label>OEM:</label>
                  <input
                    className="form-control"
                    type="text text-align=center"
                    name="OEM"
                    value={technicalInformation && technicalInformation.OEM}
                    onChange={handleChange}
                  /> */}
                  <TextField
                    label="OEM"
                    className="form-control"
                    variant="outlined"
                    name="OEM"
                    // required
                    value={technicalInformation && technicalInformation.OEM}
                    onChange={handleChange}
                  />
                </FormGroup>

                <FormGroup className="col-4">
                  {/* <label>Vendedor:</label>
                  <input
                    className="form-control"
                    type="text text-align=center"
                    name="vendor"
                    value={technicalInformation && technicalInformation.vendor}
                    onChange={handleChange}
                  /> */}
                  <TextField
                    label="Vendedor"
                    className="form-control"
                    variant="outlined"
                    name="vendor"
                    // required
                    value={technicalInformation && technicalInformation.vendor}
                    onChange={handleChange}
                  />
                </FormGroup>

                <FormGroup className="col-8">
                  {/* <label>Descripci??n:</label>
                  <input
                    className="form-control"
                    type="text text-align=center"
                    name="Description"
                    value={
                      technicalInformation && technicalInformation.Description
                    }
                    onChange={handleChange}
                  /> */}
                  <TextField
                    label="Descripci??n"
                    className="form-control"
                    variant="outlined"
                    name="Description"
                    required
                    value={
                      technicalInformation && technicalInformation.Description
                    }
                    error={errorDescription}
                    helperText={leyendaDescription}
                    onChange={(e) => {
                      handleChange(e)
                      if (e.target.value !== "null") {
                        setErrorDescription(false);
                        setLeyendaDescription("");
                      }
                    }}
                  />
                </FormGroup>

                <hr />
                {/* -------------------------------       ADD NEW TECHNICAL INFORMATION        ------------------------------------------ */}
                <Calification
                  light={light}
                  technicalInformation={technicalInformation}
                  setTechnicalInformation={setTechnicalInformation}
                  errorCurrendConditions={errorCurrendConditions}
                  leyendaCurrendConditions={leyendaCurrendConditions}
                  setErrorCurrendConditions={setErrorCurrendConditions}
                  setLeyendaCurrendConditions={setLeyendaCurrendConditions}
                />

                {/* setErrorCurrendConditions
                setLeyendaCurrendConditions */}

                <OptionalInfo
                  optionalTechInfo={optionalTechInfo}
                  handleChangeOptionalInfo={handleChangeOptionalInfo}
                  light={light}
                />

                {/* -------------------------    BOTONES IZQUIERDA - DERECHA    ------------------------------- */}

                <FormGroup className="row align-items-center justify-content-between">
                  <Grid xs={4} className="d-flex justify-content-start ">
                    {/* ------------------------------------------------------------------------------ */}
                    <Button
                      // color=""
                      onClick={() => {
                        backForm();
                      }}
                    >
                      <ArrowBackIcon />
                      Consulta Equipos
                    </Button>
                  </Grid>
                  <Grid xs={4} className="d-flex justify-content-center">
                    {" "}
                    <Pagination
                      count={4}
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
                      // color=""
                      onClick={() => {
                        nextForm();
                        setCasoServInfo("Edit");
                        setId(null);
                      }}
                    >
                      Informaci??n de servicios
                      <ArrowForwardIcon />
                    </Button>
                  </Grid>
                  {/* -------------------------    BOTONES IZQUIERDA DERECHA    ------------------------------- */}
                </FormGroup>
              </ModalBody>
            </>
          )}

          {formStep === 3 && ( // Informacion de servicio
            <ServiceInformation
              handleChangeServicesInformation={handleChangeServicesInformation}
              handleChangeServicesInfoPlanta={handleChangeServicesInfoPlanta}
              handleChangeServicesInfoArea={handleChangeServicesInfoArea}
              PlantaResponsable={PlantaResponsable}
              AreaResponsable={AreaResponsable}
              servicesInformation={servicesInformation}
              light={light}
              backForm={backForm}
              nextForm={nextForm}
              errorResponsable={errorResponsable}
              setErrorResponsable={setErrorResponsable}
              leyendaResponsable={leyendaResponsable}
              setLeyendaResponsable={setLeyendaResponsable}
              errorPlantaResponsable={errorPlantaResponsable}
              leyendaPlantaResponsable={leyendaPlantaResponsable}
              errorAreaResponsable={errorAreaResponsable}
              leyendaAreaResponsable={leyendaAreaResponsable}
            // casoServInfo={casoServInfo}
            // setEditingTechInfo={setEditingTechInfo}
            // equipoSeleccionado={equipoSeleccionado}
            // editRow={editRow}
            // setEditing={setEditing}
            // setEditingServiceInfo={setEditingServiceInfo}
            // seteditingNewServInfo={seteditingNewServInfo}
            // setnewservInformation={setnewservInformation}
            />
          )}
          {formStep === 4 && ( // Informacion financiera
            <FinancialInfo
              financialInformation={financialInformation}
              handleChangeFinancialInfo={handleChangeFinancialInfo}
              backForm={backForm}
              nextForm={nextForm}
              light={light}
              errorActivoFijo={errorActivoFijo}
              setErrorActivoFijo={setErrorActivoFijo}
              leyendaActivoFijo={leyendaActivoFijo}
              setLeyendaActivoFijo={setLeyendaActivoFijo}
              errorValorContable={errorValorContable}
              setErrorValorContable={setErrorValorContable}
              leyendaValorContable={leyendaValorContable}
              setLeyendaValorContable={setLeyendaValorContable}
              errorMoneda={errorMoneda}
              setErrorMoneda={setErrorMoneda}
              leyendaMoneda={leyendaMoneda}
              setLeyendaMoneda={setLeyendaMoneda}
            />
          )}



          {/* -------------------------    BOTONES gAR Y CANCELAR    ------------------------------- */}

          <ModalFooter>
            <Button
              style={{
                color:
                  theme.palette.type === "dark"
                    ? theme.palette.primary.light
                    : theme.palette.secondary.light,
              }}
              name="cancelar"
              variant="outlined"
              onClick={() => {
                setModalEditar(false);
                // borrarTechnInfo();
                // setEditing(false);
                // setEditingTechInfo(false);
                // setEditingServiceInfo(false);
                setFormStep(0);
                desetCamposVacios();
              }}
            >
              Cancelar
            </Button>
            {
              tranferirModal ? (
                <>
                  <Button
                    style={{
                      color: "#ffffff",
                      backgroundColor:
                        theme.palette.type === "dark"
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
                  {
                    // userByToken?.roleId === 1 || userByToken?.roleId === 4 ?
                    ["ADMIN", "Maintenance Director", "SPOC Maintenance BU", "Maintenance Manager",
                      "Maintenance Coordinator Area"].includes(userByToken.Roles?.Name) ? (
                      <Button
                        disabled={GuardarPorPlanta}
                        style={{
                          color: "#ffffff",
                          backgroundColor:
                            theme.palette.type === "dark"
                              ? theme.palette.secondary.light
                              : "#6200EE",
                        }}
                        variant="contained"
                        type="submit"
                        onClick={() => editar()}
                      >
                        {GuardarPorPlanta ? <LockSharp /> : "Guardar Registro"}
                      </Button>
                    ) : (
                      <Button
                        disabled={Roles}
                        style={{
                          color: "#ffffff",
                          backgroundColor:
                            theme.palette.type === "dark"
                              ? theme.palette.secondary.light
                              : "#6200EE",
                        }}
                        variant="contained"
                        type="submit"
                        onClick={() => editar()}
                      >
                        Guardar Registro
                      </Button>
                    )}
                </>
              )}
          </ModalFooter>
        </Modal>

        {/*============================= Modal Eliminar =========================================*/}

        <Modal isOpen={modalEliminar}
          className={`modalForm ${theme.palette.type}`}
          style={{ maxWidth: 500 }}
        >
          <ModalHeader>
            <div>
              <h5
                style={{
                  color:
                    theme.palette.type === "dark"
                      ? theme.palette.primary.light
                      : theme.palette.secondary,
                }}
              >
                Est??s seguro que deseas eliminar el equipo: <br />

              </h5>
              <h6 style={{
                color:
                  theme.palette.type === "dark"
                    ? theme.palette.primary.light
                    : theme.palette.secondary,
              }}>
                {equipoSeleccionado && equipoSeleccionado.Name}
              </h6>
            </div>

          </ModalHeader>

          <ModalBody className="row text-align-center" >

            <FormGroup className="col-12 mt-2">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select">
                  Motivo de Baja*
                </InputLabel>
                <Select
                  name="MotivodeBaja"
                  labelId="demo-simple-select"
                  value={optionalTechInfo && optionalTechInfo.MotivodeBaja}
                  error={ErrorMotivoBaja}
                  label="Motivo de Baja *"
                  variant="outlined"
                  required={true}
                  onChange={(e) => {
                    handleChangeOptionalInfo(e)
                    if (e.target.value !== "null") {
                      setErrorMotivoBaja(false);
                      setLeyendaErrorMotivoBaja("");
                      if (e.target.value === "Otro") {
                        setOtros("1");
                      } else {
                        setOtros("");
                      }
                    }
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Venta del equipo">Venta del equipo</MenuItem>
                  <MenuItem value="Traslado del equipo a otra planta">Traslado del equipo a otra planta</MenuItem>
                  <MenuItem value="Equipo puesto en operaci??n">Equipo puesto en operaci??n</MenuItem>
                  <MenuItem value="Equipo Chatarrizado">Equipo Chatarrizado</MenuItem>
                  <MenuItem value="Otro">Otro</MenuItem>
                </Select>
                {LeyendaErrorMotivoBaja ? <span style={{ color: "#d32f2f", fontSize: "14px" }} >Campo Requerido</span> : null}
              </FormControl>
            </FormGroup>

            {
              Otros && (
                <FormGroup className="col-12">
                  <TextField
                    label={`Descripci??n - ${ConteoDescripcion}`}
                    error={ErrorMotivoBajaOtro}
                    helperText={LeyendaErrorMotivoBajaOtro}
                    multiline
                    rows={3}
                    className="form-control"
                    variant="outlined"
                    name="MotivodeBajaOtro"
                    value={optionalTechInfo && optionalTechInfo.MotivodeBajaOtro}
                    onChange={(e) => {
                      let value = e.target.value.length;
                      if (value <= 300) {
                        setConteoDescripcion(RestConteoDescripcion - value);
                        handleChangeOptionalInfo(e);
                        if (e.target.value !== "null") {
                          setErrorMotivoBajaOtro(false);
                          setLeyendaErrorMotivoBajaOtro("")
                        }
                      }
                    }
                    }
                  />
                </FormGroup>
              )
            }

          </ModalBody>

          <ModalFooter
          // className="justify-content-center"
          // style={{
          //   backgroundColor:
          //     theme.palette.type === "dark" ? "#3F3857" : "#FFFFFF",
          // }}
          >
            <Button
              style={{
                color:
                  theme.palette.type === "dark"
                    ? theme.palette.primary.light
                    : theme.palette.secondary.light,
              }}
              variant="outlined"
              onClick={() => setModalEliminar(false)}
            >
              No quiero eliminar
            </Button>
            <Button
              disabled={Disabled}
              style={{
                color: "#ffffff",
                backgroundColor:
                  theme.palette.type === "dark"
                    ? theme.palette.secondary.light
                    : "#6200EE",
              }}
              variant="contained"
              onClick={() => eliminar()}
            >
              {Disabled ? (<>S??, eliminar <LockSharp className="ml-2" /></>) : "S??, eliminar"}
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
            fecha={fecha}
            userByToken={userByToken}
          />
        </Modal>

        {/*================================================ Modal Insertar - Crear Nuevo Equipo =================================================*/}

        <Modal
          isOpen={modalInsertar}
          style={{
            maxWidth: 800,
          }}
          className={`modalForm ${theme.palette.type}`}
        >
          <ModalHeader>
            <div>
              <h1
                style={{
                  color:
                    theme.palette.type === "dark"
                      ? theme.palette.primary.light
                      : theme.palette.secondary,
                }}
              >
                Nuevo Registro
              </h1>
            </div>
          </ModalHeader>

          {formStepInsertar === 1 && ( // ----------- Insertar Registros - Ubicacion
            <div>
              {/* -----------------------------------           Insertar Registros        ------------------------------------------- */}
              <div>
                <h6
                  style={{
                    color:
                      theme.palette.type === "dark"
                        ? theme.palette.primary.light
                        : theme.palette.secondary,
                  }}
                >
                  Detalles Generales
                </h6>
              </div>

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
                          alt=""
                        />
                      </>
                    )}
                  </div>

                  <div
                    id="imagen"
                    className="mt-2 justify-content-center text-center animate__animated animate__fadeInLeft"
                    style={{ alignContent: "center" }}
                  >
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
                       > */}
                  </div>
                </FormGroup>

                <form onSubmit={handleSubmit(onSubmit)} className="row">
                  <FormGroup className="col-6">
                    {/* <label>Id:</label>
                      <input
                        className="form-control"
                        readOnly
                        type="text text-align=center"
                        name="Id_Equipment"
                        value={getAllList.length + 1}
                      /> */}

                    <TextField
                      readOnly
                      label="Id"
                      className="form-control"
                      variant="outlined"
                      name="Id_Equipment"
                      value={getAllList.length + 1}
                    // fullWidth
                    />
                  </FormGroup>

                  <FormGroup className="col-6">
                    {/* <label>N??mero de l??nea:</label>
                      <input
                        className="form-control"
                        type="text text-align=center"
                        name="number"
                        value={line ? line.number : ""}
                        onChange={handleChangeLine}
                        required
                      /> */}

                    <TextField
                      label="N??mero de l??nea"
                      className="form-control"
                      variant="outlined"
                      name="number"
                      required
                      error={errorLineNumber}
                      helperText={leyendaErrorLineNumber}
                      // fullWidth
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

                    {/* ----------------------------------------------------------------------------------- */}

                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={select.Planta}
                      // sx={{ width: 300 }}
                      fullWidth
                      name="operation"
                      defaultValue={operations ? operations.Name : null}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={errorPlanta}
                          helperText={leyendaErrorPlanta}
                          label="Seleccione Planta"
                          variant="outlined"
                          required
                        />
                      )}
                      onChange={(e, newValue) => {
                        handleChangeOperations(newValue);
                      }}
                    />

                    {/* ----------------------------------------------------------------------------------- */}

                    {/* <label>
                        Planta <b className="text-danger">*</b>
                      </label>
                      <select
                        className="form-select SelectBoostrap"
                        name="Name"
                        required
                        onChange={handleChangeOperations}
                      >
                        <option value="">Seleccione Planta</option>
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
                        <option value="MAZATL??N">MAZATL??N</option>
                        <option value="MODELO M??XICO">MODELO M??XICO</option>
                        <option value="SALAMANCA (CASAL)">
                          SALAMANCA (CASAL)
                        </option>
                        <option value="TORRE??N">TORRE??N</option>
                        <option value="TUXTEPEC">TUXTEPEC</option>
                        <option value="YUCATAN">YUCATAN</option>
                        <option value="ZACATECAS">ZACATECAS</option>
                        <option value="CUCAP?? (CRAFT)">CUCAP?? (CRAFT)</option>
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
                        <option value="SAINT VINCENT">SAINT VINCENT</option>
                        <option value="BOGOT?? BREWERY COMPANY (CRAFT)">
                          BOGOT?? BREWERY COMPANY (CRAFT)
                        </option>
                      </select> */}

                    {/* {
                          operationsList.map((elemento) => (
                          <option value={elemento.Id_Operations}>{elemento.Name}</option>
                          ))
                        } */}
                  </FormGroup>

                  <FormGroup className="col-6">
                    {/* ----------------------------------------------------------------------------------- */}
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={select.TipoLinea}
                      // sx={{ width: 300 }}
                      fullWidth
                      defaultValue={lineTypes && lineTypes.Name}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Seleccione Tipo de L??nea"
                          required
                          variant="outlined"
                          error={errorLineTypes}
                          helperText={leyendaErrorLineTypes}
                        />
                      )}
                      onChange={(e, newValue) => {
                        handleChangeLineTypes(newValue);
                      }}
                    />
                    {/* ----------------------------------------------------------------------------------- */}

                    {/* // value={lineTypes ? lineTypes : ""}
                          // onChange={handleChangeLineTypes} */}

                    {/* <label htmlFor="lineType">
                        Tipo de l??nea <b className="text-danger">*</b>
                      </label>
                      <select
                        className="form-select SelectBoostrap"
                        name="Name"
                        onChange={handleChangeLineTypes}
                      >
                        <option value="">Seleccione Tipo de L??nea</option>
                        <option value="BREWLINE">BREWLINE</option>
                        <option value="BOTTLE">BOTTLE</option>
                        <option value="CAN">CAN</option>
                        <option value="PET">PET</option>
                        <option value="KEG">KEG</option>
                        <option value="SPECIAL KEG">SPECIAL KEG</option>
                        <option value="OTHER">OTHER</option>
                      </select> */}

                    {/* {lineTypeList.map((elemento) => (
                        <option value={elemento.Name}>{elemento.Name}</option>
                        ))
                      } */}
                  </FormGroup>

                  <FormGroup className="col-6">
                    {/* ----------------------------------------------------------------------------------- */}
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={select.Pais}
                      // sx={{ width: 300 }}
                      fullWidth
                      defaultValue={countries && countries.Name}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Seleccione Pa??s"
                          variant="outlined"
                          required
                          error={errorCountries}
                          helperText={leyendaErrorCountries}
                        />
                      )}
                      onChange={(e, newValue) => {
                        handleChangeCountries(newValue);
                      }}
                    />
                    {/* ----------------------------------------------------------------------------------- */}

                    {/* <label>
                        Pa??s <b className="text-danger">*</b>
                      </label>
                      <select
                        className="form-select SelectBoostrap"
                        name="Name"
                        required
                        onChange={handleChangeCountries}
                      >
                        <option value="">Seleccione Pa??s</option>
                        <option value="BARBADOS">BARBADOS</option>
                        <option value="COLOMBIA">COLOMBIA</option>
                        <option value="CUBA">CUBA</option>
                        <option value="DOMINICANA">DOMINICANA</option>
                        <option value="ECUADOR">ECUADOR</option>
                        <option value="EL SALVADOR">EL SALVADOR</option>
                        <option value="GUATEMALA">GUATEMALA</option>
                        <option value="HONDURAS">HONDURAS</option>
                        <option value="M??XICO">M??XICO</option>
                        <option value="PANAMA">PANAMA</option>
                        <option value="PER??">PER??</option>
                        <option value="SAINT VINCENT">SAINT VINCENT</option>
                      </select> */}

                    {/* {paisLis.map((elemento) => (
                        <option value={elemento.Id_Countries}>{elemento.Name}</option>
                        ))
                      } */}
                  </FormGroup>

                  <FormGroup className="col-6">
                    {/* <label>
                        BU <b className="text-danger">*</b>
                      </label>
                      <select
                        className="form-select SelectBoostrap"
                        name="Name"
                        onChange={handleChangeBu}
                      >
                        <option value="">Seleccione BU</option>
                        <option value="CAC">CAC</option>
                        <option value="COL">COL</option>
                        <option value="PEC">PEC</option>
                        <option value="MEX">MEX</option>
                      </select> */}

                    {/* ------------------------------------------------   SELECT DESDE LA BASE DE DATOS   ------------------------------------ */}
                    {/* {
                        buList.map((elemento) => (
                        <option value={elemento.Id_BU}>{elemento.Name}</option>
                        ))
                      } */}

                    {/* ----------------------------------------------------------------------------------- */}
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={select.BU}
                      // sx={{ width: 300 }}
                      fullWidth
                      defaultValue={bu && bu.Name}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Seleccione BU"
                          variant="outlined"
                          required
                          error={errorBU}
                          helperText={leyendaErrorBU}
                        />
                      )}
                      onChange={(e, newValue) => {
                        handleChangeBu(newValue);
                      }}
                    />
                    {/* ----------------------------------------------------------------------------------- */}
                  </FormGroup>

                  <FormGroup className="col-6">
                    {/* <label htmlFor="area">
                        Area <b className="text-danger">*</b>
                      </label>
                      <select
                        className="form-select SelectBoostrap"
                        name="Name"
                        onChange={handleChangeAreas}
                      >
                        <option value="">Seleccione Area</option>
                        <option value="GENERAL SERVICES">
                          {" "}
                          GENERAL SERVICES{" "}
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
                          {" "}
                          BRIGHT BEER TANKS{" "}
                        </option>
                        <option value="PACKAGING">PACKAGING</option>
                        <option value="CHEMICAL ISLAND & CIP">
                          {" "}
                          CHEMICAL ISLAND & CIP{" "}
                        </option>
                        <option value="SYRUP HOUSE">SYRUP HOUSE</option>
                        <option value="LOGISTIC TIER 1">LOGISTIC TIER 1</option>
                        <option value="LOGISTIC TIER 2">LOGISTIC TIER 2</option>
                        <option value="CO2 RECOVERY">CO2 RECOVERY</option>
                        <option value="REFRIGERATION">REFRIGERATION</option>
                        <option value="WELLS">WELLS</option>
                        <option value="WATER TREATMENT PLANT">
                          {" "}
                          WATER TREATMENT PLANT{" "}
                        </option>
                        <option value="COMPRESSED AIR">COMPRESSED AIR</option>
                        <option value="ELECTRICAL SUBSTATION (HV)">
                          {" "}
                          ELECTRICAL SUBSTATION (HV){" "}
                        </option>
                        <option value="ELECTRICAL SUBSTATION (MV)">
                          {" "}
                          ELECTRICAL SUBSTATION (MV){" "}
                        </option>
                        <option value="ELECTRICAL SUBSTATION (LV)">
                          {" "}
                          ELECTRICAL SUBSTATION (LV){" "}
                        </option>
                        <option value="STEAM GENERATION">
                          {" "}
                          STEAM GENERATION{" "}
                        </option>
                        <option value="BIOLOGICAL TREATMENT SYSTEM">
                          {" "}
                          BIOLOGICAL TREATMENT SYSTEM{" "}
                        </option>
                        <option value="TERTIARY SYSTEM">TERTIARY SYSTEM</option>
                        <option value="SANITARY PLANT">SANITARY PLANT</option>
                        <option value={["AUTOMATION & INDUSTRIAL NETWORK"]}>
                          {" "}
                          AUTOMATION & INDUSTRIAL NETWORK{" "}
                        </option>
                        <option value="MAINTENANCE">MAINTENANCE</option>
                        <option value="IT">IT</option>
                        <option value="LABORATORY">LABORATORY</option>
                        <option value="WORKSHOP">WORKSHOP</option>
                        <option value="OFFICES">OFFICES</option>
                        <option value="SUBPRODUCTS">SUBPRODUCTS</option>
                      </select> */}

                    {/* {
                        areaList.map((elemento) => (
                        <option value={elemento.Id_Areas}>{elemento.Name}</option>
                        ))
                        } */}

                    {/* ----------------------------------------------------------------------------------- */}
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={select.Areas}
                      // sx={{ width: 300 }}
                      fullWidth
                      defaultValue={areas && areas.Name}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Seleccione Area"
                          variant="outlined"
                          required
                          error={errorAreas}
                          helperText={leyendaErrorAreas}
                        />
                      )}
                      onChange={(e, newValue) => {
                        handleChangeAreas(newValue);
                      }}
                    />

                    {/* ----------------------------------------------------------------------------------- */}
                  </FormGroup>

                  <FormGroup className="col-6">
                    {/* <label htmlFor="Subarea"> Sub??rea <b className="text-danger">*</b> </label>
                      <select
                        className="form-select SelectBoostrap"
                        name="Name"
                        onChange={handleChangeSubArea}
                      >
                        <option value="">Seleccione Sub??rea</option>
                        <option value="WORT KETTLE">WORT KETTLE</option>
                        <option value="TORRE DE MOLIENDA">
                          {" "}
                          TORRE DE MOLIENDA{" "}
                        </option>
                        <option value="CONOCIMIENTOS">CONOCIMIENTOS</option>
                        <option value="BAGAZO/SYE">BAGAZO/SYE</option>
                        <option value="BLOQUE FRIO">BLOQUE FRIO</option>
                        <option value="GENERAL">GENERAL</option>
                        <option value="NO DATA AVAILABLE"> No data available </option>
                      </select> */}

                    {/* {subareaList.map((elemento) => (
                      <option value={elemento.Id_SubAreas}>{elemento.Name}</option>
                      )) } */}

                    {/* ----------------------------------------------------------------------------------- */}
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={select.SubArea}
                      // sx={{ width: 300 }}
                      fullWidth
                      defaultValue={SubArea && SubArea.Name}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Seleccione Sub??rea"
                          variant="outlined"
                          required
                          error={errorSubArea}
                          helperText={leyendaErrorSubArea}
                        />
                      )}
                      onChange={(e, newValue) => {
                        handleChangeSubArea(newValue);
                      }}
                    />
                    {/* ----------------------------------------------------------------------------------- */}
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
                      required
                      fullWidth
                      value={equipoSeleccionado ? equipoSeleccionado.code : ""}
                      onChange={handleChange}
                    />
                  </FormGroup>

                  {/* <FormGroup className="col-6">
                    <label>Sub??rea:</label>
                    <input
                    className="form-control"
                    type="text text-align=center"
                    name="subarea"
                    value={equipoSeleccionado ? equipoSeleccionado.subarea : ''}
                    onChange={handleChange} />
                    </FormGroup> */}

                  {/* <div>

                      <Button type="submit"
                          style={{
                            color:
                              theme.palette.type === "dark"
                                ? "#ffffff"
                                : "#000000",
                          }}
                          >
                        pasar
                      </Button>
                    </div> */}

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
                        count={4}
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
                        type="submit"
                        style={{
                          color:
                            theme.palette.type === "dark"
                              ? "#ffffff"
                              : "#000000",
                        }}
                        onClick={() => {
                          // nextForm();
                          // setEditing(true);
                          // setEditingTechInfo(false);
                          // setFormStepInsertar(2);
                        }}
                      >
                        {" "}
                        Informaci??n T??cnica
                        <ArrowForwardIcon />
                      </Button>
                    </Grid>

                    {/* -------------------------    BOTONES IZQUIERDA DERECHA    ------------------------------- */}
                  </FormGroup>
                </form>

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
            </div>
          )}
          {formStepInsertar === 2 && ( // ---------- Informaci??n t??cnica
            <>
              <div className="p-3">
                <h4
                  style={{
                    color:
                      theme.palette.type === "dark"
                        ? theme.palette.primary.light
                        : theme.palette.secondary,
                  }}
                >
                  Informaci??n t??cnica
                </h4>
              </div>

              <ModalBody className="row animate__animated animate__fadeIn">
                <FormGroup className="col-8">
                  {/* <label htmlFor="url_input">Equipo:</label>
                        <input
                          className="form-control"
                          required
                          type="text text-align=center"
                          name="Name"
                          error={errorNombre}
                          helperText={leyendaErrorNombre}
                          value={ equipoSeleccionado ? equipoSeleccionado.Name : "" }
                          onChange={handleChange}
                        /> */}

                  <TextField
                    label="Equipo"
                    className="form-control"
                    variant="outlined"
                    name="Name"
                    required
                    error={errorNombre}
                    helperText={leyendaErrorNombre}
                    value={equipoSeleccionado ? equipoSeleccionado.Name : ""}
                    onChange={handleChange}
                  />
                </FormGroup>

                <FormGroup className="col-4">
                  <FormControl fullWidth>
                    {/* error */}
                    <InputLabel id="demo-simple-select">
                      Trabajo actual*
                    </InputLabel>
                    <Select
                      name="currentWorking"
                      labelId="demo-simple-select"
                      // id="demo-simple-select"
                      error={errorCurrentWorking}
                      value={
                        technicalInformation &&
                        technicalInformation.currentWorking
                      }
                      label="Trabajo actual"
                      variant="outlined"
                      required
                      onChange={(e) => {
                        handleChange(e)
                        if (e.target.value !== "null") {
                          setErrorCurrentWorking(false);
                          setLeyendaCurrentWorking("");
                        }
                      }}
                    // className="form-control"
                    // renderValue={(value) => `???  - ${value}` }
                    >
                      {/* // ?????? */}
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="Instalado y funcionando">
                        Instalado y funcionando
                      </MenuItem>
                      <MenuItem value="Instalado y no trabajando">
                        Instalado y no trabajando
                      </MenuItem>
                      <MenuItem value="No instalado">
                        No instalado
                      </MenuItem>
                    </Select>
                    {leyendaCurrentWorking ? <span style={{ color: "#d32f2f", fontSize: "14px" }} >Campo Requerido</span> : null}
                    {/* <FormHelperText>Error</FormHelperText> */}
                  </FormControl>
                </FormGroup>

                {/* <label>Trabajo actual:</label>
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
                          <option value="Installed and is working"> Instalado y funcionando </option>
                          <option value="Installed and is not working"> Instalado y no trabajando </option>
                          <option value="Not Installed and is not working"> No instalado </option>
                        </select> */}

                {/* error */}
                {/* <FormGroup className="col-4">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Condici??n actual
                    </InputLabel>
                    <Select
                      name="CurrentConditions"
                      labelId="demo-simple-select-label"
                      // id="demo-simple-select"
                      value={
                        technicalInformation
                          ? technicalInformation.CurrentConditions
                          : ""
                      }
                      label="Condici??n actual"
                      variant="outlined"
                      required
                      onChange={handleChange}
                    // className="form-control"
                    // renderValue={(value) => `???  - ${value}` }
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="Excellent">Excelente</MenuItem>
                      <MenuItem value="Good">Bueno</MenuItem>
                      <MenuItem value="Regular">Regular</MenuItem>
                      <MenuItem value="Bad">Malo</MenuItem>
                      <MenuItem value="To be disposed">
                        Para ser desechado
                      </MenuItem>
                      <MenuItem value="Deshecho">Deshecho</MenuItem>
                    </Select>
                  </FormControl>
                </FormGroup> */}
                {/* // ?????? */}
                {/* <FormHelperText>Error</FormHelperText> */}

                {/* <label htmlFor="CurrentConditions">
                          Condici??n actual:
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
                          <option value="">Seleccione Condici??n actual</option>
                          <option value="Excellent">Excelente</option>
                          <option value="Good">Bueno</option>
                          <option value="Regular">Regular</option>
                          <option value="Bad">Malo</option>
                          <option value="To be disposed">
                            Para ser desechado
                          </option>
                        </select> */}


                <FormGroup className="col-4">
                  <FormControl fullWidth>
                    {/* error */}
                    <InputLabel id="demo-simple-select">
                      Tipo de equipo*
                    </InputLabel>
                    <Select
                      name="EquipmentType"
                      labelId="demo-simple-select"
                      // id="demo-simple-select"
                      error={errorEquipmentType}
                      value={
                        technicalInformation &&
                        technicalInformation.EquipmentType
                      }
                      label="Tipo de equipo"
                      variant="outlined"
                      required
                      onChange={(e) => {
                        handleChange(e)
                        if (e.target.value !== "null") {
                          setErrorEquipmentType(false);
                          setLeyendaEquipmentType("");
                        }
                      }}
                    // className="form-control"
                    // renderValue={(value) => `???  - ${value}` }
                    >
                      {/* // ?????? */}
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="AUTOMATION / ELECTRONIC">
                        Automation / Electronic
                      </MenuItem>
                      <MenuItem value="ELECTRICAL">Electrical</MenuItem>
                      <MenuItem value="MECHANICAL">Mechanical</MenuItem>
                    </Select>
                    {leyendaEquipmentType ? <span style={{ color: "#d32f2f", fontSize: "14px" }} >Campo Requerido</span> : null}
                    {/* <FormHelperText>Error</FormHelperText> */}
                  </FormControl>

                  {/* <label>Tipo de equipo:</label>
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
                        </select> */}
                </FormGroup>

                <FormGroup className="col-4">
                  <TextField
                    label="N??mero de serial"
                    className="form-control"
                    variant="outlined"
                    name="SerialNumber"
                    // required
                    // error={errorNombre}
                    // helperText={leyendaErrorNombre}
                    value={
                      technicalInformation && technicalInformation.SerialNumber
                    }
                    onChange={handleChange}
                  />

                  {/* <label>N??mero de serial:</label>
                        <input
                          className="form-control"
                          type="text text-align=center"
                          name="SerialNumber"
                          value={
                            technicalInformation &&
                            technicalInformation.SerialNumber
                          }
                          onChange={handleChange}
                        /> */}
                </FormGroup>

                <FormGroup className="col-4">
                  <TextField
                    label="N??mero de modelo"
                    className="form-control"
                    variant="outlined"
                    name="ModelNumber"
                    // required
                    // error={errorNombre}
                    // helperText={leyendaErrorNombre}
                    value={
                      technicalInformation && technicalInformation.ModelNumber
                    }
                    onChange={handleChange}
                  />

                  {/* <label>N??mero de modelo:</label>
                        <input
                          className="form-control"
                          type="text text-align=center"
                          name="ModelNumber"
                          value={ technicalInformation && technicalInformation.ModelNumber }
                          onChange={handleChange}
                        /> */}
                </FormGroup>

                <FormGroup className="col-4">
                  <TextField
                    label="Peso"
                    className="form-control"
                    variant="outlined"
                    name="Weight"
                    // required
                    // error={errorNombre}
                    // helperText={leyendaErrorNombre}
                    value={technicalInformation && technicalInformation.Weight}
                    onChange={handleChange}
                  />

                  {/* <label>Peso:</label>
                        <input
                          className="form-control"
                          type="text text-align=center"
                          name="Weight"
                          value={ technicalInformation && technicalInformation.Weight }
                          onChange={handleChange}
                        /> */}
                </FormGroup>

                <FormGroup className="col-4">
                  <TextField
                    label="OEM"
                    className="form-control"
                    variant="outlined"
                    name="OEM"
                    // required
                    // error={errorNombre}
                    // helperText={leyendaErrorNombre}
                    value={technicalInformation && technicalInformation.OEM}
                    onChange={handleChange}
                  />

                  {/* <label>OEM:</label>
                        <input
                          className="form-control"
                          type="text text-align=center"
                          name="OEM"
                          value={
                            technicalInformation && technicalInformation.OEM
                          }
                          onChange={handleChange}
                        /> */}
                </FormGroup>

                <FormGroup className="col-4">
                  <TextField
                    label="Vendedor"
                    className="form-control"
                    variant="outlined"
                    name="vendor"
                    // required
                    // error={errorNombre}
                    // helperText={leyendaErrorNombre}
                    value={technicalInformation && technicalInformation.vendor}
                    onChange={handleChange}
                  />

                  {/* <label>Vendedor:</label>
                        <input
                          className="form-control"
                          type="text text-align=center"
                          name="vendor"
                          value={
                            technicalInformation && technicalInformation.vendor
                          }
                          onChange={handleChange}
                        /> */}
                </FormGroup>

                <FormGroup className="col-8">
                  <TextField
                    label="Descripci??n"
                    error={errorDescription}
                    helperText={leyendaDescription}
                    className="form-control"
                    variant="outlined"
                    name="Description"
                    required
                    // error={errorNombre}
                    // helperText={leyendaErrorNombre}
                    value={
                      technicalInformation && technicalInformation.Description
                    }
                    onChange={(e) => {
                      handleChange(e)
                      if (e.target.value !== "null") {
                        setErrorDescription(false);
                        setLeyendaDescription("");
                      }
                    }}
                  />
                  {/* <label>Descripci??n:</label>
                        <input
                          className="form-control"
                          type="text text-align=center"
                          name="Description"
                          value={
                            technicalInformation &&
                            technicalInformation.Description
                          }
                          onChange={handleChange}
                        /> */}
                </FormGroup>

                {/* vendor: "", nominalCapacity: "", yearConstruction: "", currentConditionsComments: "", : "" */}

                <hr style={{ width: "97%" }} />

                {/* -------------------------------         OPTIONAL TECHNICAL INFORMATION FORM           ------------------------------------------ */}
                <Calification
                  light={light}
                  technicalInformation={technicalInformation}
                  setTechnicalInformation={setTechnicalInformation}
                />

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
                                                                <label htmlFor="Name" > <h5 className="text-muted">Agregar m??s informaci??n t??cnica:</h5> </label>
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
                                                                    <option value="">Selecione informaci??n t??cnica</option>
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
                                                            <th>Informaci??n T??cnica</th>
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
                      // color="secondary" 
                      onClick={() => backForm()}>
                      <ArrowBackIcon />
                      Consulta Equipos
                    </Button>
                  </Grid>
                  <Grid xs={4} className="d-flex justify-content-center">
                    {" "}
                    <Pagination
                      count={4}
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
                      // color="secondary"
                      onClick={() => {
                        // setEditing(true);
                        // setEditingServiceInfo(true);
                        // setCasoServInfo("Add");
                        nextForm();
                      }}
                    >
                      Informaci??n de servicios
                      <ArrowForwardIcon />
                    </Button>
                  </Grid>
                  {/* -------------------------    BOTONES IZQUIERDA DERECHA    ------------------------------- */}
                </FormGroup>
              </ModalBody>
            </>
          )}

          {formStepInsertar === 3 && ( // --------- Informaci??n de servicio
            <ServiceInformation
              handleChangeServicesInformation={handleChangeServicesInformation}
              handleChangeServicesInfoPlanta={handleChangeServicesInfoPlanta}
              handleChangeServicesInfoArea={handleChangeServicesInfoArea}
              PlantaResponsable={PlantaResponsable}
              AreaResponsable={AreaResponsable}
              servicesInformation={servicesInformation}
              light={light}
              backForm={backForm}
              nextForm={nextForm}
              errorResponsable={errorResponsable}
              setErrorResponsable={setErrorResponsable}
              leyendaResponsable={leyendaResponsable}
              setLeyendaResponsable={setLeyendaResponsable}
              errorPlantaResponsable={errorPlantaResponsable}
              leyendaPlantaResponsable={leyendaPlantaResponsable}
              errorAreaResponsable={errorAreaResponsable}
              leyendaAreaResponsable={leyendaAreaResponsable}
            />
          )}
          {formStepInsertar === 4 && ( // -------- Informaci??n Financiera
            <FinancialInfo
              financialInformation={financialInformation}
              handleChangeFinancialInfo={handleChangeFinancialInfo}
              backForm={backForm}
              nextForm={nextForm}
              light={light}
              errorActivoFijo={errorActivoFijo}
              setErrorActivoFijo={setErrorActivoFijo}
              leyendaActivoFijo={leyendaActivoFijo}
              setLeyendaActivoFijo={setLeyendaActivoFijo}
              errorValorContable={errorValorContable}
              setErrorValorContable={setErrorValorContable}
              leyendaValorContable={leyendaValorContable}
              setLeyendaValorContable={setLeyendaValorContable}
              errorMoneda={errorMoneda}
              setErrorMoneda={setErrorMoneda}
              leyendaMoneda={leyendaMoneda}
              setLeyendaMoneda={setLeyendaMoneda}
            />
          )}

          {/* // <ServiceInformation
              //   casoServInfo={casoServInfo}
              //   techInfoEditado={techInfoEditado}
              //   updateAddServInfo={updateAddServInfo}
              //   setEditingTechInfo={setEditingTechInfo}
              //   editingTechInfo={editingTechInfo}
              //   EditAddServInfo={EditAddServInfo}
              //   setnewservInformation={setnewservInformation}
              //   newservInformation={newservInformation}
              //   equipoSeleccionado={equipoSeleccionado}
              //   editRow={editRow}
              //   eliminarAddTechInfo={eliminarAddTechInfo}
              //   setEditing={setEditing}
              //   setEditingServiceInfo={setEditingServiceInfo}
              //   servicesInformation={servicesInformation}
              //   setEquipoSeleccionado={setEquipoSeleccionado}
              //   handleChangeServicesInformation={handleChangeServicesInformation}
              //   editingNewServInfo={editingNewServInfo}
              //   id={id} // Para seleccionar que fila editada tendra el efecto
              //   light={light}
              // /> */}

          <ModalFooter>
            <Button
              variant="outlined"
              style={{
                color:
                  theme.palette.type === "dark"
                    ? theme.palette.primary.light
                    : theme.palette.secondary.light,
              }}
              onClick={() => {
                setModalInsertar(false);
                setFormStepInsertar(0);
                desetCamposVacios();
                // seteditingNewServInfo(true);
                // setModalEditar(false);
                // setEditing(false);
                // setEditingTechInfo(false);
                // setEditingServiceInfo(false);
              }}
            >
              Cancelar
            </Button>
            <Button
              style={{
                color: "#ffffff",
                backgroundColor:
                  theme.palette.type === "dark"
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
    </ThemeProvider >
  );
};
export const UserToken = userToken;

export default ConsultaEquipos;
