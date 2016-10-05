import MessageCenter = require("./IMessageCenter");
import Message = require("./IMessage");
import Query = require("../Command/Query/AQuery");
import Comm = require("../Comm/IComm");
import UdpComm = require("../Comm/UDPComm");

export class SimpleExclusiveMessageCenter implements MessageCenter.IMessageCenter {

    sIpAddress: string;
    comm: Comm.IComm;

    constructor(ipAddress: string) {
        this.sIpAddress = ipAddress;
        this.comm = new UdpComm.UDPComm(this, 50001);
    }



    getAddress(): string {
        return this.sIpAddress;
    }

    addResponse(message: string): void {
        
    }

    start(): void {
        
    }

    addMessage(message: Message.IMessage): void {
        this.comm.sendString(message.toCommandString());
    }

    sendQuery<T extends Query.AQuery>(request: T): T {
        return null;
    }

    close(): void {
        
    }

}