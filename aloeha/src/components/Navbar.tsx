import React from "react";
import { Link, withRouter, useLocation } from "react-router-dom";
 
const pages = ["/", "/select", "/questionnaire", "/add", "/build", "/preview"];

function Navbar(props: any) {
    const location = useLocation();
    const pageIndex = pages.findIndex(element => element === location.pathname);
    const prevPage = pages[pageIndex-1];
    const nextPage = pages[pageIndex+1];
  return (
    <div id="navbar">
        {prevPage ? 
        <Link className="nav-link" to={prevPage}>
            Back
        </Link> : <span></span>}
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
        <Link className="nav-link" to={"/build"}>
            Build
        </Link>
        <Link className="nav-link" to={"/preview"}>
            Preview
        </Link>
        {nextPage ? 
        <Link className="nav-link" to={nextPage}>
            Next
        </Link> : <span></span>}
    </div>
  );
} 

export default withRouter(Navbar);
