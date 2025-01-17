﻿import {IComm} from "./IComm";

export class UDPCommonListener {

    static receivers: { [id: string]: IComm; } = {};
    //static receivers: Map<string, Comm1> = new HashMap<>();
    //static ExecutorService executor = Executors.newSingleThreadExecutor(NamedThreadFactory.make("UDPCommonListenerExecutor"));
    static INSTANCE: UDPCommonListener = new UDPCommonListener();

    //static Thread myThread;
    static started: boolean = false;
    static port: number = 50001; // Default

    //static DatagramSocket serverSocket;

    constructor() { }
  
  static receiveDatagram(address: string, data: string): boolean
    {
        var target = this.receivers[address];
        if (target != null) {
            target.receiveString(data);
            //executor.execute(() -> target.receiveBytes(data));
            //target.receiveBytes(data);
            return true;
        } else {
            return false;
        }
    }
  
  static registerReceiver(address: string, icomm: IComm ): void
{
    this.receivers[address] = icomm;
    this.start();
}

  static start(): void {
      if (this.started) return; 
      var dgram = require("dgram");
      var server = dgram.createSocket("udp4");

      server.on("listening", () => {
          var address = server.address();
          console.log(`UDP Server listening on ${address.address}:${address.port}`);
      });

      server.on("message", (message, remote) => {
          console.log(`New message ${message} from ${remote.address}`);
          this.receiveDatagram(remote.address, message.toString());
          //var newHr = this.parseRouter(message);
          //this.sys(newHr, remote);
      });

      server.bind(this.port);
  }

  static stop(): void {

    }   

}