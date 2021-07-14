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
export function switchEmployeeFilter(id){
    function onSuccess(filterValue) {
        return { type: "switchEmployeeFilter_success", filterValue: filterValue };
    }
    function onFailure(error) {
        return { type: "switchEmployeeFilter_failure" };
    }

    return async (dispatch) => {
        try {
            let resp = await UserService.switchEmployeeFilter(id);
            dispatch(onSuccess(resp));
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
  function onSuccess(message) {
    return { type: "REGISTER_SUCCESS", message: message };
  }
  function onFailure(error) {
    return { type: "REGISTER_FAILURE", error: error };
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
      dispatch(onSuccess(resp.message));
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
    return { type: "CHANGE_USER_SUCCESS", user: user };
  }

  function onFailure(error) {
    console.log("change user failure", error);
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
        return { type: "DELETE_USER_SUCCESS"};
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
    return { type: "GET_USER_SUCCESS", user: user };
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

export const getAvailable = (id, page) => {
  function onSuccess(user) {
    return { type: "GETUSER_SUCCESS", user: user };
  }
  function onFailure(error) {
    console.log("failed to load a user", error);
  }

  return async (dispatch, getState) => {
    try {
      let user = await UserService.getAvailable(id, page);
      dispatch(onSuccess(user));
    } catch (e) {
      onFailure(e);
    }
  };
};


export function deleteOrganization(id) {
    function onSuccess() {
        return { type: "DELETE_ORGANIZATION_SUCCESS"};
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

export function deleteDomain(id) {
    function onSuccess() {
        return { type: "DELETE_DOMAIN_SUCCESS"};
    }
    function onFailure(error) {
        console.log("delete domain failure", error);
    }

    return async (dispatch) => {
        try {
            await UserService.deleteDomain(id);
            dispatch(onSuccess());
        } catch (e) {
            onFailure(e);
        }
    };
}

export function changeOrganization(changedOrganization) {

    function onSuccess(organization) {
        return { type: "CHANGE_ORGANIZATION_SUCCESS", organization: organization };
    }

    function onFailure(error) {
        console.log("change organization failure", error);
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
    function onSuccess(user) {
        return { type: "REGISTER_ORGANIZATION_SUCCESS", user: user};
    }
    function onFailure(error) {
        return { type: "REGISTER_ORGANIZATION_FAILURE", error: error };
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

export function addDomain(domain) {
    function onSuccess() {
        return { type: "DOMAIN_SUCCESS"};
    }
    function onFailure(error) {
        return { type: "DOMAIN_FAILURE", error: error };
    }

    return async (dispatch) => {
        try {
            let resp = await UserService.addDomain(domain);
            dispatch(onSuccess(resp.user));
        } catch (e) {
            dispatch(onFailure(e));
        }
    };
}

export const filterEmployee = () => {
    return{
        type: "switchEmployeeFilter"
    }
}
