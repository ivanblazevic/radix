"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nconf = require("nconf");
const fs = require("fs");
class Config {
    constructor() {
        nconf.argv()
            .env()
            .file({ file: 'config.json' });
    }
    getVersion() {
        var content = fs.readFileSync('package.json', 'utf8');
        var o = JSON.parse(content);
        return o.version;
    }
    getVolume() {
        return nconf.get('volume');
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
    setVolume(volume) {
        nconf.set('volume', volume);
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
        nconf.save(function (err) {
            fs.readFile('config.json', function (err, data) { });
        });
    }
}
exports.Config = Config;
