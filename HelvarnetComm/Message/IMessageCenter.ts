import Message = require("./IMessage");
import Query = require("../Command/Query/AQuery");

export interface IMessageCenter {
    getAddress(): string;
    addResponse(message: string): void;
    start(): void;
    addMessage(message: Message.IMessage): void;
    sendQuery<T extends Query.AQuery>(request: T): T;
    sendQueryWithCallback<T extends Query.AQuery>(request: T, callback: (result: string) => any): void;
    close(): void;
}