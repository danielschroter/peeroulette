import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import zoom_1 from "../assets/zoom_1.png";
import group_1 from "../assets/group_1.jpg";

const useStyles = makeStyles({
    root: {
        maxWidth: 645,
        background: 'rgba(0,0,0,0.5)',
        color:  "#fafafa",
        margin: "20px",
    },
    media: {
        height: 440,
    },
    title: {
        fontSize: "2rem",
        fontWeight: "bold",
        color:  "#fafafa",
    },
    description: {
        fontSize: "1.1rem",
        color:  "#ddd",
    }

});

function ImageCard({information, image}) {
    const classes = useStyles();

    useEffect(()=>{
        console.log(""+ information.imageURL);
    })

    return (
        <Card className={classes.root}>
            <CardActionArea>
                { information.check ? (<CardMedia
                    className={classes.media}
                    component="img"
                    image ={zoom_1}
                    title={ information.title}
                />):
                    <CardMedia
                        className={classes.media}
                        component="img"
                        image ={group_1}
                        title={ information.title}
                    />}
                <CardContent>
                    <Typography className={classes.title} gutterBottom variant="h5" component="h2">
                        {information.title}
                    </Typography>

                    <Typography variant="body2" color="textSecondary" component="p" className={classes.description}>
                        {information.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                {!information.check ?
                    <Button size="small" color="primary" href="/events">
                        Check out Events
                    </Button> :
                    <Button size="small" color="primary" href="/wait">
                        Get a Match
                    </Button>
                }
            </CardActions>
        </Card>
    );
}

export default ImageCard;