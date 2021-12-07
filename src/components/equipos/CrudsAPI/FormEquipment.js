import React from 'react'

const FormEquipment = (props) => {
    return (
        <div>
            <div className="app appStyle">
                <h3>CRUD Equipment</h3>

                <div className="form py-2">
                    <label>Equipment Name</label>
                    <input
                        type="text"
                        name="Name"
                        onChange={(e) => props.setCountry(e.target.value)}
                    />
                    <label>Code</label>
                    <input
                        type="text"
                        name="Name"
                        onChange={(e) => props.setCountry(e.target.value)}
                    />
                    <label>ID Procedencia</label>
                    <input
                        type="text"
                        name="Id_Areas"
                        onChange={(e) => props.setCountry(e.target.value)}
                    />

                    <button
                        className="btn btn-primary mt-3"
                        onClick={props.submitBU}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FormEquipment
