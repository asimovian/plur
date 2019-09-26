#!/bin/bash
# @copyright 2019 Asimovian LLC
# @
# Generic plur bash script library

# @param string dir $1
function is_plur_homedir {
	[ $(basename $(realpath $1)) == 'plur' ] # && cat package.json | grep -E '^\s+"name":\s+"\@plur\/plur",$'
	return $?
}


