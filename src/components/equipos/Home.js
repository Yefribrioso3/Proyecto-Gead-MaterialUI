import React, { useState } from "react";
import { Button, Container } from "reactstrap";
import * as XLSX from "xlsx";
import "../menu/menu.css";

const Home = () => {
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const [editTableExcel, setEditTableExcel] = useState(false); //Abrir y cerrar tabla

  const [item, setItem] = useState([]);

  const readExcels = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const workbook = XLSX.read(bufferArray, { type: "buffer" });

        const workbookSheetsName = workbook.SheetNames[0];

        const workbookSheet = workbook.Sheets[workbookSheetsName];

        const data = XLSX.utils.sheet_to_json(workbookSheet);
        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };

      setEditTableExcel(true);
    });

    promise.then((d) => {
      setItem(d);
    });
    console.log(item);
  };

  const seleccionarEquipo = (element, caso) => {
    console.log("funciona");
  };

  // ----------------------          Subir Imagen            ----------------

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "preset_Gead");
    setLoading(true);
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dikwnsuwc/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const file = await res.json();
    setImage(file.secure_url);
    setLoading(false);
  };

  return (
    <div className="bg-colorBody p-5">
      <Container className="form-register mb-4">
        <div>
          <input
            type="file"
            onChange={(e) => {
              const file = e.target.files[0];

              readExcels(file);
            }}
          />
          ;
        </div>

        {/* <div className="mt-4">
                    <h1>Cargar Imagen</h1>
                    <input
                        type="file"
                        name="file"
                        placeholder="Upload an image"
                        onChange={uploadImage}
                    />
                    {   loading ? (
                        <h3>Loading...</h3>
                    ) : (
                        <img src={image} style={{width: '300px' }} />
                    )
                    }
                </div> */}

        {editTableExcel ? (
          <div className="table-responsive mt-5">
            <table className="table table-hover align-middle table-sm animate__animated animate__fadeIn ">
              <thead>
                {/* table-striped table-hover table-responsive table- */}
                <tr>
                  <th className="table-active" scope="col">
                    #
                  </th>
                  <th className="table-active" scope="col">
                    BU
                  </th>
                  <th className="table-active" scope="col">
                    País
                  </th>
                  <th className="table-active" scope="col">
                    Planta
                  </th>
                  <th className="table-active" scope="col">
                    Area
                  </th>
                  <th className="table-active" scope="col">
                    Subarea
                  </th>
                  <th className="table-active" scope="col">
                    Equipo
                  </th>

                  <th className="table-active">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {item.map((element) => (
                  <tr key={element.No}>
                    <td scope="row">{element.No}</td>
                    <td>{element.BU}</td>
                    <td>{element.Country}</td>
                    <td>{element.Plant}</td>
                    <td>{element.Area}</td>
                    <td>{element.Subarea}</td>
                    <td>{element.Equipment_Name}</td>
                    {/* =================== Boton Editar ========================*/}
                    <td>
                      <Button
                        color="primary"
                        onClick={() => seleccionarEquipo(element, "Editar")}
                      >
                        <i className="far fa-edit button_icon"></i>
                      </Button>{" "}
                      {"  "}
                      {/* =================== Boton Eliminar ====================== */}
                      {/* Editar  */}
                      <Button
                        color="danger"
                        onClick={() => seleccionarEquipo(element, "Eliminar")}
                      >
                        <i className="fas fa-trash-alt button_icon"></i>{" "}
                      </Button>{" "}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <></>
        )}
      </Container>
      <footer className="footer mt-5 ml-5 p-4">
        <h4>Project GEAD</h4>;
      </footer>
      ;
    </div>
  );
};

export default Home;
