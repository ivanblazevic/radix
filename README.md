Radix is node server music streamer with web interface for control.
Supports:
- Internet radio streaming
- YouTube
- Google Music Play

# Radix installation on RaspberryPI

Download DietPi / Recommended Etcher for flashing SD card > and flash your SD card (follow installation procedure)

## Installation
- connect to wifi
- dietpi-config -> 9. autostart options -> automatic login (recommended) 
- dietpi-software -> install nodeJS
- npm install -g radix-player
- radix-install
- add radix in etc/rc.local before exit:
    radix
    exit 0
- (optional) configure USB audio card if you use one using dietpi-config

## Optional: Update to latest version
- Update to new version will appear in settings of the web interface