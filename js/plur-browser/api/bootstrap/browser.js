/**
 * @copyright 2019 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
 * @module plur-browser/api/bootstrap/browser
 */
'use strict';

import API from '../../../plur/api/API.mjs';
import BrowserBootstrap from '../../../plur-browser/api/Bootstrap.mjs';

const bootstrap = new BrowserBootstrap()
    .setOSType(API.OSType.Linux)
    .importPath({
        'plur': 'plur/js/plur',
        'plur-lib': 'plur/extern/js',
        'plur-cfg': '~/.plur/cfg/plur',
        'plur-bin': 'plur/js/plur-bin',
        'plur-tests': 'plur/js/plur-tests' });

bootstrap.boot();

export default bootstrap;

