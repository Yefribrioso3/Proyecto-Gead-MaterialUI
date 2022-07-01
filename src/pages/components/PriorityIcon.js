import React from "react";
import SvgIcon from "@mui/material/SvgIcon";

const PriorityIcon = ({ color }) => {
  return (
    <SvgIcon
      style={{
        borderRadius: "15rem",
        padding: ".2rem",
        width: "1rem",
        height: "1rem",
        background: color.includes("Completo")
          ? "#87AADF"
          : color.includes("Incompleto") || color.includes("Muy")
          ? "#E25C5C"
          : "#BA57E8",
      }}
      width="5"
      height="5"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
    </SvgIcon>
  );
};
export default PriorityIcon;
