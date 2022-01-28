import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Grid,
  InputBase,
  IconButton,
  Badge,
  makeStyles,
} from "@material-ui/core";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import SearchIcon from "@material-ui/icons/Search";

import abinbev from "../assets/abinbev.jpeg";

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
import PageHeader from "./PageHeader";
import { ArrowDownward } from "@material-ui/icons";
// import { LinkContainer } from 'react-router-bootstrap';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fff",
  },
  searchInput: {
    opacity: "0.6",
    padding: `0px ${theme.spacing(1)}px`,
    fontSize: "0.8rem",
    "&:hover": {
      backgroundColor: "#f2f2f2",
    },
    "& .MuiSvgIcon-root": {
      marginRight: theme.spacing(1),
    },
  },
}));

export default function Header() {
  const classes = useStyles();

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <AppBar position="static" className={classes.root}>
      <Navbar className={classes.root} light expand="md">
        <PageHeader
          title="Gestor de Activos en Desuso - GEAD"
          // title="Consulta de Equipos"
          // subTitle="Middle America"
          // subTitle="Form design with validation"
          // icon={<PeopleOutlineTwoToneIcon fontSize="large" />}
        />
        <Grid item sm></Grid>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ms-auto" navbar>
            <div className="">
              <a
                href="../assets/Manual.pdf"
                className="btn"
                style={{ color: "blue" }}
                download="Manual.pdf"
                title="Descargar proyecto"
              >
                {" "}
                Manual <ArrowDownward />
              </a>
              {/* src/assets/Manual.pdf */}
            </div>

            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret className="text-black">
                Admin@admin
              </DropdownToggle>
              <DropdownMenu right>
                {/* 
                                <DropdownItem>
                                    Mi perfil
                                </DropdownItem> */}
                {/* <DropdownItem>
                                    Configuraciones
                                </DropdownItem> */}
                {/* <DropdownItem divider /> */}
                <DropdownItem>
                  <NavLink href="/login" className="text-dark p-0">
                    Cerrar sesión
                  </NavLink>
                </DropdownItem>

                {/* <LinkContainer to='/coach/addClassroom'>
                                <DropdownItem>
                                <button color='primary' className='btn-block'> Add Class </button>
                                </DropdownItem>
                                </LinkContainer> */}
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </AppBar>
  );
}
