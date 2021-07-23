import React, {useEffect} from "react";
import {withRouter} from "react-router-dom";
import {connect, useSelector} from "react-redux";

import {
    changeUser,
    getUser,
    deleteUser,
    deleteOrganization,
    changeOrganization,
    registerOrganization,
    deleteDomain,
    addDomain
} from "../redux/actions";
import EditProfileComponent from "../components/EditProfileComponent";
import ParticleBackground from "../components/ParticleBackground";


/**
 * For register new users
 * @param {props} props
 */
function EditProfileView(props) {
    const user = useSelector((state) => state.user.user);
    const organization = useSelector((state) => state.organization);

    useEffect(() => {
        console.warn("DEBUG LOG")
        console.warn(user)
    }, [user, props.history]);

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

        <div>
            <ParticleBackground/>
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "inherit",
                }}
            >

                <EditProfileComponent
                    user={user}
                    organization={organization}
                    onUpdateUser={onUpdateUser}
                    onUpdateOrganization={onUpdateOrganization}
                    onRegisterOrganization={onRegisterOrganization}
                    onDeleteUser={onDeleteUser}
                    onDeleteOrganization={onDeleteOrganization}
                    onDeleteDomain={onDeleteDomain}
                    onAddDomain={onAddDomain}
                />

            </div>

        </div>

    );
}

export default connect()(withRouter(EditProfileView));