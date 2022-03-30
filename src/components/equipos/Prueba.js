// import React, { useState } from 'react';
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../equipos/MaestroEquipos.scss";

// =================       CRUD DE LAS TABLAS DEL API      ========================

import "../menu/menu.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Container } from "reactstrap";
import Axios from "axios";
import { useEffect, useState } from "react";
import TableBU from "./CrudsAPI/TableBU";
import FormBU from "./CrudsAPI/FormBU";
import FormCountry from "./CrudsAPI/FormCountry";
import TableCountry from "./CrudsAPI/TableCountry";
import TableOperations from "./CrudsAPI/TableOperations";
import FormOperations from "./CrudsAPI/FormOperations";
import TableAreas from "./CrudsAPI/TableAreas";
import FormAreas from "./CrudsAPI/FormAreas";
import TableSubArea from "./CrudsAPI/TableSubArea";
import FormSubArea from "./CrudsAPI/FormSubArea";
import TableEquipment from "./CrudsAPI/TableEquipment";
import FormEquipment from "./CrudsAPI/FormEquipment";
import TableTechnicalSpec from "./CrudsAPI/TableTechnicalSpec";
import FormTechSpec from "./CrudsAPI/FormTechSpec";
import TableTechSpecValue from "./CrudsAPI/TableTechSpecValue";
import FormTechSpecValue from "./CrudsAPI/FormTechSpecValue";
import { globalApi } from "../../types/api.types";
// import { Button } from "bootstrap";

// import {
//     Container,
//     Button,
//     Table,
//     Modal,
//     ModalHeader,
//     ModalBody,
//     ModalFooter,
//     Input,
//     FormGroup,
//     Nav,
// } from 'reactstrap';

// import Navbar from '../Navbar';
// import Sidebar from '../Sidebar';

