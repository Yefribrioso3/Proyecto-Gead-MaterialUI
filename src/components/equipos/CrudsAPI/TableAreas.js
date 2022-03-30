import React from "react";

const TableAreas = (props) => {
  return (
    <div>
      <table className="table table-responsive table-striped table-hover">
        {/* table-responsive */}
        <thead>
          <tr>
            <th>#</th>
            <th>Area</th>
            <th>Operations</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {props.areaList.length > 0 ? (
            props.areaList.map((elemento) => (
              <tr key={elemento.Id_Areas}>
                <td>{elemento.Id_Areas}</td>
                <td>{elemento.Name}</td>
                <td>{elemento.Id_Operations}</td>

                {/* <td>{elemento.Id_Operations}</td> */}

                <td>
                  <button className="btn btn-primary">Editar</button>{" "}
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      props.deleteBU(elemento.Id_BU);
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
    </div>
  );
};

export default TableAreas;
