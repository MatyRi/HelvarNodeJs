import {IMessageCenter} from "./IMessageCenter";
import {IMessage} from "./IMessage";
import {AQuery} from "../Command/Query/AQuery";
import {IComm} from "../Comm/IComm";
import {UDPComm} from "../Comm/UDPComm";
import {IReply} from "../Command/IReply";

export class SimpleExclusiveMessageCenter implements IMessageCenter {

    static commandSign: string = '>';
    static internalCommandSign: string = '<';
    static replySign: string = '?';
    static diagnosticsSign: string = '!';
    static terminatorSign: string = "#";
    static partialTerminatorSign: string = "$";
    static answerChar: string = '=';

    
    sIpAddress: string;
    comm: IComm;

    messages: { [id: string]: MessageWrapper; } = {};
    promisses: { [id: string]: PromiseWrapper<IReply>; } = {};

    constructor(ipAddress: string) {
        this.sIpAddress = ipAddress;
        this.comm = new UDPComm(this, 50001);
    }



    getAddress(): string {
        return this.sIpAddress;
    }

    addResponse(message: string): void {

        var tag = this.getTag(message, SimpleExclusiveMessageCenter.answerChar);

        var request = this.messages[tag];
        var promiseWrap = this.promisses[tag];

        var data = this.getData(message);

        request.callback(data);
        //promiseWrap.promise.

        delete this.messages[tag];
    }

    start(): void {
        
    }

    addMessage(message: IMessage): void {
        this.sendString(message.toCommandString());
    }

    sendString(message: string): void {
        this.comm.sendString(message);
    }

    sendQuery<T extends AQuery, TU extends IReply>(request: T): Promise<TU> {
        var message = request.toCommandString();
        var promise = new Promise<TU>((resolve, error) => {
            
        }); // TODO
        var wrap = new PromiseWrapper<TU>(request, promise);
        var tag = this.getTag(message, SimpleExclusiveMessageCenter.terminatorSign);

        this.promisses[tag] = wrap;

        this.sendString(message);

        return promise;
    }

    sendQueryWithCallback<T extends AQuery>(request: T, callback: (result: string) => any): void {
        var message = request.toCommandString();
        var wrap = new MessageWrapper(request, callback);
        var tag = this.getTag(message, SimpleExclusiveMessageCenter.terminatorSign);

        this.messages[tag] = wrap;

        this.sendString(message);

    }

    close(): void {
        
    }  

    getTag(message: string, endSign: string): string {
        var splitIndex = message.indexOf(endSign);
        return message.substring(1, splitIndex);
    }

    getData(message: string): string {
        var startIndex = message.indexOf(SimpleExclusiveMessageCenter.answerChar);
        var endIndex = message.indexOf(SimpleExclusiveMessageCenter.terminatorSign);
        return message.substring(startIndex+1, endIndex);
    }

}

class MessageWrapper {

    request: AQuery;
    callback: (result: string) => any;

    constructor(request: AQuery, callback: (result: string) => any) {
        this.request = request;
        this.callback = callback;
    }

}

class PromiseWrapper<T> {

    request: AQuery;
    promise: Promise<T>;

    constructor(request: AQuery, promise: Promise<T>) {
        this.request = request;
        this.promise = promise;
    }

}