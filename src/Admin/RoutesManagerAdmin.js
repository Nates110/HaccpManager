import {Route, Routes, useNavigate} from "react-router-dom";
import {TokenContext, LogoutContext, AgencyContext, DirtyContext} from "../Contex/HaccpContext";
import {useEffect, useState} from "react";
import {LoginForm} from "../Login";

import {MainAdmin} from "./MainAdmin";
import {AgencyView} from "../Views";




function RoutesManagerAdmin() {

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
                                <Route path={"/agencies"} element={<AgencyView /> }/>

                                <Route path={"/"} element={token ? <MainAdmin />  : <LoginForm />} />


                            </Routes>
                        </DirtyContext.Provider>
                    </AgencyContext.Provider>
                </LogoutContext.Provider>
            </TokenContext.Provider>



        </>

    )
}

export {RoutesManagerAdmin}