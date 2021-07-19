import React, { useState, useEffect, useRef, Component } from "react";
// needed in tutorial
import io from "socket.io-client";

// needed for wheel
import { Wheel } from 'react-custom-roulette'
import Roulette from './Roulette'

// needed for table
import Table from 'react-bootstrap/Table'

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
    talbeButton: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
        color: "black",
        fontSize: "15px",
    },
    roundButton: {
        backgroundColor: "#04AA6D",
        border: "none",
        color: "gold",
        padding: "20px",
        textAlign: "center",
        textDecoration: "none",
        display: "inlineBlock",
        fontSize: "15px",
        margin: "4px 2px",
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
    const [otherUser_id, setOtherUser_id] = React.useState("");
    const [thisUser_id, setThisUser_id] = React.useState("");

    const [otherUsername, setOtherUsername] = React.useState("");
    const [thisUsername, setThisUsername] = React.useState("");

    const [thisBet, setThisBet] = React.useState("");


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

    const extractUser = () => {
        if (!props.user) {
            return;
        }
        setCalculateRound(false);
        setEndSpin(false);
        setNewUserBet("No bet set yet")

        console.warn("try to get username")
        setThisUsername(props.user.username)
        setThisUser_id(props.user._id)

            // UserService.getUser(props.user._id).then(function(userBackend) {
        UserService.getUser(props.peer).then(function(userBackend) {
            setOtherUser_id(userBackend._id)
            setOtherUsername(userBackend.username);
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
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [mustspin, setMustspin] = useState(false);
    const [newPrizeNumber, setNewPrizeNumber] = useState(0);
    const [calculateRound, setCalculateRound] = useState(false);
    const [endSpin, setEndSpin] = useState(false);
    const [newUserBet, setNewUserBet] = useState("");

    const [userColour, setUserColour] = useState("white");
    const white = "white";

    const socketRef = useRef();

    useEffect(() => {
        extractUser();
        extractInterests();
        console.log(data)

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
            console.warn("OTHER USER ID")
            console.warn(otherUser_id)
            extractUser();
            if(messages.length > 0 && (message.id === thisUser_id)) {
                setMustspin(true)
            }
        })

    }, [props.user]);

    // code for socket io
    function receivedMessage(message) {
        console.warn("OTHER USER ID")
        console.warn(otherUser_id)
        //if (message.id === thisUser_id || message.id === thisUser_id) {
            let tmp = messages;
            tmp.push(message.body)
            setMessages(tmp);
            setNewPrizeNumber(message.body)
        //}
    }

    function sendMessage(e) {
        e.preventDefault();
        extractUser();

        let newPrizeNumber = Math.floor(Math.random() * data.length)
        console.log(newPrizeNumber)
        setNewPrizeNumber(newPrizeNumber)

        console.log("calculated new prize number")


        const messageObject = {
            body: newPrizeNumber,
            id: thisUser_id,
        };

        console.log("message sent")
        console.log(messageObject.body)
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

        back.username = otherUsername;
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
        setCalculateRound(true)
        setMessage(otherUsername);

        sendMessage(e);
        extractUser();
    };

    const handleOnComplete = (value) => {
        console.log(value);
    };

    const options = [
        "war",
        "pain",
        "words",
        "love",
        "life",
    ];


    // needed for lucky wheel

    const data = [
        { option: allInterests[0], style: { backgroundColor: '#ED7C31', textColor: 'black' } },
        { option: allInterests[1], style: { backgroundColor: 'black', textColor: 'white' } },
        { option: allInterests[2], style: { backgroundColor: '#ED7C31', textColor: 'black' } },
        { option: allInterests[3], style: { backgroundColor: 'black', textColor: 'white' } },
        { option: allInterests[4], style: { backgroundColor: '#ED7C31', textColor: 'black' } },
        { option: allInterests[5], style: { backgroundColor: 'black', textColor: 'white' } },
        { option: allInterests[6], style: { backgroundColor: '#ED7C31', textColor: 'black' } },
        { option: allInterests[7], style: { backgroundColor: 'black', textColor: 'white' } },
        { option: allInterests[8], style: { backgroundColor: '#ED7C31', textColor: 'black' } },
        { option: allInterests[9], style: { backgroundColor: 'black', textColor: 'white' } },
    ]

        return (
            <div>
                <Paper style={{ padding: 20, "backgroundColor":"#484848"}}>
                        <Wheel
                            mustStartSpinning={mustspin}
                            prizeNumber={newPrizeNumber}
                            data={data}
                            backgroundColors={['#3e3e3e', '#df3428']}
                            textColors={['#ffffff']}
                            onStopSpinning={() => {
                                setMustspin(false)
                                setEndSpin(true)
                            }}
                        />

                    <Button
                        onClick={handleChange}
                        variant="contained"
                        color="primary"
                        className={classes.deleteProfileButton}
                        style={{"backgroundColor":"#ED7C31"}}
                    >
                        Spin Wheel
                    </Button>
                    { !endSpin ? (
                        <Typography variant="h5" style={{"marginTop":"15px", "color":"white"}}>Spinned interest:</Typography>
                        ) : (
                        <Typography variant="h5" style={{"marginTop":"15px", "color":"white"}}>Spinned interest: {data[newPrizeNumber].option}</Typography>
                    ) }
                        <Typography variant="h5" style={{"marginTop":"15px", "color":"white"}}>Winner: </Typography>
                </Paper>
                <Paper style={{ padding: 20 , "backgroundColor":"green"}}>
                    <Typography style={{"color":"gold"}}>Bet {thisUsername}: {newUserBet} {thisUser_id}</Typography>
                    <Typography style={{"color":"gold"}}>Bet {otherUsername}: {newUserBet} {}</Typography>

                    <Table striped bordered hover size="sm">
                        <tbody>
                        <tr>
                            {(() => {
                                console.log("DATA")
                                console.log(data)
                                let i = 0;
                                let dataTable = [];
                                for (i; i < data.length; i++) {
                                    dataTable.push(<button className={classes.roundButton} value={i}
                                                           onClick={(e) => {
                                        setNewUserBet(data[e.target.value].option)
                                    }}>{data[i].option}</button>);
                                }
                                return dataTable;
                            })()}
                        </tr>
                        </tbody>
                    </Table>
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