import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navbar, Select, Start, Design, Questionnaire, Preview, Build} from "./components";
import './App.css';

//https://jsfiddle.net/vbwe1s44/ example 

// replace later with api lookup

type UserState = {

  newUser: User

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
      }
    }
    this.handleCheckBox = this.handleCheckBox.bind(this);
    this.handleCBSeasons = this.handleCBSeasons.bind(this);
    this.handleCBColors = this.handleCBColors.bind(this);
    this.handleNumInput = this.handleNumInput.bind(this);
    this.handleStringInput = this.handleStringInput.bind(this);

  }

// make 2 hnadle inputs : 1 for number and 1 for 
  handleNumInput( value: number, name: string) {
    const { newUser } = this.state
    const updateUser = {...newUser, [name]: value}
    this.setState({newUser: updateUser})

  }

  handleStringInput( value: string, name: string) {
    const { newUser } = this.state
    const updateUser = {...newUser, [name]: value}
    this.setState({newUser: updateUser})

  }

  handleCheckBox(e: string[]) {
    const { newUser } = this.state
    const updateUser = {...newUser, plotItems: e}
    this.setState({newUser: updateUser})
    
  }

  handleCBSeasons(e: string[]) {

    const { newUser } = this.state
    const updateUser = {...newUser, seasonsWanted: e}
    this.setState({newUser: updateUser})
    
  }

  handleCBColors(e: string[]) {
    const { newUser } = this.state
    const updateUser = {...newUser, colorsWanted: e}
    this.setState({newUser: updateUser})
  }


  render() {

    return (
      <div className="App">
        <Router>
          <Switch>
              <Route path="/" exact component={() => <Start />} />
              <Route path="/select" exact component={() => <Select />} />
              <Route path="/design" exact component={() => <Design />} />
              <Route path="/questionnaire" exact component={() => <Questionnaire
                                                                      newUser={this.state.newUser}
                                                                      onInputNumChange={this.handleNumInput}
                                                                      onInputStringChange={this.handleStringInput}
                                                                      onCheckBoxChange={this.handleCheckBox}
                                                                      onCBSeasonsChange={this.handleCBSeasons}
                                                                      onCBColorsChange={this.handleCBColors} />} />
              <Route path="/preview" exact component={() => <Preview />} />
              <Route path="/build" exact component={() => <Build />} />
          </Switch>
          <Navbar />
        </Router>
      </div>
    );
  }
}

export default App;