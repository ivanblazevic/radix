import * as fs from 'fs';
import * as nconf from 'nconf';
import * as path from 'path';
import * as request from 'request';
import { Observable } from 'rxjs/Observable';

export class Config {
    private configPath = path.join('./config.json');
    private packagePath = path.join(__dirname, './../package.json');
    private defaultConfig = {
        "mixer": "PCM",
        "executor": "mpc",
        "url": "http://alternativefm.cast.addradio.de/alternativefm/simulcast/high/stream.mp3",
        "title": "AlternativeFM",
        "volume": 50
    }

    constructor() {
        if (!fs.existsSync(this.configPath)) {
            fs.writeFileSync(this.configPath, JSON.stringify(this.defaultConfig));
        }
        nconf
            .argv()
            .env()
            .file({ file: this.configPath });
    }

    get(param: string): any {
        return nconf.get(param);
    }

    getVersion(): string {
        var content = fs.readFileSync(this.packagePath, 'utf8');
        var o = JSON.parse(content);
        return o.version;
    }

    getAvailableVersion(): Observable<string> {
        return new Observable(observer => {
            request.get('https://registry.npmjs.org/radix-player',
                function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        const b = JSON.parse(body);
                        observer.next(b["dist-tags"].latest);
                    } else {
                        observer.next("Executing: ");
                    }
                    observer.complete();
                }
            );
        })
    }

    getMixer(): string {
        return this.get('mixer') || 'PCM';
    }

    getVolume(): number {
        const volume = this.get('volume');
        if (!volume) {
            return 50;
        }
        return +volume;
    }

    setVolume(volume: number): void {
        this.save('volume', volume.toString());
    }

    getStreamingUrl(): string {
        return this.get('url');
    }

    setStreamingUrl(url: string): void {
        this.save('url', url);
    }

    getTitle(): string {
        return this.get('title');
    }

    setTitle(title: string): void {
        this.save('title', title);
    }

    getGoogleUsername(): string {
        return this.get('google_username');
    }

    setGoogleUsername(value: string): void {
        this.save('google_username', value);
    }

    getGooglePassword(): string {
        return this.get('google_password');
    }

    setGooglePassword(value: string): void {
        this.save('google_password', value);
    }

    getDirbleToken(): string {
        return this.get('dirble_token');
    }

    setDirbleToken(value: string): void {
        this.save('dirble_token', value);
    }

    isMpv(): boolean {
        return this.get('executor') === "mpv";
    }

    private save(param: string, value: string) {
        nconf.set(param, value);
        nconf.save(err => {
            console.log(err);
            fs.readFile(this.configPath, function (err, data) { });
        });
    }

}