import React from "react";
import { Link, withRouter } from "react-router-dom";
import Draggable, {DraggableBounds} from 'react-draggable';
import ImageCarousel from 'react-responsive-carousel';
import html2canvas from 'html2canvas';  
import jsPDF from 'jspdf';
import { BloomTime } from "./Select";
import { ItemList } from "./Build";

type PreviewProps = {
    gardenObjects: GardenObject[],
    plants: Plant[],
    user: User
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
        this.printDocument = this.printDocument.bind(this);
    }

    toggleViewMode = () => {
        let layout = document.getElementById("layout");
        if (this.state.viewMode == "Top-down") {
            this.setState({viewMode: "Window"});
            if (layout) {
                layout.setAttribute("class", "window");
            } 
        } else {
            this.setState({viewMode: "Top-down"});
            if (layout) {
                layout.removeAttribute("class");
            } 
        }
    }

    userToString(user: User){
        let userInfo = "";
        if (user) {
            if (user.moisture) {
                userInfo += "Moisture: " + user.moisture + "\n";
            }
            if (user.sunlight) {
                userInfo += "Light: " + user.sunlight + "\n";
            }
            if (user.soil) {
                userInfo += "Soil: " + user.soil + "\n";
            }
            if (user.seasonsWanted) {
                userInfo += "Seasons: " + user.seasonsWanted + "\n";
            }
            if (user.colorsWanted) {
                userInfo += "Colors: " + user.colorsWanted + "\n";
            }
        }
        return userInfo;
    }

    setYear(year: number){
        this.setState({year: year});
    }

    printDocument() {  
        const { user } = this.props;
        const layout = document.getElementById('layout');  
        const pdf = new jsPDF('l','mm',[297, 210]);
        if (layout) {
        html2canvas(layout, {allowTaint: true, useCORS: true})   //NOTE: this does not work on localhost, images replaced with default for print version
          .then((canvas) => {  
            var imgWidth = 200;  
            var pageHeight = 290;  
            var imgHeight = canvas.height * imgWidth / canvas.width;  
            var heightLeft = imgHeight;  
            const imgData = canvas.toDataURL('image/png');  
            var position = 30;  
            var heightLeft = imgHeight;  
            pdf.setFontSize(30);
            if (user && user.name){
                pdf.text(user.name, 15, 25)
            } 
            pdf.addImage(imgData, 'JPEG', 15, position, imgWidth, imgHeight);  
            pdf.addPage();
            pdf.text("My garden conditions:", 15, 25);
            pdf.setFontSize(11);
            pdf.text(this.userToString(user), 15, 30);
            
            pdf.addPage();
            pdf.setFontSize(30);
            pdf.text("Plant info:", 15, 25);
            const info = document.getElementById("plant-info");
            if (info){
                console.log(info.innerHTML)
                pdf.html(info, {
                    callback: function (doc) {
                      pdf.save("garden_layout.pdf");
                    },
                    html2canvas: {
                        scale: 0.3
                    },
                    x: 15,
                    y: 25   
                 });
            } 
          });  
      }
    }

    render() {
        return (
            <div id="design">
                <div id="layout">
                    {this.props.gardenObjects.map((object: GardenObject) => {
                        return <ObjectDisplay gardenObject={object} viewMode={this.state.viewMode} year={this.state.year}/>})}
                </div>
                <div id="info">
                    <h4>Options</h4>
                    <button onClick={this.toggleViewMode}>{(this.state.viewMode == "Window") ? "See top-down view" : "See window view"}</button> <br />
                    {(this.state.viewMode == "Window") ? <span id="years"><button onClick={()=>{this.setYear(0)}}>Year 0</button>
                    <button onClick={()=>{this.setYear(1)}}>Year 1</button> 
                    <button onClick={()=>{this.setYear(2)}}>Year 2</button></span> : ""}
                    <button onClick={this.printDocument}>Get printable version</button>
                    <h4>Plant Information</h4>
                    <div id="plant-info">
                        {this.props.plants.map((plant: Plant) => {return <PrintablePlantInfo plant={plant} />})}
                    </div>
                </div>
            </div>
        )
    }
}

//printable version has no images, truncated description
const PrintablePlantInfo = (props: {plant: Plant}) => {

    const { plant } = props;
    return (<div className="print-info" id={plant.id}>
        <h4>{plant.latinName}</h4>
                {plant.commonNames && <p>Also known as: {plant.commonNames.map((name) => {return name + "  "})}</p>}
                {plant.invasive && <span className="plant-badge yellow">invasive </span>}
                {plant.delawareNative && <span className="plant-badge pink">native</span>}
                {plant.light && plant.light >= 0 && <span className="plant-badge white">light: {plant.light}</span>}
                {plant.canopy && <span className="plant-badge purple">{plant.canopy}</span>}
                {plant.moisture && <span className="plant-badge blue">{plant.moisture}</span>}
                {plant.soilType && <span className="plant-badge brown">{plant.soilType}</span>}
                {plant.bloomTime && <BloomTime times={plant.bloomTime} />}
                {plant.description && <div className="description"> {plant.description.substring(0, 500)} ...</div>}
        </div>)
}

let isItem = (object: GardenObject) => {
    if (ItemList.includes(object.name)){
        return true;
    } else {
        return false;
    }
}

const ObjectDisplay = (props: {gardenObject: GardenObject, viewMode: string, year: number}) => {
    let { x, y } = props.gardenObject;
    let bounds: DraggableBounds = {top: 0, bottom: 600, left: 0, right: 500};
    let offset = {x: 0, y: 0};
    let imgTransform = 1;
    if (props.viewMode == "Window") {
        offset.y = 250;
        imgTransform = y/600 + .5;
        y = (y/600) * 250; // new y bound is half of screen
        if (!isItem(props.gardenObject)){
            if (props.year == 0){
                imgTransform *= .5;
            } else if (props.year == 1) {
                imgTransform *= .8;
            }
        }
    }
    let imgTransformStyle = "scale(" + imgTransform + ", " + imgTransform + ")";
    return (
        <Draggable position={{x: x, y: y}} positionOffset={offset} bounds={bounds} disabled={true}> 
            <div className="garden-obj">
            <img src={props.gardenObject.image} style={{"transform": imgTransformStyle}}></img>
                    <p>{(props.viewMode == "Top-down")? x : ""}, {(props.viewMode == "Top-down") ? y : ""}</p>
                    <p>{(props.viewMode == "Top-down") ? props.gardenObject.name: ""}</p>
            </div>
        </Draggable>
    )
}

export default withRouter(Preview);