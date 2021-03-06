"use strict";
import * as express from "express";
import { Player } from "../player";
import * as child_process from "child_process";
import { Observable } from "rxjs/Observable";
import { Config } from "../config";
var request = require("request");

module Route {
  export class Index {
    player: Player;

    constructor(private config: Config) {
      this.player = new Player(this.config);
    }

    public update = (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ): void => {
      console.log("Update process started...");
      child_process.exec("radix-update", (err, stdout) => {
        if (err) {
          res.send(JSON.stringify(err));
        } else {
          res.send(JSON.stringify(stdout));
        }
      });
    };

    public index = (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ): void => {
      res.send(JSON.stringify(this.player.info()));
    };

    public available_version = (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ): void => {
      this.config.getAvailableVersion().subscribe(r => {
        res.send(JSON.stringify(r));
      });
    };

    public saveConfig = (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ): void => {
      this.config.setGoogleUsername(req.body.google_username);
      this.config.setGooglePassword(req.body.google_password);
      this.config.setDirbleToken(req.body.dirble_token);
      res.send(JSON.stringify("updated"));
    };

    public youtube = (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ): void => {
      const v = req.query.id;
      const fs = require("fs");
      const ytdl = require("ytdl-core");
      const urlPipe = new Observable(observer => {
        ytdl("http://www.youtube.com/watch?v=" + v, {
          filter: format => {
            console.log(format);
            observer.next(format.url);
            observer.complete();
            return format === format;
          }
        });
      });
      urlPipe.subscribe(url => {
        this.player.play(url.toString()).subscribe(
          r => {
            res.send(JSON.stringify(this.player.info()));
          },
          err => {
            res.send(JSON.stringify(err));
          }
        );
      });
    };

    public play = (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ): void => {
      var station = req.query.url;
      var title = req.query.title;
      this.player.play(station, title).subscribe(
        r => {
          res.send(JSON.stringify({ result: r }));
        },
        err => {
          res.status(400);
          res.send(JSON.stringify({ error: err.toString() }));
        }
      );
    };

    public search = (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ): void => {
      var query = req.query.query;
      request.post(
        "http://api.dirble.com/v2/search?query=" +
          query +
          "&token=" +
          this.config.getDirbleToken(),
        { json: { key: "value" } },
        function(error, response, body) {
          if (!error && response.statusCode == 200) {
            res.send(
              body.map(i => {
                return {
                  title: i.name,
                  url: i.streams && i.streams.length > 0 && i.streams[0].stream
                };
              })
            );
          } else {
            res.send(body);
          }
        }
      );
    };

    public volume = (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ): void => {
      var volume = req.query.set;
      this.player.volume(volume).subscribe(
        r => {
          res.send(JSON.stringify({ result: r }));
        },
        err => {
          res.status(400);
          res.send(JSON.stringify({ error: err.toString() }));
        }
      );
    };
  }
}

export = Route;
