import React from "react";
import { Link, withRouter } from "react-router-dom";
import placeholder from "./img/reference pictures/Screen Shot 2020-10-18 at 10.26.28 PM.png"


function Questionnaire(props: any) {
    return (
        <div id="design">
            <h1>Garden questionnaire form goes here</h1>
            <img src={placeholder} style={{ width: "600px" }} />
            <Link className="nav-link" to="/select">
                Back
            </Link>
            <Link className="nav-link" to="/design">
                Next
            </Link>
        </div>
    )
}

export default withRouter(Questionnaire);