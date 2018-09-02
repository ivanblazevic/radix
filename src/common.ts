import * as child_process from "child_process";
import { Observable } from "rxjs/Observable";

export function run(command: string, sync?: boolean): Observable<any> {
    if (sync) {
        const proc = child_process.exec(command);
        return new Observable(observer => {
            observer.next("Executing: " + command);
            observer.complete();
        })
    } else {
        return new Observable(observer => {
            child_process.exec(command, (err, stdout) => {
                if (err) {
                    observer.error(err);
                } else {
                    observer.next(stdout);
                }
                observer.complete();
            })
        })
    }
}
