import * as React from "react";
import Box from "@mui/material/Box";
import { createTheme } from "@mui/material/styles";
import { WbSunny } from "@material-ui/icons";
import Brightness2Icon from "@material-ui/icons/Brightness2";
import Switch from "@mui/material/Switch";

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

export default function SwitchModeButton() {
  const label = { inputProps: { "aria-label": "Switch demo" } };
  const colorMode = React.useContext(ColorModeContext);
  const style = createTheme({
    icons: {
      color: "#666666",
    },
  });

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        color: "text.primary",
        borderRadius: 1,
        p: 3,
      }}
    >
      <Brightness2Icon style={style.icons} />
      <Switch {...label} defaultChecked onClick={colorMode.toggleColorMode} />
      <WbSunny style={style.icons} />
    </Box>
  );
}
