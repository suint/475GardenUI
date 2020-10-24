import React, {Component} from "react";
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
        newUser: {
          name: '',
          length: '',
          width: '',
          plotItems: [],
          moisture: '',
          soil: '',
          sunlight: '',
          seasonsWanted: [],
          colorsWanted: [],
          gender: '',
          skills: []
  
        },
  
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
      this.handleInput = this.handleInput.bind(this);
    }
  
    /* This lifecycle hook gets executed when the component mounts */
  
  
    handleInput(e) {
      let value = e.target.value;
      let name = e.target.name;
      this.setState(prevState => ({
        newUser:
        {
          ...prevState.newUser, [name]: value
        }
      }), () => console.log(this.state.newUser))
    }
  
  
    handleCheckBox(e) {
  
      const newSelection = e.target.value;
      let newSelectionArray;
  
  
      if (this.state.newUser.plotItems.indexOf(newSelection) > -1) {
        newSelectionArray = this.state.newUser.plotItems.filter(s => s !== newSelection)
      } else {
        newSelectionArray = [...this.state.newUser.plotItems, newSelection];
      }
  
      this.setState(prevState => ({
        newUser:
          { ...prevState.newUser, plotItems: newSelectionArray }
      })
      )
    }
  
    handleCBSeasons(e) {
  
      const newSelection = e.target.value;
      let newSelectionArray;
  
  
      if (this.state.newUser.seasonsWanted.indexOf(newSelection) > -1) {
        newSelectionArray = this.state.newUser.seasonsWanted.filter(s => s !== newSelection)
      } else {
        newSelectionArray = [...this.state.newUser.seasonsWanted, newSelection];
      }
  
      this.setState(prevState => ({
        newUser:
          { ...prevState.newUser, seasonsWanted: newSelectionArray }
      })
      )
    }
  
    handleCBColors(e) {
  
      const newSelection = e.target.value;
      let newSelectionArray;
  
  
      if (this.state.newUser.colorsWanted.indexOf(newSelection) > -1) {
        newSelectionArray = this.state.newUser.colorsWanted.filter(s => s !== newSelection)
      } else {
        newSelectionArray = [...this.state.newUser.colorsWanted, newSelection];
      }
  
      this.setState(prevState => ({
        newUser:
          { ...prevState.newUser, colorsWanted: newSelectionArray }
      })
      )
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
  
          <form className="container-fluid col-md-6" onSubmit={this.handleFormSubmit}>
            {/* Garden Name */}
            <Input inputType={'text'}
              title={'Garden Name:'}
              name={'name'}
              value={this.state.newUser.name}
              placeholder={'Enter your Garden Name'}
              handleChange={this.handleInput}
  
            />
            <div class="form-row">
              <h4> Garden Dimensions</h4>
              <div class="form-group col-md-6">
                {/* Garden Length */}
                <Input inputType={'number'}
                  name={'length'}
                  title={'Length'}
                  value={this.state.newUser.length}
                  placeholder={'Garden Length'}
                  handleChange={this.handleInput}
                />
              </div>
  
              <div class="form-group col-md-6
              ">
  
                {/* Garden Width */}
                <Input inputType={'number'}
                  name={'width'}
                  title={'Width'}
                  value={this.state.newUser.width}
                  placeholder={'Garden Width'}
                  handleChange={this.handleInput}
                />
              </div>
            </div>
  
            {/* Items in plot */}
            <CheckBox title={'Are any of the following in/near your plot?'}
              name={'plotItems'}
              options={this.state.plotItemOptions}
              selectedOptions={this.state.newUser.plotItems}
              handleChange={this.handleCheckBox}
            />
  
            {/* Garden Moisture Level */}
            <Select title={'Garden Moisture Level'}
              name={'moisture'}
              options={this.state.moistureOptions}
              value={this.state.newUser.moisture}
              placeholder={'Select Moisture Level'}
              handleChange={this.handleInput}
            />
  
            {/* Garden Soil Type */}
            <Select title={'Garden Soil Type'}
              name={'soil'}
              options={this.state.soilOptions}
              value={this.state.newUser.soil}
              placeholder={'Select Soil Type'}
              handleChange={this.handleInput}
            />
  
            {/* Garden Sunlight Level */}
            <Select title={'Garden Sunlight Level'}
              name={'sunlight'}
              options={this.state.sunlightOptions}
              value={this.state.newUser.sunlight}
              placeholder={'Select Sunlight Level'}
              handleChange={this.handleInput}
            />
  
            {/* Preferred Blooming seasons */}
            <CheckBox title={'When would you like to see your garden bloom? (Select all that apply)'}
              name={'seasonsWanted'}
              options={this.state.seasons}
              selectedOptions={this.state.newUser.seasonsWanted}
              handleChange={this.handleCBSeasons}
            />
  
            {/*Color blooms in garden*/}
            <CheckBox title={'What color blooms would you like to see in your garden? (select all that apply)'}
              name={'colorsWanted'}
              options={this.state.colorOptions}
              selectedOptions={this.state.newUser.colorsWanted}
              handleChange={this.handleCBColors}
            />
  
  
            <Button
              action={this.handleFormSubmit}
              type={'primary'}
              title={'Submit'}
              style={buttonStyle}
            /> { /*Submit */}
  
          </form>

          <div class="col-md-3"></div>

          <div class="row">

            <div class="col-md-12">

          <Link className="nav-link" to="/select">
                Back
            </Link>
            <Link className="nav-link" to="/design">
                Next
            </Link>

          </div>

          </div>

        </div>
  
      );
    }
  }
  
  const buttonStyle = {
    margin: '10px 10px 10px 10px'
  }

export default withRouter(Questionnaire);