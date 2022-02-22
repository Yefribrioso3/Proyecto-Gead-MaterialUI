import Axios from "axios";
import { useEffect, useState } from "react";
import { globalApi } from "../../../types/api.types";

const TableCountry = (props) => {

    const [countryList, setcountryList] = useState([]);

    useEffect(() => {
        Axios.get(`${globalApi}/countries`).then((response) => {
            setcountryList(response.data.countries)
        });
    }, []);

    //  ======================== ELIMINAR ===============================
    // ==================================================================
    const deleteCountry = (id) => {
        Axios.delete(`${globalApi}/countries/${id}`).then(() => {
            alert("Successful Deleted")
        });
    }

    return (
        <>
            <table className="table table-responsive table-striped table-hover">
                {/* table-responsive */}
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Countries</th>
                        <th>BU</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        countryList.length > 0 ?
                            countryList.map((elemento) => (
                                <tr key={elemento.Id_Countries} >
                                    <td >{elemento.Id_Countries}</td>
                                    <td>{elemento.Name}</td>
                                    <td>{elemento.Id_BU}</td>

                                    <td><button
                                        className="btn btn-primary"
                                    >
                                        Editar
                                    </button> {" "}

                                        <button
                                            className="btn btn-danger"
                                            onClick={() => { deleteCountry(elemento.Id_Countries) }}
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
        </>
    )
}

export default TableCountry
