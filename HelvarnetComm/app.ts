import Connector1 = require("./Connector");
import LevelDevice = require("./Command/Control/DirectLevelDevice");
import Address = require("./DeviceAddress");
import SoftwareVersion = require("./Command/Query/QuerySoftwareVersion");
import GroupPowerConsumption = require("./Command/Query/QueryGroupPowerConsumption");

var connector = new Connector1.Connector("192.168.1.11");

var address = new Address.DeviceAddress(1, 11, 1, 1);
var groupAddress = 1000;

connector.send(new LevelDevice.DirectLevelDevice(100, address, 0));
connector.sendQueryWithCallback(new SoftwareVersion.QuerySoftwareVersion(), callback);
connector.sendQueryWithCallback(new GroupPowerConsumption.QueryGroupPowerConsumption(groupAddress), callback);

function callback(result: string) {
    console.log("FROM Callback> " + result);
}

