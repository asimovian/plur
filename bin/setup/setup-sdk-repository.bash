#!/bin/bash

if [[ $EUID -eq 0 ]]; then
   echo "This script should not be run as root"
   exit 1
fi

homedir=$(realpath .)

# Make a symlink of the Google Closure Compiler to bin/compiler for ease of use.
ln -s /usr/local/bin/google-closure-compiler $homedir/bin/compiler

# Clone this repository by file into the nginx server's web root. Anything committed locally will be visible upon pull.
cd /var/www/plur-tests
git clone $homedir
cd $homedir

exit 0
