import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navbar, Select, Start } from "./components";
import './App.css';

//https://jsfiddle.net/vbwe1s44/ example 

// replace later with api lookup

export const App = () => {
  return (
    <div className="App">
    <Router>
      <Switch>
        <Route path="/" exact component={() => <Start />} />
        <Route path="/Select" exact component={() => <Select />} />
      </Switch>
      <Navbar />
    </Router>
    </div>
  );
}

export default App;