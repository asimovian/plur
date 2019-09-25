#!/bin/bash
# Requires sudo

if [[ $EUID -ne 0 ]]; then
   echo "This script must be run as root"
   exit 1
fi

## Removes the default nodejs package, if installed.
apt-get remove nodejs

# Installs build tools required for later steps. SnapD package manager. nginx for testing.
apt-get install build-essential git snapd nginx

# Installs snap package for Node.js v12
snap install node --classic --channel=12

# Installs the preferred IDE for plur development (30 day trial)
# Skip this for non-dev work
snap install webstorm --classic

# Install the Google Closure Compiler as a system-wide tool
npm install --global google-closure-compiler

# There is no longer a nodejs executable, just node. The installed script simply redirects to the snap executable.
# On this system, there's now a NodeJS option for both legacy JS (node) and es6m JS (nodejs).
if [[ ! -f /usr/local/bin/nodejs ]]; then
    cp bin/setup/assets/nodejs /usr/local/bin
    chown root:root /usr/local/bin/nodejs ; chmod 755 /usr/local/bin/nodejs
fi

# Configure system MIME types in /etc/mime.types to understand .mjs files
echo /etc/mime.types | xargs grep -lE 'javascript\s+js\s*$' | xargs sed -i -E 's/\/javascript(\s+)js\s*$/\/javascript\1js mjs/'

# Configure nginx ...

# Configure nginx MIME types to understand .mjs files
echo /etc/nginx/mime.types | xargs grep -lE 'javascript\s+js;\s*$' | xargs sed -i -E 's/\/javascript(\s+)js;\s*$/\/javascript\1js mjs;/'

# Install the plur-tests site configuration and chown it to the user
cp bin/setup/assets/plur-tests /etc/nginx/sites-available
chown $USER:$USER /etc/nginx/sites-available/plur-tests ; chmod 644 /etc/nginx/sites-available/plur-tests

# Create the html root and
mkdir /var/www/plur-tests
chown $USER:$USER /var/www/plur-tests ; chmod 755 /var/www/plur-tests


exit 0
