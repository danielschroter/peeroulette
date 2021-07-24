import React, {useState, useEffect, useRef, Component} from "react";

import {makeStyles} from "@material-ui/core/styles";
import {
    Button,
    TextField,
    Grid,
    Typography,
    Paper,
} from "@material-ui/core";
import PropTypes from "prop-types";
import UserService from "../services/UserService";


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

    const handleChange = async () => {
        let newIndex = Math.floor(Math.random() * icebreakerQuestions.length);
        setQuestionIndex(newIndex)
    }

    const extractIcebreakerQuestions = async () => {
        let icebreakerQuestions = await UserService.getIcebreakerQuestions();

        if (icebreakerQuestions !== undefined) {
            setIcebreakerQuestions(icebreakerQuestions[0].icebreakerQuestions)
        }
    }

    useEffect(() => {
        extractIcebreakerQuestions();
    }, [props.user]);


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