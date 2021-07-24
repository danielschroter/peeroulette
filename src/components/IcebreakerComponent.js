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
import IcebreakerQuestionComponent from './IcebreakerQuestionComponent';


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

const tmpQuestions = ["The zombie apocalypse is coming, who are 3 people you want on your team?\n",
    "What’s the best piece of advice you’ve ever been given?",
    "When you die, what do you want to be remembered for?"];

/**
 * For register new users
 * @param {props} props
 */
function IcebreakerComponent(props) {

    const [commonInterests, setCommonInterests] = React.useState([]);

    return (
        <div>
            <IcebreakerQuestionComponent
                icebreakerQuestions={tmpQuestions}
                questionTitle={"Icebreaker Questions"}/>
        </div>
    );
}

// withRouter() allows accsing the necessary functionality to navigate from this component
export default IcebreakerComponent;