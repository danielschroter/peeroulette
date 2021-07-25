import React from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
import LocalMoviesIcon from "@material-ui/icons/LocalMovies";
import GitHubIcon from "@material-ui/icons/GitHub";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import Brightness3Icon from "@material-ui/icons/Brightness3";
import Group from "@material-ui/icons/Group";
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';

import KebabMenu from "./KebabMenu";

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
                <IconButton href="/events" color="inherit">
                    <Group />
                </IconButton>
                <IconButton onClick={onClickGithub} color="inherit">
                    <GitHubIcon />
                </IconButton>
                {/*<IconButton onClick={props.toggletheme} color="inherit">*/}
                {/*    {props.darkmode ? <WbSunnyIcon /> : <Brightness3Icon />}*/}
                {/*</IconButton>*/}
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
