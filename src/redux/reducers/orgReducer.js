
export default function organization(state = {}, action) {
    switch (action.type) {
        case "REGISTER_ORGANIZATION_SUCCESS" :
            return { organization: action.organization }
        case "REGISTER_ORGANIZATION_FAILURE":
            return { error: action.error };
        default:
            return state;
    }
}


