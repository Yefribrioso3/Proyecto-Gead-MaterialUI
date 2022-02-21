import React, { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core";
import "../styles/styles.scss";
import Controls from "./controls/Controls";
import Axios from "axios";
import abinbev from "../assets/abinbev.jpeg";
import GlobalIcon from "../assets/globalicon.svg";
import Button from "@mui/material/Button";
import manual from "../assets/Manual.pdf";
import {
  ArrowDownward,
  FontDownload,
  FontDownloadTwoTone,
} from "@material-ui/icons";

import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
const theme = createTheme({
  palette: {
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
  },
});

const style = {
  sideMenu: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    left: "0px",
    width: "250px",
    backgroundColor: "white",
    height: "100%",
  },
};

const SideMenu = ({
  getAllList,
  classes,
  filtrarBUList,
  setListAll,
  listAll,
}) => {
  const [mexCounter, setMexCounter] = useState(0);
  const [pecCounter, setPecCounter] = useState(0);
  const [cacCounter, setCacCounter] = useState(0);
  const [colCounter, setColCounter] = useState(0);
  const [contador, setCont] = useState(0);

  const AllEquipment = getAllList;

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

  const [List, setList] = useState([]);
  const [contar, setContar] = useState(0);

  const allAquipmentRelation = async () => {
    await Axios.get(
      "https://node-gead.herokuapp.com/api/AllequipmentRelation"
    ).then((response) => {
      setListAll(response.data.equipment);
    });
    setCont(listAll.length);

    // let counter = 1
    // for (let i = 0; i <= 1; i++) {
    // setContar(++counter)

    //  }
  };

  // const { classes } = props;

  return (
    <ThemeProvider theme={theme}>
      <div className={`${classes.sideMenu}`}>
        <div className="pt-5 border-1">
          <img src={abinbev} />
        </div>
        <div className="p-2 mt-5">
          <Button
            className="btn btn-large filtercard w-100 mb-2"
            onClick={(e) => filtrarBUList("total", "total", setListAll)}
          >
            <div className="row align-items-center">
              <div className="col-3">
                {" "}
                <img src={GlobalIcon} className="img-fluid" />
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
                      <strong className="counter">{`${contador}`}</strong>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </Button>
          <Button
            className="btn btn-large filtercard w-100 mb-2"
            onClick={(e) => filtrarBUList("MEX")}
          >
            {" "}
            <div className="row align-items-center">
              <div className="col-3">
                <img src={GlobalIcon} className="img-fluid" />
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
                      <strong className="counter">{`${mexCounter}`}</strong>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </Button>
          <Button
            className="btn btn-large filtercard w-100 mb-2"
            onClick={(e) => filtrarBUList("CAC")}
          >
            {" "}
            <div className="row align-items-center">
              <div className="col-3">
                {" "}
                <img src={GlobalIcon} className="img-fluid" />
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
                      <strong className="counter">{`${cacCounter}`}</strong>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </Button>

          <Button
            className="btn btn-large filtercard w-100 mb-2"
            onClick={(e) => filtrarBUList("PEC")}
          >
            <div className="row align-items-center">
              <div className="col-3">
                <img src={GlobalIcon} className="img-fluid" />
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
                      <strong className="counter">{`${pecCounter}`}</strong>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </Button>
          <Button
            className="btn btn-large filtercard w-100 mb-2 "
            onClick={(e) => filtrarBUList("COL")}
          >
            {" "}
            <div className="row  align-items-center">
              <div className="col-3">
                <img src={GlobalIcon} className="img-fluid" />
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
                      <strong className="counter">{`${colCounter}`}</strong>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </Button>
          <Button
            className="btn btn-large filtercard w-100 mb-2 align-items-center d-flex"
            onClick={(e) => filtrarBUList("PEC")}
          >
            <div>
              <h5>Power BI</h5>
            </div>
          </Button>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default withStyles(style)(SideMenu);
