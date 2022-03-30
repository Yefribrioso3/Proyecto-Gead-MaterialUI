import React from "react";
import { Fragment } from "react";
import { Button } from "reactstrap";

const FormTable = (props) => {
  return (
    <Fragment>
      <table className="table table-bordered table-hover table-responsive table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>BU</th>
            <th>País</th>
            <th>Area</th>
            <th>Planta</th>
            <th>Equipos</th>
            <th>Denominacion Equipo</th>
            <th>Descripcion</th>
            <th>Emplazam</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {props.dataInfo.length > 0 ? (
            props.dataInfo.map((elemento) => (
              <tr key={elemento.id}>
                <td>{elemento.id}</td>
                <td>{elemento.BU}</td>
                <td>{elemento.country}</td>
                <td>{elemento.area}</td>
                <td>{elemento.planta}</td>
                <td>{elemento.equipos}</td>
                <td>{elemento.denominacionEquipo}</td>
                <td>{elemento.descripcion}</td>
                <td>{elemento.emplazam}</td>

                {/* ===================   BOTON EDITAR  ================= */}
                <td>
                  <Button
                    color="primary"
                    onClick={() => {
                      props.editRow(elemento);
                    }}
                  >
                    <i className="far fa-edit button_icon"></i>
                  </Button>{" "}
                  {"  "}
                  {/* ===================  BOTON ELIMINAR  ====================== */}
                  {/* Editar  */}
                  <Button
                    color="danger"
                    onClick={() => {
                      props.EliminarEquipo(elemento.id);
                    }}
                  >
                    <i className="fas fa-trash-alt button_icon"></i>
                  </Button>
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

export default FormTable;
