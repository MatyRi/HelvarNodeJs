import {Connector} from "./Connector";
import {DirectLevelDevice} from "./Command/Control/DirectLevelDevice";
import {DeviceAddress} from "./DeviceAddress";
import {QuerySoftwareVersion} from "./Command/Query/QuerySoftwareVersion";
import {QueryGroupPowerConsumption} from "./Command/Query/QueryGroupPowerConsumption";

var connector = new Connector("192.168.1.11");

var address = new DeviceAddress(1, 11, 1, 1);
var groupAddress = 1000;

connector.send(new DirectLevelDevice(100, address, 0));
connector.sendQueryWithCallback(new QuerySoftwareVersion(), callback);
connector.sendQueryWithCallback(new QueryGroupPowerConsumption(groupAddress), callback);

var promise1 = connector.sendQuery(new QuerySoftwareVersion());

function callback(result: string) {
    console.log("FROM Callback> " + result);
}

const promise = new Promise((resolve, reject) => {



});

