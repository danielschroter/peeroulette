import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography, Container, Avatar } from "@material-ui/core";
import { useParams } from "react-router-dom";
import UserService from "../services/UserService";

const useStyles = makeStyles((theme) => ({
	avatar: {
		marginRight: theme.spacing(1),
	},
}));
function Conversation({ conversation, currentUser }) {
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

	return (
		<div>
			<Container maxWidth="sm">
				<Typography variant="h6" align="left" gutterBottom>
					<Avatar className={classes.avatar}>
						{chatPartner ? chatPartner[0] : ""}
					</Avatar>
					{chatPartner}
				</Typography>
			</Container>
		</div>
	);
}

export default Conversation;
