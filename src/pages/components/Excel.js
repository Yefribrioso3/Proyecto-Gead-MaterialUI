import Axios from "axios";
import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';


export const Excel = async (item) => {

    // ---- Variables

    const [equipoSeleccionado, setEquipoSeleccionado] = useState({
        Id_Equipment: null,  Name: '', code: '', img: '', Id_Procedencia: null, Estado: '', createdAt: '', updatedAt: '',
        Procedencia: { Id_Procedencia: null, Id_Line: null, Id_Areas: null,
            areas: { Id_Areas: null, Name: '', Id_Operations: null,  operations: { Id_Operations: null,  Name: '', Id_Countries: null,
                    countries: { Id_Countries: null, Name: '', Id_BU: null, bu: {  Id_BU: null, Name: '' }  } },
                SubArea: { Id_SubAreas: null, Name: '', Id_Areas: null } },
            line: { Id_Line: null, number: '', Id_LineTypes: null, lineTypes: {  Id_LineTypes: null,  Name: ''  } } },
        ServicesInformation: { Id_ServicesInformation: null, DateOfInstallation: '',
            DateOfDesintallation: '',  DesuseReason: '',  DesinstallationReason: '', ProcurementOrder: '',  Id_Equipment: null,
            newServicesInformation: [ { Id_NewServInfo: null, Id_ServicesInformation: null, Name: '', Value: '',
                    SelectNewServicesInfo: {  Id_SelectNewServInfo: null, Id_ServicesInformation: null, Id_NewServInfo: null  }  } ] },
        TechnicalSpecification: {
            Id_TechnicalSpecification: null, EquipmentType: '',  CurrentConditions: '', Weight: "", OEM: "", Description: "",
            ModelNumber: "",  SerialNumber: "", vendor: "", currentWorking: '', Id_Equipment: null,
            newTechnicalSpecification: [{ Id_NewTechSpec: '', Id_TechnicalSpecification: '', Name: "", Value: "",
                SelectNewTechSpec: { Id_SelectNewTechSpec: '', Id_TechnicalSpecification: '', Id_NewTechSpec: '' } }] }
    })

    const [servicesInformation, setServicesInformation] = useState({
        Id_ServicesInformation: '', DateOfInstallation: '', DateOfDesintallation: '', DesuseReason: '', DesinstallationReason: '', ProcurementOrder: '', Id_Equipment: '',
        newServicesInformation: [ { Id_NewServInfo: '', Id_ServicesInformation: '', Name: '', Value: '',
                SelectNewServicesInfo: { Id_SelectNewServInfo: '', Id_ServicesInformation: '', Id_NewServInfo: '' } } ] });

    const [technicalInformation, setTechnicalInformation] = useState({  //Para guardar informacion tecnica seleccionada a editar
        Id_TechnicalSpecification: '', EquipmentType: '', CurrentConditions: '', Weight: "", OEM: "", Description: "", ModelNumber: "",
        SerialNumber: "", vendor: "", currentWorking: '', Id_Equipment: '', newTechnicalSpecification: [
            { Id_NewTechSpec: '', Id_TechnicalSpecification: '', Name: "", Value: "",
                SelectNewTechSpec: { Id_SelectNewTechSpec: '', Id_TechnicalSpecification: '', Id_NewTechSpec: '' } } ] });

    const [areas, setareas] = useState({
        Id_Areas: '', Name: '', Id_Operations: '',
        operations: { Id_Operations: null, Name: '', Id_Countries: null,
            countries: {  Id_Countries: null, Name: '', Id_BU: null, bu: { Id_BU: null, Name: '' } } }
    })

    const [operations, setOperations] = useState({ Id_Operations: '', Name: '', Id_Countries: '',
        countries: {  Id_Countries: null, Name: '', Id_BU: null,  bu: { Id_BU: null, Name: '' } }
    })

    const [countries, setCountries] = useState({ Id_Countries: '', Name: '', Id_BU: '', bu: { Id_BU: null, Name: '' } })

    const [bu, setBu] = useState({ Id_BU: '', Name: '' })

    const [SubArea, setSubArea] = useState({ Id_SubAreas: '', Name: '', Id_Areas: '' })

    const [line, setLine] = useState({ Id_Line: '', number: '', Id_LineTypes: '', })

    const [lineTypes, setLineTypes] = useState({  Id_LineTypes: '', Name: ''  })

    const [newTechicInformation, setnewTechicInformation] = useState({
        Id_NewTechSpec: '',
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
        Id_NewServInfo: '',
        Id_ServicesInformation: null,
        Name: '',
        Value: '',
        SelectNewServicesInfo: {
            Id_SelectNewServInfo: '',
            Id_ServicesInformation: '',
            Id_NewServInfo: ''
        }
    })














    item.map(async (equipo) => {



        let valorInsertar = equipoSeleccionado; //Variable auxiliar para modificar el equipo seleccionado

        bu.Id_BU = uuidv4();

        countries.Id_Countries = uuidv4();
        countries.Id_BU = bu.Id_BU;

        operations.Id_Operations = uuidv4();
        operations.Id_Countries = countries.Id_Countries;

        areas.Id_Areas = uuidv4();
        areas.Id_Operations = operations.Id_Operations;

        SubArea.Id_SubAreas = uuidv4();
        SubArea.Id_Areas = areas.Id_Areas;

        lineTypes.Id_LineTypes = uuidv4();

        line.Id_Line = uuidv4();
        line.Id_LineTypes = lineTypes.Id_LineTypes;

        technicalInformation.Id_TechnicalSpecification = uuidv4();
        technicalInformation.EquipmentType = equipo.Equipment_Type;
        technicalInformation.CurrentConditions = equipo.Equipment_Current_Conditions;
        technicalInformation.Weight = equipo.Weight;
        technicalInformation.OEM = equipo.OEM;
        technicalInformation.Description = equipo.Equipment_description;
        technicalInformation.ModelNumber = equipo.Model_Number;
        technicalInformation.SerialNumber = equipo.Serial_Number;
        technicalInformation.vendor = equipo.Vendor_Integrator_name;
        technicalInformation.currentWorking = equipo.Currently_working;
        technicalInformation.Id_Equipment = equipo.Currently_working;

        servicesInformation.Id_ServicesInformation = uuidv4();
        servicesInformation.DateOfInstallation = equipo.Date_of_Installation;
        servicesInformation.DateOfDesintallation = equipo.Date_of_Desintallation;
        servicesInformation.DesuseReason = equipo.Desuse_reason;
        servicesInformation.DesinstallationReason = equipo.Desinstallation_reason;

        valorInsertar.Procedencia.Id_Procedencia = uuidv4();
        valorInsertar.Procedencia.Id_Line = line.Id_Line;
        valorInsertar.Procedencia.Id_Areas = areas.Id_Areas;

        valorInsertar.Id_Equipment = uuidv4();
        valorInsertar.Id_Procedencia = valorInsertar.Procedencia.Id_Procedencia;

        valorInsertar.Name = equipo.Equipment_Name;
        valorInsertar.code = equipoSeleccionado.code;       //  Correo de la planta ----    Agregar campo en el Excel
        valorInsertar.img = equipoSeleccionado.img;
        valorInsertar.Estado = true;

        valorInsertar.TechnicalSpecification = technicalInformation;

        let nt = newTechicInformation

        const newTechicInformationAll = nt.Id_NewTechSpec === null ? ([]) : (
            nt.map(NTS => {
                return (
                    NTS = {
                        Id_NewTechSpec: NTS.Id_NewTechSpec,
                        Id_TechnicalSpecification: technicalInformation.Id_TechnicalSpecification,
                        Name: NTS.Name,
                        Value: NTS.Value,
                        SelectNewTechSpec: {
                            Id_SelectNewTechSpec: NTS.SelectNewTechSpec.Id_SelectNewTechSpec,
                            Id_TechnicalSpecification: technicalInformation.Id_TechnicalSpecification,
                            Id_NewTechSpec: NTS.SelectNewTechSpec.Id_NewTechSpec
                        }
                    }
                )
            })
        );

        valorInsertar.TechnicalSpecification.newTechnicalSpecification = newTechicInformationAll;
        valorInsertar.ServicesInformation = servicesInformation;

        let ns = newservInformation

        const newservInformationAll = ns.Id_NewServInfo === null ? ([]) : (
            ns.map(NSI => {
                return (
                    NSI = {
                        Id_NewServInfo: NSI.Id_NewServInfo,
                        Id_ServicesInformation: servicesInformation.Id_ServicesInformation,
                        Name: NSI.Name,
                        Value: NSI.Value,
                        SelectNewServicesInfo: {
                            Id_SelectNewServInfo: NSI.SelectNewServicesInfo.Id_SelectNewServInfo,
                            Id_ServicesInformation: servicesInformation.Id_ServicesInformation,
                            Id_NewServInfo: NSI.SelectNewServicesInfo.Id_NewServInfo
                        }
                    }
                )
            })
        );

        valorInsertar.ServicesInformation.newServicesInformation = newservInformationAll;
        valorInsertar.Procedencia.areas = areas;
        valorInsertar.Procedencia.areas.SubArea = SubArea;
        valorInsertar.Procedencia.areas.operations = operations;
        valorInsertar.Procedencia.areas.operations.countries = countries;
        valorInsertar.Procedencia.areas.operations.countries.bu = bu;
        valorInsertar.Procedencia.line = line;
        valorInsertar.Procedencia.line.lineTypes = lineTypes;




        




    })

    const insertar = async (valorInsertar) => {

        await Axios.post("https://node-gead.herokuapp.com/api/bu", {
            Id_BU: valorInsertar.Procedencia.areas.operations.countries.bu.Id_BU,
            Name: valorInsertar.Procedencia.areas.operations.countries.bu.Name
        })
        // .then(() => {
        //     alert("Successful insert");
        // });

        await Axios.post('https://node-gead.herokuapp.com/api/countries', {
            Id_Countries: valorInsertar.Procedencia.areas.operations.countries.Id_Countries,
            Name: valorInsertar.Procedencia.areas.operations.countries.Name,
            Id_BU: valorInsertar.Procedencia.areas.operations.countries.Id_BU,
        })

        await Axios.post('https://node-gead.herokuapp.com/api/planta', {
            Id_Operations: valorInsertar.Procedencia.areas.operations.Id_Operations,
            Name: valorInsertar.Procedencia.areas.operations.countries.Name,
            Id_Countries: valorInsertar.Procedencia.areas.operations.Id_Countries,
        })

        await Axios.post('https://node-gead.herokuapp.com/api/area', {
            Id_Areas: valorInsertar.Procedencia.areas.Id_Areas,
            Name: valorInsertar.Procedencia.areas.Name,
            Id_Operations: valorInsertar.Procedencia.areas.Id_Operations,
        })

        await Axios.post('https://node-gead.herokuapp.com/api/SubArea', {
            Id_SubAreas: valorInsertar.Procedencia.areas.SubArea.Id_SubAreas,
            Name: valorInsertar.Procedencia.areas.SubArea.Name,
            Id_Areas: valorInsertar.Procedencia.areas.SubArea.Id_Areas,
        })

        await Axios.post("https://node-gead.herokuapp.com/api/line", {
            Id_Line: valorInsertar.Procedencia.line.Id_Line,
            number: valorInsertar.Procedencia.line.number,
            Id_LineTypes: valorInsertar.Procedencia.line.Id_LineTypes
        });

        await Axios.post("https://node-gead.herokuapp.com/api/lineType", {
            Id_LineTypes: valorInsertar.Procedencia.line.lineTypes.Id_LineTypes,
            Name: valorInsertar.Procedencia.line.lineTypes.Name
        });

        await Axios.post("https://node-gead.herokuapp.com/api/procedencia", {
            Id_Procedencia: valorInsertar.Id_Procedencia,
            Id_Line: valorInsertar.Procedencia.line.Id_Line,
            Id_Areas: valorInsertar.Procedencia.areas.Id_Areas
        });

        await Axios.post("https://node-gead.herokuapp.com/api/equipment", {
            Id_Equipment: valorInsertar.Id_Equipment,
            Name: valorInsertar.Name,
            code: valorInsertar.code,
            Id_Procedencia: valorInsertar.Procedencia.Id_Procedencia,
            Estado: valorInsertar.Estado,
            img: valorInsertar.img
        });

        await Axios.post("https://node-gead.herokuapp.com/api/servicesInformation", {
            Id_ServicesInformation: valorInsertar.ServicesInformation.Id_ServicesInformation,
            DateOfInstallation: valorInsertar.ServicesInformation.DateOfInstallation,
            DateOfDesintallation: valorInsertar.ServicesInformation.DateOfDesintallation,
            DesuseReason: valorInsertar.ServicesInformation.DesuseReason,
            DesinstallationReason: valorInsertar.ServicesInformation.DesinstallationReason,
            ProcurementOrder: valorInsertar.ServicesInformation.ProcurementOrder,
            Id_Equipment: valorInsertar.Id_Equipment
        })

        valorInsertar.ServicesInformation.newServicesInformation.map(async (NSI) => {
            await Axios.post("https://node-gead.herokuapp.com/api/newServInfo", {
                Id_NewServInfo: NSI.Id_NewServInfo,
                Id_ServicesInformation: valorInsertar.ServicesInformation.Id_ServicesInformation,
                Name: NSI.Name,
                Value: NSI.Value
            })

            await Axios.post("https://node-gead.herokuapp.com/api/selectNewServInfo", {
                Id_SelectNewServInfo: NSI.SelectNewServicesInfo.Id_SelectNewServInfo,
                Id_ServicesInformation: valorInsertar.ServicesInformation.Id_ServicesInformation,
                Id_NewServInfo: NSI.Id_NewServInfo
            })
        })


        await Axios.post("https://node-gead.herokuapp.com/api/technicalSpecification", {
            Id_TechnicalSpecification: valorInsertar.TechnicalSpecification.Id_TechnicalSpecification,
            EquipmentType: valorInsertar.TechnicalSpecification.EquipmentType,
            CurrentConditions: valorInsertar.TechnicalSpecification.CurrentConditions,
            Weight: valorInsertar.TechnicalSpecification.Weight,
            OEM: valorInsertar.TechnicalSpecification.OEM,
            Description: valorInsertar.TechnicalSpecification.Description,
            ModelNumber: valorInsertar.TechnicalSpecification.ModelNumber,
            SerialNumber: valorInsertar.TechnicalSpecification.SerialNumber,
            vendor: valorInsertar.TechnicalSpecification.vendor,
            currentWorking: valorInsertar.TechnicalSpecification.currentWorking,
            Id_Equipment: valorInsertar.Id_Equipment
        })


        valorInsertar.TechnicalSpecification.newTechnicalSpecification.map(async (NTS) => {
            await Axios.post("https://node-gead.herokuapp.com/api/NewTechInfo", {
                Id_NewTechSpec: NTS.Id_NewTechSpec,
                Id_TechnicalSpecification: valorInsertar.TechnicalSpecification.Id_TechnicalSpecification,
                Name: NTS.Name,
                Value: NTS.Value
            })

            await Axios.post("https://node-gead.herokuapp.com/api/selectNewTechSpec", {
                Id_SelectNewTechSpec: NTS.SelectNewTechSpec.Id_SelectNewTechSpec,
                Id_TechnicalSpecification: valorInsertar.TechnicalSpecification.Id_TechnicalSpecification,
                Id_NewTechSpec: NTS.Id_NewTechSpec
            })
        })



    }



    return console.log(item)







    
}
