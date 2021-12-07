import React from 'react'

const FormSubArea = (props) => {
    return (
        <>
            <div className="app appStyle">
                <h3>CRUD SubAreas</h3>

                <div className="form py-2">
                    <label>SubArea Name</label>
                    <input
                        type="text"
                        name="Name"
                        onChange={(e) => props.setCountry(e.target.value)}
                    />
                    <label>ID Area</label>
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

export default FormSubArea
