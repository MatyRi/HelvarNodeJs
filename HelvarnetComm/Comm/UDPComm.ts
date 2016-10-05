import Comm = require("./IComm");
import MessageCenter = require("../Message/IMessageCenter");
import UdpCommonListener = require("./UDPCommonListener");
import Center = MessageCenter.IMessageCenter;
import CommonListener = UdpCommonListener.UDPCommonListener;

export class UDPComm implements Comm.IComm {

    //private DatagramSocket clientSocket;
    public static DEFAULT_PORT: number = 50001;

    port: number;
    address: string;
    messageCenter: Center;

    constructor(mc: Center, port: number) {
        this.messageCenter = mc;
        this.port = port;
        CommonListener.registerReceiver(mc.getAddress(), this);
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