import MessageCenter = require("./Message/IMessageCenter");
import Query = require("./Command/Query/AQuery");
import Diagnostics = require("./EDiagnostics");
import EDiagnostics = Diagnostics.EDiagnostics;
import ExclusiveMessageCenter = require("./Message/SimpleExclusiveMessageCenter");
import Command = require("./Command/ACommand");

export class Connector {

    sIpAddress: string;
    messanger: MessageCenter.IMessageCenter;

    constructor(ipAddress: string) {
        this.sIpAddress = ipAddress;
        this.messanger = new ExclusiveMessageCenter.SimpleExclusiveMessageCenter(ipAddress);

    }

    /*sendQuery<T extends Query.AQuery>(request: T): T {
        if (this.messanger != null) {
            try {
                var result = this.messanger.sendQuery<Query.AQuery>(request);

                if (result.isSuccess()) {
                    return result as T;
                }
                else {
                    throw new Error(result.toLogFriendlyString());
                }
            } catch (error) {
                console.log("Request [" + request.toLogFriendlyString() + "] was cancelled: " + error);
                request.setError(EDiagnostics.TIMEOUT);
                return request;
            }
        } else {
            console.log("Router has not assigned sender!");
            request.setError(EDiagnostics.NOTDELIVERED);
        }
        return request;
    }*/

    send(message: Command.ACommand): void {
        if (this.messanger != null) {
            this.messanger.addMessage(message);
        }
    }
}

