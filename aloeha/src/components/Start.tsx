import React from "react";
import { Fade } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import FadeLogo from "./img/fade_logo.png"

function Start(props: any) {
    return (
        <div id="start">
            <h1>Aloe-Ha</h1>
            <img src={FadeLogo} style={{"width": "300px"}}/>
            <h3>Find native plants for your garden</h3>
            <button className="start-button">
                <Link to="/select">Begin planning</Link>
            </button>
        </div>
    )
}

export default withRouter(Start);