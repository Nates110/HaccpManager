import {Card, Col, Container, Row} from "react-bootstrap";

import {useNavigate} from "react-router-dom";
import '../App.css';
import {useContext, useEffect, useState} from "react";
import {NavigationAzienda} from "./NavigationAzienda";
import {AgencyContext} from "../Contex/HaccpContext";


const MainAzienda =()=>{

    const navigate=useNavigate()
    const [token,setToken]=useState(localStorage.getItem("token")?localStorage.getItem("token") :"")
    const {agency,setAgency}=useContext(AgencyContext)



    return (<>

            <NavigationAzienda />

            <Container>


                <Row className={"mainCard"}>
                    <Col>

                        <Card className="MainPageCards"  onClick={()=>navigate("/prenotazioni")} >
                            <Card.Img variant="top" src="logo192.png" />
                            <Card.Title>Documentazione</Card.Title>

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




export {MainAzienda}