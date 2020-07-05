cd /opt/web-apps/dougmabelmercer.ca/client || exit 1
yarn install
yarn run build

cd /opt/web-apps/dougmabelmercer.ca/server || exit 1
yarn install
