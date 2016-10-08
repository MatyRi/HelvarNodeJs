import {IMessageCenter} from "./Message/IMessageCenter";
import {AQuery} from "./Command/Query/AQuery";
import {EDiagnostics} from "./EDiagnostics";
import {SimpleExclusiveMessageCenter} from "./Message/SimpleExclusiveMessageCenter";
import {ACommand} from "./Command/ACommand";
import {IReply} from "./Command/IReply";

export class Connector {

    sIpAddress: string;
    messanger: IMessageCenter;

    constructor(ipAddress: string) {
        this.sIpAddress = ipAddress;
        this.messanger = new SimpleExclusiveMessageCenter(ipAddress);

    }

    sendQuery<T extends AQuery, TU extends IReply>(request: T): Promise<TU> {
        if (this.messanger != null) {
            var result = this.messanger.sendQuery<AQuery, IReply>(request);

            return result;
        } else {
            console.log("Router has not assigned sender!");
            request.setError(EDiagnostics.NOTDELIVERED);
        }
        return Promise.reject(null);
    }

    sendQueryWithCallback<T extends AQuery>(request: T, callback: (result: string) => any): T {
        if (this.messanger != null) {
            try {
                this.messanger.sendQueryWithCallback<AQuery>(request, callback);
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
    }

    send(message: ACommand): void {
        if (this.messanger != null) {
            this.messanger.addMessage(message);
        }
    }
}

