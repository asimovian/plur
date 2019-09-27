#!/bin/bash
# @copyright 2019 Asimovian LLC
# @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
# plur/lib.bash
#
# Standard utility bash library

# @param string dir $1
function is_plur_homedir {
	[ $(basename $(realpath $1)) == 'plur' ] && cat package.json | grep -E '^\s+"name":\s+"\@plur\/plur",$' 1>/dev/null
	return $?
}

