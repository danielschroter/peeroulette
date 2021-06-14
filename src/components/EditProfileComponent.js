import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    Paper,
    Button,
    TextField,
    Typography,
    FormControlLabel,
    Checkbox, Grid,
} from "@material-ui/core";
import UserServiceCRUD from "../services/UserServiceCRUD";
import CustomTextField from "./CustomTextField";
import DetailsArea from "./DetailsArea";
import ReleaseDates from "./ReleaseDates";
import Synopsis from "./Synopsis";
import MovieCast from "./MovieCast";
import UserService from "../services/UserService";

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
    userDataFont: {
        color: "black",
        fontWeight: "bold",
    },
    deleteProfileButton: {
        marginRight: theme.spacing(1),
        backgroundColor:"#cc0000",
        marginTop:"12px",
    },
    editNameButton: {
        marginRight: theme.spacing(1),
        marginLeft: theme.spacing(1),
    },
    cancelNameButton: {
        marginRight: theme.spacing(1),
        marginLeft: theme.spacing(1),
    },
    saveNameButton: {
        marginRight: theme.spacing(1),
    },
    cancelPasswordButton: {
        marginRight: theme.spacing(1),
        marginLeft:theme.spacing(1),
    },
    savePasswordButton: {
        marginRight: theme.spacing(1),
    },
    editPasswordButton: {
        marginRight: theme.spacing(1),
        marginLeft: theme.spacing(1),
    },
}));

/**
 * For register new users
 * @param {props} props
 */
