import React, { useEffect, useState } from "react";
import { withStyles, makeStyles, TextField, IconButton, Menu } from "@material-ui/core";
import "../styles/styles.scss";
import Axios from "axios";
import abiWhite from "../assets/abiWhite.png";
import abiDark from "../assets/abiBlack.png";
import GlobalIcon from "../assets/globalicon.svg";
import Button from "@mui/material/Button";
import { globalApi } from "../types/api.types";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { MenuItem } from "@mui/material";
import MoreVert from "@material-ui/icons/MoreVert";
// import Controls from "./controls/Controls";
// import abinbev from "../assets/abinbev.jpeg";
// import manual from "../assets/Manual.pdf";
// import {
//   ArrowDownward,
//   FontDownload,
//   FontDownloadTwoTone,
// } from "@material-ui/icons";
// import MoreVertIcon from '@mui/icons-material/MoreVert';

const useStyles = makeStyles((theme) => ({
  sideMenu: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    left: "0px",
    // width: "16rem",
    width: "15.625rem",
    height: "100%",
    boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.25)",
    backgroundColor: theme.palette.type === "dark" ? "#514A69" : "#FFFFFF",
  },
  logo: {
    margin: "auto",
    width: "10rem",
    display: "flex",
  },
  filterCard: {
    background: "#FBFBFB",
    borderRadius: "12px !important",
    textAlign: "left",
    justifyContent: "start !important",
    padding: "12px 20px !important",
    alignItems: "center",
    "& hover": {
      backgroundColor: theme.palette.type === "dark" ? "#635D7A" : "#FBFBFB",
    },
    "& h5": {
      color:
        theme.palette.type === "dark"
          ? theme.palette.primary.light
          : theme.palette.secondary,
      fontWeight: "700",
      fontSize: "0.875rem",
      textTransform: "none",
      marginBottom: ".3rem",
    },
    "& h6": {
      fontSize: "0.813rem",
      color:
        theme.palette.type === "dark" ? "#B3C8FC" : theme.palette.primary.dark,
      textTransform: "none",
      margin: "0px",
    },
  },
  counter: {
    color: "#428E1E !important",
    textTransform: "none",
    margin: "0px",
  },
}));

const ITEM_HEIGHT = 50;

const optionsMEX = [
  'None',
  'TORREÓN',
  'MAZATLAN',
  'TUXTEPEC',
  'ZACATECAS',
  'GUADALAJARA',
  'MEXICO CITY',
  'ENVASES Y TAPAS',
  'VIDRIERA POTOSÍ',
];

const optionsCAC = [
  'None',
  'PASADENA',
  'DOMINICANA',
  'EL SALVADOR CSD',
  'EL SALVADOR BEER',
  'EL SALVADOR WATER',
  'SAN PEDRO SULA CSD',
  'SAN PEDRO SULA BEER',
];

const optionsPEC = [
  'None',
  'ATE',
  'CUSCO',
  'QUITO',
  'MOTUPE',
  'PUCALLPA',
  'AREQUIPA',
  'GUAYAQUIL',
  'HUAROCHIRI',
  'MALTERIA DE LIMA',
];

const optionsCOL = [
  'None',
  'VALLE',
  'BOYACA',
  'MEDELLIN',
  'TOCANCIPA',
  'BUCARAMANGA',
  'BARRANQUILLA',
];



