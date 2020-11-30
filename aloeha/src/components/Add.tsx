import React from "react";
import Collapsible from "react-collapsible";
import { Link, withRouter } from "react-router-dom";
import './add.css'
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
                <Collapsible className="plant-category" trigger="Plant" >
                    {this.props.plants.map((obj) => {return <PlantDisplay plant={obj} />})}
                </Collapsible>
            </div>
        )
    }
} 


const PlantDisplay = (props: {plant: Plant}) => {
    return (
        <Collapsible className="plant-info" trigger={props.plant.latinName}>
            <img src="https://i.imgur.com/DYxP8xq.jpeg" />
        </Collapsible>
    )
}

export default withRouter(Add);