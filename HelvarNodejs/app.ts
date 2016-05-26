import * as Listener from "./BroadcastListener";
import * as System from "./HelvarSystem";

console.log('Hello world');

var sys = new System.HelvarSystem();
var bcListener = new Listener.BroadcastListenerClass(4250, sys.routerProcess);
bcListener.start();
