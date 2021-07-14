import React, { useState, useEffect } from 'react'
import { withRouter } from "react-router-dom";
import {connect, useSelector} from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import { AppBar, IconButton, Toolbar, Typography, Container, Grid, Button, Paper } from "@material-ui/core";

import {login, register, changeUser, getUser, getAvailable, deleteUser, deleteOrganization, changeOrganization, registerOrganization} from "../redux/actions";
import WaitingViewComponent from "../components/WaitingViewComponent";

/**
 * Manages the process of getting movie list data
 * @param {props} props
 */
function WaitingView(props) {
  const user = useSelector((state) => state.user.user);

  let { match } = props;

  // console.log(props.match.params.page+"+++");

  // useEffect(() => {
  //   let movieId = match.params.page;
  //   console.log("//"+movieId+"//");
  // }, [user, props.history, match.params]);

  useEffect(() => {
      // get id of movie from URL
      // let movieId = match.params.page;
      // console.log("View //"+movieId+"//");
  }, [match.params]);

  const onGetUser = (id) => {
      props.dispatch(getUser(id));
  };

  const onGetAvailable = (id, page) => {
      props.dispatch(getAvailable(id, page));
  };

  // if(req.params.page){
  //   var page = parseInt(req.params.page);
  // }else{
  //   var page = 0;
  // }

  var page;
  if(match.params.page){
    page = parseInt(match.params.page);
  }else{
    page = 0;
  }

  return (
      <Grid container spacing={3} style={{height:"100%", padding: 20}}>
          <Grid item xs />
          <Grid item xs={6} style={{height:"100%"}}>
              <WaitingViewComponent
                      user={user}
                      onGetUser={onGetUser}
                      onGetAvailable={onGetAvailable}
                      page={page}
                      // onUpdateUser={onUpdateUser}
                      // onUpdateOrganization={onUpdateOrganization}
                      // onRegisterOrganization={onRegisterOrganization}
                      // onDeleteUser={onDeleteUser}
                      // onDeleteOrganization={onDeleteOrganization}
                  />
          </Grid>
          <Grid item xs />
      </Grid>
  );
}

export default connect()(WaitingView);
