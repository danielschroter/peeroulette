import React, { useState, useEffect } from 'react'
import { withRouter } from "react-router-dom";
import {connect, useSelector} from "react-redux";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import { AppBar, IconButton, Toolbar, Typography, Container, Grid, Button, Paper } from "@material-ui/core";
import { Jutsu, useJitsi }  from 'react-jutsu'

import {login, register, changeUser, getUser, deleteUser, deleteOrganization, changeOrganization, registerOrganization} from "../redux/actions";
import PeerInformation from "../components/PeerInformation";

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
    backgroundColor: "#cc0000",
    marginTop: "12px",
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
    marginLeft: theme.spacing(1),
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
    color: "#cc0000",
  },
  addInterestsIcon: {
    marginTop: theme.spacing(1),
    fontSize: "15px",
    marginRight: theme.spacing(1),
    color: "green",
  },
  addInterestsButton: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(1),
    backgroundColor: "green",

  },
  deleteInterestsButton: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(1),
    backgroundColor: "#cc0000",
  },

}));

/**
 * For register new users
 * @param {props} props
 */
function CallView(props) {
  const classes = useStyles();

  const user = useSelector((state) => state.user.user);
  const matchid = props.id

  const onGetUser = (id) => {
      props.dispatch(getUser(id));
  };

  const [test, setTest] = useState(0)
  const [roomName, setRoomName] = useState('')
  const [room, setRoom] = useState('')
  const [name, setName] = useState('')
  const [call, setCall] = useState(false)
  const [password, setPassword] = useState('')
  const [jitsiConfig, setJitsiConfig] = useState('')
  var roomArray = [];
  var rN = "";

  const handleClick = event => {
      event.preventDefault()
      if (room && name) setCall(true)
  }

  const refreshCall = async () => {
    let uID = await user._id;
    let mID = await matchid;
    roomArray = [user._id, matchid].sort();
    rN = roomArray[0] + roomArray[1];
    console.log(rN +": "+ roomArray.length + " mit " +  roomArray[0] + " und " + roomArray[1]);
    setRoomName(rN)
    console.log("Statename: "+roomName);

    setJitsiConfig({
        roomName: roomName,
        subject: 'peeroulette',
        password: 'asamplepasswordforpeeroulette',
        parentNode: 'jitsi-container'+room,
        width: '100%',
        height: '100%',
        configOverwrite: {
            startWithAudioMuted: false,
            enableWelcomePage: false,
        },
        interfaceConfigOverwrite: {
            DEFAULT_REMOTE_DISPLAY_NAME: 'Fellow Peer',
            DISPLAY_WELCOME_FOOTER: false,
            DISPLAY_WELCOME_PAGE_ADDITIONAL_CARD: false,
            DISPLAY_WELCOME_PAGE_CONTENT: false,
            DISPLAY_WELCOME_PAGE_TOOLBAR_ADDITIONAL_CONTENT: false,
            RECENT_LIST_ENABLED: false,
            SETTINGS_SECTIONS: [],
            SHARING_FEATURES: [],
            SHOW_JITSI_WATERMARK: false,
            GENERATE_ROOMNAMES_ON_WELCOME_PAGE: false,
        },
    })
  }

  var { loading, error, jitsi } = useJitsi(jitsiConfig);

  useEffect(() => {
      refreshCall()
  }, [props, roomName]);

  return (
    <div style={{height:"100%", width:"100%"}}>{jitsiConfig.roomName}
      {/*
        <iframe allow={jallow} src={jiframe} name={jname} id={jid} jallowfullscreen={jallowfullscreen} style={{height: '100%'},{width: '100%'},{border: "0px"}}></iframe>
      */}
      <div  style={{height:"100%"}} id={jitsiConfig.parentNode} />
      <Button
        variant = "contained"
        color = "primary"
        // onClick={() => { window.location.href = "/wait/"+(curPage+1); }}
        onClick={() => setTest(test + 1)}
      >
        +1
      </Button>
    </div>
  );
}

export default connect()(CallView);
