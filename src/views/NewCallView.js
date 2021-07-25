import React, { useState, useEffect } from 'react'

import NewCallComponent from "../components/NCC";
import {connect, useSelector} from "react-redux";
import {getMatches, addMatch, getAvailable, getUser} from "../redux/actions";

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

    const onMatch = (
      usera, userb
    ) => {
      props.dispatch(
        addMatch(usera, userb)
      );
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
        onMatch={onMatch}
        page={page}
      />
    );
}

export default NewCallView;
