import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {
    Button,
    Divider,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    TableSortLabel,
    TablePagination,
} from "@material-ui/core";
import PropTypes from "prop-types";
import {useEffect} from "react";
import AppointmentService from "../services/AppointmentService";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Link from "react-router-dom/Link";


// a material ui function. With this way of styling you have the style classes of this component in one place
// and you can access the global theme of the application

const useStyles = makeStyles((theme) => ({

    row: {
        display: "flex",
        justifyContent: "center",
    },
    appointmentRowText: {
        fontSize: "1rem",
        fontWeight: "bold",
    }
}));


/**
 * For presenting and changing movies
 * @param {props} props
 */
function AppointmentListRowComponent(props) {
    // with this you can access the above defiend style classes
    const classes = useStyles();

    const convertDate = (date) => {
        const elems = date.split("-");
        const year = elems[0];
        const month = elems[1];

        const help = elems[2].split("T");
        const day = help[0];

        const times = help[1].split(":");
        const hours = times[0];
        var pm = "";
        if(hours.charAt(0) == "1"){
            pm = "pm";
        }else{
            pm = "am";
        }
        const minutes = times[1];

        return day + "-" + month + "-" + year + ", " + hours.charAt(1) + ":" + minutes + " " + pm
    }

    return (

        <Box pt={3}>
            <Paper style={{backgroundColor: "rgba(255,255,255,0.79)"}}>
                <Box p={3}>
                    <Grid container>
                        <Grid item xs={2}>
                            <Typography className={classes.appointmentRowText}>{props.elem.title}</Typography>
                        </Grid>
                        <Grid item xs={5}>
                            <Typography className={classes.appointmentRowText}>{props.elem.interests.map(i => <span>{i} </span>)}</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography className={classes.appointmentRowText}>{props.elem.startDate ? (<div>{convertDate(props.elem.startDate)}</div>) : null} </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography className={classes.appointmentRowText}>{props.elem.endDate ? (<div>{convertDate(props.elem.endDate)}</div>) : null} </Typography>
                        </Grid>
                        <Grid item xs={1}>
                            {
                                props.elem.link ?
                                    (
                                        <Button variant="contained" color="primary"
                                                href={props.elem.link.split("3000")[1]}>Join</Button>
                                    ) :
                                    null
                            }
                        </Grid>
                    </Grid>

                </Box>
            </Paper>
        </Box>
    )
}

// attributes of props and their type
AppointmentListRowComponent.propTypes = {};

export default AppointmentListRowComponent;
