export interface  Meta {
    participant: Participant;
    time: Time;
}
export interface Participant {
    username: string;
}
export interface Time {
    timePeriodStart: string;
    timePeriodEnd: string;
    day: string;
}