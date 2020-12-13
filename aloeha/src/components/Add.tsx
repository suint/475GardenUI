import React from "react";
import Collapsible from "react-collapsible";
import { Link, withRouter } from "react-router-dom";
import './add.css'
import { PlantInfo } from "./Select"
import placeholder from "./img/reference pictures/Screen Shot 2020-10-18 at 10.26.45 PM.png"

type AddProps = {
    plants: Plant[]
}

function Add(props: any) {
    return (
        <div id="add">
            <h1>Add plants</h1>
            <div id="suggested-plants" className="plants">
                <p>
                    Please select the plants you'd like to have in your garden. 
                    Selecting plants from each category will give you the best chance for a thriving garden 
                    because each category of plants requires a different amount of sunlight. 
                    <br /> Once you have selected your plants, click "Next" to start building your garden!
                </p>
                <PlantSelect plants={props.plants} />
            </div>
            <div id="garden-plants" className="plants">

            </div>
            <img src={placeholder} style={{ width: "600px" }} />
            <Link className="nav-link" to="/preview">
                Back
            </Link>
        </div>
    )
}

class PlantSelect extends React.Component<{plants: Plant[]}, {}> {

    constructor(props: {plants: Plant[]}) { 
        super(props);
    }
    render() {
        return (
            <div>
                <div className="plant-category">
                    <Collapsible trigger="Plants and Shrubs" >
                        {this.props.plants.map((obj) => {return <PlantDisplay plant={obj} handleClick={() => {}} />})}
                    </Collapsible>
                </div> 
                <div className="plant-category">
                    <Collapsible trigger="Small Trees" >
                        {this.props.plants.map((obj) => {return <PlantDisplay plant={obj} handleClick={() => {}} />})}
                    </Collapsible>
                </div>
                <div className="plant-category">
                    <Collapsible trigger="Medium-Sized Trees" >
                        {this.props.plants.map((obj) => {return <PlantDisplay plant={obj} handleClick={() => {}} />})}
                    </Collapsible>
                </div>
                <div className="plant-category">
                    <Collapsible trigger="Largest Trees" >
                        {this.props.plants.map((obj) => {return <PlantDisplay plant={obj} handleClick={() => {}} />})}
                    </Collapsible>
                </div>
            </div>
        )
    }
} 


export const PlantDisplay = (props: {plant: Plant, handleClick(plant: Plant):any}) => {
    return (
        <div className="plant-info">
            <button onClick={() => props.handleClick(props.plant)}>Add plant</button>
            <Collapsible trigger={props.plant.latinName}>
                <PlantInfo plant={props.plant} />
                {/* TODO: straighten out this whole thing with the plant info display... this way it gets cut off :( */}
            </Collapsible>
        </div>
    )
}

export default withRouter(Add);