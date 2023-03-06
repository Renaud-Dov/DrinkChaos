import {Navigate, Outlet, useLocation} from "react-router-dom";
import {useState} from "react";
import DashboardHeader from "./DashboardHeader";
import {LeftPanel} from "./LeftPanel";
import {useContextProvider} from "../../services/data";

export default function Dashboard() {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const location = useLocation();

    const {token} = useContextProvider();


    // useEffect(() => {
    //   const debouncedHandleResize = debounce(() => {
    //     if (window.innerWidth > 768) setShowMobileMenu(false);
    //   }, 100);
    //   window.addEventListener("resize", debouncedHandleResize);
    // });
    // useEffect(() => {
    //   console.log("toto");
    //   setShowMobileMenu(false);
    // }, [location]);

    // useEffect(() => {
    //   if (isNil(guildId)) return;
    //   if (token && currentGuild && currentGuild.id === guildId) return;
    //   getGuild(token, guildId).then((guild) => {
    //     setCurrentGuild(guild);
    //   });
    // }, [token, currentGuild, guildId, setCurrentGuild]);

    return (
        <div className={`relative flex w-full min-h-screen flex-col `}>
            <DashboardHeader
                className={`${!showMobileMenu && ""}`}
                mobileButton={[showMobileMenu, setShowMobileMenu]}
            />

            <div className="relative flex flex-1 z-0">
                <LeftPanel
                    className={` ${showMobileMenu ? "flex-1" : "hidden md:flex sticky"}`}
                />
                {token != "" ? <Outlet/> : <Navigate to="/login"/>}
            </div>
        </div>
    );
}
