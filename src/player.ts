import { Observable } from "rxjs/Observable";
import { switchMap, tap } from "rxjs/operators";
import { Config } from "./config";
import { run } from "./common";
import { currentId } from "async_hooks";
import { of } from "rxjs";

var request = require("request-promise");

export interface Item {
  _id?: string;
  title: string;
  url: string;
}

export interface Info {
  version: string;
  url: string;
  title: string;
  volume: number;
  google_username: string;
  google_password: string;
  dirble_token: string;
}

export class Player {
  private FAVORITES_HOST = "https://radix-83cd.restdb.io/rest/stations";
  private stations: Item[];

  config: Config;

  constructor() {
    this.config = new Config();

    this.getStations().then(stations => {
      this.stations = stations;
    });
  }

  info = () => {
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

  play = (streamUrl: string, title?: string): Observable<any> => {
    if (this.config.isMpv()) {
      return run("mpv " + streamUrl, true).pipe(
        tap(r => {
          this.config.setStreamingUrl(streamUrl);
          this.config.setTitle(title);
        })
      );
    } else {
      console.log('mpc add "' + streamUrl + '"');

      return run("mpc clear").pipe(
        switchMap(r => run('mpc add "' + streamUrl + '"')),
        switchMap(r => run("mpc play")),
        tap(r => {
          this.config.setStreamingUrl(streamUrl);
          this.config.setTitle(title);
        })
      );
    }
  };

  previous(): void {
    const index = idx => (idx === 0 ? idx : idx - 1);
    this.onPreviousOrNext(index);
  }

  next(): void {
    const index = idx => (this.stations.length === idx + 1 ? idx : idx + 1);
    this.onPreviousOrNext(index);
  }

  volume = (volume: number): Observable<any> => {
    return run(
      "amixer sset '" + this.config.getMixer() + "' " + volume + "%"
    ).pipe(
      tap(r => {
        this.config.setVolume(volume);
      })
    );
  };

  setDefaultVolume(): Observable<any> {
    return this.volume(this.config.getVolume());
  }

  getStations = (): Promise<any[]> => {
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

  private onPreviousOrNext(index: (idx: number) => number): void {
    const currentIdx = this.stations.findIndex(s => this.info().url === s.url);
    const nextStation = this.stations[index(currentIdx)];
    this.play(nextStation.url, nextStation.title).subscribe(r => {
      console.log(r);
    });
  }
}
