import React from 'react';
import logo from './logo.svg';
import './App.css';

//https://jsfiddle.net/vbwe1s44/ example 

const data: Array<PlantProps> = [
  {name: "Daisy", id: 1},
  {name: "Rose", id: 2}
]

type PlantProps = { //idk what their actual props are
  name: string,
  id: number
};

let searchPlants: Array<PlantProps> = data;
let selectedPlants: Array<PlantProps> = [];

export const App = () => {
  return (
    <div className="App">
      <PlantBox />
    </div>
  );
}

type boxState = {
  searchPlants: Array<PlantProps>,
  selectedPlants: Array<PlantProps>
}

type listProps = {
  searchData: Array<PlantProps>, 
  selected: Array<PlantProps>
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
      const isInSearchResults = searchPlants.some(result => result.id === clickedPlant.id);

      this.setState({
        searchPlants: isInSearchResults ? searchPlants.filter(i => i.id  !== clickedPlant.id) : [...searchPlants, clickedPlant],
        selectedPlants: isInSearchResults ? [...selectedPlants, clickedPlant] : selectedPlants.filter(i => i.id !== clickedPlant.id)
      });
  }


  componentDidMount() {
    this.showResults(data);
  }

  // handleChange() {
  //   this.setState({
  //     allPlants: this.props.allPlants,
  //     selectedPlants: this.props.selectedPlants
  //   });
  // }

  render() {
    return (
      <div className="plantbox">
        <div id="search-plants">
          <PlantList handleClick={this.handleEvent} plants={this.state.searchPlants} />
        </div>
        <div id="selected-plants">
          <PlantList handleClick={this.handleEvent} plants={this.state.selectedPlants} />
        </div>
      </div>
    )
  }

  // figure out how to lift state up idk read tutorial
}

const PlantList = (props: {plants: Array<PlantProps>, handleClick(plant: PlantProps): any}) => {
    return (
      <ul>
      {props.plants.map((item) => 
        <Plant plant={item} handleClick={props.handleClick} />
      )}
    </ul>)
}

// class PlantLookup extends React.Component<{}, {plants: Array<PlantProps>}>  {
//   constructor(props: Array<PlantProps>) {
//     super(props);
//     this.state = this.stateplants}
//   }

//   render() {
//     return (
//       <ul>
//         {this.state.plants.map((item, key) => {
//           return <Plant name={item.name} id={item.id} />
//         })}
//       </ul>
//     );
//   }
// }

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
// const Plant = (props: {plant: PlantProps, onClick(plant: PlantProps): any}) => {
//   return (
//     <li onClick={() => props.onClick(props.plant)}> {props.plant.name}: {props.plant.id}</li>
//   )
// }

function updateSelected(plant: PlantProps) {
  selectedPlants.push({name: plant.name, id: plant.id});
  searchPlants.splice(searchPlants.indexOf({name: plant.name, id: plant.id}), 1);
}

function unSelect(plant: PlantProps) {
  searchPlants.push({name: plant.name, id: plant.id});
  selectedPlants.splice(searchPlants.indexOf({name: plant.name, id: plant.id}), 1);
}

export default App;