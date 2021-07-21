import React from 'react'
import { makeStyles} from "@material-ui/core";
import ImageCard from "./ImageCard";
import zoom_1 from "../assets/zoom_1.png";
import group_1 from "../assets/group_1.jpg";

const useStyles = makeStyles((theme)=>({
root: {
    minHeight: '100vh',
    backgroundColor: `${theme.palette.background.landingPage}`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
},
}));

const informations = [
    {
        title: "Video Macthing",
        imageUrl: zoom_1,
        description:"If you want to get into random Video Chats that share some common interests... Start Matching",
        check: true,
    },
    {
        title: "Group Talks",
        imageUrl: zoom_1,
        description:"Join Talks with about interesting topics and share your thoughts with like minded People. ",
        check: false,
    },
]

function InformationComponent(props) {
    const classes = useStyles();

    return (
    <div id="informationSection" className={classes.root} >
        <ImageCard information={informations[0]} image={{zoom_1}}></ImageCard>
        <ImageCard information={informations[1]} image={{group_1}}></ImageCard>
    </div>
    )

}


export default InformationComponent;