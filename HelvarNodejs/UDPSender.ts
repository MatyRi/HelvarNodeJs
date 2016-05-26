export class UDPSender {



    static send(send: string, sIpAddress: string, port: number) {

        var dgram = require('dgram');
        var client = dgram.createSocket('udp4');

        var message = new Buffer(send);

        client.send(message, port, sIpAddress, (err) => { client.close() });

    }
}