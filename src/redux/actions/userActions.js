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

export function changeUser(changedUser) {
  function onSuccess(user) {
    return { type: "UPDATEMOVIE_SUCCESS", user: user };
  }

  function onFailure(error) {
    console.log("change movie failure", error);
  }

  return async (dispatch) => {
    try {
      let user = await UserService.updateUser(changedUser);
      dispatch(onSuccess(user));
    } catch (e) {
      onFailure(e);
    }
  };
}

export function deleteUser(id) {
    function onSuccess() {
        return { type: "DELETEUSER_SUCCESS"};
    }
    function onFailure(error) {
        console.log("delete user failure", error);
    }

    return async (dispatch) => {
        try {
            await UserService.deleteUser(id);
            dispatch(onSuccess());
        } catch (e) {
            onFailure(e);
        }
    };
}

export const getUser = (id) => {
  function onSuccess(user) {
    return { type: "GETUSER_SUCCESS", user: user };
  }
  function onFailure(error) {
    console.log("failed to load a user", error);
  }

  return async (dispatch, getState) => {
    try {
      let user = await UserService.getUser(id);
      dispatch(onSuccess(user));
    } catch (e) {
      onFailure(e);
    }
  };
};


export function deleteOrganization(id) {
    function onSuccess() {
        return { type: "DELETORGANIZATION_SUCCESS"};
    }
    function onFailure(error) {
        console.log("delete organization failure", error);
    }

    return async (dispatch) => {
        try {
            await UserService.deleteOrganization(id);
            dispatch(onSuccess());
        } catch (e) {
            onFailure(e);
        }
    };
}

export function changeOrganization(changedOrganization) {

    function onSuccess(organization) {
        return { type: "UPDATEMOVIE_SUCCESS", organization: organization };
    }

    function onFailure(error) {
        console.log("change movie failure", error);
    }

    return async (dispatch) => {
        try {
            let organization = await UserService.updateOrganization(changedOrganization);
            dispatch(onSuccess(organization));
        } catch (e) {
            onFailure(e);
        }
    };
}

export function registerOrganization(user_id, compname, domains) {
    function onSuccess() {
        return { type: "LOGIN_SUCCESS"};
    }
    function onFailure(error) {
        return { type: "LOGIN_FAILURE", error: error };
    }

    return async (dispatch) => {
        try {
            let resp = await UserService.registerOrganization(user_id, compname, domains);
            dispatch(onSuccess(resp.user));
        } catch (e) {
            dispatch(onFailure(e));
        }
    };
}
