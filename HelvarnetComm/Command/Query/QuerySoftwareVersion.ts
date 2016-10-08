import {AQuery} from "./AQuery";

export class QuerySoftwareVersion extends AQuery {

    private command = 190;
    private version = 1;

    constructor() { super(); }

    toCommandTextString(): string {
        return `C:${this.command},V:${this.version}`;
    }

    
}