import React from 'react'
import { Paper, Card, Typography, makeStyles, Button } from '@material-ui/core'
import icono from '../assets/icono.png';
const useStyles = makeStyles(theme => ({
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
    pageTitle:{
        color: theme.palette.primary.main,
        paddingLeft:theme.spacing(4),
        '& .MuiTypography-subtitle2':{
            opacity:'0.6'
        }
    }
}))

export default function PageHeader(props) {

    const classes = useStyles();
    const { title, subTitle, contador, icon } = props;
    return (
        <Paper elevation={0} square className={classes.root}>
            <div className={classes.pageHeader}>
                {/* <Card className={classes.pageIcon}>
                    {icon}
                    <img src={icono} style={{ width:40}} />
                </Card> */}
                <div className={classes.pageTitle}>
                    <Typography
                        variant="h6"
                        component="div"
                        style={{fontWeight: '600', fontSize: 30}}
                        >
                        {title}</Typography>
                    <Typography
                        // className={"mt-3"}
                        style={{fontSize: 20}}
                        variant="subtitle2"
                        component="div">
                        {subTitle}</Typography>
                    <Typography
                        // className={"mt-3"}
                        style={{fontSize: 15}}
                        variant="subtitle2"
                        component="div">
                        {contador}</Typography>
                </div>
            </div>
        </Paper>
    )
}
