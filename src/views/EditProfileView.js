import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import {connect, useSelector} from "react-redux";

import {login, register, changeUser, getUser, deleteUser, deleteOrganization, changeOrganization, registerOrganization, deleteDomain, addDomain} from "../redux/actions";
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

    const onDeleteDomain = (id) => {
        props.dispatch(deleteDomain(id));
    };

    const onAddDomain = (domain) => {
        props.dispatch(addDomain(domain));
    };

    const onUpdateOrganization = (organization) => {
        props.dispatch(changeOrganization(organization));
    };

    const onRegisterOrganization = (user_id, compname, domains) => {
        props.dispatch(registerOrganization(user_id, compname, domains));
    };

    return (
        <EditProfileComponent
            user={user}
            onGetUser={onGetUser}
            onUpdateUser={onUpdateUser}
            onUpdateOrganization={onUpdateOrganization}
            onRegisterOrganization={onRegisterOrganization}
            onDeleteUser={onDeleteUser}
            onDeleteOrganization={onDeleteOrganization}
            onDeleteDomain={onDeleteDomain}
            onAddDomain={onAddDomain}
        />
    );
}

export default connect()(withRouter(EditProfileView));