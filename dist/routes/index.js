"use strict";
const player_1 = require("../player");
const child_process = require("child_process");
const Observable_1 = require("rxjs/Observable");
const config_1 = require("../config");
var request = require('request');
var Route;
(function (Route) {
    class Index {
        constructor() {
            this.player = new player_1.Player();
            this.update = (req, res, next) => {
                console.log("Update process started...");
                child_process.exec('radix-update', (err, stdout) => {
                    if (err) {
                        res.send(JSON.stringify(err));
                    }
                    else {
                        res.send(JSON.stringify(stdout));
                    }
                });
            };
            this.index = (req, res, next) => {
                res.send(JSON.stringify(this.player.info()));
            };
            this.available_version = (req, res, next) => {
                this.config.getAvailableVersion().subscribe(r => {
                    res.send(JSON.stringify(r));
                });
            };
            this.saveConfig = (req, res, next) => {
                this.config.setGoogleUsername(req.body.google_username);
                this.config.setGooglePassword(req.body.google_password);
                this.config.setDirbleToken(req.body.dirble_token);
                res.send(JSON.stringify("updated"));
            };
            this.youtube = (req, res, next) => {
                const v = req.query.id;
                const fs = require('fs');
                const ytdl = require('ytdl-core');
                const urlPipe = new Observable_1.Observable(observer => {
                    ytdl('http://www.youtube.com/watch?v=' + v, { filter: (format) => {
                            console.log(format);
                            observer.next(format.url);
                            observer.complete();
                            return format === format;
                        } });
                });
                urlPipe.subscribe(url => {
                    this.player.play(url.toString()).subscribe(r => {
                        res.send(JSON.stringify(this.player.info()));
                    }, err => {
                        res.send(JSON.stringify(err));
                    });
                });
            };
            this.play = (req, res, next) => {
                var station = req.query.url;
                var title = req.query.title;
                this.player.play(station, title).subscribe(r => {
                    res.send(JSON.stringify({ "result": r }));
                }, err => {
                    res.status(400);
                    res.send(JSON.stringify({ "error": err.toString() }));
                });
            };
            this.search = (req, res, next) => {
                var query = req.query.query;
                request.post('http://api.dirble.com/v2/search?query=' + query + '&token=' + this.config.getDirbleToken(), { json: { key: 'value' } }, function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        res.send(body.map(i => {
                            return {
                                title: i.name,
                                url: i.streams && i.streams.length > 0 && i.streams[0].stream
                            };
                        }));
                    }
                    else {
                        res.send(body);
                    }
                });
            };
            this.volume = (req, res, next) => {
                var volume = req.query.set;
                this.player.volume(volume).subscribe(r => {
                    res.send(JSON.stringify({ "result": r }));
                }, err => {
                    res.status(400);
                    res.send(JSON.stringify({ "error": err.toString() }));
                });
            };
            this.config = new config_1.Config();
        }
    }
    Route.Index = Index;
})(Route || (Route = {}));
module.exports = Route;
