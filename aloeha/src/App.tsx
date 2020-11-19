import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navbar, Select, Start, Design, Questionnaire, Preview, Build} from "./components";
import './App.css';

//https://jsfiddle.net/vbwe1s44/ example 

// replace later with api lookup

type UserState = {
  newUser: User,
  existingPlants: Plant[]
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
      existingPlants: []
    }
    this.handleCheckBox = this.handleCheckBox.bind(this);
    this.handleCBSeasons = this.handleCBSeasons.bind(this);
    this.handleCBColors = this.handleCBColors.bind(this);
    this.handleNumInput = this.handleNumInput.bind(this);
    this.handleStringInput = this.handleStringInput.bind(this);
    this.handleExistingPlantSelect = this.handleExistingPlantSelect.bind(this);

  }

// make 2 hnadle inputs : 1 for number and 1 for 
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
          <Switch>
              <Route path="/" exact render={() => <Start />} />
              <Route path="/select" exact render={() => <Select
                                                                      onPlantSelect={this.handleExistingPlantSelect} />} />
              <Route path="/design" exact render={() => <Design />} />
              <Route path="/questionnaire" exact render={() => <Questionnaire
                                                                      newUser={this.state.newUser}
                                                                      onInputNumChange={this.handleNumInput}
                                                                      onInputStringChange={this.handleStringInput}
                                                                      onCheckBoxChange={this.handleCheckBox}
                                                                      onCBSeasonsChange={this.handleCBSeasons}
                                                                      onCBColorsChange={this.handleCBColors} />} />
              <Route path="/preview" exact render={() => <Preview />} />
              <Route path="/build" exact render={() => <Build />} />
          </Switch>
          <Navbar />
        </Router>
      </div>
    );
  }
}

export default App;