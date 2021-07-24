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

  const [room, setRoom] = useState('')
  const [name, setName] = useState('')
  const [call, setCall] = useState(false)
  const [password, setPassword] = useState('')

  const handleClick = event => {
      event.preventDefault()
      if (room && name) setCall(true)
  }


  const roomArray = [user._id, matchid];
  if(roomArray.length == 2){
    roomArray.sort();
    var roomName = roomArray[0] + roomArray[1];
    console.log(roomName +": "+ roomArray.length + " mit " +  roomArray[0] + " und " + roomArray[1]);
    var jitsiConfig = {
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
    };
    // var jiframe = "https://meet.jit.si/" + roomName + "#jitsi_meet_external_api_id=0&config.startWithAudioMuted=false&config.enableWelcomePage=false&interfaceConfig.DEFAULT_REMOTE_DISPLAY_NAME=%22Fellow%20Peer%22&interfaceConfig.DISPLAY_WELCOME_FOOTER=false&interfaceConfig.DISPLAY_WELCOME_PAGE_ADDITIONAL_CARD=false&interfaceConfig.DISPLAY_WELCOME_PAGE_CONTENT=false&interfaceConfig.DISPLAY_WELCOME_PAGE_TOOLBAR_ADDITIONAL_CONTENT=false&interfaceConfig.RECENT_LIST_ENABLED=false&interfaceConfig.SETTINGS_SECTIONS=%5B%5D&interfaceConfig.SHARING_FEATURES=%5B%5D&interfaceConfig.SHOW_JITSI_WATERMARK=false&interfaceConfig.GENERATE_ROOMNAMES_ON_WELCOME_PAGE=false&appData.localStorageContent=null";
    // var jallow = "camera; microphone; display-capture; autoplay; clipboard-write"
    // var jname = "jitsiConferenceFrame0"
    // var jid = "jitsiConferenceFrame0"
    // var jallowfullscreen = "false"
  }

  var { loading, error, jitsi } = useJitsi(jitsiConfig);


  return (
    <div style={{height:"100%", width:"100%"}}>{jitsiConfig.roomName}
      {/*
        <iframe allow={jallow} src={jiframe} name={jname} id={jid} jallowfullscreen={jallowfullscreen} style={{height: '100%'},{width: '100%'},{border: "0px"}}></iframe>
      */}
      <div  style={{height:"100%"}} id={jitsiConfig.parentNode} />
    </div>
  );
}

export default connect()(CallView);
