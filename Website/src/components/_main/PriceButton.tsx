import {FC, MouseEventHandler, ReactNode} from "react";

const PriceButton: FC<{ children?: ReactNode, className?: string, onClick?: MouseEventHandler<HTMLButtonElement> | undefined }>
    = ({children, className = "", onClick = undefined}) => {
    return (
        <button onClick={onClick}
                className={`${className} w-min px-2 mx-auto py-1 rounded-md font-Inter text-base font-bold flex 
                            justify-center items-center bg-blue hover:bg-darkBlue`}>
            {children}
        </button>
    )
}

export default PriceButton;
