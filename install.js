#!/usr/bin/env node
"use strict";

const shell = require('shelljs');
//shell.exec(comandToExecute, {silent:true}).stdout;
shell.exec('apt-get update')
shell.exec('apt-get install mpc')
shell.exec('apt-get install python')
shell.exec('echo "export PORT=80" >> ~/.bashrc')
shell.exec('sed -i -e \'s/DietPi/radix/g\' /etc/hosts')