import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navbar, Select, Start, Design, Questionnaire, Preview, Build, Add } from "./components";
import './App.css';
import _ from "lodash";

//https://jsfiddle.net/vbwe1s44/ example 

// replace later with api lookup

type UserState = {
  newUser: User,
  existingPlants: Plant[],
  suggestedPlants: Plant[],
  gardenObjects: GardenObject[],
  gardenPlants: Plant[],
  currentKey: number
};

const fakePlantList = [
  {
    "id":"5faee018cf5cbb3850ce4c5a",
    "commonNames":[
       "white arctic mountain heather"
    ],
    "latinName":"Cassiope tetragona",
    "description":"Description: \nSymbol: CATE11\nGroup: Dicot\nFamily: Ericaceae\nDuration: Perennial\nGrowth Habitat: Shrub Subshrub\nHeight at 20 Years, Maximum (feet): \nHeight, Mature (feet): 0.4\nShape and Orientation: Prostrate\nLifespan: Long\nFlower Color: White\nFoliage Color: Green\nFoliage Porosity Summer: Dense\nFoliage Porosity Winter: Dense\nFoliage Texture: Coarse\nLeaf Retention: Yes\nMoisture Use: Medium\nFruit/Seed Color: Brown\nFruit/Seed Conspicuous: No\nActive Growth Period: Summer\nGrowth Form: Single Crown\nGrowth Rate: Slow\nAfter Harvest Regrowth Rate: \nBloat: None\nC:N Ratio: High\nCoppice Potential: No\nFall Conspicuous: No\nFire Resistant: No\nFlower Conspicuous: Yes\nKnown Allelopath: No\nLow Growing Grass: No\nNitrogen Fixation: None\nResprout Ability: Yes\nToxicity: None\nCaCO3 Tolerance: Low\nCold Stratification Required: Yes\nDrought Tolerance: Medium\nFertility Requirement: Low\nFire Tolerance: Low\nFrost Free Days, Minimum: 75\nHedge Tolerance: None\npH, Minimum: 5.0\npH, Maximum: 7.0\nPlanting Density per Acre, Minimum: 1200\nPlanting Density per Acre, Maximum: 4800\nPrecipitation, Minimum: 20\nPrecipitation, Maximum: 60\nRoot Depth, Minimum (inches): 14\nSalinity Tolerance: None\nShade Tolerance: Intolerant\nTemperature, Minimum (F): -43\nCommercial Availability: No Known Source\nFruit/Seed Abundance: Medium\nFruit/Seed Period Begin: Summer\nFruit/Seed Period End: Summer\nFruit/Seed Persistence: No\nPropagated by Bare Root: Yes\nPropagated by Bulb: No\nPropagated by Container: Yes\nPropagated by Corm: No\nPropagated by Cuttings: No\nPropagated by Seed: Yes\nPropagated by Sod: No\nPropagated by Sprigs: No\nPropagated by Tubers: No\nSeed per Pound: \nSeed Spread Rate: Slow\nSeedling Vigor: Low\nSmall Grain: No\nVegetative Spread Rate: None\nBerry/Nut/Seed Product: No\nChristmas Tree Product: No\nFodder Product: No\nFuelwood Product: \nLumber Product: No\nNaval Store Product: No\nNursery Stock Product: No\nPalatable Browse Animal: Low\nPalatable Graze Animal: \nPalatable Human: No\nPost Product: No\nProtein Potential: Low\nPulpwood Product: No\nVeneer Product: No",
    "bloomTime":[
       false,
       false,
       false,
       true,
       true,
       true,
       false,
       false,
       false,
       false,
       false,
       false
    ],
    "light":1.0,
    "moisture":"MOIST",
    "soilType":"LOAMY",
    "canopy":"FLOOR",
    "delawareNative":true,
    "invasive":false,
    "source":[
       "NRCS"
    ]
 },
 {
    "id":"5faee018cf5cbb3850ce4c5b",
    "commonNames":[
       "shellbark hickory"
    ],
    "latinName":"Carya laciniosa",
    "description":"Description: \nSymbol: CALA21\nGroup: Dicot\nFamily: Juglandaceae\nDuration: Perennial\nGrowth Habitat: Tree\nHeight at 20 Years, Maximum (feet): 35\nHeight, Mature (feet): 100.0\nShape and Orientation: Erect\nLifespan: Long\nFlower Color: Yellow\nFoliage Color: Green\nFoliage Porosity Summer: Dense\nFoliage Porosity Winter: Porous\nFoliage Texture: Coarse\nLeaf Retention: No\nMoisture Use: High\nFruit/Seed Color: Brown\nFruit/Seed Conspicuous: Yes\nActive Growth Period: Spring and Summer\nGrowth Form: Single Stem\nGrowth Rate: Slow\nAfter Harvest Regrowth Rate: \nBloat: None\nC:N Ratio: High\nCoppice Potential: Yes\nFall Conspicuous: No\nFire Resistant: No\nFlower Conspicuous: No\nKnown Allelopath: No\nLow Growing Grass: No\nNitrogen Fixation: None\nResprout Ability: Yes\nToxicity: None\nCaCO3 Tolerance: High\nCold Stratification Required: Yes\nDrought Tolerance: Low\nFertility Requirement: High\nFire Tolerance: Medium\nFrost Free Days, Minimum: 150\nHedge Tolerance: None\npH, Minimum: 5.0\npH, Maximum: 6.6\nPlanting Density per Acre, Minimum: 170\nPlanting Density per Acre, Maximum: 700\nPrecipitation, Minimum: 30\nPrecipitation, Maximum: 60\nRoot Depth, Minimum (inches): 60\nSalinity Tolerance: None\nShade Tolerance: Tolerant\nTemperature, Minimum (F): -22\nCommercial Availability: Routinely Available\nFruit/Seed Abundance: Low\nFruit/Seed Period Begin: Summer\nFruit/Seed Period End: Fall\nFruit/Seed Persistence: No\nPropagated by Bare Root: Yes\nPropagated by Bulb: No\nPropagated by Container: Yes\nPropagated by Corm: No\nPropagated by Cuttings: No\nPropagated by Seed: Yes\nPropagated by Sod: No\nPropagated by Sprigs: No\nPropagated by Tubers: No\nSeed per Pound: 30\nSeed Spread Rate: Slow\nSeedling Vigor: Low\nSmall Grain: No\nVegetative Spread Rate: None\nBerry/Nut/Seed Product: Yes\nChristmas Tree Product: No\nFodder Product: No\nFuelwood Product: High\nLumber Product: Yes\nNaval Store Product: Yes\nNursery Stock Product: No\nPalatable Browse Animal: Low\nPalatable Graze Animal: Low\nPalatable Human: Yes\nPost Product: No\nProtein Potential: Low\nPulpwood Product: No\nVeneer Product: Yes",
    "bloomTime":[
       false,
       false,
       false,
       true,
       true,
       true,
       false,
       false,
       false,
       false,
       false,
       false
    ],
    "light":0.33,
    "moisture":"DAMP",
    "soilType":"LOAMY",
    "canopy":"CANOPY",
    "delawareNative":true,
    "invasive":false,
    "source":[
       "NRCS"
    ]
 },
 {
    "id":"5faee018cf5cbb3850ce4c5c",
    "commonNames":[
       "yellow evening primrose"
    ],
    "latinName":"Oenothera flava",
    "description":"Description: \nSymbol: OEFL\nGroup: Dicot\nFamily: Onagraceae\nDuration: Perennial\nGrowth Habitat: Forb/herb\nHeight at 20 Years, Maximum (feet): \nHeight, Mature (feet): 2.5\nShape and Orientation: Erect\nLifespan: Short\nFlower Color: Yellow\nFoliage Color: Green\nFoliage Porosity Summer: Porous\nFoliage Porosity Winter: Porous\nFoliage Texture: Medium\nLeaf Retention: No\nMoisture Use: Medium\nFruit/Seed Color: Brown\nFruit/Seed Conspicuous: No\nActive Growth Period: Spring and Summer\nGrowth Form: Bunch\nGrowth Rate: Moderate\nAfter Harvest Regrowth Rate: Slow\nBloat: None\nC:N Ratio: Medium\nCoppice Potential: No\nFall Conspicuous: No\nFire Resistant: No\nFlower Conspicuous: Yes\nKnown Allelopath: No\nLow Growing Grass: No\nNitrogen Fixation: None\nResprout Ability: No\nToxicity: None\nCaCO3 Tolerance: Low\nCold Stratification Required: No\nDrought Tolerance: Low\nFertility Requirement: Low\nFire Tolerance: High\nFrost Free Days, Minimum: 100\nHedge Tolerance: None\npH, Minimum: 6.0\npH, Maximum: 7.8\nPlanting Density per Acre, Minimum: 2700\nPlanting Density per Acre, Maximum: 4800\nPrecipitation, Minimum: 10\nPrecipitation, Maximum: 18\nRoot Depth, Minimum (inches): 8\nSalinity Tolerance: None\nShade Tolerance: Intermediate\nTemperature, Minimum (F): -33\nCommercial Availability: No Known Source\nFruit/Seed Abundance: Medium\nFruit/Seed Period Begin: Spring\nFruit/Seed Period End: Summer\nFruit/Seed Persistence: Yes\nPropagated by Bare Root: Yes\nPropagated by Bulb: No\nPropagated by Container: No\nPropagated by Corm: No\nPropagated by Cuttings: No\nPropagated by Seed: Yes\nPropagated by Sod: No\nPropagated by Sprigs: No\nPropagated by Tubers: No\nSeed per Pound: 700000\nSeed Spread Rate: Slow\nSeedling Vigor: Medium\nSmall Grain: No\nVegetative Spread Rate: None\nBerry/Nut/Seed Product: No\nChristmas Tree Product: No\nFodder Product: No\nFuelwood Product: \nLumber Product: No\nNaval Store Product: No\nNursery Stock Product: No\nPalatable Browse Animal: Low\nPalatable Graze Animal: \nPalatable Human: No\nPost Product: No\nProtein Potential: Low\nPulpwood Product: No\nVeneer Product: No",
    "bloomTime":[
       false,
       false,
       false,
       true,
       true,
       true,
       false,
       false,
       false,
       false,
       false,
       false
    ],
    "light":0.67,
    "moisture":"MOIST",
    "soilType":"LOAMY",
    "canopy":"FLOOR",
    "delawareNative":true,
    "invasive":false,
    "source":[
       "NRCS"
    ]
 }
]

