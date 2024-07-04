import {
    Button,
    Nav,
    Navbar,
    NavDropdown,
    NavItem,
    Offcanvas,
    OffcanvasBody,
    OffcanvasHeader,
    OffcanvasTitle
} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {CgProfile} from "react-icons/cg";
import {FcInvite} from "react-icons/fc";

import {VscAccount} from "react-icons/vsc";
import {AgencyContext, LogoutContext, TokenContext} from "../Contex/HaccpContext";
import {LoginModal} from "../Login";


const NavigationAzienda = () => {
    const navigate = useNavigate();
    const { token, setToken } = useContext(TokenContext);
    const {player,setPlayer}=useContext(AgencyContext)
    const logout = useContext(LogoutContext);
    const [show, setShow] = useState(false);
    const [showCanvas,setShowCanvas]=useState(false)

    const closeModal = () => {
        setShow(false);
    };

    const handleNavigation = (path) => {
        if (token) {
            navigate(path);
        } else {
            setShow(true);
        }
    };



    return (
        <>
            <Navbar bg="primary" variant="dark" expand="md">
                <Navbar.Brand onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                    HACCP Manager
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title={"Documentazione"}  >
                            <NavDropdown.Item onClick={() => handleNavigation('/fornitori')}>Fornitori</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => handleNavigation('/temperature')}>Temperature</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link onClick={() => handleNavigation('/players/edit')}>Profilo</Nav.Link>
                        <Nav.Link onClick={()=>handleNavigation("/attrezzature")} >Attrezzautre</Nav.Link>
                    </Nav>


                    {token ? (
                        <Button variant="outline-light" onClick={logout}>
                            <CgProfile size={20}/> Logout
                        </Button>
                    ) : (
                        <VscAccount  size={30} onClick={()=>setShow(true)}/>
                    )}
                </Navbar.Collapse>
            </Navbar>
            <LoginModal show={show} close={closeModal} />
        </>
    );
};

export { NavigationAzienda };