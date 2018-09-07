#!/usr/bin/env node
"use strict";

const shell = require('shelljs');
shell.exec('apt-get --yes --force-yes update')
shell.exec('apt-get --yes --force-yes install mpd mpc')
shell.exec('apt-get --yes --force-yes install python')
shell.exec('echo "export PORT=80" >> ~/.bashrc')
shell.exec('sed -i -e \'s/DietPi/radix/g\' /etc/hosts') // set radix.local domain
shell.exec('sed -i -e \'s/DietPi/radix/g\' /etc/hostname') // set network device name
shell.exec('sed -i -e \'s/^exit/radix\nexit/g\' /etc/rc.local') // set autostart