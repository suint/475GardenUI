import React from "react";
import { Link, withRouter } from "react-router-dom";

function Navbar(props: any) {
  return (
    <div className="navigation">
        <Link className="nav-link" to="/">
            Home
        </Link>
        <Link className="nav-link" to={"/select"}>
            Select
        </Link>
        <Link className="nav-link" to={"/questionnaire"}>
            Questionnaire
        </Link>
        <Link className="nav-link" to={"/add"}>
            Add
        </Link>
        <Link className="nav-link" to={"/design"}>
            Design
        </Link>
        <Link className="nav-link" to={"/preview"}>
            Preview
        </Link>
        <Link className="nav-link" to={"/build"}>
            Build
        </Link>
    </div>
  );
} 

export default withRouter(Navbar);
