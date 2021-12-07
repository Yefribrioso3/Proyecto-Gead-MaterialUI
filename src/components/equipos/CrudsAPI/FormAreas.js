import React from 'react'

const FormAreas = (props) => {
    return (
        <>
            <div className="app appStyle">
                <h3>CRUD Areas</h3>

                <div className="form py-2">
                    <label>Area Name</label>
                    <input
                        type="text"
                        name="Name"
                        onChange={(e) => props.setCountry(e.target.value)}
                    />
                    <label>ID Operations</label>
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
        </>
    )
}

export default FormAreas
