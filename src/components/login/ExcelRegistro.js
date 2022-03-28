import { IconButton } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import React, { useState } from "react";
import * as XLSX from "xlsx";
import Axios from "axios";
import { globalApi } from "../../types/api.types";

const ExcelRegistro = () => {
  const [item, setItem] = useState([]);

  const [user, setUser] = useState({
    Name: "",
    LastName: "",
    email: "",
    password: "",
    roleId: 1,
  });

  const send = async (item) => {
    // console.log(item);

    const Excel = item.map((equipo) => {
      return (equipo = {
        Name:
          equipo[" user "] === undefined
            ? "No Data Available"
            : equipo[" user "],
        LastName:
          equipo.Apellido === undefined ? "No Data Available" : equipo.Apellido,
        email:
          equipo.correo === undefined ? "No Data Available" : equipo.correo,
        password: "Prueba@1",
        roleId: 1,
      });
    });

    setUser(Excel);

    // console.log(Excel);
    await api(Excel);
  };

  const api = async (e) => {
    console.log(e);

    e.map(async (u) => {
      await Axios.post(`${globalApi}/register`, u)
        .then((x) => {
          console.log(x);
        })
        .catch((x) => {
          console.log(x?.response);
        });
    });
  };

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

              const workbookSheetsName = workbook.SheetNames[1];

              const workbookSheet = workbook.Sheets[workbookSheetsName];

              const data = XLSX.utils.sheet_to_json(workbookSheet);

              // const jData = [];
              // for (let i = 0; i < data.length; i++) {
              //     const dato = data[i];

              //     jData.push({
              //         ...dato,
              //         Date_of_Installation: formatearFechaExcel(dato.Date_of_Installation),
              //         Date_of_Desintallation: formatearFechaExcel(dato.Date_of_Desintallation)
              //     });
              // }

              resolve(data);
            };
            fileReader.onerror = (error) => {
              reject(error);
            };
          });

    promise === "undefined"
      ? console.log("undefined")
      : promise.then((d) => {
          setItem(d);
          send(d);
        });

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
  };

  return (
    <div id="imagen">
      <input
        id="icon-button-file"
        type="file"
        style={{ display: "none" }}
        onChange={(e) => {
          // setItem([]);
          // setModalInsertarExcel(false);
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
  );
};

export default ExcelRegistro;
