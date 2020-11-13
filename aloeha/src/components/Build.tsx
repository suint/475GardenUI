import React from "react";
import { Link, withRouter } from "react-router-dom";
import placeholder from "./img/reference pictures/Screen Shot 2020-10-18 at 10.27.21 PM.png"
import cactus from "./img/reference pictures/cactus.jpg"
import Draggable from 'react-draggable';
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

function Build(props: any) {

    
    return (
        <div>
            
        <div id="plantbox">
        <h1>Build widget goes here</h1>
            <div id="search-plants" className="plants">
                    <p>Drag and drop your plants and objects from the drop downs on the left to build your garden. Click next to see your garden in a different season, age, and view, or you can save your garden project here.</p>
                    <Accordion>
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                    Existing Plants
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                                
                                <Card.Body>
                                    Hello! I'm the body
                                     <Draggable >
                                    <div><img draggable={false} src={cactus} style={{ width: "300px" }} /></div>
                                </Draggable>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                    Selected Plants 
                                </Accordion.Toggle>
                            </Card.Header>
                                <Accordion.Collapse eventKey="1">
                                    <Card.Body>Hello! I'm another body</Card.Body>
                                </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Card.Header>
                                <Accordion.Toggle as={Button} variant="link" eventKey="2">
                                    Garden Objects
                                </Accordion.Toggle>
                            </Card.Header>
                                <Accordion.Collapse eventKey="2">
                                    <Card.Body>Hello! I'm another body</Card.Body>
                                </Accordion.Collapse>
                        </Card>
                    </Accordion>
            
            </div>
        <div id="selected-plants" className="plants">
            
        </div>

        {/* <img src={placeholder} style={{ width: "600px" }} /> */}
    </div>
        <div id="design">
            <h1>Build widget goes here</h1>
            <img src={placeholder} style={{ width: "600px" }} />
        </div>
    )
}

export default withRouter(Build);