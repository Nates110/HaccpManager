import {NavigationAzienda} from "./NavigationAzienda";

import {Button, Col, Form, FormControl, FormSelect, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import {AgencyContext, TokenContext} from "../Contex/HaccpContext";
import {useContext, useEffect, useState} from "react";

function Attrezzature(){

    const [frigos,setFrigos]=useState([])
    const {agency,setAgency}=useContext(AgencyContext)
    const {token,setToken}=useContext(TokenContext)
    const [add,setAdd]=useState(false)
    const [dirty,setDirty]=useState(false)

    useEffect(()=>{
        fetch("/API/frigorifero/"+agency.email,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then((response)=> {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text().then(text => {
                return text ? JSON.parse(text) : null;
            })
        }).then((data)=>{
            setFrigos(data)
            setDirty(false)
        }).catch()
    },[agency.email, dirty, token])
    
    
    const addFrigo=()=>{
        setDirty(true)
        setAdd(false)
    }


    return(<>
    <NavigationAzienda />
        {!dirty? <ListGroup>
            {frigos.length>0?  frigos.map((f)=><Attrezzatura frigo={f} />): 'Non esistono attrezzature registrate'}
        </ListGroup>:'Loading'}
        {!add? <Button onClick={()=>setAdd(true)}>Aggiungi attrezzatura</Button>:<AddAttrezzatura add={addFrigo} />}




    </>)

}



function Attrezzatura(props){

    return(<>
    <ListGroupItem>{props.frigo.name}</ListGroupItem>

    </>)

}



function AddAttrezzatura(props){

    const {token,setToken}=useContext(TokenContext)
    const {agency,setAgency}=useContext(AgencyContext)
    const [name,setName]=useState('')
    const [type,setType]=useState('')
    const types=['frigorifero','congelatore','vetrina refrigerata']
    
    
    const handleSubmit=()=>{
        const body={
            name:name,
            type:type
        }
        
        fetch('/API/frigorifero/'+agency.email,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(body),
        }).then((response)=>{
            if(response.ok){
                console.log("frigorifero aggiunto corretamente")
                props.add()
                
                
            }
        })
    }

return(<>
<Form>
    <Row>
        <Col><FormControl placeholder={"nome"} value={name} onChange={event=> setName(event.target.value)} /> </Col>
        <Col><FormSelect placeholder={"tipo"} value={type} onChange={event=> setType(event.target.value)} >
            {types.map(t=><option value={t}>{t}</option>)}
        </FormSelect> </Col>
        <Button onClick={()=>handleSubmit()}>Conferma</Button>
    </Row>
</Form>

</>)


}







export {Attrezzature}