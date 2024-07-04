import {Card, Col, Container, Row} from "react-bootstrap";

import {useNavigate} from "react-router-dom";
import '../App.css';
import {useContext, useEffect, useState} from "react";

import {AgencyContext} from "../Contex/HaccpContext";
import {NavigationAdmin} from "./NavigationAdmin";


const MainAdmin =()=>{

    const navigate=useNavigate()
    const [token,setToken]=useState(localStorage.getItem("token")?localStorage.getItem("token") :"")
    const {agency,setAgency}=useContext(AgencyContext)



    return (<>

            <NavigationAdmin />

            <Container>


                <Row className={"mainCard"}>
                    <Col>

                        <Card className="MainPageCards"  onClick={()=>navigate("/agencies")} >
                            <Card.Img variant="top" src="logo192.png" />
                            <Card.Title>Aziende</Card.Title>

                        </Card>
                    </Col>
                    <Col>
                        <Card className="MainPageCards"  >
                            <Card.Img variant="top" src="logo192.png" />
                            <Card.Title>Profilo</Card.Title>
                        </Card>
                    </Col>


                </Row>
            </Container>

        </>


    )
}




export {MainAdmin}