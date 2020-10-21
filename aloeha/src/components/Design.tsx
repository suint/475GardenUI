import React from "react";
import { Link, withRouter } from "react-router-dom";
import placeholder from "./img/reference pictures/Screen Shot 2020-10-18 at 10.26.57 PM.png"

function Design(props: any) {
    return (
        <div id="design">
            <h1>Design widget goes here</h1>
            <img src={placeholder} style={{ width: "600px" }} />
            <Link className="nav-link" to="/questionnaire">
                Back
            </Link>
            <Link className="nav-link" to="/preview">
                Next
            </Link>
        </div>
        
    )
}

export default withRouter(Design);