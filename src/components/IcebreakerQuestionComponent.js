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
    const [icebreakerQuestions, setIcebreakerQuestions] = React.useState([""]);


    const socket = useRef();

    const handleChange = async () => {
        let newIndex = 0;
        if (questionIndex !== icebreakerQuestions.length-1) {
            newIndex = questionIndex + 1
        }
        setQuestionIndex(newIndex)

        sendMessage("send question index",
            {index: newIndex, receiverId: props.peer});
    }

    const sendMessage = async (label, messageBody) => {
        const myObj = {
            body: messageBody,
            id: props.user._id,
        };
        socket.current.emit(label, myObj);
    }

    const extractIcebreakerQuestions = async () => {
        let icebreakerQuestions = await UserService.getIcebreakerQuestions();

        if (icebreakerQuestions !== undefined) {
            setIcebreakerQuestions(icebreakerQuestions[0].icebreakerQuestions)
        }
        console.warn("user: " + props.user._id)
        console.warn("peer: " + props.peer)
    }

    useEffect(() => {
        extractIcebreakerQuestions();

        socket.current = io("/");

        socket.current.emit("addUser", props.user._id);

    }, [props.user]);



    useEffect(() => {
        socket.current.on("send question index", message => {
            console.log("Question has been sent" + message);
            setQuestionIndex((message.body.index))
            console.warn(message.body.index)
        });

    }, []);


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
                    {icebreakerQuestions[questionIndex]}
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
    questionTitle: PropTypes.string,
    user: PropTypes.object,
    user: PropTypes.object,
};

// withRouter() allows accsing the necessary functionality to navigate from this component
export default IcebreakerQuestionComponent;