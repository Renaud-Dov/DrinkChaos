import axios from "axios";
import {Drink, Price, Transaction} from "../interfaces/interfaces";

const url = process.env.REACT_APP_API_URL || "";
const GetDrinks: (token: string) => Promise<Drink[]> = async (token) => {
    const drinks = await axios.get<Drink[]>(`${url}api/v1/products`, {
        headers: {
            'Authorization': `Basic ${token}`
        }
    })

    if (drinks === undefined) {
        return [];
    }
    return drinks.data;
}

// methode GetPrice that take a drink id and return a price

const GetPrices: (id: number, token: string) => Promise<Price[]> = async (id, token) => {
    const price = await axios.get<Price[]>(`${url}api/v1/products/${id}`, {
        headers: {
            'Authorization': `Basic ${token}`
        }
    })

    if (price === undefined) {
        return [];
    }
    return price.data;
}

const addTransaction: (price: Price, token: string) => Promise<any> = async (price, token) => {
    await axios.post<Price>(`${url}api/v1/transactions`, price, {
        headers: {
            'Authorization': `Basic ${token}`
        }
    });
}

const getTransactions: (token: string) => Promise<Transaction[]> = async (token) => {
    // add offset and limit

    const transactions = await axios.get<Transaction[]>(`${url}api/v1/transactions`, {
        params: {
            offset: 0,
            limit: 1000
        },
        headers: {
            'Authorization': `Basic ${token}`
        }
    });
    if (transactions === undefined) {
        return [];
    }
    return transactions.data;
}

const postLogin: (username: string, password: string) => Promise<any> = async (username, password) => {
    // set basic auth
    const login = await axios.post<{ token: string }>(`${url}api/v1/auth/login`, {},
        {
            auth: {
                username: username,
                password: password
            }
        });
    if (login === undefined) {
        return "";
    }
    return login.data.token;
}

const signup: (username: string, password: string) => Promise<any> = async (username, password) => {
    // set basic auth
    const signup = await axios.post<{ token: string }>(`${url}api/v1/auth/signup`, {},
        {
            auth: {
                username: username,
                password: password
            }
        });
    if (signup === undefined) {
        return "";
    }
    return signup.data.token;
}

const checkToken: (token: string) => Promise<boolean> = async (token) => {
    const check = await axios.get<{ token: string }>(`${url}api/v1/auth/token`, {
        headers: {
            'Authorization': `Basic ${token}`
        }
    });
    // return true if 200
    return check.status === 200;
}

export {GetDrinks, GetPrices, addTransaction, getTransactions, postLogin, signup, checkToken};