import {useContext, useEffect, useState} from "react";
import {TokenContext} from "./Contex/HaccpContext";
import {Button, Card, CardBody, CardFooter, CardHeader, ListGroup, ListGroupItem} from "react-bootstrap";


function AgencyView(){

    const {token,setToken}=useContext(TokenContext)
    const [agencies,setAgencies]=useState([])

    useEffect(()=>{

        fetch("/API/agencies/", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token

            }
    }).then((response)=>{
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
    }).then((data)=>{
        setAgencies(data)
            console.log(agencies)
        })
    },[])


    return(
        <>
            <ListGroup>{agencies.map((a)=><SingleAgencyView agency={a} />)}</ListGroup>






        </>

    )
}



function SingleAgencyView(props){


    return<>
    <ListGroupItem>
        <Card>
            <CardHeader> {props.agency.username}</CardHeader>
            <CardBody>
                <h1>Titolare:{props.agency.name}</h1>
            <div>Sede Legale:{props.agency.city}</div>
            </CardBody>
            <CardFooter><Button>Ispeziona</Button></CardFooter>

        </Card>
    </ListGroupItem>
    </>
}


export{AgencyView}