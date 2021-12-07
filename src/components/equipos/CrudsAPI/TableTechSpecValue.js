import React from 'react'

const TableTechSpecValue = (props) => {
    return (
        <div>
            <table className="table table-striped table-hover">
                {/* table-responsive */}
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Value</th>
                        <th>Acciones</th>    
                    </tr>
                </thead>

                <tbody>
                    {
                        props.technicalSpecValList.length > 0 ?
                            props.technicalSpecValList.map((elemento) => (
                                <tr key={elemento.Id_TechnicalSpecificationValues} >
                                    <td >{elemento.Id_TechnicalSpecification}</td>
                                    <td >{elemento.Value}</td>


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

export default TableTechSpecValue
