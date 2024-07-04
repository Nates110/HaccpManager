import {useContext, useEffect, useState} from 'react';
import {Button, Form, Alert, Container, Modal, Col, Row, ListGroup, ListGroupItem} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {AgencyContext, TokenContext} from "./Contex/HaccpContext";
import {jwtDecode} from "jwt-decode";


function LoginForm(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userEmail,setUserEmail]=useState(localStorage.getItem("username")?localStorage.getItem("username"):"")
    const [message, setMessage] = useState(props.errorLogin);
    const {token,setToken}=useContext(TokenContext)
    const {agency,setAgency}=useContext(AgencyContext)
    const navigate=useNavigate()
    const [signIn,setSignIn]=useState(false)
    var role=""




    return (
        <>
            <Container>
                <ListGroup horizontal><ListGroupItem active={!signIn} onClick={()=>setSignIn(false)}>Login</ListGroupItem><ListGroupItem active={signIn} onClick={()=>setSignIn(true)}>SignIn</ListGroupItem></ListGroup>
                {!signIn? <LoginFormBody   />:<SignInFormBody />}

            </Container>
        </>
    )
}


function LoginFormBody(){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState('');
    const [userEmail,setUserEmail]=useState('')
    const [message, setMessage] = useState("");
    const {token,setToken}=useContext(TokenContext)
    const {agency,setAgency}=useContext(AgencyContext)
    const navigate=useNavigate()
    var role=""


    const saveUser=(data)=>{
        setAgency(data)
        localStorage.setItem("agency",JSON.stringify(data))
        console.log(token)

    }


    const validateLogin=(data)=>{

        setToken(data["jwt"])
        localStorage.setItem("token",data["jwt"])
        sessionStorage.setItem("token",data["jwt"])
        const tk = jwtDecode(data["jwt"]);
        setUserEmail(tk["email"])
        localStorage.setItem("email",tk["email"])
        localStorage.setItem("username",tk["preferred_username"])
        role =tk["realm_access"]["roles"].find((value)=> /^app_/.test(value))
        localStorage.setItem("role",role)
        fetch("/API/profiles/" + tk["email"], {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + data["jwt"]
            }
        })
            .then((response) => {
                if (response.ok) {
                    response.json().then((data) => saveUser(data))
                }
                else if(response.status===404){
                    navigate("/")
                }

            })

    }

    const handleSubmit = (event) => {
        setMessage('');
        //event.preventDefault();
        const credentials = { username, password };
        let validate = true;
        if (username==="" || password.length < 2)
            validate = false;
        if (validate) {
            const body={
                "username":username,
                "password":password
            }
            fetch('/API/login',{method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            })
                .then((response) => {
                    if(response.ok){
                        response.json().then((data) => validateLogin(data))
                        setMessage('');
                    }
                    else{
                        setMessage("Invalid Username or password");
                    }
                })
                .catch((error) => console.log(error));

        }
        else {
            setMessage("Invalid Username or password");
        }
    };


    return(
        <>
            <Form className="login" onKeyPress={event=> {if (event.key==="Enter"){ return handleSubmit()}}}>
                <Form.Group controlid='Username' className="loginField" >
                    <Form.Label>Username</Form.Label>
                    <Form.Control placeholder="username" type='email' value={username} onChange={ev => { setUsername(ev.target.value); setMessage("") }} />
                </Form.Group>
                <Form.Group controlid='Password' className="loginField">
                    <Form.Label>Password</Form.Label>
                    <Form.Control placeholder="password" type='password' value={password} onChange={ev => { setPassword(ev.target.value); setMessage("")}} />
                </Form.Group>
                {message && message !== '' && <Alert className="loginField" variant="danger">{message}</Alert>}
                <Button className="loginButton" onClick={handleSubmit}>Login</Button>
            </Form>
        </>



    )
}

