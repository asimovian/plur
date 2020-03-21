#!/usr/bin/env nodejs
/**
 * @copyright 2019 Asmov LLC
 * @license MIT https://github.com/asmov/plur/blob/master/LICENSE.txt
 */
'use strict';

import NodeJSBootstrap from '../js/plur-nodejs/api/bootstrap/nodejs.js'
import TestRunnerApp from '../js/plur/test/runner/App.mjs';
import ShellTerminal from '../js/plur-nodejs/terminal/Shell.mjs';

new TestRunnerApp(new ShellTerminal()).start();
