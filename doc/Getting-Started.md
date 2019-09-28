Getting Started
===============

OS
: Linux Mint 19.2<br/>
Arch
: x86_64<br/>
Plur SDK
: v0.1.0

System Packages
---------------
~~~sh
## Removes the default nodejs package, if installed.
sudo apt-get remove nodejs
# Installs build tools required for later steps. SnapD package manager.
sudo apt-get install build-essential git snapd
~~~

SnapD Packages
--------------
```sh
# Installs snap package for Node.js v12
sudo snap install node --classic --channel=12
# Installs the preferred IDE for plur development (30 day trial)
# Skip this for non-dev work
sudo snap install webstorm --classic
```

NPM Project Packages
--------------------
 ```json
 "dependencies": {
    "glob": "~7.1.4",
    "node-json-rpc": "0.0.1",
    "requirejs": "~2.2.0",
    "web3": "~1.2.1"
  }
```

The dependency ```{ "google-closure-compiler": "^20190909.0.0" }``` is installed globally by the system setup script.

Configuration in /etc
---------------------

**```cat >> /etc/bash.bashrc```**
~~~sh
#plur: default nodejs package removed. snapd node package does not have an alias.
alias nodejs="node"
~~~

Configuration in repository
---------------------------

A symlink is created from the global NPM ```google-closure-compiler``` executable to ```plur/bin/compiler```.

How to Install
==============

Clone the plur.git repository and work from that directory:
```sh
mkdir -p ~/project/asimovian/plur ; cd ~/project/asimovian/plur
git clone git@github.com:asimovian/plur.git
git checkout roylaurie/unstable
git clean -f ; git pull
```
If this is the first time configuring this system for the Plur SDK, run the sdk setup scripts:
~~~sh
# Installs and configures necessary system packages and settings for the SDK
sudo npm run setup-system
npm run setup-repository
~~~


Finally, run the NPM installation script to install NPM package dependencies:
```sh
npm install
```

Use the following to compile everything or just a single file:
```sh
./bin/compile.bash js/plur/IPlurified.mjs js/plur/PlurObject.mjs
# or
npm run compile js/plur/IPlurified.mjs js/plur/PlurObject.mjs
```

How to Test
===========

Chrome
------
Build
: 76.0.3809<br/>
Source
: OOB system package "chromium-browser"

Use the script tag and filename as such:

```html
<script type="module" src="module/path/File.js"></script>
<!-- Note the type and file extension for a Browser entry-point. -->
```

NodeJS
------
Version
: 12.10.0<br/>
Source
: SnapD package "node" with --classic --channel=12

Use the following command:

```sh
node --experimental_module ...
```

Google Closure Compiler
-----------------------
Version
: 20190909<br/>
Source
: NPM package "google-closure-compiler"

Compile individual modules by providing their dependencies as well, one per --js tag:

```sh
./node_modules/google-closure-compiler/linux/compiler --language_in=ECMASCRIPT_2019 --js js/plur/IPlurified.mjs --js js/plur/PlurObject.mjs
```

