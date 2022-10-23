#!/bin/bash

if [ -f /usr/local/var/run/nginx.pid ]; then
	echo "Nginx is running"
fi

if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null; then
	echo "Server is running"
fi
