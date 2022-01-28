import React, { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core";
import "../styles/styles.scss";
import Controls from "./controls/Controls";
import Axios from "axios";
import abinbev from "../assets/abinbev.jpeg";
import Button from "@mui/material/Button";
import manual from "../assets/Manual.pdf";
import {
  ArrowDownward,
  FontDownload,
  FontDownloadTwoTone,
} from "@material-ui/icons";

const style = {
  sideMenu: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    left: "0px",
    width: "250px",
    height: "100%",
    backgroundColor: "white",
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
    <div className={`container ${classes.sideMenu}`}>
      <div className="pt-5 border-1">
        <img src={abinbev} />
      </div>
      <div className={"p-2 mt-5 "}>
        <Button
          className="btn btn-large filtercard w-100 mb-2"
          onClick={(e) => filtrarBUList("total", "total", setListAll)}
        >
          <div>
            <h6>
              <strong>Middle America</strong>
            </h6>
            <h6>
              {" "}
              Equipos: <strong>{`${contador}`}</strong>
            </h6>
          </div>
        </Button>
        <Button
          className="btn btn-large filtercard w-100 mb-2"
          onClick={(e) => filtrarBUList("MEX")}
        >
          <div>
            <h6>
              <strong>MEX</strong>
            </h6>
            <h6>
              {" "}
              Equipos: <strong>{`${mexCounter}`}</strong>
            </h6>
          </div>
        </Button>
        <Button
          className="btn btn-large filtercard w-100 mb-2"
          onClick={(e) => filtrarBUList("CAC")}
        >
          <div>
            <h6>
              <strong>CAC</strong>
            </h6>
            <h6>
              {" "}
              Equipos: <strong>{`${cacCounter}`}</strong>
            </h6>
          </div>
        </Button>

        <Button
          className="btn btn-large filtercard w-100 mb-2"
          onClick={(e) => filtrarBUList("PEC")}
        >
          <div>
            <h6>
              <strong>PEC</strong>
            </h6>
            <h6>
              {" "}
              Equipos: <strong>{`${pecCounter}`}</strong>
            </h6>
          </div>
        </Button>
        <Button
          className="btn btn-large filtercard w-100 mb-2"
          onClick={(e) => filtrarBUList("COL")}
        >
          <div>
            <h6>
              <strong>COL</strong>
            </h6>
            <h6>
              {" "}
              Equipos: <strong>{`${colCounter}`}</strong>
            </h6>
          </div>
        </Button>
        <Button
          className="btn btn-large filtercard w-100 mb-2 align-items-center d-flex"
          onClick={(e) => filtrarBUList("PEC")}
        >
          <div>
            <h6>
              <strong>Power BI</strong>
            </h6>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default withStyles(style)(SideMenu);
