import Connector1 = require("./Connector");
import LevelDevice = require("./Command/Control/DirectLevelDevice");
import Address = require("./DeviceAddress");
//console.log('Hello world');

var connector = new Connector1.Connector("192.168.1.11");

var address = new Address.DeviceAddress(1,11,1,1);

connector.send(new LevelDevice.DirectLevelDevice(100, address, 0));
//connector.sendQuery()


