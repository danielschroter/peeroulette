import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import AppointmentService from "../services/AppointmentService";
import {ViewState, EditingState} from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    Toolbar,
    DateNavigator,
    Appointments,
    AppointmentForm,
    AppointmentTooltip,
    WeekView,
    EditRecurrenceMenu,
    AllDayPanel,
    ConfirmationDialog,
    TodayButton,

} from '@devexpress/dx-react-scheduler-material-ui';
import {withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";


const appointments = [
    {
        id: 234234,
        startDate: '2021-07-13T10:45',
        endDate: '2021-07-13T12:45',
        title: 'Gym',
        link: "Jitsi URL1",
        description: "Get ready in the gym for summer"
    },
    {
        id: 12312323,
        startDate: '2021-07-13T17:30',
        endDate: '2021-07-13T19:30',
        title: 'DeepL Exam',
        link: "Jitsi URL2",
        description: "Make an Exam in DeepLearning Test"
    },
];


const style = ({palette}) => ({
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

export default class MyCalendarComponent_2 extends React.PureComponent {



    constructor(props) {
        super(props);
        this.state = {
            data: appointments,
            currentDate: '2021-07-13',
            addedAppointment: {},
            appointmentChanges: {},
            editingAppointment: undefined,
        };
        this.currentDataChange = (currentDate) => {
            this.setState({currentDate});
        };
        this.commitChanges = this.commitChanges.bind(this);
        this.changeAddedAppointment = this.changeAddedAppointment.bind(this);
        this.changeAppointmentChanges = this.changeAppointmentChanges.bind(this);
        this.changeEditingAppointment = this.changeEditingAppointment.bind(this);
    }

    mapAppointmentData = appointment => ({
        id: appointment._id,
        startDate: appointment.startDate,
        endDate: appointment.endDate,
        title: appointment.title,
        description: appointment.description,
        link: appointment.link,
        user: appointment.user,
    });

    async componentDidMount() {
        let response = await AppointmentService.getAppointments();
        let res_mapped = response.map(this.mapAppointmentData);
        this.setState({data: res_mapped});
    }



    changeAddedAppointment(addedAppointment) {
        this.setState({addedAppointment});
    }

    changeAppointmentChanges(appointmentChanges) {
        this.setState({appointmentChanges});
    }

    changeEditingAppointment(editingAppointment) {
        this.setState({editingAppointment});
    }

    async commitChanges({added, changed, deleted}) {
        this.setState((state) => {
            let {data} = state;
            if (added) {
                const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
                data = [...data, {id: startingAddedId, ...added}];
            }
            if (changed) {

                data = data.map(appointment => (
                    changed[appointment.id] ? {...appointment, ...changed[appointment.id]} : appointment));
                const key = Object.keys(changed)[0];
                var obj = null;
                for(var i in data){
                    if(data[i].id == key){
                        // Add an element to the dictionary
                        obj = data[i];
                        const resp = AppointmentService.updateAppointment(obj);
                        console.log("resp: " + resp);
                        break; // If you want to break out of the loop once you've found a match
                    }
                }



            }
            if (deleted !== undefined) {
                data = data.filter(appointment => appointment.id !== deleted);
            }
            console.log(data);
            return {data};
        });
    }

    render() {
        const {
            currentDate, data, addedAppointment, appointmentChanges, editingAppointment,
        } = this.state;

        const Content = withStyles(style, {name: 'Content'})(({
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
                    data={data}
                    height={660}
                >
                    <ViewState
                        currentDate={currentDate}
                        onCurrentDateChange={this.currentDataChange}
                    />
                    <EditingState
                        onCommitChanges={this.commitChanges}
                        addedAppointment={addedAppointment}
                        onAddedAppointmentChange={this.changeAddedAppointment}
                        appointmentChanges={appointmentChanges}
                        onAppointmentChangesChange={this.changeAppointmentChanges}
                        editingAppointment={editingAppointment}
                        onEditingAppointmentChange={this.changeEditingAppointment}
                    />
                    <WeekView
                    />
                    <Toolbar/>
                    <DateNavigator/>
                    <AllDayPanel/>
                    <TodayButton/>
                    {/*<EditRecurrenceMenu/>*/}
                    <ConfirmationDialog/>
                    <Appointments/>
                    <AppointmentTooltip
                        contentComponent={Content}
                        showOpenButton
                        showDeleteButton
                    />
                    <AppointmentForm/>
                </Scheduler>
            </Paper>
        );
    }
}