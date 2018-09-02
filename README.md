Radix is node server music streamer with web interface for control.
Supports:
- web streaming
- YouTube
- Google Music Play

# Radix installation on RaspberryPI

## configure dietPI
- Download DietPi / Recommended Etcher for flashing SD card
- install DietPI
- connect to wifi
- dietpi-config -> 9. autostart options -> automatic start <<<DOES NOT WORK, why?, put in etc/rc.local instead before exit>>>
- dietpi-software -> install nodeJS
- configure USB audio card if you use one
## run this commands in root directory
- wget https://raw.githubusercontent.com/ivanblazevic/radix/master/install.sh
- chmod +x install.sh
- run install.sh inside root

## Optional: Update to latest version
- Update to new version will appear in settings of the web interface
