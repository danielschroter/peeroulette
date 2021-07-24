import React, {useState, useEffect, useRef, Component} from "react";
// needed in tutorial
import io from "socket.io-client";

// needed for wheel
import {Wheel} from 'react-custom-roulette'

// needed for table
import Table from 'react-bootstrap/Table'

import {makeStyles} from "@material-ui/core/styles";
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

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// needed to rescale the wheel
import AutoScale from 'react-auto-scale';


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: 'rgba(0,0,0,0)',
    },
    roundButton: {
        backgroundColor: "#111111",
        border: "none",
        color: "#fff",
        padding: "20px",
        textAlign: "center",
        textDecoration: "none",
        display: "inlineBlock",
        fontSize: "15px",
        margin: "4px 2px",
    },
}));



/**
 * For register new users
 * @param {props} props
 */
function IcebreakerQuestionComponent(props) {

    const classes = useStyles();

    const [questionIndex, setQuestionIndex] = React.useState(0);

    useEffect(() => {

    }, [questionIndex]);

    const handleChange = async () => {
        let newIndex = Math.floor(Math.random() * props.icebreakerQuestions.length);
        setQuestionIndex(newIndex)
    }

    return (
        <div>
            <Paper elevation={0} style={{
                padding: 20, "backgroundColor": "rgba(0,0,0,0)",
            }}>
                <Typography variant="h5" style={{"color": "white"}}>
                    {props.questionTitle}
                </Typography>
            </Paper>

            <Paper elevation={0} style={{
                padding: 20, "backgroundColor": "rgba(0,0,0,0)",
            }}>
                <Typography variant="h5" style={{"color": "white"}}>
                    {props.icebreakerQuestions[questionIndex]}
                </Typography>
            </Paper>

            <Paper elevation={0} style={{
                padding: 20, "backgroundColor": "rgba(0,0,0,0)",
            }}>
                <Button
                onClick={handleChange}
                variant="contained"
                color="primary"
                className={classes.deleteProfileButton}
                style={{"backgroundColor": "#ED7C31"}}
            >
                Next Question
            </Button>
            </Paper>
        </div>
    );
}

// attributes of props and their type
IcebreakerQuestionComponent.propTypes = {
    icebreakerQuestions: PropTypes.array,
    questionTitle: PropTypes.string,
};

// withRouter() allows accsing the necessary functionality to navigate from this component
export default IcebreakerQuestionComponent;