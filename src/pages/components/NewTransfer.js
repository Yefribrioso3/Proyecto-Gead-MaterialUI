import React from 'react'
import Gead from '../../assets/Gead.jpeg'
import { Button, createTheme, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@material-ui/core'
import { Autocomplete } from '@mui/material'
// import { Search } from '@material-ui/icons'
// import Controls from '../../components/controls/Controls'

export default function NewTransfer({ setmostrarMenus }) {

    const style = createTheme({
        paper: {
            padding: 40,
            height: '30rem',
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
        stylePass: {
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
            fontSize: 12,
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
        <>

            <Paper style={style.paper}>
                <Grid>
                    <div className='row'>
                        <div className='col-3'>
                            <img src={Gead} style={style.logo} alt="" />
                        </div>
                        <div className='col-9'>

                            <Typography style={style.h4}> &nbsp;Nueva transferencia entre plantas</Typography>
                        </div>
                    </div>
                </Grid>

                {/* // ------------------ Serch Input  ------------------------------- */}
                {/* <div className='row'>
                <div className='col-8'>
                    <Controls.txt
                        label="Search Equipment"
                        id="outlined-basic"
                        className={style.searchInput}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search />
                            </InputAdornment>)
                        }}
                    // onChange={handleSearch}
                    />
                </div>

                <div className='col-4'>
                    <Button type='submit' color="primary" variant='contained' fullWidth style={style.btn}
                    // onClick={() => { setmostrarMenus(false) }}
                    > Aceptar </Button>
                </div>
            </div> */}

                <div className='row mt-4'>
                    <div className='col-4'>
                        <div>
                            <TextField
                                name='plantaOrigen'
                                placeholder='Planta origen'
                                required
                                label="Planta origen"
                                variant="outlined"
                                fullWidth
                            //   value={userSeleccionado && userSeleccionado.Name}
                            //   onChange={handleChange}
                            />
                        </div>

                        <div className='pt-3'>
                            <Autocomplete
                                disablePortal
                                required
                                
                                id="combo-box-demo"
                                options={planta}
                                sx={{ width: 330 }}
                                renderInput={(params) => <TextField {...params} label="Planta destino" variant="outlined" />}
                            />

                            {/* <FormControl fullWidth>

                                <InputLabel id="demo-simple-select-label">Planta destino *</InputLabel>
                                <Select
                                    name='plantaDestino'
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Planta destino"
                                    variant="outlined"
                                    sx={{ width: 300 }}
                                    required
                                // value={userSeleccionado && userSeleccionado.roleId}
                                // onChange={handleChange}
                                >
                                    <MenuItem value={1}>APAN</MenuItem>
                                    <MenuItem value={2}>BARBADOS</MenuItem>
                                    <MenuItem value={3}>BARRANQUILLA</MenuItem>
                                    <MenuItem value={3}>BUCARAMANGA</MenuItem>
                                    <MenuItem value={3}>FABRICA DE TAPAS DE TOCANCIPA</MenuItem>
                                    <MenuItem value={3}>ETIQUETAS IMPRESUR & INDUGRAL</MenuItem>
                                    <MenuItem value={3}>MEDELLIN</MenuItem>
                                    <MenuItem value={3}>MALTERIA TIBITO</MenuItem>
                                    <MenuItem value={3}>TONCACIPA</MenuItem>
                                    <MenuItem value={3}>MALTERIA TROPICAL</MenuItem>
                                    <MenuItem value={3}>VALLE</MenuItem>
                                    <MenuItem value={3}>HOLGUIN</MenuItem>
                                    <MenuItem value={3}>DOMINICANA</MenuItem>
                                    <MenuItem value={3}>HATO NUEVO</MenuItem>
                                    <MenuItem value={3}>GUAYAQUIL</MenuItem>
                                    <MenuItem value={3}>QUITO</MenuItem>
                                    <MenuItem value={3}>MALTERIA DE GUAYAQUIL</MenuItem>
                                    <MenuItem value={3}>LA CONSTANCIA BEER</MenuItem>
                                    <MenuItem value={3}>EL SALVADOR CSD</MenuItem>
                                    <MenuItem value={3}>LA CONSTANCIA WALTER</MenuItem>
                                    <MenuItem value={3}>SAN PEDRO SULA BEER</MenuItem>
                                    <MenuItem value={3}>SAN PEDRO SULA CSD</MenuItem>
                                    <MenuItem value={3}>CEBADAS Y MALTAS</MenuItem>
                                    <MenuItem value={3}>GUADALAJARA</MenuItem>
                                    <MenuItem value={3}>MALTERIA ZACATECAS</MenuItem>
                                    <MenuItem value={3}>MAZATLÁN</MenuItem>
                                    <MenuItem value={3}>MODELO MÉXICO</MenuItem>
                                    <MenuItem value={3}>SALAMANCA (CASAL)</MenuItem>
                                    <MenuItem value={3}>TORREÓN</MenuItem>
                                    <MenuItem value={3}>TUXTEPEC</MenuItem>
                                    <MenuItem value={3}>YUCATAN</MenuItem>
                                    <MenuItem value={3}>ZACATECAS</MenuItem>
                                    <MenuItem value={3}>CUCAPÁ (CRAFT)</MenuItem>
                                    <MenuItem value={3}>PASADENA</MenuItem>
                                    <MenuItem value={3}>AREQUIPA</MenuItem>
                                    <MenuItem value={3}>ATE</MenuItem>
                                    <MenuItem value={3}>CUSCO</MenuItem>
                                    <MenuItem value={3}>HUACHIPA</MenuItem>
                                    <MenuItem value={3}>MALTERIA DE LIMA</MenuItem>
                                    <MenuItem value={3}>MOTUPE</MenuItem>
                                    <MenuItem value={3}>SAN JUAN (PUCALLPA)</MenuItem>
                                    <MenuItem value={3}>SAN MATEO (HUAROCHIRI)</MenuItem>
                                    <MenuItem value={3}>BARBARIAN (CRAFT)</MenuItem>
                                    <MenuItem value={3}>SAINT VINCENT</MenuItem>
                                    <MenuItem value={3}>BOGOTÁ BREWERY COMPANY (CRAFT)</MenuItem>
                                </Select>
                            </FormControl> */}

                        </div>

                        <div className='pt-3'>
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
                <div className='d-flex flex-row-reverse'>   
                    <div className='p-2'>
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
                            onClick={() => { setmostrarMenus(true) }}
                        > Cancelar </Button>
                    </div>

                    <div className='p-2'>
                        <Button type='submit' color="primary" variant='contained' style={style.btn}
                        // onClick={() => { setmostrarMenus(false) }}
                        > Aceptar </Button>
                    </div>
                </div>

            </Paper>
        </>
    )
}
