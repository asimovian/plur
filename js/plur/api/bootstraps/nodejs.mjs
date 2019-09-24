/**
 * @copyright 2019 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
 * @module plur/api/bootstraps/nodejs
 */
'use strict';

import API from '../../../plur/api/API.mjs';
import NodeJsBootstrap from '../../../plur/nodejs/Bootstrap.js';

const bootstrap = new NodeJsBootstrap()
    .setOSType(API.OSType.Other)
    .setBrowserType(API.BrowserType.Other)
    .importPath({
        'plur': 'plur/js/plur',
        'plur-lib': 'plur/extern/js',
        'plur-cfg': '~/.plur/cfg/plur',
        'plur-bin': 'plur/js/plur-bin',
        'plur-tests': 'plur/js/plur-tests' });

bootstrap.boot();

export default bootstrap;
