import React from "react";
import {
    Switch,
    FormControlLabel,
} from "@material-ui/core";


/**
 * For register new users
 * @param {props} props
 */
function CorporateFilterEmployeeComponent(props) {
    const [employeesFiltered, setEmployeesFiltered] = React.useState(false);


    const onSwitchEmployeeFilter = (e) => {
        setEmployeesFiltered(e.target.checked);
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
