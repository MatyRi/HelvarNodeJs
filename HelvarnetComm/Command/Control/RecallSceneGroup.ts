import {AControlCommand} from "../AControlCommand";

export class RecallSceneGroup extends AControlCommand {

    private command = 11;
    private version = 1;

    group: number; // 1-16383
    block: number; // 1-8
    scene: number; // 1-16
    constantLight: boolean; //1-ON/0-OFF
    fadeTime: number; // 0-6553.5s

    constructor(group: number, block: number, scene: number, constantLight: boolean, fadeTime: number) {
        super();
        this.group = group;
        this.block = block;
        this.scene = scene;
        this.constantLight = constantLight;
        this.fadeTime = fadeTime; // 90 seconds = 9000;
    }

    toCommandTextString(): string {
        return `C:${this.command},V:${this.version},G${this.group},K:${this.constantLight},B:${this.block},S:${this.scene},F:${this.fadeTime}`;
    }

}