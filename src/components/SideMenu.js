import React, { useEffect, useState } from "react";
import { withStyles, makeStyles, TextField, MenuItem, Menu, IconButton, ListItemIcon } from "@material-ui/core";
import "../styles/styles.scss";
// import Controls from "./controls/Controls";
import Axios from "axios";
// import abinbev from "../assets/abinbev.jpeg";
import abiWhite from "../assets/abiWhite.png";
import abiDark from "../assets/abiBlack.png";
import GlobalIcon from "../assets/globalicon.svg";
import Button from "@mui/material/Button";
// import manual from "../assets/Manual.pdf";
// import {
//   ArrowDownward,
//   FontDownload,
//   FontDownloadTwoTone,
// } from "@material-ui/icons";
import { globalApi } from "../types/api.types";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
// import MoreVertIcon from '@mui/icons-material/MoreVert';

const useStyles = makeStyles((theme) => ({
  sideMenu: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    left: "0px",
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

const ITEM_HEIGHT = 48;

const options = [
  'None',
  'Atria',
  'Callisto',
  'Dione',
  'Ganymede',
  'Hangouts Call',
  'Luna',
  'Oberon',
  'Phobos',
  'Pyxis',
  'Sedna',
  'Titania',
  'Triton',
  'Umbriel',
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




  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
            onClick={(e) => filtrarBUList("total", "total", setListAll)}
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
              <div className="col-9">
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
              <div className="col-9">
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
              <div className="col-9">
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
            </div>
          </Button>
          <Button
            className={"btn btn-large w-100 mb-2 " + `${classes.filterCard}`}
            onClick={(e) => filtrarBUList("COL")}
          >
            <div className="row  align-items-center">
              <div className="col-3">
                <img src={GlobalIcon} className="img-fluid" alt="" />
              </div>
              <div className="col-9">
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


          <div>
              <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
              >
                <ListItemIcon />
              </IconButton>
              <Menu
                id="long-menu"
                MenuListProps={{
                  'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: '20ch',
                  },
                }}
              >
                {options.map((option) => (
                  <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
                    {option}
                  </MenuItem>
                ))}
              </Menu>
            </div>

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
