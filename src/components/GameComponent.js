import React, { useState, useEffect, useRef, Component } from "react";
// needed in tutorial
import io from "socket.io-client";

// needed for wheel
import { Wheel } from 'react-custom-roulette'

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

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const useStyles = makeStyles((theme) => ({
    flexCol: {
        display: "flex",
        flexDirection: "column",
    },
    flexRow: {
        display: "flex",
        flexDirection: "row",
    },
    justifySpaceBetween: {
        justifyContent: "space-between",
    },
    flex: {
        flex: 1,
    },
    flexEnd: {
        justifyContent: "flex-end",
    },
    marginSides: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    center: {
        margin: "auto",
    },
    padding: {
        padding: theme.spacing(2),
    },
    maxWidth: {
        width: "100%",
        maxWidth: "1500px",
    },
    pageArea: {
        paddingBottom: theme.spacing(2),
        "&:last-child": {
            paddingBottom: 0,
        },
    },
    title: {
        marginTop: theme.spacing(4),
    },
    barMinHeight: {
        minHeight: theme.spacing(5),
        position: "absolute",
        top: theme.spacing(1),
        right: theme.spacing(2),
    },
    signUpRow: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        "&:last-child": {
            paddingBottom: theme.spacing(1),
        },
        "&:first-child": {
            paddingTop: theme.spacing(1),
        },
    },
    userDataFont: {
        color: "black",
        fontWeight: "bold",
    },
    deleteProfileButton: {
        marginRight: theme.spacing(1),
        backgroundColor:"#cc0000",
        marginTop:"12px",
    },
    editNameButton: {
        marginRight: theme.spacing(1),
        marginLeft: theme.spacing(1),
    },
    cancelNameButton: {
        marginRight: theme.spacing(1),
        marginLeft: theme.spacing(1),
    },
    saveNameButton: {
        marginRight: theme.spacing(1),
    },
    cancelPasswordButton: {
        marginRight: theme.spacing(1),
        marginLeft:theme.spacing(1),
    },
    savePasswordButton: {
        marginRight: theme.spacing(1),
    },
    editPasswordButton: {
        marginRight: theme.spacing(1),
        marginLeft: theme.spacing(1),
    },
    interestsButton: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
        fontSize: "15px",
        pointerEvents: "none",
    },
    deleteInterestsIcon: {
        marginTop: theme.spacing(1),
        fontSize: "15px",
        pointerEvents: "none",
    },
    deleteInterestsCross: {
        marginTop: theme.spacing(1),
        fontSize: "15px",
        marginRight: theme.spacing(1),
        color:"#cc0000",
    },
    addInterestsIcon: {
        marginTop: theme.spacing(1),
        fontSize: "15px",
        marginRight: theme.spacing(1),
        color:"green",
    },
    addInterestsButton: {
        marginTop: theme.spacing(2),
        marginRight: theme.spacing(1),
        backgroundColor:"green",

    },
    deleteInterestsButton: {
        marginTop: theme.spacing(2),
        marginRight: theme.spacing(1),
        backgroundColor:"#cc0000",
    },

}));

/**
 * For register new users
 * @param {props} props
 */
