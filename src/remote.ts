import { Config } from "./config";
import usb = require("usb");

export enum RemoteKey {
  UP = 52,
  DOWN = 51,
  LEFT = 80,
  RIGHT = 79
}

type RemoteEvent = (error: string, data: RemoteKey) => void;

export class Remote {
  private idVendor = 9354;
  private idProduct = 5774;

  config: Config;
  callback: RemoteEvent;

  constructor(isMocked?: boolean) {
    this.config = new Config();

    // const a = usb.getDeviceList()

    const device = isMocked
      ? this.getDeviceMock()
      : usb.findByIds(this.idVendor, this.idProduct);
    device.open();

    const i = device.interfaces[1];

    if (i.isKernelDriverActive()) {
      i.detachKernelDriver();
    }

    i.claim();

    const e = i.endpoints[0];

    e.startPoll(1, 0);

    e.on("data", data => {
      let dataArr = Array.prototype.slice.call(new Uint8Array(data, 0, 8));
      const key = this.mapKey(dataArr[2]);
      this.callback(null, dataArr[2]);
    });

    e.on("error", error => {
      console.log(error);
    });
  }

  on = (callback: RemoteEvent) => {
    this.callback = callback;
  };

  private mapKey(value: string): RemoteKey {
    return RemoteKey[value.toString()];
  }

  private getDeviceMock() {
    const on = (type: "error" | "data", call) => {
      setTimeout(() => {
        if (type === "data") {
          call(["", "", "51"]);
        }
      }, 4000);
    };

    const i = {
      claim: () => {},
      isKernelDriverActive: () => {},
      endpoints: [
        {
          startPoll: () => {},
          on: on
        }
      ]
    };

    return {
      open: () => {},
      interfaces: [i, i]
    };
  }
}
