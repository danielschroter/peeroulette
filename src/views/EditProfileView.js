import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";


import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

/**
 * For register new users
 * @param {props} props
 */
function EditProfileView(props) {

    return (
        // if no movies are loaded, the above useEffect should be triggered
        <div style={{'marginTop': '150px', 'marginBottom': '150px'}}>
            <Container maxWidth="sm">

                <Typography variant="h4" align="center" gutterBottom>
                    Hello Corporates
                </Typography>


                <Typography variant="body1" align="center" paragraph>
                    We will connect your employees to create a vibrant corporate culture...
                </Typography>
                <Grid container justify="center">
                    <Button variant="outlined" color="primary" href="/register">
                        Sign Up
                    </Button>
                </Grid>
            </Container>
        </div>
    );
}

export default connect()(withRouter(EditProfileView));