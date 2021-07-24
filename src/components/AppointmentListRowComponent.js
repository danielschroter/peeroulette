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
    movieListRoot: {
        padding: theme.spacing(2),
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    movieListHeader: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        maxWidth: "1000px",
    },
    headerDivider: {
        margin: theme.spacing(2),
    },
    addMovieButton: {
        margin: theme.spacing(2),
    },
    movieListPaper: {
        width: "1000px",
    },
    image: {
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[2],
    },
    row: {
        display: "flex",
        justifyContent: "center",
    }
}));


/**
 * For presenting and changing movies
 * @param {props} props
 */
function AppointmentListRowComponent(props) {
    // with this you can access the above defiend style classes
    const classes = useStyles();

    return (

        <Box pt={3}>
            <Paper style={{backgroundColor: "rgba(255,255,255,0.79)"}}>
                <Box p={3}>
                    <Grid container>
                        <Grid item xs={2}>

                            {props.elem.title}

                        </Grid>
                        <Grid item xs={5}>
                            {props.elem.interests.map(i => <span>{i} </span>)}
                        </Grid>
                        <Grid item xs={2}>
                            {props.elem.startDate}
                        </Grid>
                        <Grid item xs={2}>
                            {props.elem.endDate}
                        </Grid>
                        <Grid item xs={1}>
                            {
                                props.elem.link ?
                                    (
                                        <Button variant="outlined" color="primary" href={props.elem.link.split("3000")[1]}>Join</Button>
                                    ):
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
