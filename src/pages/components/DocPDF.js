import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Line } from '@react-pdf/renderer';

export const DocPDF = ({ equipoSeleccionado, line, operations, lineTypes, countries, bu, areas, SubArea, technicalInformation, servicesInformation }) => {


    return (
        <Document>
            <Page size="A4">
                <View style={{ padding: "20px" }}>
                    {/* display: 'flex', flexDirection: 'row', flexWrap: 'wrap' */}

                    <View className="col-12" style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>

                        {/* ---------------------------------------------       Subir Imagen        --------------------------------------------- */}

                        <View id="imagen" className="card animate__animated animate__fadeInLeft" style={{ maxWidth: 380, maxHeight: 300 }}>

                            {
                                equipoSeleccionado.img ? <Image src={equipoSeleccionado.img} style={{ width: '380px' }} /> : null
                            }

                        </View>

                        {/* <View id="imagen" className="card mt-2 animate__animated animate__fadeInLeft" style={{ maxWidth: 380 }}>
                            <input
                                type="file"
                                name="file"
                                placeholder="Upload an image"
                                onChange={uploadImage}
                            />
                        </View> */}

                        <Text style={{ marginTop: "10px", color: "gray", fontSize: "22px", marginTop: "10px" }}>Location</Text>

                    </View>



                    <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', padding: "10px" }}>


                        {/* <View className="col-6">
                            <Text>---------------------</Text>
                            <Text>Id:   {equipoSeleccionado && equipoSeleccionado.Id_Equipment}</Text>
                            <Text>---------------------</Text>

                            <input
                                className="form-control"
                                readOnly
                                type="text text-align=center"
                                name="id"
                                value={equipoSeleccionado && equipoSeleccionado.Id_Equipment} />
                        </View> */}

                        <View className="col-6" style={{ width: "50%" }}>
                            <Text style={{ marginTop: "20px", fontSize: "14px", color: "blue" }}>Line Number:</Text>
                            <Text style={{ marginTop: "10px" }}>{line && line.number}</Text>
                        </View>

                        <View className="col-6" style={{ width: "50%" }}>
                            <Text style={{ marginTop: "20px", fontSize: "14px", color: "blue" }}>Plant:</Text>
                            <Text style={{ marginTop: "10px" }}> {operations && operations.Name}</Text>


                            {/* <select
                            className="form-select SelectBoostrap"
                            name="Name"
                            required
                            value={operations && operations.Name}
                            onChange={handleChangeOperations}
                        >
                            <option value="">Select Plant</option>
                            <option value="Barbados">Barbados</option>
                            <option value="Barranquilla">Barranquilla</option>
                            <option value="Boyaca">Boyaca</option>
                            <option value="Bucaramanga">Bucaramanga</option>
                            <option value="Fabrica de Tapas de Tocancipa">Fabrica de Tapas de Tocancipa</option>
                            <option value="Etiquetas Impresur & Indugral">Etiquetas Impresur & Indugral</option>
                            <option value="Medellín">Medellín</option>
                            <option value="Malteria Tibito">Malteria Tibito</option>
                            <option value="Tocancipa">Tocancipa</option>
                            <option value="Malteria Tropical">Malteria Tropical</option>
                            <option value="Valle">Valle</option>
                            <option value="Holguin">Holguin</option>
                            <option value="Dominicana">Dominicana</option>
                            <option value="Hato Nuevo">Hato Nuevo</option>
                            <option value="Guayaquil">Guayaquil</option>
                            <option value="Quito">Quito</option>
                            <option value="Malteria de Guayaquil">Malteria de Guayaquil</option>
                            <option value="La Constancia Beer">La Constancia Beer</option>
                            <option value="El Salvador CSD">El Salvador CSD</option>
                            <option value="La Constancia Walter">La Constancia Walter</option>
                            <option value="Zacapa">Zacapa</option>
                            <option value="San Pedro Sula Beer">San Pedro Sula Beer</option>
                            <option value="San Pedro Sula CSD">San Pedro Sula CSD</option>
                            <option value="Apan">Apan</option>
                            <option value="Cebadas y Maltas">Cebadas y Maltas</option>
                            <option value="Guadalajara">Guadalajara</option>
                            <option value="Malteria Zacatecas">Malteria Zacatecas</option>
                            <option value="Mazatlán">Mazatlán</option>
                            <option value="Modelo México">Modelo México</option>
                            <option value="Salamanca (Casal)">Salamanca (Casal)</option>
                            <option value="Torreón">Torreón</option>
                            <option value="Tuxtepec">Tuxtepec</option>
                            <option value="Yucatan">Yucatan</option>
                            <option value="Zacatecas">Zacatecas</option>
                            <option value="Cucapá (Craft)">Cucapá (Craft)</option>
                            <option value="Pasadena">Pasadena</option>
                            <option value="Arequipa">Arequipa</option>
                            <option value="Ate">Ate</option>
                            <option value="Cusco">Cusco</option>
                            <option value="Huachipa">Huachipa</option>
                            <option value="Malteria de Lima">Malteria de Lima</option>
                            <option value="Motupe">Motupe</option>
                            <option value="San Juan (Pucallpa)">San Juan (Pucallpa)</option>
                            <option value="San Mateo (Huarochiri)">San Mateo (Huarochiri)</option>
                            <option value="Barbarian (Craft)">Barbarian (Craft)</option>
                            <option value="Saint Vincent">Saint Vincent</option>
                            <option value="Bogotá Brewery Company (Craft)">Bogotá Brewery Company (Craft)</option>
                        </select> */}

                        </View>

                        <Text>-------------------------------------------------------------------------------------------</Text>


                        <View className="col-6" style={{ width: "50%" }}>
                            {/* <Text>---------------------</Text> */}
                            <Text style={{ marginTop: "20px", fontSize: "14px", color: "blue" }}>Line Type:</Text>
                            <Text style={{ marginTop: "10px" }}>{lineTypes && lineTypes.Name}</Text>
                            {/* <Text>---------------------</Text> */}


                            {/* <select
                            className="form-select SelectBoostrap"
                            name="Name"
                            value={lineTypes && lineTypes.Name}
                            onChange={handleChangeLineTypes}
                        >
                            <option value="">Select Line Type</option>
                            <option value="Brewline">Brewline</option>
                            <option value="Bottle">Bottle</option>
                            <option value="Can">Can</option>
                            <option value="Pet">Pet</option>
                            <option value="Keg">Keg</option>
                            <option value="Special Keg">Special Keg</option>
                        </select> */}
                        </View>

                        <View className="col-6" style={{ width: "50%" }}>
                            {/* <Text>---------------------</Text> */}
                            <Text style={{ marginTop: "20px", fontSize: "14px", color: "blue" }}>Country:</Text>
                            <Text style={{ marginTop: "10px" }}>{countries && countries.Name}</Text>
                            {/* <Text>---------------------</Text> */}


                            {/* <Text className="text-danger">*</Text> */}


                            {/* <select
                            className="form-select SelectBoostrap"
                            name="Name"
                            value={countries && countries.Name}
                            required
                            onChange={handleChangeCountries}
                        >
                            <option value="">Selec Country</option>
                            <option value="Barbados">Barbados</option>
                            <option value="Colombia">Colombia</option>
                            <option value="Cuba">Cuba</option>
                            <option value="Dominicana">Dominicana</option>
                            <option value="Ecuador">Ecuador</option>
                            <option value="El Salvador">El Salvador</option>
                            <option value="Guatemala">Guatemala</option>
                            <option value="Honduras">Honduras</option>
                            <option value="México">México</option>
                            <option value="Panamá">Panamá</option>
                            <option value="Perú">Perú</option>
                            <option value="Saint Vincent">Saint Vincent</option>
                        </select> */}
                        </View>

                        <Text>-------------------------------------------------------------------------------------------</Text>


                        <View className="col-6" style={{ width: "50%" }}>
                            {/* <Text>---------------------</Text> */}
                            <Text style={{ marginTop: "20px", fontSize: "14px", color: "blue" }}>BU:</Text>
                            <Text style={{ marginTop: "10px" }}>{bu && bu.Name}</Text>
                            {/* <Text>---------------------</Text> */}



                            {/* <select
                            className="form-select SelectBoostrap"
                            name="Name"
                            value={bu && bu.Name}
                            onChange={handleChangeBu}
                        >
                            <option value="">Select BU</option>
                            <option value="CAC">CAC</option>
                            <option value="COL">COL</option>
                            <option value="PEC">PEC</option>
                            <option value="MEX">MEX</option>
                        </select> */}
                        </View>

                        <View className="col-6" style={{ width: "50%" }}>
                            {/* <Text>---------------------</Text> */}
                            <Text style={{ marginTop: "20px", fontSize: "14px", color: "blue" }}>Area:</Text>
                            <Text style={{ marginTop: "10px" }}>{areas && areas.Name}</Text>
                            {/* <Text>---------------------</Text> */}


                            {/* <select
                            className="form-select SelectBoostrap"
                            name="Name"
                            value={areas && areas.Name}
                            onChange={handleChangeAreas}
                        >
                            <option value="">Select Area</option>
                            <option value="General Services">General Services</option>
                            <option value="Silos">Silos</option>
                            <option value="Milling">Milling</option>
                            <option value="Brewhouse">Brewhouse</option>
                            <option value="Fermentation">Fermentation</option>
                            <option value="Maturation">Maturation</option>
                            <option value="Centrifuge">Centrifuge</option>
                            <option value="Filtration">Filtration</option>
                            <option value="Dilution Water">Dilution Water</option>
                            <option value="Bright Beer Tanks">Bright Beer Tanks</option>
                            <option value="Packaging">Packaging</option>
                            <option value="Chemical Island & CIP">Chemical Island & CIP</option>
                            <option value="Syrup House">Syrup House</option>
                            <option value="Logistic Tier 1">Logistic Tier 1</option>
                            <option value="Logistic Tier 2">Logistic Tier 2</option>
                            <option value="CO2 Recovery">CO2 Recovery</option>
                            <option value="Refrigeration">Refrigeration</option>
                            <option value="Wells">Wells</option>
                            <option value="Water Treatment Plant">Water Treatment Plant</option>
                            <option value="Compressed Air">Compressed Air</option>
                            <option value="Electrical Substation (HV)">Electrical Substation (HV)</option>
                            <option value="Electrical Substation (MV)">Electrical Substation (MV)</option>
                            <option value="Electrical Substation (LV)">Electrical Substation (LV)</option>
                            <option value="Steam Generation">Steam Generation</option>
                            <option value="Biological Treatment System">Biological Treatment System</option>
                            <option value="Tertiary System">Tertiary System</option>
                            <option value="Sanitary Plant">Sanitary Plant</option>
                            <option value="Automation & Industrial Network">Automation & Industrial Network</option>
                            <option value="Maintenance">Maintenance</option>
                            <option value="IT">IT</option>
                            <option value="Laboratory">Laboratory</option>
                            <option value="Workshop">Workshop</option>
                            <option value="Offices">Offices</option>
                            <option value="Subproducts">Subproducts</option>
                        </select> */}
                        </View>

                        <Text>-------------------------------------------------------------------------------------------</Text>


                        <View className="col-6" style={{ width: "50%" }}>
                            {/* <Text>---------------------</Text> */}
                            <Text style={{ marginTop: "20px", fontSize: "14px", color: "blue" }}>Subarea:</Text>
                            <Text style={{ marginTop: "10px" }}>{SubArea && SubArea.Name}</Text>
                            {/* <Text>---------------------</Text> */}


                            {/* <select
                            className="form-select SelectBoostrap"
                            name="Name"
                            value={SubArea && SubArea.Name}
                            onChange={handleChangeSubArea}
                        >
                            <option value="">Select Subarea</option>
                            <option value="Wort Kettle">Wort Kettle</option>
                            <option value="Torre de Molienda ">Torre de Molienda </option>
                            <option value="Cocimientos">Cocimientos</option>
                            <option value="BAGAZO/SYE">BAGAZO/SYE</option>
                            <option value="Bloque Frio">Bloque Frio</option>
                        </select> */}
                        </View>

                        <View className="col-6">
                            <Text style={{ marginTop: "20px", fontSize: "14px", color: "blue" }}>Plant Mail:</Text>
                            <Text style={{ marginTop: "10px" }}>{equipoSeleccionado && equipoSeleccionado.code}</Text>
                        </View>

                        <Text>-------------------------------------------------------------------------------------------</Text>


                    </View>

                </View>

            </Page>


            {/* -----------------------------       Techinical Information      -------------------------- */}
            <Page size="A4">
                <View style={{ padding: "20px" }}>

                    <View style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>

                        <Text style={{ marginTop: "10px", color: "gray", fontSize: "22px", marginTop: "10px" }}>Technical Information</Text>
                    </View>


                    <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', padding: "10px", marginTop: "10px" }}>

                        <View className="col-4" style={{ width: "50%" }}>
                            <Text style={{ marginTop: "20px", fontSize: "14px", color: "blue" }}>Equipment:</Text>
                            <Text style={{ marginTop: "10px" }}>{equipoSeleccionado && equipoSeleccionado.Name}</Text>
                        </View>

                        <View className="col-4" style={{ width: "50%" }}>
                            <Text style={{ marginTop: "20px", fontSize: "14px", color: "blue" }}>Current Working:</Text>
                            <Text style={{ marginTop: "10px" }}>{technicalInformation && technicalInformation.currentWorking}</Text>
                        </View>
                        <Line />

                        <Text>-------------------------------------------------------------------------------------------</Text>

                        <View className="col-4" style={{ width: "50%" }}>
                            <Text style={{ marginTop: "20px", fontSize: "14px", color: "blue" }}>Current Condition:</Text>
                            <Text style={{ marginTop: "10px" }}>{technicalInformation && technicalInformation.CurrentConditions}</Text>
                        </View>

                        <View className="col-4" style={{ width: "50%" }}>
                            <Text style={{ marginTop: "20px", fontSize: "14px", color: "blue" }}>Equipment Type:</Text>
                            <Text style={{ marginTop: "10px" }}>{technicalInformation && technicalInformation.EquipmentType}</Text>
                        </View>

                        <Text>-------------------------------------------------------------------------------------------</Text>

                        <View className="col-4" style={{ width: "50%" }}>
                            <Text style={{ marginTop: "20px", fontSize: "14px", color: "blue" }}>Serial Number:</Text>
                            <Text style={{ marginTop: "10px" }}>{technicalInformation && technicalInformation.SerialNumber}</Text>
                        </View>

                        <View className="col-4" style={{ width: "50%" }}>
                            <Text style={{ marginTop: "20px", fontSize: "14px", color: "blue" }}>Model Number:</Text>
                            <Text style={{ marginTop: "10px" }}>{technicalInformation && technicalInformation.ModelNumber}</Text>
                        </View>

                        <Text>-------------------------------------------------------------------------------------------</Text>

                        <View className="col-4" style={{ width: "50%" }}>
                            <Text style={{ marginTop: "20px", fontSize: "14px", color: "blue" }}>weight:</Text>
                            <Text style={{ marginTop: "10px" }}>{technicalInformation && technicalInformation.Weight}</Text>
                        </View>

                        <View className="col-4" style={{ width: "50%" }}>
                            <Text style={{ marginTop: "20px", fontSize: "14px", color: "blue" }}>OEM:</Text>
                            <Text style={{ marginTop: "10px" }}>{technicalInformation && technicalInformation.OEM}</Text>
                        </View>

                        <Text>-------------------------------------------------------------------------------------------</Text>

                        <View className="col-4" style={{ width: "50%" }}>
                            <Text style={{ marginTop: "20px", fontSize: "14px", color: "blue" }}>Vendor:</Text>
                            <Text style={{ marginTop: "10px" }}>{technicalInformation && technicalInformation.vendor}</Text>
                        </View>

                        <View className="col-4" style={{ width: "50%" }}>
                            <Text style={{ marginTop: "20px", fontSize: "14px", color: "blue" }}>Description:</Text>
                            <Text style={{ marginTop: "10px" }}>{technicalInformation && technicalInformation.Description}</Text>
                        </View>

                        <Text>-------------------------------------------------------------------------------------------</Text>

                    </View>

                    {/* ---------------------------------   Others Technical Information    --------------------------------------------- */}
                    <View style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <Text style={{ marginTop: "10px", color: "gray", fontSize: "18px", marginTop: "10px" }}>Others Technical Information</Text>
                    </View>

                    <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', marginTop: "10px" }}>
                        {
                            equipoSeleccionado.TechnicalSpecification.newTechnicalSpecification.map((elemento) => (
                                <View style={{ width: "50%" }}>
                                    <Text style={{ marginTop: "20px", fontSize: "14px", color: "blue" }}>{`${elemento.Name}:`}</Text>
                                    <Text style={{ marginTop: "10px" }}>{elemento.Value}</Text>

                                    <Text>------------------------------------------</Text>
                                </View>
                            ))
                        }
                    </View>


                </View>
            </Page>


            <Page size="A4">
                <View style={{ padding: "20px" }}>

                    <View style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>

                        <Text style={{ marginTop: "10px", color: "gray", fontSize: "22px", marginTop: "10px" }}>Services Information</Text>
                    </View>

                    <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', padding: "10px", marginTop: "10px" }}>


                        <View className="col-4" style={{ width: "50%" }}>
                            <Text style={{ marginTop: "20px", fontSize: "14px", color: "blue" }}>Date Of Installation:</Text>
                            <Text style={{ marginTop: "10px" }}>{servicesInformation && servicesInformation.DateOfInstallation}</Text>
                        </View>

                        <View className="col-4" style={{ width: "50%" }}>
                            <Text style={{ marginTop: "20px", fontSize: "14px", color: "blue" }}>Date Of Desinstallation:</Text>
                            <Text style={{ marginTop: "10px" }}>{servicesInformation && servicesInformation.DateOfDesintallation}</Text>
                        </View>

                        <Text>-------------------------------------------------------------------------------------------</Text>

                        <View className="col-4" style={{ width: "50%" }}>
                            <Text style={{ marginTop: "20px", fontSize: "14px", color: "blue" }}>Desuse Reason:</Text>
                            <Text style={{ marginTop: "10px" }}>{servicesInformation && servicesInformation.DesuseReason}</Text>
                        </View>

                        <View className="col-4" style={{ width: "50%" }}>
                            <Text style={{ marginTop: "20px", fontSize: "14px", color: "blue" }}>Desinstallation Reason:</Text>
                            <Text style={{ marginTop: "10px" }}>{servicesInformation && servicesInformation.DesinstallationReason}</Text>
                        </View>

                        <Text>-------------------------------------------------------------------------------------------</Text>

                        <View className="col-4" style={{ width: "50%" }}>
                            <Text style={{ marginTop: "20px", fontSize: "14px", color: "blue" }}>Procurement Order:</Text>
                            <Text style={{ marginTop: "10px" }}>{servicesInformation && servicesInformation.ProcurementOrder}</Text>
                        </View>






                    </View>



                </View>
            </Page>







        </Document>
    )
}
