import React from "react";
import { Link, withRouter } from "react-router-dom";

function Start(props: any) {
    return (
        <div id="start">
            <button className="start-button">
                <Link to="/select">Start New Plot</Link>
            </button>
        </div>
    )
}

export default withRouter(Start);