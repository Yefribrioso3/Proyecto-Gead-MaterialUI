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


                        <Text style={{ marginTop: "10px", color: "gray", fontSize: "22px", marginTop: "10px" }}>Location</Text>

                    </View>



                    <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', padding: "10px" }}>


                        <View className="col-6" style={{ width: "50%" }}>
                            <Text style={{ marginTop: "20px", fontSize: "14px", color: "blue" }}>Line Number:</Text>
                            <Text style={{ marginTop: "10px" }}>{line && line.number}</Text>
                        </View>

                        <View className="col-6" style={{ width: "50%" }}>
                            <Text style={{ marginTop: "20px", fontSize: "14px", color: "blue" }}>Plant:</Text>
                            <Text style={{ marginTop: "10px" }}> {operations && operations.Name}</Text>


                        </View>

                        <Text>-------------------------------------------------------------------------------------------</Text>


                        <View className="col-6" style={{ width: "50%" }}>
                            {/* <Text>---------------------</Text> */}
                            <Text style={{ marginTop: "20px", fontSize: "14px", color: "blue" }}>Line Type:</Text>
                            <Text style={{ marginTop: "10px" }}>{lineTypes && lineTypes.Name}</Text>
                            {/* <Text>---------------------</Text> */}

                        </View>

                        <View className="col-6" style={{ width: "50%" }}>
                            {/* <Text>---------------------</Text> */}
                            <Text style={{ marginTop: "20px", fontSize: "14px", color: "blue" }}>Country:</Text>
                            <Text style={{ marginTop: "10px" }}>{countries && countries.Name}</Text>
                            {/* <Text>---------------------</Text> */}


                            {/* <Text className="text-danger">*</Text> */}

                        </View>

                        <Text>-------------------------------------------------------------------------------------------</Text>


                        <View className="col-6" style={{ width: "50%" }}>
                            {/* <Text>---------------------</Text> */}
                            <Text style={{ marginTop: "20px", fontSize: "14px", color: "blue" }}>BU:</Text>
                            <Text style={{ marginTop: "10px" }}>{bu && bu.Name}</Text>
                            {/* <Text>---------------------</Text> */}


                        </View>

                        <View className="col-6" style={{ width: "50%" }}>
                            {/* <Text>---------------------</Text> */}
                            <Text style={{ marginTop: "20px", fontSize: "14px", color: "blue" }}>Area:</Text>
                            <Text style={{ marginTop: "10px" }}>{areas && areas.Name}</Text>
                            {/* <Text>---------------------</Text> */}

                        </View>

                        <Text>-------------------------------------------------------------------------------------------</Text>


                        <View className="col-6" style={{ width: "50%" }}>
                            {/* <Text>---------------------</Text> */}
                            <Text style={{ marginTop: "20px", fontSize: "14px", color: "blue" }}>Subarea:</Text>
                            <Text style={{ marginTop: "10px" }}>{SubArea && SubArea.Name}</Text>
                            {/* <Text>---------------------</Text> */}

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
