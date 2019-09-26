#!/bin/bash

manifest='./js/plur/manifest.mjs'
echo 'export default [' > $manifest

find ./js -name '*.mjs' | sed -E 's/^.\/js\///g' | sed -E 's/^/    "/g' | sed -E 's/$/",/g' >> $manifest

echo '];' >> $manifest
