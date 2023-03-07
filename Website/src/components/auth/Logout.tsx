import {Navigate} from "react-router-dom";
import {useEffect} from "react";
import {useContextProvider} from "../../services/data";


export default function Logout() {
    const {setToken} = useContextProvider();

    useEffect(() => {
        localStorage.removeItem("token")
        setToken("")
    }, [])

    return <Navigate to={"/"}/>
}