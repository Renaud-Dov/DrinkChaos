import {MenuIcon} from "@heroicons/react/solid";
import {Dispatch, SetStateAction} from "react";
// import {ReactComponent as Logo} from "../../img/logo.svg";

export default function DashboardHeader({className, mobileButton}:
                                            { className?: string, mobileButton: [boolean, Dispatch<SetStateAction<boolean>>] }) {
    const [showLeftPanelMobile, setShowLeftPanelMobile] = mobileButton;
    return (
        <header
            className={`flex md:hidden items-center px-12 py-2 flex-row-reverse justify-between text-white bg-darkBlue ${className}`}>
            <div className="w-32 py-4"/>
            {/*<Logo className="w-32 fill-white py-4"/>*/}
            <button className="block md:hidden" onClick={() => setShowLeftPanelMobile(!showLeftPanelMobile)}>
                <MenuIcon className="w-7 mx-6 hover:rotate-45 duration-150"/>
            </button>
        </header>
    )
}