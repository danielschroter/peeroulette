import { combineReducers } from "redux";
import user from "./userReducer";
import employeeFilter from "./employeeFilterReducer";
import entities from "./entitiesReducer";
import selectedMovie from "./selectedMovieReducer";

export default combineReducers({
    user,
    employeeFilter,
    entities,
    selectedMovie,
});
