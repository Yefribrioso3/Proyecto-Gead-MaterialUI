import React from 'react'

const FormTechSpecValue = (props) => {
    return (
        <div>
            <div className="app appStyle">
                <h3>Technical Specification Value</h3>

                <div className="form py-2">
                    <label>Technical Specification</label>
                    <input
                        type="text"
                        name="Id_TechnicalSpecification"
                        onChange={(e) => props.setCountry(e.target.value)}
                    />

                    <label>Value</label>
                    <input
                        type="text"
                        name="Value"
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

export default FormTechSpecValue
