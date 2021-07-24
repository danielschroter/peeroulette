import React from "react";
import {withRouter} from "react-router-dom";
import {connect, useSelector} from "react-redux";


import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import CorporateFilterEmployeeComponent from "../components/CorporateFilterEmployeeComponent";
import {switchEmployeeFilter} from "../redux/actions";

import Box from "@material-ui/core/Box";


import Paper from '@material-ui/core/Paper';
import {ViewState} from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    DayView,
    Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';
import MyCalendarComponent from "../components/MyCalendarComponent";
import background from "../assets/bg_1.png";
import {makeStyles} from "@material-ui/core";
import ParticleBackground from "../components/ParticleBackground";
import AppointmentListComponent from "../components/AppointmentListComponent";


/**
 * For register new users
 * @param {props} props
 */

const useStyles = makeStyles((theme) => ({
        root: {
            minHeight: '100vh',
            backgroundImage: `url(${background})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
        },
        backCover: {
            position: 'absolute',
            // marginTop: 20,
            // top: 0,
            // bottom: 0,
            // left: 0,
            // right: 0,
            // opacity: 0.5,
            height: '102%',
            width: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        content: {
            // display: 'flex',
            color: "#fafafa",
            justifyContent: 'center',
            // alignItems: 'center',
            textAlign: 'center',
            height: "100vh",
            width: "75%",
            margin: "auto",
        },
        row: {
            display: 'flex',
            color: "#fafafa",
            justifyContent: 'center',
            // alignItems: 'center',
            textAlign: 'center',
            margin: "auto",
        },
    })
);


function CorporateSignUpView(props) {
    const user = useSelector((state) => state.user.user);
    const classes = useStyles();
    const onSwitchEmployeeFilter = (id) => {
        props.dispatch(switchEmployeeFilter(id));
    };


    return (

        <div className={classes.root}>
            <div className={classes.backCover}>
                <ParticleBackground/>
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                    }}
                >


                    <div className={classes.content}>


                        <Box pt={10}>
                            <Typography variant="h3" align="center" style={{color: "#fff"}} gutterBottom>
                                Event Section
                            </Typography>
                            <Typography variant="body1" align="center" paragraph>
                                Interact with your peers in exciting group talks....
                            </Typography>
                        </Box>

                        <Box pt={10}>
                            <Grid
                                container
                                direction="row"
                                justifyContent="space-around"
                                alignItems="baseline"
                                spacing={5}
                            >

                                    <Grid item xs={6}>
                                        <Typography variant="h5" align="center" gutterBottom>
                                            Our Recommendations
                                        </Typography>
                                        <Typography>Our Recommendation based on your Interests</Typography>
                                        <AppointmentListComponent user={user}/>
                                    </Grid>





                                <Grid item xs={6}>
                                    <Typography variant="h5" align="center" gutterBottom>
                                        Event Calendar
                                    </Typography>
                                    <Typography> You can simply adjust edit your appointments by clicking...</Typography>
                                    <Box pt={3}>
                                    <MyCalendarComponent user={user}/>
                                    </Box>
                                </Grid>

                            </Grid>
                        </Box>


                    </div>
                </div>
            </div>


        </div>
// if no movies are loaded, the above useEffect should be triggered

    );
}

export default connect()(withRouter(CorporateSignUpView));
