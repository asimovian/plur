/**
 * @copyright 2019 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
 * @module plur/api/PlurAPI
 */
'use strict';

import PlurObject from '../../plur/PlurObject.mjs';
import API from '../../plur/api/API.mjs';

/**
 * Plur Framework API information.
 *
 * @implements {IPlurified}
 * @final
 */
class PlurAPI extends API {
    /**
     * @param {string} version
     * @param {string} scmUrl
     * @param {string} branch
     * @param {boolean|undefined} debug Enable framework-wide debugging.
     */
    constructor(version, scmUrl, branch, debug) {
        super('plur', version, scmUrl, branch, debug);
    };
}

PlurObject.plurify('plur/api/PlurAPI', PlurAPI);

export default PlurAPI;
