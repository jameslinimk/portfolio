if [ -f /usr/local/var/run/nginx.pid ]; then
	echo "Nginx is running"
fi

if lsof -i:3000; then
	echo "Port 3000 is in use"
fi
