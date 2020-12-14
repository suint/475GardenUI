import React from "react";
import { Link, withRouter } from "react-router-dom";
import Draggable, {DraggableBounds} from 'react-draggable';
import Accordion from 'react-bootstrap/Accordion'
import Collapsible from "react-collapsible";
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import _ from "lodash";
import { PlantDisplay } from "./Add"
import Default from './img/reference pictures/default_plant.png'

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

const ItemList = ["Flamingo", "Bench", "Birdbath", "Fence", "Forest", "Gnome", "Path", "Patio", "Playground", "Pool", "Road", "Rock", "TextLabel"];

class Build extends React.Component<any, {}> {
    constructor(props: any) {
        super(props);
        this.itemAdded = this.itemAdded.bind(this);
        this.plantAdded = this.plantAdded.bind(this);
        this.objectDrag = this.objectDrag.bind(this);
    }

    itemAdded = (name: string) => {
        
    }

    plantAdded = (plant: Plant) => {
        if(plant.images){
            this.props.addGardenObject(plant.latinName, plant.images[0]);
            this.forceUpdate();
        }
        else{
            this.props.addGardenObject(plant.latinName, Default);
            this.forceUpdate();
        }
    }


    objectDrag = () => {}

    render() {
        return(
            <div id="gardenpage">
                <h1>Build your garden</h1>
                <div id="garden-select">
                    <p>
                        Drag and drop your plants and objects from the drop downs on the left to build your garden. 
                        Click next to see your garden in a different season, age, and view, or you can save your garden project here.
                    </p>
                    <PlantSelection plants={this.props.existingPlants} objectAdded={this.plantAdded} trigger="Existing plants"/>  
                    <PlantSelection plants={this.props.recommendedPlants} objectAdded={this.plantAdded} trigger="Recommended plants"/>  
                    <div className="plant-category">
                        <Collapsible trigger="Objects">
                            {ItemList.map((name)=> {
                                return <ItemSelection object={name} objectAdded={this.itemAdded}/>
                            })}
                        </Collapsible>
                    </div>

                </div>

                <div id="garden-box" style={{height: '600px', width: '500px', position: 'absolute', left: "300px"}}>
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
            <Draggable onDrag={this.handleDrag} bounds={bounds} defaultPosition={{x: this.props.gardenObject.x, y: this.props.gardenObject.y}} {...dragHandlers}>
                <div className="garden-obj">
                    <img src={this.state.gardenObject.image}></img>
                    <p>{this.state.gardenObject.x}, {this.state.gardenObject.y}</p>
                    <p>{this.state.gardenObject.name}</p>
                </div>
            </Draggable>
        )
    }
}

const ItemSelection = (props: {object: string, objectAdded(name: string): any}) => {
    return <div className="plant-info">
        
        <button onClick={() => props.objectAdded(props.object)}>+</button>
        {props.object}
    </div>;
}

const PlantSelection = (props:{plants: Plant[], objectAdded(plant:Plant):any, trigger: string}) => {
    return(
    <div className="plant-category">
        <Collapsible trigger={props.trigger}>
            {props.plants.map((obj:Plant) => {return <PlantDisplay plant={obj} handleClick={props.objectAdded} />})}
        </Collapsible>
    </div> 
    )
}

export default withRouter(Build);