import { Config } from "./config";
const usb = require('usb');

/*
80 left
79 right
52 up
51 down
*/
export enum RemoteKey {
    UP = 80,
    DOWN = 79,
    LEFT = 52,
    RIGHT = 51
}

type RemoteEvent = (error: string, data: RemoteKey) => void;

export class Remote {

    config: Config;
    callback: RemoteEvent;

	constructor(isMocked?: boolean) {
        this.config = new Config();
        
        // const a = usb.getDeviceList()
        
        const device = isMocked ? this.getDeviceMock() : usb.findByIds(9354, 5774)
        device.open();

        const i = device.interfaces[1];
        
        if (i.isKernelDriverActive()) {
           i.detachKernelDriver()
        }
        
        i.claim()
        
        const e = i.endpoints[0];
        
        e.startPoll(1, 0);
        
        e.on('data', (data) => {
            let dataArr = Array.prototype.slice.call(new Uint8Array(data, 0, 8));
            const key = this.mapKey(dataArr[2]);
            this.callback(null, dataArr[2]);
        });
        
        e.on('error', (error) => {
          console.log(error);
        });

    }

	on = (callback: RemoteEvent) => {
		this.callback = callback;
    }
    
    private mapKey(value: string): RemoteKey {
        return RemoteKey[value.toString()];
    }

    private getDeviceMock() {

        const on = (type: 'error' | 'data', call) => {
            setTimeout(() => {
                if (type === "data") {
                    call(["", "", "80"]);
                }
            }, 100)
        }

        const i = {
            claim: () => {},
            isKernelDriverActive: () => {},
            endpoints: [{
                startPoll: () => {},
                on: on
            }]
        }

        return {
            open: () => {},
            interfaces: [i, i]
        }
    }

}