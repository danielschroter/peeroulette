import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from "@material-ui/core/Box";
import GavelIcon from '@material-ui/icons/Gavel';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: 'rgba(175,175,175,0.5)',
    },
    stepperRoot: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        color: '#fff',
        fontSize: '0.4rem',

    },
    button: {
        marginRight: theme.spacing(1),
    },
    completed: {
        display: 'inline-block',
    },
    instructions: {
        color: "#fff",
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    stepButton: {
        color: 'rgba(255,255,255,100)',
        // backgroundColor: "#fff",
        fontSize: "1.2rem",
    },
    stepContent:{
        alignItems: "center",
        //justifyContent: 'center',
    }


}));

function getSteps() {
    return ['Corporate permission for Peeroulette', 'Open a Corporate Account', 'Benefits for your employees!'];
}

function getStepContent(step) {
    switch (step) {
        case 0:
            return (<div>
                <GavelIcon/>
                <div style={{ fontWeight:"bold"}}>Corporate permission for Peeroulette</div>
                <p>Please ensure, that you have the authority to open and administrate a corporate account for your company <br/>
                You may want to open an account for your subdivision or <br/>
                You ask your manager if you have the rights to do so.<br/>
                Note that a corporate account is related to a set of e-mail domains, such as "@gmail.com"</p>
                <p/>

            </div>);
        case 1:
            return (<div>
                <AccountBoxIcon/>
                <div style={{ fontWeight:"bold"}}>Open a Corporate Account</div>
                <p>If you do not have a corporate account yet, you can simply start the registration process <br/>
                    During registration you will see the option for opening up a new corporate account<br/>
                   If you already have a user account with us,<br/>
                    You may want to visit the Edit profile page and Open a Corporate Account there...</p>
                <p/>
            </div>);
        case 2:
            return (<div>
                <InsertEmoticonIcon/>
                <div style={{ fontWeight:"bold"}}>Benefits for your employees!</div>
                <p>Your employees will now have the option to filter for colleagues only <br/>
                    If they want to do so, they will only be matched with peers from your company...<br/>
                    Not only the peer-matching, but also group talks for your organization can be organized with peeroulette<br/>
                    Enjoy a vibrant corporate culture...</p>
                <p/>
            </div>);
        default:
            return 'Unknown step';
    }
}

export default function StepperComponent() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState({});
    const steps = getSteps();

    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? // It's the last step, but not all steps have been completed,
                  // find the first step that has been completed
                steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step) => () => {
        setActiveStep(step);
    };

    const handleComplete = () => {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
    };

    return (
        <div className={classes.root}>
            <Box p={5}>
                <Typography align="center" variant="h5">How to open a Corporate Account</Typography>
                <Stepper className={classes.stepperRoot} nonLinear activeStep={activeStep}>
                    {steps.map((label, index) => (
                        <Step key={label}>
                            <StepButton className={classes.stepButton} onClick={handleStep(index)}
                                        completed={completed[index]}>
                                <span className={classes.stepButton}>{label}</span>
                            </StepButton>
                        </Step>
                    ))}
                </Stepper>
                <div>
                    {allStepsCompleted() ? (
                        <div>
                            <Typography className={classes.instructions}>
                                All steps completed - you&apos;re finished
                            </Typography>
                            <Button onClick={handleReset}>Reset</Button>
                        </div>
                    ) : (
                        <div>
                            <Typography className={classes.instructions} align="center">{getStepContent(activeStep)}</Typography>
                            {/*<div>*/}
                            {/*    <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>*/}
                            {/*        Back*/}
                            {/*    </Button>*/}
                            {/*    <Button*/}
                            {/*        variant="contained"*/}
                            {/*        color="primary"*/}
                            {/*        onClick={handleNext}*/}
                            {/*        className={classes.button}*/}
                            {/*    >*/}
                            {/*        Next*/}
                            {/*    </Button>*/}
                            {/*    {activeStep !== steps.length &&*/}
                            {/*    (completed[activeStep] ? (*/}
                            {/*        <Typography variant="caption" className={classes.completed}>*/}
                            {/*            Step {activeStep + 1} already completed*/}
                            {/*        </Typography>*/}
                            {/*    ) : (*/}
                            {/*        <Button variant="contained" color="primary" onClick={handleComplete}>*/}
                            {/*            {completedSteps() === totalSteps() - 1 ? 'Finish' : 'Complete Step'}*/}
                            {/*        </Button>*/}
                            {/*    ))}*/}
                            {/*</div>*/}
                        </div>
                    )}
                </div>
            </Box>
        </div>
    );
}