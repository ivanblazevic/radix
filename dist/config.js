"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nconf = require("nconf");
const fs = require("fs");
const path = require("path");
const Observable_1 = require("rxjs/Observable");
const request = require("request");
const tap_1 = require("rxjs/operators/tap");
const map_1 = require("rxjs/operators/map");
class Config {
    constructor() {
        this.configPath = path.join(__dirname, './../config.json');
        this.packagePath = path.join(__dirname, './../package.json');
        this.defaultConfig = {
            "mixer": "PCM",
            "executor": "mpc",
            "url": "http://alternativefm.cast.addradio.de/alternativefm/simulcast/high/stream.mp3",
            "title": "AlternativeFM",
            "volume": 50
        };
        const config = this.configPath;
    }
    init() {
        return new Observable_1.Observable(observer => {
            fs.readFile(this.configPath, "utf8", (err, file) => {
                if (err) {
                    fs.writeFile(this.configPath, JSON.stringify(this.defaultConfig), function (err) {
                        if (err) {
                            observer.error(err);
                            return console.log(err);
                        }
                        observer.next("Config loaded");
                    });
                }
                else {
                    observer.next("Config loaded");
                }
                observer.complete();
            });
        }).pipe(tap_1.tap(_ => {
            nconf.argv()
                .env()
                .file({ file: this.configPath });
        }));
    }
    get(param) {
        return this.init().pipe(map_1.map(_ => nconf.get(param)));
    }
    getVersion() {
        var content = fs.readFileSync(this.packagePath, 'utf8');
        var o = JSON.parse(content);
        return o.version;
    }
    getAvailableVersion() {
        return new Observable_1.Observable(observer => {
            request.get('https://registry.npmjs.org/radix-player', function (error, response, body) {
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
        return nconf.get('mixer') || 'PCM';
    }
    getVolume() {
        return this.get('volume').pipe(map_1.map(res => {
            if (!res) {
                return 50;
            }
            return +res;
        }));
    }
    setVolume(volume) {
        nconf.set('volume', volume);
        this.save();
    }
    getStreamingUrl() {
        return nconf.get('url');
    }
    setStreamingUrl(url) {
        nconf.set('url', url);
        this.save();
    }
    getTitle() {
        return nconf.get('title');
    }
    setTitle(title) {
        nconf.set('title', title);
        this.save();
    }
    getGoogleUsername() {
        return nconf.get('google_username');
    }
    setGoogleUsername(value) {
        nconf.set('google_username', value);
        this.save();
    }
    getGooglePassword() {
        return nconf.get('google_password');
    }
    setGooglePassword(value) {
        nconf.set('google_password', value);
        this.save();
    }
    getDirbleToken() {
        return nconf.get('dirble_token');
    }
    setDirbleToken(value) {
        nconf.set('dirble_token', value);
        this.save();
    }
    isMpv() {
        return nconf.get('executor') === "mpv";
    }
    save() {
        nconf.save(err => {
            console.log(err);
            fs.readFile(this.configPath, function (err, data) { });
        });
    }
}
exports.Config = Config;
