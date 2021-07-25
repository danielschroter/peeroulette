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
import MovieListRow from "./MovieListRow";
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

    paper:{
        backgroundColor: "rgba(255,255,255,0.9)",

    },
    headerText:{
        fontSize: "1.4rem",
        fontWeight: "bold",
    }
}));


/**
 * For presenting and changing movies
 * @param {props} props
 */
function AppointmentListRowHeaderComponent(props) {
    // with this you can access the above defiend style classes
    const classes = useStyles();

    return (

        <Box pt={3}>
            <Paper className={classes.paper}>
                <Box p={3}>
                    <Grid container>
                        <Grid item xs={2}>
                            <Typography className={classes.headerText}>Titel</Typography>
                        </Grid>
                        <Grid item xs={5}>
                            <Typography className={classes.headerText}>Tags</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography className={classes.headerText}>Start Date</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography className={classes.headerText}>End Date</Typography>
                        </Grid>
                    </Grid>


                </Box>
            </Paper>
        </Box>
    )
}

// attributes of props and their type
AppointmentListRowHeaderComponent.propTypes = {};

export default AppointmentListRowHeaderComponent;
