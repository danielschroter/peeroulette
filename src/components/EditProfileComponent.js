import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Button, Grid, TextField} from "@material-ui/core";
import PropTypes from "prop-types";
import CustomTextField from "../components/CustomTextField";
import CustomChip from "../components/CustomChip";
import DetailsArea from "../components/DetailsArea";
import MovieCast from "./MovieCast";
import { withRouter } from "react-router-dom";
import MovieService from "../services/MovieService";
import ReleaseDates from "./ReleaseDates";
import Ratings from "./Ratings";
import Synopsis from "./Synopsis";

const useStyles = makeStyles((theme) => ({
    flexCol: {
        display: "flex",
        flexDirection: "column",
    },
    flexRow: {
        display: "flex",
        flexDirection: "row",
    },
    justifySpaceBetween: {
        justifyContent: "space-between",
    },
    flex: {
        flex: 1,
    },
    flexEnd: {
        justifyContent: "flex-end",
    },
    marginSides: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    center: {
        margin: "auto",
    },
    padding: {
        padding: theme.spacing(2),
    },
    maxWidth: {
        width: "100%",
        maxWidth: "1500px",
    },
    pageArea: {
        paddingBottom: theme.spacing(2),
        "&:last-child": {
            paddingBottom: 0,
        },
    },
    title: {
        marginTop: theme.spacing(4),
    },
    barMinHeight: {
        minHeight: theme.spacing(5),
        position: "absolute",
        top: theme.spacing(1),
        right: theme.spacing(2),
    },
    signUpRow: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        "&:last-child": {
            paddingBottom: theme.spacing(1),
        },
        "&:first-child": {
            paddingTop: theme.spacing(1),
        },
    },
    editNameButton: {
        marginRight: theme.spacing(1),
        marginLeft:"480px",
    },
    cancelNameButton: {
        marginRight: theme.spacing(1),
        marginLeft:"420px"
    },
    saveNameButton: {
        marginRight: theme.spacing(1),
        marginLeft:"0px"
    },
    editPasswordButton: {
        marginRight: theme.spacing(1),
        marginLeft:"350px"
    },
}));

/**
 * For presenting and changing movie details
 * @param {props} props
 */
