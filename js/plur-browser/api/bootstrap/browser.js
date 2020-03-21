/**
 * @copyright 2019 Asmov LLC
 * @license MIT https://github.com/asmov/plur/blob/master/LICENSE.txt
 * @module plur-browser/api/bootstrap/browser
 */
'use strict';

import API from '../../../plur/api/API.mjs';
import BrowserBootstrap from '../../../plur-browser/api/Bootstrap.mjs';

const bootstrap = new BrowserBootstrap()
.setOSType(API.OSType.Linux)
.importPath({
    'plur': 'plur/js/plur',
    'plur-tests': 'plur/js/plur-tests',
    'plur-lib': 'plur/extern/js',
    'plur-browser': 'plur/js/plur-browser',
    'plur-browser-tests': 'plur/js/plur-browser-tests',
});

bootstrap.boot();

export default bootstrap;

