import React, {useEffect} from "react";
import {
    Switch,
    FormControlLabel,
} from "@material-ui/core";
import UserService from "../services/UserService";


/**
 * For register new users
 * @param {props} props
 */
function CorporateFilterEmployeeComponent(props) {
    const [employeesFiltered, setEmployeesFiltered] = React.useState(false);




    // extract all the user data from the backend
    const extractUser = () => {
        if (!props.user) {
            return;
        }

        UserService.getUser(props.user._id).then(function(userBackend) {
            setEmployeesFiltered(userBackend.employeeFilter);
        });
    };



    useEffect(() => {
        if (props.user === undefined) {
            console.log("Error User undefined")
        } else
            extractUser();
    }, [props.user]);

    const onSwitchEmployeeFilter = (e) => {
        props.onSwitchEmployeeFilter();
    };

    return (
        <div>
            <FormControlLabel
                control={
                    <Switch checked={employeesFiltered}
                            onChange={(e) => onSwitchEmployeeFilter(e)}
                            color="primary"

                    />
                    }
                    label="Colleagues Only"
                    />
                    </div>
                    );
                }



export default CorporateFilterEmployeeComponent;
