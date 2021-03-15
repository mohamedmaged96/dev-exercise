import { Time } from "./Meta"

export interface Meta {
    type: string;
    identifier: string;
}

export interface Missing {
    amount: number;
    max: number;
    avr: number;
}
export interface Delay {
    amount: number;
    max: number;
    avr: number;
}
export interface Type {
    meta: Meta;
    time: Time;
    missing: Missing;
    delay: Delay;
}

export interface Category {
    meta: Meta;
    time: Time;
    missing: Missing;
    delay: Delay;
}

export interface MeasurementReport {
    types: Type[];
    categories: Category[];
}