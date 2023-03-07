import {Navigate, Outlet} from "react-router-dom";
import {MenuPanel} from "./MenuPanel";
import {useContextProvider} from "../../services/data";

export default function DashboardLayout() {
    const {token} = useContextProvider();

    return (
        <div className={`relative flex w-full min-h-screen flex-col `}>
            <div className="relative flex flex-1 flex-col-reverse md:flex-row z-0">
                <MenuPanel/>
                {token != "" ? <Outlet/> : <Navigate to="/login"/>}
            </div>
        </div>
    );
}
