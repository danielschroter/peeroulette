import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { logout } from "../redux/actions";
import { Menu, MenuItem, Avatar, Divider, IconButton } from "@material-ui/core";
import { connect, useSelector } from "react-redux";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import UserService from "../services/UserService";

const useStyles = makeStyles((theme) => ({
    menuitem: {
        display: "flex",
        minWidth: "200px",
    },
    avatar: {
        marginRight: theme.spacing(1),
    },
}));
/**
 * Menu for user managment
 * @param {props} props
 */
function KebabMenu(props) {
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

    const onClickLogin = () => {
        // close this menu
        props.onClose();
        // navigate to the login page
        props.history.push("/login");
    };

    const onClickLogout = () => {
        // trigger redux logout action
        props.dispatch(logout());
        // close this menu
        props.onClose();
        // navigate to the home page
        props.history.push("/");
    };

    const onClickEditProfile = () => {
        // trigger redux logout action
        // props.dispatch(logout());
        // close this menu
        props.onClose();
        // navigate to the edit profile page
        props.history.push("/edit");
    };

    const onClickCall = () => {
        // trigger redux logout action
        // props.dispatch(logout());
        // close this menu
        props.onClose();
        // navigate to the edit profile page
        props.history.push("/call");
    };

    return (
        <Menu
            open={props.open}
            anchorEl={props.anchor}
            onClose={props.onClose}
            getContentAnchorEl={null}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
            }}
        >

            {user.user
                ? [
                    <MenuItem key="user"
                              className={classes.menuitem}
                              onClick={onClickEditProfile}
                    >
                        <Avatar className={classes.avatar}>
                            {user.user.username ? user.user.username[0] : ""}
                        </Avatar>
                        {user.user.username}
                    </MenuItem>,
                    <Divider key="divider" />,
                    <MenuItem key="user"
                              className={classes.menuitem}
                              onClick={onClickCall}
                    >
                        {/*<Avatar className={classes.avatar}>
                            {user.user.username ? user.user.username[0] : ""}
                        </Avatar>*/}
                        {/* user.user.username */}
                        Start new Call
                    </MenuItem>,
                    <Divider key="divider" />,
                      <MenuItem
                          key="logout"
                          onClick={onClickLogout}
                          className={classes.menuitem}
                      >
                          <ExitToAppIcon className={classes.avatar} />
                          Logout
                      </MenuItem>,
                  ]
                : [
                      <MenuItem
                          key="login"
                          onClick={onClickLogin}
                          className={classes.menuitem}
                      >
                          <VerifiedUserIcon className={classes.avatar} />
                          Login
                      </MenuItem>,
                  ]}
        </Menu>
    );
}

// attributes of props and their type
KebabMenu.propTypes = {
    onClose: PropTypes.func.isRequired,
    anchor: PropTypes.element,
    open: PropTypes.bool.isRequired,
};

export default connect()(withRouter(KebabMenu));
