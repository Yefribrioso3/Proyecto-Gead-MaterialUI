import React, { useState } from 'react'
import Axios from "axios";
import { useForm } from 'react-hook-form';
import { globalApi } from '../../../types/api.types';
import { ModalHeader, ModalBody, ModalFooter, FormGroup } from 'reactstrap';
import { Button, createTheme, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { Modal } from '@mui/material';
import Box from '@mui/material/Box';
// Modal,

export const ModalEditar = ({ modalEditar, setModalEditar, userSeleccionado, setUserSeleccionado, allUser }) => {

  const { handleSubmit } = useForm();

  const handleChange = (e) => {   //  ---- Capturar valores
    console.log(e.target.value)

    const { name, value } = e.target;

    setUserSeleccionado((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }

  const style = createTheme({
    validationPassword: {
      padding: 20,
      height: '60px',
      width: '190px',
      margin: '2rem auto',
      borderRadius: '24px'
    },
    h4: {
      // fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: '34px',
      lineHeight: '140%',
      letterSpacing: '0.0025em',
      color: '#14149A',
      // marginTop: "0.5rem",
      marginBottom: '0.5rem',
    },
    txt: {
      fontFamily: 'Work Sans',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: 14,
      lineHeight: '140%',
      /* or 18px */
      letterSpacing: '-0.02em',
      marginBottom: '2rem',
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
    }
  })

  const onSubmit = (e) => {   // -------- Peticion al Api para actualizar usuario
    let Users = allUser;

    Axios.put(`${globalApi}/user/${userSeleccionado.Id_Usuario}`, {
      Name: userSeleccionado.Name,
      LastName: userSeleccionado.LastName,
      email: userSeleccionado.email,
      roleId: userSeleccionado.roleId
    })
      .then((x) => {
        console.log(x);
        alert("Successful Updated");
      })
      .catch((x) => {
        console.log(x?.response);
      })

    Users.map(equipo => {
      if (equipo.Id_Usuario === userSeleccionado.Id_Usuario) {
        equipo.Name = userSeleccionado.Name
        equipo.LastName = userSeleccionado.LastName
        equipo.email = userSeleccionado.email;
        equipo.roleId = userSeleccionado.roleId
      }
    });

    setModalEditar(false)
  }

  const styl = {    //    ----    Estilos del modal MUI -------
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    borderRadius: '25px',
    boxShadow: 24,
    p: 2,
  };

  const handleClose = () => setModalEditar(false);  //  ---------   Cerrar el Modal   ------------

  // < Modal isOpen={modalEditar} style={{ maxWidth: 500, paddingTop: '9rem' }}>
  return (
    <div>

      <Modal open={modalEditar} onClose={handleClose}>
        <Box sx={styl}>

          <ModalHeader>
            <div>
              <h1>Editar usuario</h1>
            </div>
          </ModalHeader>
          <form onSubmit={handleSubmit(onSubmit)}>

            <ModalBody className="row animate__animated animate__fadeIn">
              <FormGroup className="col-6">
                <TextField
                  name='Name'
                  placeholder='Nombre'
                  value={userSeleccionado && userSeleccionado.Name}
                  onChange={handleChange}
                  required
                  label="Nombre"
                  variant="outlined"
                  fullWidth
                />
              </FormGroup>

              <FormGroup className="col-6">
                <TextField label="Apellido"
                  name='LastName'
                  placeholder='Apellido'
                  variant="outlined"
                  value={userSeleccionado && userSeleccionado.LastName}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </FormGroup>

              <FormGroup className="col-6">
                <TextField label="Correo"
                  name='email'
                  placeholder='Correo'
                  variant="outlined"
                  value={userSeleccionado && userSeleccionado.email}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </FormGroup>

              <FormGroup className="col-6">
                <FormControl fullWidth>

                  <InputLabel id="demo-simple-select-label">Role</InputLabel>
                  <Select
                    name='roleId'
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={userSeleccionado && userSeleccionado.roleId}
                    label="Role"
                    variant="outlined"
                    required
                    onChange={handleChange}
                  >
                    <MenuItem value={1}>ADMIN</MenuItem>
                    <MenuItem value={2}>SUPERVISOR</MenuItem>
                    <MenuItem value={3}>PLANTA</MenuItem>
                  </Select>

                </FormControl>
              </FormGroup>

              {/* <FormGroup>
              <TextField label="Contraseña"
                name='password'
                placeholder='password'
                variant="outlined"
                value={userSeleccionado && userSeleccionado.password}
                onChange={handleChange}
                fullWidth
                required
              />
            </FormGroup> */}

            </ModalBody>

            {/* ----------------  Botones de Aceptar - Cancelar   ----------------------- */}
            <ModalFooter>
              <Button
                type='submit'
                color='primary'
                variant='contained'
                style={style.btn}
              >Aceptar</Button>
              {/* onClick={() => editar()} */}
              <Button
                color='secondary'
                variant='contained'
                onClick={() => {
                  setModalEditar(false)
                }}
              >Cancelar
              </Button>
            </ModalFooter>

          </form>
        </Box>

      </Modal>
    </div>
  )
}
