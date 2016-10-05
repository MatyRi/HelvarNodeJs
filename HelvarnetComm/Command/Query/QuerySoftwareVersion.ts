import AQuery1 = require("./AQuery");

export class QuerySoftwareVersion extends AQuery1.AQuery {

    private command = 190;
    private version = 1;

    constructor() { super(); }

    toCommandTextString(): string {
        return `C:${this.command},V:${this.version}`;
    }

    
}