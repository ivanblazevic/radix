#!/bin/bash
# IMPORTANT: copy this file to root folder
echo "Install radix!"
apt-get update
apt-get install mpc
apt-get install python
echo "export PORT=80" >> ~/.bashrc

#wget https://raw.githubusercontent.com/ivanblazevic/radix/master/update.sh
#chmod +x update.sh
#./update.sh

# Setting radix.local domain
# https://www.howtogeek.com/167190/how-and-why-to-assign-the-.local-domain-to-your-raspberry-pi/
sed -i -e 's/DietPi/radix/g' /etc/hosts # set radix.local domain // replace DietPi with radix
#echo -e "#!/bin/bash\ncd radix && npm start" >> /etc/dietpi/autostart.sh