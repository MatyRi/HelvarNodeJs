import * as Listener from "./BroadcastListener";
import * as HelvarRouter from "./HelvarRouter";
import * as LevelDevice from "./Command/Control/DirectLevelDevice"
//import LevelDevice = require("Command/Control/DirectLevelDevice");

var routers: HelvarRouter.HelvarRouter[];

export class HelvarSystem {

    constructor() {
        routers = new Array<HelvarRouter.HelvarRouter>();
    }

    //routers: Array<HelvarRouter.HelvarRouter>;

    routerProcess: Listener.IRouterProcessor = (router: HelvarRouter.HelvarRouter, source: Object): void => {
        if (!routers.some(r => (r.serialNumber === router.serialNumber))) {
            routers.push(router);
            console.log(`New Router added to system collection ${router.sWgName}:${router.sIpAddress}`);
            console.log(`Total router count: ${routers.length}`);
        }
    }

    sendDirectLevel() {
        var testCommand = new LevelDevice.DirectLevelDevice(100, "1.2.3.4", 0);
        routers[0].sendCommand(testCommand);
    }
}

