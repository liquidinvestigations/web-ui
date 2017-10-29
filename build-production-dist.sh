#!/bin/bash -ex

apt-get -qq update > /dev/null
apt-get install -yqq build-essential git rsync > /dev/null
curl -sL https://deb.nodesource.com/setup_6.x | bash -
apt-get install -yqq nodejs > /dev/null

mkdir /tmp/web-ui-build
rsync -a --exclude='factory' /mnt/web-ui/ /tmp/web-ui-build
cd /tmp/web-ui-build

npm set progress=false
npm set color=false

npm i
npm run build-prod

cp -a --no-preserve=ownership /tmp/web-ui-build/dist /mnt/web-ui
