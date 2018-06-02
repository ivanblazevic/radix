# Radix installation

## configure dietPI
- install DietPI
- connect to wifi
- dietpi-config -> 9. autostart options -> automatic start <<<DOES NOT WORK, why?, put in etc/rc.local instead before exit>>>
- dietpi-software -> install nodeJS
- configure USB audio card if you use one
## run this commands in root directory
- wget https://raw.githubusercontent.com/ivanblazevic/radix/master/install.sh
- wget https://raw.githubusercontent.com/ivanblazevic/radix/master/update.sh
- set chmod +x for both files
- run install.sh in root

## optional: to update to latest version
- run update.sh to update to latest version
