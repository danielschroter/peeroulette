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
function Conversation({conversation, currentUser}) {
	const classes = useStyles();

	const [chatPartner, setChatPartner] = React.useState("");

	useEffect(() => {
		const partnerId = conversation.members.find((m) => m !== currentUser._id);

        const extractPartner = () => {
            UserService.getUser(partnerId).then(function (userBackend) {
                setChatPartner(userBackend.data);
            });
        };

		extractPartner();
	}, [currentUser, conversation]);


	return (
		<div style={{ marginTop: "150px", marginBottom: "150px" }}>
			<Container maxWidth="sm">
                    <Typography variant="h4" align="center" gutterBottom>
						Your Conversation with "{chatPartner.username}"
					</Typography>
			</Container>
		</div>
	);
}

export default Conversation;