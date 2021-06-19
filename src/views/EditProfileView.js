import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import {connect, useSelector} from "react-redux";

import {login, register, changeUser, getUser, deleteUser} from "../redux/actions";
import EditProfileComponent from "../components/EditProfileComponent";

/**
 * For register new users
 * @param {props} props
 */
function EditProfileView(props) {
    const user = useSelector((state) => state.user.user);

    useEffect(() => {
    }, [user, props.history]);

    const onUpdateUser = (user) => {
        props.dispatch(changeUser(user));
    };

    const onGetUser = (id) => {
        props.dispatch(getUser(id));
    };

    const onDeleteUser = (id) => {
        props.dispatch(deleteUser(id));
    };

    const onCancel = () => {
        props.history.push("/");
    };

    return (
        <EditProfileComponent
            user={user}
            onUpdateUser={onUpdateUser}
            onGetUser={onGetUser}
            onDeleteUser={onDeleteUser}
        />
    );
}

export default connect()(withRouter(EditProfileView));