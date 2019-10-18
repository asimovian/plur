#!/usr/bin/env nodejs
/**
 * @copyright 2019 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
 */
'use strict';

import NodeJSBootstrap from '../js/plur-nodejs/api/bootstrap/nodejs.js'
import TestRunnerApp from '../js/plur/test/runner/App.mjs';
import ShellTerminal from '../js/plur-nodejs/terminal/Shell.mjs';

new TestRunnerApp(new ShellTerminal()).start();
