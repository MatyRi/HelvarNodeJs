import ControlCommand = require("../AControlCommand");
import Address = require("../../DeviceAddress");
import DeviceAddress = Address.DeviceAddress;

export class DirectLevelDevice extends ControlCommand.AControlCommand {

    private command = 14;
    private version = 1;

    level: number;
    address: Address.DeviceAddress;
    fadeTime: number;

    constructor(level: number, address: DeviceAddress, fadeTime?: number) {
        super();
        this.level = level;
        this.address = address;
        this.fadeTime = fadeTime;
    }

    toCommandTextString(): string {
        return `C:${this.command},V:${this.version},@${this.address},L:${this.level},F:${this.fadeTime}`;
    }

}