function EditProfileComponent(props) {
    const classes = useStyles();

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [password2, setPassword2] = React.useState("");
    const [isAdmin, setIsAdmin] = React.useState("");
    const [isCorporate, setIsCorporate] = React.useState(false);

    // Corporate Data
    const [compname, setCompname] = React.useState("");
    const [domains, setDomains] = React.useState("");
    const [registerError, setRegisterError] = React.useState("");

    // Data from old code, Ben
    const [deleteProfile, setDeleteProfile] = React.useState(false);

    const [editName, setEditName] = React.useState(false);
    const [editPassword, setEditPassword] = React.useState(false);
    const [saveName, setSaveName] = React.useState(false);


    // for extracting the attributes of the given movie to the approriate state variables
    const extractUser = () => {
        if (!props.user) {
            return;
        }
        UserServiceCRUD.getUser(props.user.user._id).then(function(result) {

            setUsername(result.username);
            setPassword(result.password);
            setPassword2(result.password);

        });
    };

    useEffect(() => {
        if (props.user.error) {
            setRegisterError(props.user.error);
        } else {
            setRegisterError("");
        }
        extractUser();
    }, [props.user]);

    // props for all grid items used below in the JSX
    const girdItemProps = {
        item: true,
        className: classes.padding,
    };

    // creating a object with all relevant data to update or create a changed movie
    const packUser = () => {
        let back = {
            ...props.user.user,
        };

        back.username = username;
        back.password = password;

        return back;
    };

    const onRegister = (e) => {
        setEditName(false);
        e.preventDefault();
        //console.warn(props.user);
        console.warn(packUser())
        console.warn(props.user.user)

        //props.onRegister(username, password, isAdmin, compname, domains);
        props.onRegister(packUser());
    };

    const onUpdateUser = (e) => {
        setEditName(false);
        e.preventDefault();
        //console.warn(props.user);
        console.warn("user frontend")
        console.warn(packUser())
        console.warn(props.user.user)

        console.warn("user backend")
        console.warn(props.user.user._id)

        //let user = props.onGetUser(props.user.user._id);
        UserServiceCRUD.getUser(props.user.user._id).then(function(result) {
            console.warn(result.username)
        });

        //props.onRegister(username, password, isAdmin, compname, domains);
        props.onUpdateUser(packUser());
    };


    const onDeleteProfile = (e) => {
        setDeleteProfile(false);
        UserService.logout();
    };

    const onChangeUsername = (e) => {
        props.user.user.username = e.target.value;
        console.warn(props.user.user)
        // props.onLogout(username, password);
        setUsername(e.target.value);
        setRegisterError("");
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
        setRegisterError("");
    };

    const onChangeCompname = (e) => {
        setCompname(e.target.value);
        setRegisterError("");
    };

    const onChangeDomains = (e) => {
        setDomains(e.target.value);
        setRegisterError("");
    };

    const onChangePassword2 = (e) => {
        setPassword2(e.target.value);
        setRegisterError("");
    };

    const onBlurPassword = (e) => {
        if (password !== "" && password2 !== "") {
            if (password !== password2) {
                setRegisterError("Passwords do not match.");
            } else {
                setRegisterError("");
            }
        }
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
                {/* Delete Buttons */}
                { deleteProfile ? (
                    <React.Fragment>
                        <Button
                            onClick={(e) => setDeleteProfile(false)}
                            variant="contained"
                            color="primary"
                            className={classes.deleteProfileButton}
                        >
                            No
                        </Button>
                        <Button
                            onClick={onDeleteProfile}
                            variant="contained"
                            color="primary"
                            className={classes.deleteProfileButton}
                            href="/"
                        >
                            Yes
                        </Button>
                    </React.Fragment>
                ) : (
                    <Button
                        onClick={(e) => setDeleteProfile(true)}
                        variant="contained"
                        color="primary"
                        className={classes.deleteProfileButton}
                    >
                        Delete Profile
                    </Button>
                ) }
            </div>

            {/* User Title */}
            <div className={classes.pageArea + " " + classes.title}>
                <CustomTextField
                    value={username + "'s Profile"}
                    furtherProps={{
                        fullWidth: true,
                    }}
                    align="center"
                    variant="h2"
                />
            </div>

            {/* More detail data of the movie, grouped in DetailsArea.js for a consistent look */}
            <Grid container>
                {/* Name & Email Address */}
                <Grid xl={6} lg={6} md={6} ms={12} xs={12} {...girdItemProps}>
                    <DetailsArea
                        title="Name & Password"
                        content={
                            <div className={classes.signUpRow}>
                                { editName ? (
                                    <div>
                                        <div style={{"display":"flex"}}>
                                            <p className={classes.userDataFont}>Name:</p>
                                            <Button
                                                className={classes.cancelNameButton}
                                                onClick={(e) => setEditName(false)}
                                            > Cancel
                                            </Button>
                                            <Button
                                                className={classes.saveNameButton}
                                                onClick={onUpdateUser}
                                            > Save
                                            </Button>
                                        </div>
                                        <div>
                                            <TextField
                                                fullWidth
                                                value={username}
                                                onChange={onChangeUsername}
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <div style={{"display":"flex"}}>
                                            <p className={classes.userDataFont}>Name:</p>
                                            <Button
                                                className={classes.editNameButton}
                                                onClick={(e) => setEditName(true)}
                                            > Edit
                                            </Button>
                                        </div>
                                        <p>{username}</p>
                                    </div>
                                )}
                                <div>
                                    <div style={{"display":"flex"}}>
                                        <p className={classes.userDataFont}>Password:</p>
                                        <Button
                                            className={classes.editPasswordButton}
                                            //onClick={(e) => setEditName(true)}
                                        > Edit
                                        </Button>
                                    </div>
                                    <p>**********</p>
                                    <p>**********</p>
                                </div>
                            </div>

                        }
                    />
                </Grid>

                {/* City, Organization, University */}
                <Grid xl={6} lg={6} md={6} ms={12} xs={12} {...girdItemProps}>
                    <DetailsArea
                        title="City, Organization & University"
                        content={
                            <div>
                                <p className={classes.userDataFont}>City:</p>
                                <p>München</p>
                                <p className={classes.userDataFont}>University:</p>
                                <p>TU München</p>
                                <p className={classes.userDataFont}>Organization:</p>
                                <p>TUM Matching School</p>
                            </div>
                        }
                    />
                </Grid>

                {/* Premium Accounts */}
                <Grid xl={6} lg={6} md={6} ms={12} xs={12} {...girdItemProps}>
                    <DetailsArea
                        title="Premium Accounts"
                        content={
                            <div>
                                <p className={classes.userDataFont}>Email:</p>
                                <p>user@gmail.com</p>
                                <p className={classes.userDataFont}>Role:</p>
                                <p>Admin</p>
                            </div>
                        }
                    />
                </Grid>

                {/* Cast */}
                <Grid xl={6} lg={6} md={6} ms={12} xs={12} {...girdItemProps}>
                    <DetailsArea
                        title="Interests"
                        content={
                            <div>
                                <p className={classes.userDataFont}>Interests:</p>
                                <p>Chilln</p>
                            </div>
                        }
                    />
                </Grid>
            </Grid>
        </div>
    );

    {/*return (
        <div className={classes.usersignUpRoot}>
            <Paper className={classes.signUpPaper} component="form">
                <div className={classes.signUpRow}>
                    <Typography variant="h4" align="center">
                        Profile
                    </Typography>
                </div>

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
                                    onClick={onUpdateUser}
                                > Save
                                </Button>
                            </div>
                            <div>
                                <TextField
                                fullWidth
                                value={username}
                                onChange={onChangeUsername}
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
                                <p>{username}</p>
                        </div>
                    )}
                </div>

                <div className={classes.signUpRow}>
                    <div style={{"display":"flex"}}>
                        <p style={{"marginBottom":"0px"}}>Password:</p>
                        <Button
                            className={classes.editPasswordButton}
                            onClick={props.onCancel}
                        >
                            Edit
                        </Button>
                    </div>
                    <TextField
                        label="Password"
                        fullWidth
                        value={password}
                        onChange={onChangePassword}
                        error={registerError !== ""}
                        onBlur={onBlurPassword}
                        type="password"
                    />
                </div>
                <div className={classes.signUpRow}>
                    <TextField
                        label="Repeat Password"
                        fullWidth
                        value={password2}
                        onChange={onChangePassword2}
                        error={registerError !== ""}
                        onBlur={onBlurPassword}
                        type="password"
                    />
                </div>
                <div className={classes.signUpRow}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                                color="primary"
                            />
                        }
                        label="Is Admin"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={isCorporate}
                                onChange={(e) => setIsCorporate(e.target.checked)}
                                color="primary"
                            />
                        }
                        label="Check if you want a Corporate Account."
                    />
                </div>
                {isCorporate ? (
                    <div className={classes.signUpRow}>
                        <div className={classes.signUpRow}>
                            <TextField
                                label="compname"
                                fullWidth
                                value={compname}
                                onChange={onChangeCompname}
                            />
                        </div>
                        <div className={classes.signUpRow}>
                            <TextField
                                label="domains"
                                fullWidth
                                value={domains}
                                onChange={onChangeDomains}
                            />
                        </div>
                    </div>
                ) : null}
                {registerError !== "" ? (
                    <div className={classes.signUpRow}>
                        <Typography color="error">{registerError}</Typography>
                    </div>
                ) : null}
                <div
                    className={classes.signUpRow + " " + classes.signUpButtons}
                >
                    <Button
                        className={classes.signUpButton}
                        onClick={props.onCancel}
                    >
                        Cancel
                    </Button>
                    <Button
                        className={classes.signUpButton}
                        variant="contained"
                        color="primary"
                        onClick={onRegister}
                        disabled={
                            username === "" ||
                            password === "" ||
                            password2 === "" ||
                            registerError !== "" ||
                            password !== password2
                        }
                        type="submit"
                    >
                        Register
                    </Button>
                </div>
            </Paper>
        </div>
    ); */}
}

export default EditProfileComponent;