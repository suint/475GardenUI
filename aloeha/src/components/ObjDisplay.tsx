import React from "react";
import { Link, withRouter } from "react-router-dom";
import placeholder from "./img/reference pictures/Screen Shot 2020-10-18 at 10.27.21 PM.png"
import cactus from "./img/reference pictures/cactus.jpg"
import Draggable from 'react-draggable';
// import Draggable from './Draggable'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

export default class ObjDisplay extends React.Component<any, {gardenObject: GardenObject}> {
    
    constructor(props: any) {
        super(props);
        this.state = {
            gardenObject: this.props.gardenObject
        }
    }
    render() {
        return(
        <Draggable><img src={this.state.gardenObject.image}></img></Draggable>

    )
    }
}

