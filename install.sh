#!/bin/bash
echo "Install radix!"
apt-get update
apt-get install mpc
apt-get install python
echo "export PORT=80" >> ~/.bashrc
# Setting radix.local domain
# https://www.howtogeek.com/167190/how-and-why-to-assign-the-.local-domain-to-your-raspberry-pi/
sed -i -e 's/DietPi/radix/g' /etc/hosts # set radix.local domain // replace DietPi with radix
#echo -e "#!/bin/bash\ncd radix && npm start" >> /etc/dietpi/autostart.sh