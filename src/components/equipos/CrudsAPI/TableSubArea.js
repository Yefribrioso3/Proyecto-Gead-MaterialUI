import React from 'react'

const TableSubArea = (props) => {
    return (
        <div>
            <table className="table  table-striped table-hover">
                {/* table-responsive */}
                <thead>
                    <tr>
                        <th>#</th>
                        <th>SubArea</th>
                        <th>Area</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        props.subAreaList.length > 0 ?
                            props.subAreaList.map((elemento) => (
                                <tr key={elemento.Id_SubAreas} >
                                    <td >{elemento.Id_SubAreas}</td>
                                    <td >{elemento.Id_Areas}</td>
                                    <td>{elemento.Name}</td>

                                    <td><button
                                        className="btn btn-primary"
                                    >
                                        Editar
                                    </button> {" "}

                                        <button
                                            className="btn btn-danger"
                                            onClick={() => { props.deleteBU(elemento.Id_BU) }}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={3}>No hay equipos registrados</td>
                                </tr>
                            )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default TableSubArea
