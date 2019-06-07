#!/usr/bin/env node
"use strict";

const shell = require('shelljs');
shell.exec('npm install -g radix-player')
shell.exec('sleep 2 ; reboot')