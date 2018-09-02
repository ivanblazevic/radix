#!/usr/bin/env node
"use strict";

const shell = require('shelljs');
//shell.exec(comandToExecute, {silent:true}).stdout;
shell.exec('./install.sh')