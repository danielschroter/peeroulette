import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography, Container, Avatar } from "@material-ui/core";
import { useParams } from "react-router-dom";
import UserService from "../services/UserService";

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
				<Typography variant="h6" align="left" gutterBottom>
					<Avatar className={classes.avatar}>
						{chatPartner ? chatPartner[0] : ""}
					</Avatar>
					{chatPartner}
					<div>
					<Button
                            onClick={() => handleDelete(conversation)}
                            variant="contained"
                            color="primary"
                            className={classes.deleteConversationButton}
                        >
                            Delete
                    </Button>
					</div>
				</Typography>
			</Container>
		</div>
	);
}

export default Conversation;
