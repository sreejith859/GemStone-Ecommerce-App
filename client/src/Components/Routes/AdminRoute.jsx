import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "./Spinner";
import { REACT_APP_API } from "../Constant/Constant";
import { useAuth } from "../Context/Auth";


export default function AdminRoute() {
    const [ok, setOk] = useState(false)
    const [auth, setAuth] = useAuth()

    useEffect(() => {
        const authCheck = async () => {
            const res = await axios.get(`${REACT_APP_API}/api/v1/auth/admin-auth`)
            if(res.data.ok){
                setOk(true)
            }else{
                setOk(false)
            }
        }
        if(auth?.token) authCheck()
    }, [auth?.token]);
    return ok ? <Outlet /> : <Spinner path=""/> ;

}