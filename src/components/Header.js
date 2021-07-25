import React from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
import LocalMoviesIcon from "@material-ui/icons/LocalMovies";
import GitHubIcon from "@material-ui/icons/GitHub";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import Brightness3Icon from "@material-ui/icons/Brightness3";
import MessageIcon from "@material-ui/icons/Message";
import Group from "@material-ui/icons/Group";
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';

import KebabMenu from "./KebabMenu";
import {useSelector} from "react-redux";
import UserService from "../services/UserService";

const useStyles = makeStyles((theme) => ({
    toolbar: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
        paddingLeft: theme.spacing(1),
    },
}));

/**
 * Navigation bar of the app
 * @param {props} props
 */
function Header(props) {
    const classes = useStyles();

    const user = useSelector((state) => {
        // update new user data in case that userdata changed in the backend
        // check that user is not undefined to avoid error

        if (state.user.user != undefined && state.user.user._id != undefined) {
            UserService.getUser(state.user.user._id).then(function(result) {
                state.user.user.username = result.username;
                //state.user.user = result;
            } );
        }
        return state.user;
    });

    const [menuAnchor, setMenuAnchor] = React.useState(null);

    const onClickGithub = (event) => {
        var win = window.open(
            "https://gitlab.lrz.de/seba-master-2021/team-50/frontend/",
            "_blank"
        );
        win.focus();
    };

    return (
        <AppBar position="sticky">
            <KebabMenu
                open={Boolean(menuAnchor)}
                anchor={menuAnchor}
                onClose={() => setMenuAnchor(null)}
            />
            <Toolbar className={classes.toolbar}>
                <InsertEmoticonIcon
                    fontSize="large"
                    onClick={() => props.history.push("/")}
                />
                <Typography
                    className={classes.title}
                    variant="h5"
                    color="inherit"
                >
                    peeroulette
                </Typography>
                {(user.user ? (<IconButton href="/messenger" color="inherit">
                    <MessageIcon />
                </IconButton>) : null)}

                <IconButton href="/events" color="inherit">
                    <Group />
                </IconButton>
                <IconButton
                    onClick={(event) => setMenuAnchor(event.currentTarget)}
                    color="inherit"
                >
                    <MenuIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}

export default withRouter(Header);
