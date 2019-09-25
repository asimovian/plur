#!/bin/bash

find ./js -name '*.mjs' | sed -E 's/^.\/js\///g' > build/mjs-manifest.txt
