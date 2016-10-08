import {IComm} from "./IComm";
import {IMessageCenter} from "../Message/IMessageCenter";
import {UDPCommonListener} from "./UDPCommonListener";

export class UDPComm implements IComm {

    //private DatagramSocket clientSocket;
    public static DEFAULT_PORT: number = 50001;

    port: number;
    address: string;
    messageCenter: IMessageCenter;

    constructor(mc: IMessageCenter, port: number) {
        this.messageCenter = mc;
        this.port = port;
        UDPCommonListener.registerReceiver(mc.getAddress(), this);
        this.address = mc.getAddress();
    }

    public sendString(message: string) {
        const dgram = require('dgram');
        const client = dgram.createSocket('udp4');
        client.send(message,
            this.port,
            this.address,
            (err) => {
                client.close();
            });
    }

    public receiveString(message: string) {
        this.messageCenter.addResponse(message);
    }


    end(): void {};

}