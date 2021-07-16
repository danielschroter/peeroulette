import React, { useState, useEffect, useRef } from "react";
// needed in tutorial
import io from "socket.io-client";

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
function PeerInformation(props) {
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
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");

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
            receivedMessage(message);
        })
    }, [props.user]);

    // code for socket io

    function receivedMessage(message) {
        setMessages(oldMsgs => [...oldMsgs, message]);
    }

    function sendMessage(e) {
        e.preventDefault();
        const messageObject = {
            body: message,
            id: yourID,
        };
        setMessage("");
        socketRef.current.emit("send message", messageObject);
    }

    function handleChange(e) {
        setMessage("inputText");
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



    return (
        <Paper style={{ padding: 20 }}>
            <Typography variant="h4">{username}</Typography>
            <Typography variant="h5">Information about {username}</Typography>
            <ul>
                <li>{city}</li>
                <li>{university}</li>
                <li>{organization}</li>
            </ul>
            <Typography variant="h5">Interests</Typography>
            <ul>
                {interests.map(interest => {
                      return <li>{interest}</li>;
                })}
            </ul>
            <TextField
                label="compname"
                fullWidth
                value={inputText}
                onChange={onChangeInputText}
            />
            <Button
                onClick={handleChange}
                variant="contained"
                color="primary"
                className={classes.deleteProfileButton}
            >
                Change
            </Button>
            <p>{inputText}</p>
        </Paper>
    );
}

// attributes of props and their type
PeerInformation.propTypes = {
    user: PropTypes.object,
    onGetUser: PropTypes.func,
};

// withRouter() allows accsing the necessary functionality to navigate from this component
export default PeerInformation;
