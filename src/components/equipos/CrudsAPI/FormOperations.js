import React from 'react'

const FormOperations = (props) => {
    return (
        <div>
            <div className="app appStyle">
                <h3>CRUD Opetarions</h3>

                <div className="form py-2">
                    <label>Operations Name</label>
                    <input
                        type="text"
                        name="Name"
                        onChange={(e) => props.setCountry(e.target.value)}
                    />
                    <label>ID Countries</label>
                    <input
                        type="text"
                        name="Id_BU"
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

export default FormOperations
