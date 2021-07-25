import React, {useState, useEffect} from 'react'
import {withRouter} from "react-router-dom";
import {connect, useSelector} from "react-redux";

import {makeStyles} from "@material-ui/core/styles";
import {AppBar, IconButton, Toolbar, Typography, Container, Grid, Button, Paper} from "@material-ui/core";
import {Jutsu, useJitsi} from 'react-jutsu'
import ParticleBackground from "../components/ParticleBackground";


import {
    getUser,
} from "../redux/actions";
import PeerInformation from "../components/PeerInformation";
import GameComponent from "../components/GameComponent";

import UserService from "../services/UserService";
import MatchDBService from "../services/MatchDBService";


function LobbyView(props) {
    const user = useSelector((state) => state.user.user);


    const [sec, setSec] = React.useState(0);
    const [Partner, setPartner] = React.useState("");
    const [matched, setMatched] = React.useState(0);

    const onGetUser = (id) => {
        props.dispatch(getUser(id));
    };

    useEffect(() => {
        addMatchDB();
    }, []);

    useEffect(() => {
        if(Partner != user._id && matched < 2){
            extractCurrent();
            console.log("No Match Yet");
            timeout(1000).then(
               r => setSec(sec+1)
            );
        }else if (matched < 5){
            setMatched(matched + 1);
        } else{
            console.log("Its a match:"+Partner +" "+ user._id +" | "+match);
        }
    }, [sec]);

    function timeout(ms) { //pass a time in milliseconds to this function
        console.log("waiting");
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    let {match} = props;
    console.log(match);
    console.log("match: "+match)

    const addMatchDB = async () => {
        console.log("writetodb");
        if (!match.params.id) {
            return;
        }

        // UserService.getUser(props.user._id).then(function(userBackend) {
        let mID = await match.params.id;
        let uID = await user._id;
        console.log("writetodb: "+uID+" "+mID);
        if(mID != ""){
            await MatchDBService.addMatchDB(uID, mID).then(function(userBackend) {
                console.log("written match to db: "+uID+" & "+mID);
            }).catch(function(error){
                //400+ response codes
                console.log("error in writing match to db");
            });
        }
    };

    const extractCurrent = () => {
        if (!match.params.id) {
            return;
        }
        let mID = match.params.id
        // UserService.getUser(props.user._id).then(function(userBackend) {
        MatchDBService.getCurrent(mID).then(function(userBackend) {
            setPartner(userBackend.userb);
        });
    };

    if(Partner != user._id) {
        return(
            <Grid container spacing={3}>
                <Grid item xs />
                <Grid item xs={6}>
                    <Paper style={{ padding: 20 }}>
                        <Typography variant="h4">Waiting for your Partner</Typography>
                        <Typography variant="h1">{sec}</Typography>
                        {/*<Typography>{Partner} == {user._id}</Typography>*/}
                        <Button
                            variant="contained"
                            color="primary"
                            // onClick={() => { window.location.href = "/wait/"+(curPage+1); }}
                            onClick={() => props.history.push("/call/"+match.params.id)}
                        >
                            Search another one
                        </Button>
                    </Paper>
                </Grid>
                <Grid item xs />
            </Grid>
        );
    }else{
        return (
            <Grid container spacing={3}>
                <Grid item xs />
                <Grid item xs={6}>
                    <Paper style={{ padding: 20 }}>
                        <Typography variant="h1">Hooray!</Typography>
                        <Button
                                variant="contained"
                                color="primary"
                                onClick={() => props.history.push("/call/"+match.params.id)}
                            >
                                JOIN
                        </Button>
                    </Paper>
                </Grid>
                <Grid item xs />
            </Grid>
        );
    }
}

export default connect()(LobbyView);