function EditProfileComponent(props) {
    const classes = useStyles();

    const [movieTitle, setMovieTitle] = React.useState("Hans");
    const [movieSynopsis, setMovieSynopsis] = React.useState("");
    const [movieCast, setMovieCast] = React.useState([]);
    const [movieAgeRating, setMovieAgeRating] = React.useState("");
    const [movieRuntime, setMovieRuntime] = React.useState("");
    const [movieYear, setMovieYear] = React.useState("");
    const [criticsRating, setCriticsRating] = React.useState("");
    const [avgAudienceRating, setAvgAudienceRating] = React.useState("");
    const [theaterRelease, setTheaterRelease] = React.useState("");
    const [blurayRelase, setBlurayRelease] = React.useState("");
    const [moviethumbnail, setMovieThumbnail] = React.useState("");

    const [editName, setEditName] = React.useState(false);


    // for extracting the attributes of the given movie to the approriate state variables
    const extractMovie = () => {
        if (!props.movie) {
            return;
        }

        setMovieTitle(props.movie.title);
        setMovieSynopsis(props.movie.synopsis);
        setMovieAgeRating(props.movie.mpaa_rating);
        setMovieRuntime(props.movie.runtime);

        setMovieCast(JSON.parse(JSON.stringify(props.movie.actors)));
        setCriticsRating(props.movie.criticsRating);
        setAvgAudienceRating(props.movie.avgAudienceRating);
        setTheaterRelease(props.movie.theaterRelease);
        setBlurayRelease(props.movie.blurayRelease);
        setMovieYear(props.movie.year);
        setMovieThumbnail(props.movie.thumbnail);
    };

    // creating a object with all relevant data to update or create a changed movie
    const packMovie = () => {
        let back = {
            ...props.movie,
        };

        back.title = movieTitle;
        back.synopsis = movieSynopsis;
        back.runtime = movieRuntime;
        back.mpaa_rating = movieAgeRating;

        back.theaterRelease = theaterRelease;
        back.blurayRelease = blurayRelase;
        back.criticsRating = criticsRating;
        back.actors = movieCast;
        back.thumbnail = moviethumbnail;

        return back;
    };

    // triggers when a new movie is given to this component or the new parameter is changed
    useEffect(() => {
        if (!props.new) {
            extractMovie();
        }
    }, [props.movie, props.new]);

    // triggers when the new parameter is changed and setts the edit mode to true
    useEffect(() => {
        if (props.new) {
            setEditMode(true);
        }
    }, [props.new]);

    // indicates whether the movie can be changed
    const [editMode, setEditMode] = React.useState(null);

    // props for all grid items used below in the JSX
    const girdItemProps = {
        item: true,
        className: classes.padding,
    };

    // ----------------------------------------------------------------------------------------------------
    // on change functions

    const onChangeTitle = (value) => {
        setMovieTitle(value);
    };

    const onChangeSynopsis = (value) => {
        setMovieSynopsis(value);
    };

    const onChangeRuntime = (value) => {
        setMovieRuntime(value);
    };

    const onChangeAgeRating = (value) => {
        setMovieAgeRating(value);
    };

    const onChangeThumbnail = (value) => {
        setMovieThumbnail(value);
    };

    const onChangeOwnRating = async (value) => {
        await MovieService.rateMovie(props.movie._id, value);
        let newAvgAudienceRating = await MovieService.getRating(
            props.movie._id
        );
        setAvgAudienceRating(newAvgAudienceRating.rating);
    };

    const toggleEditMode = () => {
        setEditMode(!editMode);
    };
    // ----------------------------------------------------------------------------------------------------

    // for cast
    const onAddCastMember = (castMember) => {
        movieCast.push(castMember);
        setMovieCast([...movieCast]);
    };

    // for cast
    const onRemoveCastMember = (index) => {
        movieCast.splice(index, 1);
        setMovieCast([...movieCast]);
    };

    // cancel is called, functionality differs whether it is a new movie or not
    const onCancel = () => {
        if (props.new) {
            props.history.push("/");
        } else {
            setEditMode(false);
            extractMovie();
        }
    };

    const onChangeMovieTitle = (e) => {
        console.warn(e.target.value)
        setMovieTitle(e.target.value);

        //setRegisterError("");
    };

    // save is called, functionality differs whether it is a new movie or not
    const onSave = () => {
        props.onCreate(packMovie());
        console.warn("created Movie")
        { /*
                    if (props.new) {
            props.onCreate(packMovie());
        } else {
            setEditMode(false);
            props.onSave(packMovie());
        }
        */}

    };

    return (
        <div
            className={
                classes.flexCol +
                " " +
                classes.padding +
                " " +
                classes.center +
                " " +
                classes.flex +
                " " +
                classes.maxWidth
            }
        >
            {/* Admin Buttons */}
            <div
                className={
                    classes.flexRow +
                    " " +
                    classes.flexEnd +
                    " " +
                    classes.barMinHeight
                }
            >
                {/* Edit Buttons */}
                { editMode ? (
                        <React.Fragment>
                            <Button
                                //onClick={onCancel}
                                variant="contained"
                                color="primary"
                                className={classes.marginSides}
                            >
                                Cancel
                            </Button>
                            <Button
                                //onClick={onSave}
                                variant="contained"
                                color="primary"
                                className={classes.marginSides}
                            >
                                Save
                            </Button>
                        </React.Fragment>
                    ) : (
                        <Button
                            onClick={(e) => setEditMode(true)}
                            variant="contained"
                            color="primary"
                            className={classes.marginSides}
                        >
                            Edit
                        </Button>
                    ) }
            </div>

            {/* Movie Title */}
            <div className={classes.pageArea + " " + classes.title}>
                <CustomTextField
                    value={"Your Profile"}
                    furtherProps={{
                        fullWidth: true,
                    }}
                    align="center"
                    variant="h2"
                />
            </div>

            {/* More detail data of the movie, grouped in DetailsArea.js for a consistent look */}
            <Grid container>
                {/* Login Data */}
                <Grid xl={6} lg={6} md={6} ms={12} xs={12} {...girdItemProps}>
                    <DetailsArea
                        title="Login Data (name, password, email)"
                        content={
                            <div className={classes.signUpRow}>
                                { editName ? (
                                    <div>
                                        <div style={{"display":"flex"}}>
                                            <p>Name:</p>
                                            <Button
                                                className={classes.cancelNameButton}
                                                onClick={(e) => setEditName(false) }
                                            > Cancel
                                            </Button>
                                            <Button
                                                className={classes.saveNameButton}
                                                onClick={(e) => setEditName(false)}
                                            > Save
                                            </Button>
                                        </div>
                                        <div>
                                            <TextField
                                                fullWidth
                                                value={movieTitle}
                                                onChange={onChangeMovieTitle}
                                            />
                                        </div>
                                    </div>

                                ) : (
                                    <div>
                                        <div style={{"display":"flex"}}>
                                            <p>Name:</p>
                                            <Button
                                                className={classes.editNameButton}
                                                onClick={(e) => setEditName(true)}
                                            > Edit
                                            </Button>
                                        </div>
                                        <p>{movieTitle}</p>
                                    </div>
                                )}
                            </div>
                        }
                    />
                </Grid>

                {/* Password */}
                <Grid xl={6} lg={6} md={6} ms={12} xs={12} {...girdItemProps}>
                    <DetailsArea
                        title="Secondary Data (city, organization, unviersity)"
                        content={
                            <ReleaseDates
                                theaterRelease={theaterRelease}
                                blurayRelase={blurayRelase}
                                editMode={editMode}
                                onChangeTheaterRelease={(value) =>
                                    setTheaterRelease(value)
                                }
                                onChangeBlurayRelease={(value) =>
                                    setBlurayRelease(value)
                                }
                            />
                        }
                    />
                </Grid>

                {/* Organizations */}
                <Grid xl={6} lg={6} md={6} ms={12} xs={12} {...girdItemProps}>
                    <DetailsArea
                        title="Organizations"
                        content={
                            <Synopsis
                                editMode={editMode}
                                movieSynopsis={movieSynopsis}
                                moviethumbnail={moviethumbnail}
                                onChangeThumbnail={onChangeThumbnail}
                                onChangeSynopsis={onChangeSynopsis}
                            />
                        }
                    />
                </Grid>

                {/* Cast */}
                <Grid xl={6} lg={6} md={6} ms={12} xs={12} {...girdItemProps}>
                    <DetailsArea
                        title="Interests"
                        content={
                            <MovieCast
                                movieCast={movieCast}
                                editMode={editMode}
                                toggleEditMode={toggleEditMode}
                                onAddCastMember={onAddCastMember}
                                onRemoveCastMember={onRemoveCastMember}
                                isLoggedIn={props.isLoggedIn}
                                isAdmin={props.isAdmin}
                            />
                        }
                    />
                </Grid>
            </Grid>
        </div>
    );
}

// attributes of props and their type
{   EditProfileComponent.propTypes = {
    movie: PropTypes.object,
    new: PropTypes.bool,
    onCreate: PropTypes.func,
    onSave: PropTypes.func,
};}

// withRouter() allows accsing the necessary functionality to navigate from this component
export default withRouter(EditProfileComponent);