import React, { useState, useEffect } from 'react'

import NewCallComponent from "../components/NCC";
import {connect, useSelector} from "react-redux";
import {getMatches, addMatch} from "../redux/actions";

function NewCallView(props) {
    const user = useSelector((state) => state.user.user);
    let { match } = props;
    useEffect(() => {}, [match.params]);
    var page;
    const onGetUser = (id) => {
      // props.dispatch(getUser(id));
    };

    const onGetAvailable = (id, page) => {
      // props.dispatch(getAvailable(id, page));
    };

    if(match.params.page){
      page = parseInt(match.params.page);
    }else{
      page = 0;
    }

    // const onMatch = (
    //   username
    // ) => {
    //   props.dispatch(
    //     // addMatch(a, b)
    //   );
    // };

    return (
      <NewCallComponent
        user={user}
        onGetUser={onGetUser}
        onGetAvailable={onGetAvailable}
        // onMatch={onMatch}
        page={page}
      />
    );
}

export default NewCallView;
