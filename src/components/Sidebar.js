import React from 'react';
import { NavLink } from 'react-router-dom';
import * as FaIcons from "react-icons/fa"

const Sidebar = () => {
    return (
        <div className="sidebar shadow-sm ">
            {/* bg-light  */}

            <div className="toggle-btn">
                <span></span>
                <span></span>
                <span></span>
            </div>
            
            <ul>
                <li>
                    <NavLink to="/home" className="text-white rounded py-2 w-100 d-inline-block navbarText px-3"
                    activeClassName="active"><FaIcons.FaHome className="me-2"/>Home</NavLink>
                </li>
                <li>
                    <NavLink to="/consultaEquipos" className="text-white navbarText rounded py-2 w-100 d-inline-block px-3"
                    activeClassName="active"><FaIcons.FaSearch className="me-2"/>Consulta de equipos</NavLink>
                </li>
                <li>
                    <NavLink to="/maestroEquipos" className="text-white  navbarText rounded py-2 w-100 d-inline-block px-3"
                    activeClassName="active"><FaIcons.FaHardHat className="me-2"/>Maestro de equipos</NavLink>
                </li>
            </ul>
            {/* text-dark */}
        </div>
    )
}

export default Sidebar
