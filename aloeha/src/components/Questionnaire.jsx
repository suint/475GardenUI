import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import placeholder from "./img/reference pictures/Screen Shot 2020-10-18 at 10.26.28 PM.png"
import Input from "./formTemplates/Input";
import CheckBox from "./formTemplates/CheckBox";
import Select from "./formTemplates/Select";
import Button from "./formTemplates/Button";

class Questionnaire extends Component {
  constructor(props) {
    super(props);

    this.state = {
      
      plotItemOptions: ['Bench', 'Birdbath', 'Fence', 'Flamingo', 'Forest',
        'Gnome', 'Path', 'Patio', 'Playground', 'Pool',
        'Road', 'Rock', 'Shed', 'TextLabel', 'Other'],

      moistureOptions: ['Dry', 'Dry-Moist', 'Moist', 'Moist-Damp', 'Damp'],
      soilOptions: ['Clay', 'Sandy', 'Loamy', 'Any Soil'],
      sunlightOptions: ['Full-sun', 'Partial-shade', 'Partial-sun', 'Full-shade', 'My plot has different levels'],
      seasons: ['Winter', 'Spring', 'Summer', 'Fall', 'Year Round'],
      colorOptions: ['Tan', 'Ivory', 'Brown', 'Black', 'Red', 'Coral',
        'Green', 'Dark Green', 'Yellow Green', 'Yellow', 'Blue Violet', 'Lavender',
        'Magenta', 'Purple', 'Gold', 'Green Yellow', 'Orange', 'Blue',
        'Orange Red', 'Maroon', 'Forest Green', 'Violet', 'Pink', 'White',
        'Crimson']
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleCheckBox = this.handleCheckBox.bind(this);
    this.handleCBSeasons = this.handleCBSeasons.bind(this);
    this.handleCBColors = this.handleCBColors.bind(this);
    this.handleStringInput = this.handleStringInput.bind(this);
    this.handleNumInput = this.handleNumInput.bind(this);
  }

  /* This lifecycle hook gets executed when the component mounts */



  handleStringInput(e) {
    let value = e.target.value;
    let name = e.target.name;
    this.props.onInputStringChange(value,name)
  }

  handleNumInput(e) {
    let value = e.target.value;
    let name = e.target.name;
    this.props.onInputNumChange(value,name)
  }


  handleCheckBox(e) {

    const newSelection = e.target.value;
    let newSelectionArray;

    if (this.props.newUser.plotItems.indexOf(newSelection) > -1) {
      newSelectionArray = this.props.newUser.plotItems.filter(s => s !== newSelection)
    } else {
      newSelectionArray = [...this.props.newUser.plotItems, newSelection];
    }
    this.props.onCheckBoxChange(newSelectionArray)
  }

  handleCBSeasons(e) {

    const newSelection = e.target.value;
    let newSelectionArray;

    if (this.props.newUser.seasonsWanted.indexOf(newSelection) > -1) {
      newSelectionArray = this.props.newUser.seasonsWanted.filter(s => s !== newSelection)
    } else {
      newSelectionArray = [...this.props.newUser.seasonsWanted, newSelection];
    }
    this.props.onCBSeasonsChange(newSelectionArray)
  }

  handleCBColors(e) {

    const newSelection = e.target.value;
    let newSelectionArray;

    if (this.props.newUser.colorsWanted.indexOf(newSelection) > -1) {
      newSelectionArray = this.props.newUser.colorsWanted.filter(s => s !== newSelection)
    } else {
      newSelectionArray = [...this.props.newUser.colorsWanted, newSelection];
    }
    this.props.onCBColorsChange(newSelectionArray);
  }

  handleFormSubmit(e) {
    e.preventDefault();
    let userData = this.state.newUser;

    fetch('http://example.com', {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(response => {
      response.json().then(data => {
        console.log("Successful" + data);
      })
    })
  }

  render() {
    return (
      <div>
        <h1>Garden Questionnaire</h1>

        <div className="col-md-3"></div>

        <form className="container-fluid col-md-6" >
          <p> Welcome to the Aloe-ha questionnaire! Please fill out the questions below 
            for better suggestions on which plants would be best for your garden and preferences. 
            You can always come back to this page if you need to make any changes. 
            Click 'Next' to see your plant suggestions</p>

          {/* Garden Name */}
          <Input inputtype={'text'}
            title={'Garden Name:'}
            name={'name'}
            value={this.props.newUser.name}
            placeholder={'Enter your Garden Name'}
            handleChange={this.handleStringInput}
            key="text1"

          />
          <div className="form-row">
            <h4> Garden Dimensions</h4>
            <div className="form-group col-md-6">
              {/* Garden Length */}
              <Input inputtype={'number'}
                name={'length'}
                title={'Length'}
                value={this.props.newUser.length}
                placeholder={'Garden Length'}
                handleChange={this.handleNumInput}
                key="num1"
              />
            </div>

            <div className="form-group col-md-6
              ">

              {/* Garden Width */}
              <Input inputtype={'number'}
                name={'width'}
                title={'Width'}
                value={this.props.newUser.width}
                placeholder={'Garden Width'}
                handleChange={this.handleNumInput}
                key="num2"
              />
            </div>
          </div>

          {/* Items in plot */}
          <CheckBox title={'Are any of the following in/near your plot?'}
            name={'plotItems'}
            options={this.state.plotItemOptions}
            selectedOptions={this.props.newUser.plotItems}
            handleChange={this.handleCheckBox}
            key="check1"
          />

          {/* Garden Moisture Level */}
          <Select title={'Garden Moisture Level'}
            name={'moisture'}
            options={this.state.moistureOptions}
            value={this.props.newUser.moisture}
            placeholder={'Select Moisture Level'}
            handleChange={this.handleInput}
            key="check2"
          />

          {/* Garden Soil Type */}
          <Select title={'Garden Soil Type'}
            name={'soil'}
            options={this.state.soilOptions}
            value={this.props.newUser.soil}
            placeholder={'Select Soil Type'}
            handleChange={this.handleInput}
            key="sel1"
          />

          {/* Garden Sunlight Level */}
          <Select title={'Garden Sunlight Level'}
            name={'sunlight'}
            options={this.state.sunlightOptions}
            value={this.props.newUser.sunlight}
            placeholder={'Select Sunlight Level'}
            handleChange={this.handleInput}
            key="sel2"
          />

          {/* Preferred Blooming seasons */}
          <CheckBox title={'When would you like to see your garden bloom? (Select all that apply)'}
            name={'seasonsWanted'}
            options={this.state.seasons}
            selectedOptions={this.props.newUser.seasonsWanted}
            handleChange={this.handleCBSeasons}
            key="check3"
          />

          {/*Color blooms in garden*/}
          <CheckBox title={'What color blooms would you like to see in your garden? (select all that apply)'}
            name={'colorsWanted'}
            options={this.state.colorOptions}
            selectedOptions={this.props.newUser.colorsWanted}
            handleChange={this.handleCBColors}
            key="check4"
          />


          <Button
            action={this.handleFormSubmit}
            type={'primary'}
            title={'Submit'}
            style={buttonStyle}
          /> { /*Submit */}

        </form>


      </div>

    );
  }
}

const buttonStyle = {
  margin: '10px 10px 10px 10px'
}

export default withRouter(Questionnaire);