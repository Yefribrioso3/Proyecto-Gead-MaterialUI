import React, { useState } from 'react'
import { AppBar, Grid, makeStyles } from '@material-ui/core'
import abinbev from '../../assets/abinbev.jpeg';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';
import PageHeader from '../PageHeader';

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: '#fff',
    },
    searchInput: {
        opacity: '0.6',
        padding: `0px ${theme.spacing(1)}px`,
        fontSize: '0.8rem',
        '&:hover': {
            backgroundColor: '#f2f2f2'
        },
        '& .MuiSvgIcon-root': {
            marginRight: theme.spacing(1)
        }
    }
}))

export default function Head() {

    const classes = useStyles();

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <AppBar className={classes.root}>

            <Navbar className={classes.root} style={{ height: "4rem" }} light expand="md">
                <img src={abinbev} alt="" />

                <Grid item sm></Grid>
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                <PageHeader
                    title="Gestor de Activos en Desuso - GEAD"
                />
               
                <Grid item sm></Grid>

                <NavbarToggler onClick={toggle} />

                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ms-auto" navbar>
                        {/* <div className="">
                            <a href='https://anheuserbuschinbev.sharepoint.com/sites/MAZGEAD/GEAD%20manuales/Forms/AllItems.aspx' className='btn' style={{ color: "blue" }} title='Descargar proyecto'> Manual </a>
                        </div> */}

                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret className="text-black">
                                Admin@admin
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem >
                                    <NavLink href="/login" className="text-dark p-0">Cerrar sesión</NavLink>
                                </DropdownItem>

                            </DropdownMenu>

                        </UncontrolledDropdown>
                    </Nav>
                </Collapse>
            </Navbar>
        </AppBar>
    )
}
