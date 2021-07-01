import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography, Container } from "@material-ui/core";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  loginButtons: {
    display: "flex",
    justifyContent: "space-between",
  },
  loginButton: {
    margin: "auto",
  },
}));
function ConfirmEmail(props) {
  const classes = useStyles();

  // get user id from URL "/confirm/:id"
  const { id } = useParams();

  useEffect(() => {
    // This gets called after every render, by default
    // (the first one, and every one after that)
    console.log("I have been mounted -> render!");

    const someFunc = () => {
      props.OnConfirm(id);
      console.log("Function being run after/on mount");
    };
    someFunc();
  });

  const onSignIn = () => {
    // navigate to the login page
    props.onSignIn();
  };

  return (
    <div style={{ marginTop: "150px", marginBottom: "150px" }}>
      <Container maxWidth="sm">
        <Typography variant="h4" align="center" gutterBottom>
          Email confirmation for User-ID {id}
        </Typography>
        <div className={classes.loginButtons}>
          <Button
            className={classes.loginButton}
            variant="contained"
            color="primary"
            onClick={onSignIn}
            type="submit"
          >
            Login
          </Button>
        </div>
      </Container>
    </div>
  );
}

export default ConfirmEmail;
