"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const nconf = require("nconf");
const path = require("path");
const request = require("request");
const Observable_1 = require("rxjs/Observable");
const ws_1 = require("./ws");
class Config {
    constructor() {
        this.configPath = path.join("./config.json");
        this.packagePath = path.join(__dirname, "./../package.json");
        this.defaultConfig = {
            hasRemote: false,
            mixer: "PCM",
            executor: "mpc",
            url: "http://alternativefm.cast.addradio.de/alternativefm/simulcast/high/stream.mp3",
            title: "AlternativeFM",
            volume: 50,
            ws: "localhost"
        };
        console.log("Load configuration...");
        if (!fs.existsSync(this.configPath)) {
            fs.writeFileSync(this.configPath, JSON.stringify(this.defaultConfig));
        }
        nconf
            .argv()
            .env()
            .file({ file: this.configPath });
        this.ws = new ws_1.WebSocketHelper(this.get("ws"), this.getTitle());
        const Parser = require("icecast-parser");
        /*
        this.radioStation = new Parser({
          url: this.getStreamingUrl(),
          metadataInterval: 20,
          errorInterval: 40
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
        */
    }
    get(param) {
        return nconf.get(param);
    }
    getVersion() {
        var content = fs.readFileSync(this.packagePath, "utf8");
        var o = JSON.parse(content);
        return o.version;
    }
    getAvailableVersion() {
        return new Observable_1.Observable(observer => {
            request.get("https://registry.npmjs.org/radix-player", function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    const b = JSON.parse(body);
                    observer.next(b["dist-tags"].latest);
                }
                else {
                    observer.next("Executing: ");
                }
                observer.complete();
            });
        });
    }
    getMixer() {
        return this.get("mixer") || "PCM";
    }
    getVolume() {
        const volume = this.get("volume");
        if (!volume) {
            return 50;
        }
        return +volume;
    }
    setVolume(volume) {
        this.save("volume", volume.toString());
    }
    getStreamingUrl() {
        return this.get("url");
    }
    setStreamingUrl(url) {
        this.save("url", url);
        console.log("change", url);
        // this.radioStation.setConfig({ ...this.radioStation.getConfig(), url });
    }
    getTitle() {
        return this.get("title");
    }
    setTitle(title) {
        this.save("title", title);
        this.ws.send(title);
    }
    getGoogleUsername() {
        return this.get("google_username");
    }
    setGoogleUsername(value) {
        this.save("google_username", value);
    }
    getGooglePassword() {
        return this.get("google_password");
    }
    setGooglePassword(value) {
        this.save("google_password", value);
    }
    getDirbleToken() {
        return this.get("dirble_token");
    }
    setDirbleToken(value) {
        this.save("dirble_token", value);
    }
    isMpv() {
        return this.get("executor") === "mpv";
    }
    save(param, value) {
        nconf.set(param, value);
        nconf.save(err => {
            console.log(err);
            fs.readFile(this.configPath, function (err, data) { });
        });
    }
}
exports.Config = Config;
