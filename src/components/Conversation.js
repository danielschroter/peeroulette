import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography, Container, Avatar } from "@material-ui/core";
import { useParams } from "react-router-dom";
import UserService from "../services/UserService";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
	avatar: {
		marginRight: theme.spacing(1),
	},
	deleteConversationButton: {
		marginRight: theme.spacing(1),
		backgroundColor: "#cc0000",
		marginTop: "12px",
		color: "#ffffff",
	},
}));
function Conversation({ conversation, currentUser, setConversations }) {
	const classes = useStyles();

	const [chatPartner, setChatPartner] = React.useState("");

	const extractPartner = async (partnerId) => {
		try {
			UserService.getUser(partnerId).then(function (userBackend) {
				setChatPartner(userBackend.username);
			});
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		const partnerId = conversation.members.find((m) => m !== currentUser._id);

		extractPartner(partnerId);
	}, [currentUser, conversation]);

	const handleDelete = async (conversation) => {
		try {
			await UserService.deleteConversation(conversation._id);
		} catch (err) {
			console.log(err);
		}
		try {
			const res = await UserService.getUserConversation(currentUser._id);
			setConversations(res);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div>
			<Container maxWidth="sm">
				<div style={{ display: "flex" }}>
					<Grid
						container
						direction="row"
						alignItems="center"
						alignContent="space-around"
						spacing={0}
					>
						<Grid xs={1}>
							<Avatar className={classes.avatar}>
								{chatPartner ? chatPartner[0] : ""}
							</Avatar>
						</Grid>
						<Grid xs={1}>
							<Typography style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
								&nbsp;{chatPartner}
							</Typography>
						</Grid>
						<Grid xs={4}>
							<span></span>
						</Grid>
						<Grid xs={4}>
							<Button
								onClick={() => handleDelete(conversation)}
								variant="contained"
								color="primary"
								size="small"
								className={classes.deleteConversationButton}
							>
								Delete
							</Button>
						</Grid>
					</Grid>
				</div>
			</Container>
		</div>
	);
}

export default Conversation;
