import React from "react";
import { Link, withRouter } from "react-router-dom";
import Draggable, {DraggableBounds} from 'react-draggable';
import placeholder from "./img/reference pictures/Screen Shot 2020-10-18 at 10.27.30 PM.png"
import { transcode } from "buffer";
import { transform } from "lodash";

type PreviewProps = {
    gardenObjects: GardenObject[],
    plants: Plant[]
}

type PreviewState = {
    year: number,
    season: string,
    viewMode: string,
}

class Preview extends React.Component<any, PreviewState> {
    constructor(props: any) {
        super(props);
        this.state = {
            year: 0,
            season: "Spring",
            viewMode: "Top-down"
        }
        this.toggleViewMode = this.toggleViewMode.bind(this);
    }

    toggleViewMode = () => {
        if (this.state.viewMode == "Top-down") {
            this.setState({viewMode: "Window"});
        } else {
            this.setState({viewMode: "Top-down"})
        }
    }

    render() {
        return (
            <div id="design">
                <div id="layout">
                    {this.props.gardenObjects.map((object: GardenObject) => {
                        return <ObjectDisplay gardenObject={object} viewMode={this.state.viewMode}/>})}
                </div>
                <div id="info">
                    <h4>Options</h4>
                    <button onClick={this.toggleViewMode}>{this.state.viewMode}</button>
                    <button>Get printable version</button>
                    <h4>Plant Information</h4>
                        
                </div>
                <img src={placeholder} style={{ width: "600px" }} />
            </div>
        )
    }
}

const ObjectDisplay = (props: {gardenObject: GardenObject, viewMode: string}) => {
    let { x, y } = props.gardenObject;
    let bounds: DraggableBounds = {top: 0, bottom: 600, left: 0, right: 500};
    let offset = {x: 0, y: 0};
    let imgTransform = 1;
    if (props.viewMode == "Window") {
        offset.y = 250;
        imgTransform = y/600 + .5;
        y = (y/600) * 250; // new y bound is half of screen
    }
    let imgTransformStyle = "scale(" + imgTransform + ", " + imgTransform + ")";
    return (
        <Draggable position={{x: x, y: y}} positionOffset={offset} bounds={bounds} disabled={true}> 
            <div className="garden-obj">
            <img src={props.gardenObject.image} style={{"transform": imgTransformStyle}}></img>
                    <p>{x}, {y}</p>
                    <p>{props.gardenObject.name}</p>
                    <p>{props.viewMode}</p>
            </div>
        </Draggable>
    )
}

export default withRouter(Preview);