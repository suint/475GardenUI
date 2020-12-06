import React from "react";
import { Link, withRouter, useLocation } from "react-router-dom";
 
const pages = ["/", "/select", "/questionnaire", "/design", "/preview", "/build"];

function Navbar(props: any) {
    const location = useLocation();
    const pageIndex = pages.findIndex(element => element === location.pathname);
    const prevPage = pages[pageIndex-1];
    const nextPage = pages[pageIndex+1];
  return (
    <div className="row">
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
        <Link className="nav-link" to={"/design"}>
            Design
        </Link>
        <Link className="nav-link" to={"/preview"}>
            Preview
        </Link>
        <Link className="nav-link" to={"/build"}>
            Build
        </Link>
        {nextPage ? 
        <Link className="nav-link" to={nextPage}>
            Next
        </Link> : <span></span>}
    </div>
  );
} 

export default withRouter(Navbar);
