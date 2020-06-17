/**
 * @copyright 2019 Asmov LLC
 * @license MIT https://github.com/asmov/plur/blob/master/LICENSE.txt
 * @module plur/api/PlurAPI
 */
'use strict';

import PlurClass from '../../plur/Class.mjs';
import API from '../../plur/api/API.mjs';

/**
 * Plur Framework API information.
 *
 * @implements {IPlurified}
 * @final
 */
export default class PlurAPI extends API {
    /**
     * @param {string} version
     * @param {string} scmUrl
     * @param {string} branch
     * @param {boolean|undefined} debug Enable framework-wide debugging.
     */
    constructor(version, scmUrl, branch, debug) {
        const importPathMap = {
            'plur': 'plur/js/plur',
            'plur-extern': 'plur/extern/js',
            'plur-tests': 'plur/js/plur-tests',
            'plur-browser': 'plur/js/plur-browser',
            'plur-browser-tests': 'plur/js/plur-browser-tests',
        };

        super('plur', version, scmUrl, branch, importPathMap, debug);
    };
}

PlurClass.plurify('plur/api/PlurAPI', PlurAPI);
