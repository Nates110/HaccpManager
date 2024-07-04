import React, {useContext, useEffect, useState} from 'react';
import {Form, Button, Alert, Row, Container} from 'react-bootstrap';
import {useNavigate, useParams} from "react-router-dom";


import {TokenContext,AgencyContext} from "../Contex/HaccpContext";
import {NavigationAzienda} from "./NavigationAzienda";

function ProfiloAzienda() {
    const {agency,setAgency}=useContext(AgencyContext)
    const {token,setToken}=useContext(TokenContext)
    const [email, setEmail] = useState(agency.email);
    const [username,setUsername] = useState(agency.username);
    const [name, setName] = useState(agency.name);
    const [dateOfBirth, setDateOfBirth] = useState(agency.dateOfBirth);
    const [city, setCity] = useState(agency.city);
    const [region, setRegion] = useState(agency.region);
    const [phoneNumber, setPhoneNumber] = useState(agency.phoneNumber);
    const role =localStorage.getItem("role")
    const [expertize,setExpertize]=useState(agency.expertize?agency.expertize:null)
    const [message, setMessage] = useState('');
    const navigate = useNavigate()
    const {edit_email}=useParams()
    const [resultMessage,setResultMessage]=useState({})
    const [showT,setShowT]=useState(false)



    const closeT=()=>{
        if(resultMessage.message === 'Profile updated successfully') {
            setResultMessage({});
            setShowT(false)
            navigate("/");
        }
        else{
            setShowT(false)
        }
    }



    return (<>
        <NavigationAzienda />
        <Container>
            <Row>
                { message ?  <Alert variant="danger" onClose={() => setMessage('')} dismissible>{message}</Alert> : false}
            </Row>
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control disabled type="email" placeholder={email} value={email} onChange={(event) => setEmail(event.target.value)} />
                </Form.Group>

                <Form.Group >
                    <Form.Label>Username</Form.Label>
                    <Form.Control disabled type="password" placeholder={username} value={username} onChange={(event) => setUsername(event.target.value)} />
                </Form.Group>

                <Form.Group controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder={name} value={name} onChange={(event) => setName(event.target.value)} />
                </Form.Group>

                <Form.Group controlId="formBasicDob">
                    <Form.Label>Date of birth</Form.Label>
                    <Form.Control type="date" placeholder={dateOfBirth} value={dateOfBirth} onChange={(event) => setDateOfBirth(event.target.value)} />
                </Form.Group>

                <Form.Group controlId="formBasicCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" placeholder={city} value={city} onChange={(event) => setCity(event.target.value)} />
                </Form.Group>

                <Form.Group controlId="formBasicRegion">
                    <Form.Label>Region</Form.Label>
                    <Form.Control type="text" placeholder={region} value={region} onChange={(event) => setRegion(event.target.value)} />
                </Form.Group>

                <Form.Group controlId="formBasicPhone">
                    <Form.Label>Phone number</Form.Label>
                    <Form.Control type="tel" placeholder={phoneNumber} value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)} />
                </Form.Group>
                {role==="app_user"?null:
                    <Form.Group controlId="formBasicExpertize">
                        <Form.Label>Expertize</Form.Label>
                        <Form.Control type="text" placeholder={expertize} value={expertize} onChange={(event) => setExpertize(event.target.value)} />
                    </Form.Group>
                }

            </Form>
        </Container>
        </>
    );
}

export { ProfiloAzienda }
