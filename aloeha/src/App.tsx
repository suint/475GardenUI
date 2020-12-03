import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navbar, Select, Start, Design, Questionnaire, Preview, Build} from "./components";
import './App.css';
import _ from "lodash";

//https://jsfiddle.net/vbwe1s44/ example 

// replace later with api lookup

type UserState = {
  newUser: User,
  existingPlants: Plant[],
  gardenObjects: GardenObject[],
  currentKey: number
};

export class App extends React.Component<{}, UserState>{
  constructor(props: any) {
    super(props);

    this.state = {
      newUser: {
        name: '',
        length: 0,
        width: 0,
        plotItems: [],
        moisture: '',
        soil: '',
        sunlight: '',
        seasonsWanted: [],
        colorsWanted: []
      },
      existingPlants: [],
      gardenObjects: [],
      currentKey: 0
    }
    this.handleCheckBox = this.handleCheckBox.bind(this);
    this.handleCBSeasons = this.handleCBSeasons.bind(this);
    this.handleCBColors = this.handleCBColors.bind(this);
    this.handleNumInput = this.handleNumInput.bind(this);
    this.handleStringInput = this.handleStringInput.bind(this);
    this.handleExistingPlantSelect = this.handleExistingPlantSelect.bind(this);

  }

  addGardenObject(objectName: string, imageSrc: string) {
    const { currentKey, gardenObjects } = this.state;
    const newObject: GardenObject = {
      x: 0,
      y: 0,
      image: imageSrc,
      name: objectName,
      key: currentKey+1,
    }
    this.setState(
      { 
        currentKey: currentKey + 1,
        gardenObjects: [...gardenObjects, newObject]
      }
    );
  }

  moveGardenObject(deltaX: number, deltaY: number, key: number) {
    const { gardenObjects } = this.state;
    // const updatedObjects = gardenObjects.map((object) => {
    //   if(object.key == key) {
    //     const newObject = object;
    //     newObject.x += deltaX;
    //     newObject.y += deltaY;
    //   } else {
    //     return object;
    //   }
    // });
    const objKey = gardenObjects.findIndex((element => element.key == key));
    gardenObjects[objKey].x += deltaX;
    gardenObjects[objKey].y += deltaY;
    this.setState({
      gardenObjects: gardenObjects
    })
  }

  handleNumInput( value: number, name: string) {
    const { newUser } = this.state
    const updateUser = {...newUser, [name]: value}
    this.setState({newUser: updateUser})

    console.log(this.state);
  }

  handleStringInput( value: string, name: string) {
    const { newUser } = this.state
    const updateUser = {...newUser, [name]: value}
    this.setState({newUser: updateUser})
    console.log(this.state);

  }

  handleCheckBox(e: string[]) {
    const { newUser } = this.state
    const updateUser = {...newUser, plotItems: e}
    this.setState({newUser: updateUser})
    console.log(this.state);
    
  }

  handleCBSeasons(e: string[]) {

    const { newUser } = this.state;
    const updateUser = {...newUser, seasonsWanted: e};
    this.setState({newUser: updateUser});
    console.log(this.state);
    
  }

  handleCBColors(e: string[]) {
    const { newUser } = this.state;
    const updateUser = {...newUser, colorsWanted: e};
    this.setState({newUser: updateUser});
    console.log(this.state);
  }

  handleExistingPlantSelect(e: Plant[]) {
    this.setState({existingPlants: e});
    console.log(this.state);
  }

  render() {

    return (
      <div className="App">
        <Router>
              <Navbar />
          <Switch>
              <Route path="/" exact render={() => <Start />} />
              <Route path="/select" exact render={() => <Select
                                                                      onPlantSelect={this.handleExistingPlantSelect} 
                                                                      existingPlants={this.state.existingPlants}/>} />
              <Route path="/design" exact render={() => <Design />} />
              <Route path="/questionnaire" exact render={() => <Questionnaire
                                                                      newUser={this.state.newUser}
                                                                      onInputNumChange={this.handleNumInput}
                                                                      onInputStringChange={this.handleStringInput}
                                                                      onCheckBoxChange={this.handleCheckBox}
                                                                      onCBSeasonsChange={this.handleCBSeasons}
                                                                      onCBColorsChange={this.handleCBColors} />} />
              <Route path="/preview" exact render={() => <Preview />} />
              <Route path="/build" exact render={() => <Build 
                                                                      objectAdded={this.addGardenObject}
                                                                      objectDragged={this.moveGardenObject} 
                                                                      gardenObjects={this.state.gardenObjects}/>} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;