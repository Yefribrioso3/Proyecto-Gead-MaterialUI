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
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
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

import geadlogo from "../assets/Gead.jpeg";
// import { LinkContainer } from 'react-router-bootstrap';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    backgroundColor: "transparent",
    boxShadow: "none",
  },
  bar: {
    backgroundColor: "#fff",
    paddingTop: theme.spacing(5),
    borderRadius: "12px",
    boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.25)",
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
      <Navbar className={classes.bar} light expand="md">
        <img src={geadlogo} />
        <PageHeader
          title="Consulta de equipos"
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
                Manual <ArrowDownward />
              </a>
            </div>

            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret className="text-black">
                Bienvenid@ Admin@admin
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <NavLink href="/login" className="text-dark p-0">
                    Cerrar sesión <ExitToAppIcon />
                  </NavLink>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </AppBar>
  );
}
