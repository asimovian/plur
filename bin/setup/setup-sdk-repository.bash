#!/bin/bash

# Make a symlink of the Google Closure Compiler to bin/compiler for ease of use.
cd bin
ln -s /usr/local/bin/google-closure-compiler-linux compiler
cd ..

exit 0
