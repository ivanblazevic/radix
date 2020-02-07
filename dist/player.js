"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const operators_1 = require("rxjs/operators");
const config_1 = require("./config");
const common_1 = require("./common");
const rxjs_1 = require("rxjs");
var request = require("request-promise");
class Player {
    constructor() {
        this.FAVORITES_HOST = "https://radix-83cd.restdb.io/rest/stations";
        this.info = () => {
            return {
                version: this.config.getVersion(),
                url: this.config.getStreamingUrl(),
                title: this.config.getTitle(),
                volume: this.config.getVolume() || 0,
                google_username: this.config.getGoogleUsername(),
                google_password: this.config.getGooglePassword(),
                dirble_token: this.config.getDirbleToken()
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
                return rxjs_1.of("a").pipe(operators_1.tap(_ => {
                    this.config.setTitle(title);
                }));
                /*
                      return run("mpc clear").pipe(
                          switchMap(r => run('mpc add "' + streamUrl + '"')),
                          switchMap(r => run("mpc play")),
                          tap(r => {
                              this.config.setStreamingUrl(streamUrl);
                              this.config.setTitle(title);
                          })
                )
                */
            }
        };
        this.volume = (volume) => {
            return common_1.run("amixer sset '" + this.config.getMixer() + "' " + volume + "%").pipe(operators_1.tap(r => {
                this.config.setVolume(volume);
            }));
        };
        this.getStations = () => {
            var options = {
                url: this.FAVORITES_HOST,
                headers: {
                    "User-Agent": "Request-Promise",
                    "x-apikey": "5ae89d7625a622ae4d528762"
                }
            };
            return request(options).then(response => {
                return JSON.parse(response);
            });
        };
        this.config = new config_1.Config();
        this.getStations().then(stations => {
            this.stations = stations;
        });
    }
    previous() {
        const index = idx => (idx === 0 ? idx : idx - 1);
        this.onPreviousOrNext(index);
    }
    next() {
        const index = idx => (this.stations.length === idx + 1 ? idx : idx + 1);
        this.onPreviousOrNext(index);
    }
    setDefaultVolume() {
        return this.volume(this.config.getVolume());
    }
    onPreviousOrNext(index) {
        const currentIdx = this.stations.findIndex(s => this.info().url === s.url);
        const nextStation = this.stations[index(currentIdx)];
        this.play(nextStation.url, nextStation.title).subscribe(r => {
            console.log(r);
        });
    }
}
exports.Player = Player;
