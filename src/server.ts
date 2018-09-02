"use strict";
import * as bodyParser from "body-parser";
import * as express from "express";
import * as path from "path";
import * as indexRoute from "./routes/index";
import * as googleMusicPlayRoute from "./routes/google-music-play";
import { Config } from "./config";
import { Player } from "./player";

/**
 * The server.
 *
 * @class Server
 */
class Server {
    public app: express.Application;
    private configuration: Config;
  
    /**
     * Bootstrap the application.
     *
     * @class Server
     * @method bootstrap
     * @static
     * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
     */
    public static bootstrap(): Server {
      return new Server();
    }

    onListening(event) {
      this.configuration = new Config();
      var player = new Player();
      var url = this.configuration.getStreamingUrl();

      // force default radio stream if GoogleMusicPlay was last used; url has expirantion that therefore is not able to be sed again
      if (!!url && url.indexOf("googleusercontent") > -1) {
          url = null;
      }
  
      var station, title;
      if (!url) {
          url = "http://178.32.62.172:8878/;";
      } else {
          url = decodeURI(url);
          station = url;
          title = this.configuration.getTitle();
      }

      player.play(url, title).subscribe(res => {
        // console.log(res);
      }, err => {
        console.error(err)
      })

    }

    onError(error) {
      if (error.syscall !== "listen") {
        throw error;
      }
    
      /*
      var bind = typeof port === "string"
        ? "Pipe " + port
        : "Port " + port;
        */

      var bind = "bind";
    
      // handle specific listen errors with friendly messages
      switch (error.code) {
        case "EACCES":
          console.error(bind + " requires elevated privileges");
          process.exit(1);
          break;
        case "EADDRINUSE":
          console.error(bind + " is already in use");
          process.exit(1);
          break;
        default:
          throw error;
      }
    }
  
    /**
     * Constructor.
     *
     * @class Server
     * @constructor
     */
    constructor() {
      //create expressjs application
      this.app = express();
  
      //configure application
      this.config();

      this.routes();
    }
  
  /**
   * Configure application
   *
   * @class Server
   * @method config
   * @return void
   */
  private config() {
    //mount logger
    //this.app.use(logger("dev"));

    //mount json form parser
    this.app.use(bodyParser.json());

    //mount query string parser
    this.app.use(bodyParser.urlencoded({ extended: true }));

    var allowCrossDomain = function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
        if ('OPTIONS' == req.method) {
            res.sendStatus(200);
        } else {
            next();
        }
    };
    this.app.use(allowCrossDomain)
    //this.app.use(express.static('www'));

    //add static paths
    this.app.use(express.static(path.join("www")));
    //this.app.use(express.static(path.join(__dirname, "bower_components")));

    // catch 404 and forward to error handler
    this.app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
      var error = new Error("Not Found");
      err.status = 404;
      next(err);
    });

  }

  /**
   * Configure routes
   *
   * @class Server
   * @method routes
   * @return void
   */
  private routes() {
    //get router
    let router: express.Router;
    router = express.Router();

    //create routes
    var index: indexRoute.Index = new indexRoute.Index();

    //home page
    router.post("/", index.saveConfig.bind(index.saveConfig));
    router.get("/", index.index.bind(index.index));
    router.get("/info", index.index.bind(index.index));
    router.get("/update", index.update.bind(index.update));
    router.get("/play", index.play.bind(index.play));
    router.get("/volume", index.volume.bind(index.volume));
    router.get("/youtube", index.youtube.bind(index.youtube));
    router.get("/search", index.search.bind(index.search));

    // google music play
    var google: googleMusicPlayRoute.GoogleMusicPlay = new googleMusicPlayRoute.GoogleMusicPlay();
    router.get("/gplay", google.play.bind(google.play));
    router.get("/gplay/search", google.search.bind(google.search));
    router.get("/gplay/library", google.library.bind(google.library));    

    //use router middleware
    this.app.use(router);
  }

}

export = Server.bootstrap();
