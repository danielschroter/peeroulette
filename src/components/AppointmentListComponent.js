import React from "react";
import { makeStyles } from "@material-ui/core/styles";
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
import AppointmentListRowComponent from "./AppointmentListRowComponent";

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
}));


/**
 * For presenting and changing movies
 * @param {props} props
 */
function AppointmentListComponent(props) {
    // with this you can access the above defiend style classes
    const classes = useStyles();

    const [orderBy, setOrderBy] = React.useState();
    const [order, setOrder] = React.useState();
    const [appointments, setAppointments] = React.useState([]);

    const extractAppointments = async() => {
        let ret = await AppointmentService.getAppointments();
        let apps = ret.appointments;
        let mapping = ret.mapping;
        setAppointments(apps);
    }

    useEffect(()=>{

        extractAppointments();



    }, [props.user]);


    return (
        <div>
            <Typography>Our Recommendation based on your Interests</Typography>
            {appointments.map(elem => <AppointmentListRowComponent elem={elem}/>)}

        </div>
    )
}

// attributes of props and their type
AppointmentListComponent.propTypes = {
};

export default AppointmentListComponent;
