/**
 * @copyright 2019 Asmov LLC
 * @license MIT https://github.com/asmov/plur/blob/master/LICENSE.txt
 * @module plur-nodejs/api/bootstrap/httpserver
 */
'use strict';

import API from '../../../plur/api/API.mjs';
import NodeJsBootstrap from '../../../plur-nodejs/api/Bootstrap.mjs';

const bootstrap = new NodeJsBootstrap()
    .setOSType(API.OSType.Linux)
    .importPath({
        'plur': 'plur/js/plur',
        'plur-lib': 'plur/extern/js',
        'plur-cfg': '~/.plur/cfg/plur',
        'plur-bin': 'plur/js/plur-bin',
        'plur-tests': 'plur/js/plur-tests' });

bootstrap.boot();

export default bootstrap;
