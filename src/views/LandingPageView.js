import React from "react";
import {connect} from "react-redux";
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

/**
 * Manages the process of getting movie list data
 * @param {props} props
 */
function LandingPageView(props) {

    return (
        // if no movies are loaded, the above useEffect should be triggered
        <div style={{'marginTop': '150px', 'marginBottom': '150px'}}>
            <Container maxWidth="sm">

                <Typography variant="h4" align="center" gutterBottom>
                    Hello Peeroulette
                </Typography>


                <Typography variant="body1" align="center" paragraph>
                    Comming soon...
                </Typography>

            </Container>
        </div>
    );
}

// connect() establishes the connection to the redux functionalities
export default connect()(LandingPageView);
