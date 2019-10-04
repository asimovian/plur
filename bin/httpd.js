#!/usr/bin/env nodejs
/**
 * @copyright 2019 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
 */
'use strict';

import HttpServerBootstrap from '../js/plur-nodejs/api/bootstrap/httpserver.js'
import GenericHttpServerApp from '../js/plur-nodejs/http/server/GenericApp.mjs';
import HttpTerminal from '../js/plur/terminal/HTTP.mjs';

const app = new GenericHttpServerApp(new HttpTerminal(), {
    listenPort: 8085,
    httpApps: ['plur-nodejs-tests/unit/plur-nodejs/http/server/TestApp']
});

app.start();
