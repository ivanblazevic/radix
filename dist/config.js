"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nconf = require("nconf");
const fs = require("fs");
const path = require("path");
const Observable_1 = require("rxjs/Observable");
const request = require("request");
class Config {
    constructor() {
        this.configPath = path.join(__dirname, './../config.json');
        this.packagePath = path.join(__dirname, './../package.json');
        const config = this.configPath;
        const defaultConfig = {
            "mixer": "PCM",
            "executor": "mpc",
            "url": "http://alternativefm.cast.addradio.de/alternativefm/simulcast/high/stream.mp3",
            "title": "AlternativeFM"
        };
        fs.readFile(config, "utf8", function (err, file) {
            if (err) {
                fs.writeFile(config, JSON.stringify(defaultConfig), function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    nconf.argv()
                        .env()
                        .file({ file: config });
                });
            }
            else {
                nconf.argv()
                    .env()
                    .file({ file: config });
            }
        });
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
        return +nconf.get('volume');
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
            fs.readFile(this.configPath, function (err, data) { });
        });
    }
}
exports.Config = Config;
