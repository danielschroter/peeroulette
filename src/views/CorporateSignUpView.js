import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect, useSelector } from "react-redux";

import CorporateSignUpComponent from "../components/CorporateSignUpComponent";

import { register } from "../redux/actions";

/**
 * For register new users
 * @param {props} props
 */
function CorporateSignUpView(props) {
    const user = useSelector((state) => state.user);

    useEffect(() => {
        if (user.user) {
            props.history.push("/");
        }
    }, [user, props.history]);

    const onRegister = (username, password, isAdmin, compname, domains) => {
        props.dispatch(register(username, password, isAdmin, compname, domains));
    };

    const onCancel = () => {
        props.history.push("/");
    };

    return (
        <CorporateSignUpComponent
            user={user}
            onRegister={onRegister}
            onCancel={onCancel}
        />
    );
}

export default connect()(withRouter(CorporateSignUpView));
