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
    </div>
  );
}

export default withRouter(Navbar);
