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

	return (
		<div>
			{own ? (
				<div>
					<div>Me: {message.text}</div>
					<div>{format(message.createdAt)}</div>
				</div>
			) : (
				<div>
					<div>Partner: {message.text}</div>
					<div>{format(message.createdAt)}</div>
				</div>
			)}
		</div>
	);
}

export default Message;
