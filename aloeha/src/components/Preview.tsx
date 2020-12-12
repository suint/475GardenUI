import React from "react";
import { Link, withRouter } from "react-router-dom";
import Draggable, {DraggableBounds} from 'react-draggable';
import placeholder from "./img/reference pictures/Screen Shot 2020-10-18 at 10.27.30 PM.png"

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
            viewMode: "topdown"
        }
    }
    render() {
        return (
            <div id="design">
                <div id="layout">
                    {this.props.gardenObjects.map((object: GardenObject) => {
                        return <ObjectDisplay gardenObject={object} viewMode={this.state.viewMode}/>})}
                </div>
                <img src={placeholder} style={{ width: "600px" }} />
            </div>
        )
    }
}

const ObjectDisplay = (props: {gardenObject: GardenObject, viewMode: string}) => {
    let { x, y } = props.gardenObject;
    let bounds: DraggableBounds = {top: 0, bottom: 600, left: 0, right: 500};
    if (props.viewMode == "window") {
        bounds.top = 300;
        y *= .6;
    }
    return (
        <Draggable defaultPosition={{x: x, y: y}} bounds={bounds} disabled={true}> 
            <div className="garden-obj">
            <img src={props.gardenObject.image}></img>
                    <p>{x}, {y}</p>
                    <p>{props.gardenObject.name}</p>
            </div>
        </Draggable>
    )
}

export default withRouter(Preview);