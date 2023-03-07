// import {useEffect, useState} from "react";
import {useContextProvider} from "../../services/data";
import React from "react";
import DrinkCard from "./DrinkCard";
import {timeFormat} from "../../util/timeFormat";

const DrinkView = () => {
    const {drinks, last_refresh, time} = useContextProvider();



    return (
        <div className="relative flex-1 h-full flex flex-col p-10">
            <div className="flex flex-row justify-between items-center mb-5">
                <h1 className="text-3xl md:text-4xl font-bold text-white">Dashboard</h1>
                <h2 className="text-lg md:text-2xl font-bold text-white">Last
                    update: {timeFormat(last_refresh, time)}</h2>
            </div>
            {drinks.length === 0 ?
                <span className="flex-1 text-white font-Exo2 mx-auto text-3xl">
                        Cannot access drinks data
                    </span>
                :
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-4xl mx-auto text-center
                                gap-5 justify-items-center">
                    {drinks.map((drink, key) => <DrinkCard drink={drink} key={key}/>)}
                </div>
            }

        </div>)
}

export default DrinkView