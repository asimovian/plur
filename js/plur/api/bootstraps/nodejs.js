/**
 * @copyright 2019 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
 * @module plur/api/bootstraps/nodejs
 */
'use strict';

import API from '../Bootstrap.js';
import Bootstrap from '../Bootstrap';

const bootstrap = new Bootstrap();

bootstrap.importPaths({
    'plur': 'plur/js/plur',
    'plur-cfg': 'plur/cfg/plur',
    'plur-lib': 'plur/lib/js',
    'plur-bin': 'plur/plur-bin/js/plur-bin',
    'plur-test': 'plur/plur-tests/js/plur-tests' });

API.plur.bootstrap(bootstrap);

export default bootstrap;
