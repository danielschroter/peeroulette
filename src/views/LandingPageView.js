import React from "react";
import {connect} from "react-redux";
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {IconButton, makeStyles} from "@material-ui/core";
import {CssBaseline} from "@material-ui/core";
import {useTheme} from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {useEffect} from "react";
import {useState} from "react";
import InformationComponent from "../components/InformationComponent";
import background from "../assets/bg_1.png";
import {Slide} from "@material-ui/core";
import {Link, animateScroll as scroll} from 'react-scroll'
import {useRef} from "react";
import CorporatePaperComponent from "../components/CorporatePaperComponent";
import * as Particles from "particles.js";
import ParticleBackground from "../components/ParticleBackground";
import {useSelector} from "react-redux";


/**
 * Manages the process of getting movie list data
 * @param {props} props
 */

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '100vh',
        backgroundImage: `url(${background})`,
        // backgroundImage: "%PUBLIC_URL%/assets/bg_1.png",
        // backgroundImage: process.env.PUBLIC_URL + '/img/logo.png',
        backgroundRepeat: "no-repeat",

        backgroundSize: "cover",
    },
    backCover: {
        position: 'absolute',
        // marginTop: 20,
        // top: 0,
        // bottom: 0,
        // left: 0,
        // right: 0,
        // opacity: 0.5,
        height: '110%',
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    content: {
        display: 'flex',
        color: "#fafafa",
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        height: "100vh",
    },
    colorTextAccent: {
        color: `${theme.palette.primary.main}`,
    },

    goDown: {
        color: "#fafafa",
        fontSize: "3rem",
    },
    extraSpace: {
        height: "100vh",
    }


}))

function LandingPageView(props) {
    const user = useSelector((state) => state.user);
    const classes = useStyles();
    const theme = useTheme();
    const informationRef = useRef();

    const [checked, setChecked] = useState(false);

    useEffect(() => {
        setChecked(true);
    })

    function handleBackClick() {
        informationRef.current.scrollIntoView({behavior: 'smooth'})
    }

    return (
        // if no movies are loaded, the above useEffect should be triggered
        <div className={classes.root} id="landingHeader">
            <div className={classes.backCover}>
                <ParticleBackground></ParticleBackground>
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                    }}
                >
                    {/*<Particles></Particles>*/}
                    {/*<div id="particles-js">*/}


                    <CssBaseline/>

                    <Slide direction="up" in={checked}
                           {...(checked ? {timeout: 800} : {})}
                           collapsedHeight={20}
                    >
                        <div className={classes.content}>
                            {/*<div className={classes.content} style={{'marginTop': '150px', 'marginBottom': '150px'}}>*/}

                            <div>
                                <Typography variant="h2" align="center" gutterBottom>
                                    Welcome to<br/> <span className={classes.colorTextAccent}>peer</span>oulette.
                                </Typography>

                                <div style={{flex: 1}}>
                                    <Button size="large" variant="outlined" color="primary" href="/tryout">
                                        Try it out!
                                    </Button>
                                    <Button size="large" variant="outlined" color="primary" href="/register">
                                        Register
                                    </Button>
                                    <Button size="large" variant="outlined" color="primary" href="/login">
                                        Sign In
                                    </Button>
                                </div>

                                <Link to="section1" smooth={true} spy={true} duration={500}
                                >
                                    <IconButton onClick={handleBackClick}>
                                        <ExpandMoreIcon className={classes.goDown}/>
                                    </IconButton>
                                </Link>

                            </div>


                        </div>
                    </Slide>
                </div>

                <div ref={informationRef}>
                    <InformationComponent user={user}/>
                </div>

                <CorporatePaperComponent/>


                {/*</div>*/}
            </div>
        </div>
    );
}

// connect() establishes the connection to the redux functionalities
export default connect()(LandingPageView);
