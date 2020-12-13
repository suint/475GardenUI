import React from "react";
import Collapsible from "react-collapsible";
import { Link, withRouter } from "react-router-dom";
import './add.css';
import { PlantInfo } from "./Select";
import _ from 'lodash';
import { usePromiseTracker, trackPromise } from "react-promise-tracker";

type AddProps = {
    user: User,
    gardenObjects: GardenObject,
    handleRecommendedPlantSelect: () => void
}

type AddState = {
    recommendedPlants: Plant[],
    selectedPlants: Plant[],
    user: User
}

let nativePlants: Plant[] = [];
class Add extends React.Component <any, AddState> {
    constructor(props: any) {
        super(props);
        this.state = {
            recommendedPlants: [],
            selectedPlants: this.props.recommendedPlants.concat(this.props.existingPlants), // all plants that have already been picked
            user: this.props.user
        }
        this.checkPlant = this.checkPlant.bind(this);
        this.handleEvent = this.handleEvent.bind(this);
    }

    handleEvent = (clickedPlant: Plant) => {
        const { recommendedPlants, selectedPlants } = this.state;
        // checks if clicked plant is in search plants
        const isInSearchResults = recommendedPlants.some(result => result.id === clickedPlant.id);
        const newRecommendedPlants = isInSearchResults ? recommendedPlants.filter(i => i.id  !== clickedPlant.id) : [...recommendedPlants, clickedPlant];
        const newSelectedPlants = isInSearchResults ? [...selectedPlants, clickedPlant] : selectedPlants.filter(i => i.id !== clickedPlant.id);

        this.setState({
            // check which list clicked plant starts in and remove if it's in that one, add if it's not
            recommendedPlants: newRecommendedPlants,
            selectedPlants: newSelectedPlants
        })
        this.props.onPlantSelect(newSelectedPlants);
    }

    componentDidMount = () => {
        // retrieve list of native plants from database
        const url = "http://localhost:8080/plants/list/";
        
        trackPromise(fetch(url)
        .then(result => result.json())
        .then(
            (result) => {
                nativePlants = result.filter((obj: Plant) => obj.delawareNative);
                // filters native plants based on questionnaire answers
                let recPlants = nativePlants.filter((plant: Plant) => {return this.checkPlant(plant)});
                this.setState({recommendedPlants: this.state.recommendedPlants.concat(recPlants)});
                console.log(result);
            },
            (error) => {
            }
            ));
            

    }

    // returns true if a sunlight level name is equivalent to a percentage
    checkLight = (sunStr: string, percentage: number) => {
        let equal = false;
        if (sunStr == "Full-sun" && percentage >= 0.9 && percentage <= 1.0) {
                equal = true;
        }
        if (sunStr == "Partial-shade" && percentage > 0.5 && percentage < 0.9) {
                equal = true;
        }
        if (sunStr == "Partial-sun" && percentage >= 0.3 && percentage <= 0.5) {
                equal = true;
        }
        if (sunStr == "Full-shade" && percentage >= 0 && percentage < 0.3) {
                equal = true;
        }
        // percentage == -1 means plant has no light value
        if (sunStr == "My plot has different levels" || percentage == -1) {
            equal = true;
        }
        return equal;
    }

    // returns true if bloom times overlap with one of the desired seasons
    checkSeasons = (bloomTime: boolean[], seasonsWanted: String[]) => {
        if (seasonsWanted.includes("Year Round")) {
            return true;
        }
        // winter is dec, jan, feb; spring is mar, apr, may; summer is june, july, aug; 
        // fall is sept, oct, nov (meterological seasons)
        for (var a=1; a<13; a++) {
            if (a == 1 || a == 2 || a == 12) {
                if (seasonsWanted.includes("Winter")) {
                    return true;
                }
            } else if (a == 3 || a == 4 || a == 5) {
                if (seasonsWanted.includes("Spring")) {
                    return true;
                }
            } else if (a == 6 || a == 7 || a == 8) {
                if (seasonsWanted.includes("Summer")) {
                    return true;
                }
            } else if (a == 9 || a == 10 || a == 11) {
                if (seasonsWanted.includes("Fall")) {
                    return true;
                }
            }
        }
        return false;
    }

    // return true if plant flower color is one of the colors wanted
    checkColors = (plant: Plant, colors: string[]) => {
        const { description } = plant;
        if (description && !_.isEmpty(colors)) {
            var regex = /Flower Color: ([a-zA-Z]+)/g;
            let bloomColor = regex.exec(description);
            if (bloomColor) {
                for (const color of colors) {
                    // using includes instead of equals since some colors are like "greenish" or "light red"
                    // which should match "green" or "red"
                    if (bloomColor[0].toLowerCase().includes(color.toLowerCase())) {
                        return true;
                    }
                }
                return false;
            }
        }
        return true; // if no bloom color is mentioned, it probably doesn't bloom, so just return true
    }

