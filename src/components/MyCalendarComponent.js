import React, {useEffect} from "react";
import {
    Switch,
    FormControlLabel,
} from "@material-ui/core";
import UserService from "../services/UserService";
import {useSelector} from "react-redux";

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    DayView,
    WeekView,
    MonthView,
    Toolbar,
    DateNavigator,
    Appointments,
    AppointmentTooltip,
    TodayButton,
} from '@devexpress/dx-react-scheduler-material-ui';
import { withStyles } from '@material-ui/core/styles';


/**
 * For register new users
 * @param {props} props
 */
function MyCalendarComponent(props) {


    const schedulerData = [
        { startDate: '2021-07-13T10:45', endDate: '2021-07-13T12:45', title: 'Gym', link: "Jitsi URL1", description: "Get ready in the gym for summer" },
        { startDate: '2021-07-13T17:30', endDate: '2021-07-13T19:30', title: 'DeepL Exam', link: "Jitsi URL2",  description: "Make an Exam in DeepLearning Test" },
    ];

    const [currentDate, setCurrentDate] = React.useState('2021-07-13T10:45');


    const onCurrentDateChange = (value) => {
        setCurrentDate(value);
    }


    const style = ({ palette }) => ({
        icon: {
            color: palette.action.active,
        },
        textCenter: {
            textAlign: 'Center',
        },
        firstRoom: {
            background: 'url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/Lobby-4.jpg)',
        },
        secondRoom: {
            background: 'url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/MeetingRoom-4.jpg)',
        },
        thirdRoom: {
            background: 'url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/MeetingRoom-0.jpg)',
        },
        header: {
            height: '260px',
            backgroundSize: 'cover',
        },
        commandButton: {
            backgroundColor: 'rgba(255,255,255,0.65)',
        },
    });

    const Content = withStyles(style, { name: 'Content' })(({
                                                                children, appointmentData, classes, ...restProps
                                                            }) => (
        <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
            <Grid container alignItems="center">
                <Grid item xs={2} className={classes.textCenter}>
                    <span>Link: </span>
                </Grid>
                <Grid item xs={10}>
                    <span>{appointmentData.link}</span>
                </Grid>
                <Grid item xs={2} className={classes.textCenter}>
                    <span>What: </span>
                </Grid>
                <Grid item xs={10}>
                    <span>{appointmentData.description}</span>
                </Grid>
            </Grid>
        </AppointmentTooltip.Content>
    ));


    return (
        <Paper>
            <Scheduler
                data={schedulerData}
            >

                <ViewState
                    currentDate={currentDate}
                    onCurrentDateChange={onCurrentDateChange}
                />
                <WeekView
                    startDayHour={0}
                    endDayHour={24}
                />
                <Toolbar/>
                <DateNavigator/>
                <TodayButton/>
                <Appointments/>
                <AppointmentTooltip
                    contentComponent={Content}
                />
            </Scheduler>
        </Paper>
    );
}


export default MyCalendarComponent;
