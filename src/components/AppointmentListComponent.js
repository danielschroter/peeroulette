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
import Grid from "@material-ui/core/Grid";

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




    return (
        <div>
            <AppointmentListRowHeaderComponent/>
            {props.noRecommendations ?
                (<div><Box pt={3}>
                    <Paper style={{backgroundColor: "rgba(255,255,255,0.79)"}}>
                        <Box p={3}>
                            <Typography> Unfortunately it seems that there are no upcomming talks matching your interests.. You may want to check the calendar on the right :)</Typography>
                        </Box>
                    </Paper>
                </Box></div>)
                :
                <div>{props.appointments.map(elem => <AppointmentListRowComponent elem={elem}/>)}</div>}

        </div>
    );
}

// attributes of props and their type
AppointmentListComponent.propTypes = {
};

export default AppointmentListComponent;
