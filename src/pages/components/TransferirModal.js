import { Button, createTheme, Grid, TextField, Typography } from '@material-ui/core'
import { Autocomplete } from '@mui/material'
import React from 'react'
import { FormGroup, ModalBody } from 'reactstrap'

export const TransferirModal = ({ equipoSeleccionado, operations, tranferirModal, settranferirModal }) => {

    const style = createTheme({
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
        btn: {
            margin: '8px 0',
            background: '',
            borderRadius: '8px',
            fontFamily: 'Noto Sans',
            fontSize: 14,
            lineHeight: '200%',
            letterSpacing: '0.0125em',
        }
    })

    const planta = [
        { label: "APAN" },
        { label: "BARBADOS" },
        { label: "BARRANQUILLA" },
        { label: "BUCARAMANGA" },
        { label: "FABRICA DE TAPAS DE TOCANCIPA" },
        { label: "ETIQUETAS IMPRESUR & INDUGRAL" },
        { label: "MEDELLIN" },
        { label: "MALTERIA TIBITO" },
        { label: "TONCACIPA" },
        { label: "MALTERIA TROPICAL" },
        { label: "VALLE" },
        { label: "HOLGUIN" },
        { label: "DOMINICANA" },
        { label: "HATO NUEVO" },
        { label: "GUAYAQUIL" },
        { label: "QUITO" },
        { label: "MALTERIA DE GUAYAQUIL" },
        { label: "LA CONSTANCIA BEER" },
        { label: "EL SALVADOR CSD" },
        { label: "LA CONSTANCIA WALTER" },
        { label: "SAN PEDRO SULA BEER" },
        { label: "SAN PEDRO SULA CSD" },
        { label: "CEBADAS Y MALTAS" },
        { label: "GUADALAJARA" },
        { label: "MALTERIA ZACATECAS" },
        { label: "MAZATLÁN" },
        { label: "MODELO MÉXICO" },
        { label: "SALAMANCA (CASAL)" },
        { label: "TORREÓN" },
        { label: "TUXTEPEC" },
        { label: "YUCATAN" },
        { label: "ZACATECAS" },
        { label: "CUCAPÁ (CRAFT)" },
        { label: "PASADENA" },
        { label: "AREQUIPA" },
        { label: "ATE" },
        { label: "CUSCO" },
        { label: "HUACHIPA" },
        { label: "MALTERIA DE LIMA" },
        { label: "MOTUPE" },
        { label: "SAN JUAN (PUCALLPA)" },
        { label: "SAN MATEO (HUAROCHIRI)" },
        { label: "BARBARIAN (CRAFT)" },
        { label: "SAINT VINCENT" },
        { label: "BOGOTÁ BREWERY COMPANY (CRAFT)" }
    ];

    return (
        <div>
            <ModalBody className="row text-align-center  animate__animated animate__fadeIn" >
                {/* <FormGroup>
                    Prueba Modal t
                </FormGroup> */}
            </ModalBody>


            <Grid>
                <div className='row'>
                    {/* <div className='col-3'>
                            <img src={Gead} style={style.logo} alt="" />
                        </div> */}

                    <div className='col-9'>
                        <Typography style={style.h4}> &nbsp;Nueva transferencia entre plantas</Typography>
                    </div>
                </div>
            </Grid>

            <div className='row mt-4'>
                <div className='col-4'>
                    <div>
                        {/* mr-auto */}
                        <TextField
                            name='Name'
                            required
                            label="Equipo"
                            variant="outlined"
                            fullWidth
                            value={equipoSeleccionado && equipoSeleccionado.Name}
                            InputProps={{
                                readOnly: true,
                            }}
                            // placeholder='Equipo'
                            // onChange={handleChange}
                        />
                    </div>

                    <div className='pt-3'>
                        <TextField
                            id="filled-disabled"
                            name='plantaOrigen'
                            required
                            label="Planta origen"
                            variant="outlined"
                            fullWidth
                            value={operations && operations.Name.toUpperCase()}
                            InputProps={{
                                readOnly: true,
                            }}
                            // placeholder='Planta origen'
                            // disabled
                            // onChange={handleChange}
                        />
                    </div>

                    <div className='pt-3'>
                        <Autocomplete
                            disablePortal
                            required
                            id="combo-box-demo"
                            options={planta}
                            sx={{ width: 240 }}
                            renderInput={(params) => <TextField {...params} label="Planta destino *" variant="outlined" />}
                        />
                    </div>
                </div>

                <div className='col-8'>
                    <TextField
                        label="Comentarios"
                        multiline
                        rows={9}
                        maxRows={9}
                        variant="outlined"
                        fullWidth
                    // id="outlined-multiline-static"
                    />
                </div>
            </div>

            {/* // ---------------------- BOTONES  ---------------------- */}
            <div className='row'>
                <div className='col-4 pt-2'>
                    <TextField
                        name='fecha'
                        placeholder='Fecha'
                        required
                        label="Fecha"
                        variant="outlined"
                        fullWidth
                    //   value={userSeleccionado && userSeleccionado.Name}
                    //   onChange={handleChange}
                    />
                </div>

                <div className='col-8 p-2 d-flex justify-content-center'>
                    <Button 
                        type='submit' 
                        color="primary"
                        variant='contained'
                        style={style.btn}
                        onClick={() => { settranferirModal(!tranferirModal) }}
                    > Transferir </Button>
                </div>

                {/* <div className='p-2'>
                    <Button
                        color="secondary"
                        variant='contained'
                        style={{
                            margin: '8px 0',
                            borderRadius: '8px',
                            fontFamily: 'Noto Sans',
                            fontSize: 12,
                            lineHeight: '200%',
                            letterSpacing: '0.0125em'
                        }}
                    // onClick={() => { setmostrarMenus(true) }}
                    > Cancelar </Button>
                </div> */}
            </div>
        </div>
    )
}
