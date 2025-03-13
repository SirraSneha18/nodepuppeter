#!/bin/bash

# Install Chromium if not already installed
if [ ! -f "/usr/bin/chromium-browser" ]; then
    echo "Installing Chromium..."
    apt-get update && apt-get install -y chromium-browser
else
    echo "Chromium is already installed."
fi

# Start the Node.js application
echo "Starting application..."
exec npm start
