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
function GameComponent(props) {
    const classes = useStyles();

    const [otherUsername, setOtherUsername] = React.useState("");
    const [commonInterests, setCommonInterests] = React.useState([]);

    const [wheelInterests, setWheelInterests] = React.useState([
        {option: "Business", style: {backgroundColor: '#ED7C31', textColor: 'black'}},
        {option: "Soccer", style: {backgroundColor: 'black', textColor: 'white'}},
        {option: "Banking", style: {backgroundColor: '#ED7C31', textColor: 'black'}},
        {option: "Cloud", style: {backgroundColor: 'black', textColor: 'white'}},
        {option: "Reading", style: {backgroundColor: '#ED7C31', textColor: 'black'}},
        {option: "Basketball", style: {backgroundColor: 'black', textColor: 'white'}},
        {option: "Video Games", style: {backgroundColor: '#ED7C31', textColor: 'black'}},
        {option: "Netflix", style: {backgroundColor: 'black', textColor: 'white'}},
        {option: "Computer", style: {backgroundColor: '#ED7C31', textColor: 'black'}},
        {option: "Running", style: {backgroundColor: 'black', textColor: 'white'}},
        {option: "Comedy", style: {backgroundColor: '#ED7C31', textColor: 'black'}},
        {option: "Photography", style: {backgroundColor: 'black', textColor: 'white'}},
    ]);
    const [wheelInterestsStrings, setWheelInterestsStrings] = React.useState([]);

    const [thisUserBet, setThisUserBet] = React.useState("");
    const [otherUserBet, setOtherUserBet] = React.useState("");

    const [mustspin, setMustspin] = React.useState(false);
    const [newPrizeNumber, setNewPrizeNumber] = React.useState(0);
    const [endSpin, setEndSpin] = React.useState(false);


    const socket = useRef();


    const createWheelInterests = async (comInts, allInts) => {
        const wheelInts = Array();
        const data = Array();
        for (var i = 0; i < comInts.length; i++) {
            wheelInts.push(comInts[i]);
        }
        for (var i = comInts.length; i < 12; i++) {
            const j = Math.floor(Math.random() * allInts.length);
            wheelInts.push(allInts[j]);
        }
        for (var i = 0; i < wheelInts.length; i++) {
            if (i % 2 == 0) {
                const obj = {option: wheelInts[i], style: {backgroundColor: '#ED7C31', textColor: 'black'}}
                data.push(obj)
            } else {
                const obj = {option: wheelInts[i], style: {backgroundColor: 'black', textColor: 'white'}}
                data.push(obj)
            }
        }
        setWheelInterestsStrings(wheelInts);
        setWheelInterests(data);
        console.log(wheelInts);

        return data;
    }


    const sendMessage = async (label, messageBody) => {

        const myObj = {
            body: messageBody,
            id: props.user._id,
        };
        socket.current.emit(label, myObj);
    }

    // extract all the user data from the backend
    const extractData = async () => {
        if (!props.user) {
            return;
        }
        let userA = await UserService.getUser(props.user._id);
        let userB = await UserService.getUser(props.peer);
        setOtherUsername(userB.username);

        var a = userA.interests;
        var b = userB.interests;
        const filteredArray = a.filter(value => b.includes(value));

        console.log(filteredArray);

        await setCommonInterests(filteredArray);

        let allInts = await UserService.getInterests();
        allInts = allInts[0].facebookInterests;

        console.log("This are common interests", commonInterests);

        if (wheelInterestsStrings.length == 0) {
            let data = await createWheelInterests(filteredArray, allInts);
            let myObj = {data: data, receiverId: props.peer};
            await sendMessage("initWheel", myObj);
        }

    };

    const setSpinVariables = async (price) => {
        await setNewPrizeNumber(price);
        setEndSpin(false);
        setMustspin(true);
    }

    function senderReceiverUserPeerCheck (senderId, receiverId) {
        return ((senderId === props.peer && receiverId === props.user._id) ||
        (senderId === props.user._id && receiverId === props.peer));
    }


    useEffect(() => {
        socket.current = io("/");

        socket.current.on("wheelInitialised", body => {
            console.log("received data for interestWheel" + body);
            setWheelInterests(body.body.data);
                setOtherUserBet("");
                setThisUserBet("");
        })
        
        socket.current.on("startedSpin", message => {
            console.log("Spinning was started" + message);
            if (senderReceiverUserPeerCheck(message.id, message.body.receiverId)) {
                setSpinVariables(message.body.newPrizeNumber);
            }
        })

        socket.current.on("betWasSet", message => {
            console.log("Bet has been Set" + message);
            console.warn(message.body);
            console.warn(message);

            if (senderReceiverUserPeerCheck(message.id, message.body.receiverId)) {
                setOtherUserBet(message.body.bet);
            }
        })

    }, []);


    useEffect(() => {
        extractData();
        socket.current.emit("addUser", props.user._id);
        console.log("Data is Extracted and Variables are Set");

    }, [props.user])


    const calculateNewPrice = async () => {
        let randomInterestIndex = Math.floor(Math.random() * commonInterests.length);
        console.log(randomInterestIndex);
        return randomInterestIndex;
    }

    const sendClickToSpin = async () => {
        let newPrice = await calculateNewPrice();
        setSpinVariables(newPrice);
        sendMessage("startSpinning",
            {newPrizeNumber: newPrice, receiverId: props.peer})
    }

    const onTableClick = async (e) => {
        console.log(wheelInterests[e.target.value].option);
        setThisUserBet(wheelInterests[e.target.value].option);
        sendMessage("setBet",
            {bet: wheelInterests[e.target.value].option, receiverId: props.peer});
    }

    {/*
        <AutoScale maxWidth={800} maxHeight={400} maxScale={3}>
            <div className="myContent">Example</div>
        </AutoScale>
    */}


    return (
        <div>
            <Paper elevation={0} style={{
                padding: 20, "backgroundColor": "rgba(0,0,0,0)",
                display: "flex", justifyContent: "center", alignItems: "center"
            }}>
                <Wheel
                    mustStartSpinning={mustspin}
                    prizeNumber={newPrizeNumber}
                    data={wheelInterests}
                    backgroundColors={['#3e3e3e', '#df3428']}
                    textColors={['#ffffff']}
                    onStopSpinning={() => {
                        setMustspin(false)
                        setEndSpin(true)
                    }}
                />
            </Paper>
            <div>
                <Paper elevation={0} style={{padding: 20, "backgroundColor": "rgba(0,0,0,0)"}}>
                        <Button
                            onClick={sendClickToSpin}
                            variant="contained"
                            color="primary"
                            className={classes.deleteProfileButton}
                            style={{"backgroundColor": "#ED7C31"}}
                        >
                            Spin Wheel
                        </Button>
                        {commonInterests.length === 1 ? (
                            <Typography variant="h5" style={{"marginTop": "15px", "color": "white"}}>You
                                have {commonInterests.length} common interest.</Typography>
                        ) : (
                            <Typography variant="h5" style={{"marginTop": "15px", "color": "white"}}>You
                                have {commonInterests.length} common interests!</Typography>
                        )}

                        <Typography variant="h5" style={{"marginTop": "15px", "color": "white"}}>Spin the wheel to find out
                            which one!</Typography>
                        {wheelInterests && thisUserBet == wheelInterests[newPrizeNumber].option && thisUserBet == wheelInterests[newPrizeNumber].option == otherUserBet && endSpin ? (
                            <Typography variant="h5" style={{"marginTop": "15px", "color": "white"}}>It's a draw! You both
                                win!</Typography>
                        ) : null}
                        {wheelInterests && thisUserBet == wheelInterests[newPrizeNumber].option && endSpin ? (
                            <Typography variant="h5" style={{
                                "marginTop": "15px",
                                "color": "white"
                            }}>Winner: {props.user.username}</Typography>
                        ) : null}
                        {wheelInterests && otherUserBet == wheelInterests[newPrizeNumber].option && endSpin ? (
                            <Typography variant="h5"
                                        style={{"marginTop": "15px", "color": "white"}}>Winner: {otherUsername}</Typography>
                        ) : null}
                    </Paper>
                    <Paper style={{padding: 20, "backgroundColor": "#ED7C31"}}>
                        <Typography style={{"color": "black", "fontSize": "20px"}}>Bet {props.user.username}: {thisUserBet} </Typography>
                        <Typography style={{"color": "black", "fontSize": "20px"}}>Bet {otherUsername}: {otherUserBet} </Typography>
                        <Table striped bordered hover size="sm">
                            <tbody>
                            <tr>
                                {(() => {
                                    let i = 0;
                                    let dataTable = [];
                                    for (i; i < wheelInterests.length; i++) {
                                        dataTable.push(<button
                                            className={classes.roundButton} value={i}
                                            style={{"fontSize":"17px"}}
                                            onClick={(e) => onTableClick(e)}
                                        >{wheelInterests[i].option}</button>);
                                    }
                                    return dataTable;
                                })()}
                            </tr>
                            </tbody>
                        </Table>
                    </Paper>
            </div>
</div>
    );
}

// gameValues is Array which stores messages that are sent between users
// gameValues[ userBet, blockSpin, ... ]

// attributes of props and their type
GameComponent.propTypes = {
    user: PropTypes.object,
    onGetUser: PropTypes.func,
    gameValues: PropTypes.array,
    userBet: PropTypes.array,
    peerBet: PropTypes.array,
    commonInterests: PropTypes.array,
    blockSpin: PropTypes.array,
    allFaceboookInterests: PropTypes.array,
};

// withRouter() allows accsing the necessary functionality to navigate from this component
export default GameComponent;