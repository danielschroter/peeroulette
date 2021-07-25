import React, { useEffect, useState, useRef } from "react";
import { withRouter } from "react-router-dom";
import { connect, useSelector } from "react-redux";

import Conversation from "../components/Conversation";
import Message from "../components/Message";
import LastMatches from "../components/LastMatches";

import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField, Grid, Typography } from "@material-ui/core";
import CustomTextField from "../components/CustomTextField";
import DetailsArea from "../components/DetailsArea";
import PropTypes from "prop-types";
import UserService from "../services/UserService";
import MatchService from "../services/MatchService";

import { io } from "socket.io-client";

const useStyles = makeStyles((theme) => ({
	flexCol: {
		display: "flex",
		flexDirection: "column",
	},
	flexRow: {
		display: "flex",
		flexDirection: "row",
	},
	justifySpaceBetween: {
		justifyContent: "space-between",
	},
	flex: {
		flex: 1,
	},
	flexEnd: {
		justifyContent: "flex-end",
	},
	marginSides: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
	},
	center: {
		margin: "auto",
	},
	padding: {
		padding: theme.spacing(2),
	},
	maxWidth: {
		width: "100%",
		maxWidth: "1500px",
	},
	maxHight: {
		height: "10%",
	},
	pageArea: {
		paddingBottom: theme.spacing(2),
		"&:last-child": {
			paddingBottom: 0,
		},
	},
	title: {
		marginTop: theme.spacing(4),
	},
	barMinHeight: {
		minHeight: theme.spacing(5),
		position: "absolute",
		top: theme.spacing(1),
		right: theme.spacing(2),
	},
	signUpRow: {
		paddingTop: theme.spacing(1),
		paddingBottom: theme.spacing(1),
		"&:last-child": {
			paddingBottom: theme.spacing(1),
		},
		"&:first-child": {
			paddingTop: theme.spacing(1),
		},
	},
	userDataFont: {
		color: "black",
		fontWeight: "bold",
	},
	deleteProfileButton: {
		marginRight: theme.spacing(1),
		backgroundColor: "#cc0000",
		marginTop: "12px",
	},
	editNameButton: {
		marginRight: theme.spacing(1),
		marginLeft: theme.spacing(1),
	},
	cancelNameButton: {
		marginRight: theme.spacing(1),
		marginLeft: theme.spacing(1),
	},
	saveNameButton: {
		marginRight: theme.spacing(1),
	},
	cancelPasswordButton: {
		marginRight: theme.spacing(1),
		marginLeft: theme.spacing(1),
	},
	savePasswordButton: {
		marginRight: theme.spacing(1),
	},
	editPasswordButton: {
		marginRight: theme.spacing(1),
		marginLeft: theme.spacing(1),
	},
	interestsButton: {
		marginTop: theme.spacing(1),
		marginRight: theme.spacing(1),
		fontSize: "15px",
		pointerEvents: "none",
	},
	deleteInterestsIcon: {
		marginTop: theme.spacing(1),
		fontSize: "15px",
		pointerEvents: "none",
	},
	deleteInterestsCross: {
		marginTop: theme.spacing(1),
		fontSize: "15px",
		marginRight: theme.spacing(1),
		color: "#cc0000",
	},
	addInterestsIcon: {
		marginTop: theme.spacing(1),
		fontSize: "15px",
		marginRight: theme.spacing(1),
		color: "green",
	},
	addInterestsButton: {
		marginTop: theme.spacing(2),
		marginRight: theme.spacing(1),
		backgroundColor: "green",
	},
	deleteInterestsButton: {
		marginTop: theme.spacing(2),
		marginRight: theme.spacing(1),
		backgroundColor: "#cc0000",
	},
}));

/**
 * For register new users
 * @param {props} props
 */
