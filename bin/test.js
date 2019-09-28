#!/usr/bin/env nodejs
/**
 * @copyright 2019 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
 */
'use strict';

import NodeJSBootstrap from '../js/plur/api/bootstraps/nodejs.js'
import TestApp from '../js/plur/test/App.mjs';
import ShellTerminal from '../js/plur/terminal/Shell.mjs';

new TestApp(new ShellTerminal()).start();
