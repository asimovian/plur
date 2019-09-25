#!/bin/bash

if [[ $EUID -eq 0 ]]; then
   echo "This script should not be run as root"
   exit 1
fi


# Make a symlink of the Google Closure Compiler to bin/compiler for ease of use.
cd bin
ln -s /usr/local/bin/google-closure-compiler-linux compiler
cd ..

# Clone this repository by file into the nginx server's web root. Anything committed locally will be visible upon pull.
oldpwd=$PWD
cd /var/www/plur-tests
git clone $oldpwd
cd $oldpwd

exit 0
