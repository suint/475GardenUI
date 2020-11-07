import { findAllByAltText } from "@testing-library/react";
import React from "react";
import { Link, withRouter } from "react-router-dom";
import placeholder from "./img/reference pictures/Screen Shot 2020-10-18 at 10.24.02 PM.png"
import './select.css';
import Hover from "react-hover";

// const data: Array<PlantProps> = [
//     {name: "Daisy", id: 1},
//     {name: "Rose", id: 2},
//     {name: "Sunflower", id: 3},
//     {name: "Dandelion", id: 4},
//     {name: "Iris", id: 5},
//     {name: "Tulip", id: 6},
//     {name: "Hydrangea", id: 7},
// ]

type PlantProps = {
    name: string,
    id: number
};

type boxState = {
    plants: Array<Plant>,
    searchPlants: Array<Plant>,
    selectedPlants: Array<Plant>,
  };

const Select = () => {
    return (
        <PlantBox />
    )
}


  
// at some later point, we will need to lift the state here (and all other components) into app.tsx
class PlantBox extends React.Component<{}, boxState> {
    constructor(props: any) {
        super(props);
        this.handleEvent = this.handleEvent.bind(this);
        this.state = {
        plants: [],
        searchPlants: [],
        selectedPlants: [],
        };
    }

    handleEvent = (clickedPlant: Plant) => {
        const { searchPlants, selectedPlants } = this.state;
        // checks if clicked plant is in search plants
        const isInSearchResults = searchPlants.some(result => result.id === clickedPlant.id);

        this.setState({
            // check which list clicked plant starts in and remove if it's in that one, add if it's not
            searchPlants: isInSearchResults ? searchPlants.filter(i => i.id  !== clickedPlant.id) : [...searchPlants, clickedPlant],
            selectedPlants: isInSearchResults ? [...selectedPlants, clickedPlant] : selectedPlants.filter(i => i.id !== clickedPlant.id)
        });
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
        
        fetch(url)
        .then(result => result.json())
        .then(
            (result) => {
            this.setState({plants: result});
            console.log(result);
            },
            (error) => {
            }
        )
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

            {/* <img src={placeholder} style={{ width: "600px" }} /> */}
        </div>
        )
    }   
}

const PlantList = (props: {plants: Array<Plant>, handleClick(plant: Plant): any}) => {
    return (
    <ul className="plant-list">
    {props.plants.map((item) => 
        <PlantDisplay plant={item} handleClick={props.handleClick} />
    )}
    </ul>)
}

type SearchProps = {
    onSearch: () => void,
}
class Search extends React.Component<SearchProps, {}> {
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div id="search">
                <label>Begin typing to search</label><input onChange={this.props.onSearch} id="search-input" type="text"></input>
            </div>
        )
    }
}

interface PlantDisProps {
    plant: Plant,
    handleClick(plant: Plant): any, 
}
class PlantDisplay extends React.Component<PlantDisProps, {}> {
    render(){
        const { handleClick, plant } = this.props;
        return <li onClick={() => handleClick(plant)}> {plant.latinName} </li>;
    }
}
  

export default withRouter(Select);