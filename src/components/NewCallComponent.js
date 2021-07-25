import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Route , withRouter } from "react-router-dom";
// import { withRouter } from "react-router";
import UserService from "../services/UserService";
import {
    Button,
    TextField,
    Grid,
    Typography,
    Paper,
} from "@material-ui/core";

// /**
//  * For register new users
//  * @param {props} props
//  */
// function NewCallComponent(props) {
//     return (
//       <div>user...</div>
//     );
// }
//
// export default NewCallComponent;

export default class NewCallComponent extends React.Component {

  state = {
    loading: true,
    person : null,
  }

  async componentDidMount() {
    console.log(this.props);
    const url = "http://localhost:4000/user/"+this.props.user._id+"/available/";
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    this.setState({person: data, loading: false});
    console.log(this.state);
  }

  // UserService.getAvailable(props.user._id, curPage).then(function(userBackend) {
  //
  // }

  render() {
    return(
      <div>
        {this.state.loading || !this.state.person ? (
          <div>loading</div>
        ) : (
          <div>
            <div>{this.state.person.username}</div>
            <Button
                variant="contained"
                color="primary"
                // onClick={() => { window.location.href = "/wait/"+(curPage+1); }}
                onClick={() => this.props.history.push("/wait/"+(this.props.page+1))}
            >
              Look for a new Match
            </Button>
          </div>
        )}
      </div>
    );
  }
}
const NewCallComponentRouter = withRouter(NewCallComponent);
