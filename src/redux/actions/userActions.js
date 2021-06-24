import UserService from "../../services/UserService";

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

export function register(
  email,
  username,
  password,
  isAdmin,
  compname,
  domains
) {
  function onSuccess(user) {
    return { type: "LOGIN_SUCCESS", user: user };
  }
  function onFailure(error) {
    return { type: "LOGIN_FAILURE", error: error };
  }

  return async (dispatch) => {
    try {
      let resp = await UserService.register(
        email,
        username,
        password,
        isAdmin,
        compname,
        domains
      );
      dispatch(onSuccess(resp.user));
    } catch (e) {
      dispatch(onFailure(e));
    }
  };
}

export function confirm(id) {
  function onSuccess(user) {
    return { type: "CONFIRM_SUCCESS", user: user };
  }
  function onFailure(error) {
    return { type: "CONFIRM_FAILURE", error: error };
  }

  return async (dispatch) => {
    try {
      let resp = await UserService.confirm(id);
      dispatch(onSuccess(resp.user));
    } catch (e) {
      dispatch(onFailure(e));
    }
  };
}
