import React, {
  useEffect
} from "react";
import {
  Route,
  withRouter
} from "react-router-dom";
import {
  makeStyles
} from "@material-ui/core/styles";
import {
  Button,
  TextField,
  Grid,
  Typography,
  Paper,
} from "@material-ui/core";
import CustomTextField from "./CustomTextField";
import DetailsArea from "./DetailsArea";
import PropTypes from "prop-types";
import UserService from "../services/UserService";
import CallView from "../components/JC";
import {connect, useSelector} from "react-redux";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const useStyles = makeStyles((theme) => ({
  flexCol: {
    display: "flex",
    flexDirection: "column",
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
  },
  justifySpaceBetween: {
    justifyContent: "space-between",
  },
  flex: {
    flex: 1,
  },
  flexEnd: {
    justifyContent: "flex-end",
  },
  marginSides: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  center: {
    margin: "auto",
  },
  padding: {
    padding: theme.spacing(2),
  },
  maxWidth: {
    width: "100%",
    maxWidth: "1500px",
  },
  pageArea: {
    paddingBottom: theme.spacing(2),
    "&:last-child": {
      paddingBottom: 0,
    },
  },
  title: {
    marginTop: theme.spacing(4),
  },
  barMinHeight: {
    minHeight: theme.spacing(5),
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(2),
  },
  signUpRow: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    "&:last-child": {
      paddingBottom: theme.spacing(1),
    },
    "&:first-child": {
      paddingTop: theme.spacing(1),
    },
  },
  userDataFont: {
    color: "black",
    fontWeight: "bold",
  },
  deleteProfileButton: {
    marginRight: theme.spacing(1),
    backgroundColor: "#cc0000",
    marginTop: "12px",
  },
  editNameButton: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
  cancelNameButton: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
  saveNameButton: {
    marginRight: theme.spacing(1),
  },
  cancelPasswordButton: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
  savePasswordButton: {
    marginRight: theme.spacing(1),
  },
  editPasswordButton: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
  interestsButton: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
    fontSize: "15px",
    pointerEvents: "none",
  },
  deleteInterestsIcon: {
    marginTop: theme.spacing(1),
    fontSize: "15px",
    pointerEvents: "none",
  },
  deleteInterestsCross: {
    marginTop: theme.spacing(1),
    fontSize: "15px",
    marginRight: theme.spacing(1),
    color: "#cc0000",
  },
  addInterestsIcon: {
    marginTop: theme.spacing(1),
    fontSize: "15px",
    marginRight: theme.spacing(1),
    color: "green",
  },
  addInterestsButton: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(1),
    backgroundColor: "green",

  },
  deleteInterestsButton: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(1),
    backgroundColor: "#cc0000",
  },

}));

/**
 * For register new users
 * @param {props} props
 */
function NewCallComponent(props) {
  const user = useSelector((state) => state.user.user);

  const classes = useStyles();

  const [loading, setLoading] = React.useState(0);
  const [page, setPage] = React.useState(0);
  const [_id, set_id] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [matchedCount, setMatchedCount] = React.useState("");
  const [city, setCity] = React.useState("");
  const [university, setUniversity] = React.useState("");
  const [organization, setOrganization] = React.useState("");

  const extractUser = () => {
      if (!props.user) {
          return;
      }

      // UserService.getUser(props.user._id).then(function(userBackend) {
          UserService.getAvailable(props.user._id, page).then(function(userBackend) {
              set_id(userBackend._id);
              setUsername(userBackend.username);
              setMatchedCount(userBackend.matchedCount);
              setCity(userBackend.city);
              setUniversity(userBackend.university);
              setOrganization(userBackend.organization);
              setLoading("false");
          }).catch(function(error){
                //400+ response codes
                setUsername('Nope');
                setLoading("true");
          });
  };

  // const curPage = props.page;

  useEffect(() => {
      extractUser();
      // extractInterests();
      // console.log(props);
  }, [props.user, page]);

// console.log(page);

  if(username == "Nope"){
    return (
      <div style={{padding: 20 }}>
        <Paper style={{height:"100%", padding: 20 }}>
          <Typography  variant="h5">Unfortunately we couldn't find any further Matches for you at the Moment.</Typography>
          <Button
            variant = "contained"
            color = "primary"
            // onClick={() => { window.location.href = "/wait/"+(curPage+1); }}
            onClick={() => setPage(0)}
          >
          Try again
          </Button>
        </Paper>
      </div>
    )
  }else{
    return (
      <Grid container spacing={3} style={{height:"100%", padding: 20}}>
          <Grid item xs>
              {/*<Paper style={{ padding: 20 }}>xs</Paper>*/}
          </Grid>
          <Grid item xs={6} style={{height:"100%"}}>
              <Paper style={{height:"100%", padding: 20 }}>
                  <div style={{height:"100%"}}>
                    <CallView
                      id = {_id}
                    />
                  </div>
              </Paper>
          </Grid>
          <Grid item xs>
            <Paper style={{height:"100%", padding: 20 }}>
              <Typography variant="h1">{username}</Typography>
              <Typography variant="subtitle1">Common Interests: {matchedCount}</Typography>
              <Button
                variant = "contained"
                color = "primary"
                // onClick={() => { window.location.href = "/wait/"+(curPage+1); }}
                onClick={() => setPage(page + 1)}
              >
              Look
              for a new Match
              </Button>
            </Paper>
          </Grid>
      </Grid>
    );
  }
}

// attributes of props and their type
// PeerInformation.propTypes = {
//     user: PropTypes.object,
//     onGetUser: PropTypes.func,
// };

// withRouter() allows accsing the necessary functionality to navigate from this component
export default withRouter(NewCallComponent);
