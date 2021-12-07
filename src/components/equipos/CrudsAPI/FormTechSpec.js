import React from 'react'

const FormTechSpec = (props) => {
    return (
        <>
         <div className="app appStyle">
                <h3>Technical Specification</h3>

                <div className="form py-2">
                    <label>Name</label>
                    <input
                        type="text"
                        name="Name"
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

export default FormTechSpec
