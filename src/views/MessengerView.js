import React, { useEffect, useState, useRef } from "react";
import { withRouter } from "react-router-dom";
import { connect, useSelector } from "react-redux";

//import MessengerComponent from "../components/MessengerComponent";
import Conversation from "../components/Conversation";

import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField, Grid, Typography } from "@material-ui/core";
import CustomTextField from "../components/CustomTextField";
import DetailsArea from "../components/DetailsArea";
import PropTypes from "prop-types";
import UserService from "../services/UserService";

//import { io } from "socket.io";

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
	const reptiles = ["alligator", "snake", "lizard"];

	const [conversations, setConversations] = React.useState([]);
	const [currentChat, setCurrentChat] = React.useState(null);
	//const [currentChat, setCurrentChat] = useState("60f7f496708da03d93962301");
	const [messages, setMessages] = React.useState([]);
	const [newMessage, setNewMessage] = React.useState("");
	const [arrivalMessage, setArrivalMessage] = React.useState(null);
	const [onlineUsers, setOnlineUsers] = React.useState([]);
	const socket = useRef();
	const scrollRef = useRef();

	// extract all conversations of user from backend
	const extractUserConversations = async() => {
		console.log(user.username);
		const res = await UserService.getUserConversation(user._id);
		setConversations(res);
	};

	// extract all conversations of user from backend
	const extractMessages = async() => {
		if (!props.user) {
			return;
		}
		await UserService.getMessage(currentChat?._id).then(function (userBackend) {
			setMessages(userBackend.data);
		});
	};

	useEffect(() => {
		extractUserConversations();
		extractMessages();

		console.log(JSON.stringify(conversations));
		console.log("TEst");
	}, [props.user]);

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
				classes.maxWidth
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

			{/*  */}
			<Grid container>
				{/* Menu*/}
				<Grid xl={6} lg={6} md={6} ms={12} xs={12} {...girdItemProps}>
					<DetailsArea title="Conversations:" />
					<div>
						{conversations.map((c) => (
							<div onClick={() => setCurrentChat(c)}>
								<Conversation conversation={c} currentUser={user} />
							</div>
						))}
					</div>
				</Grid>
				{/* Box*/}
				<Grid xl={6} lg={6} md={6} ms={12} xs={12} {...girdItemProps}>
					<DetailsArea title="Box" />
				</Grid>
				{/* Online*/}
				<Grid xl={6} lg={6} md={6} ms={12} xs={12} {...girdItemProps}>
					<DetailsArea title="Online" />
				</Grid>
			</Grid>
		</div>
	);
}

export default connect()(withRouter(MessengerView));
