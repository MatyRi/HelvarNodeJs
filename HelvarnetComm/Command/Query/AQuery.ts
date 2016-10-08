import {ACommand} from "../ACommand";
import {IQuery} from "./IQuery";

export abstract class AQuery extends ACommand implements IQuery
{

    constructor() { super(); }

}