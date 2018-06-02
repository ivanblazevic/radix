/// <reference path="../_all.d.ts" />
"use strict";
import * as express from "express";
import * as PlayMusic from "playmusic";
import { Observable } from 'rxjs/Observable';
import { Player } from '../player';
import { Config } from "./../config";

module Route {

  export class GoogleMusicPlay {

    libraryDB: any[] = [];
    pm;
    self;
    private player: Player = new Player();
    private configuration: Config;

    constructor() {
      this.configuration = new Config();
      this.init();
    }

    private init() {
      const self = this;
      var username = this.configuration.getGoogleUsername();
      var password = this.configuration.getGooglePassword();
      this.pm = new PlayMusic();
      if (username && password) {
        this.pm.init({email: username, password: password}, function(err) {
            if (err) {
              console.error("Cannot login to GooglePlay Music");
            } else {
              console.log("Initialized GoogleMusicPlay");
              self.refreshLibrary();
            }
        });
      }
    }

    public index = (req: express.Request, res: express.Response, next: express.NextFunction): void => {
      if (!this.pm) {
        res.send(JSON.stringify({ "error": "PlayMusic not initialized" }));
        return;
      }
      const id = req.query.id;
      if (!id) {
        res.send(JSON.stringify({ "error1": "No id provided" }));
        return;
      }
    }

    public play = (req: express.Request, res: express.Response, next: express.NextFunction): void => {
      if (!req.query.id) {
        res.send(JSON.stringify({ "err:": "No id provided" }));
        return;
      }
      this.resolveStreamUrl(req.query.id).subscribe(url => {
        this.player.play(url.url).subscribe((r) => {
          res.send(this.player.info());
        }, err => {
          res.send(JSON.stringify(err));
        })
      }, err => res.send(JSON.stringify(err)))
    }

    public library = (req: express.Request, res: express.Response, next: express.NextFunction): void => {
      this.checkPlayMusic(res);      
      res.send(JSON.stringify(this.libraryDB));
    }

    private resolveStreamUrl = (id): Observable<any> => {
      return new Observable(observer => {
        this.pm.getStreamUrl(id, function (err, streamUrl) {
          if (err && Object.keys(err).length === 0) {
            observer.error({ "error2": JSON.stringify(err) });
            observer.complete();
          } 
          // this.pm should exist
            if (!streamUrl && this.pm) {
              console.log("No url, attemp to initialze google play again - not sure why...")
              this.pm.init({ email: this.configuration.getGoogleUsername(), password: this.configuration.getGooglePassword() }, function (err) {
                this.pm.getStreamUrl(id, function (err, streamUrl) {
                  if (err) {
                    observer.error({ "error2": JSON.stringify(err) });
                    observer.complete();
                    return;
                  }
                  observer.next({ "url": streamUrl });
                  observer.complete();
                })
              })
            } else {
              observer.next({ "url": streamUrl });
              observer.complete();
            }
          
        });
      });
    }

    public search = (req: express.Request, res: express.Response, next: express.NextFunction): void => {
      var self = this;
      if (!self.library || self.library.length == 0) {
          res.send(JSON.stringify({ "error": "Library not loaded" }));
          return;
      }
      var search = req.query.search.toLowerCase();
      var data = self.libraryDB.filter(i => i.title.toLowerCase().indexOf(search) > -1 || i.artist.toLowerCase().indexOf(search) > -1);
      res.send(JSON.stringify(data));
    }

    private checkPlayMusic(res) {
      if (!this.pm) {
        res.send(JSON.stringify({ "error": "PlayMusic not initialized" }));
        return;
      }
    }

    private refreshLibrary() {
      this.pm.getAllTracks({ limit: 10000 }, (err, library) => {
        this.libraryDB = library && library.data && library.data.items.map((i) => {
          return {
            id: i.id,
            title: i.title,
            artist: i.artist,
            album: i.album
          }
        });
        console.log("Library retrieved: " + (this.libraryDB && this.libraryDB.length));
      });
    }

  }
}

export = Route;