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
    const [thisUser_id, setThisUser_id] = React.useState("");

    const [otherUsername, setOtherUsername] = React.useState("");
    const [thisUsername, setThisUsername] = React.useState("");

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
        console.warn("try to get username")
        setThisUsername(props.user.username)
        setThisUser_id(props.user._id)

            // UserService.getUser(props.user._id).then(function(userBackend) {
        UserService.getUser(props.peer).then(function(userBackend) {
            setOtherUsername(userBackend.username);
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

    // code for socket io

    const [yourID, setYourID] = useState();
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState([]);
    const [mustspin, setMustspin] = useState(false);
    const [newPrizeNumber, setNewPrizeNumber] = useState(0);
    const [endSpin, setEndSpin] = useState(false);

    const [thisUserBet, setThisUserBet] = useState("");
    const [otherUserBet, setOtherUserBet] = useState("");

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
            receivedMessage(message);
            if (message !== undefined) {
                let idOfUserSpinnedWheel = message.body[1];
                let idOfPeerOfUserSpinnedWheel = message.body[2];

                let thisUserSpinnedWheel = idOfUserSpinnedWheel === props.user._id && idOfPeerOfUserSpinnedWheel === props.peer;
                let peerUserSpinnedWheel = idOfUserSpinnedWheel === props.peer && idOfPeerOfUserSpinnedWheel === props.user._id;

                let blockSpin = message.body[4];

                console.warn("user props spin")
                console.warn(blockSpin)

                // set other user bet only if message comes from peet
                if (peerUserSpinnedWheel) {
                    setOtherUserBet(message.body[3])
                } else {
                    resetPeerBet()
                }

                // spin wheel only in match of two peers
                if (thisUserSpinnedWheel || peerUserSpinnedWheel) {
                    if (!blockSpin) {
                        setMustspin(true);
                    }
                }
            }
        })

    }, [props.user, props.body]);

    // code for socket io
    function receivedMessage(message) {
            let tmp = messages;
            tmp.push(message.body)
            setMessages(tmp);
            setNewPrizeNumber(message.body[0])
    }

    function sendMessage(e) {
        e.preventDefault();
        extractUser();

        let newPrizeNumber = Math.floor(Math.random() * data.length)
        console.log(newPrizeNumber)
        setNewPrizeNumber(newPrizeNumber)

        let userBet = props.userBets[0];

        // store id's of both users to ensure that wheel only spins on the match between both users
        // add other userBet to variables
        let messageBody = [newPrizeNumber, props.user._id, props.peer, userBet, props.blockSpin[0]]

        const messageObject = {
            body: messageBody,
            id: thisUser_id,
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

        back.username = otherUsername;
        back.interests = interests;
        back.university = university;
        back.organization = organization;

        return back;
    };

    console.log( interests );

    function handleChange(e) {
        setMessage(otherUsername);
        setBlockSpin(false);
        //props.blockSpin = false;

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

    const setBlockSpin = (bool) => {
        resetBlockSpin();
        props.blockSpin.push(bool);
    }

    const resetBlockSpin = () => {
        let i = 0;
        for (i; i < props.blockSpin.length; i++) {
            props.blockSpin.splice(i, 1)
        }
    };

    const setPeerBets = (bet) => {
        props.userBets.push(bet);
    };

    const resetPeerBet = () => {
        let i = 0;
        for (i; i < props.userBets.length; i++) {
            props.userBets.splice(i, 1)
        }
    };



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
                <Paper style={{ padding: 20, "backgroundColor":"#484848",
                    display: "flex", justifyContent: "center", alignItems: "center" }}>
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
                </Paper>
                <Paper style={{ padding: 20, "backgroundColor":"#484848"}}>
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
                    <Typography style={{"color":"gold"}}>Your Bet: {thisUserBet} </Typography>
                    <Typography style={{"color":"gold"}}>Peer Bet: {otherUserBet} </Typography>

                    <Table striped bordered hover size="sm">
                        <tbody>
                        <tr>
                            {(() => {
                                let i = 0;
                                let dataTable = [];
                                for (i; i < data.length; i++) {
                                    dataTable.push(<button className={classes.roundButton} value={i}
                                                           onClick={(e) => {
                                                               setThisUserBet(data[e.target.value].option);
                                                               setBlockSpin(true);
                                                               setPeerBets(data[e.target.value].option, true)
                                                               sendMessage(e)
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

// gameValues is Array which stores messages that are sent between users
// gameValues[ userBets, blockSpin, ... ]

// attributes of props and their type
GameComponent.propTypes = {
    user: PropTypes.object,
    onGetUser: PropTypes.func,
    gameValues: PropTypes.array,
    userBets: PropTypes.array,
    blockSpin: PropTypes.array,
};

// withRouter() allows accsing the necessary functionality to navigate from this component
export default GameComponent;