export const Prueba = (props) => {
  // const [bu, setBu] = useState({ Id_BU: "", Name: ""});

  const [bu, setBu] = useState();

  // ---------------------   Country --------------------------
  const [country, setCountry] = useState({
    Id_Countries: "",
    name: "",
    id_Bu: "",
  });

  const [countryList, setcountryList] = useState([]);

  // ----------------   Operations   --------------------------

  const [operationsList, setOperationsList] = useState([]);

  // ----------------  AREA -----------------------------------

  const [areaList, setAreaList] = useState([]);
  // ----------------  SUB AREA -----------------------------------

  const [subAreaList, setSubAreaList] = useState([]);

  // ----------------  Equipment -----------------------------------

  const [equipmentList, setEquipmentList] = useState([]);

  // ----------------  TECHNICAL SPECIFICATION -----------------------------------
  const [technicalSpecList, setTechnicalSpecList] = useState([]);

  // ----------------  TECHNICAL SPECIFICATION -----------------------------------

  const [technicalSpecValList, setTechnicalSpecValList] = useState([]);

  const [buList, setBuList] = useState([]);

  // ========================= API NODE js===============================

  // ========================= MOSTRAR GET ==============================
  useEffect(() => {
    Axios.get(`${globalApi}/bu`).then((response) => {
      // console.log(response.data);
      setBuList(response.data);
    });

    Axios.get(`${globalApi}/planta`).then((response) => {
      setOperationsList(response.data.planta);
    });

    Axios.get(`${globalApi}/area`).then((response) => {
      setAreaList(response.data.area);
    });

    Axios.get(`${globalApi}/subArea`).then((response) => {
      setSubAreaList(response.data.subarea);
    });

    Axios.get(`${globalApi}/equipment`).then((response) => {
      setEquipmentList(response.data.equipment);
    });

    Axios.get(`${globalApi}/technicalSpecification`).then((response) => {
      setTechnicalSpecList(response.data.technicalSpecification);
    });

    Axios.get(`${globalApi}/technicalSpecificationValues`).then((response) => {
      setTechnicalSpecValList(response.data.technicSpecValues);
    });
  }, []);

  // ===================================================================

  //  ======================== INSERTAR ================================

  const submitBU = () => {
    Axios.post(`${globalApi}/bu`, {
      Name: bu,
    }).then(() => {
      alert("Successful insert");
    });

    // setBuList([  //Actualizar datos en tabla automatico
    //     ...buList,
    //     { Name: bu },
    // ]);
  };

  // ---------------------   INSERTAR COUNTRY   -------------------------
  const submitCountry = () => {
    Axios.post(`${globalApi}/countries`, {
      Name: country.name,
      Id_BU: country.id_Bu,
    }).then(() => {
      alert("Successful insert");
    });

    // setcountryList([
    //     ...countryList,
    //     { name: country.Name,
    //     id_Bu: country.Id_BU},
    // ]);
  };

  return (
    <div className="bg-colorBody p-5">
      {/* <h1> Home </h1> */}

      <Container>
        {/* ==================================================================== */}

        <div className="">
          {/* id="d-flex align-items-start flex-column bd-highlight mb-3"  */}
          <div className="">
            {/* form-register */}
            {/* container */}

            <div className="row ">
              {/* --------------------------   BU  --------------------------- */}
              <div className="col-4">
                <div className="form-register">
                  <FormBU
                    setBu={setBu}
                    // buList={buList}
                    submitBU={submitBU}
                  />
                  <div className="tablasApi">
                    <TableBU bu={bu} />
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="form-register">
                  {/* ----------------------------------   COUNTRIES -------------------------------- */}
                  <FormCountry
                    country={country}
                    setCountry={setCountry}
                    submitCountry={submitCountry}
                  />

                  <div className="p-2 tablasApi">
                    <TableCountry countryList={countryList} />
                  </div>
                </div>
              </div>

              <div className="col-4 ">
                <div className="form-register">
                  {/* ------------------------------------------    OPERATIONS   ----------------------------------- */}
                  <FormOperations
                    buList={buList}
                    setBu={setBu}
                    submitBU={submitBU}
                  />

                  <TableOperations operationsList={operationsList} bu={bu} />
                </div>
              </div>

              <div className="row">
                <div className="col-4">
                  <div className="form-register">
                    {/* ------------------------------------------    AREA   ----------------------------------- */}
                    <FormAreas
                      countryList={countryList}
                      setCountry={setCountry}
                      submitBU={submitBU}
                    />

                    <TableAreas
                      areaList={areaList}
                      operationsList={operationsList}
                      countryList={countryList}
                      bu={bu}
                    />
                  </div>
                </div>

                <div className="col-4">
                  <div className="form-register">
                    {/* ------------------------------------------    SUB AREA   ----------------------------------- */}
                    <FormSubArea
                      countryList={countryList}
                      setCountry={setCountry}
                      submitBU={submitBU}
                    />

                    <TableSubArea
                      subAreaList={subAreaList}
                      operationsList={operationsList}
                      countryList={countryList}
                      bu={bu}
                    />
                  </div>
                </div>

                <div className="col-4">
                  <div className="form-register">
                    {/* ------------------------------------------    Equipment   ----------------------------------- */}

                    <FormEquipment
                      equipmentList={equipmentList}
                      setCountry={setCountry}
                      submitBU={submitBU}
                    />

                    <TableEquipment
                      equipmentList={equipmentList}
                      operationsList={operationsList}
                      countryList={countryList}
                      bu={bu}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-4">
                  <div className="form-register">
                    {/* ------------------------------------------    TECHNICAL SPECIFITACION   ----------------------------------- */}
                    <FormTechSpec
                      technicalSpecList={technicalSpecList}
                      setCountry={setCountry}
                      submitBU={submitBU}
                    />

                    <TableTechnicalSpec
                      technicalSpecList={technicalSpecList}
                      operationsList={operationsList}
                      countryList={countryList}
                      bu={bu}
                    />
                  </div>
                </div>

                <div className="col-5 form-register">
                  <div className="">
                    {/* ------------------------------------------    Technical Spec Value    ----------------------------------- */}
                    <FormTechSpecValue
                      countryList={countryList}
                      setCountry={setCountry}
                      submitBU={submitBU}
                    />

                    <TableTechSpecValue
                      technicalSpecValList={technicalSpecValList}
                      operationsList={operationsList}
                      countryList={countryList}
                      bu={bu}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-4">
                  <div className="form-register">
                    {/* ------------------------------------------    TECHNICAL SPECIFITACION   ----------------------------------- */}
                    <FormTechSpec
                      technicalSpecList={technicalSpecList}
                      setCountry={setCountry}
                      submitBU={submitBU}
                    />

                    <TableTechnicalSpec
                      technicalSpecList={technicalSpecList}
                      operationsList={operationsList}
                      countryList={countryList}
                      bu={bu}
                    />
                  </div>
                </div>

                <div className="col-5 form-register">
                  <div className="">
                    {/* ------------------------------------------    Technical Spec Value    ----------------------------------- */}
                    <FormTechSpecValue
                      countryList={countryList}
                      setCountry={setCountry}
                      submitBU={submitBU}
                    />

                    <TableTechSpecValue
                      technicalSpecValList={technicalSpecValList}
                      operationsList={operationsList}
                      countryList={countryList}
                      bu={bu}
                    />
                  </div>
                </div>

                {/* ------------------------------------------    PROCEDENCIAS   ----------------------------------- */}
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================================= */}

        {/* <Row>
                    <Col xs="4">Columna 1</Col>
                    <Col xs="4">Columna 1</Col>
                    <Col xs="4">Columna 1</Col>
                </Row>

                <Row xs="2">
                    <Col>Column</Col>
                    <Col>Column</Col>
                    <Col>Column</Col>
                    <Col>Column</Col>
                </Row>
                <Row xs="4">
                    <Col>Column</Col>
                    <Col>Column</Col>
                    <Col>Column</Col>
                    <Col>Column</Col>
                </Row> */}
      </Container>

      <footer className="footer mt-5 ml-5 p-4">
        <h4>Project GEAD</h4>
      </footer>
    </div>
  );
};
