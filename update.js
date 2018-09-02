#!/usr/bin/env node
"use strict";

const shell = require('shelljs');
//shell.exec(comandToExecute, {silent:true}).stdout;
shell.exec('npm update -g radix-player')
shell.exec('sleep 2 ; reboot')
// shell.exec('./update.sh')