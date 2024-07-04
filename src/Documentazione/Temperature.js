import {AgencyContext, TokenContext} from "../Contex/HaccpContext";
import {useContext, useEffect, useState} from "react";

import {Container, Table} from "react-bootstrap";
import {NavigationAzienda} from "../Azienda/NavigationAzienda";


function Temperature(){
    const {token,setToken}=useContext(TokenContext)
    const {agency,setAgency}=useContext(AgencyContext)
    const [dirty,setDirty]=useState(false)
    const [date,setDate]=useState(new Date())
    const [frigos,setFrigos]=useState([])
    const days=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
    const  months=['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno','Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre']



    useEffect(()=>{
        console.log(date)
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

    const refresh=()=>{
        setDirty(true)
    }


    return(<>
        <NavigationAzienda />
        <Container>
        <h3>Registrazione Temperature</h3>
            {!dirty?<Table striped bordered hover>
        <thead>
        <tr>
            <th>{months[date.getMonth()]}</th>
            {days.map(d=><th>{d}</th>)}
        </tr>
        </thead>
        <tbody>
        {frigos.map((f)=><SingleMonthTemp refresh={refresh} frigo={f} month={date.getMonth()} year={date.getFullYear()} />)}
        </tbody>




    </Table>:'Loading'}
        </Container>




    </>)

}

function SingleMonthTemp(props){

    const {token,setToken}=useContext(TokenContext)
    const [temp,setTemp]=useState([])

    const days=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]

    useEffect(()=> {
        fetch("/API/temperature/" + props.frigo.id + "/" + props.month + "/" + props.year, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return response.text().then(text => {
                return text ? JSON.parse(text) : null;
            })
        }).then((data) => {
            setTemp(data)
        }).catch()

    },[])

        const addTemp=(day)=>{
            const body={
                day:day,
                month:props.month,
                year:props.year
            }

            console.log(body)

            fetch("/API/temperature/"+props.frigo.id,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(body),
            }).then((response)=>{
                if(response.ok){
                    console.log("temperatura aggiunta corretamente")
                    props.refresh()

                }
            })
        }

        const deleteTemp=()=>{
            fetch("/API/temperature/"+props.frigo.id,{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }

            }).then((response)=>{
                if(response.ok){
                    console.log("temperatura eliminata corretamente")
                    props.refresh()

                }
            })

        }




    return(<>
        <tr><th>{props.frigo.name}</th>{days.map(d=><th onClick={()=>temp.map(t=>t.day).includes(d)?deleteTemp():addTemp(d)}>{temp.map(t=>t.day).includes(d)?'C':''}</th>)}</tr>


    </>)

}


export {Temperature}