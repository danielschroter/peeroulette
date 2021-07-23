import React, {useState, useEffect, useRef, Component} from "react";
// needed in tutorial
import io from "socket.io-client";

// needed for wheel
import {Wheel} from 'react-custom-roulette'
import Roulette from './Roulette'

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


const useStyles = makeStyles((theme) => ({}));

/**
 * For register new users
 * @param {props} props
 */
function GameComponent(props) {
    const classes = useStyles();

    const [interestsUserA, setInterestUserA] = React.useState([]);
    const [interestsUserB, setInterestUserB] = React.useState([]);
    const [otherUsername, setOtherUsername] = React.useState("");
    const [commonInterests, setCommonInterests] = React.useState([]);
    const [allInterests, setAllInterests] = React.useState([]);

    const [wheelInterests, setWheelInterests] = React.useState([]);
    const [wheelInterestsStrings, setWheelInterestsStrings] = React.useState([]);

    const [thisUserBet, setThisUserBet] = React.useState("");
    const [otherUserBet, setOtherUserBet] = React.useState("");

    const [messages, setMessages] = React.useState([]);
    const [mustspin, setMustspin] = React.useState(false);
    const [newPrizeNumber, setNewPrizeNumber] = React.useState(0);
    const [endSpin, setEndSpin] = React.useState(false);
    // const [blockSpin, setBlockSpin] = React.useState(true);


    const data = [
        {option: wheelInterests[0], style: {backgroundColor: '#ED7C31', textColor: 'black'}},
        {option: wheelInterests[1], style: {backgroundColor: 'black', textColor: 'white'}},
        {option: wheelInterests[2], style: {backgroundColor: '#ED7C31', textColor: 'black'}},
        {option: wheelInterests[3], style: {backgroundColor: 'black', textColor: 'white'}},
        {option: wheelInterests[4], style: {backgroundColor: '#ED7C31', textColor: 'black'}},
        {option: wheelInterests[5], style: {backgroundColor: 'black', textColor: 'white'}},
        {option: wheelInterests[6], style: {backgroundColor: '#ED7C31', textColor: 'black'}},
        {option: wheelInterests[7], style: {backgroundColor: 'black', textColor: 'white'}},
        {option: wheelInterests[8], style: {backgroundColor: '#ED7C31', textColor: 'black'}},
        {option: wheelInterests[9], style: {backgroundColor: 'black', textColor: 'white'}},
        {option: wheelInterests[10], style: {backgroundColor: '#ED7C31', textColor: 'black'}},
        {option: wheelInterests[11], style: {backgroundColor: 'black', textColor: 'white'}},
    ];


    const socket = useRef();
    // socket.current = io.connect('/');


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

    // const receiveMessage = async () => {
    //
    //     socket.current.on("startSpin", (message) => {
    //         let tmp = messages;
    //         tmp.push(message.body)
    //         console.log(message);
    //         setMessages(tmp);
    //         setNewPrizeNumber(message.body[0])
    //         setEndSpin(false);
    //     });
    //
    // }


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
        setInterestUserA(userA.interests);
        setInterestUserB(userB.interests);
        setOtherUsername(userB.username);

        var a = userA.interests;
        var b = userB.interests;
        const filteredArray = a.filter(value => b.includes(value));

        console.log(filteredArray);

        await setCommonInterests(filteredArray);

        let allInts = await UserService.getInterests();
        allInts = allInts[0].facebookInterests;

        setAllInterests(allInts);


        console.log("This are common interests", commonInterests);

        if(wheelInterests.length==0) {
            let data = await createWheelInterests(filteredArray, allInts);
            let myObj = { data: data, receiverId: props.peer};
            await sendMessage("initWheel", myObj);
        }

    };

    const setSpinVariables = async(price) => {
        await setNewPrizeNumber(price);
        setEndSpin(false);
        setMustspin(true);
    }

    useEffect(() => {
        socket.current = io("/");

        socket.current.on("wheelInitialised", body =>{
            console.log("received data for interestWheel" + body);
            setWheelInterests(body.body.data);
        })
        socket.current.on("startedSpin", message => {
            console.log("Spinning was started" + message);
            // let tmp = messages;
            // tmp.push(message.body)
            // console.log(message);
            // setMessages(tmp);

            setSpinVariables(message.body.newPrizeNumber);

        })


    }, []);



    useEffect(() => {
        extractData();

        socket.current.emit("addUser", props.user._id);

        console.log("Data is Extracted and Variables are Set");

    }, [props.user])


    // const handleOnComplete = (value) => {
    //     console.log(value);
    // };
    //
    //
    // const setBlockSpin = (bool) => {
    //     resetBlockSpin();
    //     props.blockSpin.push(bool);
    // }
    //
    // const resetBlockSpin = () => {
    //     let i = 0;
    //     for (i; i < props.blockSpin.length; i++) {
    //         props.blockSpin.splice(i, 1)
    //     }
    // };
    //
    // const setPeerBet = (bet) => {
    //     resetPeerBet();
    //     props.userBet.push(bet);
    // };
    //
    // const resetPeerBet = () => {
    //     let i = 0;
    //     for (i; i < props.userBet.length; i++) {
    //         props.userBet.splice(i, 1)
    //     }
    // };

    const calculateNewPrice = async() => {
        return 6;
    }

    const sendClickToSpin = async () => {
        let newPrice = await calculateNewPrice();
        setSpinVariables(newPrice);
        sendMessage("startSpinning", {newPrizeNumber:newPrice, senderId: props.user._id, receiverId: props.peer})
    }

    const onTableClick = async(e) => {
            setThisUserBet(data[e.target.value].option);


            sendMessage("setBet", {bet:wheelInterests[e.targe.value].option});
            // setPeerBet(data[e.target.value].option, true)
    }


    return (
        <div>
            <Typography variant="h4">This are Common Interest </Typography>
            <Paper style={{
                padding: 20, "backgroundColor": "#484848",
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


            <Paper style={{ padding: 20, "backgroundColor":"#484848"}}>
                <Button
                    onClick={sendClickToSpin}
                    variant="contained"
                    color="primary"
                    className={classes.deleteProfileButton}
                    style={{"backgroundColor":"#ED7C31"}}
                >
                    Spin Wheel
                </Button>
                { commonInterests.length === 1  ? (
                    <Typography variant="h5" style={{"marginTop":"15px", "color":"white"}}>You have {commonInterests.length} common interest.</Typography>
                ) : (
                    <Typography variant="h5" style={{"marginTop":"15px", "color":"white"}}>You have {commonInterests.length} common interests!</Typography>
                ) }

                <Typography variant="h5" style={{"marginTop":"15px", "color":"white"}}>Spin the wheel to find out which one!</Typography>
                { endSpin  ? (
                    <Typography variant="h5" style={{"marginTop":"15px", "color":"white"}}>Spinned interest: {wheelInterests[newPrizeNumber].option}</Typography>
                    ) : (
                    <Typography variant="h5" style={{"marginTop":"15px", "color":"white"}}>Spinned interest:</Typography>
                ) }
                { thisUserBet == wheelInterests[newPrizeNumber].option && thisUserBet == wheelInterests[newPrizeNumber].option == otherUserBet && endSpin? (
                    <Typography variant="h5" style={{"marginTop":"15px", "color":"white"}}>It's a draw! You both win!</Typography>
                ) : null }
                { thisUserBet == wheelInterests[newPrizeNumber].option && endSpin ? (
                    <Typography variant="h5" style={{"marginTop":"15px", "color":"white"}}>Winner: {props.user.username}</Typography>
                ) : null }
                { otherUserBet == wheelInterests[newPrizeNumber].option && endSpin? (
                    <Typography variant="h5" style={{"marginTop":"15px", "color":"white"}}>Winner: {otherUsername}</Typography>
                ) : null }

            </Paper>
            <Paper style={{ padding: 20 , "backgroundColor":"green"}}>
                <Typography style={{"color":"gold"}}>Bet {props.user.username}: {thisUserBet} </Typography>
                <Typography style={{"color":"gold"}}>Bet {otherUsername}: {otherUserBet} </Typography>

                <Table striped bordered hover size="sm">
                    <tbody>
                    <tr>
                        {(() => {
                            let i = 0;
                            let dataTable = [];
                            for (i; i < data.length; i++) {
                                dataTable.push(<button className={classes.roundButton} value={i}
                                                       onClick={onTableClick}>{data[i].option}</button>);
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