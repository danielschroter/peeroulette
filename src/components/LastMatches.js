import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography, Container } from "@material-ui/core";
import { useParams } from "react-router-dom";
import MatchService from "../services/MatchService";
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

function LastMatches({ lastMatch, currentId, setCurrentChat }) {
	const classes = useStyles();

	const [matchName, setMatchName] = React.useState("");
	const [matchUserId, setMatchUserId] = React.useState("");

	// const extractMatches = async () => {
	// 	try {
	// 		const res = await MatchService.getLastMatches(currentId);
	// 		setLastMatches(res);
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// };

	const extractUsers = async () => {
		if (lastMatch.usera === currentId) {
			try {
				const res = await UserService.getUser(lastMatch.userb);
				setMatchName(res.username);
				setMatchUserId(res._id);
			} catch (err) {
				console.log(err);
			}
		} else {
			try {
				const res = await UserService.getUser(lastMatch.usera);
				setMatchName([res.username]);
				setMatchUserId(res._id);
			} catch (err) {
				console.log(err);
			}
		}
	};

	// useEffect(() => {
	// 	extractMatches();
	// }, [currentId]);

	useEffect(() => {
		extractUsers();
	}, [currentId]);

	const handleClick = async (currentId, matchID) => {
		try {
			const res = await UserService.addConversation(matchID, currentId);
			setCurrentChat(res);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div>
			<Container maxWidth="sm">
				<Typography variant="h4" align="center" gutterBottom>
					<div onClick={() => handleClick(currentId, matchUserId)}>{matchName}</div>
				</Typography>
			</Container>
		</div>
	);
}

export default LastMatches;
