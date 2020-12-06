import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import placeholder from "./img/reference pictures/Screen Shot 2020-10-18 at 10.26.28 PM.png"
import Input from "./formTemplates/Input";
import CheckBox from "./formTemplates/CheckBox";
import Select from "./formTemplates/Select";
import Button from "./formTemplates/Button";

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newUser: {
        name: '',
        length: '',
        width: '',
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
    this.handleInput = this.handleNumInput.bind(this);
  }


  handleInput(value,name) {
    this.setState(prevState => ({
      newUser:
      {
        ...prevState.newUser, [name]: value
      }
    }), () => console.log(this.state.newUser))
  }


  handleCheckBox(e) {
    this.setState(prevState => ({
      newUser:
        { ...prevState.newUser, plotItems: e }
    })
    )
  }


  handleCBSeasons(e) {
    this.setState(prevState => ({
      newUser:
        { ...prevState.newUser, seasonsWanted: e }
    })
    )
  }

  handleCBColors(e) {
    this.setState(prevState => ({
      newUser:
        { ...prevState.newUser, colorsWanted: e }
    })
    )
  }




}