function SignInFormBody(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState('');
    const [userEmail,setUserEmail]=useState("")
    const [message, setMessage] = useState("");
    const {token,setToken}=useContext(TokenContext)
    const {user,setUser}=useContext(AgencyContext)
    const navigate=useNavigate()
    var role=""

    const validateSignIn=(data)=>{

        setToken(data["jwt"])
        localStorage.setItem("token",data["jwt"])
        sessionStorage.setItem("token",data["jwt"])
        const tk = jwtDecode(data["jwt"]);
        setUserEmail(tk["email"])
        localStorage.setItem("email",tk["email"])
        localStorage.setItem("username",tk["preferred_username"])
        role =tk["realm_access"]["roles"].find((value)=> /^app_/.test(value))
        localStorage.setItem("role",role)
    }


    const handleSubmit=()=>{
        setMessage('');
        //event.preventDefault();
        const credentials = { username, password, userEmail };
        let validate = true;
        if (username==="" || password.length < 2)
            validate = false;
        if (validate) {
            const body={
                "username":username,
                "password":password,
                "email":userEmail.toLowerCase()
            }
            fetch('/API/user',{method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            })
                .then((response) => {
                    if(response.status===409){
                        setMessage("Username or email already used")
                    }

                    else if(response.ok){{
                        const body={
                            "username":username,
                            "password":password
                        }
                        fetch('/API/login',{method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(body),
                        }).then((response)=>{
                            if(response.ok){
                                response.json().then((data) => validateSignIn(data))
                                    .then(()=>navigate("/profiles/add"))
                                setMessage('');
                            }
                            else{
                                setMessage("Error");
                            }
                        }).catch((error) => console.log(error))
                    }}
                })
                .catch((error) => console.log(error));

        }
        else {
            setMessage("Invalid Username or password");
        }
    };

    return(
        <>
            <Form className="login" onKeyPress={event=> {if (event.key==="Enter"){ return handleSubmit()}}}>
                <Form.Group controlid='email' className="loginField" >
                    <Form.Label>Email</Form.Label>
                    <Form.Control placeholder="username" type='email' value={userEmail} onChange={ev => setUserEmail(ev.target.value)} />
                </Form.Group>
                <Form.Group controlid='Username' className="loginField" >
                    <Form.Label>Username</Form.Label>
                    <Form.Control placeholder="username" type='email' value={username} onChange={ev => { setUsername(ev.target.value); setMessage("") }} />
                </Form.Group>
                <Form.Group controlid='Password' className="loginField">
                    <Form.Label>Password</Form.Label>
                    <Form.Control placeholder="password" type='password' value={password} onChange={ev => { setPassword(ev.target.value); setMessage("") }} />
                </Form.Group>
                {message !== '' && <Alert className="loginField" variant="danger">{message}</Alert>}
                <Button className="loginButton" onClick={handleSubmit}>Login</Button>
            </Form>

        </>
    )
}


function LoginModal(props){

    const [signIn,setSignIn]=useState(false)


    return(
        <>
            <>
                <Modal show={props.show} onHide={props.close} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <ListGroup horizontal>
                                <ListGroupItem id={signIn?'onHoover':''} active={!signIn} onClick={()=>setSignIn(false)}> Login </ListGroupItem>
                                <ListGroupItem id={!signIn?'onHoover':''} active={signIn} onClick={()=>setSignIn(true)}> SignIn </ListGroupItem>
                            </ListGroup>
                        </Modal.Title>
                    </Modal.Header>
                    {
                        !signIn?<LoginBody errorLogin={props.errorLogin}  close={props.close} />:
                            <SignInBody errorLogin={props.errorLogin}  close={props.close}/>
                    }
                </Modal>
            </>


        </>




    )



}

function SignInBody(props){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState('');
    const [userEmail,setUserEmail]=useState("")
    const [message, setMessage] = useState(props.errorLogin);
    const {token,setToken}=useContext(TokenContext)
    const {user,setUser}=useContext(AgencyContext)
    const navigate=useNavigate()
    var role=""



    const validateSignIn=(data)=>{

        setToken(data["jwt"])
        localStorage.setItem("token",data["jwt"])
        sessionStorage.setItem("token",data["jwt"])
        const tk = jwtDecode(data["jwt"]);
        setUserEmail(tk["email"])
        localStorage.setItem("email",tk["email"])
        localStorage.setItem("username",tk["preferred_username"])
        role =tk["realm_access"]["roles"].find((value)=> /^app_/.test(value))
        localStorage.setItem("role",role)


    }


    const handleSubmit=()=>{
        setMessage('');
        //event.preventDefault();
        const credentials = { username, password, userEmail };
        let validate = true;
        if (username==="" || password.length < 2)
            validate = false;
        if (validate) {
            const body={
                "username":username,
                "password":password,
                "email":userEmail.toLowerCase()
            }
            fetch('/API/user',{method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            })
                .then((response) => {
                    if(response.status===409){
                        setMessage("Username or email already used")
                    }

                    else if(response.ok){{
                        const body={
                            "username":username,
                            "password":password
                        }
                        fetch('/API/login',{method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(body),
                        }).then((response)=>{
                            if(response.ok){
                                response.json().then((data) => validateSignIn(data))
                                    .then(()=>navigate("/profiles/add"))
                                    .then(props.close)
                                setMessage('');
                            }
                            else{
                                setMessage("Error");
                            }
                        }).catch((error) => console.log(error))
                    }}
                })
                .catch((error) => console.log(error));

        }
        else {
            setMessage("Invalid Username or password");
        }
    };


    return(<>
        <Modal.Body>
            <Form className="login" onKeyPress={event=> {if (event.key==="Enter"){ return handleSubmit()}}}>
                <Form.Group controlid='email' className="loginField" >
                    <Form.Label>Email</Form.Label>
                    <Form.Control placeholder="username" type='email' value={userEmail} onChange={ev => setUserEmail(ev.target.value)} />
                </Form.Group>
                <Form.Group controlid='Username' className="loginField" >
                    <Form.Label>Username</Form.Label>
                    <Form.Control placeholder="username" type='email' value={username} onChange={ev => { setUsername(ev.target.value); setMessage("") }} />
                </Form.Group>
                <Form.Group controlid='Password' className="loginField">
                    <Form.Label>Password</Form.Label>
                    <Form.Control placeholder="password" type='password' value={password} onChange={ev => { setPassword(ev.target.value); setMessage("") }} />
                </Form.Group>
                {message && message !== '' && <Alert className="loginField" variant="danger">{message}</Alert>}

            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={()=>{ props.close(); navigate("/")}}>Go Home</Button>
            <Button className="loginButton" onClick={handleSubmit}>SignIn</Button>
        </Modal.Footer>






    </>)




}


