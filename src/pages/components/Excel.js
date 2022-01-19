import { Button } from "@material-ui/core";
import Axios from "axios";
import React, { useEffect, useState } from 'react'
import { ModalBody, ModalFooter } from "reactstrap";
import { v4 as uuidv4 } from 'uuid';


export const Excel = ({ item, setItem, setModalInsertarExcel, setGetAllList, getAllList, setListAll, actualizarTabla, setpruebaExcel }) => {



    // ---- Variables

    const [equipoSeleccionado, setEquipoSeleccionado] = useState({
        Id_Equipment: null, Name: '', code: '', img: '', Id_Procedencia: null, Estado: '', createdAt: '', updatedAt: '',
        Procedencia: {
            Id_Procedencia: null, Id_Line: null, Id_Areas: null,
            areas: {
                Id_Areas: null, Name: '', Id_Operations: null, operations: {
                    Id_Operations: null, Name: '', Id_Countries: null,
                    countries: { Id_Countries: null, Name: '', Id_BU: null, bu: { Id_BU: null, Name: '' } }
                },
                SubArea: { Id_SubAreas: null, Name: '', Id_Areas: null }
            },
            line: { Id_Line: null, number: '', Id_LineTypes: null, lineTypes: { Id_LineTypes: null, Name: '' } }
        },
        ServicesInformation: {
            Id_ServicesInformation: null, DateOfInstallation: '',
            DateOfDesintallation: '', DesuseReason: '', DesinstallationReason: '', ProcurementOrder: '', Id_Equipment: null,
            newServicesInformation: [{
                Id_NewServInfo: null, Id_ServicesInformation: null, Name: '', Value: '',
                SelectNewServicesInfo: { Id_SelectNewServInfo: null, Id_ServicesInformation: null, Id_NewServInfo: null }
            }]
        },
        TechnicalSpecification: {
            Id_TechnicalSpecification: null, EquipmentType: '', CurrentConditions: '', Weight: "", OEM: "", Description: "",
            ModelNumber: "", SerialNumber: "", vendor: "", currentWorking: '', Id_Equipment: null,
            newTechnicalSpecification: [{
                Id_NewTechSpec: '', Id_TechnicalSpecification: '', Name: "", Value: "",
                SelectNewTechSpec: { Id_SelectNewTechSpec: '', Id_TechnicalSpecification: '', Id_NewTechSpec: '' }
            }]
        }
    })

    const [servicesInformation, setServicesInformation] = useState({
        Id_ServicesInformation: '', DateOfInstallation: '', DateOfDesintallation: '', DesuseReason: '', DesinstallationReason: '', ProcurementOrder: '', Id_Equipment: '',
        newServicesInformation: [{
            Id_NewServInfo: '', Id_ServicesInformation: '', Name: '', Value: '',
            SelectNewServicesInfo: { Id_SelectNewServInfo: '', Id_ServicesInformation: '', Id_NewServInfo: '' }
        }]
    });

    const [technicalInformation, setTechnicalInformation] = useState({  //Para guardar informacion tecnica seleccionada a editar
        Id_TechnicalSpecification: '', EquipmentType: '', CurrentConditions: '', Weight: "", OEM: "", Description: "", ModelNumber: "",
        SerialNumber: "", vendor: "", currentWorking: '', Id_Equipment: '', newTechnicalSpecification: [
            {
                Id_NewTechSpec: '', Id_TechnicalSpecification: '', Name: "", Value: "",
                SelectNewTechSpec: { Id_SelectNewTechSpec: '', Id_TechnicalSpecification: '', Id_NewTechSpec: '' }
            }]
    });

    const [areas, setareas] = useState({
        Id_Areas: '', Name: '', Id_Operations: '',
        operations: {
            Id_Operations: null, Name: '', Id_Countries: null,
            countries: { Id_Countries: null, Name: '', Id_BU: null, bu: { Id_BU: null, Name: '' } }
        }
    })

    const [operations, setOperations] = useState({
        Id_Operations: '', Name: '', Id_Countries: '',
        countries: { Id_Countries: null, Name: '', Id_BU: null, bu: { Id_BU: null, Name: '' } }
    })

    const [countries, setCountries] = useState({ Id_Countries: '', Name: '', Id_BU: '', bu: { Id_BU: null, Name: '' } })

    const [bu, setBu] = useState({ Id_BU: '', Name: '' })

    const [SubArea, setSubArea] = useState({ Id_SubAreas: '', Name: '', Id_Areas: '' })

    const [line, setLine] = useState({ Id_Line: '', number: '', Id_LineTypes: '', })

    const [lineTypes, setLineTypes] = useState({ Id_LineTypes: '', Name: '' })

    const [newTechicInformation, setnewTechicInformation] = useState({
        Id_NewTechSpec: null,
        Id_TechnicalSpecification: null,
        Name: '',
        Value: '',
        SelectNewTechSpec: {
            Id_SelectNewTechSpec: uuidv4(),
            Id_TechnicalSpecification: '',
            Id_NewTechSpec: ''
        }
    })

    const [newservInformation, setnewservInformation] = useState({
        Id_NewServInfo: null,
        Id_ServicesInformation: null,
        Name: '',
        Value: '',
        SelectNewServicesInfo: {
            Id_SelectNewServInfo: '',
            Id_ServicesInformation: '',
            Id_NewServInfo: ''
        }
    })



    const [Datos, setDatos] = useState([])



    const send = async (item) => {

        const Excel = item.map((equipo) => {
            return (
                equipo = {
                    Id_Equipment: uuidv4(),
                    Name: equipo.Equipment_Name === undefined ? "" : equipo.Equipment_Name,
                    code: '',
                    img: '',
                    Id_Procedencia: "",
                    Estado: true,
                    createdAt: '',
                    updatedAt: '',
                    Procedencia: {
                        Id_Procedencia: uuidv4(), Id_Line: "", Id_Areas: "",
                        areas: {
                            Id_Areas: uuidv4(),
                            Name: equipo.Area === undefined ? "" : equipo.Area,
                            Id_Operations: null,
                            operations: {
                                Id_Operations: uuidv4(),
                                Name: equipo.Plant === undefined ? "" : equipo.Plant,
                                Id_Countries: null,
                                countries: {
                                    Id_Countries: uuidv4(),
                                    Name: equipo.Country === undefined ? "" : equipo.Country,
                                    Id_BU: null,
                                    bu: {
                                        Id_BU: uuidv4(),
                                        Name: equipo.BU === undefined ? "" : equipo.BU
                                    }
                                }
                            },
                            SubArea: {
                                Id_SubAreas: uuidv4(),
                                Name: equipo.Subarea === undefined ? "" : equipo.Subarea,
                                Id_Areas: null
                            }
                        },
                        line: {
                            Id_Line: uuidv4(),
                            number: equipo.Line_Number === undefined ? "" : equipo.Line_Number,
                            Id_LineTypes: null,
                            lineTypes: {
                                Id_LineTypes: uuidv4(),
                                Name: equipo.Line_Type === undefined ? "" : equipo.Line_Type
                            }
                        }
                    },
                    ServicesInformation: {
                        Id_ServicesInformation: uuidv4(),
                        DateOfInstallation: equipo.Date_of_Installation === undefined ? "" : equipo.Date_of_Installation,
                        DateOfDesintallation: equipo.Date_of_Desintallation === undefined ? "" : equipo.Date_of_Desintallation,
                        DesuseReason: equipo.Desuse_reason === undefined ? "" : equipo.Desuse_reason,
                        DesinstallationReason: equipo.Desinstallation_reason === undefined ? "" : equipo.Desinstallation_reason,
                        ProcurementOrder: '',
                        Id_Equipment: null,
                        newServicesInformation: []
                    },
                    TechnicalSpecification: {
                        Id_TechnicalSpecification: uuidv4(),
                        EquipmentType: equipo.Equipment_Type === undefined ? "" : equipo.Equipment_Type,
                        CurrentConditions: equipo.Equipment_Current_Conditions === undefined ? "" : equipo.Equipment_Current_Conditions,
                        Weight: equipo.Weight === undefined ? "" : equipo.Weight,
                        OEM: equipo.OEM === undefined ? "" : equipo.OEM,
                        Description: equipo.Equipment_description === undefined ? "" : equipo.Equipment_description,
                        ModelNumber: equipo.Model_Number === undefined ? "" : equipo.Model_Number,
                        SerialNumber: equipo.Serial_Number === undefined ? "" : equipo.Serial_Number,
                        vendor: equipo.Vendor_Integrator_name === undefined ? "" : equipo.Vendor_Integrator_name,
                        currentWorking: equipo.Currently_working === undefined ? "" : equipo.Currently_working,
                        Id_Equipment: null,
                        newTechnicalSpecification: equipo.Notes_about_equipment === undefined ? ([]) : (
                            [{
                                Id_NewTechSpec: uuidv4(),
                                Id_TechnicalSpecification: '',
                                Name: "Notes_about_equipment",
                                Value: equipo.Notes_about_equipment,
                                SelectNewTechSpec: {
                                    Id_SelectNewTechSpec: uuidv4(),
                                    Id_TechnicalSpecification: '',
                                    Id_NewTechSpec: ''
                                }
                            }]
                        )
                    }
                }
            )
        })

        let newTechSpec = []

        Excel.map(equipo => {
            equipo.Id_Procedencia = equipo.Procedencia.Id_Procedencia
            equipo.Procedencia.Id_Line = equipo.Procedencia.line.Id_Line
            equipo.Procedencia.Id_Areas = equipo.Procedencia.areas.Id_Areas
            equipo.Procedencia.areas.Id_Operations = equipo.Procedencia.areas.operations.Id_Operations
            equipo.Procedencia.areas.operations.Id_Countries = equipo.Procedencia.areas.operations.countries.Id_Countries
            equipo.Procedencia.areas.operations.countries.Id_BU = equipo.Procedencia.areas.operations.countries.bu.Id_BU
            equipo.Procedencia.areas.SubArea.Id_Areas = equipo.Procedencia.areas.Id_Areas
            equipo.Procedencia.line.Id_LineTypes = equipo.Procedencia.line.lineTypes.Id_LineTypes
            equipo.ServicesInformation.Id_Equipment = equipo.Id_Equipment
            equipo.TechnicalSpecification.Id_Equipment = equipo.Id_Equipment

            newTechSpec = equipo.TechnicalSpecification.newTechnicalSpecification

            // if (newTechSpec.Id_NewTechSpec !== []) {
            //     newTechSpec.Id_TechnicalSpecification = equipo.TechnicalSpecification.Id_TechnicalSpecification
            //     equipo.TechnicalSpecification.newTechnicalSpecification = newTechSpec

            // }

            // !equipo.TechnicalSpecification.newTechnicalSpecification.Id_NewTechSpec ? (equipo.TechnicalSpecification.newTechnicalSpecification.Id_TechnicalSpecification = []) : ( equipo.TechnicalSpecification.newTechnicalSpecification.Id_TechnicalSpecification = equipo.TechnicalSpecification.Id_TechnicalSpecification )

            // equipo.TechnicalSpecification.newTechnicalSpecification.Id_NewTechSpec ? equipo.TechnicalSpecification.newTechnicalSpecification.SelectNewTechSpec.Id_NewTechSpec =  equipo.TechnicalSpecification.newTechnicalSpecification.Id_NewTechSpec : null


            // equipo.TechnicalSpecification.Id_TechnicalSpecification


            // equipo.TechnicalSpecification.newTechnicalSpecification.SelectNewTechSpec.Id_TechnicalSpecification =  equipo.TechnicalSpecification.Id_TechnicalSpecification

        });





        // console.log(Excel)

        // Excel.map(( async (equipo) => { 

        //     await insertar(equipo);   
        // console.log(equipo);
        // } ))

        const agregar = getAllList;

        console.log(Excel);

        setDatos(agregar);

        Excel.map((Equipo) => {
            agregar.push(Equipo);
        });

        setListAll(agregar)
        console.log(getAllList);

        // actualizarTabla(Excel)

        await insertar(Excel);

        setItem([]);
        setModalInsertarExcel(false);

    }



    const insertar = async (Excel) => {

        Excel.map((async (Equipment) => {

            await Axios.post("https://node-gead.herokuapp.com/api/createEquipos", Equipment)

        }))


        // await Axios.post("https://node-gead.herokuapp.com/api/bu", {
        //     Id_BU: equipo.Procedencia.areas.operations.countries.bu.Id_BU,
        //     Name: equipo.Procedencia.areas.operations.countries.bu.Name
        // })
        // // .then(() => {
        // //     alert("Successful insert");
        // // });

        // await Axios.post('https://node-gead.herokuapp.com/api/countries', {
        //     Id_Countries: equipo.Procedencia.areas.operations.countries.Id_Countries,
        //     Name: equipo.Procedencia.areas.operations.countries.Name,
        //     Id_BU: equipo.Procedencia.areas.operations.countries.bu.Id_BU,
        // })

        // await Axios.post('https://node-gead.herokuapp.com/api/planta', {
        //     Id_Operations: equipo.Procedencia.areas.operations.Id_Operations,
        //     Name: equipo.Procedencia.areas.operations.countries.Name,
        //     Id_Countries: equipo.Procedencia.areas.operations.countries.Id_Countries,
        // })

        // await Axios.post('https://node-gead.herokuapp.com/api/area', {
        //     Id_Areas: equipo.Procedencia.areas.Id_Areas,
        //     Name: equipo.Procedencia.areas.Name,
        //     Id_Operations: equipo.Procedencia.areas.operations.Id_Operations,
        // })

        // await Axios.post('https://node-gead.herokuapp.com/api/SubArea', {
        //     Id_SubAreas: equipo.Procedencia.areas.SubArea.Id_SubAreas,
        //     Name: equipo.Procedencia.areas.SubArea.Name,
        //     Id_Areas: equipo.Procedencia.areas.Id_Areas,
        // })

        // await Axios.post("https://node-gead.herokuapp.com/api/line", {
        //     Id_Line: equipo.Procedencia.line.Id_Line,
        //     number: equipo.Procedencia.line.number,
        //     Id_LineTypes: equipo.Procedencia.line.lineTypes.Id_LineTypes
        // });

        // await Axios.post("https://node-gead.herokuapp.com/api/lineType", {
        //     Id_LineTypes: equipo.Procedencia.line.lineTypes.Id_LineTypes,
        //     Name: equipo.Procedencia.line.lineTypes.Name
        // });

        // await Axios.post("https://node-gead.herokuapp.com/api/procedencia", {
        //     Id_Procedencia: equipo.Procedencia.Id_Procedencia,
        //     Id_Line: equipo.Procedencia.line.Id_Line,
        //     Id_Areas: equipo.Procedencia.areas.Id_Areas
        // });

        // await Axios.post("https://node-gead.herokuapp.com/api/equipment", {
        //     Id_Equipment: equipo.Id_Equipment,
        //     Name: equipo.Name,
        //     code: equipo.code,
        //     Id_Procedencia: equipo.Procedencia.Id_Procedencia,
        //     Estado: equipo.Estado,
        //     img: equipo.img
        // });

        // await Axios.post("https://node-gead.herokuapp.com/api/servicesInformation", {
        //     Id_ServicesInformation: equipo.ServicesInformation.Id_ServicesInformation,
        //     DateOfInstallation: equipo.ServicesInformation.DateOfInstallation,
        //     DateOfDesintallation: equipo.ServicesInformation.DateOfDesintallation,
        //     DesuseReason: equipo.ServicesInformation.DesuseReason,
        //     DesinstallationReason: equipo.ServicesInformation.DesinstallationReason,
        //     ProcurementOrder: equipo.ServicesInformation.ProcurementOrder,
        //     Id_Equipment: equipo.Id_Equipment
        // })

        // equipo.ServicesInformation.newServicesInformation.map(async (NSI) => {
        //     await Axios.post("https://node-gead.herokuapp.com/api/newServInfo", {
        //         Id_NewServInfo: NSI.Id_NewServInfo,
        //         Id_ServicesInformation: equipo.ServicesInformation.Id_ServicesInformation,
        //         Name: NSI.Name,
        //         Value: NSI.Value
        //     })

        //     await Axios.post("https://node-gead.herokuapp.com/api/selectNewServInfo", {
        //         Id_SelectNewServInfo: NSI.SelectNewServicesInfo.Id_SelectNewServInfo,
        //         Id_ServicesInformation: equipo.ServicesInformation.Id_ServicesInformation,
        //         Id_NewServInfo: NSI.Id_NewServInfo
        //     })
        // })


        // await Axios.post("https://node-gead.herokuapp.com/api/technicalSpecification", {
        //     Id_TechnicalSpecification: equipo.TechnicalSpecification.Id_TechnicalSpecification,
        //     EquipmentType: equipo.TechnicalSpecification.EquipmentType,
        //     CurrentConditions: equipo.TechnicalSpecification.CurrentConditions,
        //     Weight: equipo.TechnicalSpecification.Weight,
        //     OEM: equipo.TechnicalSpecification.OEM,
        //     Description: equipo.TechnicalSpecification.Description,
        //     ModelNumber: equipo.TechnicalSpecification.ModelNumber,
        //     SerialNumber: equipo.TechnicalSpecification.SerialNumber,
        //     vendor: equipo.TechnicalSpecification.vendor,
        //     currentWorking: equipo.TechnicalSpecification.currentWorking,
        //     Id_Equipment: equipo.Id_Equipment
        // })


        // equipo.TechnicalSpecification.newTechnicalSpecification.map(async (NTS) => {
        //     await Axios.post("https://node-gead.herokuapp.com/api/NewTechInfo", {
        //         Id_NewTechSpec: NTS.Id_NewTechSpec,
        //         Id_TechnicalSpecification: equipo.TechnicalSpecification.Id_TechnicalSpecification,
        //         Name: NTS.Name,
        //         Value: NTS.Value
        //     })

        //     await Axios.post("https://node-gead.herokuapp.com/api/selectNewTechSpec", {
        //         Id_SelectNewTechSpec: NTS.SelectNewTechSpec.Id_SelectNewTechSpec,
        //         Id_TechnicalSpecification: equipo.TechnicalSpecification.Id_TechnicalSpecification,
        //         Id_NewTechSpec: NTS.Id_NewTechSpec
        //     })
        // })






    }



    // console.log(equipo.Equipment_description === undefined ? "" : equipo.Equipment_description)


    //     valorInsertar.Id_Equipment = null;

    // valorInsertar.Id_Equipment = uuidv4();

    // bu.Id_BU = uuidv4();
    // bu.Name = equipo.BU;

    // countries.Id_Countries = uuidv4();
    // countries.Name = equipo.Country;
    // countries.Id_BU = bu.Id_BU;

    // operations.Id_Operations = uuidv4();
    // operations.Name = equipo.Plant;
    // operations.Id_Countries = countries.Id_Countries;

    // areas.Id_Areas = uuidv4();
    // areas.Name = equipo.Area === undefined ? "NaN" : equipo.Area;
    // areas.Id_Operations = operations.Id_Operations;

    // SubArea.Id_SubAreas = uuidv4();
    // SubArea.Name = equipo.Subarea === undefined ? "" : equipo.Area;
    // SubArea.Id_Areas = areas.Id_Areas;

    // lineTypes.Id_LineTypes = uuidv4();
    // lineTypes.Name = equipo.Line_Type === undefined ? "NaN" : equipo.Line_Type;

    // line.Id_Line = uuidv4();
    // line.number = equipo.Line_Number === undefined ? "" : equipo.Line_Number;
    // line.Id_LineTypes = lineTypes.Id_LineTypes;

    // technicalInformation.Id_TechnicalSpecification = uuidv4();
    // technicalInformation.EquipmentType = equipo.Equipment_Type === undefined ? "" : equipo.Equipment_Type;
    // technicalInformation.CurrentConditions = equipo.Equipment_Current_Conditions === undefined ? "" : equipo.Equipment_Current_Conditions;
    // technicalInformation.Weight = equipo.Weight === undefined ? "" : equipo.Weight;
    // technicalInformation.OEM = equipo.OEM === undefined ? "" : equipo.OEM;
    // technicalInformation.Description = equipo.Equipment_description === undefined ? "" : equipo.Equipment_description;
    // technicalInformation.ModelNumber = equipo.Model_Number === undefined ? "" : equipo.Model_Number;
    // technicalInformation.SerialNumber = equipo.Serial_Number === undefined ? "" : equipo.Serial_Number;
    // technicalInformation.vendor = equipo.Vendor_Integrator_name === undefined ? "" : equipo.Vendor_Integrator_name;
    // technicalInformation.currentWorking = equipo.Currently_working === undefined ? "" : equipo.Currently_working;
    // technicalInformation.Id_Equipment = valorInsertar.Id_Equipment;

    // servicesInformation.Id_ServicesInformation = uuidv4();
    // servicesInformation.DateOfInstallation = equipo.Date_of_Installation === undefined ? "" : equipo.Date_of_Installation;
    // servicesInformation.DateOfDesintallation = equipo.Date_of_Desintallation === undefined ? "" : equipo.Date_of_Desintallation;
    // servicesInformation.DesuseReason = equipo.Desuse_reason === undefined ? "" : equipo.Desuse_reason;
    // servicesInformation.DesinstallationReason = equipo.Desinstallation_reason === undefined ? "" : equipo.Desinstallation_reason;

    // valorInsertar.Procedencia.Id_Procedencia = uuidv4();
    // valorInsertar.Procedencia.Id_Line = line.Id_Line;
    // valorInsertar.Procedencia.Id_Areas = areas.Id_Areas;

    // valorInsertar.Id_Procedencia = valorInsertar.Procedencia.Id_Procedencia;

    // valorInsertar.Name = equipo.Equipment_Name;
    // valorInsertar.code = equipoSeleccionado.code;       //  Correo de la planta ----    Agregar campo en el Excel
    // valorInsertar.img = equipoSeleccionado.img;
    // valorInsertar.Estado = true;

    // valorInsertar.TechnicalSpecification = technicalInformation;


    // // -----------------------------------------    Add New Technical Information     ----------------------------
    // // const IdNoteAboutEquipment = uuidv4();


    // // const newTechnicalSpec = equipo.Notes_about_equipment === undefined ? {
    // //     Id_NewTechSpec: null,
    // //     Id_TechnicalSpecification: null,
    // //     Name: '',
    // //     Value: '',
    // //     SelectNewTechSpec: {
    // //         Id_SelectNewTechSpec: uuidv4(),
    // //         Id_TechnicalSpecification: '',
    // //         Id_NewTechSpec: ''
    // //     }
    // // } : {
    // //     Id_NewTechSpec: IdNoteAboutEquipment,
    // //     Id_TechnicalSpecification: null,
    // //     Name: "Notes about equipment",
    // //     Value: equipo.Notes_about_equipment,
    // //     SelectNewTechSpec: {
    // //         Id_SelectNewTechSpec: uuidv4(),
    // //         Id_TechnicalSpecification: '',
    // //         Id_NewTechSpec: IdNoteAboutEquipment
    // //     }
    // // }

    // // let newTechnicalSpecification = equipoSeleccionado.TechnicalSpecification.newTechnicalSpecification;
    // // newTechnicalSpecification.push(newTechnicalSpec)

    // // setnewTechicInformation(newTechnicalSpecification);




    // //-------------------------------------------------------------------------------------------------------









    // let nt = newTechicInformation

    // const newTechicInformationAll = nt.Id_NewTechSpec === null ? ([]) : (
    //     nt.map(NTS => {
    //         return (
    //             NTS = {
    //                 Id_NewTechSpec: NTS.Id_NewTechSpec,
    //                 Id_TechnicalSpecification: technicalInformation.Id_TechnicalSpecification,
    //                 Name: NTS.Name,
    //                 Value: NTS.Value,
    //                 SelectNewTechSpec: {
    //                     Id_SelectNewTechSpec: NTS.SelectNewTechSpec.Id_SelectNewTechSpec,
    //                     Id_TechnicalSpecification: technicalInformation.Id_TechnicalSpecification,
    //                     Id_NewTechSpec: NTS.SelectNewTechSpec.Id_NewTechSpec
    //                 }
    //             }
    //         )
    //     })
    // );

    // valorInsertar.TechnicalSpecification.newTechnicalSpecification = newTechicInformationAll;
    // valorInsertar.ServicesInformation = servicesInformation;

    // let ns = newservInformation

    // const newservInformationAll = ns.Id_NewServInfo === null ? ([]) : (
    //     ns.map(NSI => {
    //         return (
    //             NSI = {
    //                 Id_NewServInfo: NSI.Id_NewServInfo,
    //                 Id_ServicesInformation: servicesInformation.Id_ServicesInformation,
    //                 Name: NSI.Name,
    //                 Value: NSI.Value,
    //                 SelectNewServicesInfo: {
    //                     Id_SelectNewServInfo: NSI.SelectNewServicesInfo.Id_SelectNewServInfo,
    //                     Id_ServicesInformation: servicesInformation.Id_ServicesInformation,
    //                     Id_NewServInfo: NSI.SelectNewServicesInfo.Id_NewServInfo
    //                 }
    //             }
    //         )
    //     })
    // );

    // valorInsertar.ServicesInformation.newServicesInformation = newservInformationAll;
    // valorInsertar.Procedencia.areas = areas;
    // valorInsertar.Procedencia.areas.SubArea = SubArea;
    // valorInsertar.Procedencia.areas.operations = operations;
    // valorInsertar.Procedencia.areas.operations.countries = countries;
    // valorInsertar.Procedencia.areas.operations.countries.bu = bu;
    // valorInsertar.Procedencia.line = line;
    // valorInsertar.Procedencia.line.lineTypes = lineTypes;

    //     // equiposExcel.push(valorInsertar);


    //     // setDatos([...Datos, valorInsertar]);


    // console.log(Datos)

    return (
        <>
            <ModalBody className="text-center">

                <h5>Insertar datos?</h5>

            </ModalBody>

            <ModalFooter>
                <button className="btn btn-danger" onClick={() => send(item)}
                >
                    Sí
                </button>

                <button className="btn btn-secondary"
                    onClick={() => setModalInsertarExcel(false)}
                >
                    No
                </button>
            </ModalFooter>

        </>


    )






}

