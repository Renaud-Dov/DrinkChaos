import {ReactNode} from "react";
import {Link} from "react-router-dom";
import DashboardIcon from "../../img/icons/Export_Dashboard_Blue.png"
import SettingsIcon from "../../img/icons/Export_Settings_Blue.png"
import PriceButton from "../_main/PriceButton";
import {useContextProvider} from "../../services/data";

function MenuItem({children, link, icon, className}:
                      { children: ReactNode, link: string, icon: string, className?: string }) {
    return (<Link to={link} className={`flex gap-3 items-center ${className}`}>
        <img src={icon} alt=""/>
        {children}
    </Link>)
}


export function LeftPanel({className}: { className?: string }) {
    const {drinks, setDrinks, refresh} = useContextProvider();

    return <div className={`flex mx-auto flex-col bg-darkBlue font-Exo2 ${className}`}>
        <div className="overflow-y-auto mx-auto text-white flex flex-col gap-4 w-1/6 min-w-fit p-3">
            <PriceButton onClick={() => refresh()} className="bg-secondaryBlue my-2  hover:bg-primaryBlue">Refresh
                Data</PriceButton>
            <div className="grid grid-cols-2 md:grid-cols-1 text-textBlue flex-col gap-5 md:gap-3 ml-3">
                <MenuItem link="" icon={DashboardIcon}>Dashboard</MenuItem>
                <MenuItem link="transactions" icon={SettingsIcon}>Transactions</MenuItem>
                {/*<MenuItem link="drinks" icon={SettingsIcon}>Drinks</MenuItem>*/}
                <a href="https://grafana.bugbear.fr/d/C195J7J4z/prices?orgId=3&refresh=30s&from=now-15m&to=now&theme=dark"
                   target="_blank" className="flex gap-3 items-center" rel="noreferrer">
                    <img src={SettingsIcon} alt=""/>
                    Grafana
                </a>
            </div>
        </div>
    </div>
}