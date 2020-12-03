import React from "react";
import { Link, withRouter } from "react-router-dom";
import placeholder from "./img/reference pictures/Screen Shot 2020-10-18 at 10.27.21 PM.png"
import cactus from "./img/reference pictures/cactus.jpg"
import Draggable from 'react-draggable';
// import Draggable from './Draggable'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const dummyPlant: Plant = {
    id: "bkdjgd99304",
    latinName: "bdglsdfg ieurhskdfl",
    images: ["https://crouton.net/crouton.png"],
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

    objectAdded = () => {}

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
                    {this.state.gardenObjects.map((object) => {
                        return <img src={object.image} />
                    })}
                </div>

            </div>
        </div>

    )
}

export default withRouter(Build);