const SideMenu = ({
  getAllList,
  filtrarBUList,
  setListAll,
  listAll,
  light,
  handleSearchPlanta
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
        main: "#f4f5fd",
        light: "#8F6CFF",
        dark: "#14149A",
      },
    },
  });
  const classes = useStyles();
  const [mexCounter, setMexCounter] = useState(0);
  const [pecCounter, setPecCounter] = useState(0);
  const [cacCounter, setCacCounter] = useState(0);
  const [colCounter, setColCounter] = useState(0);
  const [contador, setCont] = useState(0);

  // const AllEquipment = getAllList;

  useEffect(() => {
    allAquipmentRelation();
    counter();
  }, [getAllList]);

  const counter = () => {
    let ColCounter = 0;
    let CacCounter = 0;
    let PecCounter = 0;
    let MexCounter = 0;
    let Counter = 0;

    getAllList.map((E) => {
      if (E.Procedencia.areas.operations.countries.bu.Name === "COL") {
        setColCounter(++ColCounter);
      }
    });

    getAllList.map((E) => {
      if (E.Procedencia.areas.operations.countries.bu.Name === "CAC") {
        setCacCounter(++CacCounter);
      }
    });

    getAllList.map((E) => {
      if (E.Procedencia.areas.operations.countries.bu.Name === "PEC") {
        setPecCounter(++PecCounter);
      }
    });

    getAllList.map((E) => {
      if (E.Procedencia.areas.operations.countries.bu.Name === "MEX") {
        setMexCounter(++MexCounter);
      }
    });

    // AllEquipment.map((E) => {
    //     if (E.Procedencia.areas.operations.countries.bu.Id_BU) {
    //         setContador(++Counter)
    //     }
    // })
  };

  // const [List, setList] = useState([]);
  // const [contar, setContar] = useState(0);

  const allAquipmentRelation = async () => {
    await Axios.get(`${globalApi}/AllequipmentRelation`).then((response) => {
      setListAll(response.data.equipment);
    });
    setCont(listAll.length);

    // let counter = 1
    // for (let i = 0; i <= 1; i++) {
    // setContar(++counter)

    //  }
  };

  // const { classes } = props;


  const [anchorElMEX, setAnchorElMEX] = React.useState(null);
  const [anchorElCAC, setAnchorElCAC] = React.useState(null);
  const [anchorElPEC, setAnchorElPEC] = React.useState(null);
  const [anchorElCOL, setAnchorElCOL] = React.useState(null);

  const openMEX = Boolean(anchorElMEX);
  const openCAC = Boolean(anchorElCAC);
  const openPEC = Boolean(anchorElPEC);
  const openCOL = Boolean(anchorElCOL);

  const handleClick = (event, bu) => {
    if (bu === "MEX"){
      setAnchorElMEX(event.currentTarget);
    } else if (bu === "CAC") {
      setAnchorElCAC(event.currentTarget);
    } else if (bu === "PEC") {
      setAnchorElPEC(event.currentTarget);      
    } else if (bu === "COL") {
      setAnchorElCOL(event.currentTarget);      
    }
  };

  const handleClose = () => {
    setAnchorElMEX(null);
    setAnchorElCAC(null);
    setAnchorElPEC(null);
    setAnchorElCOL(null);
  };

  const handleSelect = (option) => {
    handleSearchPlanta(option);
    setAnchorElMEX(null);
    setAnchorElCAC(null);
    setAnchorElPEC(null);
    setAnchorElCOL(null);
  };















  return (
    <ThemeProvider theme={theme}>
      <div className={`${classes.sideMenu}`}>
        <div className="pt-5 border-1">
          <img
            src={theme.palette.type === "dark" ? abiWhite : abiDark}
            className={classes.logo}
            alt=""
          />
        </div>
        <div className="p-2 mt-5">
          <Button
            className={"btn btn-large w-100 mb-2 " + `${classes.filterCard}`}
            onClick={(e) => filtrarBUList("total", "total")}
          // onClick={(e) => handleSearch(null, "bu")}

          >
            <div className="row align-items-center">
              <div className="col-3">
                {" "}
                <img src={GlobalIcon} className="img-fluid" alt="" />
              </div>
              <div className="col-9">
                <div className="row justify-content-between">
                  <div xs={12}>
                    <h5>Middle America</h5>
                  </div>
                  <div className="col-6 me-auto">
                    <h6>Equipos:</h6>
                  </div>
                  <div className="col-6 text-end">
                    <h6>
                      <strong
                        className={classes.counter}
                      >{`${contador}`}</strong>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </Button>
          <Button
            className={"btn btn-large w-100 mb-2 " + `${classes.filterCard}`}
            onClick={(e) => filtrarBUList("MEX")}
          // onClick={(e) => handleSearchPlanta(e="MEDELLIN")}
          >
            {" "}
            <div className="row align-items-center">
              <div className="col-3">
                <img src={GlobalIcon} className="img-fluid" alt="" />
              </div>
              <div className="col-6">
                <div className="row justify-content-between">
                  <div xs={12}>
                    <h5>MEX</h5>
                  </div>
                  <div className="col-6 me-auto">
                    <h6>Equipos:</h6>
                  </div>
                  <div className="col-6 text-end">
                    <h6>
                      <strong
                        className={classes.counter}
                      >{`${mexCounter}`}</strong>
                    </h6>
                  </div>
                </div>
              </div>

              {/* ---------------------------   FILTRO DESPLEGABLE POR PLANTA MEX --------------------- */}
              <div className="col-3">
                <IconButton
                  // aria-label="more"
                  // id="long-button-MEX"
                  // aria-controls={openMEX ? 'long-menu-MEX' : undefined}
                  // aria-expanded={openMEX ? 'true' : undefined}
                  // aria-haspopup="true"
                  onClick={(e)=>{handleClick(e, "MEX")}}
                >
                  {/* <ListItemIcon /> */}
                  {/* <Apps /> */}
                  <MoreVert style={{ fontSize: "20px" }}/>
                </IconButton>
                <Menu
                  // id="long-menu-MEX"
                  // MenuListProps={{
                  //   'aria-labelledby': 'long-button-MEX',
                  // }}
                  anchorEl={anchorElMEX}
                  open={openMEX}
                  onClose={handleClose}
                  PaperProps={{
                    style: {
                      maxHeight: ITEM_HEIGHT * 4.5,
                      width: '24ch',
                    },
                  }}
                >
                  {optionsMEX.map((option) => (
                    <MenuItem key={option} selected={option === 'ZACATECAS'} onClick={() => { handleSelect(option) }}>
                      {option}
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            </div>
          </Button>

          <Button
            className={"btn btn-large w-100 mb-2 " + `${classes.filterCard}`}
            onClick={(e) => filtrarBUList("CAC")}
          >
            {" "}
            <div className="row align-items-center">
              <div className="col-3">
                {" "}
                <img src={GlobalIcon} className="img-fluid" alt="" />
              </div>
              <div className="col-6">
                {" "}
                <div className="row justify-content-between">
                  <div xs={12}>
                    <h5>CAC</h5>
                  </div>
                  <div className="col-6 me-auto">
                    <h6>Equipos:</h6>
                  </div>
                  <div className="col-6 text-end">
                    <h6>
                      <strong
                        className={classes.counter}
                      >{`${cacCounter}`}</strong>
                    </h6>
                  </div>
                </div>
              </div>
              {/* ---------------------------   FILTRO DESPLEGABLE POR PLANTA CAC --------------------- */}
              <div className="col-3">
                <IconButton
                  aria-label="more"
                  id="long-button"
                  aria-controls={openCAC ? 'long-menu' : undefined}
                  aria-expanded={openCAC ? 'true' : undefined}
                  aria-haspopup="true"
                  onClick={(e)=>{handleClick(e, "CAC")}}
                >
                  {/* <ListItemIcon /> */}
                  {/* <Apps /> */}
                  <MoreVert style={{ fontSize: "20px" }}/>
                </IconButton>
                <Menu
                  id="long-menu"
                  MenuListProps={{
                    'aria-labelledby': 'long-button',
                  }}
                  anchorEl={anchorElCAC}
                  open={openCAC}
                  onClose={handleClose}
                  PaperProps={{
                    style: {
                      maxHeight: ITEM_HEIGHT * 4.5,
                      width: '28ch',
                    },
                  }}
                >
                  {optionsCAC.map((option) => (
                    <MenuItem key={option} selected={option === 'None'} onClick={() => { handleSelect(option) }}>
                      {option}
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            </div>
          </Button>

          <Button
            className={"btn btn-large w-100 mb-2 " + `${classes.filterCard}`}
            onClick={(e) => filtrarBUList("PEC")}
          >
            <div className="row align-items-center">
              <div className="col-3">
                <img src={GlobalIcon} alt="" className="img-fluid" />
              </div>
              <div className="col-6">
                {" "}
                <div className="row justify-content-between">
                  <div xs={12}>
                    <h5>PEC</h5>
                  </div>
                  <div className="col-6 me-auto">
                    <h6>Equipos:</h6>
                  </div>
                  <div className="col-6 text-end">
                    <h6>
                      <strong
                        className={classes.counter}
                      >{`${pecCounter}`}</strong>
                    </h6>
                  </div>
                </div>
              </div>
              {/* ---------------------------   FILTRO DESPLEGABLE POR PLANTA PEC --------------------- */}
              <div className="col-3">
                <IconButton
                  aria-label="more"
                  id="long-button"
                  aria-controls={openPEC ? 'long-menu' : undefined}
                  aria-expanded={openPEC ? 'true' : undefined}
                  aria-haspopup="true"
                  onClick={(e)=>{handleClick(e, "PEC")}}
                >
                  {/* <ListItemIcon /> */}
                  {/* <Apps /> */}
                  <MoreVert style={{ fontSize: "20px" }}/>
                </IconButton>
                <Menu
                  id="long-menu"
                  MenuListProps={{
                    'aria-labelledby': 'long-button',
                  }}
                  anchorEl={anchorElPEC}
                  open={openPEC}
                  onClose={handleClose}
                  PaperProps={{
                    style: {
                      maxHeight: ITEM_HEIGHT * 4.5,
                      width: '24ch',
                    },
                  }}
                >
                  {optionsPEC.map((option) => (
                    <MenuItem key={option} selected={option === 'None'} onClick={() => { handleSelect(option) }}>
                      {option}
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            </div>
          </Button>

          <Button
            className={"btn btn-large w-100 mb-2 " + `${classes.filterCard}`}
            onClick={(e) => filtrarBUList("COL")}
          >
            <div className="row align-items-center">
              <div className="col-3">
                <img src={GlobalIcon} className="img-fluid" alt="" />
              </div>
              <div className="col-6">
                <div className="row justify-content-between">
                  <div xs={12}>
                    <h5>COL</h5>
                  </div>
                  <div className="col-6 me-auto">
                    <h6>Equipos:</h6>
                  </div>
                  <div className="col-6 text-end">
                    <h6>
                      <strong
                        className={classes.counter}
                      >{`${colCounter}`}</strong>
                    </h6>
                  </div>
                </div>
              </div>
              {/* ---------------------------   FILTRO DESPLEGABLE POR PLANTA COL   --------------------- */}
              <div className="col-3">
                <IconButton
                  aria-label="more"
                  id="long-button"
                  aria-controls={openCOL ? 'long-menu' : undefined}
                  aria-expanded={openCOL ? 'true' : undefined}
                  aria-haspopup="true"
                  onClick={(e)=>{handleClick(e, "COL")}}
                >
                  {/* <ListItemIcon /> */}
                  {/* <Apps /> */}
                  <MoreVert style={{ fontSize: "20px" }}/>
                </IconButton>
                <Menu
                  id="long-menu"
                  MenuListProps={{
                    'aria-labelledby': 'long-button',
                  }}
                  anchorEl={anchorElCOL}
                  open={openCOL}
                  onClose={handleClose}
                  PaperProps={{
                    style: {
                      maxHeight: ITEM_HEIGHT * 4.5,
                      width: '24ch',
                    },
                  }}
                >
                  {optionsCOL.map((option) => (
                    <MenuItem key={option} selected={option === 'None'} onClick={() => { handleSelect(option) }}>
                      {option}
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            </div>
          </Button>

          {/* <Button
            href="https://app.powerbi.com/singleSignOn?route=links%2fFmp5PhWZi8%3fctid%3dcef04b19-7776-4a94-b89b-375c77a8f936%26pbi_source%3dlinkShare&ctid=cef04b19-7776-4a94-b89b-375c77a8f936&pbi_source=linkShare&ru=https:%2f%2fapp.powerbi.com%2f%3froute%3dlinks%252fFmp5PhWZi8%253fctid%253dcef04b19-7776-4a94-b89b-375c77a8f936%2526pbi_source%253dlinkShare%26ctid%3dcef04b19-7776-4a94-b89b-375c77a8f936%26pbi_source%3dlinkShare%26noSignUpCheck%3d1"
            className={
              "btn btn-large w-100 mb-2 align-items-center d-flex " +
              `${classes.filterCard}`
            }
          >
            <div>
              <h5>Power BI</h5>
            </div>
          </Button> */}

          <Button
            href="https://app.powerbi.com/singleSignOn?route=links%2fFmp5PhWZi8%3fctid%3dcef04b19-7776-4a94-b89b-375c77a8f936%26pbi_source%3dlinkShare&ctid=cef04b19-7776-4a94-b89b-375c77a8f936&pbi_source=linkShare&ru=https:%2f%2fapp.powerbi.com%2f%3froute%3dlinks%252fFmp5PhWZi8%253fctid%253dcef04b19-7776-4a94-b89b-375c77a8f936%2526pbi_source%253dlinkShare%26ctid%3dcef04b19-7776-4a94-b89b-375c77a8f936%26pbi_source%3dlinkShare%26noSignUpCheck%3d1"
            className={
              "btn btn-large w-100 mb-2 align-items-center d-flex " +
              `${classes.filterCard}`
            }
          >
            <div className="row  align-items-center">
              <div className="col-3">
                <img src={GlobalIcon} className="img-fluid" alt="" />
              </div>
              <div className="col-9">
                <div className="row justify-content-between">
                  <div xs={12}>
                    <h5>Power BI</h5>
                  </div>
                  <div className="col-6 me-auto">
                    <h6>Reporte:</h6>
                  </div>
                  <div className="col-6 text-end">
                    {/* <h6>
                      <strong
                        className={classes.counter}
                      >{`${colCounter}`}</strong>
                    </h6> */}
                  </div>
                </div>
              </div>
            </div>
          </Button>




          {/* <Button
            className={"btn btn-large w-100 mb-2 " + `${classes.filterCard}`}
            onClick={(e) => handleSearchPlanta(e = "MEDELLIN")}
          >
            <div className="row  align-items-center">
              <div className="col-3">
                <img src={GlobalIcon} className="img-fluid" alt="" />
              </div>
              <div className="col-9">
                <div className="row justify-content-between">
                  <div xs={12}>
                    <h5>Medellin</h5>
                  </div>
                  <div className="col-6 me-auto">
                    <h6>Equipos:</h6>
                  </div>
                  <div className="col-6 text-end">
                    <h6>
                      <strong
                        className={classes.counter}
                      >{`${colCounter}`}</strong>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </Button> */}



          {/* <Button
            className={"btn btn-large w-100 mb-2 " + `${classes.filterCard}`}
            onClick={(e) => handleSearchPlanta(e = "BARRANQUILLA")}
          >
            <div className="row  align-items-center">
              <div className="col-3">
                <img src={GlobalIcon} className="img-fluid" alt="" />
              </div>
              <div className="col-9">
                <div className="row justify-content-between">
                  <div xs={12}>
                    <h5>plantas</h5>
                  </div>
                  <div className="col-6 me-auto">
                    <h6>Equipos:</h6>
                  </div>
                  <div className="col-6 text-end">
                    <h6>
                      <strong
                        className={classes.counter}
                      >{`${colCounter}`}</strong>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </Button> */}




          {/* <TextField
            label="planta"
            name="operations"
            className="form-control"
            variant="outlined"
            onChange={handleSearchPlanta}
          /> */}



        </div>
      </div>
    </ThemeProvider>
  );
};

export default withStyles(useStyles)(SideMenu);
