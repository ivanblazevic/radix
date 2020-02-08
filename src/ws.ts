import * as WebSocket from "ws";

export class WebSocketHelper {
  private url: string;

  constructor(private wsHost: string, private title: string) {
    this.url = wsHost;

    setTimeout(() => {
      this.send("radix");
    }, 2000);

    setTimeout(() => {
      this.send(title);
    }, 8000);
  }

  send = (text: string) => {
    // TODO: reuse ws instance
    const socket = new WebSocket("ws://" + this.url + ":8765");

    socket.on("error", function(err) {
      console.log(err);
    });

    socket.on("open", () => {
      try {
        // .substring(0, 8)
        socket.send(text.toUpperCase());
      } catch (error) {
        console.log(error);
      }
    });
  };
}
