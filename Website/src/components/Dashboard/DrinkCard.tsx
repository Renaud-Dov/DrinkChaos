import {FC, useEffect, useState} from "react";
import Button from "../_main/Button";
import {Drink, Price} from "../../interfaces/interfaces";
import {addTransaction, GetPrices} from "../../services/api";
import PriceButton from "../_main/PriceButton";
import toast from "react-hot-toast";
import {useContextProvider} from "../../services/data";

const DrinkCard: FC<{ drink: Drink }> = ({drink}) => {

    const [prices, setPrices] = useState<Price[]>([])

    const {drinks, token} = useContextProvider()


    useEffect(() => {
        GetPrices(drink.id, token).then((pricesData) => {
            // sort prices by date
            pricesData.sort((a, b) => {
                return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
            })
            // get 3 first prices
            pricesData = pricesData.slice(0, 3)
            // reverse prices
            pricesData = pricesData.reverse()
            setPrices(pricesData)
            console.log(drink.name + " prices: ", pricesData)
        }).catch((err) => {
            toast.error("Cannot get prices for " + drink.name)
            console.log(err)
        })
    }, [drinks])


    const onClick = (price: Price) => {
        addTransaction(price, token)
            .then(r => toast.success(`New transaction ${drink.name} for ${price.price}€`))
            .catch(err => toast.error(`Error while adding transaction ${drink.name} for ${price.price}€`))
    }


    return (
        <div className={`block p-6 w-64  rounded-2xl text-white bg-intenseBlue`}>

            <h5 className="my-3 text-2xl font-bold tracking-tight text-wrap truncate">
                {drink.name}
            </h5>
            {prices.length == 0 ?
                <span className="flex-1 text-white font-Exo2 mx-auto text-3xl">
                        Cannot access drinks data
                    </span> :
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-4xl mx-auto text-center
                                gap-5 justify-items-center">
                    {prices.map((price, key) => <PriceButton onClick={() => onClick(price)}
                                                             key={key}>{price.price}€</PriceButton>)}
                </div>
            }
        </div>
    );
};
export const LoadingDrinkCard: FC = () => {
    return (
        <div className="block p-6 w-64  rounded-2xl text-white bg-intenseBlue animate-pulse">
            <div className="w-16 h-16 rounded-full bg-darkBlue mx-auto"/>
            <div className="mb-2 w-28 h-4 rounded-sm bg-darkBlue mx-auto my-3"></div>
            <Button className="bg-darkBlue h-8 w-20 mt-3"/>
        </div>
    );
};
export default DrinkCard;
