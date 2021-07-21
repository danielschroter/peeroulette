import { combineReducers } from "redux";
import user from "./userReducer";
import employeeFilter from "./employeeFilterReducer";
import entities from "./entitiesReducer";
import selectedMovie from "./selectedMovieReducer";
import organization from "./orgReducer";

export default combineReducers({
    user,
    employeeFilter,
    entities,
    selectedMovie,
    organization,
});
