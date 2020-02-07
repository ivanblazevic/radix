"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const usb = require('usb');
/*
80 left
79 right
52 up
51 down
*/
var RemoteKey;
(function (RemoteKey) {
    RemoteKey[RemoteKey["UP"] = 80] = "UP";
    RemoteKey[RemoteKey["DOWN"] = 79] = "DOWN";
    RemoteKey[RemoteKey["LEFT"] = 52] = "LEFT";
    RemoteKey[RemoteKey["RIGHT"] = 51] = "RIGHT";
})(RemoteKey = exports.RemoteKey || (exports.RemoteKey = {}));
class Remote {
    constructor(isMocked) {
        this.idVendor = 9354;
        this.idProduct = 5774;
        this.on = (callback) => {
            this.callback = callback;
        };
        this.config = new config_1.Config();
        // const a = usb.getDeviceList()
        const device = isMocked ? this.getDeviceMock() : usb.findByIds(this.idVendor, this.idProduct);
        device.open();
        const i = device.interfaces[1];
        if (i.isKernelDriverActive()) {
            i.detachKernelDriver();
        }
        i.claim();
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
    mapKey(value) {
        return RemoteKey[value.toString()];
    }
    getDeviceMock() {
        const on = (type, call) => {
            setTimeout(() => {
                if (type === "data") {
                    call(["", "", "51"]);
                }
            }, 4000);
        };
        const i = {
            claim: () => { },
            isKernelDriverActive: () => { },
            endpoints: [{
                    startPoll: () => { },
                    on: on
                }]
        };
        return {
            open: () => { },
            interfaces: [i, i]
        };
    }
}
exports.Remote = Remote;
