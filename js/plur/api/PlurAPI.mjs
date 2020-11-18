/**
 * @copyright 2019 Asmov LLC
 * @license MIT https://github.com/asmov/plur/blob/master/LICENSE.txt
 * @module plur/api/PlurAPI
 */
'use strict';

import { PlurMeta, iPlurCompatable } from '../../plur/Meta.mjs';
import API from '../../plur/api/API.mjs';

/**
 * Plur Framework API information.
 *
 * @final
 * @implements iPlurCompatable
 */
export default class PlurAPI extends API {
    static const namepath = 'plur/api/PlurAPI';

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

    getNamepath() { return PlurAPI.namepath; };
}

PlurMeta.conform(PlurAPI);
