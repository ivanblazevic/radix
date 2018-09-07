"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const operators_1 = require("rxjs/operators");
const config_1 = require("./config");
const common_1 = require("./common");
class Player {
    constructor() {
        this.info = () => {
            return {
                "version": this.config.getVersion(),
                "url": this.config.getStreamingUrl(),
                "title": this.config.getTitle(),
                "volume": this.config.getVolume() || 0,
                "google_username": this.config.getGoogleUsername(),
                "google_password": this.config.getGooglePassword(),
                "dirble_token": this.config.getDirbleToken()
            };
        };
        this.play = (streamUrl, title) => {
            if (this.config.isMpv()) {
                return common_1.run("mpv " + streamUrl, true).pipe(operators_1.tap(r => {
                    this.config.setStreamingUrl(streamUrl);
                    this.config.setTitle(title);
                }));
            }
            else {
                console.log('mpc add "' + streamUrl + '"');
                return common_1.run("mpc clear").pipe(operators_1.switchMap(r => common_1.run('mpc add "' + streamUrl + '"')), operators_1.switchMap(r => common_1.run("mpc play")), operators_1.tap(r => {
                    this.config.setStreamingUrl(streamUrl);
                    this.config.setTitle(title);
                }));
            }
        };
        this.volume = (volume) => {
            return common_1.run("amixer sset '" + this.config.getMixer() + "' " + volume).pipe(operators_1.tap(r => {
                this.config.setVolume(volume);
            }));
        };
        this.config = new config_1.Config();
    }
    setDefaultVolume() {
        return this.volume(this.config.getVolume().toString());
    }
}
exports.Player = Player;
