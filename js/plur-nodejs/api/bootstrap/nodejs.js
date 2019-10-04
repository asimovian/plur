/**
 * @copyright 2019 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
 * @module plur-nodejs/api/bootstrap/nodejs
 */
'use strict';

import API from '../../../plur/api/API.mjs';
import NodeJsBootstrap from '../../../plur-nodejs/api/Bootstrap.mjs';

const bootstrap = new NodeJsBootstrap()
.setOSType(API.OSType.Linux)
.importPath({
    'plur': 'plur/js/plur',
    'plur-tests': 'plur/js/plur-tests',
    'plur-lib': 'plur/extern/js',
    'plur-bin': 'plur/js/plur-bin',
    'plur-bin-tests': 'plur/js/plur-bin-tests',
    'plur-nodejs': 'plur/js/plur-nodejs',
    'plur-nodejs-tests': 'plur/js/plur-nodejs-tests',
    'plur-browser': 'plur/js/plur-browser',
    'plur-browser-tests': 'plur/js/plur-browser-tests',
    'plur-cfg': '~/.plur/cfg/plur',
});

bootstrap.boot();

export default bootstrap;
