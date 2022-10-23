#!/bin/bash

USERNAME="jameslinimk"
TMUX_NAME="node_server"

# Making sure ran as root
if [ "$EUID" -ne 0 ]; then
	echo "Please run as root"
	exit
fi

# Going to directory of project
cd "$(dirname "$0")" || exit
cd ../

# Update git
git pull >/dev/null

# Server
pnpm i >/dev/null
pnpm run build >/dev/null
sudo -u $USERNAME tmux kill-session -t $TMUX_NAME >/dev/null
sudo -u $USERNAME tmux new -d -s $TMUX_NAME 'caffeinate pnpm run serve'

# Nginx
cp ./nginx/nginx.conf /usr/local/etc/nginx/nginx.conf >/dev/null
nginx -s quit >/dev/null
nginx

echo "Done!, updated git, laucnhed nginx and node server"
