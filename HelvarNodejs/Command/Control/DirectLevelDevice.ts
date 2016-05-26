import ControlCommand = require("../AControlCommand");

export class DirectLevelDevice extends ControlCommand.AControlCommand {

    private command = 14;
    private version = 1;

    level: number;
    address: string;
    fadeTime: number;

    constructor(level: number, address: string, fadeTime?: number) {
        super();
        this.level = level;
        this.address = address;
        this.fadeTime = fadeTime;
    }

    toCommandString(): string {
        return `C:${this.command},V:${this.version},@${this.address},L:${this.level},F:${this.fadeTime}`;
    }

}