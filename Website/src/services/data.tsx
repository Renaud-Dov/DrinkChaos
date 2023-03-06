import {Drink, Transaction} from "../interfaces/interfaces";
import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {GetDrinks, getTransactions} from "./api";
import toast from "react-hot-toast";

type ContextType = {
    drinks: Drink[];
    setDrinks: (drinks: Drink[]) => void;

    transactions: Transaction[];
    setTransactions: (transactions: Transaction[]) => void;

    token: string;
    setToken: (token: string) => void;

    refresh: () => void;

    last_refresh: Date;
    time: Date;

    connected: boolean;
    setConnected: (connected: boolean) => void;

}

const Context = createContext<ContextType>({} as ContextType);

const Provider = ({children}: { children: ReactNode }) => {
        const [drinks, setDrinks] = useState<Drink[]>([]);
        const [transactions, setTransactions] = useState<Transaction[]>([]);
        const [token, setToken] = useState<string>("");
        const [last_refresh, setLastRefresh] = useState<Date>(new Date());
    const [time, setTime] = useState<Date>(new Date());
    const [connected, setConnected] = useState<boolean>(false);

        const refresh = () => {
            // setDrinks([])
            // setTransactions([])
            const fetchData = async () => {
                const drinks = await GetDrinks(token)
                setDrinks(drinks)

                let transactions = await getTransactions(token)
                // invert transactions
                transactions = transactions.reverse()
                setTransactions(transactions)
            }

            fetchData().catch((err) => {
                console.log(err, token)
                toast.error("Cannot access data. Disconnecting...")
                setToken("")
                setConnected(false);
                return;
            }).then(() => {
                console.log("fetching drinks done")
                console.log(drinks)
                setConnected(true)
            })
            setLastRefresh(new Date())
        }

        useEffect(() => {
            console.log("token: ", token)
            if (token != "") {
                refresh()
                const interval = setInterval(() => {
                    refresh()
                }, 20000);
                return () => clearInterval(interval);
            }
        }, [token])

        useEffect(() => {
            const interval = setInterval(() => {
                setTime(new Date())
            }, 1000);
            return () => clearInterval(interval);
        }, [])

        return (
            <Context.Provider
                value={{
                    drinks,
                    setDrinks,
                    transactions,
                    setTransactions,
                    refresh,
                    token,
                    setToken,
                    last_refresh,
                    time,
                    connected,
                    setConnected
                }}>
                {children}
            </Context.Provider>
        );
    }
;

const useContextProvider = () => useContext(Context);


export {Provider, useContextProvider};