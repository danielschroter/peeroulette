import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect, useSelector } from "react-redux";

import TryOutComponent from "../components/TryOutComponent";

import { tryregister, trylogin } from "../redux/actions";

/**
 * For register new users
 * @param {props} props
 */
function TryOutView(props) {
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user.user) {
      props.history.push("/");
    }
  }, [user, props.history]);

  const onLogin = (username, password) => {
      props.dispatch();
  };

  const onRegister = (
    username
  ) => {
    props.dispatch(
      tryregister(username)
    );
    props.dispatch(
      trylogin(username)
    );
  };

  const onCancel = () => {
    props.history.push("/");
  };

  return (
    <TryOutComponent user={user} onRegister={onRegister} onCancel={onCancel} />
  );
}

export default connect()(withRouter(TryOutView));
