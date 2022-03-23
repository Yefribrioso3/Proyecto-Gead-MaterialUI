/* eslint-disable react/jsx-pascal-case */
// import { useForm } from 'react-hook-form';
// import ExcelRegistro from './ExcelRegistro';
import React, { useEffect, useState } from 'react'
// import Axios from "axios";
import Head from './Head';
import PropTypes from 'prop-types';
import Gead from '../../assets/Gead.jpeg'
import { DataGrid } from '@mui/x-data-grid';
import Controls from '../controls/Controls';
// import { globalApi } from '../../types/api.types';
import { ModalEditar } from './components/ModalEditar';
import { ModalInsertar } from './components/ModalInsertar';
import { Delete, Search, Visibility } from '@material-ui/icons';
import { Button, createTheme, CssBaseline, Grid, IconButton, InputAdornment, Paper, ThemeProvider, Typography } from '@material-ui/core';
import { authAxios } from '../../types/headerToken';
import { UserToken } from '../../pages/ConsultaEquipos';
// makeStyles, TextField,


const Registro = ({ history }) => {
    // const { register, handleSubmit, formState: { errors } } = useForm();

    // --------------------     Estilos     --------------------
    // useEffect(() => {
    //     getUser();
    // }, []);

    const style = createTheme({
        paper: {
            padding: 40,
            height: '50rem',
            width: '70rem',
            margin: '130px auto',
            borderRadius: '24px'
        },
        validation: {
            padding: 20,
            height: '60px',
            width: '160px',
            margin: '2rem auto',
            borderRadius: '24px'
        },
        validationPassword: {
            padding: 20,
            height: '60px',
            width: '190px',
            margin: '2rem auto',
            borderRadius: '24px'
        },
        logo: {
            width: '9rem',
            // padding: 10,
            // top: '305px',
            // left: '576px',
            // height: '18.32px',
        },
        h4: {
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontSize: '34px',
            lineHeight: '140%',
            letterSpacing: '0.0025em',
            color: '#14149A',
            marginBottom: '0.5rem',
            // marginTop: "0.5rem",
            // fontFamily: 'Roboto',
        },
        center: {
            alignItems: 'center',
        },
        txt: {
            fontFamily: 'Work Sans',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: 14,
            lineHeight: '140%',
            letterSpacing: '-0.02em',
            marginBottom: '2rem',
            /* or 18px */
        },
        TextField: {
            margin: '0.5rem 0',
        },
        btn: {
            margin: '8px 0',
            background: '#593FCC',
            borderRadius: '8px',
            fontFamily: 'Noto Sans',
            fontSize: 14,
            lineHeight: '200%',
            letterSpacing: '0.0125em',
        },
        link: {
            margin: '15px 10px 0 0',
            fontFamily: 'Noto Sans',
            fontSize: 14,
            lineHeight: '140%',
            letterSpacing: '0.004em',
            // fontWeight: 'normal',
        },
        linkColor: {
            fontColor: '#14149A',
        },
        searchInput: {
            width: '100%',
        },
    })

    const [allUser, setAllUser] = useState([]) //  -------   Consulta al Api de User

    // const [userByToken, setUserByToken] = useState({}) //  -------   Consulta al Api de User

    const getUser = async () => {   //  -------   Consulta al Api de User
        await authAxios.get(`/user`)
            .then(async (response) => {
                let a = await Promise.all(response.data.data.map(z => ({ ...z, id: z.Id_Usuario })))
                setAllUser(a)
            });
    }

    useEffect(() => {
        getUser();
    }, []);

    const [modalEditar, setModalEditar] = useState(false); //Hook para abrir y cerrar el modalEditar
    const [modalEliminar, setModalEliminar] = useState(false); //Hook para abrir y cerrar el modal Eliminar
    const [modalInsertar, setModalInsertar] = useState(false); //Hook para abrir y cerrar el modal Insertar

    const [user, setUser] = useState({
        Name: '',
        LastName: '',
        email: '',
        roleId: '',
        password: ''
    })

    const [userSeleccionado, setUserSeleccionado] = useState({
        id: '',
        Id_Usuario: '',
        Name: '',
        LastName: '',
        email: '',
        password: '',
        roleId: '',
    });

    const seleccionarUser = (elemento, caso) => {  //Funcion para editar o eliminar el usuario seleccionado 
        setUserSeleccionado(elemento);

        (caso === 'Editar') ? setModalEditar(true) : setModalEliminar(true);
    };

    const abrirModalInsertar = () => { //Funcion para limpiar los valores y abrir el modal insertar
        setUser({
            Name: '', LastName: '',
            email: '', roleId: '', password: ''
        })

        console.log(UserToken)
        setModalInsertar(true)
    }

    // Tabla menu

    const columns = [
        {
            field: "Name",
            headerName: "Usuario",
            flex: 1,
            width: 400,
            headerClassName: 'header',
            renderCell: (params) => {
                return (
                    <div
                        style={{
                            fontWeight: 600,
                            // color: "blue",
                            // width: "100%",
                            // textAlign: "center"
                        }}
                    >
                        {params.row.Name}
                    </div>
                )
            }
        },
        {
            field: "LastName",
            headerName: "Apellido",
            flex: 1,
            width: 150,
            valueGetter: (params) => {
                return params.row.LastName;
            },
        },
        {
            field: "email",
            headerName: "Email",
            width: 210,
            flex: 1,
            valueGetter: (params) => {
                return params.row.email
            },
        },
        {
            field: "actions",
            headerName: "Acciones",
            width: 210,
            sortable: false,
            disableColumnMenu: true,
            renderCell: (params) => (
                <div className="d-flex justify-content-between">
                    <div
                        onClick={() => seleccionarUser(params.row, 'Editar')}
                        component="span"
                    >
                        <IconButton color="primary" aria-label="edit" component="span">
                            <Visibility />
                        </IconButton>
                    </div>

                    <div color="secondary" aria-label="delete"
                        onClick={() => seleccionarUser(params.row, 'Eliminar')}
                        component="span"
                    >
                        <IconButton color="secondary" aria-label="delete">
                            <Delete />
                        </IconButton>
                    </div>
                </div>
            ),
        },
        /* {
          field: "a",
          headerName: "Actions",
          width: 100,
          sortable: false,
          align: "center",
          disableColumnMenu: true,
          renderCell: (params) => (
            <div onClick={(e) => deleteGts(e, params.id)}>
              <Tooltip title="Delete">
                <IconButton>
                  <Delete />
                </IconButton>
              </Tooltip>
            </div>
          ),
        }, */
    ];

    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value === "")
                    return items;
                else
                    return items.filter(x => x.Name.toLowerCase().includes(target.value.toLowerCase()) ||
                        x.LastName.toLowerCase().includes(target.value.toLowerCase()) ||
                        x.email.toLowerCase().includes(target.value.toLowerCase())
                    )
            }
        })
    }

    return (
        <ThemeProvider>

            <Head />

            <Paper style={style.paper}>
                {/* elevation={10} */}
                {/* <img src={Gead} /> */}
                <Grid>
                    <div className='row'>
                        <div className='col-3'>
                            <img src={Gead} style={style.logo} alt="" />
                        </div>
                        <div className='col-9'>

                            <Typography style={style.h4}> &nbsp; &nbsp; &nbsp;Registro de usuarios</Typography>
                        </div>
                    </div>
                </Grid>

                {/* // ------------------ Serch Input  ------------------------------- */}
                <div className='row'>
                    <div className='col-8'>
                        <Controls.txt
                            label="Search User"
                            id="outlined-basic"
                            className={style.searchInput}
                            InputProps={{
                                startAdornment: (<InputAdornment position="start">
                                    <Search />
                                </InputAdornment>)
                            }}
                            onChange={handleSearch}
                        />
                    </div>
                    {/* -----------------       Boton Nuevo Usuario     ------------------ */}
                    <div className='col-4'>
                        <Button type='submit' color="primary" variant='contained' fullWidth style={style.btn}
                            onClick={() => { abrirModalInsertar() }}
                        > NUEVO USUARIO </Button>
                    </div>
                </div>
                {/* ------------------  Tabla   -------------------- */}
                <div>
                    <div style={{ height: 600, width: "100%", backgroundColor: "white", paddingTop: "1rem" }}>
                        <DataGrid
                            // sx={{ m: 2 }}
                            rows={filterFn.fn(allUser)}
                            // style={{ color:"blue"}}
                            columns={columns}
                            pageSize={9}
                            rowsPerPageOptions={[8]}
                        />
                    </div>
                </div>
            </Paper>
            {/* </Grid> */}

            <ModalInsertar
                modalInsertar={modalInsertar}
                setModalInsertar={setModalInsertar}
                user={user}
                setUser={setUser}
                allUser={allUser}
                setAllUser={setAllUser}
            />

            <ModalEditar
                modalEditar={modalEditar}
                setModalEditar={setModalEditar}
                userSeleccionado={userSeleccionado}
                setUserSeleccionado={setUserSeleccionado}
                allUser={allUser}
            />

            <CssBaseline />
        </ThemeProvider>
    )
}

Registro.propTypes = {
    valor: PropTypes.string

}
export default Registro
