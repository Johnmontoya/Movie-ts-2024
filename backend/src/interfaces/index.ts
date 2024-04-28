/* eslint-disable no-unused-vars */
export interface IRegisterUser {
    username: string;
    email: string;
    password?: string;
    role: number;
    status: number;
}

export interface ICreateUser {
    id?: number;
    username: string;
    email: string;
    password?: string;
}

export interface IUserPass {
    password: string;
}

// eslint-disable-next-line no-unused-vars
enum frecuency {
    DAY = 'day',
    WEEK = 'week',
    MONTH = 'month',
    YEAR = 'year'
}

export interface IPrice {
    usd: string;
    amount: number;
    interval: frecuency;
    namePlan: string;
}
