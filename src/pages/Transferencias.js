import React, { useState } from "react";
import Head from "../components/login/Head";
import { Transfer } from "./components/Transfer";
import NewTransfer from "./components/NewTransfer";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { DataGrid, esES } from "@mui/x-data-grid";

export const Transferencias = () => {
  const [mostrarMenus, setmostrarMenus] = useState(true);
  const [light, setLight] = useState(false);

  const theme = createTheme(
    {
      palette: {
        type: light ? "light" : "dark",

        primary: {
          main: "#B3C8FC",
          light: "#E6FBFF",
          dark: "#8297C9",
        },
        secondary: {
          main: "#6200EE",
          light: "#8F6CFF",
          dark: "#14149A",
        },
        background: {
          main: "#3F3857",
          light: "#FFFFFF",
          dark: "#3F3857",
        },
        alert: {
          main: "#C60055",
        },
      },
    },
    esES
  );
  return (
    <ThemeProvider theme={theme}>
      <Head setLight={setLight} light={light} />

      {mostrarMenus ? (
        <Transfer setmostrarMenus={setmostrarMenus} light={light} /> //---- Menu principal de Transferencias
      ) : (
        <NewTransfer setmostrarMenus={setmostrarMenus} light={light} />
      )}
    </ThemeProvider>
  );
};
