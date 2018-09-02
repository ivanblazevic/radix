"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process = require("child_process");
const Observable_1 = require("rxjs/Observable");
function run(command, sync) {
    if (sync) {
        const proc = child_process.exec(command);
        return new Observable_1.Observable(observer => {
            observer.next("Executing: " + command);
            observer.complete();
        });
    }
    else {
        return new Observable_1.Observable(observer => {
            child_process.exec(command, (err, stdout) => {
                if (err) {
                    observer.error(err);
                }
                else {
                    observer.next(stdout);
                }
                observer.complete();
            });
        });
    }
}
exports.run = run;
