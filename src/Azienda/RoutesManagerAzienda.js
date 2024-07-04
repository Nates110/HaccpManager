import {Route, Routes, useNavigate} from "react-router-dom";
import {TokenContext, LogoutContext, AgencyContext, DirtyContext} from "../Contex/HaccpContext";
import {useEffect, useState} from "react";
import {LoginForm} from "../Login";
import {MainAzienda} from "./MainAzienda";
import {ProfiloAzienda} from "./ProfiloAzienda";
import {AgencyView} from "../Views";
import {AddFornitore, Fornitori} from "../Fornitori/FornitoreManagement";
import {Attrezzature} from "./Attrezzature";
import {Temperature} from "../Documentazione/Temperature";




function RoutesManagerAzienda() {

    const [token,setToken]=useState(localStorage.getItem("token")?localStorage.getItem("token") :"")
    const navigate=useNavigate()
    const [agency,setAgency]=useState(localStorage.getItem("agency")?JSON.parse(localStorage.getItem("agency")):'')
    const [dirty,setDirty]=useState(true)
    const logOut=()=>{

        setToken('')
        setAgency('')
        localStorage.clear()
        sessionStorage.clear()
        navigate("/")

    }

    useEffect(()=>{
        setToken(localStorage.getItem("token"))
        if(token!=='')
            fetch("/API/verify-token", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            }).then(response => {
                if (response.ok) {

                } else {
                    logOut()
                    navigate('')
                }
            })
        if(sessionStorage.getItem("token")==null){
            logOut()
            navigate('')
        }

    },[token])

    return(<>


            <TokenContext.Provider value={{token,setToken}}>
                <LogoutContext.Provider value={logOut}>
                    <AgencyContext.Provider value={{agency,setAgency}}>
                        <DirtyContext.Provider value={{dirty,setDirty}}>

                            <Routes>
                                <Route path={"/login"} element={<LoginForm />} />
                                <Route path={"/profile"} element={token? <ProfiloAzienda />: <LoginForm  />} />
                                <Route path={"/fornitori/add"} element={token? <AddFornitore />: <LoginForm  />}  />
                                <Route path={"/fornitori"} element={token? <Fornitori />: <LoginForm  />}  />
                                <Route path={"/attrezzature"} element={token ? <Attrezzature />  : <LoginForm />} />
                                <Route path={"/temperature"} element={token ? <Temperature />  : <LoginForm />} />
                                <Route path={"/"} element={token ? <MainAzienda />  : <LoginForm />} />



                            </Routes>
                        </DirtyContext.Provider>
                    </AgencyContext.Provider>
                </LogoutContext.Provider>
            </TokenContext.Provider>



        </>

    )
}

export {RoutesManagerAzienda}