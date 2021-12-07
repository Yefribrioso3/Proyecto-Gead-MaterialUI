import React from 'react'
import { useForm } from 'react-hook-form';


const EditAddServInfo = ({ techInfoEditado, updateAddServInfo}) => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        defaultValues: techInfoEditado //Iniciar con los campos llenos con la data seleccionada
    });

    setValue('Name', techInfoEditado.Name);  //Actualizar los campos
    setValue('Value', techInfoEditado.Value);


    const onSubmit = (data, e) => {
        
        updateAddServInfo(techInfoEditado.Id_NewServInfo, data, e)
        
        e.target.reset()
    }


   
    return (
        
        <section className="pb-4 pt-4">

            <form onSubmit={handleSubmit(onSubmit)} className="animate__animated animate__fadeIn"  >
                <label htmlFor="technical" bold> <h5 className="text-muted">Editing Technical Information:</h5></label>
                <select
                    className="form-select"
                    name="Name"

                    {...register("Name", {
                        required: {
                            value: true,
                            message: 'Campo requerido'
                        }
                    })}
                >
                    <option value="">Seleciona</option>
                    <option value="Available warranty">Available warranty</option>
                    <option value="Notes about equipment">Notes</option>
                </select>

                <span className="text-danger text-small d-block mb-2">
                    {errors.Name && errors.Name.message}
                </span>


                <label htmlFor="value">Value <b className="text-danger">*</b></label>

                <div className="row ">
                    <div className="col-10">
                        <input
                            type="text text-align=center"
                            className="form-control"
                            name="Value"
                            // onChange={handleChange}
                            // onChange={(e) => e.target.value}
                            {...register("Value", {
                                required: {
                                    value: true,
                                    message: 'Campo requerido'
                                }
                            })}

                        />
                        <span className="text-danger text-small d-block mb-2">
                            {errors.Value && errors.Value.message}
                        </span>

                    </div>

                    {/* -----------------------------    BONON AGREGAR TECHNICAL INFORMATION    -----------------------  */}
                    <div className="col-2">
                        <button className="btn btn-primary"><span className=" far fa-edit fa-lg"></span></button>
                    </div>
                </div>
                {/* ============== onChange =============== Captura los cambios, lo que el usuario escriba*/}
            </form>
        </section>
    )
}

export default EditAddServInfo;
