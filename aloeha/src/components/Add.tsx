import React from "react";
import { Link, withRouter } from "react-router-dom";
import placeholder from "./img/reference pictures/Screen Shot 2020-10-18 at 10.26.45 PM.png"

function Add(props: any) {
    return (
        <div id="add">
            <h1>Add widget goes here</h1>
            <img src={placeholder} style={{ width: "600px" }} />
            <Link className="nav-link" to="/preview">
                Back
            </Link>
        </div>
    )
}

export default withRouter(Add);