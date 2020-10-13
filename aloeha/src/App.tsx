import React from 'react';
import logo from './logo.svg';
import './App.css';

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
      <PlantBox searchData={searchPlants} selected={selectedPlants} />
    </div>
  );
}

type boxState = {
  allPlants: Array<PlantProps>,
  selectedPlants: Array<PlantProps>
}

type listProps = {
  searchData: Array<PlantProps>, 
  selected: Array<PlantProps>
}

class PlantBox extends React.Component<listProps, boxState> {
  constructor(props: listProps) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      allPlants: props.searchData,
      selectedPlants: props.selected
    };
  }

  handleChange() {
    this.setState({
      allPlants: this.props.searchData,
      selectedPlants: this.props.selected
    });
  }

  render() {
    return (
      <div className="plantbox">
        <PlantList onClick={updateSelected} plants={this.state.allPlants} />
        <PlantList onClick={unSelect} plants={this.state.selectedPlants} />
      </div>
    )
  }

  // figure out how to lift state up idk read tutorial
}

const PlantList = (props: {plants: Array<PlantProps>, onClick(plant: PlantProps): any}) => {
    return (
      <ul>
      {props.plants.map((item) => 
        <Plant plant={item} onClick={props.onClick} />
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

const Plant = (props: {plant: PlantProps, onClick(plant: PlantProps): any}) => {
  return (
    <li onClick={() => props.onClick(props.plant)}> {props.plant.name}: {props.plant.id}</li>
  )
}

function updateSelected(plant: PlantProps) {
  selectedPlants.push({name: plant.name, id: plant.id});
  searchPlants.splice(searchPlants.indexOf({name: plant.name, id: plant.id}), 1);
}

function unSelect(plant: PlantProps) {
  searchPlants.push({name: plant.name, id: plant.id});
  selectedPlants.splice(searchPlants.indexOf({name: plant.name, id: plant.id}), 1);
}

export default App;