function GameComponent(props) {
    const classes = useStyles();

    // user data
    const [user_id, setUser_id] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [password2, setPassword2] = React.useState("");
    const [city, setCity] = React.useState("");
    const [university, setUniversity] = React.useState("");
    const [organization, setOrganization] = React.useState("");

    //interests
    const [interests, setInterests] = React.useState([""]);
    const [allInterests, setAllInterests] = React.useState([]);
    const [editInterests, setEditInterests] = React.useState(false);
    const [deleteInterests, setDeleteInterests] = React.useState(false);
    const [addInterests, setAddInterests] = React.useState(false);
    const [search, setSearch] = React.useState("");

    // identify coperate accounts
    const [corporate_id, setCorporate_id] = React.useState("");
    const [isCorporate, setIsCorporate] = React.useState(false);

    // corporate Data
    const [compname, setCompname] = React.useState("");
    const [editCompname, setEditCompname] = React.useState(false);
    const [domains, setDomains] = React.useState("");
    const [editDomains, setEditDomains] = React.useState(false);
    const [changeState, setChangeState] = React.useState(false);

    const bcrypt = require("bcryptjs");

    // extract all the user data from the backend
    const extractUser = () => {
        if (!props.user) {
            return;
        }

        // UserService.getUser(props.user._id).then(function(userBackend) {
        UserService.getUser(props.peer).then(function(userBackend) {
            setUsername(userBackend.username);
            setCity(userBackend.city);
            setInterests(userBackend.interests);
            setUniversity(userBackend.university);
            setOrganization(userBackend.organization);

            if (userBackend.account_owner_of_organization !== undefined) {
                setIsCorporate(true);
                UserService.getOrganization(userBackend.account_owner_of_organization).then(function(organizationBackend) {
                    setCompname(organizationBackend.company_name);
                    setDomains(organizationBackend.domains);
                    setCorporate_id(organizationBackend._id);
                });
            } else {
                setIsCorporate(false);
            }
        });
    };

    const extractInterests = () => {
        UserService.getInterests().then(function(interestsBackend) {
            if (interestsBackend[0] !== undefined) {
                setAllInterests(interestsBackend[0].facebookInterests);
            }
        });
    };

    const [inputText, setInputText] = useState("");


    // code for socket io

    const [yourID, setYourID] = useState();
    const [messages, setMessages] = useState(["Hans", "Peter"]);
    const [message, setMessage] = useState("");
    const [mustspin, setMustspin] = useState(false);
    const [prizeNumber, setPrizeNumber] = useState(0);

    const socketRef = useRef();

    useEffect(() => {
        extractUser();
        extractInterests();

        // code for socket io
        socketRef.current = io.connect('/');

        socketRef.current.on("your id", id => {
            setYourID(id);
        })

        socketRef.current.on("message", (message) => {
            console.log("here");
            console.log(message)
            receivedMessage(message);
            console.log("recevied messages")
            console.log(messages)
            extractUser();
            if(messages.length > 0) {
                setMustspin(true)
                let newPrizeNumber = Math.floor(Math.random() * data.length);
                setPrizeNumber(newPrizeNumber);
            }
        })

    }, [props.user]);

    // code for socket io
    function receivedMessage(message) {
        console.log("received")
        console.log(message)
        let tmp = messages;
        tmp.push(message.body)
        setMessages(tmp);
    }

    function sendMessage(e) {
        e.preventDefault();
        setMessage(username);
        const messageObject = {
            body: message,
            id: yourID,
        };
        socketRef.current.emit("send message", messageObject);
    }

    // props for all grid items used below in the JSX
    const girdItemProps = {
        item: true,
        className: classes.padding,
    };

    // creating a object with all relevant data to update a user
    const packUser = () => {
        let back = {
            ...props.user,
        };

        back.username = username;
        back.password = bcrypt.hashSync(password, 8);
        back.interests = interests;
        back.city = city;
        back.university = university;
        back.organization = organization;

        return back;
    };

    console.log( interests );

    // delete user profile
    const onChangeInputText = (e) => {
        setInputText(e.target.value)
    };

    function handleChange(e) {
        setMessage("inputText");
        sendMessage(e);
        extractUser();
    };

    // needed for lucky wheel

    const data = [
        { option: 'Q1', style: { backgroundColor: 'orange', textColor: 'black' } },
        { option: 'Q2', style: { backgroundColor: 'black', textColor: 'white' } },
        { option: 'Q3', style: { backgroundColor: 'orange', textColor: 'black' } },
        { option: 'Q4', style: { backgroundColor: 'black', textColor: 'white' } },
        { option: 'Q5', style: { backgroundColor: 'orange', textColor: 'black' } },
        { option: 'Q6', style: { backgroundColor: 'black', textColor: 'white' } },
        { option: 'Q7', style: { backgroundColor: 'orange', textColor: 'black' } },
        { option: 'Q8', style: { backgroundColor: 'black', textColor: 'white' } },
        { option: 'Q9', style: { backgroundColor: 'orange', textColor: 'black' } },
        { option: 'Q10', style: { backgroundColor: 'black', textColor: 'white' } },
    ]

        return (
            <div>
                <Paper style={{ padding: 20 }}>
                    <Wheel
                        mustStartSpinning={mustspin}
                        prizeNumber={3}
                        data={data}
                        backgroundColors={['#3e3e3e', '#df3428']}
                        textColors={['#ffffff']}
                        onStopSpinning={() => {
                            setMustspin(false)
                        }}
                    />
                    <Button
                        onClick={handleChange}
                        variant="contained"
                        color="primary"
                        className={classes.deleteProfileButton}
                    >
                        Spin Wheel
                    </Button>
                        { true ? (
                            <div>
                                {(() => {
                                    let i = 0;
                                    let allMessages = []
                                    for (i; i < messages.length; i++) {
                                        allMessages.push(<p>{messages[i]}</p>)
                                        console.warn("added meessage")
                                    }
                                    return allMessages
                                })()}
                            </div>
                        ) : (
                            <p>{messages}</p>
                        ) }
                </Paper>
            </div>
        );
    }

// attributes of props and their type
GameComponent.propTypes = {
    user: PropTypes.object,
    onGetUser: PropTypes.func,
};

// withRouter() allows accsing the necessary functionality to navigate from this component
export default GameComponent;