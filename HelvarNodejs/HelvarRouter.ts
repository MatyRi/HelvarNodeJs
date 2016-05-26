//import Command = require("Command/ACommand");
//import UdpSender = require("UDPSender");
import * as Command from "./Command/ACommand";
import * as UdpSender from "./UDPSender";
import Address = require("DeviceAddress");

export class HelvarRouter {
    sWgName: string;
    sSwVersion: string;
    sIpBroadcast: string;
    sIpGateway: string;
    sIpMask: string;
    sIpAddress: string;
    private gtin: Uint8Array;
    serialNumber: number;

    port = 50001;

    constructor(serialNumber: number, gtin: Uint8Array, sIpAddress: string, sIpMask: string, sIpGateway: string, sIpBroadcast: string, sSwVersion: string, sWgName: string) {
        this.sWgName = sWgName;
        this.sSwVersion = sSwVersion;
        this.sIpBroadcast = sIpBroadcast;
        this.sIpGateway = sIpGateway;
        this.sIpMask = sIpMask;
        this.sIpAddress = sIpAddress;
        this.gtin = gtin;
        this.serialNumber = serialNumber;
    }

    getAddress = (): Address.DeviceAddress => {
        return new Address.DeviceAddress(); // TODO
    }

    sendCommand(input: Command.ACommand) {
        var toSend = input.toCommandString();
        UdpSender.UDPSender.send(toSend, this.sIpAddress, this.port);
    }
}