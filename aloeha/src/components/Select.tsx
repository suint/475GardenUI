import React, {useState} from "react";
import { Link, withRouter } from "react-router-dom";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';


const data: Array<PlantProps> = [
    {name: "Daisy", id: 1},
    {name: "Rose", id: 2}
]
const plantsAndShrubsOptions = [
    'one', 'two'
  ];


const smTreesOptions = [
    'one', 'two'
  ];

const mdTreesOptions = [
    'one', 'two'
  ];

const lgTreesOptions = [
    'one', 'two'
  ];

type PlantProps = {
    name: string,
    id: number
};

let searchPlants: Array<PlantProps> = data;
let selectedPlants: Array<PlantProps> = [];

type boxState = {
    searchPlants: Array<PlantProps>,
    selectedPlants: Array<PlantProps>
}
  

const Select = () => {
    return (
        <PlantBox />
    )
}


  
class PlantBox extends React.Component<{}, boxState> {
    constructor(props: any) {
        super(props);
        this.handleEvent = this.handleEvent.bind(this);
        this.state = {
        searchPlants: [],
        selectedPlants: []
        };
    }

    showResults = (data: PlantProps[]) => {
        this.setState({
        searchPlants: data,
        selectedPlants: []
        })
    }

    handleEvent = (clickedPlant: PlantProps) => {
        const { searchPlants, selectedPlants } = this.state;
        // checks if clicked plant is in search plants
        const isInSearchResults = searchPlants.some(result => result.id === clickedPlant.id);

        this.setState({
            // check which list clicked plant startss in and remove if it's in that one, add if it's not
            searchPlants: isInSearchResults ? searchPlants.filter(i => i.id  !== clickedPlant.id) : [...searchPlants, clickedPlant],
            selectedPlants: isInSearchResults ? [...selectedPlants, clickedPlant] : selectedPlants.filter(i => i.id !== clickedPlant.id)
        });
}


componentDidMount() {
    this.showResults(data);
}
    
    


render() {
    return (
        <div className="plantbox">
            <h1>Plant Selection</h1>
            <div className="col-md-3"></div>
            <form className="container-fluid col-md-6">
                <p> Please select the plants you'd like to have in your Garden. Selecting plants from
                each category will give you the best chance for a thriving garden because each category
                of plants requires a different amount of sunlight. Once you have selected your
                plant, click 'Next' to start building your garden!
                </p>

                
                <Dropdown options={plantsAndShrubsOptions}  placeholder="Plants and Shrubs" /> <br></br>
                <Dropdown options={smTreesOptions}   placeholder="Small Trees" /> <br></br>
                <Dropdown options={mdTreesOptions}   placeholder="Medium-sized Trees" /> <br></br>
                <Dropdown options={lgTreesOptions}  placeholder="Large Trees" /> <br></br>
               
            
                <div id="search-plants">
                    <PlantList handleClick={this.handleEvent} plants={this.state.searchPlants} />
                </div>
                <div id="selected-plants">
                    <PlantList handleClick={this.handleEvent} plants={this.state.selectedPlants} />
                </div>
            </form>
            <div className="row">

          <div className="col-md-12">

            <Link className="nav-link" to="/home">
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

const PlantList = (props: {plants: Array<PlantProps>, handleClick(plant: PlantProps): any}) => {
    return (
    <ul>
    {props.plants.map((item) => 
        <Plant plant={item} handleClick={props.handleClick} />
    )}
    </ul>)
}

interface PlantDisProps {
    plant: PlantProps,
    handleClick(plant: PlantProps): any, 
}
class Plant extends React.Component<PlantDisProps, {}> {
    render(){
        const { handleClick, plant } = this.props;
        return <li onClick={() => handleClick(plant)}> {plant.name} </li>;
    }
}
  

export default withRouter(Select);