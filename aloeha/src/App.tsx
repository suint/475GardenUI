import React from 'react';
import logo from './logo.svg';
import './App.css';

const data = {
  plants: [
    {name: "Daisy", id: 1},
    {name: "Rose", id: 2}
  ]
}

type PlantProps = { //idk what their actual props are
  name: string,
  id: number
};

let selectedPlants: Array<PlantProps> = [];

export const App = () => {
  return (
    <div className="App">
      <PlantLookup />
      <SelectedPlants />
    </div>
  );
}

class SelectedPlants extends React.Component {
  render() {
    return (<p>Hi</p>)
  }
}

class PlantLookup extends React.Component<{}, {plants: Array<PlantProps>}>  {
  constructor(props: Array<PlantProps>) {
    super(props);
    this.state = {plants: data.plants}
  }

  render() {
    return (
      <ul>
        {this.state.plants.map((item, key) => {
          return <Plant name={item.name} id={item.id} />
        })}
      </ul>
    );
  }
}

const Plant = (props: PlantProps) => {
  return (
    <li onClick={() => updateSelected(props.name, props.id)}>{props.name}: {props.id}</li>
  )
}

function updateSelected(plantName: string, plantId: number) {
  selectedPlants.push({name: plantName, id: plantId});
}

export default App;