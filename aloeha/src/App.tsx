import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navbar, Select, Start, Design, Questionnaire, Preview } from "./components";
import './App.css';

//https://jsfiddle.net/vbwe1s44/ example 

// replace later with api lookup

export const App = () => {
  return (
    <div className="App">
    <Router>
      <Switch>
        <Route path="/" exact component={() => <Start />} />
        <Route path="/select" exact component={() => <Select />} />
        <Route path="/design" exact component={() => <Design />} />
        <Route path="/questionnaire" exact component={() => <Questionnaire />} />
        <Route path="/preview" exact component={() => <Preview />} />
      </Switch>
      <Navbar />
    </Router>
    </div>
  );
}

export default App;