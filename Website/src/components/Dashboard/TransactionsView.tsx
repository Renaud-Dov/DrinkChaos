// import {useEffect, useState} from "react";
import {useContextProvider} from "../../services/data";
import TransactionRow from "./TransactionRow";
import {timeFormat} from "../../util/timeFormat";
import React from "react";

const TransactionsView = () => {
    // const [state, setState] = useState<{ error?: boolean; loading: boolean; }>()

    const {transactions, last_refresh, time} = useContextProvider()


    return (
        <div className="relative flex-1 flex flex-col p-10 h-screen">
            <div className="flex flex-row justify-between items-center mb-5">
                <h1 className="text-3xl md:text-4xl font-bold text-white">Transactions</h1>
                <h2 className="text-lg md:text-2xl font-bold text-white">Last
                    update: {timeFormat(last_refresh, time)}</h2>
            </div>
            {transactions ? transactions.length === 0 ?
                    <span className="flex-1 text-white font-Exo2 mx-auto text-3xl">
                        Cannot access drinks data
                    </span>
                    :
                    <div className="flex flex-1 flex-col gap-5">
                        {transactions.map((transaction, key) => <TransactionRow transaction={transaction} key={key}/>)}
                    </div>
                :
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-4xl mx-auto text-center
                                gap-5 justify-items-center">
                    {/*{[...Array(6)].map((_, i) => <LoadingDrinkCard key={i}/>)}*/}
                </div>
            }

        </div>)
}

export default TransactionsView