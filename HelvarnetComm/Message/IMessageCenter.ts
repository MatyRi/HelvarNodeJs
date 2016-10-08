import {IMessage as Message} from "./IMessage";
import {AQuery} from "../Command/Query/AQuery";
import {IReply} from "../Command/IReply";


export interface IMessageCenter {
    getAddress(): string;
    addResponse(message: string): void;
    start(): void;
    addMessage(message: Message): void;
    sendQuery<T extends AQuery, TU extends IReply>(request: T): Promise<TU>;
    sendQueryWithCallback<T extends AQuery>(request: T, callback: (result: string) => any): void;
    close(): void;
}