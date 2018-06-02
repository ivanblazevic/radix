#!/bin/bash
# IMPORTANT: copy this file to root folder
echo "Update radix!"
LATEST_VERSION_URL="https://api.github.com/repos/ivanblazevic/radix/releases/latest"
TAG=$(curl -s $LATEST_VERSION_URL | python -c 'import json,sys;obj=json.load(sys.stdin);print obj["tag_name"]')
echo "Updating to version $TAG"
wget -O radix.zip https://github.com/ivanblazevic/radix/archive/$TAG.zip
unzip radix.zip -d radix
cd radix/radix-$TAG && cp -r * ../
cd ..
npm install
cd ..
rm -R radix/radix-$TAG
rm radix.zip
sleep 2 ; reboot