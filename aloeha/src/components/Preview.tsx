import React from "react";
import { Link, withRouter } from "react-router-dom";
import Draggable, {DraggableBounds} from 'react-draggable';
import ImageCarousel from 'react-responsive-carousel';
import html2canvas from 'html2canvas';  
import jsPDF from 'jspdf';

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

    printDocument() {  
        const layout = document.getElementById('layout');  
        const pdf = new jsPDF('p', 'mm', 'a4') ;
        if (layout) {
        html2canvas(layout, {allowTaint: true, useCORS: true})  
          .then((canvas) => {  
            var imgWidth = 200;  
            var pageHeight = 290;  
            var imgHeight = canvas.height * imgWidth / canvas.width;  
            var heightLeft = imgHeight;  
            const imgData = canvas.toDataURL('image/png');  
            var position = 0;  
            var heightLeft = imgHeight;  
            pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);  
            pdf.save("garden_layout.pdf");  
          });  
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
                    <button onClick={this.toggleViewMode}>{(this.state.viewMode == "Window") ? "Top-down view" : "Window view"}</button> <br />
                    <button onClick={this.printDocument}>Get printable version</button>
                    <h4>Plant Information</h4>
                    {this.props.plants.map((plant: Plant) => {return <PrintablePlantInfo plant={plant} print={false} />})}
                </div>
            </div>
        )
    }
}

//printable version has no images, truncated description
const PrintablePlantInfo = (props: {plant: Plant, print: boolean}) => {

    const { plant } = props;
    return (<div className="print-info">
        <h4>{plant.latinName}</h4>
                {plant.commonNames && <p>Also known as: {plant.commonNames.map((name) => {return name + "  "})}</p>}
                {plant.images && !props.print && <ImageCarousel images={plant.images} />}
                {plant.invasive && <span className="plant-badge yellow">invasive </span>}
                {plant.delawareNative && <span className="plant-badge pink">native</span>}
                {plant.light && plant.light >= 0 && <span className="plant-badge white">light: {plant.light}</span>}
                {plant.canopy && <span className="plant-badge green">canopy: {plant.canopy}</span>}
                {plant.moisture && <span className="plant-badge blue">{plant.moisture}</span>}
                {plant.soilType && <span className="plant-badge brown">{plant.soilType}</span>}
                {/* {plant.bloomTime && <BloomTime times={plant.bloomTime} />} */}
                {plant.description && <div className="description"> <p>{props.print ? plant.description.substring(0, 500) : plant.description}</p></div>}
        </div>)
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