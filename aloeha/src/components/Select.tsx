import { findAllByAltText } from "@testing-library/react";
import React from "react";
import { Link, withRouter } from "react-router-dom";
import placeholder from "./img/reference pictures/Screen Shot 2020-10-18 at 10.24.02 PM.png"
import './select.css';
import ReactHover, { Trigger, Hover } from "react-hover";
import { usePromiseTracker, trackPromise } from "react-promise-tracker";

// const Select = (props: boxProps) => {
//     return (
//         <PlantBox onPlantSelect={props.onPlantSelect}  />
//         )
//     }

type boxState = {
    plants: Plant[],
    searchPlants: Plant[],
    selectedPlants: Plant[],
};
type boxProps = {
    onPlantSelect: (e: Plant[]) => void,
    existingPlants: Plant[]
};
  
// at some later point, we will need to lift the state here (and all other components) into app.tsx
class Select extends React.Component<any, boxState> {
    constructor(props: any) { // TODO: fix "any" props
        super(props);
        this.handleEvent = this.handleEvent.bind(this);
        this.state = {
            plants: [],
            searchPlants: [],
            selectedPlants: [... props.existingPlants],
        };
    }

    handleEvent = (clickedPlant: Plant) => {
        const { searchPlants, selectedPlants } = this.state;
        // checks if clicked plant is in search plants
        const isInSearchResults = searchPlants.some(result => result.id === clickedPlant.id);
        const newSearchPlants = isInSearchResults ? searchPlants.filter(i => i.id  !== clickedPlant.id) : [...searchPlants, clickedPlant];
        const newSelectedPlants = isInSearchResults ? [...selectedPlants, clickedPlant] : selectedPlants.filter(i => i.id !== clickedPlant.id);

        this.setState({
            // check which list clicked plant starts in and remove if it's in that one, add if it's not
            searchPlants: newSearchPlants,
            selectedPlants: newSelectedPlants
        })
        this.props.onPlantSelect(newSelectedPlants);
}
    handleSearch = () => {
        let input = document.getElementById("search-input") as HTMLInputElement;
        if (input.value) {
            let searchText = input.value;
            // TODO: search should search latin name + common names
            this.setState({searchPlants: this.state.plants.filter((plant) => plant.latinName.toLowerCase().includes(searchText.toLowerCase()))});
        } else {
            this.setState({searchPlants: this.state.plants});
        }
    }

    componentDidMount() {
        //when backend is fixed switch to this
        const url = "http://localhost:8080/plants/list/";
        
        trackPromise(fetch(url)
        .then(result => result.json())
        .then(
            (result) => {
            this.setState({plants: result});
            console.log(result);
            },
            (error) => {
            }
        ));
    }
    
render() {
    return (
        <div id="plantbox">
            <h1>Plant Select</h1>
            <div id="search-plants" className="plants">
                <p>Search for plants which already grow in your garden.</p>
                <p>Once you have found your plant, click on its name to add it to your list. To remove a plant from your list, simply click it again.</p>
                <Search onSearch={this.handleSearch} />
                <PlantList handleClick={this.handleEvent} plants={this.state.searchPlants} />
            </div>
            <div id="selected-plants" className="plants">
                <PlantList handleClick={this.handleEvent} plants={this.state.selectedPlants} />
            </div>
        <div className="row">

          <div className="col-md-12">

            <Link className="nav-link" to="/">
              Back
            </Link>
            <Link className="nav-link" to="/questionnaire">
              Next
            </Link>

          </div>

        </div>
        </div>
        )
    }   
}

const PlantList = (props: {plants: Array<Plant>, handleClick(plant: Plant): any}) => {
    const { promiseInProgress } = usePromiseTracker();
    if (promiseInProgress) {
        return <p>Plant information loading...</p>
    } else {
        return (
        <ul className="plant-list">
        {props.plants.map((item) => 
            <PlantDisplay plant={item} handleClick={props.handleClick} key={item.id} />
        )}
        </ul>)
    }
}

type SearchProps = {
    onSearch: () => void
};

const Search = (props: SearchProps) => {
    return (
        <div id="search">
            <label>Begin typing to search</label><input onChange={props.onSearch} id="search-input" type="text"></input>
        </div>
    )
}

interface PlantDisProps {
    plant: Plant,
    handleClick(plant: Plant): any, 
}
const optionsCursorTrueWithMargin = {
    followCursor:true,
    shiftX:20,
    shiftY:0
}

const PlantDisplay = (props: PlantDisProps) => {
    const { handleClick, plant } = props;
    return <ReactHover options={optionsCursorTrueWithMargin}>
        <Trigger>
            <li onClick={() => handleClick(plant)}> {plant.latinName} </li>
        </Trigger>
        <Hover>
                <PlantInfo plant={plant} />
        </Hover>
    </ReactHover>
}
  
// TODO: add images and bloom time
export const PlantInfo = (props: {plant: Plant}) => {
    const { plant } = props;
    return (<div className="plant-hover">
        <h3>{plant.latinName}</h3>
                {plant.commonNames && <p>Also known as: {plant.commonNames.map((name) => {return name + "\n"})}</p>}
                {plant.invasive && <span className="plant-badge yellow">invasive </span>}
                {plant.delawareNative && <span className="plant-badge pink">native</span>}
                {plant.light >= 0 && <span className="plant-badge white">light: {plant.light}</span>}
                {plant.canopy > 0 && <span className="plant-badge green">canopy: {plant.canopy}</span>}
                {plant.moisture && <span className="plant-badge blue">{plant.moisture}</span>}
                {plant.soilType && <span className="plant-badge brown">{plant.soilType}</span>}
                {/* {plant.bloomTime && <BloomTime times={plant.bloomTime} />} */}
                {plant.description && <span> <h5>{plant.description}</h5></span>}
        </div>)
}

export const BloomTime = (props: {times: boolean[]}) => {
    const { times } = props;
    return (
        <div className="bloom-times">
            {times.map((month: boolean) => month ? <span className="bloom-yes" /> : <span className="bloom-no" />)}
        </div>
    )
}

export default withRouter(Select);