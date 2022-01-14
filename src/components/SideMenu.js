import React, { useEffect, useState } from 'react'
import { withStyles } from "@material-ui/core";
import '../styles/styles.scss'
import Controls from './controls/Controls';
import Axios from 'axios';


import manual from "../assets/Manual.pdf";
import { ArrowDownward, FontDownload, FontDownloadTwoTone } from '@material-ui/icons';


const style = {
    sideMenu: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        left: '0px',
        width: '250px',
        height: '100%',
        backgroundColor: '#253053'
    }
};

const SideMenu = ({ getAllList, classes, filtrarBUList, setListAll, listAll }) => {

    const [mexCounter, setMexCounter] = useState(0);
    const [pecCounter, setPecCounter] = useState(0);
    const [cacCounter, setCacCounter] = useState(0);
    const [colCounter, setColCounter] = useState(0);
    const [contador, setCont] = useState(0);


    const AllEquipment = getAllList

    useEffect(() => {

        allAquipmentRelation();
        counter();

    }, [getAllList]);

    const counter = () => {
        let ColCounter = 0;
        let CacCounter = 0;
        let PecCounter = 0;
        let MexCounter = 0;
        let Counter = 0;

        getAllList.map((E) => {
            if (E.Procedencia.areas.operations.countries.bu.Name === 'COL') {
                setColCounter(++ColCounter)
            }
        })

        getAllList.map((E) => {
            if (E.Procedencia.areas.operations.countries.bu.Name === 'CAC') {
                setCacCounter(++CacCounter)
            }
        })

        getAllList.map((E) => {
            if (E.Procedencia.areas.operations.countries.bu.Name === 'PEC') {
                setPecCounter(++PecCounter)
            }
        })

        getAllList.map((E) => {
            if (E.Procedencia.areas.operations.countries.bu.Name === 'MEX') {
                setMexCounter(++MexCounter)
            }
        })

        // AllEquipment.map((E) => {
        //     if (E.Procedencia.areas.operations.countries.bu.Id_BU) {
        //         setContador(++Counter)
        //     }
        // })
    };

    const [List, setList] = useState([]);
    const [contar, setContar] = useState(0);

    const allAquipmentRelation = async () => {

        await Axios.get('https://node-gead.herokuapp.com/api/AllequipmentRelation')
            .then((response) => {
                setListAll(response.data.equipment)
            })
        setCont(listAll.length)

        // let counter = 1
        // for (let i = 0; i <= 1; i++) {
            // setContar(++counter)

        //  }

    }


    // const { classes } = props;

    return (
        <div className={`container ${classes.sideMenu}`}>
            <div className={'p-2 mt-5'}>
                <div>
                    <Controls.Button
                        variant="outlined"
                        size={"large"}
                        color={"secondary"}
                        className={` text-white py-2 mt-5 mx-4 px-5 w-75 navbarText`}
                        // startIcon={<Add style={{ fontSize: 34, fontWeight: '800' }} />}
                        // onClick={() => filtrado("MEX")}
                        // onChange={(e) => filtrado( e,"MEX" )}
                        onClick={(e) => filtrarBUList("total", 'total', setListAll)}

                        style={{ fontSize: 20, fontWeight: '600' }}
                        text={`Middle Americas: ${contador}`}
                    // Add New
                    >
                    </Controls.Button>
                </div>

                <Controls.Button
                    variant="outlined"
                    size={"large"}
                    color={"secondary"}
                    className={` text-white py-2 mt-5 mx-4 px-5 w-75 navbarText`}
                    // startIcon={<Add style={{ fontSize: 34, fontWeight: '800' }} />}
                    // onClick={() => filtrado("MEX")}
                    // onChange={(e) => filtrado( e,"MEX" )}
                    onClick={(e) => filtrarBUList("MEX")}

                    style={{ fontSize: 20, fontWeight: '600' }}
                    text={`MEX: ${mexCounter}`}
                // Add New
                >
                </Controls.Button>


                <Controls.Button
                    variant="outlined"
                    size={"large"}
                    color={"secondary"}
                    className={` text-white py- mt-5 mx-4 px-5 w-75 navbarText`}
                    // ${classes.btnAddNew}
                    // d-inline-block
                    // startIcon={<Add style={{ fontSize: 34, fontWeight: '800' }} />}
                    // onClick={() => filtrado("CAC")}
                    onClick={(e) => filtrarBUList("CAC")}
                    style={{ fontSize: 20, fontWeight: '600' }}
                    text={`CAC: ${cacCounter}`}
                // Add New
                >
                </Controls.Button>
                {/* <h4 className={` text-white px-4  w-100 d-inline-block navbarText`}>{mex}</h4> */}

                <Controls.Button
                    variant="outlined"
                    size={"large"}
                    color={"secondary"}
                    className={` text-white py-2 mt-5 mx-4 px-5 w-75`}
                    // startIcon={<Add style={{ fontSize: 34, fontWeight: '800' }} />}
                    onClick={(e) => filtrarBUList("PEC")}
                    style={{ fontSize: 20, fontWeight: '600' }}
                    text={`PEC: ${pecCounter}`}
                // Add New
                >
                </Controls.Button>

                <Controls.Button
                    variant="outlined"
                    size={"large"}
                    color={"secondary"}
                    className={` text-white py-2 mt-5 mx-4 px-5 w-75`}
                    // startIcon={<Add style={{ fontSize: 34, fontWeight: '800' }} />}
                    // onClick={() => filtrado("COL")}
                    onClick={(e) => filtrarBUList("COL")}
                    style={{ fontSize: 20, fontWeight: '600' }}
                    text={`COL: ${colCounter}`}
                // Add New
                >
                </Controls.Button>

                <Controls.Button
                    variant="outlined"
                    size={"large"}
                    color={"secondary"}
                    className={` text-white py-2 mt-5 mx-4 px-5 w-75`}
                    // startIcon={<Add style={{ fontSize: 34, fontWeight: '800' }} />}
                    // onClick={() => filtrado("COL")}
                    // onClick={(e) => filtrarBUList("COL")}
                    style={{ fontSize: 20, fontWeight: '600' }}
                    text={`Power BI`}
                // Add New
                >
                </Controls.Button>

            </div>


        </div>
    )
}

export default withStyles(style)(SideMenu);
