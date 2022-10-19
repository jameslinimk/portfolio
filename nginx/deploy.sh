#!/bin/bash

if [ "$EUID" -ne 0 ]; then
	echo "Please run as root"
	exit
fi

function newCmd() {
	declare args
	args="${@//\'/\'}"
	args="${args//\"/\\\"}"
	printf "%s" "${args}" | /usr/bin/pbcopy
	/usr/bin/open -a Terminal
	/usr/bin/osascript -e 'tell application "Terminal" to do script with command "/usr/bin/clear; eval \"$(/usr/bin/pbpaste)\""'
	return 0
}

cd "$(dirname "$0")" || exit
cp ./nginx.conf /usr/local/etc/nginx/nginx.conf
cd ../
npm run build
newCmd cd "$(dirname "$0")" && caffeinate npm run serve
nginx -s quit
nginx
