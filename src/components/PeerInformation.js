import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    Button,
    TextField,
    Grid,
    Typography,
    Paper,
} from "@material-ui/core";
import CustomTextField from "./CustomTextField";
import DetailsArea from "./DetailsArea";
import PropTypes from "prop-types";
import UserService from "../services/UserService";
import CorporateFilterEmployeeComponent from "./CorporateFilterEmployeeComponent";
import Box from "@material-ui/core/Box";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const useStyles = makeStyles((theme) => ({
}));

/**
 * For register new users
 * @param {props} props
 */
function PeerInformation(props) {
    const classes = useStyles();

    // user data
    const [username, setUsername] = React.useState("");
    const [city, setCity] = React.useState("");
    const [university, setUniversity] = React.useState("");
    const [organization, setOrganization] = React.useState("");



    // extract all the user data from the backend
    const extractUser = () => {
        if (!props.user) {
            return;
        }

        // UserService.getUser(props.user._id).then(function(userBackend) {
        UserService.getUser(props.peer).then(function(userBackend) {
            setUsername(userBackend.username);
            setCity(userBackend.city);
            setUniversity(userBackend.university);
            setOrganization(userBackend.organization);
        });
    };


    useEffect(() => {
        extractUser();

    }, [props.user]);


    return (
        <div>
            <Paper elevation={0} style={{ padding: 20, color:"#ffff", backgroundColor:'rgba(0,0,0,0)'}}>
                {/*<Typography variant="h4">{username}</Typography>*/}
                <Typography variant="h5">Information about {username}</Typography>
                <ul style={{"fontSize":"17px"}}>
                    <li>{city}</li>
                    <li>{university}</li>
                    <li>{organization}</li>
                </ul>
                <div style={{display:"flex"}}>
                <Typography variant="h5">Your Settings:  &nbsp;</Typography>
                    <Box pl={10}><CorporateFilterEmployeeComponent user={props.user}/></Box>
                </div>
            </Paper>
        </div>
    );
}

// attributes of props and their type
PeerInformation.propTypes = {
    user: PropTypes.object,
    onGetUser: PropTypes.func,
};

// withRouter() allows accsing the necessary functionality to navigate from this component
export default PeerInformation;
