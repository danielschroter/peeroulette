import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    Button,
    TextField,
    Grid,
} from "@material-ui/core";
import CustomTextField from "./CustomTextField";
import DetailsArea from "./DetailsArea";
import PropTypes from "prop-types";
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

    const [accountOwnerOfOrganizationID, setAccountOwnerOfOrganizationID] = React.useState("");
    const [hasCorporateAccount, setHasCorporateAccount] = React.useState(false);
    const [organization, setOrganization] = React.useState(null);


    const [password, setPassword] = React.useState("");
    const [password2, setPassword2] = React.useState("");
    const [isAdmin, setIsAdmin] = React.useState("");
    const [isCorporate, setIsCorporate] = React.useState(false);
    const [registerError, setRegisterError] = React.useState("");

    // Corporate Data
    const [compname, setCompname] = React.useState("");
    const [domains, setDomains] = React.useState("");

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

        UserService.getUser(props.user._id).then(function(userBackend) {
            setUsername(userBackend.username);
            setPassword(userBackend.password);
            setPassword2(userBackend.password);
            if (userBackend.account_owner_of_organization !== undefined) {
                setHasCorporateAccount(true);
                setAccountOwnerOfOrganizationID(userBackend.account_owner_of_organization);
                //props.user.accountOwnerOfOrganizationID = userBackend.account_owner_of_organization;
                //UserService.getOrganization(accountOwnerOfOrganizationID){

                //}
            } else {
                setHasCorporateAccount(false);
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
        back.password = password;

        return back;
    };

    const onRegister = (e) => {
        setEditName(false);
        e.preventDefault();
        props.onRegister(packUser());
    };

    const onUpdateUser = (e) => {
        setEditName(false);
        e.preventDefault();

        //let user = props.onGetUser(props.user._id);
        //UserService.getUser(props.user._id).then(function(result) {
        // });

        props.onUpdateUser(packUser());
    };


    const onDeleteProfile = (e) => {
        setDeleteProfile(false);
        UserService.logout();
        let id = props.user._id;
        //UserService.deleteUser(id);
        props.onDeleteUser(id);

        if (hasCorporateAccount) {
            props.onDeleteOrganization(accountOwnerOfOrganizationID);
        }
    };

    const onChangeUsername = (e) => {
        props.user.username = e.target.value;
        setUsername(e.target.value);
    };
    const onCancelUserName = (e) => {
        setEditName(false);
        UserService.getUser(props.user._id).then(function(result) {
            setUsername(result.username)
        });


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
                                { editName ? (
                                    <div>
                                        <div style={{"display":"flex"}}>
                                            <p className={classes.userDataFont}>Name:</p>
                                            <Button
                                                className={classes.cancelNameButton}
                                                onClick={onCancelUserName}
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

                {/* Corporate Accounts */}
                <Grid xl={6} lg={6} md={6} ms={12} xs={12} {...girdItemProps}>
                    <DetailsArea
                        title="Corporate Account"
                        content={
                            <div>
                                { !hasCorporateAccount ? (
                                    <div>
                                        <p className={classes.userDataFont}>Sign up for a corporate Account!</p>
                                        <Button>Register Corporate Account</Button>
                                    </div>
                                ) : (
                                    <div>
                                        <p className={classes.userDataFont}>Company Name:</p>
                                        <p>domo</p>
                                        <p className={classes.userDataFont}>Domain</p>
                                        <p>domo@gmail.com</p>
                                    </div>
                                ) }
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
}

// attributes of props and their type
EditProfileComponent.propTypes = {
    user: PropTypes.object,
    onGetUser: PropTypes.func,
    onUpdateUser: PropTypes.func,
    onDeleteUser: PropTypes.func,
    onDeleteOrganization: PropTypes,
};

// withRouter() allows accsing the necessary functionality to navigate from this component
export default EditProfileComponent;