function LoginBody(props){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState('');
    const [userEmail,setUserEmail]=useState(localStorage.getItem("username")?localStorage.getItem("username"):"")
    const [message, setMessage] = useState(props.errorLogin);
    const {token,setToken}=useContext(TokenContext)
    const {user,setUser}=useContext(AgencyContext)
    const navigate=useNavigate()
    let role = "";


    const saveUser=(data)=>{
        setUser(data)
        localStorage.setItem("user",JSON.stringify(data))

    }



    useEffect(() => {
        setMessage(props.errorLogin);
    }, [props.errorLogin])

    const validateLogin=(data)=>{

        setToken(data["jwt"])
        localStorage.setItem("token",data["jwt"])
        sessionStorage.setItem("token",data["jwt"])
        const tk = jwtDecode(data["jwt"]);
        setUserEmail(tk["email"])
        localStorage.setItem("email",tk["email"])
        localStorage.setItem("username",tk["preferred_username"])
        role =tk["realm_access"]["roles"].find((value)=> /^app_/.test(value))
        localStorage.setItem("role",role)
        fetch(role==="app_user"?"/API/profiles/" + tk["email"]:"/API/expert/interns/" +tk["email"], {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + data["jwt"]
            }
        })
            .then((response) => {
                if (response.ok) {
                    response.json().then((data) => saveUser(data)).then(()=>navigate("/"))
                }
                else if(response.status===404){
                    navigate("/profiles/add")
                }

            })

    }

    const handleSubmit = (event) => {
        setMessage('');
        //event.preventDefault();
        const credentials = { username, password };
        let validate = true;
        if (username==="" || password.length < 2)
            validate = false;
        if (validate) {
            const body={
                "username":username,
                "password":password
            }
            fetch('/API/login',{method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            })
                .then((response) => {
                    if(response.ok){
                        response.json().then((data) => validateLogin(data)).then(props.close)
                        setMessage('');
                    }
                    else{
                        setMessage("Invalid Username or password");
                    }
                })
                .catch((error) => console.log(error));

        }
        else {
            setMessage("Invalid Username or password");
        }
    };

    return(<>
        <Modal.Body>
            <Form className="login" onKeyPress={event=> {if (event.key==="Enter"){ return handleSubmit()}}}>
                <Form.Group controlid='Username' className="loginField" >
                    <Form.Label>Username</Form.Label>
                    <Form.Control placeholder="username" type='email' value={username} onChange={ev => { setUsername(ev.target.value); setMessage("") }} />
                </Form.Group>
                <Form.Group controlid='Password' className="loginField">
                    <Form.Label>Password</Form.Label>
                    <Form.Control placeholder="password" type='password' value={password} onChange={ev => { setPassword(ev.target.value); setMessage("") }} />
                </Form.Group>
                {message && message !== '' && <Alert className="loginField" variant="danger">{message}</Alert>}

            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={()=>{ props.close(); navigate("/")}}>Go Home</Button>
            <Button className="loginButton" onClick={handleSubmit}>Login</Button>
        </Modal.Footer>

    </>)

}


function LogoutButton(props) {
    return (
        <Button onClick={props.logout}>Logout</Button>
    )
}


export { LoginForm, LogoutButton, LoginModal };