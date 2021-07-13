
export default function employeeFilter (state = false, action){
    switch(action.type){
        case "switchEmployeeFilter_success":
            return action.filterValue;
        default:
            return state;
    }
};



