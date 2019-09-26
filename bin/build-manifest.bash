#!/bin/bash

source ./bin/plur.lib.bash

homedir=$(realpath $(pwd))

manifestFile="${homedir}/build/plur-manifest.txt"
jsManifestFile="${homedir}/js/plur/manifest.mjs"
findDir="./js"

[ -d "${homedir}/build" ] || mkdir "${homedir}/build"

# Build the text manifest first, in /build
find $findDir -name '*.mjs' | sed -E 's/^.\/js\///g' > $manifestFile

echo 'export default [' > $jsManifestFile

find $findDir -name '*.mjs' | sed -E 's/^.\/js\///g' | sed -E 's/^/    "/g' | sed -E 's/$/",/g' >> $jsManifestFile

echo '];' >> $jsManifestFile

cat $manifestFile

exit 0
