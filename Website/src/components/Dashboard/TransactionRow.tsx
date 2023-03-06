import {FC} from "react";
import Button from "../_main/Button";
import {Transaction} from "../../interfaces/interfaces";
import {useContextProvider} from "../../services/data";

const TransactionRow: FC<{ transaction: Transaction }> = ({transaction}) => {


    const {drinks} = useContextProvider()

    // const onClick = (price: Price) => {
    //     addTransaction(price)
    //         .then(r => toast.success(`New transaction ${drink.name} for ${price.price}€`))
    //         .catch(err => toast.error(`Error while adding transaction ${drink.name} for ${price.price}€`))
    // }

    const findDrink = (id: number) => {
        let drink = drinks.find(drink => drink.id == id)
        return drink
    }

    const formatDate = (timestamp: string) => {
        let date = new Date(timestamp)
        // return date + time in format dd/mm/yyyy hh:mm
        return date.toLocaleDateString() + " " + date.toLocaleTimeString()
    }


    return (
        <div className={`flex p-2 gap-4   items-center w-full rounded-2xl text-white bg-intenseBlue`}>

            <p className="w-12">{transaction.price}€</p>
            <p className="w-1/2">{findDrink(transaction.drink_id)?.name}</p>
            <p className="">{formatDate(transaction.timestamp)}</p>

            <Button className="bg-secondaryBlue">Delete</Button>
        </div>

    );
};

export default TransactionRow;
