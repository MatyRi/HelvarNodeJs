export class DeviceAddress {

    cluster: number; // 1-253
    router: number; // 1-254
    subnet: number; // 1-4
    device: number; // 1-255

    constructor(cluster?: number, router?: number, subnet?: number, device?: number) {
        this.cluster = cluster;
        this.router = router;
        this.subnet = subnet;
        this.device = device;
    }

    toString = (): string => {
        return `${this.cluster}.${this.router}.${this.subnet}.${this.device}`;
    };

    addRouter = (router: number): void => {
        this.router = router;
    }

    addSubnet = (subnet: number): void => {
        this.subnet = subnet;
    }

    addDevice = (device: number): void => {
        this.device = device;
    }
    
}