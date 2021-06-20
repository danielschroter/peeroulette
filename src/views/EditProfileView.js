import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import {connect, useSelector} from "react-redux";

import {login, register, changeUser, getUser, deleteUser, deleteOrganization, changeOrganization} from "../redux/actions";
import EditProfileComponent from "../components/EditProfileComponent";

/**
 * For register new users
 * @param {props} props
 */
function EditProfileView(props) {
    const user = useSelector((state) => state.user.user);

    useEffect(() => {
    }, [user, props.history]);

    const onGetUser = (id) => {
        props.dispatch(getUser(id));
    };

    const onUpdateUser = (user) => {
        props.dispatch(changeUser(user));
    };

    const onDeleteUser = (id) => {
        props.dispatch(deleteUser(id));
    };

    const onCancel = () => {
        props.history.push("/");
    };

    const onDeleteOrganization = (id) => {
        props.dispatch(deleteOrganization(id));
    };

    const onUpdateOrganization = (organization) => {
        props.dispatch(changeOrganization(organization));
    };

    const onRegister = (username, password, isAdmin, compname, domains) => {
        props.dispatch(register(username, password, isAdmin, compname, domains));
    };

    return (
        <EditProfileComponent
            user={user}
            onGetUser={onGetUser}
            onUpdateUser={onUpdateUser}
            onUpdateOrganization={onUpdateOrganization}
            onDeleteUser={onDeleteUser}
            onRegister={onRegister}
            onDeleteOrganization={onDeleteOrganization}
        />
    );
}

export default connect()(withRouter(EditProfileView));