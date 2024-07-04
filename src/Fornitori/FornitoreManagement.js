import {useContext, useEffect, useState} from "react";
import {AgencyContext, TokenContext} from "../Contex/HaccpContext";
import {NavigationAzienda} from "../Azienda/NavigationAzienda";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Col,
    Container,
    Form,
    ListGroup,
    ListGroupItem,
    Row
} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import '../App.css';



function Fornitori(){

    const [fornitori,setFornitori]=useState([])
    const {token,setToken}=useContext(TokenContext)
    const {agency,setAgency}=useContext(AgencyContext)

    const navigate=useNavigate()



    useEffect(()=>{

        fetch("API/fornitori/"+agency.email, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }).then((response)=>{
            if(!response.ok){
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return response.text().then(text => {
                return text ? JSON.parse(text) : null;
            })
            }).then((data)=>{
            setFornitori(data)
        }).catch()




    },[agency.email, token])



    return(<>
        <NavigationAzienda />
        <Container>
            {fornitori!==null? <ListGroup>{fornitori.map(f=><Fornitore fornitore={f} />)}</ListGroup>
            :<h2>Non sono presenti fornitori</h2>}
            <Button onClick={()=>navigate("/fornitori/add")}>Aggiungi fornitore</Button>




        </Container>







    </>)



}




function Fornitore(props){



return(<>

    <ListGroupItem className="mb-3">
        <Card className="shadow-sm">
            <CardHeader className="bg-primary text-white">
                Ragione Sociale: {props.fornitore.ragioneSociale}
            </CardHeader>
            <CardBody>
                <Row className="mb-2">
                    <Col md={4}>
                        <strong>P.IVA:</strong> {props.fornitore.piva}
                    </Col>
                    <Col md={4}>
                        <strong>Sede Legale:</strong> {props.fornitore.sedeLegale}
                    </Col>
                    <Col md={4}>
                        <strong>Sede Operativa:</strong> {props.fornitore.sedeOperativa}
                    </Col>
                </Row>

                <Row className="mb-2">
                    <Col md={4}>
                        <strong>Tel.:</strong> {props.fornitore.phoneNumber}
                    </Col>
                    <Col md={4}>
                        <strong>Fax:</strong> {props.fornitore.fax}
                    </Col>
                    <Col md={4}>
                        <strong>Email:</strong> {props.fornitore.email}
                    </Col>
                </Row>

                <Row className="mb-2">
                    <Col md={6}>
                        <strong>Prodotti alimentari:</strong> {props.fornitore.prodotti}
                    </Col>
                    <Col md={6}>
                        <strong>Servizi:</strong> {props.fornitore.servizi}
                    </Col>
                </Row>
            </CardBody>
            <CardFooter className="bg-light">
                <Row>
                    <Col md={10}>
                        <strong>Referente:</strong> {props.fornitore.referente}
                    </Col>
                    <Col md={2}><Button disabled>Modifica</Button></Col>
                </Row>
            </CardFooter>
        </Card>
    </ListGroupItem>



</>)


}



function AddFornitore(){
const {token,setToken}=useContext(TokenContext)
    const {agency,setAgency}=useContext(AgencyContext)
    const [ragioneSociale,setRagioneSociale]=useState('')
    const [piva,setPiva]=useState('')
    const [sedeLegale,setSedeLegale]=useState('')
    const [sedeOperativa,setSedeOperativa]=useState('')
    const [tel,setTel]=useState('')
    const [fax,setFax]=useState('')
    const [email,setEmail]=useState('')
    const [referente,setReferente]=useState('')
    const [prodotti,setProdotti]=useState([])
    const [servizi,setServizi]=useState([])
    const navigate=useNavigate()

    const prodList=['prodotti da Bar','Gelati','bibite alla spina','rosticceria','pasticceria','bevande','altro']
    const servList=['disinfestazione','rifiuti e/o sottoprodotti',
        'MOCA (materiale e oggietti a contatto con gli alimenti','ass. tecnica machinari', 'detergenti e disinfettanti','carta']


    const handleProducts=(p)=>{
        if (prodotti.includes(p)){
            setProdotti(prodotti.filter((t)=>t!==p))
        }
        else{
            setProdotti([...prodotti,p])
        }

    }

    const handleServices=(s)=>{
        if (servizi.includes(s)){
            setServizi(prodotti.filter((t)=>t!==s))
        }
        else{
            setServizi([...servizi,s])
        }

    }

    const handleSubmit=()=>{

        const body={
            email:email,
            fax:fax,
            phoneNumber:tel,
            piva:piva,
            prodotti:prodotti.toString(),
            ragioneSociale:ragioneSociale,
            referente:referente,
            sedeLegale:sedeLegale,
            sedeOperativa:sedeOperativa,
            servizi:servizi.toString()




        }
        console.log(body)

        fetch("/API/fornitori/"+agency.email,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(body),
        }).then((response)=>{
            if(response.ok){
                console.log("fornitore aggiunto corretamente")
                navigate("/fornitori")
            }
        })




    }



    return(<Container>
        <h2 className="my-4">Informazioni Aziendali</h2>
        <Form>
            <Row className="mb-3">
                <Col md={6}>
                    <Form.Group>
                        <Form.Label>Ragione Sociale</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Inserisci la ragione sociale"
                            value={ragioneSociale}
                            onChange={(event) => setRagioneSociale(event.target.value)}
                        />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group>
                        <Form.Label>P.IVA/C.F.</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Inserisci la P.IVA o C.F."
                            value={piva}
                            onChange={(event) => setPiva(event.target.value)}
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Row className="mb-3">
                <Col md={6}>
                    <Form.Group>
                        <Form.Label>Sede Legale</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Inserisci la sede legale"
                            value={sedeLegale}
                            onChange={(event) => setSedeLegale(event.target.value)}
                        />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group>
                        <Form.Label>Sede Operativa</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Inserisci la sede operativa"
                            value={sedeOperativa}
                            onChange={(event) => setSedeOperativa(event.target.value)}
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Row className="mb-3">
                <Col md={6}>
                    <Form.Group>
                        <Form.Label>Telefono</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Inserisci il numero di telefono"
                            value={tel}
                            onChange={(event) => setTel(event.target.value)}
                        />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group>
                        <Form.Label>Fax</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Inserisci il numero di fax"
                            value={fax}
                            onChange={(event) => setFax(event.target.value)}
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Row className="mb-3">
                <Col md={6}>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Inserisci l'email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group>
                        <Form.Label>Referente</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Inserisci il nome del referente"
                            value={referente}
                            onChange={(event) => setReferente(event.target.value)}
                        />
                    </Form.Group>
                </Col>
            </Row>

           <Row>
               <Col md={6}>
                   <h3 className="my-4">Prodotti</h3>
            {prodList.map((p, index) => (
                <Form.Check
                    key={index}
                    checked={prodotti.includes(p)}
                    onChange={() => handleProducts(p)}
                    label={p}
                    className="mb-2"
                />
            ))}
               </Col>
               <Col md={6}>
            <h3 className="my-4">Servizi</h3>
            {servList.map((s, index) => (
                <Form.Check
                    key={index}
                    checked={servizi.includes(s)}
                    onChange={() => handleServices(s)}
                    label={s}
                    className="mb-2"
                />
            ))}
               </Col>

           </Row>

            <Button variant="primary" onClick={()=>handleSubmit()} className="mt-4">
                Invia
            </Button>
        </Form>
    </Container>)
}







export{Fornitori,AddFornitore}