function MessengerView(props) {
	const user = useSelector((state) => state.user.user);
	const classes = useStyles();

	const [conversations, setConversations] = React.useState([]);
	const [currentChat, setCurrentChat] = React.useState(null);
	const [onlineUsers, setOnlineUsers] = React.useState([]);
	const [messages, setMessages] = React.useState([]);
	const [newMessage, setNewMessage] = React.useState("");
	const [arrivalMessage, setArrivalMessage] = React.useState(null);
	const [lastMatches, setLastMatches] = React.useState([]);
	const [matchesUpdated, setMatchesUpdated] = React.useState(false);
	const socket = useRef();
	const scrollRef = useRef();

	// extract all conversations of user from backend
	const extractUserConversations = async () => {
		try {
			const res = await UserService.getUserConversation(user._id);
			setConversations(res);
		} catch (err) {
			console.log(err);
		}
	};

	// extract all messages of currentChat from backend
	const extractMessages = async () => {
		try {
			const res = await UserService.getMessage(currentChat?._id);
			setMessages(res);
		} catch (err) {
			console.log(err);
		}
	};

	// extract all last matches of user
	const extractMatches = async () => {
		try {
			const res = await MatchService.getLastMatches(user._id);
			setLastMatches(res);
		} catch (err) {
			console.log(err);
		}
	};

	// handleSubmit for sending a new message
	const handleSubmit = async (e) => {
		e.preventDefault();
		const message = {
			sender: user._id,
			text: newMessage,
			conversationId: currentChat._id,
		};

		const receiverId = currentChat.members.find(
			(member) => member !== user._id
		);

		socket.current.emit("sendMessage", {
			senderId: user._id,
			receiverId,
			text: newMessage,
		});

		try {
			const res = await UserService.addMessage(
				message.conversationId,
				message.sender,
				message.text
			);
			setMessages([...messages, res]);
			setNewMessage("");
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		extractUserConversations();
	}, [user._id, currentChat]);

	useEffect(() => {
		extractMessages();
	}, [currentChat]);

	useEffect(() => {
		extractMatches();
		setMatchesUpdated(false);
	}, [user._id, matchesUpdated]);

	// Socket useEffects
	useEffect(() => {
		socket.current = io("/");
		socket.current.on("getMessage", (data) => {
			setArrivalMessage({
				sender: data.senderId,
				text: data.text,
				createdAt: Date.now(),
			});
		});
	}, []);

	// Socket useEffects
	useEffect(() => {
		arrivalMessage &&
			currentChat?.members.includes(arrivalMessage.sender) &&
			setMessages((prev) => [...prev, arrivalMessage]);
	}, [arrivalMessage, currentChat]);

	// Socket useEffects
	useEffect(() => {
		socket.current.emit("addUser", user._id);
		socket.current.on("getUsers", (users) => {
			setOnlineUsers(users);
		});
	}, [user]);

	// useEffect(() => {
	// 	scrollRef.current?.scrollIntoView({ behavior: "smooth" });
	// }, [messages]);

	// props for all grid items used below in the JSX
	const girdItemProps = {
		item: true,
		className: classes.padding,
	};

	return (
		<div
			className={
				classes.flexCol +
				" " +
				classes.padding +
				" " +
				classes.center +
				" " +
				classes.flex +
				" " +
				classes.maxWidth +
				" " +
				classes.maxHight
			}
		>
			{/* Title */}
			<div className={classes.pageArea + " " + classes.title}>
				<CustomTextField
					value={"Messenger"}
					furtherProps={{
						fullWidth: true,
					}}
					align="center"
					variant="h2"
				/>
			</div>

			<Grid container>
				{/* Conversations*/}
				<Grid xl={6} lg={6} md={6} ms={12} xs={12} {...girdItemProps}>
					<DetailsArea
						title="Open Conversations:"
						content={
							<div className={classes.userDataFont}>
								{conversations.map((c) => (
									<div onClick={() => setCurrentChat(c)}>
										<Conversation conversation={c} currentUser={user} setConversations={setConversations} />
									</div>
								))}
							</div>
						}
					/>
				</Grid>

				{/* Chatbox*/}
				<Grid xl={6} lg={6} md={6} ms={12} xs={12} {...girdItemProps}>
					<DetailsArea
						title="Chatbox:"
						content={
							<div className={classes.userDataFont}>
								{currentChat ? (
									<>
										<div>
											{messages.map((m) => (
												<div ref={scrollRef}>
													<Message message={m} own={m.sender === user._id} />
												</div>
											))}
										</div>
										<div>
											<textarea
												placeholder="write something..."
												onChange={(e) => setNewMessage(e.target.value)}
												value={newMessage}
											></textarea>
											<button
												className="chatSubmitButton"
												onClick={handleSubmit}
											>
												Send
											</button>
										</div>
									</>
								) : (
									<span>Open a conversation to start a chat.</span>
								)}
							</div>
						}
					/>
				</Grid>

				{/* Last Matches of user*/}
				<Grid xl={6} lg={6} md={6} ms={12} xs={12} {...girdItemProps}>
					<DetailsArea
						title="Your Last Matches:"
						content={
							<div className={classes.userDataFont}>
								{lastMatches.map((m) => (
									<div>
										<LastMatches
											lastMatch={m}
											currentId={user._id}
											setCurrentChat={setCurrentChat}
											setLastMatches={setLastMatches}
											setMatchesUpdated={setMatchesUpdated}
										/>
									</div>
								))}
							</div>
						}
					/>
				</Grid>
			</Grid>
		</div>
	);
}

export default connect()(withRouter(MessengerView));
