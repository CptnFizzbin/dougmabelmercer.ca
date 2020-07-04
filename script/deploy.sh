cd client || exit 1
yarn install
yarn run build
cd ../server || exit 1
yarn install
