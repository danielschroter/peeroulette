import React  from "react";
import { withRouter } from "react-router-dom";
import {connect, useSelector} from "react-redux";


import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import CorporateFilterEmployeeComponent from "../components/CorporateFilterEmployeeComponent";
import {switchEmployeeFilter} from "../redux/actions";


import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    DayView,
    Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';
import MyCalendarComponent from "../components/MyCalendarComponent";


/**
 * For register new users
 * @param {props} props
 */




function CorporateSignUpView(props) {
    const user = useSelector((state) => state.user.user);

    const onSwitchEmployeeFilter = (id) => {
        props.dispatch(switchEmployeeFilter(id));
    };



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
                <Grid container justify="center" style={{'marginTop':'20px'}}>
                    <CorporateFilterEmployeeComponent onSwitchEmployeeFilter={onSwitchEmployeeFilter} user={user}/>
                </Grid>



                <Grid container justify="center" style={{'marginTop':'20px'}}>
                    <MyCalendarComponent/>
                </Grid>




            </Container>

        </div>
    );
}

export default connect()(withRouter(CorporateSignUpView));
