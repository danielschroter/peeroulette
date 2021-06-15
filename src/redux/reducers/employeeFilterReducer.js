
export default function employeeFilter (state = false, action){
    switch(action.type){
        case "switchEmployeeFilter":
            return !state;
        default:
            return state;
    }
};



