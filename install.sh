#!/bin/bash
# IMPORTANT: copy this file to root folder
echo "Install radix!"
apt-get update
apt-get install mpc
apt-get install python
echo "export PORT=80" >> ~/.bashrc
./update.sh
#echo -e "#!/bin/bash\ncd radix && npm start" >> /etc/dietpi/autostart.sh
#-- set chmod +x 