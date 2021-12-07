import React from 'react'

const FormBU = ({setBu, submitBU}) => {

    
    return (
        <div className="app appStyle">
            <h3>CRUD BU</h3>
            
            <div className="form py-2">
                {/* <label>ID</label>
                <input
                    type="text"
                    name="Id_BU"
                    // value={ props.buList.length + 1 }
                    onChange={(e) => props.setBu(e.target.value)}
                /> */}
                <label>BU Name</label>
                <input
                    type="text"
                    name="name"
                    onChange={(e) => setBu(e.target.value)}
                />
                <button
                    className="btn btn-primary mt-3"
                    onClick={submitBU}
                >
                    Submit
                </button>
            </div>
        </div>
    )
}

export default FormBU
