export interface IComm {

    sendString(message: string);

    receiveString(message: string): void;

    end(): void;
}