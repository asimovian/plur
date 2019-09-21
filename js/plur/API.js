/**
 * @copyright 2016 Asimovian LLC
 * @license MIT https://github.com/asimovian/plur/blob/master/LICENSE.txt
 * @requires plur/PlurObject
 * @module plur/PlurAPI
 */
'use strict';

import { PlurObject } from 'plur/PlurObject';


/**
 * API version information
 *
 * @class PlurAPI
 * @alias {module:plur/PlurAPI}
 * @final
 **
 */
class PlurAPI {
    constructor(version, scmUrl, branch) {
        PlurObject.constProperty(this, 'version', version);
        PlurObject.constProperty(this, 'scmUrl', scmUrl;
        PlurObject.constProperty(this, 'branch', branch;
    };
}

PlurObject.plurify('plur/plurAPI', PlurAPI);

const API = new PlurAPI(
    '0.0.1',
    'git://github.com/asimovian/plur.git',
    'roylaurie/unstable'
);


export default API;
