import {FC, MouseEventHandler, ReactNode} from "react";

const Button: FC<{ children?: ReactNode, className?: string, onClick?: MouseEventHandler<HTMLButtonElement> | undefined }>
    = ({children, className = "", onClick = undefined}) => {
    return (
        <button onClick={onClick}
                className={`${className}  px-3 mx-auto py-1 rounded-md font-Inter text-base font-bold flex 
                            justify-center items-center`}>
            {children}
        </button>
    )
}

export default Button;
