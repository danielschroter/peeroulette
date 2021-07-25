import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography, Container } from "@material-ui/core";
import { useParams } from "react-router-dom";
import UserService from "../services/UserService";

import { format } from "timeago.js";

const useStyles = makeStyles((theme) => ({
	loginButtons: {
		display: "flex",
		justifyContent: "space-between",
	},
	loginButton: {
		margin: "auto",
	},
}));
function Message({ message, own }) {
	const classes = useStyles();

	const [senderName, setSenderName] = React.useState("");

	const extractMessageSender = async () => {
		
			try {
				const res = await UserService.getUser(message.sender);
				setSenderName(res.username);
			} catch (err) {
				console.log(err);
			}
	};

	useEffect(() => {
		extractMessageSender();
	});

	return (
		<div>
			{own ? (
				<div>
					<div>Me ({senderName}): {message.text}</div>
					<div>{format(message.createdAt)}</div>
				</div>
			) : (
				<div>
					<div>Peer ({senderName}): {message.text}</div>
					<div>{format(message.createdAt)}</div>
				</div>
			)}
		</div>
	);
}

export default Message;
