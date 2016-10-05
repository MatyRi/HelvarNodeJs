import Message = require("../Message/IMessage");
import Error = require("./IError");
import Diagnostics = require("../EDiagnostics");
import EDiagnostics = Diagnostics.EDiagnostics;

export abstract class ACommand implements Message.IMessage, Error.IError {

    error: EDiagnostics = EDiagnostics.UNKNOWN;

    constructor() {}

    abstract toCommandTextString(): string;

    public toCommandString(): string {
        return `>${this.toCommandTextString()}#`;
    }

    setErrorFromString(input: string): void {
        var numericValue = Number(input);
        this.setError(numericValue);
    }

    setErrorFromNumber(input: number): void {
        this.error = input as EDiagnostics;
    }

    setError(input: EDiagnostics): void {
        this.error = input;
    }

    getError(): EDiagnostics {
        return this.error;
    }


	//////////////////////////////////////////////////// IMESSAGE ////////////////////////////////
	
	
	addTime: number;
	resendCounter: number = 0;

	tag: string;

    getTag(): string
    {
        if (this.tag == null) {
            var msg = toString();
            if (msg.indexOf("=") > 1) {
                this.tag = msg.substring(0, msg.indexOf("="));
            }
            this.tag = msg;
        }

        return this.tag;
    }

    getAddTime(): number
    {
        return this.addTime;
    }

    setAddTime(addTime: number): void
    {
        this.addTime = addTime;
    }

    resetAddTime(): void
    {
        this.addTime = 0;
    }

    incrementResendCounter(): void
    {
        this.resendCounter++;
    }

    getResendCounter(): number
    {
        return this.resendCounter;
    }
  

    toLogFriendlyString(): string
    {
        return `[${toString()}]`;
    }
  
	isSuccess(): boolean {
        return this.getError() === EDiagnostics.SUCCESS;
    }
	
	isUnknown(): boolean {
        return this.getError() === EDiagnostics.UNKNOWN;
    }
}