import {LockClosedIcon} from "@heroicons/react/solid";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useContextProvider} from "../../services/data";
import {checkToken, postLogin} from "../../services/api";
import toast from "react-hot-toast";


export default function Login() {

    const [username, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();

    const {token, setToken, connected, setConnected} = useContextProvider();
    const formDone = () => {
        postLogin(username, password).then((token) => {
            setToken(token)
            toast.success("Login successful")
            // set token in navigator storage
            localStorage.setItem("token", token)
            setConnected(true)
            navigate("/dashboard")

        }).catch((err) => {
            console.log(err)
            toast.error("Login failed: Your username or password is incorrect, or you might not have permission to access this page.")
        })
    }

    useEffect(() => {
        const tokenStored = localStorage.getItem("token")
        if (tokenStored != null) {
            checkToken(tokenStored).then((res) => {
                setToken(tokenStored)
                navigate("/dashboard")
            }).catch((err) => {
                // token is invalid
                localStorage.removeItem("token")

            })
        }
    }, [])


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <div>
                        {/*<img*/}
                        {/*    className="mx-auto h-12 w-auto"*/}
                        {/*    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"*/}
                        {/*    alt="Your Company"*/}
                        {/*/>*/}
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
                            Sign in to your account
                        </h2>
                        <p className="mt-2 text-center text-sm text-white">
                            Or{' '}
                            <Link to="/signup" className="font-medium text-textBlue hover:text-secondaryBlue">
                                create a new account
                            </Link>
                        </p>
                    </div>
                    {/*<input type="hidden" name="remember" defaultValue="true"/>*/}
                    <div className="-space-y-px rounded-md shadow-sm mt-8 space-y-6">
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="Email address"
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <button type="submit" onClick={formDone}
                                className="group relative flex w-full justify-center rounded-md border border-transparent
                                    bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700
                                    focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true"/>
                </span>
                            Sign in
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}