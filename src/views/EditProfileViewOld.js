import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import {connect, useSelector} from "react-redux";


import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {register} from "../redux/actions";
import EditProfileComponentOld from "../components/EditProfileComponentOld";
import EditProfileComponent from "../components/EditProfileComponent";

/**
 * For register new users
 * @param {props} props
 */
function EditProfileViewOld(props) {
    const user = useSelector((state) => state.user);

    useEffect(() => {
    }, [user, props.history]);

    const onRegister = (username, password, isAdmin, compname, domains) => {
        props.dispatch(register(username, password, isAdmin, compname, domains));
    };

    const onCancel = () => {
        props.history.push("/");
    };

    return (
        <EditProfileComponent
            user={user}
        />
    );
}

export default connect()(withRouter(EditProfileViewOld));