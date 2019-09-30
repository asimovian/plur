#!/bin/bash
#
# Builds a list of JS filepaths and namepaths and saves them in build/plur-manifest.txt and build/manifest.mjs,
# respectively.
# Use the the --install option to copy the manifest.mjs into js/plur/build/current

source ./bash/plur/lib.bash

homedir=$(realpath $(pwd))

manifestFile="${homedir}/build/plur-manifest.txt"
jsManifestFile="${homedir}/build/manifest.mjs"
installedJsManifestFile="${homedir}/js/plur/build/current/manifest.mjs"
findDir="./js"

[ -d "${homedir}/build" ] || mkdir "${homedir}/build"

# Build the text manifest first, in /build
find $findDir -name '*.mjs' | sed -E 's/^.\/js\///g' > $manifestFile

echo 'export default [' > $jsManifestFile

find $findDir -name '*.mjs' | sed -E 's/^.\/js\///g' | sed -E 's/^/    "/g' | sed -E 's/$/",/g' >> $jsManifestFile

echo '];' >> $jsManifestFile

cat $manifestFile

if [ "${1-}" == "--install" ]; then
  cp $jsManifestFile $installedJsManifestFile
fi

exit 0
