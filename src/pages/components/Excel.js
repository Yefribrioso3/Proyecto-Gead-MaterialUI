// import { Button } from "@material-ui/core";
import Axios from "axios";
import React from "react";
import { ModalBody, ModalFooter } from "reactstrap";
import { globalApi } from "../../types/api.types";
// import { v4 as uuidv4 } from "uuid";

export const Excel = ({
  item,
  setItem,
  setModalInsertarExcel,
  fecha,
  userByToken,
  // setGetAllList,
  // getAllList,
  // setListAll,
  // actualizarTabla,
  // setpruebaExcel,
}) => {

  const send = async (item) => {
    const Excel = item.map((equipo) => {
      return (equipo = {
        Id_Equipment: equipo.ID_GEAD.toString(),
        Name: equipo.Equipment_Name === undefined ? "NO DATA AVAILABLE" : equipo.Equipment_Name,
        code: "",
        img: "",
        Id_Procedencia: equipo.ID_GEAD.toString(),
        Estado: true,
        createdAt: "",
        updatedAt: "",
        Procedencia: {
          Id_Procedencia: equipo.ID_GEAD.toString(),
          Id_Line: equipo.ID_GEAD.toString(),
          Id_Areas: equipo.ID_GEAD.toString(),
          areas: {
            Id_Areas: equipo.ID_GEAD.toString(),
            Name: equipo.Area === undefined ? "NO DATA AVAILABLE" : equipo.Area.toUpperCase(),
            Id_Operations: equipo.ID_GEAD.toString(),
            operations: {
              Id_Operations: equipo.ID_GEAD.toString(),
              Name:
                equipo.Plant === undefined ? "NO DATA AVAILABLE" : equipo.Plant.toUpperCase(),
              Id_Countries: equipo.ID_GEAD.toString(),
              countries: {
                Id_Countries: equipo.ID_GEAD.toString(),
                Name:
                  equipo.Country === undefined
                    ? "NO DATA AVAILABLE"
                    : equipo.Country.toUpperCase(),
                Id_BU: equipo.ID_GEAD.toString(),
                bu: {
                  Id_BU: equipo.ID_GEAD.toString(),
                  Name: equipo.BU === undefined ? "NO DATA AVAILABLE" : equipo.BU.toUpperCase(),
                },
              },
            },
            SubArea: {
              Id_SubAreas: equipo.ID_GEAD.toString(),
              Name:
                equipo.Subarea === undefined
                  ? "NO DATA AVAILABLE"
                  : equipo.Subarea.toUpperCase(),
              Id_Areas: equipo.ID_GEAD.toString(),
            },
          },
          line: {
            Id_Line: equipo.ID_GEAD.toString(),
            number:
              equipo.Line_Number === undefined ? "NO DATA AVAILABLE" : equipo.Line_Number, //Numeric
            Id_LineTypes: equipo.ID_GEAD.toString(),
            lineTypes: {
              Id_LineTypes: equipo.ID_GEAD.toString(),
              Name:
                equipo.Line_Type === undefined
                  ? "NO DATA AVAILABLE"
                  : equipo.Line_Type.toUpperCase(),
            },
          },
        },
        FinancialInformation: {
          EquipmentValueInUSD: equipo.Current_equipment_value_in_USD === undefined || equipo.Current_equipment_value_in_USD === "NO DATA AVAILABLE"
            ? null
            : equipo.Current_equipment_value_in_USD,
          Activo_fijo: equipo.Activo_fijo === undefined || equipo.Activo_fijo === "NO DATA AVAILABLE" //Numeric
            ? null
            : equipo.Activo_fijo,
          Soc: equipo[" Soc "] === undefined //String
            ? "NO DATA AVAILABLE"
            : equipo[" Soc "],
          Concatenar: equipo[" Concatenar "] === undefined //String
            ? "NO DATA AVAILABLE"
            : equipo[" Concatenar "].toUpperCase(),
          Clase: equipo[" Clase "] === undefined //String
            ? "NO DATA AVAILABLE"
            : equipo[" Clase "].toString(),
          Centro: equipo[" Centro "] === undefined || equipo[" Centro "] === "NO DATA AVAILABLE"
            ? null
            : equipo[" Centro "],
          CodPM: equipo[" CodPM "] === undefined //String
            ? "NO DATA AVAILABLE"
            : equipo[" CodPM "].toString(),
          Centro_de_costos: equipo[" Centro_de_costos "] === undefined //String
            ? "NO DATA AVAILABLE"
            : equipo[" Centro_de_costos "].toString(),
          Fecha_de_capitalizacion: equipo[" Fecha_de_capitalizacion "] === undefined //String
            ? "NO DATA AVAILABLE"
            : equipo[" Fecha_de_capitalizacion "],
          Valor_Adquirido: equipo[" Valor_Adquirido "] === undefined || equipo[" Valor_Adquirido "] === "NO DATA AVAILABLE" //Numeric
            ? null
            : equipo[" Valor_Adquirido "],
          Amortizacion_acumulada: equipo[" Amortizacion_acumulada "] === undefined || equipo[" Amortizacion_acumulada "] === "NO DATA AVAILABLE" //Numeric
            ? null
            : equipo[" Amortizacion_acumulada "],
          Valor_Contable: equipo[" Valor_Contable "] === undefined || equipo[" Valor_Contable "] === "NO DATA AVAILABLE" //Numeric
            ? null
            : equipo[" Valor_Contable "],
          Moneda: equipo[" Moneda "] === undefined //String
            ? "NO DATA AVAILABLE"
            : equipo[" Moneda "],
          Cantidad: equipo[" Cantidad "] === undefined || equipo[" Cantidad "] === "NO DATA AVAILABLE" //Numeric
            ? null
            : equipo[" Cantidad "],
          Tipo: equipo[" Tipo "] === undefined //String
            ? "NO DATA AVAILABLE"
            : equipo[" Tipo "],
          Screen: equipo[" Screen "] === undefined //String
            ? "NO DATA AVAILABLE"
            : equipo[" Screen "],
          Nom_Clase: equipo[" Nom_Clase "] === undefined //String
            ? "NO DATA AVAILABLE"
            : equipo[" Nom_Clase "],
          Nom_Ce: equipo[" Nom_Ce. "] === undefined //String
            ? "NO DATA AVAILABLE"
            : equipo[" Nom_Ce. "],
          Encontrado_SI_NO: equipo[" Encontrado_SI_NO "] === undefined //String
            ? "NO DATA AVAILABLE"
            : equipo[" Encontrado_SI_NO "].toUpperCase(),
          Estado_del_Activo: equipo[" Estado_del_Activo "] === undefined //string
            ? "NO DATA AVAILABLE"
            : equipo[" Estado_del_Activo "],
          Categoria: equipo[" Categoria "] === undefined //string
            ? "NO DATA AVAILABLE"
            : equipo[" Categoria "].toUpperCase(),
          Gerencia: equipo[" Gerencia "] === undefined //string
            ? "NO DATA AVAILABLE"
            : equipo[" Gerencia "].toUpperCase(),
          Codigo_De_Barras: equipo[" Codigo_De_Barras "] === undefined //string
            ? null
            : equipo[" Codigo_De_Barras "].toString(),
          DI: equipo[" DI "] === undefined ? "NO DATA AVAILABLE" : equipo[" DI "].toString(), //string
          SN: equipo[" SN "] === undefined || equipo[" SN "] === "NO DATA AVAILABLE" //Numeric
            ? null
            : equipo[" SN "],
          Depreciacion_acumulada_ajustada:
            equipo[" Depreciacion_acumulada_ajustada "] === undefined || equipo[" Depreciacion_acumulada_ajustada "] === "NO DATA AVAILABLE" //Numeric
              ? null
              : equipo[" Depreciacion_acumulada_ajustada "],
          Tasa_Cambio_contra_dolar:
            equipo.Tasa_Cambio_contra_dolar === undefined || equipo.Tasa_Cambio_contra_dolar === "NO DATA AVAILABLE" //Numeric
              ? null
              : equipo.Tasa_Cambio_contra_dolar,
          Latitud: equipo.Latitud === undefined || equipo.Latitud === "NO DATA AVAILABLE" //Numeric
            ? null
            : equipo.Latitud,
          Longitud: equipo.Longitud === undefined || equipo.Longitud === "NO DATA AVAILABLE" //Numeric
            ? null
            : equipo.Longitud,
          Period_Time:
            equipo.Period_Time === undefined || equipo.Period_Time === "NO DATA AVAILABLE" //Numeric
              ? null
              : equipo.Period_Time,
          Id_Equipment: equipo.ID_GEAD.toString(),
          EncargadoActualizacion: `${userByToken.Name} ${userByToken.LastName}`,
          FechaActualizacion: `${fecha}`,
        },
        ServicesInformation: {
          Id_ServicesInformation: equipo.ID_GEAD.toString(),
          DateOfInstallation:
            equipo.Date_of_Installation === undefined
              ? "NO DATA AVAILABLE"
              : equipo.Date_of_Installation,
          DateOfDesintallation:
            equipo.Date_of_Desintallation === undefined
              ? "NO DATA AVAILABLE"
              : equipo.Date_of_Desintallation,
          DesuseReason:
            equipo.Desuse_reason === undefined
              ? "NO DATA AVAILABLE"
              : equipo.Desuse_reason.toUpperCase(),
          DesinstallationReason:
            equipo.Desinstallation_reason === undefined
              ? "NO DATA AVAILABLE"
              : equipo.Desinstallation_reason.toUpperCase(),
          ProcurementOrder: "NO DATA AVAILABLE",
          Id_Equipment: equipo.ID_GEAD.toString(),
          newServicesInformation: [],
        },
        TechnicalSpecification: {
          Id_TechnicalSpecification: equipo.ID_GEAD.toString(),
          EquipmentType:
            equipo.Equipment_Type === undefined
              ? "NO DATA AVAILABLE"
              : equipo.Equipment_Type.toUpperCase(),
          CurrentConditions:
            equipo.Equipment_Current_Conditions === undefined
              ? "NO DATA AVAILABLE"
              : equipo.Equipment_Current_Conditions.toUpperCase() === "NUEVO" ? "Excellent" : equipo.Equipment_Current_Conditions.toUpperCase(),
          Weight:
            equipo.Weight === undefined ? "NO DATA AVAILABLE" : equipo.Weight.toUpperCase(),
          OEM: equipo.OEM === undefined ? "NO DATA AVAILABLE" : equipo.OEM.toUpperCase(),
          Description:
            equipo.Equipment_description === undefined
              ? "NO DATA AVAILABLE"
              : equipo.Equipment_description,
          ModelNumber:
            equipo.Model_Number === undefined ? "NO DATA AVAILABLE" : equipo.Model_Number,
          SerialNumber:
            equipo.Serial_Number === undefined ? "NO DATA AVAILABLE" : equipo.Serial_Number,
          vendor:
            equipo["Vendor / Integrator name"] === undefined
              ? "NO DATA AVAILABLE"
              : equipo["Vendor / Integrator name"].toUpperCase(),
          currentWorking:
            equipo["Equipment_currently_working_(Installed,_connected_on_process_line,)"] === undefined
              ? "NO DATA AVAILABLE"
              : equipo["Equipment_currently_working_(Installed,_connected_on_process_line,)"],
          Id_Equipment: equipo.ID_GEAD.toString(),
          newTechnicalSpecification: [],
          OptionalTechInfo: {
            Id_OptionalTechInfo: equipo.ID_GEAD.toString(),
            NominalCapacity:
              equipo.Nominal_Capacity === undefined
                ? "NO DATA AVAILABLE"
                : equipo.Nominal_Capacity,
            YearOfConstruction:
              equipo.Year_of_construction === undefined
                ? "NO DATA AVAILABLE"
                : equipo.Year_of_construction,
            EquipmentCurrentConditionsComments:
              equipo.Equipment_current_conditions_comments === undefined
                ? "NO DATA AVAILABLE"
                : equipo.Equipment_current_conditions_comments,
            NotesAboutEquipment:
              equipo.Notes_about_equipment === undefined
                ? "NO DATA AVAILABLE"
                : equipo.Notes_about_equipment,
            AssambledDissambled:
              equipo["Assambled / Dissambled"] === undefined
                ? "NO DATA AVAILABLE"
                : equipo["Assambled / Dissambled"],
            PlantTechnicalInformationContact:
              equipo.Plant_Technical_Information_Contact === undefined
                ? "NO DATA AVAILABLE"
                : equipo.Plant_Technical_Information_Contact,
            PlantFinancialInformationContact:
              equipo.Plant_Financial_Information_Contact === undefined
                ? "NO DATA AVAILABLE"
                : equipo.Plant_Financial_Information_Contact,
            Width:
              equipo["Equipment_Dimensions - Width"] === undefined
                ? "NO DATA AVAILABLE"
                : equipo["Equipment_Dimensions - Width"],
            Height:
              equipo["Equipment_Dimensions - Height"] === undefined
                ? "NO DATA AVAILABLE"
                : equipo["Equipment_Dimensions - Height"],
            Depth:
              equipo["Equipment_Dimensions - Depth"] === undefined
                ? "NO DATA AVAILABLE"
                : equipo["Equipment_Dimensions - Depth"],
            ConstructionMaterials:
              equipo.Construction_materials === undefined
                ? "NO DATA AVAILABLE"
                : equipo.Construction_materials,
            ExternalCoating:
              equipo.External_coating === undefined
                ? "NO DATA AVAILABLE"
                : equipo.External_coating,
            CommunicationProtocol:
              equipo.Communication_protocol === undefined
                ? "NO DATA AVAILABLE"
                : equipo.Communication_protocol,
            MeasurementVariable:
              equipo.Measurement_variable === undefined
                ? "NO DATA AVAILABLE"
                : equipo.Measurement_variable,
            ElectricalConsumption:
              equipo.Electrical_Consumption === undefined
                ? "NO DATA AVAILABLE"
                : equipo.Electrical_Consumption,
            ProtectionGrade:
              equipo.Protection_Grade === undefined
                ? "NO DATA AVAILABLE"
                : equipo.Protection_Grade,
            SanitaryGrade:
              equipo.Sanitary_Grade === undefined ? "" : equipo.Sanitary_Grade,
            AvailableWarranty:
              equipo.Available_warranty === undefined
                ? "NO DATA AVAILABLE"
                : equipo.Available_warranty,
            RemainingWarrantyYears:
              equipo.Remaining_warranty_years === undefined
                ? "NO DATA AVAILABLE"
                : equipo.Remaining_warranty_years,
            PeripheralDevicesAccesories:
              equipo["Peripheral Devices / Accesories"] === undefined
                ? "NO DATA AVAILABLE"
                : equipo["Peripheral Devices / Accesories"],
            WorkingHours:
              equipo.Working_Hours === undefined ? "" : equipo.Working_Hours,
            LaboratoryEquipment:
              equipo.Laboratory_Equipment === undefined
                ? "NO DATA AVAILABLE"
                : equipo.Laboratory_Equipment,
            Id_TechnicalSpecification: equipo.ID_GEAD.toString(),
          },
        },
      });
    });

    // let newTechSpec = [];

    // Excel.map((equipo) => {
    // equipo.Id_Procedencia = equipo.Procedencia.Id_Procedencia
    // equipo.Procedencia.Id_Line = equipo.Procedencia.line.Id_Line
    // equipo.Procedencia.Id_Areas = equipo.Procedencia.areas.Id_Areas
    // equipo.Procedencia.areas.Id_Operations = equipo.Procedencia.areas.operations.Id_Operations
    // equipo.Procedencia.areas.operations.Id_Countries = equipo.Procedencia.areas.operations.countries.Id_Countries
    // equipo.Procedencia.areas.operations.countries.Id_BU = equipo.Procedencia.areas.operations.countries.bu.Id_BU
    // equipo.Procedencia.areas.SubArea.Id_Areas = equipo.Procedencia.areas.Id_Areas
    // equipo.Procedencia.line.Id_LineTypes = equipo.Procedencia.line.lineTypes.Id_LineTypes
    // equipo.ServicesInformation.Id_Equipment = equipo.Id_Equipment
    // equipo.TechnicalSpecification.Id_Equipment = equipo.Id_Equipment
    // equipo.FinancialInformation.Id_Equipment = equipo.Id_Equipment

    // newTechSpec = equipo.TechnicalSpecification.newTechnicalSpecification;

    // if (newTechSpec.Id_NewTechSpec !== []) {
    //     newTechSpec.Id_TechnicalSpecification = equipo.TechnicalSpecification.Id_TechnicalSpecification
    //     equipo.TechnicalSpecification.newTechnicalSpecification = newTechSpec

    // }

    // !equipo.TechnicalSpecification.newTechnicalSpecification.Id_NewTechSpec ? (equipo.TechnicalSpecification.newTechnicalSpecification.Id_TechnicalSpecification = []) : ( equipo.TechnicalSpecification.newTechnicalSpecification.Id_TechnicalSpecification = equipo.TechnicalSpecification.Id_TechnicalSpecification )

    // equipo.TechnicalSpecification.newTechnicalSpecification.Id_NewTechSpec ? equipo.TechnicalSpecification.newTechnicalSpecification.SelectNewTechSpec.Id_NewTechSpec =  equipo.TechnicalSpecification.newTechnicalSpecification.Id_NewTechSpec : null

    // equipo.TechnicalSpecification.Id_TechnicalSpecification

    // equipo.TechnicalSpecification.newTechnicalSpecification.SelectNewTechSpec.Id_TechnicalSpecification =  equipo.TechnicalSpecification.Id_TechnicalSpecification
    // });

    // console.log(Excel)

    // Excel.map(( async (equipo) => {

    //     await insertar(equipo);
    // console.log(equipo);
    // } ))

    // let agregar = getAllList;

    // console.log(Object.isExtensible(agregar));
    // console.log(agregar);

    // setDatos(agregar);

    // Excel.map((Equipo) => {
    //     // agregar.push(Equipo);

    //     agregar.push(Equipo)

    //     // setDatos([
    //     //     ...Datos,
    //     //     Equipo
    //     // ])

    //     // setGetAllList([
    //     //     ...getAllList,
    //     //     Equipo
    //     // ])
    // });

    // setGetAllList(
    //     Excel
    // )

    // setListAll(agregar)

    // actualizarTabla(Excel)

    // console.log(Excel);

    await insertar(Excel);

    setItem([]);
    setModalInsertarExcel(false);
  };

  const insertar = async (Excel) => {
    Excel.map(async (Equipment) => {
      await Axios.post(`${globalApi}/createEquipos`, Equipment);
    });

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
  };

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
        <button className="btn btn-danger" onClick={() => send(item)}>
          Sí
        </button>

        <button
          className="btn btn-secondary"
          onClick={() => setModalInsertarExcel(false)}
        >
          No
        </button>
      </ModalFooter>
    </>
  );
};
