#!/bin/bash
# @copyright 2019 Asimovian LLC
# @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
#
# Uses Google's Closure Compiler to compile all source files for each plur module available.
#
# Requres (npm install):
# > sudo apt-get install build-essential
# > npm install google-closure-compiler

set -oue pipefail
IFS=$'\n\t'
GRN='\033[1;32m'
NC='\033[0m'

echo -e "${GRN}+---------------------------- plur // compile --------------------------------+${NC}"
echo -e "${GRN}|                                                                             |${NC}"

closureCompiler="./node_modules/google-closure-compiler-linux/compiler"
src=''
err=0

if [ -n "${1-}" ]; then
    src="${1}"
else
    src='js/**.js';
fi

echo -e "${GRN}|=== Running Google Closure Compiler ...                                      |${NC}"

set +e
$closureCompiler --js_output_file /tmp/out.js --js $src
err=$?
set -e

if [ $err != 0 ]; then
    if [ ! -f $closureCompiler ]; then
        echo -e "${GRN}|                                                             Fatal Error! ===|${NC}"
        echo -e "${GRN}|                                           Is it installed? Try npm install. |${NC}"
        echo -e "${GRN}+--------------------------- fatal error -------------------------------------+${NC}"
        exit 1
    else
        echo -e "${GRN}|                                                      There is ... a bug. ===|${NC}"
        echo -e "${GRN}+------------------------------ have a nice day ------------------------------+${NC}"
        exit 1
    fi
    exit 1
fi

echo -e "${GRN}|                                                                 Success! ===|${NC}"

echo -e "${GRN}+------------------------------ have a nice day ------------------------------+${NC}"

exit 0
