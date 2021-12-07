import React from 'react'

const TableTechnicalSpec = (props) => {
    return (
        <div>
             <table className="table table-responsive table-striped table-hover">
                {/* table-responsive */}
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Acciones</th>    
                    </tr>
                </thead>

                <tbody>
                    {
                        props.technicalSpecList.length > 0 ?
                            props.technicalSpecList.map((elemento) => (
                                <tr key={elemento.Id_TechnicalSpecification} >
                                    <td >{elemento.Id_TechnicalSpecification}</td>
                                    <td >{elemento.Name}</td>


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

export default TableTechnicalSpec
