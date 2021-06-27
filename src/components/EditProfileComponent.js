import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    Button,
    TextField,
    Grid,
    Typography,
} from "@material-ui/core";
import CustomTextField from "./CustomTextField";
import DetailsArea from "./DetailsArea";
import PropTypes from "prop-types";
import UserService from "../services/UserService";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
    interestsButton: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
        fontSize: "15px",
        pointerEvents: "none",
    },
    deleteInterestsIcon: {
        marginTop: theme.spacing(1),
        fontSize: "15px",
        pointerEvents: "none",
    },
    deleteInterestsCross: {
        marginTop: theme.spacing(1),
        fontSize: "15px",
        marginRight: theme.spacing(1),
        color:"#cc0000",
    },
    addInterestsIcon: {
        marginTop: theme.spacing(1),
        fontSize: "15px",
        marginRight: theme.spacing(1),
        color:"green",
    },
    addInterestsButton: {
        marginTop: theme.spacing(2),
        marginRight: theme.spacing(1),
        backgroundColor:"green",

    },
    deleteInterestsButton: {
        marginTop: theme.spacing(2),
        marginRight: theme.spacing(1),
        backgroundColor:"#cc0000",
    },

}));

/**
 * For register new users
 * @param {props} props
 */
function EditProfileComponent(props) {
    const classes = useStyles();

    const [alertDeleteProfileOpen, setAltertDeleteProfileOpen] = React.useState(false);
    const [isAdmin, setIsAdmin] = React.useState("");
    const [registerError, setRegisterError] = React.useState("");

    const [user_id, setUser_id] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [password2, setPassword2] = React.useState("");
    const [city, setCity] = React.useState("");
    const [university, setUniversity] = React.useState("");
    const [organization, setOrganization] = React.useState("");


    //interests
    const [interests, setInterests] = React.useState(["chillen", "gaming", "MERN"]);
    const [allInterests, setAllInterests] = React.useState(["chillen", "gaming", "MERN", "Reading", "Sports",]);
    const [editInterests, setEditInterests] = React.useState(false);
    const [deleteInterests, setDeleteInterests] = React.useState(false);
    const [addInterests, setAddInterests] = React.useState(false);
    const [search, setSearch] = React.useState("");

    // identify coperate accounts
    const [corporate_id, setCorporate_id] = React.useState("");
    const [isCorporate, setIsCorporate] = React.useState(false);

    // corporate Data
    const [compname, setCompname] = React.useState("");
    const [editCompname, setEditCompname] = React.useState(false);
    const [domains, setDomains] = React.useState("");
    const [editDomains, setEditDomains] = React.useState(false);



    // Data from old code, Ben
    const [editPassword, setEditPassword] = React.useState(false);
    const [editUsername, setEditUsername] = React.useState(false);
    const [editCity, setEditCity] = React.useState(false);
    const [editUniversity, setEditUniversity] = React.useState(false);
    const [editOrganization, setEditOrganization] = React.useState(false);
    const [saveName, setSaveName] = React.useState(false);

    const bcrypt = require("bcryptjs");



    // for extracting the attributes of the given movie to the approriate state variables
    const extractUser = () => {
        if (!props.user) {
            return;
        }

        UserService.getUser(props.user._id).then(function(userBackend) {
            setUsername(userBackend.username);
            //setPassword(userBackend.password);
            //setPassword2(userBackend.password);
            setCity(userBackend.city);
            setInterests(userBackend.interests);
            setUniversity(userBackend.university);
            setOrganization(userBackend.organization);

            if (userBackend.account_owner_of_organization !== undefined) {
                setIsCorporate(true);
                UserService.getOrganization(userBackend.account_owner_of_organization).then(function(organizationBackend) {
                    setCompname(organizationBackend.company_name);
                    setDomains(organizationBackend.domains);
                    setCorporate_id(organizationBackend._id);
                });
            } else {
                setIsCorporate(false);
            }
        });
    };

    useEffect(() => {
        if (props.user == undefined) {
            setRegisterError("");
        } else
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
            ...props.user,
        };

        back.username = username;
        back.password = bcrypt.hashSync(password, 8);
        back.interests = interests;
        back.city = city;
        back.university = university;
        back.organization = organization;

        return back;
    };


    const onRegister = (e) => {
        setEditUsername(false);
        e.preventDefault();
        props.onRegister(packUser());
    };

    // update user data after clicking on save
    const onUpdateUser = (e) => {
        if(editUsername) {
            setEditUsername(false);
        } else if (editCompname) {
            setEditCompname(false);
        } else if (editDomains) {
            setEditDomains(false);
        } else if (editInterests) {
            setEditInterests(false);
        } else if (editCity) {
            setEditCity(false);
        } else if (editUniversity) {
            setEditUniversity(false);
        } else if (editOrganization) {
            setEditOrganization(false);
        } else if (editPassword && registerError === "") {
            setEditPassword(false);
        }
        e.preventDefault();

        if(isCorporate) {
            let organization = Object();
            organization._id = corporate_id;
            organization.company_name = compname;
            organization.account_owner = props.user._id;
            organization.domains = domains;
            props.onUpdateOrganization(organization);
        }
        props.onUpdateUser(packUser());
    };

    // delete user profile
    const onDeleteProfile = (e) => {
        UserService.logout();
        let id = props.user._id;
        //UserService.deleteUser(id);
        props.onDeleteUser(id);

        if (isCorporate) {
                props.onDeleteOrganization(corporate_id);
        }
    };

    // save temprorary changed variables on input field
    const onChangeUsername = (e) => {
        props.user.username = e.target.value;
        setUsername(e.target.value);
    };

    const onChangeCity = (e) => {
        props.user.city = e.target.value;
        setCity(e.target.value);
    };

    const onChangeUniversity = (e) => {
        props.user.university = e.target.value;
        setUniversity(e.target.value);
    };

    const onChangeOrganization = (e) => {
        props.user.organization = e.target.value;
        setOrganization(e.target.value);
    };

    const onChangeCompname = (e) => {
        setCompname(e.target.value);
    };

    const onChangeDomains = (e) => {
        setDomains(e.target.value);
        setRegisterError("");
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
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

    const changeDeleteInterests = (e) => {
        if (deleteInterests) {
            setDeleteInterests(false);
        } else {
            setDeleteInterests(true);
        }
    };

    const changeAddInterests = (e) => {
        if (addInterests) {
            setAddInterests(false);
        } else {
            setAddInterests(true);
        }
    };

    const deleteInterest = (e) => {
        let index = e.target.value;
        interests.splice(index, 1)
    };

    const onChangeCompnameSignUp = (e) => {
        setCompname(e.target.value);
        setRegisterError("");
    };

    const onChangeDomainsSignUp = (e) => {
        setDomains(e.target.value);
        setRegisterError("");
    };

    // if data is not saved, because user clicked on cancel,
    // re-load the old user data from the backend

    const onCancelCompname = (e) => {
        setEditCompname(false);
        UserService.getOrganization(corporate_id).then(function(organizationBackend) {
            setCompname(organizationBackend.company_name)
        });
    };

    const onCancelUsername = (e) => {
        setEditUsername(false);
        UserService.getUser(props.user._id).then(function(userBackend) {
            setUsername(userBackend.username)
        });
    };

    const onCancelDomains = (e) => {
        setEditDomains(false);
        UserService.getOrganization(corporate_id).then(function(organizationBackend) {
            setDomains(organizationBackend.domains)
        });
    };

    const onCancelInterests = (e) => {
        setEditInterests(false);
        setAddInterests(false);
        setDeleteInterests(false);
        UserService.getUser(props.user._id).then(function(userBackend) {
            setInterests(userBackend.interests);
        });
    };

    const onCancelCity = (e) => {
        setEditCity(false);
        UserService.getUser(props.user._id).then(function(userBackend) {
            setCity(userBackend.city);
        });
    };

    const onCancelUniversity = (e) => {
        setEditUniversity(false);
        UserService.getUser(props.user._id).then(function(userBackend) {
            setUniversity(userBackend.university);
        });
    };

    const onCancelOrganization = (e) => {
        setEditOrganization(false);
        UserService.getUser(props.user._id).then(function(userBackend) {
            setOrganization(userBackend.organization);
        });
    };

    const onCancelPassword = (e) => {
            setRegisterError("");
            setEditPassword(false);
            //UserService.getUser(props.user._id).then(function(userBackend) {
               // setPassword(userBackend.password);
               // setPassword2(userBackend.password);
            //});
        setPassword("");
        setPassword2("");
    };

    // sign-up functionalities
    const onCancelSignUp = (e) => {
        setRegisterError("");
    };

    const onRegisterSignUp = (e) => {
        e.preventDefault();
        console.warn(props.user._id)
        //UserService.addOrganization(username, password, isAdmin, compname, domains);
        let user_id = props.user._id;
        UserService.registerOrganization(user_id, compname, domains);
        setIsCorporate(true);
        onUpdateUser(e);
        //props.onRegister(username, password, isAdmin, compname, domains);
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
                    <React.Fragment>
                        <Button
                            onClick={(e) => setAltertDeleteProfileOpen(true)}
                            variant="contained"
                            color="primary"
                            className={classes.deleteProfileButton}
                        >
                            Delete Profile
                        </Button>
                        <Dialog
                            open={alertDeleteProfileOpen}
                            close={(e) => setAltertDeleteProfileOpen(false)}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                        <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete your profile?"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Deleting your profile will permanently remove it.
                                If you have a corporate account, this will also be permanently removed.
                                After succesful deletion you will be redirected to the Peeroulette-Landing-Page.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={(e) => setAltertDeleteProfileOpen(false)} color="primary">
                                No
                            </Button>
                            <Button onClick={onDeleteProfile} color="primary" autoFocus href="/">
                                Yes
                            </Button>
                        </DialogActions>
                        </Dialog>
                    </React.Fragment>
            </div>

            {/* User Title */}
            <div className={classes.pageArea + " " + classes.title}>
                <CustomTextField
                    value={"Edit Your Profile"}
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
                                { editUsername ? (
                                    <div>
                                        <div style={{"display":"flex"}}>
                                            <p className={classes.userDataFont}>Name:</p>
                                            <Button
                                                className={classes.cancelNameButton}
                                                onClick={onCancelUsername}
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
                                                onClick={(e) => setEditUsername(true)}
                                            > Edit
                                            </Button>
                                        </div>
                                        <p>{username}</p>
                                    </div>
                                )}
                                <div>
                                    { editPassword ? (
                                        <div>
                                            <div style={{"display":"flex"}}>
                                                <p className={classes.userDataFont}>Password:</p>
                                                <Button
                                                    className={classes.cancelNameButton}
                                                    onClick={onCancelPassword}
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
                                                    label="Set New Password"
                                                    value={password}
                                                    error={registerError !== ""}
                                                    onBlur={onBlurPassword}
                                                    onChange={onChangePassword}
                                                    type="password"
                                                />
                                                <TextField
                                                    fullWidth
                                                    label="Repeat New Password"
                                                    value={password2}
                                                    error={registerError !== ""}
                                                    onBlur={onBlurPassword}
                                                    onChange={onChangePassword2}
                                                    type="password"
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <div>
                                            <div style={{"display":"flex"}}>
                                                <p className={classes.userDataFont}>Password:</p>
                                                <Button
                                                    className={classes.editNameButton}
                                                    onClick={(e) => setEditPassword(true)}
                                                > Edit
                                                </Button>
                                            </div>
                                            <p style={{"fontStyle":"italic"}}>Password top secret</p>
                                            <p style={{"fontStyle":"italic", "marginTop":"30px", "marginBottom":"43px"}}>Password top secret</p>
                                        </div>
                                    )}
                                    {registerError !== "" ? (
                                        <div className={classes.signUpRow}>
                                            <Typography color="error">{registerError}</Typography>
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        }
                    />
                </Grid>

                {/* City, University, Organization */}
                <Grid xl={6} lg={6} md={6} ms={12} xs={12} {...girdItemProps}>
                    <DetailsArea
                        title="City, Organization & University"
                        content={
                            <div>
                                <div>
                                { editCity ? (
                                    <div>
                                        <div style={{"display":"flex"}}>
                                            <p className={classes.userDataFont}>City:</p>
                                            <Button
                                                className={classes.cancelNameButton}
                                                onClick={onCancelCity}
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
                                                value={city}
                                                onChange={onChangeCity}
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <div style={{"display":"flex"}}>
                                            <p className={classes.userDataFont}>City:</p>
                                            <Button
                                                className={classes.editNameButton}
                                                onClick={(e) => setEditCity(true)}
                                            > Edit
                                            </Button>
                                        </div>
                                        <p>{city}</p>
                                    </div>
                                )}
                            </div>
                            <div>
                                { editUniversity ? (
                                <div>
                                    <div style={{"display":"flex"}}>
                                        <p className={classes.userDataFont}>University:</p>
                                        <Button
                                            className={classes.cancelNameButton}
                                            onClick={onCancelUniversity}
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
                                            value={university}
                                            onChange={onChangeUniversity}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <div style={{"display":"flex"}}>
                                        <p className={classes.userDataFont}>University:</p>
                                        <Button
                                            className={classes.editNameButton}
                                            onClick={(e) => setEditUniversity(true)}
                                        > Edit
                                        </Button>
                                    </div>
                                    <p>{university}</p>
                                </div>
                            )}
                            </div>
                                <div>
                                    { editOrganization ? (
                                        <div>
                                            <div style={{"display":"flex"}}>
                                                <p className={classes.userDataFont}>Organization:</p>
                                                <Button
                                                    className={classes.cancelNameButton}
                                                    onClick={onCancelOrganization}
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
                                                    value={organization}
                                                    onChange={onChangeOrganization}
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <div>
                                            <div style={{"display":"flex"}}>
                                                <p className={classes.userDataFont}>Organization:</p>
                                                <Button
                                                    className={classes.editNameButton}
                                                    onClick={(e) => setEditOrganization(true)}
                                                > Edit
                                                </Button>
                                            </div>
                                            <p>{organization}</p>
                                        </div>
                                    )}
                                </div>
                        </div>
                        }
                    />
                </Grid>

                {/* Corporate Accounts */}
                <Grid xl={6} lg={6} md={6} ms={12} xs={12} {...girdItemProps}>
                    <DetailsArea
                        title="Corporate Account"
                        content={
                            <div>
                                { !isCorporate ? (
                                    <div className={classes.signUpRow}>
                                        <p className={classes.userDataFont}>Sign up for a corporate Account!</p>
                                        <div className={classes.signUpRow}>
                                            <TextField
                                                label="compname"
                                                fullWidth
                                                value={compname}
                                                onChange={onChangeCompnameSignUp}
                                            />
                                        </div>
                                        <div className={classes.signUpRow}>
                                            <TextField
                                                label="domains"
                                                fullWidth
                                                value={domains}
                                                onChange={onChangeDomainsSignUp}
                                            />
                                        </div>
                                        <div
                                            className={classes.signUpRow + " " + classes.signUpButtons}
                                        >
                                            <Button
                                                className={classes.signUpButton}
                                                onClick={onCancelSignUp}
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                className={classes.signUpButton}
                                                variant="contained"
                                                color="primary"
                                                onClick={onRegisterSignUp}
                                            >
                                                Register
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className={classes.signUpRow}>
                                        { editCompname ? (
                                            <div>
                                                <div style={{"display":"flex"}}>
                                                    <p className={classes.userDataFont}>Company Name:</p>
                                                    <Button
                                                        className={classes.cancelNameButton}
                                                        onClick={onCancelCompname}
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
                                                        value={compname}
                                                        onChange={onChangeCompname}
                                                    />
                                                </div>
                                            </div>
                                        ) : (
                                            <div>
                                                <div style={{"display":"flex"}}>
                                                    <p className={classes.userDataFont}>Company Name:</p>
                                                    <Button
                                                        className={classes.editNameButton}
                                                        onClick={(e) => setEditCompname(true)}
                                                    > Edit
                                                    </Button>
                                                </div>
                                                <p>{compname}</p>
                                            </div>
                                        )}
                                        <div>
                                            { editDomains ? (
                                                <div>
                                                    <div style={{"display":"flex"}}>
                                                        <p className={classes.userDataFont}>Domains:</p>
                                                        <Button
                                                            className={classes.cancelNameButton}
                                                            onClick={onCancelDomains}
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
                                                            value={domains}
                                                            onChange={onChangeDomains}
                                                        />
                                                    </div>
                                                </div>
                                            ) : (
                                                <div>
                                                    <div style={{"display":"flex"}}>
                                                        <p className={classes.userDataFont}>Domains:</p>
                                                        <Button
                                                            className={classes.editNameButton}
                                                            onClick={(e) => setEditDomains(true)}
                                                        > Edit
                                                        </Button>
                                                    </div>
                                                    <p>{domains}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ) }
                            </div>
                        }
                    />
                </Grid>

                {/* Interests */}
                <Grid xl={6} lg={6} md={6} ms={12} xs={12} {...girdItemProps}>
                    <DetailsArea
                        title="Interests"
                        content={
                            <div>
                                { editInterests ? (
                                    <div style={{"display":"flex"}}>
                                        <p className={classes.userDataFont}>Interests:</p>
                                        <Button
                                            className={classes.cancelNameButton}
                                            onClick={onCancelInterests}
                                        > Cancel
                                        </Button>
                                        <Button
                                            className={classes.cancelNameButton}
                                            onClick={changeAddInterests}
                                        > Add
                                        </Button>
                                        <Button
                                            className={classes.cancelNameButton}
                                            onClick={changeDeleteInterests}
                                        > Delete
                                        </Button>
                                        <Button
                                            className={classes.saveNameButton}
                                            onClick={onUpdateUser}
                                        > Save
                                        </Button>
                                    </div>
                                ) : (
                                    <div style={{"display":"flex"}}>
                                        <p className={classes.userDataFont}>Interests:</p>
                                        <Button
                                            className={classes.editNameButton}
                                            onClick={(e) => setEditInterests(true)}
                                        > Edit
                                        </Button>
                                    </div>
                                )}
                                <div className="center">
                                    {(() => {
                                        let interestsWithDelete = [];
                                        let interestsWithoutDelete = [];
                                        let i = 0;
                                        for (i; i < interests.length; i++) {
                                            interestsWithoutDelete.push(<button className={classes.interestsButton}>{interests[i]}</button>);
                                            interestsWithDelete.push(<button className={classes.deleteInterestsIcon}>{interests[i]}</button>);
                                            interestsWithDelete.push(<button className={classes.deleteInterestsCross} value={i} onClick={(e) => {
                                                interests.splice(e.target.value, 1);
                                                setDeleteInterests(false);
                                            }}>Delete</button>);
                                        }
                                        if(deleteInterests) {
                                            return interestsWithDelete;
                                        } else {
                                            return interestsWithoutDelete;
                                        }
                                    })()}
                                </div>
                                <div>
                                    { addInterests ? (
                                        <div>
                                            <div>
                                                <p className={classes.userDataFont}> Search for your interest:</p>
                                                <input type="text" placeholder="Search" onChange={ e => setSearch(e.target.value)}/>
                                            </div>
                                            <div>
                                                {(() => {
                                                    if(search.length > 0) {
                                                        let i = 0;
                                                        let interestsWithAdd = [];
                                                        for (i; i < allInterests.length; i++) {
                                                            if (allInterests[i].toLowerCase().includes(search.toLowerCase())) {
                                                                interestsWithAdd.push(<button className={classes.deleteInterestsIcon}>{allInterests[i]}</button>);
                                                                interestsWithAdd.push(<button className={classes.addInterestsIcon} value={allInterests[i]} onClick={(e) => {
                                                                    interests.push(e.target.value)
                                                                    setAddInterests(false); }}>Add</button>);
                                                                }
                                                            }
                                                        return interestsWithAdd;
                                                    }
                                                })()}
                                            </div>
                                        </div>
                                        ) : null}
                                </div>
                            </div>
                        }
                    />
                </Grid>
            </Grid>
        </div>
    );
}

// attributes of props and their type
EditProfileComponent.propTypes = {
    user: PropTypes.object,
    onGetUser: PropTypes.func,
    onUpdateUser: PropTypes.func,
    onUpdateOrganization: PropTypes.func,
    onDeleteUser: PropTypes.func,
    onRegister: PropTypes.func,
    onDeleteOrganization: PropTypes,
};

// withRouter() allows accsing the necessary functionality to navigate from this component
export default EditProfileComponent;