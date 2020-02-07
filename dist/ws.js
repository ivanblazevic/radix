"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WebSocket = require("ws");
class WebSocketHelper {
    constructor(wsHost, title) {
        this.wsHost = wsHost;
        this.title = title;
        this.send = (text) => {
            // TODO: reuse ws instance
            const socket = new WebSocket("ws://" + this.url + ":8765");
            socket.on("error", function (err) {
                console.log(err);
            });
            socket.on("open", () => {
                try {
                    socket.send(text.substring(0, 8).toUpperCase());
                }
                catch (error) {
                    console.log(error);
                }
            });
        };
        this.url = wsHost;
        setTimeout(() => {
            this.send("radix");
        }, 2000);
        setTimeout(() => {
            this.send(title);
        }, 8000);
    }
}
exports.WebSocketHelper = WebSocketHelper;
