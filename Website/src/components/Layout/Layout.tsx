import React, {FC, ReactNode} from "react";
import {Toaster} from "react-hot-toast";

const Layout: FC<{ children: ReactNode }> = ({children}) => {
    return (
        <main className="bg-blue">
            <Toaster
                position="bottom-right"
                reverseOrder={false}
                toastOptions={{
                    duration: 5000,
                    style: {
                        borderRadius: '50px',

                    },
                    success: {
                        style: {
                            background: '#5073EE',
                            // background: '#333',
                            color: '#fff'
                        }
                    }
                }}
            />
            {children}
        </main>
    );
};

export default Layout;
