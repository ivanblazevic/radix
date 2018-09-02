import * as nconf from 'nconf';
import * as fs from 'fs';
import * as path from 'path';

export class Config {
    private configPath = path.join(__dirname, './../config.json');
    private packagePath = path.join(__dirname, './../package.json');

    constructor() {
        nconf.argv()
        .env()
        .file({ file: this.configPath+"a" });
        if (!nconf.get('url')) {
            fs.writeFile(this.configPath+"a", "", function(err) {
                if(err) {
                    return console.log(err);
                }
            });
            nconf.set('executor', "mpc")
            nconf.set('url', "http://alternativefm.cast.addradio.de/alternativefm/simulcast/high/stream.mp3")
            nconf.set('title', "AlternativeFM")
            this.save();
        }
    }

    getVersion(): string {
        var content = fs.readFileSync(this.packagePath, 'utf8');
        var o = JSON.parse(content);
        return o.version;
    }

    getVolume(): number {
        return +nconf.get('volume');
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

    setVolume(volume: string): void {
        nconf.set('volume', volume);
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
        nconf.save(function (err) {
            fs.readFile(this.configPath, function (err, data) {});
        });
    }

}