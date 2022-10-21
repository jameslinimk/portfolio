#!/bin/bash

if [ "$EUID" -ne 0 ]; then
	echo "Please run as root"
	exit
fi

cd "$(dirname "$0")" || exit
cp ./nginx.conf /usr/local/etc/nginx/nginx.conf
cd ../
git pull
npm run build
sudo -u jameslinimk screen -d -m caffeinate npm run serve
nginx -s quit
nginx
