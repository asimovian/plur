#!/bin/bash
# @copyright 2019 Asimovian LLC
# @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
#
# Uses Google's Closure Compiler to compile all source files for each plur module available.
#
# Requires: sudo npm install -g google-closure-compiler

set -oue pipefail
IFS=$'\n\t'
GRN='\033[1;32m'
NC='\033[0m'

echo -e "${GRN}+---------------------------- plur // compile --------------------------------+${NC}"
echo -e "${GRN}|                                                                             |${NC}"

jarFile="/usr/local/lib/node_modules/google-closure-compiler/compiler.jar"
closureCompiler="java -jar $jarFile"
src=""
err=0

if [ -n "${1-}" ]; then
    src="${1}"
else
    src='js/**.js !**js/lib';
fi

echo -e "${GRN}|=== Running Google Closure Compiler ...                                      |${NC}"

set +e
err=$($closureCompiler --js_output_file /tmp/out.js $src)
set -e

if [ err != 0 ]; then
    echo -e "${GRN}|= Error! Is it installed?        sudo npm install -g google-closure-compiler |${NC}"
    echo -e "${GRN}+---------------------------------- error ------------------------------------+${NC}"
    exit 1
fi

echo -e "${GRN}+--------------------------- have a nice day ---------------------------------+${NC}"

exit 0
