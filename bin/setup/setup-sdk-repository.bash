#!/bin/bash

if [[ $EUID -eq 0 ]]; then
   echo "This script should not be run as root"
   exit 1
fi

homedir=$(realpath .)
wwwdir='/var/www/plur-tests'

# Make a symlink of the Google Closure Compiler to bin/compiler for ease of use.
[ -f ${homedir}/bin/compiler ] || ln -s /usr/local/bin/google-closure-compiler ${homedir}/bin/compiler

# The last section is for setting up /var/www/plur if it's not already
if [ "${1-}" == "--no-www" ]; then
  exit 0
fi

# Clone the same repository into the nginx server's web root, under 'plur-tests'.
# Finally, call that repository's setup as well.
# Both repositories can now be activley developed on.
git clone git@github.com:asimovian/plur.git ${wwwdir}
cd ${wwwdir}/plur
./bin/setup/setup-sdk-repository.bash --no-www
exit $?
