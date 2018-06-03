import { Observable } from "rxjs/Observable";
import { switchMap, tap } from "rxjs/operators"
import * as child_process from "child_process";
import { Config } from "./config";
import { run } from "./common";

export class Player {

	config: Config;

	constructor() {
		this.config = new Config();
	}

	info = () => {
		return {
			"version": this.config.getVersion(),
			"playing": this.config.getStreamingUrl(), 
			"title": this.config.getTitle(),
			"volume": this.config.getVolume() || 0,
			"google_username": this.config.getGoogleUsername(),
			"google_password": this.config.getGooglePassword(),
			"dirble_token": this.config.getDirbleToken()
		};
	}

	play = (streamUrl: string, title?: string): Observable<any> => {
		if (this.config.isMpv()) {
			return run("mpva " + streamUrl, true).pipe(
				tap(r => {
					this.config.setStreamingUrl(streamUrl);
					this.config.setTitle(title);
				})
			)
		} else {
			return run("mpc clear").pipe(
				switchMap(r => run('mpc add "' + streamUrl + '"')),
				switchMap(r => run("mpc play")),
				tap(r => {
					this.config.setStreamingUrl(streamUrl);
					this.config.setTitle(title);
				})
			)
		}
	}

	volume = (volume: string): Observable<any> => {
		return run("amixer sset 'Speaker' " + volume).pipe(
			tap(r => {
				this.config.setVolume(volume);
			})
		)
	}

}