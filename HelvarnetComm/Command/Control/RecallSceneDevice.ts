﻿import {AControlCommand} from "../AControlCommand";
import {DeviceAddress} from "../../DeviceAddress";

export class RecallSceneDevice extends AControlCommand {

    private command = 12;
    private version = 1;

    address: DeviceAddress; // 1.2.3.4
    block: number; // 1-8
    scene: number; // 1-16
    fadeTime: number; // 0-6553.5s

    constructor(address: DeviceAddress, block: number, scene: number, fadeTime: number) {
        super();

        this.address = address;
        this.block = block;
        this.scene = scene;
        this.fadeTime = fadeTime; // 90 seconds = 9000;
    }

    toCommandTextString(): string {
        return `C:${this.command},V:${this.version},B:${this.block},S:${this.scene},F:${this.fadeTime},${this.address.toString()}`;
    }

}