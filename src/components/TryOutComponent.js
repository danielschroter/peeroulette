import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Button,
  TextField,
  Typography,
  FormControlLabel,
  Checkbox,
  Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

// Alert for push notifications
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  usersignUpRoot: {
    margin: "auto",
  },
  signUpPaper: {
    width: "500px",
    padding: theme.spacing(2),
  },
  signUpRow: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    "&:last-child": {
      paddingBottom: theme.spacing(0),
    },
    "&:first-child": {
      paddingTop: theme.spacing(0),
    },
  },
  signUpButtons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  signUpButton: {
    marginLeft: theme.spacing(1),
  },
}));

/**
 * For register new users
 * @param {props} props
 */
function TryOutComponent(props) {
  const classes = useStyles();

  // const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  // const [password, setPassword] = React.useState("");
  // const [password2, setPassword2] = React.useState("");
  // const [isAdmin, setIsAdmin] = React.useState(false);
  // const [isCorporate, setIsCorporate] = React.useState(false);

  // Open state for push notification (Snackbar)
  const [open, setOpen] = React.useState(false);

  // Corporate Data
  // const [compname, setCompname] = React.useState("");
  // const [domains, setDomains] = React.useState("");

  const [registerError, setRegisterError] = React.useState("");

  useEffect(() => {
    // if registration was successful set Snackbar state open to true
    if (props.user.message) {
      setOpen(true);
    } else {
      setOpen(false);
    }
    // if error during registration set RegisterError
    if (props.user.error) {
      setRegisterError(props.user.error);
      console.log(props.user);
    } else {
      setRegisterError("");
    }
  }, [props.user]);

  const onRegister = (e) => {
    e.preventDefault();
    props.onRegister(username);
  };

  // set notification/Snackbar state to false after closing Snackbar
  const handleClose = () => {
    setOpen(false);
  };

  // const onChangeEmail = (e) => {
  //   setEmail(e.target.value);
  //   setRegisterError("");
  // };

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
    setRegisterError("");
  };
  // check if a correct email address is entered
  // https://stackoverflow.com/questions/39356826/how-to-check-if-it-a-text-input-has-a-valid-email-format-in-reactjs

  return (
    <div className={classes.usersignUpRoot}>
      <Paper className={classes.signUpPaper} component="form">
        <div className={classes.signUpRow}>
          <Typography variant="h4" align="center">
            Welcome to peeroulette!
          </Typography>
          <Typography variant="body1" align="center">
            You want to try peeroulette before you give us your Information? No Problem, just give us a Name and we're good to go!
          </Typography>
        </div>
        <div className={classes.signUpRow}>
          <TextField
            label="Username"
            fullWidth
            value={username}
            onChange={onChangeUsername}
            error={registerError === "Username already exists."}
          />
        </div>
        {registerError !== "" ? (
          <div className={classes.signUpRow}>
            <Typography color="error">{registerError}</Typography>
          </div>
        ) : null}
        <div className={classes.signUpRow + " " + classes.signUpButtons}>
          <Button className={classes.signUpButton} onClick={props.onCancel}>
            Cancel
          </Button>
          <Button
            className={classes.signUpButton}
            variant="contained"
            color="primary"
            onClick={(e) => {
              onRegister(e);
            }}
            disabled={
              username === ""
            }
            type="submit"
          >
            Try it!
          </Button>
          <Snackbar open={open}>
            <Alert
              onClose={() => {
                handleClose();
                props.onCancel();
              }}
              severity="success"
            >
            </Alert>
          </Snackbar>
        </div>
      </Paper>
    </div>
  );
}

export default TryOutComponent;
