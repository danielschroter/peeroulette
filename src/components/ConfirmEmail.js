import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography, Container } from "@material-ui/core";
import { useParams } from "react-router-dom";
import UserService from "../services/UserService";

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

  const [username, setUsername] = React.useState("");

  // get user id from URL "/confirm/:id"
  const { id, domain } = useParams();

  const extractUser = () => {
    UserService.getUser(id).then(function(userBackend) {
        setUsername(userBackend.username);
    });
};

  useEffect(() => {
      props.OnConfirm(id);
      extractUser();
  });

  const onSignIn = () => {
    // navigate to the login page
    props.onSignIn();
  };

  return (
    <div style={{ marginTop: "150px", marginBottom: "150px" }}>
      <Container maxWidth="sm">
        {!domain ? (
            <Typography variant="h4" align="center" gutterBottom>
              Email confirmation for User-ID {id} {username}
            </Typography>
        ): (
            <Typography variant="h4" align="center" gutterBottom>
              Email confirmation for domain: {domain}
            </Typography>
        )}

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
