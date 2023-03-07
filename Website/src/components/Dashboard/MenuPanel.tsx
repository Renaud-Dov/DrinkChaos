import React, {ReactNode} from "react";
import {NavLink} from "react-router-dom";
import {ArrowNarrowLeftIcon, ChartBarIcon, HomeIcon, PaperAirplaneIcon, ShoppingCartIcon} from "@heroicons/react/solid";

const linkGrafana = "https://grafana.bugbear.fr/d/C195J7J4z/prices?orgId=3&refresh=30s&from=now-15m&to=now&theme=dark";

function MenuItem({children, link}:
                      { children: ReactNode, link: string, className?: string }) {
    const baseClass = "flex gap-3 items-center h-7 w-7"

    const activeClass = `text-white ${baseClass}`
    const inactiveClass = `text-textBlue hover:text-white ${baseClass}`

    return (<NavLink end to={link} className={({isActive}) => isActive ? activeClass : inactiveClass}>
        {children}
    </NavLink>)
}


export function MenuPanel() {
    return (
        <div
            className="overflow-y-auto bg-darkBlue flex flex-row md:flex-col md:min-h-screen p-5 justify-between">
            <div className="flex flex-row md:flex-col md:mt-5 gap-5">
                <MenuItem link={"/dashboard"}><HomeIcon/></MenuItem>
                <MenuItem link={"transactions"}><ShoppingCartIcon/></MenuItem>
                <a href={linkGrafana} target="_blank" className="h-7 w-7 text-textBlue hover:text-white"
                   rel="noreferrer">
                    <ChartBarIcon/>
                </a>
            </div>
            <div className="flex flex-row md:flex-col gap-5">
                <a href="mailto:contact@bugbear.fr?subject=%5BDrinkChaos%5D%20%2D%20"
                   className="h-7 w-7 text-textBlue hover:text-white rotate-90"><PaperAirplaneIcon/></a>
                <MenuItem link={"/logout"}><ArrowNarrowLeftIcon/></MenuItem>
            </div>
        </div>
    );
}