import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography, Container } from "@material-ui/core";
import { useParams } from "react-router-dom";
import UserService from "../services/UserService";

const useStyles = makeStyles((theme) => ({
	loginButtons: {
		display: "flex",
		justifyContent: "space-between",
	},
	loginButton: {
		margin: "auto",
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
				<Typography variant="h4" align="center" gutterBottom>
					Your Conversation with "{chatPartner}"
				</Typography>
			</Container>
		</div>
	);
}

export default Conversation;
