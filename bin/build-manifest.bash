#!/bin/bash

manifestFile='./build/plur-manifest.txt'
jsManifestFile='./js/plur/manifest.mjs'
findDir='./js'

# Build the text manifest first, in /build
find $findDir -name '*.mjs' | sed -E 's/^.\/js\///g' > $manifestFile

echo 'export default [' > $jsManifestFile

find $findDir -name '*.mjs' | sed -E 's/^.\/js\///g' | sed -E 's/^/    "/g' | sed -E 's/$/",/g' >> $jsManifestFile

echo '];' >> $jsManifestFile

cat manifestFile

exit 0
