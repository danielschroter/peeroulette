import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import ConfirmComponent from "../components/ConfirmEmail";

import { confirm } from "../redux/actions";

/**
 * For email confirmation
 * @param {props} props
 */
function ConfirmView(props) {

  const OnConfirm = (id) => {
    props.dispatch(confirm(id));
  };

  const onSignIn = () => {
    props.history.push("/login");
  };

  return <ConfirmComponent onSignIn={onSignIn} OnConfirm={OnConfirm} />;
}

export default connect()(withRouter(ConfirmView));
