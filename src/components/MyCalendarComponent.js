import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import AppointmentService from "../services/AppointmentService";
import {ViewState, EditingState, IntegratedEditing} from '@devexpress/dx-react-scheduler';
import Link from 'react-router-dom/Link';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Autocomplete from "@material-ui/lab/Autocomplete";
import Chip from "@material-ui/core/Chip";
import AppointmentAlertComponent from "./AppointmentAlertComponent";
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import Collapse from "@material-ui/core/Collapse";
import Box from "@material-ui/core/Box";

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
import {makeStyles, withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import UserService from "../services/UserService";
import MatchService from "../services/MatchService";
import {useSelector} from "react-redux";
import {useEffect} from "react";
import App from "../App";


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


const messages = {
    moreInformationLabel: '',
};

const TextEditor = (props) => {
    if (props.type === 'multilineTextEditor') {
        return null;
    }
    return <AppointmentForm.TextEditor {...props} />
}

const BasicLayout = ({onFieldChange, appointmentData, ...restProps}) => {

    // const [allInterests, setAllInterests] = React.useState([]);

    const allInterests = ["Business and Industry", "Advertising", "Agriculture", "Architecture", "Aviation", "Banking", "Investment banking",
        "Online banking", "Retail banking", "Business", "Construction", "Design", "Fashion design", "Graphic design", "Interior design", "Economics", "Engineering", "Entrepreneurship", "Health care",
        "Higher education", "Management", "Marketing", "Nursing", "Online", "Digital marketing",
        "Display advertising", "Email marketing", "Online advertising", "Search engine optimization", "Social media", "Social media marketing",
        "Web design", "Web development", "Web hosting", "Personal finance", "Creditcards", "Insurance", "Investment", "Mortgage loans", "Real estate",
        "Retail", "Sales", "Science", "Small business", "Entertainment", "Games", "Action games", "Board games",
        "Browser games", "Card games", "Casino games", "First-person shooter games", "Gambling", "Massively multiplayer online games", "Massively multiplayer online role-playing games",
        "Online games", "Online poker", "Puzzle video games", "Racing games", "Role-playing games", "Shooter games", "Simulation games", "Sports games", "Strategy games", "Video games",
        "Word games", "Live events", "Ballet", "Bars", "Concerts", "Dancehalls", "Music festivals", "Nightclubs", "Parties", "Plays", "Theatre", "Movies", "Action movies",
        "Animated movies", "Anime movies", "Bollywood movies", "Comedy movies", "Documentary movies", "Drama movies", "Fantasy movies", "Horror movies", "Musical theatre", "Science fiction movies",
        "Thriller movies", "Music", "Blues music", "Classical music", "Country music", "Dance music", "Electronic music", "Gospel music",
        "Heavy metal music", "Hip hop music", "Jazz music", "Music videos", "Pop music", "Rhythm and blues music", "Rock musicSoul music", "Reading", "Books",
        "Comics", "E-books", "Fiction books", "Literature", "Magazines", "Manga", "Mystery fiction", "Newspapers",
        "Non-fiction books", "Romance novels", "TV", "TV comedies", "TV game shows", "TV reality shows", "TV talkshows", "Family and relationships",
        "Dating", "Family", "Fatherhood", "Friendship", "Marriage", "Motherhood", "Parenting", "Weddings", "Fitness and wellness",
        "Bodybuilding", "Meditation", "Physical exercise", "Physical fitness", "Running", "Weight training", "Yoga", "Food and drink", "Alcoholic beverages", "Beer",
        "Distilled beverage", "Wine", "Beverages", "Coffee", "Energy drinks", "Juice", "Soft drinks", "Tea", "Cooking", "Baking",
        "Recipes", "Cuisine", "Chinese cuisine", "French cuisine", "German cuisine", "Greek cuisine", "Indian cuisine", "Italian cuisine", "Japanese cuisine", "Korean cuisine", "Latin American cuisine",
        "Mexican cuisine", "Middle Eastern cuisine", "Spanish cuisine", "Thai cuisine", "Vietnamese cuisine", "Food", "Barbecue", "Chocolate", "Desserts", "Fast food",
        "Organic food", "Pizza", "Seafood", "Veganism", "Vegetarianism", "Restaurants", "Coffeehouses",
        "Diners", "Fast casual restaurants", "Fast food restaurants", "Hobbies and activities", "Arts and music", "Acting",
        "Crafts", "Dance", "Drawing", "Drums", "Fine art", "Guitar", "Painting", "Performing arts", "Photography", "Sculpture", "Singing", "Writing", "Current events",
        "Home and garden", "Do it yourself (DIY)", "Furniture", "Gardening", "Home Appliances", "Home improvement", "Pets", "Birds", "Cats", "Dogs", "Fish", "Horses", "Pet food",
        "Rabbits", "Reptiles", "Politics and social issues", "Charity and causes", "Community issues",
        "Environmentalism", "Law", "Military", "Politics", "Religion", "Sustainability", "Veterans", "Volunteering", "Travel", "Adventure travel", "Air travel", "Beaches",
        "Car rentals", "Cruises", "Ecotourism", "Hotels", "Lakes", "Mountains", "Nature", "Theme parks", "Tourism", "Vacations",
        "Vehicles", "Automobiles", "Boats", "Electric vehicle", "Hybrids", "Minivans", "Motorcycles", "RVs", "SUVs", "Scooters", "Trucks", "Shopping and fashion", "Beauty", "Beauty salons", "Cosmetics", "Fragrances",
        "Hair products", "Spas", "Tattoos", "Clothing", "Children’s clothing", "Men’s clothing", "Shoes", "Women’s clothing", "Fashionaccessories", "Dresses", "Handbags", "Jewelry",
        "Sunglasses", "Shopping", "Boutiques", "Coupons", "Discount stores", "Luxury goods", "Online shopping", "Shopping malls", "Toys", "Sports and outdoors", "Outdoor recreation", "Boating", "Camping", "Fishing",
        "Horseback riding", "Hunting", "Mountain biking", "Surfing", "Sports", "American football", "Association football (Soccer)", "Auto racing", "Baseball", "Basketball", "College football", "Golf", "Marathons",
        "Skiing", "Snowboarding", "Swimming", "Tennis", "Thriathlons", "Volleyball", "Technology", "Computers", "Computer memory", "Computer monitors", "Computer processors", "Computer servers", "Desktop computers", "Free software", "Hard drives", "Network storage", "Software", "Tablet computers",
        "Consumer electronics", "Audio equipment", "Camcorders", "Cameras", "E-book readers", "GPS devices", "Game consoles", "Mobile phones", "Portable media players", "Projectors", "Smartphones", "Televisions",
    ];
    // const extractInts = async() => {
    //     let ints = await MatchService.getInterests();
    //     setAllInterests(ints[0].facebookInterests);
    // }

    // useEffect(() => {
    //    extractInts();
    // }, []);

    const onURLFieldChange = (nextValue) => {
        onFieldChange({link: nextValue})
    };

    const onDescriptionFieldChange = (nextValue) => {
        onFieldChange({description: nextValue})
    };

    const onInterestFieldChange = (event, nextValue) => {
        onFieldChange({interests: nextValue})
    };

    return (
        <AppointmentForm.BasicLayout
            appointmentData={appointmentData}
            onFieldChange={onFieldChange}
            {...restProps}
        >
            <AppointmentForm.Label
                text="Video URL"
                type="title"
            />
            <AppointmentForm.TextEditor
                value={appointmentData.link}
                placeholder="We will automatically set this value after saving :)"
                onValueChange={onURLFieldChange}
                readOnly
            />
            <AppointmentForm.Label
                text="Description"
                type="title"
            />
            <AppointmentForm.TextEditor
                type='multilineTextEditor'
                value={appointmentData.description}
                placeholder="Description Field"
                onValueChange={onDescriptionFieldChange}
            />

            <AppointmentForm.Label
                style={{'marginTop': '20px'}}
                text="Interests"
                type="title"
            />

            <Autocomplete
                multiple
                id="tags-outlined"
                options={allInterests}
                getOptionLabel={(option) => option}
                defaultValue={appointmentData.interests}
                filterSelectedOptions
                onChange={onInterestFieldChange}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="outlined"
                        label="Interests"
                        placeholder="Your Talk Tags"
                    />
                )}
            />

        </AppointmentForm.BasicLayout>
    );
};

