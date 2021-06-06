import React  from "react";
import { connect } from "react-redux";


/**
 * Manages the process of getting movie list data
 * @param {props} props
 */
function MovieListView(props) {

    return (
        // if no movies are loaded, the above useEffect should be triggered
        <div>Hello Peeroulette</div>
    );
}

// connect() establishes the connection to the redux functionalities
export default connect()(MovieListView);
