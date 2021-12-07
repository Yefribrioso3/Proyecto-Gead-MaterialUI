import React from 'react'

const FormCountry = ({country, setCountry, submitCountry}) => {

    const handleChange = (e) =>{
        setCountry({
            ...country,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div>
            <div className="app appStyle">
                <h3>CRUD Country</h3>

                <div className="form py-2">
                    <label>Country Name</label>
                    <input
                        type="text"
                        name="name"
                        onChange={handleChange}
                    />
                    <label>ID BU</label>
                    <input
                        type="text"
                        name="id_Bu"
                        onChange={handleChange}
                    />

                    <button
                        className="btn btn-primary mt-3"
                        onClick={submitCountry}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FormCountry