const styles = theme => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
});


class MyCalendarComponent extends React.PureComponent {


    constructor(props) {
        super(props);
        this.state = {
            data: [],
            currentDate: '2021-07-27',
            addedAppointment: {},
            appointmentChanges: {},
            editingAppointment: undefined,
            user: props.user,
            unallowedEdit: false,
            mappings: {},
            open: true,
        };
        this.currentDataChange = (currentDate) => {
            this.setState({currentDate});
        };
        this.commitChanges = this.commitChanges.bind(this);
        this.changeAddedAppointment = this.changeAddedAppointment.bind(this);
        this.changeAppointmentChanges = this.changeAppointmentChanges.bind(this);
        this.changeEditingAppointment = this.changeEditingAppointment.bind(this);
    }

    mapAppointmentData = (appointment) => ({
        id: appointment._id,
        startDate: appointment.startDate,
        endDate: appointment.endDate,
        title: appointment.title,
        description: appointment.description,
        link: appointment.link,
        user: appointment.user,
        interests: appointment.interests,
    });

    async componentDidMount() {
        let response = await AppointmentService.getAppointments();
        let apps = response.appointments;
        let mapping = response.mapping;

        let res_mapped = apps.map(this.mapAppointmentData, mapping);

        let newDate = new Date()
        let date = await newDate.getDate();
        let month = await newDate.getMonth() + 1;
        let year = await newDate.getFullYear();

        let nDate = "" + year + "-" + month + "-" + date;

        console.log(" date: " + date);

        let allInterests = await MatchService.getInterests()
        this.setState({
            data: res_mapped,
            mapping: mapping,
            allInterests: allInterests[0].facebookInterests,
            currentDate: nDate
        });
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

    setUnallowedEdit(value) {
        this.setState({unallowedEdit: value})
    }

    async commitChanges({added, changed, deleted}) {
        var app = null;

        if (added) {
            try {
                added["user"] = this.state.user._id;
                added["link"] = "localhost:3000/group/" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
                const response = await AppointmentService.createAppointment(added);
                app = response.map(this.mapAppointmentData)[0];
            } catch (e) {
                return e;
            }
        }

        if (changed || deleted) {
            try {
                var key=0;
                if (changed){
                    key = Object.keys(changed)[0];
                }else{
                    key = deleted;
                }

                const response = await AppointmentService.getAppointment(key);
                app = response;
            } catch (e) {
                return e;
            }
        }
        this.setState((state) => {
            let {data, unallowedEdit} = state;
            if (added) {
                //const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
                data = [...data, {id: app.id, ...added}];
            }
            if (changed) {

                if (app.user == this.state.user._id) {

                    console.log("Getting in here");
                    data = data.map(appointment => (
                        changed[appointment.id] ? {...appointment, ...changed[appointment.id]} : appointment));
                    const key = Object.keys(changed)[0];

                    var obj = null;
                    for (var i in data) {
                        if (data[i].id == key) {
                            // Add an element to the dictionary
                            obj = data[i];
                            const resp = AppointmentService.updateAppointment(obj);
                            console.log("resp: " + resp);
                            break; // If you want to break out of the loop once you've found a match
                        }
                    }
                } else {
                    unallowedEdit = true;
                    console.log("unallowedEdit: " + this.state.unallowedEdit);
                }


            }
            if (deleted !== undefined) {
                if (app.user == this.state.user._id) {
                    data = data.filter(appointment => appointment.id !== deleted);
                    AppointmentService.deleteAppointment(deleted);
                }else{
                    unallowedEdit = true;
                }
            }
            console.log(data);
            return {data, unallowedEdit};
        });
    }


    render() {
        const {
            currentDate, data, addedAppointment, appointmentChanges, editingAppointment,
        } = this.state;


        const {classes} = this.props;

        const Content = withStyles(style, {name: 'Content'})(({
                                                                  children, appointmentData, classes, ...restProps
                                                              }) => (
            <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>
                <Grid container alignItems="center">
                    <Grid item xs={2} className={classes.textCenter}>
                        <span>Link: </span>
                    </Grid>
                    <Grid item xs={10}>
                        {
                            appointmentData.link ?
                                (
                                    <Link to={appointmentData.link.split("3000")[1]}>{appointmentData.link}</Link>
                                ) :
                                (<Link to="#">{appointmentData.link}</Link>)
                        }
                    </Grid>
                    <Grid item xs={2} className={classes.textCenter}>
                        <span>What: </span>
                    </Grid>
                    <Grid item xs={10}>
                        <span>{appointmentData.description}</span>
                    </Grid>
                    <Grid item xs={2} className={classes.textCenter}>
                        <span>Who: </span>
                    </Grid>
                    <Grid item xs={10}>
                        <span>{this.state.mapping[appointmentData.user]}</span>
                    </Grid>
                    <Grid item xs={2} className={classes.textCenter}>
                        <span>Tags: </span>
                    </Grid>
                    <Grid item xs={10}>
                        <span>{appointmentData.interests.map(app => app + ", ")}</span>
                    </Grid>
                </Grid>
            </AppointmentTooltip.Content>
        ));

        return (
            <div>
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
                            startDayHour={0}
                            endDayHour={24}
                        />
                        <Toolbar/>
                        <DateNavigator/>
                        <AllDayPanel/>
                        <TodayButton/>
                        <EditRecurrenceMenu/>
                        <ConfirmationDialog/>
                        <Appointments/>
                        <AppointmentTooltip
                            contentComponent={Content}
                            showOpenButton
                            showDeleteButton
                        />
                        <AppointmentForm
                            basicLayoutComponent={BasicLayout}
                            textEditorComponent={TextEditor}
                            messages={messages}/>
                    </Scheduler>
                </Paper>

                <div>
                    {this.state.unallowedEdit ? (
                        <Box pt={5}>
                            <div className={classes.root}>
                                <Collapse in={this.state.open}>
                                    <Alert severity="error"
                                           action={
                                               <IconButton
                                                   aria-label="close"
                                                   color="inherit"
                                                   size="small"
                                                   onClick={() => {
                                                       this.setState({unallowedEdit: false});
                                                   }}
                                               >
                                                   <CloseIcon
                                                       fontSize="inherit"/>
                                               </IconButton>
                                           }
                                    >
                                        You accidently tried to edit or delete an appointment that is not yours...
                                    </Alert>
                                </Collapse>
                            </div>
                        </Box>


                    ) : null}
                </div>

            </div>
        );
    }
}

export default withStyles(styles)(MyCalendarComponent);