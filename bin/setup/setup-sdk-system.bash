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


# there is no longer a nodejs executable, just node. the installed script simply redirects to the snap executable.
# the silver lining is that, on this system, there's now a clear distinction between legacy (node) and es6m (nodejs).
if [[ ! -f /usr/local/bin/nodejs ]]; then
    cp bin/setup/nodejs /usr/local/bin
    chown root:root /usr/local/bin/nodejs ; chmod 755 /usr/local/bin/nodejs
fi

exit 0
