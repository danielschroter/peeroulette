import MatchService from "../../services/MatchService";

export const getMatches = (id, page) => {
  function onSuccess(match) {
    return { type: "GETMATCH_SUCCESS", match: match };
  }
  function onFailure(error) {
    console.log("failed to load a match", error);
  }

  return async (dispatch, getState) => {
    try {
      let user = await MatchService.getMatches(id);
      dispatch(onSuccess(user));
    } catch (e) {
      onFailure(e);
    }
  };
};

export function addMatch(a, b) {
  function onSuccess(message) {
    return { type: "REGISTER_SUCCESS", message: message };
  }
  function onFailure(error) {
    return { type: "REGISTER_FAILURE", error: error };
  }

  return async (dispatch) => {
    try {
      let resp = await MatchService.addMatch(
        a, b
      );
      dispatch(onSuccess(resp.message));
    } catch (e) {
      dispatch(onFailure(e));
    }
  };
}
