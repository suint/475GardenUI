import React from "react";
import Collapsible from "react-collapsible";
import { Link, withRouter } from "react-router-dom";
import './add.css';
import { PlantInfo } from "./Select";
import { trackPromise } from "react-promise-tracker";

type AddProps = {
    plants: Plant[]
}

type AddState = {
    recommendedPlants: Plant[],
    selectedPlants: Plant[],
    user: User
}


class Add extends React.Component <any, AddState> {
    constructor(props: any) {
        super(props);
        this.state = {
            recommendedPlants: [],
            selectedPlants: [],
            user: this.props.user
        }
        this.recommendPlants = this.recommendPlants.bind(this);
    }

    componentDidMount = () => {
        // filters native plants based on questionnaire answers
        const { moisture, sunlight, soil, seasonsWanted, colorsWanted } = this.state.user;
        
        const url = "http://localhost:8080/plants/list/";
        
        let nativePlants: Plant[] = [];

        // retrieve list of native plants from database
        trackPromise(fetch(url)
        .then(result => result.json())
        .then(
            (result) => {
                nativePlants = result.filter((obj: Plant) => obj.delawareNative)
                console.log(result);
            },
            (error) => {
            }
        ));
        
        for (const plant of nativePlants) {
            let fits = false;
            
        }

    }

    // pass in name of param and user object and return corresponding numerical value 
    getUserParams = (param: string, user: User) => {
        switch (param){
            case "sunlight":
                break;
            case "moisture":
                break;
            case "soil":
                break;
        }
    }

    recommendPlants = (user: User) => {
        
    }

    render() {
        return (
            <div id="add">
                <h1>Add plants</h1>
                <div id="suggested-plants" className="plants">
                    <p>
                        Please select plants you'd like to have in your garden from the recommendations below. 
                        Selecting plants from each category will give you the best chance for a thriving garden 
                        because each category of plants requires a different amount of sunlight. 
                        <br /> Once you have selected your plants, click "Next" to start building your garden!
                    </p>
                    <PlantSelect plants={this.props.plants} />
                </div>
                <div id="garden-plants" className="plants">

                </div>
            </div>
        )
    }
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
                        {this.props.plants.map((obj) => {return <PlantDisplay plant={obj} />})}
                    </Collapsible>
                </div> 
                <div className="plant-category">
                    <Collapsible trigger="Small Trees" >
                        {this.props.plants.map((obj) => {return <PlantDisplay plant={obj} />})}
                    </Collapsible>
                </div>
                <div className="plant-category">
                    <Collapsible trigger="Medium-Sized Trees" >
                        {this.props.plants.map((obj) => {return <PlantDisplay plant={obj} />})}
                    </Collapsible>
                </div>
                <div className="plant-category">
                    <Collapsible trigger="Largest Trees" >
                        {this.props.plants.map((obj) => {return <PlantDisplay plant={obj} />})}
                    </Collapsible>
                </div>
            </div>
        )
    }
} 


const PlantDisplay = (props: {plant: Plant}) => {
    return (
        <div className="plant-info">
            <button>Add plant</button>
            <Collapsible trigger={props.plant.latinName}>
                <PlantInfo plant={props.plant} />
                {/* TODO: straighten out this whole thing with the plant info display... this way it gets cut off :( */}
            </Collapsible>
        </div>
    )
}

export default withRouter(Add);