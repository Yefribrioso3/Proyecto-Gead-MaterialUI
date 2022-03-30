import React, { useState } from "react";
// import PropTypes from 'prop-types';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  // NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  // NavbarText
} from "reactstrap";

const NavbarNav = ({ props, history }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  // const handleLogin = () => {
  //     history.replace('/login');   //Redireccion a la url indicada, No se puede volver atras.
  // }

  return (
    <>
      {/* <div className="menu shadowM bg-info  p-3">
                <h1><span className="fa fa-hard-hat ml-5 mr-3"></span>Maestro de equipos</h1>

                <ul className="menu-list">
                    <li key="Id1"><a href="/consultasEquipos"><span className="fa fa-search mr-2"></span>Consulta de equipos</a></li>
                    <li key="Id2"><a href="/"><span className="fa fa-hard-hat mr-2"></span>Maestro de equipos</a></li>
                    <li key="Id3"><a href="/login"><span className="fa fa-user mr-2"></span>Login</a></li>
                </ul>   
            </div> */}

      <div>
        <Navbar color="info" className="shadow-sm" light expand="md">
          <NavbarBrand href="/" className="p-0">
            <h1 className="navbarText">GEAD</h1>
          </NavbarBrand>

          <NavbarToggler onClick={toggle} />

          <Collapse isOpen={isOpen} navbar>
            <Nav className="ms-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret className="text-white">
                  Admin@admin
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>Mi perfil</DropdownItem>
                  <DropdownItem>Configuraciones</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    <NavLink href="/login" className="text-dark p-0">
                      Cerrar sesión
                    </NavLink>
                  </DropdownItem>

                  {/* <LinkContainer to='/coach/addClassroom'>
                                        <DropdownItem>
                                            <Button color='primary' className='btn-block'> Add Class </Button>
                                        </DropdownItem>
                                    </LinkContainer> */}
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    </>
  );
};

export default NavbarNav;
