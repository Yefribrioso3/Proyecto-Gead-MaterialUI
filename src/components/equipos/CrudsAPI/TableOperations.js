import React from 'react'

const TableOperations = (props) => {
    return (
        <div>
             <table className="table table-striped table-hover">
                {/* table-responsive */}
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Operations</th>
                        <th>Countries</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        props.operationsList.length > 0 ?
                            props.operationsList.map((elemento) => (
                                <tr key={elemento.Id_Operations} >
                                    <td >{elemento.Id_Operations}</td>
                                    <td>{elemento.Name}</td>
                                    <td>{elemento.Id_Countries}</td>

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

export default TableOperations
