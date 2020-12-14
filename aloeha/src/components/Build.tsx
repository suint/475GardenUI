import React from "react";
import { Link, withRouter } from "react-router-dom";
import Draggable, {DraggableBounds} from 'react-draggable';
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import _ from "lodash";
import "./Build.css"

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
    images: ["https://crouton.net/crouton.png"]
}

const ObjectList = ["Flamingo", "Bench", "Birdbath", "Fence", "Forest", "Gnome", "Path", "Patio", "Playground", "Pool", "Road", "Rock", "TextLabel"];

class Build extends React.Component<any, {}> {
    
    constructor(props: any) {
        super(props);
        this.objectAdded = this.objectAdded.bind(this);
        this.objectDrag = this.objectDrag.bind(this);

    }

    objectAdded = () => {
        this.props.addGardenObject(dummyPlant2.latinName, "https://crouton.net/crouton.png");
        this.forceUpdate();
        console.log(this.props.existingPlants)
    }

    objectDrag = () => { }
    
    convertPlant = () => {
        let selectedGardenObjects=[]
        {this.props.existingPlants.map((object: Plant) => {
            let gardenObject : GardenObject
            
        })}
    }

    render() {
        return(
            <div id="gardenpage">
                <h1>Build widget goes here</h1>
                <div id="garden-select">
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
                <div id="garden-box" style={{height: '600px', width: '500px', position: 'relative'}}>
                        {this.props.gardenObjects.map((object: GardenObject) => {
                        return <DraggableObject onDrag={this.props.moveGardenObject} gardenObject={object} key={object.key}/>
                    })}
                </div>
            </div>

    )
    }
}


type DraggableState = {
    activeDrags: number,
    positionX: number,
    positionY: number,
    gardenObject: GardenObject
}
class DraggableObject extends React.Component<any, DraggableState> {
    
    constructor(props: any) {
        super(props);
        this.state = {
            activeDrags: 0,
            positionX: this.props.gardenObject.x, 
            positionY: this.props.gardenObject.y,
            gardenObject: this.props.gardenObject
        }
        
        this.handleDrag = this.handleDrag.bind(this);
        this.onStart = this.onStart.bind(this);
        this.onStop = this.onStop.bind(this);
    }


    handleDrag = (e: any, ui: any) => {
        const {positionX, positionY} = this.state;
        e.preventDefault();
        this.props.onDrag(positionX + ui.deltaX, positionY + ui.deltaY, this.state.gardenObject.key);
    };

    onStart = () => {
        this.setState({activeDrags: this.state.activeDrags + 1});
    };

    onStop = () => {
        this.setState({activeDrags: this.state.activeDrags - 1});
    };

    render() {
        const dragHandlers = {onStart: this.onStart, onStop: this.onStop};
        let bounds: DraggableBounds = {top: 0, bottom: 600, left: 0, right: 500}; // TODO: this allows image to be dragged out of bounds (since anchor point is at upper left corner)
            // also it's not very responsive :(
        return(
            <Draggable onDrag={this.handleDrag} bounds={bounds} {...dragHandlers}>
                <div className="garden-obj">
                    <img src={this.state.gardenObject.image}></img>
                    <p>{this.state.gardenObject.x}, {this.state.gardenObject.y}</p>
                    <p>{this.state.gardenObject.name}</p>
                </div>
            </Draggable>
        )
    }
}

export default withRouter(Build);