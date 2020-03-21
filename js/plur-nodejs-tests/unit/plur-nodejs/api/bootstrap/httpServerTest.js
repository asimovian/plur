#!/usr/bin/env nodejs
/**
 * @copyright 2019 Asmov LLC
 * @license MIT https://github.com/asmov/plur/blob/master/LICENSE.txt
 * @tests plur/api/bootstraps/nodejs
 * @tests plur/api/bootstraps/browser
 */
'use strict';

import NodeJSBootstrap from '../../../../../plur-nodejs/api/bootstrap/httpserver.js'
import HttpTerminal from '../../../../../plur-nodejs/terminal/HTTP.mjs';

new TestApp(new HttpTerminal()).start();