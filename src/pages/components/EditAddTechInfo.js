import React from "react";
import { useForm } from "react-hook-form";

const EditAddTechInfo = ({ technicalSpecEditado, updateAddTechInfo }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: technicalSpecEditado, //Iniciar con los campos llenos con la data seleccionada
  });

  setValue("Name", technicalSpecEditado.Name); //Actualizar los campos
  setValue("Value", technicalSpecEditado.Value);

  const onSubmit = (data, e) => {
    updateAddTechInfo(technicalSpecEditado.Id_NewTechSpec, data);

    e.target.reset();
  };

  return (
    <section className="pb-4 pt-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="animate__animated animate__fadeIn"
      >
        <label htmlFor="technical" bold>
          {" "}
          <h5 className="text-muted">Edición de Información Técnica:</h5>
        </label>
        <select
          className="form-select"
          name="Name"
          {...register("Name", {
            required: {
              value: true,
              message: "Campo requerido",
            },
          })}
        >
          <option value="">Seleciona Información Técnica</option>
          <option value="Available warranty">Available warranty</option>
          <option value="Year of construction">Year of construction</option>
          <option value="Sanitary Grade">Sanitary Grade</option>
          <option value="Emplazam">Emplazam</option>
          <option value="Protection Grade">Protection Grade</option>
          <option value="Electrical Consumption">Electrical Consumption</option>
          <option value="Measurement variable">Measurement variable</option>
          <option value="Plant Technical Information Contact">
            Plant Technical Information Contact
          </option>
          <option value="Disposal Information">Disposal Information</option>
          <option value="Equipment Packing">Equipment Packing</option>
          <option value="Equipment current conditions comments">
            Equipment current conditions comments
          </option>
          <option value="Nominal Capacity">Nominal Capacity</option>
          <option value="Assambled / Dissambled">Assambled / Dissambled</option>
          <option value="Plant Technical Information Contact">
            Plant Technical Information Contact
          </option>
          <option value="Plant Financial Information Contact">
            Plant Financial Information Contact
          </option>
          <option value="Communication protocol">Communication protocol</option>
          <option value="Current Conditions Comments">
            Current Conditions Comments
          </option>
          <option value="Notes about equipment">Notes about equipment</option>
        </select>

        <span className="text-danger text-small d-block mb-2">
          {errors.Name && errors.Name.message}
        </span>

        <label htmlFor="value">
          Valor <b className="text-danger">*</b>
        </label>

        <div className="row ">
          <div className="col-10">
            <input
              type="text text-align=center"
              className="form-control"
              name="Value"
              {...register("Value", {
                required: {
                  value: true,
                  message: "Campo requerido",
                },
              })}
            />
            <span className="text-danger text-small d-block mb-2">
              {errors.Value && errors.Value.message}
            </span>
          </div>

          {/* -----------------------------    BONON AGREGAR TECHNICAL INFORMATION    -----------------------  */}

          <div className="col-2">
            <button className="btn btn-primary">
              <span className=" far fa-edit fa-lg"></span>
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default EditAddTechInfo;
