import React, { useState } from "react";
import {
  Paper,
  Card,
  Typography,
  makeStyles,
  Button,
  ThemeProvider,
  createTheme,
} from "@material-ui/core";
import icono from "../assets/icono.png";
const useStyles = makeStyles((theme) => ({
  // root: {
  //     backgroundColor: '#fdfdff'
  // },
  // pageHeader:{
  //     padding:theme.spacing(4),
  //     display:'flex',
  //     marginBottom:theme.spacing(2)
  // },
  // pageIcon:{
  //     display:'inline-block',
  //     padding:theme.spacing(2),
  //     color:'#3c44b1'
  // },
  pageTitle: {
    color: theme.palette.primary.main,
    paddingTop: theme.spacing(2),
    fontFamily: "Roboto",
    paddingLeft: theme.spacing(4),
    "& .MuiTypography-subtitle2": {
      opacity: "0.6",
      backgroundColor: theme.palette.type == "dark" ? "#3B364E" : "#FFFFFF",
    },
    backgroundColor: theme.palette.type == "dark" ? "#3B364E" : "#FFFFFF",
  },
}));

export default function PageHeader(props) {
  const classes = useStyles();
  const { title, subTitle, contador, icon } = props;
  const [light, setLight] = useState(false);

  const theme = createTheme({
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
        main: "#f4f5fd",
        light: "#8F6CFF",
        dark: "#14149A",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Paper elevation={0} square className={classes.root}>
        <div className={classes.pageHeader}>
          {/* <Card className={classes.pageIcon}>
                    {icon}
                    <img src={icono} style={{ width:40}} />
                </Card> */}
          <div className={classes.pageTitle}>
            <Typography
              variant="h5"
              component="div"
              style={{ fontWeight: "400", fontSize: 24 }}
            >
              {title}
            </Typography>
            <Typography
              className={"mt-3"}
              style={{ fontSize: 20 }}
              variant="subtitle2"
              component="div"
            >
              {subTitle}
            </Typography>
            <Typography
              className={"mt-3"}
              style={{ fontSize: 15 }}
              variant="subtitle2"
              component="div"
            >
              {contador}
            </Typography>
          </div>
        </div>
      </Paper>
    </ThemeProvider>
  );
}
