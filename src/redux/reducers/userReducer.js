const getUser = () => {
    if (window.localStorage["jwtToken"]) {
        let token = window.localStorage["jwtToken"];
        let base64Url = token.split(".")[1];
        let base64 = base64Url.replace("-", "+").replace("_", "/");
        let userJson = JSON.parse(window.atob(base64));
        // if token is expired delete it and return {}
        // --> User is not logged in anymore.
        if (userJson.exp > Date.now()) {
            window.localStorage.removeItem("jwtToken");
            return {};
        }
        return {
            user: {
                _id: userJson._id,
                username: userJson.username,
                role: userJson.role,
                account_owner_of_organization: userJson.account_owner_of_organization,
            },
        };
    }
    return {};
};

export default function user(state = getUser(), action) {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return { user: action.user.user };
        case "LOGIN_FAILURE":
            return { error: action.error };
        case "LOGIN_RESET":
            return {};
        case "LOGOUT":
            return {};
        case "REGISTER_SUCCESS":
            return { user: action.user };
        case "REGISTER_FAILURE":
            return { error: action.error };
        case "CONFIRM_SUCCESS":
            return { user: action.user };
        case "CONFIRM_FAILURE":
            return { error: action.error };    
        case "REGISTER_ORG_SUCCESS" :
            return { user: action.user }
        case "CHANGE_USER_SUCCESS" :
            return { user: action.user };
        default:
            return state;
    }
}


