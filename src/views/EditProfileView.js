import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import {connect, useSelector} from "react-redux";


import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {login, register, changeUser, getUser} from "../redux/actions";
import EditProfileComponent from "../components/EditProfileComponent";
import UserServiceCRUD from "../services/UserServiceCRUD";

/**
 * For register new users
 * @param {props} props
 */
function EditProfileView(props) {
    const user = useSelector((state) => state.user);

    useEffect(() => {
    }, [user, props.history]);

    const onRegister = (user) => {
        //props.dispatch(update(user));
        //props.dispatch(register(username,password, isAdmin, compname, domains));
        //UserServiceCRUD.update(user);
       // props.dispatch(register(user, pass, isAdmin, compname, domains));
        props.dispatch(changeUser(user));
    };

    const onUpdateUser = (user) => {
        //props.dispatch(update(user));
        //props.dispatch(register(username,password, isAdmin, compname, domains));
        //UserServiceCRUD.update(user);
        // props.dispatch(register(user, pass, isAdmin, compname, domains));
        props.dispatch(changeUser(user));
    };

    const onGetUser = (id) => {
        //props.dispatch(update(user));
        //props.dispatch(register(username,password, isAdmin, compname, domains));
        //UserServiceCRUD.update(user);
        //props.dispatch(register(user, pass, isAdmin, compname, domains));
        props.dispatch(getUser(id));
    };

    const onCancel = () => {
        props.history.push("/");
    };

    return (
        <EditProfileComponent
            user={user}
            onRegister={onRegister}
            onUpdateUser={onUpdateUser}
            onGetUser={onGetUser}
        />
    );
}

export default connect()(withRouter(EditProfileView));