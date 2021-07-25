import React, {useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {
    Paper,
    Button,
    TextField,
    Typography,
    FormControlLabel,
    Checkbox,
    Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

// Alert for push notifications
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    usersignUpRoot: {
        margin: "auto",
    },
    signUpPaper: {
        width: "500px",
        padding: theme.spacing(2),
    },
    signUpRow: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        "&:last-child": {
            paddingBottom: theme.spacing(0),
        },
        "&:first-child": {
            paddingTop: theme.spacing(0),
        },
    },
    signUpButtons: {
        display: "flex",
        justifyContent: "flex-end",
    },
    signUpButton: {
        marginLeft: theme.spacing(1),
    },
}));

/**
 * For register new users
 * @param {props} props
 */
function SignUpComponent(props) {
    const classes = useStyles();

    const [email, setEmail] = React.useState("");
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [password2, setPassword2] = React.useState("");
    const [isAdmin, setIsAdmin] = React.useState(false);
    const [isCorporate, setIsCorporate] = React.useState(false);
    const [ackAuthority, setAckAuthority] = React.useState(false);

    // Open state for push notification (Snackbar)
    const [open, setOpen] = React.useState(false);

    // Corporate Data
    const [compname, setCompname] = React.useState("");
    const [domains, setDomains] = React.useState("");

    const [registerError, setRegisterError] = React.useState("");

    useEffect(() => {
        // if registration was successful set Snackbar state open to true
        if (props.user.message) {
            setOpen(true);
        } else {
            setOpen(false);
        }
        // if error during registration set RegisterError
        if (props.user.error) {
            setRegisterError(props.user.error);
        } else {
            setRegisterError("");
        }
    }, [props.user]);

    const onRegister = (e) => {
        e.preventDefault();
        props.onRegister(email, username, password, isAdmin, compname, domains);
    };

    // set notification/Snackbar state to false after closing Snackbar
    const handleClose = () => {
        setOpen(false);
    };

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
        setRegisterError("");
    };

    const onChangeUsername = (e) => {
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
    // check if a correct email address is entered
    // https://stackoverflow.com/questions/39356826/how-to-check-if-it-a-text-input-has-a-valid-email-format-in-reactjs
    const onBlurEmail = (e) => {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(email)) {
            setRegisterError("Type in a correct email.");
        }
    };

    return (
        <div className={classes.usersignUpRoot}>
            <Paper className={classes.signUpPaper} component="form">
                <div className={classes.signUpRow}>
                    <Typography variant="h4" align="center">
                        Welcome to peeroulette!
                    </Typography>
                </div>
                <div className={classes.signUpRow}>
                    <TextField
                        label="Email"
                        fullWidth
                        value={email}
                        onChange={onChangeEmail}
                        error={registerError === "Type in a correct email."}
                        onBlur={onBlurEmail}
                        type="email"
                    />
                </div>
                <div className={classes.signUpRow}>
                    <TextField
                        label="Username"
                        fullWidth
                        value={username}
                        onChange={onChangeUsername}
                        error={registerError === "Username already exists."}
                    />
                </div>
                <div className={classes.signUpRow}>
                    <TextField
                        label="Password"
                        fullWidth
                        value={password}
                        onChange={onChangePassword}
                        error={registerError === "Passwords do not match."}
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
                        error={registerError === "Passwords do not match."}
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
                        label="Create a corporate account for your company"
                    />
                </div>
                {isCorporate ? (
                    <div className={classes.signUpRow}>
                        <div className={classes.signUpRow}>
                            <TextField
                                label="company name"
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
                        <div className={classes.signUpRow}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={ackAuthority}
                                        onChange={(e) => setAckAuthority(e.target.checked)}
                                        color="primary"
                                    />
                                }
                                label="I acknowledge that I have the authority to create a corporate account.
                                 If you only want to be a member of a corporate account, you may want to choose the normal registration with your corporate email."
                            />
                        </div>
                    </div>
                ) : null}
                {registerError !== "" ? (
                    <div className={classes.signUpRow}>
                        <Typography color="error">{registerError}</Typography>
                    </div>
                ) : null}
                <div className={classes.signUpRow + " " + classes.signUpButtons}>
                    <Button className={classes.signUpButton} onClick={props.onCancel}>
                        Cancel
                    </Button>
                    <Button
                        className={classes.signUpButton}
                        variant="contained"
                        color="primary"
                        onClick={(e) => {
                            onRegister(e);
                        }}
                        disabled={
                            email === "" ||
                            username === "" ||
                            password === "" ||
                            password2 === "" ||
                            registerError !== "" ||
                            password !== password2 ||
                            ackAuthority !== isCorporate

                        }
                        type="submit"
                    >
                        Register
                    </Button>
                    <Snackbar open={open}>
                        <Alert
                            onClose={() => {
                                handleClose();
                                props.onCancel();
                            }}
                            severity="success"
                        >
                            Email for confirmation was sent to {email}
                        </Alert>
                    </Snackbar>
                </div>
            </Paper>
        </div>
    );
}

export default SignUpComponent;
