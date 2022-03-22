import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Line,
} from "@react-pdf/renderer";

export const DocPDF = ({
  equipoSeleccionado,
  line,
  operations,
  lineTypes,
  countries,
  bu,
  areas,
  SubArea,
  technicalInformation,
  servicesInformation,
}) => {
  return (
    <Document>
      <Page size="A4">
        <View style={{ padding: "20px" }}>
          <View
            className="col-12"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              id="imagen"
              className="card animate__animated animate__fadeInLeft"
              style={{ maxWidth: 380, maxHeight: 300 }}
            >
              {equipoSeleccionado.img ? (
                <Image
                  src={equipoSeleccionado.img}
                  style={{ width: "380px", backgroundColor: "#F1F1F1" }}
                />
              ) : null}
            </View>

            <Text
              style={{
                marginTop: "10px",
                fontSize: "16px",
                color: "#6200EE",
                fontSize: "22px",
                marginTop: "10px",
                fontSize: "18px",
              }}
            >
              Location
            </Text>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              padding: "10px",
            }}
          >
            <View className="col-6" style={{ width: "50%" }}>
              <Text
                style={{
                  marginTop: "20px",
                  fontSize: "14px",
                  color: "#8297C9",
                }}
              >
                Line Number:
              </Text>
              <Text
                style={{
                  marginTop: "10px",
                  fontSize: "16px",
                }}
              >
                {line && line.number}
              </Text>
            </View>

            <View className="col-6" style={{ width: "50%" }}>
              <Text
                style={{
                  marginTop: "20px",
                  fontSize: "14px",
                  color: "#8297C9",
                }}
              >
                Plant:
              </Text>
              <Text
                style={{
                  marginTop: "10px",
                  fontSize: "16px",
                }}
              >
                {operations && operations.Name}
              </Text>
            </View>

            <div
              style={{
                width: "100%",
                backgroundColor: "grey",
                height: 1,
                marginTop: 5,
                marginBottom: 5,
              }}
            ></div>

            <View className="col-6" style={{ width: "50%" }}>
              <Text
                style={{
                  marginTop: "20px",
                  fontSize: "14px",
                  color: "#8297C9",
                }}
              >
                Line Type:
              </Text>
              <Text
                style={{
                  marginTop: "10px",
                  fontSize: "16px",
                }}
              >
                {lineTypes && lineTypes.Name}
              </Text>
            </View>

            <View className="col-6" style={{ width: "50%" }}>
              <Text
                style={{
                  marginTop: "20px",
                  fontSize: "14px",
                  color: "#8297C9",
                }}
              >
                Country:
              </Text>
              <Text style={{ marginTop: "10px", fontSize: "16px" }}>
                {countries && countries.Name}
              </Text>
            </View>

            <div
              style={{
                width: "100%",
                backgroundColor: "grey",
                height: 1,
                marginTop: 5,
                marginBottom: 5,
              }}
            ></div>

            <View className="col-6" style={{ width: "50%" }}>
              {/* <Text>---------------------</Text> */}
              <Text
                style={{
                  marginTop: "20px",
                  fontSize: "14px",
                  color: "#8297C9",
                }}
              >
                BU:
              </Text>
              <Text style={{ marginTop: "10px", fontSize: "16px" }}>
                {bu && bu.Name}
              </Text>
            </View>

            <View className="col-6" style={{ width: "50%" }}>
              {/* <Text>---------------------</Text> */}
              <Text
                style={{
                  marginTop: "20px",
                  fontSize: "14px",
                  color: "#8297C9",
                }}
              >
                Area:
              </Text>
              <Text style={{ marginTop: "10px", fontSize: "16px" }}>
                {areas && areas.Name}
              </Text>
            </View>

            <div
              style={{
                width: "100%",
                backgroundColor: "grey",
                height: 1,
                marginTop: 5,
                marginBottom: 5,
              }}
            ></div>

            <View className="col-6" style={{ width: "50%" }}>
              {/* <Text>---------------------</Text> */}
              <Text
                style={{
                  marginTop: "20px",
                  fontSize: "14px",
                  color: "#8297C9",
                }}
              >
                Subarea:
              </Text>
              <Text style={{ marginTop: "10px", fontSize: "16px" }}>
                {SubArea && SubArea.Name}
              </Text>
            </View>

            <View className="col-6">
              <Text
                style={{
                  marginTop: "20px",
                  fontSize: "14px",
                  color: "#8297C9",
                }}
              >
                Plant Mail:
              </Text>
              <Text style={{ marginTop: "10px", fontSize: "16px" }}>
                {equipoSeleccionado && equipoSeleccionado.code}
              </Text>
            </View>

            <div
              style={{
                width: "100%",
                backgroundColor: "grey",
                height: 1,
                marginTop: 5,
                marginBottom: 5,
              }}
            ></div>
          </View>
        </View>
      </Page>

      {/* -----------------------------       Techinical Information      -------------------------- */}
      <Page size="A4">
        <View style={{ padding: "20px" }}>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                marginTop: "10px",
                fontSize: "16px",
                color: "#6200EE",
                fontSize: "22px",
                marginTop: "10px",
                fontSize: "18px",
              }}
            >
              Technical Information
            </Text>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              padding: "10px",
              marginTop: "10px",
              fontSize: "16px",
            }}
          >
            <View className="col-4" style={{ width: "50%" }}>
              <Text
                style={{
                  marginTop: "20px",
                  fontSize: "14px",
                  color: "#8297C9",
                }}
              >
                Equipment:
              </Text>
              <Text style={{ marginTop: "10px", fontSize: "16px" }}>
                {equipoSeleccionado && equipoSeleccionado.Name}
              </Text>
            </View>

            <View className="col-4" style={{ width: "50%" }}>
              <Text
                style={{
                  marginTop: "20px",
                  fontSize: "14px",
                  color: "#8297C9",
                }}
              >
                Current Working:
              </Text>
              <Text style={{ marginTop: "10px", fontSize: "16px" }}>
                {technicalInformation && technicalInformation.currentWorking}
              </Text>
            </View>
            <Line />

            <div
              style={{
                width: "100%",
                backgroundColor: "grey",
                height: 1,
                marginTop: 5,
                marginBottom: 5,
              }}
            ></div>

            <View className="col-4" style={{ width: "50%" }}>
              <Text
                style={{
                  marginTop: "20px",
                  fontSize: "14px",
                  color: "#8297C9",
                }}
              >
                Current Condition:
              </Text>
              <Text style={{ marginTop: "10px", fontSize: "16px" }}>
                {technicalInformation && technicalInformation.CurrentConditions}
              </Text>
            </View>

            <View className="col-4" style={{ width: "50%" }}>
              <Text
                style={{
                  marginTop: "20px",
                  fontSize: "14px",
                  color: "#8297C9",
                }}
              >
                Equipment Type:
              </Text>
              <Text style={{ marginTop: "10px", fontSize: "16px" }}>
                {technicalInformation && technicalInformation.EquipmentType}
              </Text>
            </View>

            <div
              style={{
                width: "100%",
                backgroundColor: "grey",
                height: 1,
                marginTop: 5,
                marginBottom: 5,
              }}
            ></div>

            <View className="col-4" style={{ width: "50%" }}>
              <Text
                style={{
                  marginTop: "20px",
                  fontSize: "14px",
                  color: "#8297C9",
                }}
              >
                Serial Number:
              </Text>
              <Text style={{ marginTop: "10px", fontSize: "16px" }}>
                {technicalInformation && technicalInformation.SerialNumber}
              </Text>
            </View>

            <View className="col-4" style={{ width: "50%" }}>
              <Text
                style={{
                  marginTop: "20px",
                  fontSize: "14px",
                  color: "#8297C9",
                }}
              >
                Model Number:
              </Text>
              <Text style={{ marginTop: "10px", fontSize: "16px" }}>
                {technicalInformation && technicalInformation.ModelNumber}
              </Text>
            </View>

            <div
              style={{
                width: "100%",
                backgroundColor: "grey",
                height: 1,
                marginTop: 5,
                marginBottom: 5,
              }}
            ></div>

            <View className="col-4" style={{ width: "50%" }}>
              <Text
                style={{
                  marginTop: "20px",
                  fontSize: "14px",
                  color: "#8297C9",
                }}
              >
                weight:
              </Text>
              <Text style={{ marginTop: "10px", fontSize: "16px" }}>
                {technicalInformation && technicalInformation.Weight}
              </Text>
            </View>

            <View className="col-4" style={{ width: "50%" }}>
              <Text
                style={{
                  marginTop: "20px",
                  fontSize: "14px",
                  color: "#8297C9",
                }}
              >
                OEM:
              </Text>
              <Text style={{ marginTop: "10px", fontSize: "16px" }}>
                {technicalInformation && technicalInformation.OEM}
              </Text>
            </View>

            <div
              style={{
                width: "100%",
                backgroundColor: "grey",
                height: 1,
                marginTop: 5,
                marginBottom: 5,
              }}
            ></div>

            <View className="col-4" style={{ width: "50%" }}>
              <Text
                style={{
                  marginTop: "20px",
                  fontSize: "14px",
                  color: "#8297C9",
                }}
              >
                Vendor:
              </Text>
              <Text style={{ marginTop: "10px", fontSize: "16px" }}>
                {technicalInformation && technicalInformation.vendor}
              </Text>
            </View>

            <View className="col-4" style={{ width: "50%" }}>
              <Text
                style={{
                  marginTop: "20px",
                  fontSize: "14px",
                  color: "#8297C9",
                }}
              >
                Description:
              </Text>
              <Text style={{ marginTop: "10px", fontSize: "16px" }}>
                {technicalInformation && technicalInformation.Description}
              </Text>
            </View>

            <div
              style={{
                width: "100%",
                backgroundColor: "grey",
                height: 1,
                marginTop: 5,
                marginBottom: 5,
              }}
            ></div>
          </View>

          {/* ---------------------------------   Others Technical Information    --------------------------------------------- */}
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                marginTop: "10px",
                fontSize: "16px",
                color: "#6200EE",
                fontSize: "22px",
                marginTop: "10px",
                fontSize: "18px",
              }}
            >
              Others Technical Information
            </Text>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              marginTop: "10px",
              fontSize: "16px",
            }}
          >
            {equipoSeleccionado.TechnicalSpecification.newTechnicalSpecification.map(
              (elemento) => (
                <View style={{ width: "50%" }}>
                  <Text
                    style={{
                      marginTop: "20px",
                      fontSize: "14px",
                      color: "#8297C9",
                    }}
                  >{`${elemento.Name}:`}</Text>
                  <Text style={{ marginTop: "10px", fontSize: "16px" }}>
                    {elemento.Value}
                  </Text>

                  <hr />
                </View>
              )
            )}
          </View>
        </View>
      </Page>

      <Page size="A4">
        <View style={{ padding: "20px" }}>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                marginTop: "10px",
                fontSize: "16px",
                color: "#6200EE",
                fontSize: "22px",
                marginTop: "10px",
                fontSize: "18px",
              }}
            >
              Services Information
            </Text>
          </View>

          <View
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              padding: "10px",
              marginTop: "10px",
              fontSize: "16px",
            }}
          >
            <View className="col-4" style={{ width: "50%" }}>
              <Text
                style={{
                  marginTop: "20px",
                  fontSize: "14px",
                  color: "#8297C9",
                }}
              >
                Date Of Installation:
              </Text>
              <Text style={{ marginTop: "10px", fontSize: "16px" }}>
                {servicesInformation && servicesInformation.DateOfInstallation}
              </Text>
            </View>

            <View className="col-4" style={{ width: "50%" }}>
              <Text
                style={{
                  marginTop: "20px",
                  fontSize: "14px",
                  color: "#8297C9",
                }}
              >
                Date Of Desinstallation:
              </Text>
              <Text style={{ marginTop: "10px", fontSize: "16px" }}>
                {servicesInformation &&
                  servicesInformation.DateOfDesintallation}
              </Text>
            </View>

            <div
              style={{
                width: "100%",
                backgroundColor: "grey",
                height: 1,
                marginTop: 5,
                marginBottom: 5,
              }}
            ></div>

            <View className="col-4" style={{ width: "50%" }}>
              <Text
                style={{
                  marginTop: "20px",
                  fontSize: "14px",
                  color: "#8297C9",
                }}
              >
                Desuse Reason:
              </Text>
              <Text style={{ marginTop: "10px", fontSize: "16px" }}>
                {servicesInformation && servicesInformation.DesuseReason}
              </Text>
            </View>

            <View className="col-4" style={{ width: "50%" }}>
              <Text
                style={{
                  marginTop: "20px",
                  fontSize: "14px",
                  color: "#8297C9",
                }}
              >
                Desinstallation Reason:
              </Text>
              <Text style={{ marginTop: "10px", fontSize: "16px" }}>
                {servicesInformation &&
                  servicesInformation.DesinstallationReason}
              </Text>
            </View>

            <div
              style={{
                width: "100%",
                backgroundColor: "grey",
                height: 1,
                marginTop: 5,
                marginBottom: 5,
              }}
            ></div>

            <View className="col-4" style={{ width: "50%" }}>
              <Text
                style={{
                  marginTop: "20px",
                  fontSize: "14px",
                  color: "#8297C9",
                }}
              >
                Procurement Order:
              </Text>
              <Text style={{ marginTop: "10px", fontSize: "16px" }}>
                {servicesInformation && servicesInformation.ProcurementOrder}
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};
