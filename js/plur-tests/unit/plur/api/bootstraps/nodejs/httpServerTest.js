#!/usr/bin/env nodejs
/**
 * @copyright 2019 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
 * @tests plur/api/bootstraps/nodejs
 * @tests plur/api/bootstraps/browser
 */
'use strict';

import NodeJSBootstrap from '../../../../../../plur/api/bootstraps/nodejs/httpserver.js'
import HttpTerminal from '../../../../../../plur/terminal/HTTP.mjs';

new TestApp(new HttpTerminal()).start();