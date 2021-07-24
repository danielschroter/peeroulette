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
import AppointmentListRowHeaderComponent from "./AppointmentListRowHeaderComponent";

// a material ui function. With this way of styling you have the style classes of this component in one place
// and you can access the global theme of the application
const useStyles = makeStyles((theme) => ({
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
        let ret = await AppointmentService.getAppointments(props.user._id);
        let apps = ret.appointments;
        let mapping = ret.mapping;
        setAppointments(apps);
    }

    useEffect(()=>{

        extractAppointments();



    }, [props.user]);


    return (
        <div>
            <AppointmentListRowHeaderComponent/>
            {appointments.map(elem => <AppointmentListRowComponent elem={elem}/>)}
        </div>
    )
}

// attributes of props and their type
AppointmentListComponent.propTypes = {
};

export default AppointmentListComponent;
