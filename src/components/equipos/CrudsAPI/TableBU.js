import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { globalApi } from "../../../types/api.types";

const TableBU = (props) => {
  const [buList, setBuList] = useState([]);

  useEffect(() => {
    Axios.get(`${globalApi}/bu`).then((response) => {
      setBuList(response.data.Bu);
    });
  }, []);

  const deleteBU = (idBU) => {
    Axios.delete(`${globalApi}/bu/${idBU}`);
  };

  return (
    <Fragment>
      <table className="table table-responsive table-striped table-hover ">
        {/* table-responsive */}
        <thead>
          <tr>
            <th>#</th>
            <th>BU</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {buList.length > 0 ? (
            buList.map((elemento) => (
              <tr key={elemento.Id_BU}>
                <td>{elemento.Id_BU}</td>
                <td>{elemento.Name}</td>

                <td>
                  <button className="btn btn-primary">Editar</button>{" "}
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      deleteBU(elemento.Id_BU);
                    }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>No hay equipos registrados</td>
            </tr>
          )}
        </tbody>
      </table>
    </Fragment>
  );
};

export default TableBU;
