import UserService from "../../services/UserService";
import UserServiceCRUD from "../../services/UserServiceCRUD";
import MovieService from "../../services/MovieService";


export function login(username, password) {
    function onSuccess(user) {
        return { type: "LOGIN_SUCCESS", user: user };
    }
    function onFailure(error) {
        return { type: "LOGIN_FAILURE", error: error };
    }

    return async (dispatch) => {
        try {
            let resp = await UserService.login(username, password);
            dispatch(onSuccess(resp.user));
        } catch (e) {
            dispatch(onFailure(e));
        }
    };
}

export function logout() {
    UserService.logout();
    return { type: "LOGOUT" };
}

export function loginReset() {
    return { type: "LOGIN_RESET" };
}

export function register(username, password, isAdmin, compname, domains) {
    function onSuccess(user) {
        return { type: "LOGIN_SUCCESS", user: user };
    }
    function onFailure(error) {
        return { type: "LOGIN_FAILURE", error: error };
    }

    return async (dispatch) => {
        try {
            let resp = await UserServiceCRUD.register(username, password, isAdmin, compname, domains);
            dispatch(onSuccess(resp.user));
        } catch (e) {
            dispatch(onFailure(e));
        }
    };
}

export function changeUser(changedUser) {

    function onSuccess(user) {
        return { type: "UPDATEMOVIE_SUCCESS", user: user };
    }

    function onFailure(error) {
        console.log("change movie failure", error);
    }

    return async (dispatch) => {
        try {
            let user = await UserServiceCRUD.updateUser(changedUser);
            dispatch(onSuccess(user));
        } catch (e) {
            onFailure(e);
        }
    };
}
