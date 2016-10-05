import MessageCenter = require("./IMessageCenter");
import Message = require("./IMessage");
import Query = require("../Command/Query/AQuery");
import Comm = require("../Comm/IComm");
import UdpComm = require("../Comm/UDPComm");
import Message1 = Message.IMessage;

export class SimpleExclusiveMessageCenter implements MessageCenter.IMessageCenter {

    static commandSign: string = '>';
    static internalCommandSign: string = '<';
    static replySign: string = '?';
    static diagnosticsSign: string = '!';
    static terminatorSign: string = "#";
    static partialTerminatorSign: string = "$";
    static answerChar: string = '=';

    
    sIpAddress: string;
    comm: Comm.IComm;

    messages: { [id: string]: MessageWrapper; } = {};

    constructor(ipAddress: string) {
        this.sIpAddress = ipAddress;
        this.comm = new UdpComm.UDPComm(this, 50001);
    }



    getAddress(): string {
        return this.sIpAddress;
    }

    addResponse(message: string): void {

        var tag = this.getTag(message, SimpleExclusiveMessageCenter.answerChar);

        var request = this.messages[tag];

        var data = this.getData(message);

        request.callback(data);

        delete this.messages[tag];
    }

    start(): void {
        
    }

    addMessage(message: Message1): void {
        this.sendString(message.toCommandString());
    }

    sendString(message: string): void {
        this.comm.sendString(message);
    }

    sendQuery<T extends Query.AQuery>(request: T): T {
        return null;
    }

    sendQueryWithCallback<T extends Query.AQuery>(request: T, callback: (result: string) => any): void {
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

    request: Query.AQuery;
    callback: (result: string) => any;

    constructor(request: Query.AQuery, callback: (result: string) => any) {
        this.request = request;
        this.callback = callback;
    }

}