import {Route, Routes, useNavigate} from "react-router-dom";
import {TokenContext, LogoutContext, AgencyContext, DirtyContext} from "./Contex/HaccpContext";
import {useEffect, useState} from "react";
import {RoutesManagerAdmin} from "./Admin/RoutesManagerAdmin";
import {RoutesManagerAzienda} from "./Azienda/RoutesManagerAzienda";




function MainRoutesManager() {

    const [token,setToken]=useState(localStorage.getItem("token")?localStorage.getItem("token") :"")
    const navigate=useNavigate()
    const [agency,setAgency]=useState(localStorage.getItem("agency")?JSON.parse(localStorage.getItem("agency")):'')
    const [dirty,setDirty]=useState(true)
    const role=localStorage.getItem("role")
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

                            {role==="app_manager"?<RoutesManagerAdmin />:
                            <RoutesManagerAzienda />}

                        </DirtyContext.Provider>
                    </AgencyContext.Provider>
                </LogoutContext.Provider>
            </TokenContext.Provider>



        </>

    )
}

export {MainRoutesManager}