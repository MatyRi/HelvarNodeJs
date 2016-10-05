import Command = require("../ACommand");
import Query = require("./IQuery");

export abstract class AQuery extends Command.ACommand implements Query.IQuery
{
    constructor() { super(); }
}