    // check plant matches user garden conditions and desired blooming seasons/colors
    checkPlant = (plant: Plant) => {
        const {moisture, sunlight, soil, colorsWanted, seasonsWanted} = this.state.user;
        const plantLight = plant.light ? plant.light : -1;
        let fits = true;

        // check plant growing conditions fit the garden (moisture level, sunlight levels, soil type)
        if (plant.moisture == moisture.toUpperCase() || !plant.moisture || !moisture || plant.moisture == "ANY") {
            console.log("moisture OK");
        } else {
            fits = false;
        }
        if (this.checkLight(sunlight, plantLight)) {
            console.log("light OK");
        } else {
            fits = false;
        }
        if (plant.soilType == soil.toUpperCase() || !soil || !plant.soilType || plant.soilType == "ANY" || soil == "Any Soil") {
            console.log("soil OK");
        } else {
            fits = false;
        }
        //check it blooms during one of the desired seasons
        if (!plant.bloomTime || _.isEmpty(seasonsWanted) || seasonsWanted.includes("Year Round") || this.checkSeasons(plant.bloomTime, seasonsWanted)){
            console.log("bloom time OK");
        } else {
            fits = false;
        }
        // avoid duplicates with selected plants 
        if (!this.state.selectedPlants.some((selPlant: Plant) => {return selPlant.id == plant.id})) {
            console.log("no duplicates");
        } else {
            fits = false;
        }
        // blooms are one of the desired colors 
        if (!colorsWanted || this.checkColors(plant, colorsWanted)) {
            console.log("colors OK");
        } else {
            fits = false;
        }
        return fits;
    }

    render() {
        return (
            <div id="add">
                <h1>Add plants</h1>
                <div id="suggested-plants" className="plants">
                    <p>
                        Please select plants you would like to have in your garden from the recommendations below. 
                        Selecting plants from each category will give you the best chance for a thriving garden 
                        because each category of plants requires a different amount of sunlight. 
                        <br /> Once you have selected your plants, click "Next" to start building your garden!
                    </p>
                    <PlantSelect handleClick={this.handleEvent} plants={this.state.recommendedPlants} />
                </div>
                <div id="garden-plants" className="plants">
                    {this.state.selectedPlants.map((obj) => {return <PlantDisplay handleClick={this.handleEvent} plant={obj} />})}
                </div>
            </div>
        )
    }
}

const PlantSelect = (props: {plants: Plant[], handleClick(plant: Plant): any}) => {
    
    const { promiseInProgress } = usePromiseTracker();
    let shrubs = props.plants.filter((plant: Plant) => { return plant.canopy == "FLOOR" });
    let smallTrees = props.plants.filter((plant: Plant) => { return plant.canopy == "UNDERSTORY" });
    let medTrees = props.plants.filter((plant: Plant) => { return plant.canopy == "CANOPY" });
    let lgstTrees = props.plants.filter((plant: Plant) => { return plant.canopy == "EMERGENT" });
    if ( promiseInProgress ) {
        return <p>Loading recommendations...</p>;
    } else {
        return (
            <div>
                <div className="plant-category">
                    <Collapsible trigger="Plants and Shrubs" >
                        {shrubs.map((obj) => {return <PlantDisplay handleClick={props.handleClick} plant={obj} />})}
                    </Collapsible>
                </div> 
                <div className="plant-category">
                    <Collapsible trigger="Small Trees" >
                        {this.props.plants.map((obj) => {return <PlantDisplay plant={obj} onClick={() => {}} />})}
                    </Collapsible>
                </div>
                <div className="plant-category">
                    <Collapsible trigger="Medium-Sized Trees" >
                        {medTrees.map((obj) => {return <PlantDisplay handleClick={props.handleClick} plant={obj} />})}
                    </Collapsible>
                </div>
                <div className="plant-category">
                    <Collapsible trigger="Largest Trees" >
                        {lgstTrees.map((obj) => {return <PlantDisplay handleClick={props.handleClick} plant={obj} />})}
                    </Collapsible>
                </div>
            </div>
        )
    }
}

const PlantDisplay = (props: {plant: Plant, handleClick(plant: Plant): any}) => {
    return (
        <div className="plant-info">
            <button onClick={() => props.handleClick(props.plant)}>+</button>
            <Collapsible trigger={props.plant.latinName}>
                <PlantInfo plant={props.plant} />
                {/* TODO: straighten out this whole thing with the plant info display... this way it gets cut off :( */}
            </Collapsible>
        </div>
    )
}

export default withRouter(Add);