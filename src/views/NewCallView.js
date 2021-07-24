import React, { useState, useEffect } from 'react'

import NewCallComponent from "../components/NCC";
import {connect, useSelector} from "react-redux";
import {login, register, changeUser, getUser, getAvailable, deleteUser, deleteOrganization, changeOrganization, registerOrganization} from "../redux/actions";

function NewCallView(props) {
    const user = useSelector((state) => state.user.user);
    let { match } = props;
    useEffect(() => {}, [match.params]);
    var page;
    const onGetUser = (id) => {
      props.dispatch(getUser(id));
    };

    const onGetAvailable = (id, page) => {
      props.dispatch(getAvailable(id, page));
    };

    if(match.params.page){
      page = parseInt(match.params.page);
    }else{
      page = 0;
    }

    return (
      <NewCallComponent
        user={user}
        onGetUser={onGetUser}
        onGetAvailable={onGetAvailable}
        page={page}
      />
    );
}

export default NewCallView;
