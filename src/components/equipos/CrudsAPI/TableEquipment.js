import React from 'react'

const TableEquipment = (props) => {
    return (
        <div>
            <table className="table table-responsive table-striped table-hover">
                {/* table-responsive */}
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Code</th>
                        <th>Procedencia</th>
                        <th>Acciones</th>    
                    </tr>
                </thead>

                <tbody>
                    {
                        props.equipmentList.length > 0 ?
                            props.equipmentList.map((elemento) => (
                                <tr key={elemento.Id_Equipment} >
                                    <td >{elemento.Id_Equipment}</td>
                                    <td >{elemento.Name}</td>
                                    <td >{elemento.code}</td>
                                    <td>{elemento.Id_Procedencia}</td>

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

export default TableEquipment
