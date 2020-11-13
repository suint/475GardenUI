import React from "react";
import { Link, withRouter } from "react-router-dom";
import placeholder from "./img/reference pictures/Screen Shot 2020-10-18 at 10.26.57 PM.png"
import Draggable from 'react-draggable';



function Design(props: any) {
    return (
        <div>
        <div id="plantbox">
        <h1>Design widget goes here</h1>
            <div id="search-plants" className="plants">
                    <p>Drag and drop the given objects from the left pane to build a blue print for your garden. Click on the next to start design your garden.</p>
                    
            </div>
        <div id="selected-plants" className="plants">
            
        </div>

        {/* <img src={placeholder} style={{ width: "600px" }} /> */}
    </div>
        <div id="design">
            
            <img src={placeholder} style={{ width: "600px" }} />
        </div>
<<<<<<< HEAD
    </div>
=======
        </div>
>>>>>>> adds accordian
    )
}

export default withRouter(Design);