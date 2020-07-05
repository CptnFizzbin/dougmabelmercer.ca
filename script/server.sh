source /etc/profile.d/nvm.sh
cd /opt/web-apps/dougmabelmercer.ca/server || exit 1
nvm run server.js
