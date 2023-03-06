export type Drink = {
    id: number;
    name: string;
    min_price: number;
    max_price: number;
    crisis_mode: boolean;
    crisis_price: number;
    description: string;
}

export type Price = {
    id: number | undefined;
    drink_id: number | undefined
    price: number;
    timestamp: string;
}

export type Transaction = {
    id: number;
    drink_id: number;
    price: number;
    timestamp: string;
}