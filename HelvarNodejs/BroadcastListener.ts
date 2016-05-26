import * as HelvarRouter from "./HelvarRouter";

export class BroadcastListenerClass {

    //var PORT = 4250;
    port: number;
    sys: IRouterProcessor;

    constructor(port: number, proc: IRouterProcessor) {
        this.port = port;
        this.sys = proc;
    }

    start() {
        var dgram = require("dgram");
        var server = dgram.createSocket("udp4");

        server.on("listening", () => {
            var address = server.address();
            console.log(`UDP Server listening on ${address.address}:${address.port}`);
        });

        server.on("message", (message, remote) => {
            var newHr = this.parseRouter(message);
            this.sys(newHr, remote);
        });

        server.bind(this.port);
    }

    parseRouter(data: Uint8Array) : HelvarRouter.HelvarRouter {

        //console.log("Parsing new router:");

        const iSerialNumber = this.byteArrayToLong([0x00, data[13], data[14], data[15]]);
        //console.log(` - Serial number: ${iSerialNumber}`);  

        const sIPAddress = (data[20] & 0xFF) + "." + (data[21] & 0xFF) + "." + (data[22] & 0xFF) + "." + (data[23] & 0xFF);
        const sIPMask = (data[24] & 0xFF) + "." + (data[25] & 0xFF) + "." + (data[26] & 0xFF) + "." + (data[27] & 0xFF);
        const sIPGateway = (data[28] & 0xFF) + "." + (data[29] & 0xFF) + "." + (data[30] & 0xFF) + "." + (data[31] & 0xFF);
        const sIPBroadcast = (data[32] & 0xFF) + "." + (data[33] & 0xFF) + "." + (data[34] & 0xFF) + "." + (data[35] & 0xFF);

        //console.log(` - Network settings: \n - - IP Address[${sIPAddress}] \n - - Mask[${sIPMask}] \n - - Gateway[${sIPGateway}] \n - - Broadcast[${sIPBroadcast}]`);

        const sSWVersion = (data[40] & 0xFF) + "." + (data[41] & 0xFF) + "." + (data[42] & 0xFF);
        //console.log(` - SW Version: ${sSWVersion}`);

        var wgNameData = data.slice(44, 88);

        var length = wgNameData.findIndex(d => d === 0);
        var sWgName = wgNameData.toString().substr(0, length);
        //console.log(` - WorkgroupName: ${sWgName}`);

        const GTIN = data.slice(92, 99);
 
        return new HelvarRouter.HelvarRouter(iSerialNumber, GTIN, sIPAddress, sIPMask, sIPGateway, sIPBroadcast, sSWVersion, sWgName);
    }

    byteArrayToLong = (byteArray): number => {
        var value = 0;
        for (var i = byteArray.length - 1; i >= 0; i--) {
            value = (value * 256) + byteArray[i];
        }

        return value;
    };
}

export interface IRouterProcessor {
    (router: HelvarRouter.HelvarRouter, source: Object) : void;
}
