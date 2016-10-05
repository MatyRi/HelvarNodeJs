import AQuery1 = require("./AQuery");

export class QueryGroupPowerConsumption extends AQuery1.AQuery {

    private command = 161;
    private version = 1;

    group: number; // 1-16383

    constructor(group: number) {
        super();
        this.group = group;
    }

    toCommandTextString(): string {
        return `C:${this.command},V:${this.version},G${this.group}`;
    }

}