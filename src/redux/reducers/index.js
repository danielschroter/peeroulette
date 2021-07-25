import { combineReducers } from "redux";
import user from "./userReducer";
import employeeFilter from "./employeeFilterReducer";
import organization from "./orgReducer";

export default combineReducers({
    user,
    employeeFilter,
    organization,
});
