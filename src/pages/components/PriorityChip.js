import React from "react";
import Chip from "@mui/material/Chip";
import PriorityIcon from "./PriorityIcon";

const PriorityChip = ({ params }) => {
    return (
        <>
            {
                // [null, "NO DATA AVAILABLE", ""].includes(params.row.TechnicalSpecification.SerialNumber) ||
                //     [null, "NO DATA AVAILABLE", ""].includes(params.row.TechnicalSpecification.ModelNumber) ||
                
                [null, "NO DATA AVAILABLE", ""].includes(params.row.TechnicalSpecification.CurrendConditions) ||
                    [null, "NO DATA AVAILABLE", ""].includes(params.row.TechnicalSpecification.EquipmentType) ||
                    [null, "NO DATA AVAILABLE", ""].includes(params.row.TechnicalSpecification.currentWorking) ||
                    [null, "NO DATA AVAILABLE", ""].includes(params.row.TechnicalSpecification.Description) ||
                    [null, "NO DATA AVAILABLE", ""].includes(params.row.Name) ||
                    [null, "NO DATA AVAILABLE", ""].includes(params.row.FinancialInformation.Activo_fijo) ||
                    [null, "NO DATA AVAILABLE", ""].includes(params.row.FinancialInformation.Valor_Contable) ||
                    [null, "NO DATA AVAILABLE", ""].includes(params.row.FinancialInformation.Moneda) ||
                    [null, "NO DATA AVAILABLE", ""].includes(params.row.Procedencia.areas.operations.countries.bu.Name) ||
                    [null, "NO DATA AVAILABLE", ""].includes(params.row.Procedencia.areas.operations.countries.Name) ||
                    [null, "NO DATA AVAILABLE", ""].includes(params.row.Procedencia.areas.operations.Name) ||
                    [null, "NO DATA AVAILABLE", ""].includes(params.row.Procedencia.areas.Name) ||
                    [null, "NO DATA AVAILABLE", ""].includes(params.row.Procedencia.areas.SubArea.Name) ?
                    <Chip
                        size="small"
                        sx={{
                            backgroundColor: "transparent",
                            color: "#E25C5C",
                            fontWeight: 700,
                        }}
                        icon={<PriorityIcon color="Incompleto" />}
                        label={"Completar"}
                    />
                    :
                    <Chip
                        size="small"
                        sx={{
                            backgroundColor: "transparent",
                            color: "#87AADF",
                            fontWeight: 700,
                        }}
                        icon={<PriorityIcon color="Completo" />}
                        label={"Listo"}
                    />
            }
        </>
    );
};

export default PriorityChip;