const fakeObjectList = [
  {
    key: 0,
    name: "bdglsdfg ieurhskdfl",
    image: "https://crouton.net/crouton.png",
    x: 150,
    y: 150
  },
  {
    key: 2,
    name: "dirghdnlf sdnms,fs",
    image: "https://crouton.net/crouton.png",
    x: 20,
    y: 44
  }
]

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
      suggestedPlants: [],
      gardenPlants: [], // TODO: refactor this later to something less confusing 
      gardenObjects: [],
      //gardenPlants = plants the user has selected in Add page
      //gardenObjects = all objects in garden as arranged in Build page
      currentKey: 1
    }
    this.addGardenObject = this.addGardenObject.bind(this);
    this.moveGardenObject = this.moveGardenObject.bind(this);
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
              <Route path="/add" exact render={() => <Add 
                                                                      plants={fakePlantList}/>} />
              <Route path="/preview" exact render={() => <Preview 
                                                                      gardenObjects={fakeObjectList}
                                                                      plants={fakePlantList}/>} /> 
                                                                      {/* this.state.existingPlants.concat(this.state.suggestedPlants) */}
              <Route path="/build" exact render={() => <Build 
                                                                      addGardenObject={this.addGardenObject}
                                                                      moveGardenObject={this.moveGardenObject} 
                                                                      gardenObjects={this.state.gardenObjects}/>}
                                                                      existingPlants={fakePlantList} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;