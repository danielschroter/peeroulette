import React from "react";
import {connect} from "react-redux";
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';


/**
 * Manages the process of getting movie list data
 * @param {props} props
 */
function LandingPageView(props) {
    // const user = useSelector((state) => state.user);

    return (
        // if no movies are loaded, the above useEffect should be triggered
        <div style={{'marginTop': '150px', 'marginBottom': '150px'}}>
            <Container maxWidth="sm">

                <Typography variant="h4" align="center" gutterBottom>
                    Hello Peeroullette
                </Typography>


                <Typography variant="body1" align="center" paragraph>
                    Comming soon...
                </Typography>
                <Grid container justify="center">
                    <Button variant="outlined" color="primary" href="/movies">
                        Look at some Movies
                    </Button>
                    <Button variant="outlined" color="primary" href="/corporate">
                        Corporates
                    </Button>
                </Grid>
            </Container>
        </div>
    );
}

// connect() establishes the connection to the redux functionalities
export default connect()(LandingPageView);
