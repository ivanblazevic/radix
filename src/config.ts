import * as nconf from 'nconf';
import * as fs from 'fs';
import * as path from 'path';
import { Observable } from 'rxjs/Observable';
import * as request from 'request';
import { tap } from 'rxjs/operators/tap';
import { map } from 'rxjs/operators/map';

export class Config {
    private configPath = path.join(__dirname, './../config.json');
    private packagePath = path.join(__dirname, './../package.json');
    private defaultConfig = {
        "mixer": "PCM",
        "executor": "mpc",
        "url": "http://alternativefm.cast.addradio.de/alternativefm/simulcast/high/stream.mp3",
        "title": "AlternativeFM",
        "volume": 50
    }

    constructor() {
        const config = this.configPath;
    }

    init(): Observable<any> {
        return new Observable(observer => {
            fs.readFile(this.configPath, "utf8", (err, file) => {
                if (err) {
                    fs.writeFile(this.configPath, JSON.stringify(this.defaultConfig), function(err) {
                        if (err) {
                            observer.error(err);
                            return console.log(err);
                        }
                        observer.next("Config loaded");
                    });                
                } else {
                    observer.next("Config loaded");
                }
                observer.complete();
            });
        }).pipe(tap(_ => {
            nconf.argv()
            .env()
            .file({ file: this.configPath });
        }))
    }

    get(param: string): Observable<any> {
        return this.init().pipe(map(_ => nconf.get(param)))
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
        return nconf.get('mixer') || 'PCM';
    }

    getVolume(): Observable<any> {
        return this.get('volume').pipe(
            map(res => {
                if (!res) {
                    return 50;
                }
                return +res;
            })
        )
    }

    setVolume(volume: string): void {
        nconf.set('volume', volume);
        this.save();
    }

    getStreamingUrl(): string {
        return nconf.get('url');
    }

    setStreamingUrl(url: string): void {
        nconf.set('url', url);
        this.save();
    }

    getTitle(): string {
        return nconf.get('title');
    }

    setTitle(title: string): void {
        nconf.set('title', title);
        this.save();
    }

    getGoogleUsername(): string {
        return nconf.get('google_username');
    }

    setGoogleUsername(value: string): void {
        nconf.set('google_username', value);
        this.save();
    }

    getGooglePassword(): string {
        return nconf.get('google_password');
    }

    setGooglePassword(value: string): void {
        nconf.set('google_password', value);
        this.save();
    }

    getDirbleToken(): string {
        return nconf.get('dirble_token');
    }

    setDirbleToken(value: string): void {
        nconf.set('dirble_token', value);
        this.save();
    }

    isMpv(): boolean {
        return nconf.get('executor') === "mpv";
    }

    private save() {
        nconf.save(err => {
            console.log(err);
            fs.readFile(this.configPath, function (err, data) {});
        });
    }

}