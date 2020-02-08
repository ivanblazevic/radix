import * as fs from "fs";
import * as nconf from "nconf";
import * as path from "path";
import * as request from "request";
import { Observable } from "rxjs/Observable";
import { WebSocketHelper } from "./ws";

export class Config {
  private configPath = path.join("./config.json");
  private packagePath = path.join(__dirname, "./../package.json");
  private defaultConfig = {
    mixer: "PCM",
    executor: "mpc",
    url:
      "http://alternativefm.cast.addradio.de/alternativefm/simulcast/high/stream.mp3",
    title: "AlternativeFM",
    volume: 50,
    ws: "localhost"
  };

  private ws;
  private radioStation;
  private currentSong;

  constructor() {
    console.log("Load configuration...");

    if (!fs.existsSync(this.configPath)) {
      fs.writeFileSync(this.configPath, JSON.stringify(this.defaultConfig));
    }
    nconf
      .argv()
      .env()
      .file({ file: this.configPath });

    this.ws = new WebSocketHelper(this.get("ws"), this.getTitle());

    const Parser = require("icecast-parser");

    this.radioStation = new Parser({
      url: this.getStreamingUrl(),
      metadataInterval: 20,
      errorInterval: 20
    });

    this.radioStation.on("metadata", metadata => {
      if (this.currentSong !== metadata.StreamTitle) {
        this.currentSong = metadata.StreamTitle;
        console.log("New song: ", this.currentSong);
      }

      this.ws.send(this.currentSong);

      console.log(
        [
          metadata.StreamTitle,
          "is playing on",
          this.radioStation.getConfig("url")
        ].join(" ")
      );
    });

    this.radioStation.on("error", function(err) {
      console.log(err);
    });
  }

  get(param: string): any {
    return nconf.get(param);
  }

  getVersion(): string {
    var content = fs.readFileSync(this.packagePath, "utf8");
    var o = JSON.parse(content);
    return o.version;
  }

  getAvailableVersion(): Observable<string> {
    return new Observable(observer => {
      request.get("https://registry.npmjs.org/radix-player", function(
        error,
        response,
        body
      ) {
        if (!error && response.statusCode == 200) {
          const b = JSON.parse(body);
          observer.next(b["dist-tags"].latest);
        } else {
          observer.next("Executing: ");
        }
        observer.complete();
      });
    });
  }

  getMixer(): string {
    return this.get("mixer") || "PCM";
  }

  getVolume(): number {
    const volume = this.get("volume");
    if (!volume) {
      return 50;
    }
    return +volume;
  }

  setVolume(volume: number): void {
    this.save("volume", volume.toString());
  }

  getStreamingUrl(): string {
    return this.get("url");
  }

  setStreamingUrl(url: string): void {
    this.save("url", url);
    console.log("change", url);
    this.radioStation.setConfig({ ...this.radioStation.getConfig(), url });
  }

  getTitle(): string {
    return this.get("title");
  }

  setTitle(title: string): void {
    this.save("title", title);
    this.ws.send(title);
  }

  getGoogleUsername(): string {
    return this.get("google_username");
  }

  setGoogleUsername(value: string): void {
    this.save("google_username", value);
  }

  getGooglePassword(): string {
    return this.get("google_password");
  }

  setGooglePassword(value: string): void {
    this.save("google_password", value);
  }

  getDirbleToken(): string {
    return this.get("dirble_token");
  }

  setDirbleToken(value: string): void {
    this.save("dirble_token", value);
  }

  isMpv(): boolean {
    return this.get("executor") === "mpv";
  }

  private save(param: string, value: string) {
    nconf.set(param, value);
    nconf.save(err => {
      console.log(err);
      fs.readFile(this.configPath, function(err, data) {});
    });
  }
}
