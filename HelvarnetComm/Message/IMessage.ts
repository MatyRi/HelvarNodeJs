export interface IMessage {
    getTag(): string;
    getAddTime(): number;
    setAddTime(time: number): void;
    resetAddTime(): void;
    incrementResendCounter(): void;
    getResendCounter(): number;
    toCommandString(): string;
    toLogFriendlyString(): string;
}