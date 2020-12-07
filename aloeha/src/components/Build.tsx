import React from "react";
import { Link, withRouter } from "react-router-dom";
import placeholder from "./img/reference pictures/Screen Shot 2020-10-18 at 10.27.21 PM.png"
import cactus from "./img/reference pictures/cactus.jpg"
import Draggable from 'react-draggable';
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { ObjDisplay } from ".";

const dummyPlant: GardenObject = {
    key: 0,
    name: "bdglsdfg ieurhskdfl",
    image: "https://crouton.net/crouton.png",
    x: 150,
    y: 150
}

const dummyPlant2: Plant = {
    id: "98rujtlk",
    latinName: "mendkblsdfgpow  ieurh klsdf",
}

class Build extends React.Component<any, {gardenObjects: GardenObject[]}> {
    
    constructor(props: any) {
        super(props);
        this.objectAdded = this.objectAdded.bind(this);
        this.objectDrag = this.objectDrag.bind(this);
        this.state = {
            gardenObjects: this.props.gardenObjects,
        };
    }

    objectAdded = () => {
        this.state.gardenObjects.push(dummyPlant)
        for(let i = 0; i < this.state.gardenObjects.length; i++){
            console.log(this.state.gardenObjects)
            var DOM_img = document.createElement("img");
            DOM_img.src = "https://crouton.net/crouton.png"; 
            DOM_img.className = "draggable"
            console.log(DOM_img.attributes)
            document.getElementById("selected-plants")?.appendChild(DOM_img)

            
        } 
    }

    objectDrag = () => {}

    render() {
        return(
            <div>
            <div id="plantbox">
                <h1>Build widget goes here</h1>
                <div id="search-plants" className="plants">
                    <p>Drag and drop your plants and objects from the drop downs on the left to build your garden. Click next to see your garden in a different season, age, and view, or you can save your garden project here.</p>
                    <Accordion>
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                    Existing Plants
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                                
                                <button onClick={this.objectAdded}>Add a plant</button>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                    Selected Plants
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="1">
                                <Card.Body>Hello! I'm another body</Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Button} variant="link" eventKey="2">
                                    Garden Objects
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="2">
                                <Card.Body>Hello! I'm another body</Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
            
                </div>
                <div id="selected-plants" className="plants">
                    hi
                    {this.state.gardenObjects.map((object) => {
                        console.log("hi")
                        return <ObjDisplay gardenObject={object}/>
                    })}
                </div>

            </div>
        </div>

    )
    }
}

export default withRouter(Build);