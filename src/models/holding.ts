export interface Holding {
    id?: string,
    userId: string,
    coin: {
        name: string,
        symbol: string
    }
    value?: number,
    amount: number,
    index?: number;
}